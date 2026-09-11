import Foundation
import Darwin

struct ProcessResult { let code:Int32; let output:String }
func gbrainFailureMessage(_ result:ProcessResult) -> String {
    // Pinned PGLite/Emscripten maps ENOSPC to 51, not Darwin errno 51.
    // Its generic WASM-init hint also mentions corruption; do not treat that hint
    // as a diagnosis or suggest database repair for a storage exhaustion error.
    if result.output.contains("PGLite failed to initialize its WASM runtime."),
       result.output.contains("ErrnoError (errno 51)") {
        return "Espaço insuficiente para inicializar o GBrain (PGLite ENOSPC). Libere espaço no volume do perfil e dos temporários e retome a instalação. Este erro, por si só, não comprova corrupção do banco; não apague o banco nem seus locks."
    }
    return "GBrain (\(result.code)): \(result.output.prefix(1800))"
}
func runProcess(_ executable:URL, _ args:[String], cwd:URL, environment:[String:String], input:Data? = nil, timeout:Double = 90) throws -> ProcessResult {
    let payload = input ?? Data()
    guard payload.count <= 16_000_000,timeout.isFinite,timeout > 0 else { throw failure("Solicitação de subprocesso fora dos limites") }
    let deadline = ProcessInfo.processInfo.systemUptime + min(timeout,600)
    var descriptors = [Int32]()
    func makePipe() throws -> [Int32] {
        var pair:[Int32] = [0,0]
        guard Darwin.pipe(&pair) == 0 else { throw failure("Não foi possível abrir o canal do motor") }
        descriptors.append(contentsOf:pair)
        for fd in pair { _ = fcntl(fd,F_SETFD,FD_CLOEXEC) }
        return pair
    }
    func closeFD(_ fd:Int32) {
        if let index = descriptors.firstIndex(of:fd) { Darwin.close(fd);descriptors.remove(at:index) }
    }
    defer { for fd in descriptors { Darwin.close(fd) } }
    let stdin = try makePipe(), stdout = try makePipe(), stderrPipe = try makePipe()
    var actions:posix_spawn_file_actions_t?, attributes:posix_spawnattr_t?
    guard posix_spawn_file_actions_init(&actions) == 0,posix_spawnattr_init(&attributes) == 0 else { throw failure("Não foi possível preparar o motor") }
    defer { posix_spawn_file_actions_destroy(&actions);posix_spawnattr_destroy(&attributes) }
    guard posix_spawn_file_actions_addchdir_np(&actions,cwd.path) == 0 else { throw failure("Pasta de execução indisponível") }
    for (source,target) in [(stdin[0],STDIN_FILENO),(stdout[1],STDOUT_FILENO),(stderrPipe[1],STDERR_FILENO)] {
        guard posix_spawn_file_actions_adddup2(&actions,source,target) == 0 else { throw failure("Canal do motor indisponível") }
    }
    for fd in descriptors { _ = posix_spawn_file_actions_addclose(&actions,fd) }
    // The group is created atomically before exec, not with a racy setpgid after launch.
    posix_spawnattr_setflags(&attributes,Int16(POSIX_SPAWN_SETPGROUP))
    posix_spawnattr_setpgroup(&attributes,0)
    let argv = ([executable.path] + args).map { strdup($0) } + [nil]
    let envp = environment.keys.sorted().map { strdup($0 + "=" + environment[$0]!) } + [nil]
    defer { for pointer in argv + envp { if let pointer { free(pointer) } } }
    var pid:pid_t = 0
    let launched = argv.withUnsafeBufferPointer { av in envp.withUnsafeBufferPointer { ev in
        posix_spawn(&pid,executable.path,&actions,&attributes,av.baseAddress!,ev.baseAddress!)
    } }
    guard launched == 0 else { throw failure("Não foi possível executar o motor (\(launched)).") }
    closeFD(stdin[0]);closeFD(stdout[1]);closeFD(stderrPipe[1])
    for fd in [stdin[1],stdout[0],stderrPipe[0]] { _ = fcntl(fd,F_SETFL,fcntl(fd,F_GETFL) | O_NONBLOCK) }
    _ = fcntl(stdin[1],F_SETNOSIGPIPE,1)
    var waitStatus:Int32 = 0, reaped=false
    // Always close inherited writers and reap the leader, also on cancellation,
    // broken stdin, launch-side errors, and a successful parent leaving a child.
    defer {
        _ = Darwin.kill(-pid,SIGTERM)
        let grace = ProcessInfo.processInfo.systemUptime + 0.25
        while !reaped && ProcessInfo.processInfo.systemUptime < grace {
            if waitpid(pid,&waitStatus,WNOHANG) == pid { reaped=true;break }
            Thread.sleep(forTimeInterval:0.01)
        }
        _ = Darwin.kill(-pid,SIGKILL)
        if !reaped {
            let cleanupDeadline = ProcessInfo.processInfo.systemUptime + 1
            while ProcessInfo.processInfo.systemUptime < cleanupDeadline {
                let result=waitpid(pid,&waitStatus,WNOHANG)
                if result == pid || (result < 0 && errno == ECHILD) { reaped=true;break }
                Thread.sleep(forTimeInterval:0.01)
            }
            // Kernel reap remains asynchronous only in the exceptional uninterruptible
            // I/O case; no blocking wait can freeze the caller past its deadline.
            if !reaped { DispatchQueue.global(qos:.utility).async { var status:Int32=0;while waitpid(pid,&status,0) < 0 && errno == EINTR {} } }
        }
    }
    var out=Data(), err=Data(), offset=0, outEOF=false, errEOF=false, inputClosed=false, outputExceeded=false
    var buffer=[UInt8](repeating:0,count:16_384)
    func drain(_ fd:Int32, _ bytes:inout Data, limit:Int, eof:inout Bool) {
        for _ in 0..<32 {
            let n=Darwin.read(fd,&buffer,buffer.count)
            if n > 0 {
                let count=min(n,max(0,limit-bytes.count))
                bytes.append(contentsOf:buffer.prefix(count))
                if count < n && fd == stdout[0] { outputExceeded=true }
            } else { if n == 0 { eof=true };break }
        }
    }
    while true {
        if let cancel=environment["ORACLE_CANCEL_FILE"],fm.fileExists(atPath:cancel) { throw failure("Operação cancelada. Os avanços confirmados foram preservados.") }
        guard ProcessInfo.processInfo.systemUptime < deadline else { throw failure("Motor excedeu o prazo. O subprocesso foi encerrado; a indexação pode ser retomada.") }
        if !inputClosed {
            if offset < payload.count {
                let n=payload.withUnsafeBytes { raw in Darwin.write(stdin[1],raw.baseAddress!.advanced(by:offset),min(16_384,payload.count-offset)) }
                if n > 0 { offset += n }
                else if n < 0 && errno != EAGAIN && errno != EINTR { closeFD(stdin[1]);inputClosed=true }
            }
            if offset == payload.count { closeFD(stdin[1]);inputClosed=true }
        }
        if !outEOF { drain(stdout[0],&out,limit:4_000_000,eof:&outEOF) }
        if !errEOF { drain(stderrPipe[0],&err,limit:100_000,eof:&errEOF) }
        if !reaped {
            let result=waitpid(pid,&waitStatus,WNOHANG)
            if result == pid { reaped=true;_ = Darwin.kill(-pid,SIGKILL) }
        }
        if reaped && outEOF && errEOF { break }
        var polls=[pollfd(fd:stdout[0],events:Int16(POLLIN),revents:0),pollfd(fd:stderrPipe[0],events:Int16(POLLIN),revents:0)]
        if !inputClosed { polls.append(pollfd(fd:stdin[1],events:Int16(POLLOUT),revents:0)) }
        _ = Darwin.poll(&polls,nfds_t(polls.count),20)
    }
    guard !outputExceeded else { throw failure("A resposta do motor excedeu 4 MB; reduza o escopo da consulta.") }
    let code:Int32 = (waitStatus & 0x7f) == 0 ? (waitStatus >> 8) & 0xff : 128 + (waitStatus & 0x7f)
    return ProcessResult(code:code,output:String(decoding:out,as:UTF8.self) + (code == 0 ? "" : "\n" + String(decoding:err,as:UTF8.self)))
}
extension Core {
    func bundledEngineResources() -> URL {
        let identifier=Bundle.main.bundleIdentifier
        let allowsFixtureOverride=identifier == nil || identifier?.hasSuffix(".validation") == true
        if allowsFixtureOverride,let override=ProcessInfo.processInfo.environment["ORACLE_ENGINE_RESOURCES"] { return URL(fileURLWithPath:override) }
        return Bundle.main.resourceURL!.appendingPathComponent("engine")
    }
    func engineEnvironment(existing:Bool=false)->[String:String] {
        // Intentionally no inherited API keys, DATABASE_URL, proxy, or model settings.
        var env=["PATH":"/usr/bin:/bin:/usr/sbin:/sbin","HOME":home.appendingPathComponent("gbrain/execution-home").path,
                 "TMPDIR":home.appendingPathComponent("gbrain/tmp").path,"LANG":"en_US.UTF-8",
                 "GBRAIN_SKIP_UPDATE_CHECK":"1","GBRAIN_HOOKS":"0","GBRAIN_DATABASE_URL":"","DATABASE_URL":""]
        env["ORACLE_CANCEL_FILE"]=home.appendingPathComponent("onboarding/cancel").path
        env["GBRAIN_HOME"] = existing ? (config["gbrainProfile"] as? String ?? config["gbrainWorkspace"] as? String ?? home.appendingPathComponent("gbrain/unselected-profile").path) : home.appendingPathComponent("gbrain/profile").path
        return env
    }
    func prepareEngineScratch() throws {
        for path in ["gbrain/execution-home","gbrain/tmp"] { try fm.createDirectory(at:home.appendingPathComponent(path),withIntermediateDirectories:true,attributes:[.posixPermissions:0o700]) }
    }
    func validateExternalGBrainProfile(_ profile:URL) throws {
        let path = try scoped(".gbrain/config.json",root:profile.resolvingSymlinksInPath())
        let attributes=try path.resourceValues(forKeys:[.isRegularFileKey,.fileSizeKey])
        guard attributes.isRegularFile == true,(attributes.fileSize ?? Int.max) <= 1_000_000 else {
            throw failure("Selecione o perfil que contém .gbrain/config.json. O perfil global não será usado automaticamente.")
        }
        let document=try readJSON(path)
        guard document["remote_mcp"] == nil || document["remote_mcp"] is NSNull else { throw failure("O modo offline exige um banco local, não um perfil remoto.") }
        let engine=document["engine"] as? String ?? (document["database_path"] is String ? "pglite" : "postgres")
        if engine == "pglite" {
            guard let database=document["database_path"] as? String,database.hasPrefix("/"),fm.fileExists(atPath:database) else { throw failure("O perfil selecionado precisa declarar um database_path local existente e absoluto.") }
        } else if engine == "postgres" {
            guard let raw=document["database_url"] as? String,let url=URLComponents(string:raw),
                  ["postgres","postgresql"].contains(url.scheme ?? ""),["localhost","127.0.0.1","::1","[::1]"].contains(url.host ?? ""),
                  !(url.queryItems ?? []).contains(where:{ ["host","hostaddr","service","servicefile"].contains($0.name.lowercased()) }) else {
                throw failure("O perfil precisa declarar explicitamente um banco local. Nenhum endpoint do ambiente será utilizado.")
            }
        } else { throw failure("O perfil selecionado declara um motor não suportado.") }
    }
    func selectExternalGBrain(workspace:URL, profile:URL) throws {
        let workspace=workspace.resolvingSymlinksInPath(),profile=profile.resolvingSymlinksInPath()
        try validateExternalGBrainProfile(profile)
        config["gbrainWorkspace"]=workspace.path;config["gbrainProfile"]=profile.path;config["gbrainAccess"]=true
        try persist();memorySync.invalidate(reason:"external-profile-selected")
    }
    func gbrainRead(_ params:[String:Any],allowSetup:Bool=false) throws -> Any {
        refreshConfig()
        if !allowSetup && config["gbrainAccess"] as? Bool == false { throw failure("Acesso à memória revogado. Conecte a instalação desejada na configuração.") }
        let existing=allowSetup ? nil : config["gbrainWorkspace"] as? String
        let cwd=existing.map{URL(fileURLWithPath:$0)} ?? home.appendingPathComponent("gbrain/workspace")
        if existing != nil { try validateExternalGBrainProfile(URL(fileURLWithPath:config["gbrainProfile"] as? String ?? cwd.path)) }
        try prepareEngineScratch()
        guard fm.fileExists(atPath:cwd.path) else { throw failure("GBrain ainda não foi preparado. Continue a instalação local na configuração do Oracle.") }
        let operation=params["operation"] as? String ?? "status"
        guard ["status","search","list","get","graph"].contains(operation) else { throw failure("Operação GBrain não suportada") }
        var environment=engineEnvironment(existing:existing != nil)
        // A paused setup is not a revocation of already configured read access.
        if !allowSetup { environment.removeValue(forKey:"ORACLE_CANCEL_FILE") }
        let result=try runProcess(engineResources().appendingPathComponent("oracle-gbrain-read"),[],cwd:cwd,environment:environment,input:jsonData(params),timeout:35)
        guard let line=result.output.split(separator:"\n").last(where:{$0.hasPrefix("{")}),let data=String(line).data(using:.utf8),let response=try JSONSerialization.jsonObject(with:data) as? [String:Any] else { throw failure("GBrain indisponível: saída incompatível, engine ocupada ou perfil ausente") }
        guard result.code == 0,response["ok"] as? Bool == true else {
            if operation == "get" || operation == "graph" { memorySync.invalidate(reason:"read-refused-stale-or-busy") }
            throw failure(response["error"] as? String ?? "Falha de conexão GBrain")
        }
        try event(type:"gbrain.read",summary:"Consulta \(operation) realizada pela biblioteca oficial; sem inferência")
        if operation == "status",var value=response["value"] as? [String:Any] { value["memorySync"]=memorySync.status();return value }
        if operation=="get",existing==nil,params["source"] as? String=="oracle-vault",var page=response["value"] as? [String:Any],let manifest=try? readJSON(home.appendingPathComponent("gbrain/profile/oracle-vault-manifest.json")),let records=manifest["records"] as? [[String:Any]],let record=records.first(where:{$0["slug"] as? String==page["slug"] as? String}),let relative=record["path"] as? String,let root=try? vault(),manifest["root"] as? String==root.path,let canonical=try? scoped(relative,root:root) { page["canonical_path"]=canonical.path;page["indexed_hash"]=record["sha256"];page["index_verified_at"]=manifest["at"];return page }
        return response["value"] ?? NSNull()
    }
    func official(_ args:[String],workspace:URL) throws -> String {
        try prepareEngineScratch()
        let r=try runProcess(engineResources().appendingPathComponent("gbrain"),args,cwd:workspace,environment:engineEnvironment(),timeout:180)
        guard r.code==0 else { throw failure(gbrainFailureMessage(r)) }
        return r.output
    }
    func prepareGBrain() throws -> [String:Any] {
        try withVaultWrite { try prepareGBrainLocked() }
    }
    private func prepareGBrainLocked() throws -> [String:Any] {
        let plan=try validatedPlan()
        guard plan["attach"] as? Bool != true else { throw failure("Instalação existente: use conexão/consulta; não inicialize outro banco") }
        guard let hash=plan["plan_hash"] as? String,let answers=plan["answers"] as? [String:String] else { throw failure("Plano sem confirmação válida") }
        let workspace=home.appendingPathComponent("gbrain/workspace")
        if let cached=try? readJSON(home.appendingPathComponent("setup/gbrain-readback.json")),cached["plan_hash"] as? String==hash,fm.fileExists(atPath:home.appendingPathComponent("gbrain/profile/.gbrain/config.json").path),fm.fileExists(atPath:workspace.appendingPathComponent("state/interview.json").path) { return cached }
        try fm.createDirectory(at:workspace,withIntermediateDirectories:true)
        let configURL=home.appendingPathComponent("gbrain/profile/.gbrain/config.json")
        if !fm.fileExists(atPath:configURL.path) { _=try official(["init","--pglite","--no-embedding"],workspace:workspace); try event(type:"gbrain.engine_verified",summary:"GBrain 0.48.4.0 inicializado em perfil isolado PGLite, sem chave") }
        try writeJSON(["owner":"OracleCompanion","schema_version":1],home.appendingPathComponent("gbrain/profile/oracle-owned.json"))
        let interview=workspace.appendingPathComponent("state/interview.json")
        if !fm.fileExists(atPath:interview.path) { _=try official(["bootstrap","interview","--init","--workspace",workspace.path],workspace:workspace) }
        for key in answers.keys.sorted() { _=try official(["bootstrap","interview","--set",key,answers[key]!,"--workspace",workspace.path],workspace:workspace) }
        let output=try official(["bootstrap","interview","--show","--workspace",workspace.path],workspace:workspace)
        let marker="read-back hash: "
        guard let range=output.range(of:marker) else { throw failure("GBrain não produziu hash de revisão") }
        let upstreamHash=String(output[range.upperBound...].prefix(while:{$0.isHexDigit}))
        guard upstreamHash.count>=32 else { throw failure("Hash upstream inválido") }
        let receipt:[String:Any]=["plan_hash":hash,"upstream_hash":upstreamHash,"readback":output,"workspace":workspace.path,"status":"awaiting_readback_confirmation"]
        try writeJSON(receipt,home.appendingPathComponent("setup/gbrain-readback.json"))
        try event(type:"gbrain.readback_ready",summary:"Entrevista oficial pronta para revisão do conteúdo e hash")
        return receipt
    }
    func confirmGBrain(_ hash:String)throws {
        var receipt=try readJSON(home.appendingPathComponent("setup/gbrain-readback.json"))
        guard receipt["upstream_hash"] as? String==hash else { throw failure("A entrevista mudou; revise novamente") }
        receipt["confirmed_hash"]=hash; try writeJSON(receipt,home.appendingPathComponent("setup/gbrain-readback.json"))
    }
    func finishGBrain() throws -> [String:Any] {
        try withVaultWrite {
            defer { notifyVaultChanged(reason:"gbrain-setup") }
            return try finishGBrainLocked()
        }
    }
    private func finishGBrainLocked() throws -> [String:Any] {
        var receipt=try readJSON(home.appendingPathComponent("setup/gbrain-readback.json"))
        let plan=try validatedPlan()
        guard let hash=receipt["confirmed_hash"] as? String,hash==receipt["upstream_hash"] as? String,receipt["plan_hash"] as? String==plan["confirmed_hash"] as? String else { throw failure("Revise e confirme a entrevista oficial no Oracle") }
        let workspace=home.appendingPathComponent("gbrain/workspace")
        _=try official(["bootstrap","interview","--confirm",hash,"--workspace",workspace.path],workspace:workspace)
        let renderReceipt=home.appendingPathComponent("setup/identity-render.json")
        let prior=try? readJSON(renderReceipt)
        let identities=["SOUL.md","USER.md","AGENTS.md","MEMORY.md","HEARTBEAT.md","ACCESS_POLICY.md","CLAUDE.md","GITHUB.md","memory/README.md"]
        var current=[String:String]()
        for path in identities { let url=workspace.appendingPathComponent(path);if fm.fileExists(atPath:url.path) { current[path]=digest(try Data(contentsOf:url)) } }
        let answersHash=plan["answers_hash"] as! String
        if let prior {
            guard NSDictionary(dictionary:current).isEqual(to:prior["files"] as? [String:String] ?? [:]) else { throw failure("Identidade editada fora do Oracle. Revise os arquivos em \(workspace.path) no Codex antes de atualizar; nenhuma versão foi sobrescrita.") }
            if prior["answers_hash"] as? String != answersHash { _=try official(["bootstrap","render","--force","--workspace",workspace.path],workspace:workspace) }
        } else {
            guard current.isEmpty else { throw failure("Identidade preexistente sem recibo Oracle. Conecte a instalação existente ou revise esse workspace no Codex: \(workspace.path)") }
            _=try official(["bootstrap","render","--workspace",workspace.path],workspace:workspace)
        }
        current=[:];for path in identities { let url=workspace.appendingPathComponent(path);if fm.fileExists(atPath:url.path) { current[path]=digest(try Data(contentsOf:url)) } }
        guard current["SOUL.md"] != nil,current["USER.md"] != nil else { throw failure("GBrain não produziu SOUL.md e USER.md") }
        try writeJSON(["answers_hash":answersHash,"files":current],renderReceipt)
        try publishIdentityNote(plan:plan,workspace:workspace)
        try event(type:"gbrain.identity_verified",summary:"Identidade renderizada pelo GBrain oficial após confirmação do hash")
        let root=try vault()
        let existingStatus=try gbrainRead(["operation":"status"],allowSetup:true) as? [String:Any]
        let sources=existingStatus?["sources"] as? [[String:Any]] ?? []
        if let source=sources.first(where:{$0["id"] as? String == "oracle-vault"}) {
            if let path=source["local_path"] as? String, path != root.path { throw failure("Fonte oracle-vault aponta para outro destino; reconciliação necessária") }
        } else { _=try official(["sources","add","oracle-vault","--name","Oracle vault"],workspace:workspace) }
        let memoryRoot=try scoped("INBOX/oracle-memory",root:root);try fm.createDirectory(at:memoryRoot,withIntermediateDirectories:true)
        if let memory=sources.first(where:{$0["id"] as? String=="oracle-memory"}) {
            guard memory["local_path"] as? String==memoryRoot.path else { throw failure("A fonte oracle-memory aponta para outro destino. Revise a fonte no GBrain antes de continuar.") }
        } else { _=try official(["sources","add","oracle-memory","--path",memoryRoot.path,"--name","Oracle memory","--force"],workspace:workspace) }
        _=try official(["config","set","search.mcp_keyword_only","true"],workspace:workspace)
        let scan=try scanSnapshot(root:root)
        let indexed=try indexVaultSnapshot(scan,generation:0,planRef:plan["id"] as? String,budget:120,maxUpserts:5000)
        guard indexed["complete"] as? Bool == true else { throw failure("Indexação parcial. Os avanços estão no checkpoint; retome o mesmo plano. Nenhum arquivo original foi alterado.") }
        try event(type:"gbrain.index_verified",summary:"Vault indexado pelo GBrain sem embeddings ou extração por modelo")
        config["gbrainVaultSource"]="oracle-vault";config["gbrainAccess"]=true;config.removeValue(forKey:"gbrainWorkspace");config.removeValue(forKey:"gbrainProfile");try persist()
        let status=try gbrainRead(["operation":"status"],allowSetup:true)
        receipt["status"]="identity_and_index_verified";receipt["engine_status"]=status;receipt["codex_trust"]="not_verified"
        try writeJSON(receipt,home.appendingPathComponent("setup/gbrain-readback.json"))
        return receipt
    }
    func publishIdentityNote(plan:[String:Any],workspace:URL) throws {
        try withVaultWrite {
            defer { notifyVaultChanged(reason:"identity-note") }
            try publishIdentityNoteLocked(plan:plan,workspace:workspace)
        }
    }
    private func publishIdentityNoteLocked(plan:[String:Any],workspace:URL) throws {
        let relative="INBOX/oracle/Oracle - identidade.md",root=try vault()
        let url=try scoped(relative,root:root)
        let answers=plan["answers"] as? [String:String] ?? [:]
        var text="---\ntitle: Identidade Oracle\ntype: note\nanswers_hash: \(plan["answers_hash"] as? String ?? "")\n---\n\n# Identidade Oracle\n\nRespostas confirmadas na configuração. O perfil de execução é uma projeção produzida pelo GBrain oficial.\n"
        for key in ["AGENT_NAME","PRINCIPAL_NAME","AGENT_PURPOSE","AGENT_TOP_JOBS","PRINCIPAL_CONTEXT","VOICE_REGISTER","PRINCIPAL_TIMEZONE"] { if let answer=answers[key] { text += "\n## \(key)\n\n"+answer.split(separator:"\n",omittingEmptySubsequences:false).map{"> "+$0}.joined(separator:"\n")+"\n" } }
        let data=Data(text.utf8),hash=digest(data),receiptURL=home.appendingPathComponent("setup/identity-note.json")
        let prior=try? readJSON(receiptURL)
        var owned=prior?["owned"] as? Bool ?? false
        try coordinatedWrite(at:url) { destination in
        guard try scoped(relative,root:root).path == destination.path else { throw failure("O destino da identidade mudou.") }
        if fm.fileExists(atPath:url.path) {
            let existing=try Data(contentsOf:url)
            if digest(existing) != hash {
                guard owned,prior?["hash"] as? String==digest(existing) else { throw failure("Nota de identidade preservada por conflito: \(url.path). Revise no Codex.") }
                let backup=home.appendingPathComponent("versions/identity-\(UUID().uuidString).md");try fm.createDirectory(at:backup.deletingLastPathComponent(),withIntermediateDirectories:true);try existing.write(to:backup,options:.atomic);try data.write(to:url,options:.atomic)
            }
        } else { try fm.createDirectory(at:url.deletingLastPathComponent(),withIntermediateDirectories:true);try data.write(to:url,options:.withoutOverwriting);owned=true }
        }
        try writeJSON(["path":relative,"hash":hash,"owned":owned,"origin_source_path":workspace.path],receiptURL)
        try event(type:"gbrain.identity_note_verified",summary:"Identidade confirmada disponível no Inbox",id:(plan["id"] as! String)+"identity-note"+hash,details:["run_id":plan["id"]!,"subject_refs":[["path":relative,"directory":false,"hash":hash]]])
    }

    /// Caller owns the named gbrain lock. The coordinator invokes this only on
    /// its separate index queue, with a finite budget and finite resume count.
    func indexVaultSnapshot(_ snapshot:VaultScanSnapshot,generation:Int,planRef:String? = nil,
                           budget:Double = 25,maxUpserts:Int = 500,cancellation:URL? = nil) throws -> [String:Any] {
        try withVaultWrite {
            try prepareEngineScratch()
            var env=engineEnvironment();env["ORACLE_RECEIPT_DIR"]=home.appendingPathComponent("events").path
            if let planRef { env["ORACLE_PLAN_EVENTS_DIR"]=home.appendingPathComponent("setup/events/\(planRef)").path }
            else { env.removeValue(forKey:"ORACLE_CANCEL_FILE") }
            if let cancellation { env["ORACLE_CANCEL_FILE"]=cancellation.path }
            let payload:[String:Any] = ["operation":"index","source":"oracle-vault","root":snapshot.root.path,
                "files":snapshot.files,"scan_complete":snapshot.complete,"generation":generation,
                "snapshot_signature":snapshot.signature,"budget_ms":Int(budget*1000),"max_upserts":maxUpserts,"plan_ref":planRef ?? ""]
            let result=try runProcess(engineResources().appendingPathComponent("oracle-gbrain-read"),[],
                cwd:home.appendingPathComponent("gbrain/workspace"),environment:env,input:jsonData(payload),timeout:budget+15)
            guard result.code == 0,let line=result.output.split(separator:"\n").last(where:{$0.hasPrefix("{")}),
                  let response=try JSONSerialization.jsonObject(with:Data(line.utf8)) as? [String:Any],response["ok"] as? Bool == true,
                  let value=response["value"] as? [String:Any] else { throw failure("O motor não confirmou a indexação. Checkpoint e notas preservados.") }
            return value
        }
    }
}
