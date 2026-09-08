import Foundation

struct ProcessResult { let code:Int32; let output:String }
func runProcess(_ executable:URL, _ args:[String], cwd:URL, environment:[String:String], input:Data? = nil, timeout:Double = 90) throws -> ProcessResult {
    let process = Process(); process.executableURL=executable; process.arguments=args; process.currentDirectoryURL=cwd; process.environment=environment
    let output = Pipe(), errors = Pipe(), stdin = Pipe(); process.standardOutput=output; process.standardError=errors; process.standardInput=stdin
    let lock=NSLock(); var bytes=Data(), errorBytes=Data()
    output.fileHandleForReading.readabilityHandler = { handle in let d=handle.availableData; lock.lock(); if bytes.count < 4_000_000 { bytes.append(d) }; lock.unlock() }
    errors.fileHandleForReading.readabilityHandler = { handle in let d=handle.availableData; lock.lock(); if errorBytes.count < 100_000 { errorBytes.append(d) }; lock.unlock() }
    try process.run()
    if let input { stdin.fileHandleForWriting.write(input) }; try? stdin.fileHandleForWriting.close()
    let deadline=Date().addingTimeInterval(timeout)
    while process.isRunning && Date()<deadline { Thread.sleep(forTimeInterval:0.03) }
    if process.isRunning { process.terminate(); throw failure("GBrain excedeu o tempo de resposta; confira o estado antes de retomar") }
    process.waitUntilExit(); output.fileHandleForReading.readabilityHandler=nil; errors.fileHandleForReading.readabilityHandler=nil
    let tail=output.fileHandleForReading.readDataToEndOfFile(), errorTail=errors.fileHandleForReading.readDataToEndOfFile()
    lock.lock(); bytes.append(tail); errorBytes.append(errorTail); let out=String(decoding:bytes,as:UTF8.self); let err=String(decoding:errorBytes,as:UTF8.self); lock.unlock()
    return ProcessResult(code:process.terminationStatus,output:out + (process.terminationStatus == 0 ? "" : "\n"+err))
}
extension Core {
    func engineResources() -> URL {
        if let override=ProcessInfo.processInfo.environment["ORACLE_ENGINE_RESOURCES"] { return URL(fileURLWithPath:override) }
        return Bundle.main.resourceURL!.appendingPathComponent("engine")
    }
    func engineEnvironment(existing:Bool=false)->[String:String] {
        // Intentionally no inherited API keys, DATABASE_URL, proxy, or model settings.
        var env=["PATH":"/usr/bin:/bin:/usr/sbin:/sbin","HOME":fm.homeDirectoryForCurrentUser.path,"LANG":"en_US.UTF-8","GBRAIN_SKIP_UPDATE_CHECK":"1","GBRAIN_HOOKS":"0"]
        if !existing { env["GBRAIN_HOME"]=home.appendingPathComponent("gbrain/profile").path }
        return env
    }
    func gbrainRead(_ params:[String:Any],allowSetup:Bool=false) throws -> Any {
        refreshConfig()
        if !allowSetup && config["gbrainAccess"] as? Bool == false { throw failure("Acesso à memória revogado. Conecte a instalação desejada na configuração.") }
        let existing=allowSetup ? nil : config["gbrainWorkspace"] as? String
        let cwd=existing.map{URL(fileURLWithPath:$0)} ?? home.appendingPathComponent("gbrain/workspace")
        guard fm.fileExists(atPath:cwd.path) else { throw failure("GBrain ainda não foi preparado. Continue a instalação pelo Codex.") }
        let operation=params["operation"] as? String ?? "status"
        guard ["status","search","list","get","graph"].contains(operation) else { throw failure("Operação GBrain não suportada") }
        let result=try runProcess(engineResources().appendingPathComponent("oracle-gbrain-read"),[],cwd:cwd,environment:engineEnvironment(existing:existing != nil),input:jsonData(params),timeout:35)
        guard let line=result.output.split(separator:"\n").last(where:{$0.hasPrefix("{")}),let data=String(line).data(using:.utf8),let response=try JSONSerialization.jsonObject(with:data) as? [String:Any] else { throw failure("GBrain indisponível: saída incompatível, engine ocupada ou perfil ausente") }
        guard response["ok"] as? Bool == true else { throw failure(response["error"] as? String ?? "Falha de conexão GBrain") }
        try event(type:"gbrain.read",summary:"Consulta \(operation) realizada pela biblioteca oficial; sem inferência")
        if operation=="get",existing==nil,params["source"] as? String=="oracle-vault",var page=response["value"] as? [String:Any],let manifest=try? readJSON(home.appendingPathComponent("gbrain/profile/oracle-vault-manifest.json")),let records=manifest["records"] as? [[String:Any]],let record=records.first(where:{$0["slug"] as? String==page["slug"] as? String}),let relative=record["path"] as? String,let root=try? vault(),manifest["root"] as? String==root.path,let canonical=try? scoped(relative,root:root) { page["canonical_path"]=canonical.path;page["indexed_hash"]=record["sha256"];page["index_verified_at"]=manifest["at"];return page }
        return response["value"] ?? NSNull()
    }
    func official(_ args:[String],workspace:URL) throws -> String {
        let r=try runProcess(engineResources().appendingPathComponent("gbrain"),args,cwd:workspace,environment:engineEnvironment(),timeout:180)
        guard r.code==0 else { throw failure("GBrain (\(r.code)): \(r.output.prefix(1800))") }
        return r.output
    }
    func prepareGBrain() throws -> [String:Any] {
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
        let files=try scan(root:root).filter{$0["directory"] as? Bool != true}.compactMap{$0["path"] as? String}
        var env=engineEnvironment();env["ORACLE_RECEIPT_DIR"]=home.appendingPathComponent("events").path;env["ORACLE_PLAN_EVENTS_DIR"]=home.appendingPathComponent("setup/events/\(plan["id"] as! String)").path
        let indexed=try runProcess(engineResources().appendingPathComponent("oracle-gbrain-read"),[],cwd:workspace,environment:env,input:jsonData(["operation":"index","source":"oracle-vault","root":root.path,"files":files,"plan_ref":plan["id"] ?? ""]),timeout:600)
        guard let line=indexed.output.split(separator:"\n").last(where:{$0.hasPrefix("{")}),let data=String(line).data(using:.utf8),let result=try JSONSerialization.jsonObject(with:data) as? [String:Any],let value=result["value"] as? [String:Any],value["complete"] as? Bool==true else { throw failure("Indexação parcial ou indisponível. Veja os recibos; retome o mesmo plano. Nenhum arquivo original foi alterado.") }
        try event(type:"gbrain.index_verified",summary:"Vault indexado pelo GBrain sem embeddings ou extração por modelo")
        config["gbrainVaultSource"]="oracle-vault";config["gbrainAccess"]=true;config.removeValue(forKey:"gbrainWorkspace");try persist()
        let status=try gbrainRead(["operation":"status"],allowSetup:true)
        receipt["status"]="identity_and_index_verified";receipt["engine_status"]=status;receipt["codex_trust"]="not_verified"
        try writeJSON(receipt,home.appendingPathComponent("setup/gbrain-readback.json"))
        return receipt
    }
    func publishIdentityNote(plan:[String:Any],workspace:URL) throws {
        let relative="INBOX/oracle/Oracle - identidade.md",root=try vault()
        let url=try scoped(relative,root:root)
        let answers=plan["answers"] as? [String:String] ?? [:]
        var text="---\ntitle: Identidade Oracle\ntype: note\nanswers_hash: \(plan["answers_hash"] as? String ?? "")\n---\n\n# Identidade Oracle\n\nRespostas confirmadas na configuração. O perfil de execução é uma projeção produzida pelo GBrain oficial.\n"
        for key in ["AGENT_NAME","PRINCIPAL_NAME","AGENT_PURPOSE","AGENT_TOP_JOBS","PRINCIPAL_CONTEXT","VOICE_REGISTER","PRINCIPAL_TIMEZONE"] { if let answer=answers[key] { text += "\n## \(key)\n\n"+answer.split(separator:"\n",omittingEmptySubsequences:false).map{"> "+$0}.joined(separator:"\n")+"\n" } }
        let data=Data(text.utf8),hash=digest(data),receiptURL=home.appendingPathComponent("setup/identity-note.json")
        let prior=try? readJSON(receiptURL)
        var owned=prior?["owned"] as? Bool ?? false
        if fm.fileExists(atPath:url.path) {
            let existing=try Data(contentsOf:url)
            if digest(existing) != hash {
                guard owned,prior?["hash"] as? String==digest(existing) else { throw failure("Nota de identidade preservada por conflito: \(url.path). Revise no Codex.") }
                let backup=home.appendingPathComponent("versions/identity-\(UUID().uuidString).md");try fm.createDirectory(at:backup.deletingLastPathComponent(),withIntermediateDirectories:true);try existing.write(to:backup,options:.atomic);try data.write(to:url,options:.atomic)
            }
        } else { try fm.createDirectory(at:url.deletingLastPathComponent(),withIntermediateDirectories:true);try data.write(to:url,options:.withoutOverwriting);owned=true }
        try writeJSON(["path":relative,"hash":hash,"owned":owned,"origin_source_path":workspace.path],receiptURL)
        try event(type:"gbrain.identity_note_verified",summary:"Identidade confirmada disponível no Inbox",id:(plan["id"] as! String)+"identity-note"+hash,details:["run_id":plan["id"]!,"subject_refs":[["path":relative,"directory":false,"hash":hash]]])
    }

}
