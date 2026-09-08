import Foundation

let onboardingActiveStatuses:Set<String>=["starting","running","cancelling"]
extension Core {
    func codexPluginSnapshot() -> [String:Any] {
        var inventory=(try? readJSON(home.appendingPathComponent("onboarding/plugins.json"))) ?? ["status":"unavailable","plugins":[],"reason":"Conecte ao Codex para verificar os plugins"]
        let connected=(try? readJSON(home.appendingPathComponent("onboarding/connection.json")))?["connected"] as? Bool==true
        let checked=(inventory["checkedAt"] as? String).flatMap{ISO8601DateFormatter().date(from:$0)} ?? .distantPast
        if !connected || Date().timeIntervalSince(checked)>180 {
            inventory["status"]="unavailable";inventory["reason"]="Conexões aguardando nova verificação"
            inventory["plugins"]=(inventory["plugins"] as? [[String:Any]] ?? []).map{r in var row=r;if row["status"] as? String=="connected"{row["status"]="unavailable";row["detail"]="Conexão não verificada agora"};return row}
        }
        return inventory
    }
    var onboardingURL:URL {home.appendingPathComponent("onboarding/state.json")}
    func onboardingRecord() -> [String:Any] {(try? readJSON(onboardingURL)) ?? [:]}
    func onboardingLegacyAccess() -> Bool {
        // Adopt only an existing configured profile. A newly chosen vault is never an activation.
        let state=onboardingRecord()
        if let legacy=state["legacyAccess"] as? Bool{return legacy}
        return state.isEmpty && config["vault"] as? String != nil
    }
    func onboardingSnapshot() throws -> [String:Any] {
        refreshConfig();var value=onboardingRecord()
        if value.isEmpty {
            value=["schemaVersion":1,"status":"not_started","legacyAccess":config["vault"] as? String != nil]
            try writeJSON(value,onboardingURL)
        }
        value["licensed"]=activeLicense() != nil
        value["deviceID"]=try licenseDeviceID()
        value["vaultName"]=(config["vault"] as? String).map{URL(fileURLWithPath:$0).lastPathComponent} ?? ""
        value["hasVault"]=(try? vault()) != nil
        if value["hasVault"] as? Bool==false && value["status"] as? String=="completed" {value["status"]="configuring";value["runID"]=NSNull();value["message"]="Escolha seu Obsidian para continuar."}
        value["hasExistingBrain"]=config["gbrainWorkspace"] as? String != nil
        value["codexConnected"]=(try? readJSON(home.appendingPathComponent("onboarding/connection.json")))?["connected"] as? Bool ?? false
        let progress=try onboardingProgress();value["confirmed"]=progress
        value["completed"]=progress.count;value["total"]=NSNull()
        if onboardingActiveStatuses.contains(value["status"] as? String ?? ""), let pid=value["ownerPID"] as? Int32,kill(pid,0) != 0,errno==ESRCH {value["status"]="interrupted";value["message"]="A configuração foi interrompida. Retome do último ponto confirmado."}
        if let r=try? readJSON(home.appendingPathComponent("setup/gbrain-readback.json")),r["status"] as? String=="awaiting_readback_confirmation",let plan=try? readJSON(home.appendingPathComponent("setup/plan.json")),r["plan_hash"] as? String==plan["plan_hash"] as? String,r["confirmed_hash"]==nil {
            value["readback"]=["text":r["readback"] ?? "","hash":r["upstream_hash"] ?? ""]
        }
        // Paths and protocol payloads are internal. The view only gets user-facing state.
        value.removeValue(forKey:"ownerPID");return value
    }
    func onboardingProgress() throws -> [[String:Any]] {
        let record=onboardingRecord();guard let run=record["runID"] as? String,let plan=try? readJSON(home.appendingPathComponent("setup/plan.json")),plan["id"] as? String==run,plan["vault"] as? String==config["vault"] as? String else{return []}
        if record["status"] as? String=="completed",let saved=record["formation"] as? [[String:Any]],record["confirmedAt"] is String {return saved}
        var confirmed=[[String:Any]]()
        if record["codexStarted"] as? Bool==true {confirmed.append(["id":"sol","kind":"core","label":"Oracle","evidence":"Codex turn/start"])}
        if let root=try? vault(),let journal=try? readJSON(home.appendingPathComponent("setup/\(run).json")),journal["status"] as? String=="structure_verified" {
            confirmed.append(["id":"obsidian","kind":"connector","label":root.lastPathComponent,"evidence":"vault readback"])
            let events=try self.events(directory:home.appendingPathComponent("setup/events/\(run)"),limit:10000)
            var seen=Set<String>()
            for event in events where ["setup.skill_verified","catalog.skill_verified","setup.catalog_verified","catalog.files_verified","gbrain.index_progress","gbrain.identity_note_verified"].contains(event["event_type"] as? String ?? "") {
                for ref in event["subject_refs"] as? [[String:Any]] ?? [] {
                    guard let path=ref["path"] as? String,path.hasSuffix("/SKILL.md"),let file=try? scoped(path,root:root),let data=try? Data(contentsOf:file),let hash=ref["hash"] as? String,hash==digest(data),seen.insert(path).inserted else{continue}
                    confirmed.append(["id":path,"kind":"skill","label":file.deletingLastPathComponent().lastPathComponent,"path":path,"evidence":"file hash verified"])
                }
            }
        }
        if let receipt=try? readJSON(home.appendingPathComponent("setup/gbrain-readback.json")),receipt["status"] as? String=="identity_and_index_verified",receipt["plan_hash"] as? String==plan["plan_hash"] as? String {
            confirmed.insert(["id":"gbrain","kind":"connector","label":"Second Brain","evidence":"GBrain identity and index readback"],at:min(2,confirmed.count))
        } else if record["existingBrainVerified"] as? Bool==true {
            confirmed.insert(["id":"gbrain","kind":"connector","label":"Second Brain","evidence":"existing GBrain query"],at:min(2,confirmed.count))
        }
        return confirmed
    }
    func checkOnboardingCancellation() throws {
        if fm.fileExists(atPath:home.appendingPathComponent("onboarding/cancel").path){throw failure("Instalação cancelada. Os itens já confirmados foram preservados.")}
    }
    func onboardingFinalVerification() throws -> [String:Any] {
        refreshConfig();let plan=try validatedPlan();_ = try applyPlan(verifyOnly:true)
        if plan["attach"] as? Bool != true {
            let receipt=try readJSON(home.appendingPathComponent("setup/gbrain-readback.json"))
            guard receipt["status"] as? String=="identity_and_index_verified",receipt["plan_hash"] as? String==plan["plan_hash"] as? String else{throw failure("A memória ainda não concluiu a configuração.")}
        }
        _=try gbrainRead(["operation":"status"])
        let bridge=try readJSON(home.appendingPathComponent("setup/bridge.json"))
        guard let root=bridge["workspace"] as? String,let skill=bridge["skill"] as? String,skill.hasPrefix(root+"/"),let expected=bridge["skill_sha256"] as? String,expected==digest(try Data(contentsOf:URL(fileURLWithPath:skill))) else{throw failure("A instalação da skill no Codex ainda não foi verificada.")}
        return ["structure":true,"memory":true,"skill":true,"hooksTrusted":false]
    }
}

/// All mutations are serialized here, apart from cancel (a protocol interrupt plus a marker).
/// The UI polls a small persisted projection, never agent prose or the whole transcript.
final class OnboardingController {
    let core:Core
    let queue=DispatchQueue(label:"oracle.onboarding")
    let notifications=DispatchQueue(label:"oracle.onboarding.events")
    let bridge:CodexConnection
    private let stateLock=NSRecursiveLock()
    private var loadedThreadID:String?
    private var earlyCompletions=[String:[String:Any]]()
    private var pendingRequests=[String:(Any,String,[String:Any])](),loginID:String?
    private var inventoryTimer:DispatchSourceTimer?
    var openLogin:((URL)->Void)?
    init(home:URL,bridge:CodexConnection=CodexBridge(),automaticallyReconnect:Bool=true) throws {
        self.bridge=bridge
        core=try Core(home:home)
        _=try core.onboardingSnapshot()
        // A cached login or inventory is never treated as a live connection after launch.
        try writeJSON(["connected":false],home.appendingPathComponent("onboarding/connection.json"))
        if var inventory=try? readJSON(home.appendingPathComponent("onboarding/plugins.json")) {inventory["status"]="unavailable";inventory["reason"]="Reconecte ao Codex para verificar os plugins";inventory["plugins"]=(inventory["plugins"] as? [[String:Any]] ?? []).map{r in var x=r;if x["status"] as? String=="connected"{x["status"]="unavailable"};return x};try writeJSON(inventory,home.appendingPathComponent("onboarding/plugins.json"))}
        let prior=core.onboardingRecord()
        if onboardingActiveStatuses.contains(prior["status"] as? String ?? "") {try update(["status":"interrupted","message":"Retome a configuração para conferir o último ponto salvo."])}
        bridge.onNotification={ [weak self] method,params in self?.notifications.async { self?.notification(method,params) } }
        bridge.onRequest={ [weak self] id,method,params in self?.notifications.async {self?.receivedRequest(id,method,params)} }
        bridge.onDisconnect={ [weak self] in self?.notifications.async {self?.disconnected()} }
        if automaticallyReconnect && (core.onboardingLegacyAccess() || core.onboardingRecord()["codexAuthorized"] as? Bool==true) {
            queue.async { [weak self] in self?.restoreConnection() }
        }
        let timer=DispatchSource.makeTimerSource(queue:queue);timer.schedule(deadline:.now()+60,repeating:60)
        timer.setEventHandler { [weak self] in guard let self,self.bridge.isRunning,!onboardingActiveStatuses.contains(self.core.onboardingRecord()["status"] as? String ?? "") else{return};_ = try? self.refreshPlugins() };timer.resume();inventoryTimer=timer
    }
    private func restoreConnection() {
        do {try bridge.start(cwd:core.home);let account=try bridge.account();try writeJSON(account,core.home.appendingPathComponent("onboarding/connection.json"));if account["connected"] as? Bool==true {_ = try refreshPlugins()}}catch{disconnected()}
    }
    func shutdown() {
        inventoryTimer?.cancel();inventoryTimer=nil
        if onboardingActiveStatuses.contains(core.onboardingRecord()["status"] as? String ?? "") || core.onboardingRecord()["request"] is [String:Any] {
            try? Data("cancel".utf8).write(to:core.home.appendingPathComponent("onboarding/cancel"),options:.atomic)
            try? update(["status":"interrupted","message":"Configuração pausada ao fechar o Oracle. Retome para continuar."])
        }
        bridge.stop()
        try? writeJSON(["connected":false],core.home.appendingPathComponent("onboarding/connection.json"))
    }
    deinit {inventoryTimer?.cancel();bridge.stop()}
    func update(_ changes:[String:Any]) throws {
        stateLock.lock();defer{stateLock.unlock()};var state=core.onboardingRecord();for(k,v) in changes{state[k]=v};state["updatedAt"]=ISO8601DateFormatter().string(from:Date());try writeJSON(state,core.onboardingURL)
    }
    private func disconnected() {
        stateLock.lock();loadedThreadID=nil;stateLock.unlock()
        try? writeJSON(["connected":false],core.home.appendingPathComponent("onboarding/connection.json"))
        if onboardingActiveStatuses.contains(core.onboardingRecord()["status"] as? String ?? ""){try? update(["status":"interrupted","message":"A conexão com o Codex foi interrompida. Seus avanços foram preservados."])}
    }
    func connect() throws -> [String:Any] {
        try requireAccess();try bridge.start(cwd:core.home)
        let account=try bridge.account();try writeJSON(account,core.home.appendingPathComponent("onboarding/connection.json"))
        if account["connected"] as? Bool==true {try update(["codexAuthorized":true]);return account}
        if loginID != nil {return ["connected":false,"status":"authorizing","message":"Conclua a autorização no navegador ou cancele para tentar novamente."]}
        let login=try bridge.request("account/login/start",["type":"chatgpt"])
        guard let text=login["authUrl"] as? String,let url=URL(string:text),url.scheme=="https",let host=url.host,host=="auth.openai.com" || host.hasSuffix(".openai.com") || host=="auth0.openai.com" else{throw failure("O Codex não retornou uma página de login reconhecida.")}
        loginID=login["loginId"] as? String;try update(["authorizing":true]);openLogin?(url)
        return ["connected":false,"status":"authorizing","message":"Conclua a autorização na página aberta pelo Codex."]
    }
    func checkConnection() throws -> [String:Any] {
        try requireAccess();guard bridge.isRunning else {return ["connected":false,"status":"unavailable"]}
        let account=try bridge.account();try writeJSON(account,core.home.appendingPathComponent("onboarding/connection.json"));if account["connected"] as? Bool==true{try update(["codexAuthorized":true])};return account
    }
    func cancelLogin() throws {
        if let loginID {_ = try bridge.request("account/login/cancel",["loginId":loginID]);self.loginID=nil};try update(["authorizing":false])
    }
    func requireAccess() throws {
        guard core.activeLicense() != nil || core.onboardingLegacyAccess() else{throw failure("Ative seu código antes de continuar.")}
    }
    func selectVault(_ url:URL) throws {
        try requireAccess();try ensureNotRunning();let root=url.resolvingSymlinksInPath().standardizedFileURL
        guard (try? url.resourceValues(forKeys:[.isSymbolicLinkKey]).isSymbolicLink) != true,!root.path.contains("Library/Application Support/OracleGBrain/obsidian"),!root.path.contains("/gbrain/profile/") else{throw failure("Escolha a pasta original do Obsidian, sem links ou espelhos de indexação.")}
        let access=root.startAccessingSecurityScopedResource();defer{if access{root.stopAccessingSecurityScopedResource()}}
        _=try fm.contentsOfDirectory(at:root,includingPropertiesForKeys:[],options:[.skipsHiddenFiles])
        core.refreshConfig();core.config["vault"]=root.path;core.config.removeValue(forKey:"vaultBookmark")
        if let bookmark=try? root.bookmarkData(options:.withSecurityScope,includingResourceValuesForKeys:nil,relativeTo:nil){core.config["vaultBookmark"]=bookmark.base64EncodedString()}
        try core.persist();try update(["status":"configuring","runID":NSNull(),"threadID":NSNull(),"turnID":NSNull()])
    }
    func ensureNotRunning() throws {
        guard !(core.onboardingRecord()["request"] is [String:Any]),!onboardingActiveStatuses.contains(core.onboardingRecord()["status"] as? String ?? ""),!core.operationIsRunning("setup"),!core.operationIsRunning("gbrain") else{throw failure("Aguarde ou cancele a instalação antes de mudar a configuração.")}
    }
    func saveDraft(_ draft:[String:Any]) throws {
        try requireAccess();try ensureNotRunning()
        guard (try jsonData(draft)).count<30000 else{throw failure("Configuração grande demais.")}
        try update(["draft":draft])
    }
    func plan(_ params:[String:Any]) throws -> [String:Any] {
        try requireAccess();try ensureNotRunning();core.refreshConfig()
        if params["attach"] as? Bool==true,core.config["gbrainWorkspace"] as? String==nil{throw failure("Selecione a instalação existente do Second Brain.")}
        let plan=try core.makePlan(answers:params["answers"] as? [String:String] ?? [:],isNew:params["newVault"] as? Bool==true,attach:params["attach"] as? Bool==true,catalogCollections:params["catalogCollections"] as? [String] ?? [])
        try update(["status":"review","runID":plan["id"]!,"threadID":NSNull(),"turnID":NSNull(),"codexStarted":false,"existingBrainVerified":false,"draft":params])
        return plan
    }
    func install(_ hash:String) throws -> [String:Any] {
        try requireAccess();try ensureNotRunning();guard bridge.isRunning,(try bridge.account())["connected"] as? Bool==true else{throw failure("Conecte sua conta no Codex antes de instalar.")}
        try core.confirmPlan(hash:hash);try clearCancel();try startTurn(resume:false)
        return try core.onboardingSnapshot()
    }
    private func clearCancel() throws {let path=core.home.appendingPathComponent("onboarding/cancel");if fm.fileExists(atPath:path.path){try fm.removeItem(at:path)}}
    func resume() throws -> [String:Any] {
        try requireAccess();try ensureNotRunning();guard bridge.isRunning,(try bridge.account())["connected"] as? Bool==true else{throw failure("Reconecte ao Codex antes de retomar.")}
        _=try core.validatedPlan();try clearCancel();try startTurn(resume:true);return try core.onboardingSnapshot()
    }
    private func startTurn(resume:Bool) throws {
        core.refreshConfig();let plan=try core.validatedPlan();let workspace=core.home.appendingPathComponent("onboarding/workspace")
        try fm.createDirectory(at:workspace,withIntermediateDirectories:true)
        let skill=core.bundledEngineResources().deletingLastPathComponent().appendingPathComponent("skills/oracle-onboarding/SKILL.md")
        guard fm.fileExists(atPath:skill.path) else{throw failure("A skill de instalação não está no pacote. Reinstale o aplicativo.")}
        let initial=core.onboardingRecord();try update(["status":"starting","phase":"codex","message":"Enviando a configuração ao Codex…","ownerPID":Int(getpid()),"request":NSNull(),"awaitingIdentity":false])
        do {
            var config:[String:Any]=["model_reasoning_effort":"xhigh","sandbox_workspace_write.writable_roots":[core.home.path,try core.vault().path],"sandbox_workspace_write.network_access":false]
            // Explicit skill input, no untrusted project config, no global configuration mutation.
            config["features.multi_agent_v2.enabled"]=false
            var p:[String:Any]=["cwd":workspace.path,"model":"gpt-6-astra","modelProvider":"openai","approvalPolicy":"on-request","sandbox":"workspace-write","config":config]
            let response:[String:Any]
            if resume,let thread=initial["threadID"] as? String {p["threadId"]=thread;p["excludeTurns"]=false;response=try bridge.request("thread/resume",p)} else {response=try bridge.request("thread/start",p)}
            guard let thread=response["thread"] as? [String:Any],let threadID=thread["id"] as? String else{throw failure("O Codex não confirmou a tarefa de instalação.")}
            stateLock.lock();loadedThreadID=threadID;stateLock.unlock()
            try update(["threadID":threadID])
            if let running=(thread["turns"] as? [[String:Any]] ?? []).last(where:{$0["status"] as? String=="inProgress"}),let turn=running["id"] as? String {
                try update(["turnID":turn,"status":"running","message":"Conectado à instalação que já estava em andamento.","codexStarted":true]);return
            }
            try core.checkOnboardingCancellation()
            let input:[[String:Any]]=[["type":"skill","name":"oracle-onboarding","path":skill.path],["type":"text","text":installerPrompt(plan:plan),"text_elements":[]]]
            let turn=try bridge.request("turn/start",["threadId":threadID,"input":input,"effort":"xhigh","model":"gpt-6-astra"],timeout:60)
            guard let t=turn["turn"] as? [String:Any],let turnID=t["id"] as? String else{throw failure("O Codex não confirmou o início.")}
            let cancelled=fm.fileExists(atPath:core.home.appendingPathComponent("onboarding/cancel").path)
            stateLock.lock()
            let awaiting=core.onboardingRecord()["request"] as? [String:Any] != nil
            try update(["turnID":turnID,"status":cancelled ? "cancelling" : awaiting ? "waiting_user" : "running","phase":"preparing","codexStarted":true,"message":cancelled ? "Interrompendo o Codex…" : awaiting ? "O Codex precisa da sua resposta." : "Codex está preparando o seu Oracle."])
            let early=earlyCompletions.removeValue(forKey:turnID);stateLock.unlock()
            if cancelled {_ = try bridge.request("turn/interrupt",["threadId":threadID,"turnId":turnID])}
            if let early {notifications.async {self.notification("turn/completed",early)}}
        } catch {let cancelled=fm.fileExists(atPath:core.home.appendingPathComponent("onboarding/cancel").path);try update(["status":cancelled ? "cancelled" : "interrupted","message":error.localizedDescription]);throw error}
    }
    private func installerPrompt(plan:[String:Any])->String {
        let args=[Bundle.main.executableURL!.path,"--state",core.home.path]
        let encoded=String(decoding:(try? jsonData(args)) ?? Data(),as:UTF8.self)
        return """
        Execute a skill oracle-onboarding para este plano já revisado e autorizado pelo usuário. Não use subagentes nem outra API/modelo. Execute os comandos determinísticos com esta lista de argumentos base JSON: \(encoded). Plano: \(core.home.appendingPathComponent("setup/plan.json").path). ID: \(plan["id"] ?? ""). Não altere o plano nem invente confirmações. Todas as respostas pessoais precisam ser confirmadas na interface Oracle. Se o readback do GBrain ainda não estiver confirmado, prepare-o e encerre este turno aguardando a revisão no Oracle. Quando confirmado, prossiga até verificar estrutura, índice e skill. Preserve instalações existentes, identidade, Hermes, hooks globais, clientes e meeting-prep. Não instale provedores pagos. Não use tokens como API. O Oracle lê recibos determinísticos; sua mensagem não conta como sucesso. Em cancelamento pare e preserve o journal. Prefira invocação com Python subprocess.run(lista), sem concatenar caminhos no shell.
        """
    }
    func cancel() throws -> [String:Any] {
        let state=core.onboardingRecord();guard onboardingActiveStatuses.contains(state["status"] as? String ?? "") || state["status"] as? String=="waiting_user" else{return try core.onboardingSnapshot()}
        try Data("cancel".utf8).write(to:core.home.appendingPathComponent("onboarding/cancel"),options:.atomic)
        try update(["status":"cancelling","message":"Interrompendo o Codex; os itens confirmados serão preservados."])
        if state["status"] as? String=="waiting_user",state["awaitingIdentity"] as? Bool==true {try update(["status":"cancelled","message":"Configuração pausada. Seus avanços foram preservados."]);return try core.onboardingSnapshot()}
        if let thread=state["threadID"] as? String,let turn=state["turnID"] as? String,bridge.isRunning {
            do {_=try bridge.request("turn/interrupt",["threadId":thread,"turnId":turn],timeout:15)}catch{try update(["status":"interrupted","message":"Cancelamento solicitado. Reconecte para verificar se o Codex parou."]);throw error}
        } else {try update(["status":"interrupted","message":"Cancelamento registrado; reconecte para conferir a tarefa."])}
        return try core.onboardingSnapshot()
    }
    func confirmReadback(_ hash:String) throws {
        try requireAccess();try core.confirmGBrain(hash)
        try update(["message":"Respostas confirmadas. Retome para concluir a instalação."])
    }
    func refreshPlugins() throws -> [String:Any] {
        try requireAccess();guard bridge.isRunning else{throw failure("Conecte ao Codex para verificar os plugins.")};let account=try bridge.account();try writeJSON(account,core.home.appendingPathComponent("onboarding/connection.json"));guard account["connected"] as? Bool==true else{throw failure("Autorize sua conta no Codex para verificar os plugins.")}
        stateLock.lock();let loaded=loadedThreadID;stateLock.unlock()
        let result=bridge.inventory(threadID:loaded)
        try writeJSON(result,core.home.appendingPathComponent("onboarding/plugins.json"));return result
    }
    private func verifyCodexSkill() throws {
        let receipt=try readJSON(core.home.appendingPathComponent("setup/bridge.json"))
        guard let workspace=receipt["workspace"] as? String,let skill=receipt["skill"] as? String else{throw failure("A integração com o Codex ainda não foi preparada.")}
        let result=try bridge.request("skills/list",["cwds":[workspace],"forceReload":true])
        let skills=(result["data"] as? [[String:Any]] ?? []).flatMap{$0["skills"] as? [[String:Any]] ?? []}
        guard skills.contains(where:{$0["path"] as? String==skill && $0["enabled"] as? Bool==true}) else{throw failure("O Codex ainda não reconheceu a skill instalada. Abra o espaço Oracle no Codex e verifique suas permissões.")}
    }
    func openCodexWorkspace() throws {
        try requireAccess()
        let receipt=try? readJSON(core.home.appendingPathComponent("setup/bridge.json"))
        let workspace=(receipt?["workspace"] as? String).map{URL(fileURLWithPath:$0)} ?? core.home.appendingPathComponent("onboarding/workspace")
        guard workspace.standardizedFileURL.path.hasPrefix(core.home.path+"/"),fm.fileExists(atPath:workspace.path) else{throw failure("Configure seu Oracle antes de abrir esse espaço.")}
        let result=try runProcess(CodexBridge.executable(),["app",workspace.path],cwd:core.home,environment:["HOME":fm.homeDirectoryForCurrentUser.path,"PATH":"/usr/bin:/bin:/opt/homebrew/bin"],timeout:15)
        guard result.code==0 else{throw failure("Não foi possível abrir o Codex. Abra o aplicativo pelo Finder.")}
    }
    private func notification(_ method:String,_ p:[String:Any]) {
        if method=="account/login/completed" {loginID=nil;try? update(["authorizing":false]);try? writeJSON(["connected":false],core.home.appendingPathComponent("onboarding/connection.json"));return}
        let state=core.onboardingRecord();guard let thread=p["threadId"] as? String,thread==state["threadID"] as? String else{return}
        if method=="turn/completed",let turn=p["turn"] as? [String:Any],let turnID=turn["id"] as? String {
            if state["status"] as? String=="starting" {stateLock.lock();earlyCompletions[turnID]=p;stateLock.unlock();return}
            guard turnID==state["turnID"] as? String else{return}
            if state["status"] as? String=="cancelling" || turn["status"] as? String=="interrupted" {try? update(["status":"cancelled","message":"Instalação interrompida. Retome quando quiser.","request":NSNull()]);return}
            guard turn["status"] as? String=="completed" else{try? update(["status":"failed","message":"O Codex não concluiu esta etapa. Retome para tentar novamente.","request":NSNull()]);return}
            if (try? core.onboardingSnapshot()["readback"]) != nil {try? update(["status":"waiting_user","phase":"identity","awaitingIdentity":true,"message":"Revise suas respostas para continuar."]);return}
            do {var verified=try core.onboardingFinalVerification();try verifyCodexSkill();verified["skillDiscoveredByCodex"]=true;try update(["existingBrainVerified":true]);let formation=try core.onboardingProgress();try update(["formation":formation,"confirmedAt":ISO8601DateFormatter().string(from:Date()),"status":"completed","phase":"ready","message":"Seu Oracle está pronto.","verification":verified,"existingBrainVerified":true,"request":NSNull()])}
            catch {try? update(["status":"paused","message":"O Codex terminou o turno. Há etapas a conferir antes de concluir.","detail":error.localizedDescription,"request":NSNull()])}
        } else if method=="item/started",let item=p["item"] as? [String:Any],item["type"] as? String=="commandExecution" {
            try? update(["phase":"installing","message":"Codex está instalando e verificando os componentes."])
        }
    }
    private func receivedRequest(_ id:Any,_ method:String,_ params:[String:Any]) {
        guard params["threadId"] as? String==core.onboardingRecord()["threadID"] as? String else{bridge.reject(id:id);return}
        let supported=["item/commandExecution/requestApproval","item/fileChange/requestApproval","item/permissions/requestApproval","item/tool/requestUserInput"]
        guard supported.contains(method) else{bridge.reject(id:id);try? update(["status":"waiting_user","message":"O Codex precisa de uma ação que este cliente ainda não oferece. Abra a tarefa no Codex."]);return}
        let key=UUID().uuidString;stateLock.lock();pendingRequests[key]=(id,method,params);stateLock.unlock()
        var request:[String:Any]=["id":key,"kind":method,"reason":params["reason"] ?? "O Codex precisa da sua confirmação para esta etapa."]
        if method=="item/tool/requestUserInput" {request["questions"]=params["questions"] ?? []}
        else {request["command"]=params["command"] ?? "";request["cwd"]=params["cwd"] ?? "";request["permissions"]=params["permissions"] ?? [:];request["grantRoot"]=params["grantRoot"] ?? NSNull()}
        try? update(["status":"waiting_user","message":"O Codex precisa da sua resposta.","request":request])
    }
    func answerRequest(_ params:[String:Any]) throws {
        guard let key=params["id"] as? String else{throw failure("Solicitação inválida.")}
        stateLock.lock();let pending=pendingRequests[key];stateLock.unlock()
        guard let(id,method,original)=pending else{throw failure("Esta solicitação expirou. Retome a configuração.")}
        let allow=params["allow"] as? Bool==true
        var result:[String:Any]
        if method=="item/tool/requestUserInput" {result=["answers":params["answers"] as? [String:Any] ?? [:]]}
        else if method=="item/permissions/requestApproval" {result=["permissions":allow ? original["permissions"] as? [String:Any] ?? [:] : [:],"scope":"turn"]}
        else {result=["decision":allow ? "accept" : "decline"]}
        try bridge.reply(id:id,result:result);stateLock.lock();pendingRequests.removeValue(forKey:key);stateLock.unlock()
        try update(["status":"running","request":NSNull(),"message":allow ? "Permissão concedida para esta etapa." : "Resposta enviada ao Codex."])
    }
}
