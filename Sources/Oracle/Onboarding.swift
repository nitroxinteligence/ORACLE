import Foundation
import CryptoKit

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
        // Compatibility name only. A profile/UUID/old legacyAccess flag is NOT an authorization.
        activeLicense()?.role == "owner"
    }
    func onboardingSnapshot() throws -> [String:Any] {
        refreshConfig();var value=onboardingRecord()
        if value.isEmpty {
            value=["schemaVersion":2,"status":"not_started","legacyProfilePreserved":config["vault"] as? String != nil]
            try writeJSON(value,onboardingURL)
        }
        let license=activeLicense()
        value["licensed"]=license != nil;value["legacyAccess"]=license?.role == "owner"
        value["role"]=license == nil ? "locked" : license?.role ?? "student";value["capabilities"]=licenseCapabilities(license)
        value.removeValue(forKey:"reviewPlan")
        if let review=try onboardingReview(),let hash=review["plan_hash"] as? String {
            value["reviewPlan"]=["id":review["id"] ?? "","plan_hash":hash]
        }
        for (key,field) in licenseDeviceSnapshot(){value[key]=field}
        if let id=license?.deviceID {value["deviceID"]=id}
        value["legacyProfilePreserved"]=config["vault"] as? String != nil
        value["deviceSupport"]=["supported":SecureEnclave.isAvailable,"kind":"secure-enclave-p256","reason":SecureEnclave.isAvailable ? "Ativação offline vinculada à chave deste Mac." : "Secure Enclave indisponível; este Mac não suporta a ativação vinculada ao aparelho."]
        value["vaultName"]=(config["vault"] as? String).map{URL(fileURLWithPath:$0).lastPathComponent} ?? ""
        value["hasVault"]=(try? vault()) != nil
        if value["hasVault"] as? Bool==false && value["status"] as? String=="completed" {value["status"]="configuring";value["runID"]=NSNull();value["message"]="Escolha seu Obsidian para continuar."}
        value["hasExistingBrain"]=config["gbrainWorkspace"] as? String != nil
        value["codexConnected"]=(try? readJSON(home.appendingPathComponent("onboarding/connection.json")))?["connected"] as? Bool ?? false
        let progress=try onboardingProgress();value["confirmed"]=progress
        value["completed"]=progress.count;value["total"]=NSNull()
        value.removeValue(forKey:"readback")
        if onboardingActiveStatuses.contains(value["status"] as? String ?? ""), let pid=value["ownerPID"] as? Int, pid > 0, pid <= Int(Int32.max),kill(Int32(pid),0) != 0,errno==ESRCH {value["status"]="interrupted";value["message"]="A configuração foi interrompida. Retome do último ponto confirmado."}
        if let review=try onboardingReview() {value["review"]=review} else {value.removeValue(forKey:"review")}
        if value["review"] is [String:Any],let r=try? readJSON(home.appendingPathComponent("setup/gbrain-readback.json")),r["status"] as? String=="awaiting_readback_confirmation",let plan=try? readJSON(home.appendingPathComponent("setup/plan.json")),r["plan_hash"] as? String==plan["plan_hash"] as? String,r["confirmed_hash"]==nil {
            value["readback"]=["text":r["readback"] ?? "","hash":r["upstream_hash"] ?? ""]
        }
        // Paths and protocol payloads are internal. The view only gets user-facing state.
        for key in ["ownerPID","threadID","turnID","request","detail"] {value.removeValue(forKey:key)}
        return value
    }
    func onboardingProgress() throws -> [[String:Any]] {
        let record=onboardingRecord();guard let run=record["runID"] as? String,let plan=try? readJSON(home.appendingPathComponent("setup/plan.json")),plan["id"] as? String==run,plan["vault"] as? String==config["vault"] as? String else{return []}
        if record["status"] as? String=="completed",let saved=record["formation"] as? [[String:Any]],record["confirmedAt"] is String {return saved}
        var confirmed=[[String:Any]]()
        if record["localStarted"] as? Bool==true || record["codexStarted"] as? Bool==true {confirmed.append(["id":"sol","kind":"core","label":"Oracle","evidence":record["localStarted"] as? Bool==true ? "native local installation" : "Codex turn/start"])}
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
        let root=home.appendingPathComponent("codex-workspace")
        guard bridge["workspace"] as? String==root.path,let skill=bridge["skill"] as? String,skill.hasPrefix(root.path+"/"),let expected=bridge["skill_sha256"] as? String else{throw failure("A ponte local ainda não foi verificada.")}
        let file=try scoped(String(skill.dropFirst(root.path.count+1)),root:root)
        guard expected==digest(try Data(contentsOf:file)) else{throw failure("A skill local mudou; revise a ponte antes de concluir.")}
        let hooks=try scoped(".codex/hooks.json",root:root)
        guard bridge["hooks_sha256"] as? String==digest(try jsonData(readJSON(hooks))) else{throw failure("Os hooks locais mudaram; a confiança continua não verificada.")}
        if plan["attach"] as? Bool != true {
            let config=try scoped(".codex/config.toml",root:root)
            guard bridge["mcp_sha256"] as? String==digest(try Data(contentsOf:config)) else{throw failure("A configuração local da memória mudou.")}
        }
        let method=try verifyGBrainBridge()
        guard method["identity"] as? Bool==true else{throw failure("A identidade da instalação selecionada ainda não foi verificada; nenhum conteúdo foi sobrescrito.")}
        return ["method":method,"structure":true,"memory":true,"skill":true,"localOnly":true,"hooksTrusted":false,"skillDiscoveredByCodex":false]
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
    private let consents=OnboardingConsentQueue()
    private var loginID:String?
    private var connectionEpoch=UUID(),runGeneration=UUID()
    private var completedTurn=false,localInFlight=false
    private let localDriver:OfflineInstallationDriver
    private let accessCheck:(()throws->Void)?
    var openLogin:((URL)->Void)?
    init(home:URL,bridge:CodexConnection=CodexBridge(),automaticallyReconnect:Bool=false,localDriver:OfflineInstallationDriver=NativeOfflineInstallation(),accessCheck:(()throws->Void)?=nil) throws {
        self.bridge=bridge
        self.localDriver=localDriver;self.accessCheck=accessCheck
        core=try Core(home:home)
        _=try core.onboardingSnapshot()
        // A cached login or inventory is never treated as a live connection after launch.
        try writeJSON(["connected":false],home.appendingPathComponent("onboarding/connection.json"))
        if var inventory=try? readJSON(home.appendingPathComponent("onboarding/plugins.json")) {inventory["status"]="unavailable";inventory["reason"]="Reconecte ao Codex para verificar os plugins";inventory["plugins"]=(inventory["plugins"] as? [[String:Any]] ?? []).map{r in var x=r;if x["status"] as? String=="connected"{x["status"]="unavailable"};return x};try writeJSON(inventory,home.appendingPathComponent("onboarding/plugins.json"))}
        let prior=core.onboardingRecord()
        if onboardingActiveStatuses.contains(prior["status"] as? String ?? "") || prior["request"] is [String:Any] || (prior["pendingRequestCount"] as? Int ?? 0)>0 {try update(["status":"interrupted","message":"Retome a configuração para conferir o último ponto salvo.","request":NSNull()])}
        try update(["pendingRequestCount":0,"request":NSNull(),"authorizing":false])
        bindBridgeCallbacks()
        if automaticallyReconnect && core.onboardingRecord()["codexAuthorized"] as? Bool==true {
            queue.async { [weak self] in self?.restoreConnection() }
        }
    }
    private func bindBridgeCallbacks() {
        stateLock.lock();connectionEpoch=UUID();let epoch=connectionEpoch;stateLock.unlock()
        bridge.onNotification={ [weak self] method,params in
            guard let self else{return};self.stateLock.lock();let generation=self.runGeneration;self.stateLock.unlock()
            self.notifications.async {self.stateLock.lock();defer{self.stateLock.unlock()};guard self.connectionEpoch==epoch else{return};self.notification(method,params,generation:generation)}
        }
        bridge.onRequest={ [weak self] id,method,params in
            guard let self else{return};self.stateLock.lock();let generation=self.runGeneration;self.stateLock.unlock()
            self.notifications.async {self.stateLock.lock();defer{self.stateLock.unlock()};guard self.connectionEpoch==epoch else{return};self.receivedRequest(id,method,params,generation:generation)}
        }
        bridge.onDisconnect={ [weak self] in self?.notifications.async {guard let self else{return};self.stateLock.lock();defer{self.stateLock.unlock()};guard self.connectionEpoch==epoch else{return};self.disconnected()} }
    }
    private func ensureBridge() throws {
        if !bridge.isRunning {bindBridgeCallbacks();try bridge.start(cwd:core.home)}
    }
    func snapshot() throws -> [String:Any] {
        stateLock.lock();defer{stateLock.unlock()}
        // Avoid sharing mutable Core.config with a long-running local phase.
        var value=try Core(home:core.home).onboardingSnapshot()
        value["pendingRequestCount"]=consents.pending.count
        if let request=consents.pending.first {value["request"]=request.projection}
        return value
    }
    private func restoreConnection() {
        do {try requireAccess();try ensureBridge();let account=try bridge.account();try writeJSON(account,core.home.appendingPathComponent("onboarding/connection.json"))}catch{disconnected()}
    }
    func shutdown() {
        stateLock.lock();defer{stateLock.unlock()}
        if onboardingActiveStatuses.contains(core.onboardingRecord()["status"] as? String ?? "") || !consents.pending.isEmpty {
            try? atomicWriteData(Data("cancel".utf8),to:core.home.appendingPathComponent("onboarding/cancel"))
            try? update(["status":"interrupted","message":"Configuração pausada ao fechar o Oracle. Retome para continuar."])
        }
        _=consents.invalidate(newTransport:true);connectionEpoch=UUID();loginID=nil
        try? update(["pendingRequestCount":0,"authorizing":false])
        bridge.stop()
        try? writeJSON(["connected":false],core.home.appendingPathComponent("onboarding/connection.json"))
    }
    deinit {bridge.stop()}
    func update(_ changes:[String:Any]) throws {
        stateLock.lock();defer{stateLock.unlock()};var state=core.onboardingRecord();for(k,v) in changes{state[k]=v}
        state.removeValue(forKey:"request");state.removeValue(forKey:"detail")
        state["pendingRequestCount"]=consents.pending.count
        state["updatedAt"]=ISO8601DateFormatter().string(from:Date());try writeJSON(state,core.onboardingURL)
    }
    private func disconnected() {
        stateLock.lock();defer{stateLock.unlock()};loadedThreadID=nil;loginID=nil;connectionEpoch=UUID()
        _=consents.invalidate(newTransport:true);earlyCompletions.removeAll()
        try? writeJSON(["connected":false],core.home.appendingPathComponent("onboarding/connection.json"))
        let record=core.onboardingRecord()
        if record["executor"] as? String=="codex",["starting","running","waiting_user","cancelling"].contains(record["status"] as? String ?? "") {completedTurn=true;try? update(["status":"interrupted","message":"A conexão com o Codex foi interrompida. As aprovações expiraram; os avanços locais foram preservados."])}
        try? update(["pendingRequestCount":0,"authorizing":false])
    }
    func connect() throws -> [String:Any] {
        try requireAccess();try ensureBridge()
        let account=try bridge.account();try writeJSON(account,core.home.appendingPathComponent("onboarding/connection.json"))
        if account["connected"] as? Bool==true {try update(["codexAuthorized":true]);try refreshModelChoice();return account}
        if loginID != nil {return ["connected":false,"status":"authorizing","message":"Conclua a autorização no navegador ou cancele para tentar novamente."]}
        let login=try bridge.request("account/login/start",["type":"chatgpt"])
        guard let text=login["authUrl"] as? String,let url=URL(string:text),url.scheme=="https",let host=url.host,host=="auth.openai.com" || host.hasSuffix(".openai.com") || host=="auth0.openai.com" else{throw failure("O Codex não retornou uma página de login reconhecida.")}
        loginID=login["loginId"] as? String;try update(["authorizing":true]);openLogin?(url)
        return ["connected":false,"status":"authorizing","message":"Conclua a autorização na página aberta pelo Codex."]
    }
    func checkConnection() throws -> [String:Any] {
        try requireAccess();guard bridge.isRunning else {return ["connected":false,"status":"unavailable"]}
        let account=try bridge.account();try writeJSON(account,core.home.appendingPathComponent("onboarding/connection.json"));if account["connected"] as? Bool==true{try update(["codexAuthorized":true]);try refreshModelChoice()};return account
    }
    private func refreshModelChoice() throws {
        let rows=try bridge.oracleModels()
        let preferred=(core.onboardingRecord()["draft"] as? [String:Any])?["model"] as? String
        try update(["models":rows.filter {row in row["hidden"] as? Bool != true && ((row["inputModalities"] as? [String])?.contains("text") ?? true)}.map { row in
            ["model":row["model"] ?? "","displayName":row["displayName"] ?? row["model"] ?? "","isDefault":row["isDefault"] ?? false]
        }])
        do {let selected=try OracleCodexModel.choose(rows,preferred:preferred);try update(["modelSelection":selected.snapshot,"modelSelectionError":NSNull()])}
        catch {try update(["modelSelection":NSNull(),"modelSelectionError":error.localizedDescription])}
    }
    func selectModel(_ name:String) throws {
        try requireAccess();try ensureNotRunning()
        let choice=try OracleCodexModel.choose(bridge.oracleModels(),preferred:name)
        var draft=core.onboardingRecord()["draft"] as? [String:Any] ?? [:];draft["model"]=choice.id
        try update(["draft":draft,"modelSelection":choice.snapshot,"modelSelectionError":NSNull()])
    }
    func cancelLogin() throws {
        if let loginID {_ = try bridge.request("account/login/cancel",["loginId":loginID]);self.loginID=nil};try update(["authorizing":false])
    }
    func requireAccess() throws {
        if let accessCheck {try accessCheck();return} // native dependency injection; no serialized bypass
        try core.requireCapability(.configure)
    }
    func selectVault(_ url:URL) throws {
        stateLock.lock();defer{stateLock.unlock()}
        try requireAccess();try ensureNotRunning();let root=url.resolvingSymlinksInPath().standardizedFileURL
        let setup=try core.acquireOperationLock("setup");defer{core.releaseOperationLock(setup)}
        let brain=try core.acquireOperationLock("gbrain");defer{core.releaseOperationLock(brain)}
        guard (try? url.resourceValues(forKeys:[.isSymbolicLinkKey]).isSymbolicLink) != true,!root.path.contains("Library/Application Support/OracleGBrain/obsidian"),!root.path.contains("/gbrain/profile/") else{throw failure("Escolha a pasta original do Obsidian, sem links ou espelhos de indexação.")}
        let access=root.startAccessingSecurityScopedResource();defer{if access{root.stopAccessingSecurityScopedResource()}}
        _=try fm.contentsOfDirectory(at:root,includingPropertiesForKeys:[],options:[.skipsHiddenFiles])
        core.refreshConfig();core.config["vault"]=root.path;core.config.removeValue(forKey:"vaultBookmark")
        if let bookmark=try? root.bookmarkData(options:.withSecurityScope,includingResourceValuesForKeys:nil,relativeTo:nil){core.config["vaultBookmark"]=bookmark.base64EncodedString()}
        try core.persist();try update(["status":"configuring","runID":NSNull(),"threadID":NSNull(),"turnID":NSNull()])
    }
    func selectBrain(workspace:URL,profile:URL) throws {
        stateLock.lock();defer{stateLock.unlock()}
        try requireAccess();try ensureNotRunning()
        for url in [workspace,profile] {
            let values=try url.resourceValues(forKeys:[.isDirectoryKey,.isSymbolicLinkKey])
            guard values.isDirectory==true,values.isSymbolicLink != true else{throw failure("Escolha a pasta original do workspace e do perfil, sem links simbólicos.")}
        }
        let workspaceAccess=workspace.startAccessingSecurityScopedResource(),profileAccess=profile.startAccessingSecurityScopedResource()
        defer{if workspaceAccess{workspace.stopAccessingSecurityScopedResource()};if profileAccess{profile.stopAccessingSecurityScopedResource()}}
        core.refreshConfig();try core.selectExternalGBrain(workspace:workspace,profile:profile)
        try update(["status":"configuring","runID":NSNull(),"threadID":NSNull(),"turnID":NSNull(),"awaitingIdentity":false,"existingBrainVerified":false])
    }
    func ensureNotRunning() throws {
        stateLock.lock();defer{stateLock.unlock()}
        guard consents.pending.isEmpty,consents.early.isEmpty,!localInFlight,!onboardingActiveStatuses.contains(core.onboardingRecord()["status"] as? String ?? ""),!core.operationIsRunning("setup"),!core.operationIsRunning("gbrain") else{throw failure("Aguarde ou cancele a instalação antes de mudar a configuração.")}
    }
    func selectExistingBrain(_ url:URL) throws {
        try requireAccess();try ensureNotRunning()
        let setup=try core.acquireOperationLock("setup");defer{core.releaseOperationLock(setup)}
        let brain=try core.acquireOperationLock("gbrain");defer{core.releaseOperationLock(brain)}
        guard (try? url.resourceValues(forKeys:[.isSymbolicLinkKey]).isSymbolicLink) != true else{throw failure("Selecione a pasta original do GBrain, sem links simbólicos.")}
        let root=url.resolvingSymlinksInPath().standardizedFileURL
        let access=url.startAccessingSecurityScopedResource();defer{if access{url.stopAccessingSecurityScopedResource()}}
        _=try fm.contentsOfDirectory(at:root,includingPropertiesForKeys:nil)
        core.refreshConfig();core.config["gbrainWorkspace"]=root.path;core.config["gbrainAccess"]=true;try core.persist()
        try update(["status":"configuring","runID":NSNull(),"threadID":NSNull(),"turnID":NSNull(),"existingBrainVerified":false])
    }
    func saveDraft(_ draft:[String:Any]) throws {
        try requireAccess();stateLock.lock();defer{stateLock.unlock()}
        guard (try jsonData(draft)).count<30000 else{throw failure("Configuração grande demais.")}
        let allowed:Set<String>=["answers","newVault","attach","catalogCollections","maintenance","model","step","ui"]
        guard Set(draft.keys).isSubset(of:allowed) else{throw failure("Campos de rascunho desconhecidos.")}
        // Closing/reopening may save the same form or only its UI step during installation.
        // It must never mutate the reviewed inputs underneath a running plan.
        let old=core.onboardingRecord()["draft"] as? [String:Any] ?? [:]
        func inputs(_ value:[String:Any])->[String:Any] {value.filter{!["step","ui"].contains($0.key)}}
        if onboardingActiveStatuses.contains(core.onboardingRecord()["status"] as? String ?? "") || !consents.pending.isEmpty || localInFlight {
            guard try jsonData(inputs(draft))==jsonData(inputs(old)) else{throw failure("A instalação está em andamento. O rascunho revisado não foi alterado.")}
        }
        if try jsonData(inputs(draft)) != jsonData(inputs(old)),core.onboardingRecord()["runID"] is String {
            try update(["draft":draft,"status":"configuring","runID":NSNull(),"threadID":NSNull(),"turnID":NSNull(),"awaitingIdentity":false])
        } else {try update(["draft":draft])}
    }
    func saveUIState(_ value:[String:Any]) throws {
        try requireAccess()
        guard Set(value.keys).isSubset(of:["step","expanded","tab"]),(try jsonData(value)).count<=2048 else{throw failure("Estado visual inválido.")}
        try update(["ui":value])
    }
    func plan(_ params:[String:Any]) throws -> [String:Any] {
        stateLock.lock();defer{stateLock.unlock()}
        try requireAccess();try ensureNotRunning();core.refreshConfig()
        if params["attach"] as? Bool==true,core.config["gbrainWorkspace"] as? String==nil{throw failure("Selecione a instalação existente do Second Brain.")}
        var minimal=params;minimal["catalogCollections"]=[String]()
        let plan=try core.makePlan(answers:minimal["answers"] as? [String:String] ?? [:],isNew:minimal["newVault"] as? Bool==true,attach:minimal["attach"] as? Bool==true,catalogCollections:[],maintenance:minimal["maintenance"] as? [String:Any])
        try update(["status":"review","runID":plan["id"]!,"threadID":NSNull(),"turnID":NSNull(),"codexStarted":false,"localStarted":false,"awaitingIdentity":false,"existingBrainVerified":false,"verification":NSNull(),"confirmedAt":NSNull(),"formation":[],"draft":minimal])
        return try core.onboardingReview() ?? [:]
    }
    func install(_ hash:String) throws -> [String:Any] {
        stateLock.lock();defer{stateLock.unlock()}
        try requireAccess();try ensureNotRunning()
        guard try core.onboardingReview()?["plan_hash"] as? String==hash else{throw failure("O plano revisado mudou. Gere uma nova revisão antes de instalar.")}
        try core.confirmPlan(hash:hash);try clearCancel();try startLocal()
        return try snapshot()
    }
    private func clearCancel() throws {let path=core.home.appendingPathComponent("onboarding/cancel");if fm.fileExists(atPath:path.path){try fm.removeItem(at:path)}}
    func resume() throws -> [String:Any] {
        stateLock.lock();defer{stateLock.unlock()}
        try requireAccess();try ensureNotRunning();core.refreshConfig()
        guard try core.onboardingReview() != nil else{throw failure("Não há um plano revisado para retomar.")}
        _=try core.validatedPlan();try clearCancel();try startLocal();return try snapshot()
    }
    func installWithCodex(_ hash:String) throws -> [String:Any] {
        try requireAccess();try ensureNotRunning()
        guard try core.onboardingReview()?["plan_hash"] as? String==hash else{throw failure("O plano revisado mudou.")}
        guard bridge.isRunning,(try bridge.account())["connected"] as? Bool==true else{throw failure("Conecte ao Codex apenas para usar esta execução opcional.")}
        try core.confirmPlan(hash:hash);try clearCancel();try startTurn(resume:false);return try snapshot()
    }
    func resumeWithCodex() throws -> [String:Any] {
        try requireAccess();try ensureNotRunning()
        guard try core.onboardingReview() != nil else{throw failure("Não há um plano revisado para retomar.")}
        guard bridge.isRunning,(try bridge.account())["connected"] as? Bool==true else{throw failure("Reconecte ao Codex para retomar a execução opcional.")}
        _=try core.validatedPlan();try clearCancel();try startTurn(resume:true);return try snapshot()
    }
    private func startLocal() throws {
        stateLock.lock();defer{stateLock.unlock()}
        runGeneration=UUID();let generation=runGeneration;completedTurn=false
        _=consents.invalidate();earlyCompletions.removeAll();localInFlight=true
        do {try update(["status":"starting","executor":"native-local","phase":"structure","message":"Preparando a instalação local…","ownerPID":Int(getpid()),"threadID":NSNull(),"turnID":NSNull(),"awaitingIdentity":false,"localStarted":true])}
        catch {localInFlight=false;throw error}
        queue.async { [weak self] in self?.runLocalPhases(generation) }
    }
    private func localPhase(_ phase:String,_ message:String,_ generation:UUID) throws {
        stateLock.lock();defer{stateLock.unlock()}
        guard runGeneration==generation else{throw failure("Esta instalação foi substituída por outra execução.")}
        try core.checkOnboardingCancellation();try update(["status":"running","phase":phase,"message":message])
    }
    private func runLocalPhases(_ generation:UUID) {
        defer {stateLock.lock();localInFlight=false;stateLock.unlock()}
        do {
            core.refreshConfig();let plan=try core.validatedPlan()
            try localPhase("structure","Criando e verificando a estrutura local.",generation);try localDriver.apply(core)
            try core.checkOnboardingCancellation()
            if plan["attach"] as? Bool != true {
                try localPhase("identity","Preparando as respostas no GBrain oficial, sem modelo.",generation)
                let receipt=try localDriver.prepare(core)
                guard receipt["plan_hash"] as? String==plan["plan_hash"] as? String else{throw failure("A revisão do GBrain pertence a outro plano.")}
                guard let hash=receipt["upstream_hash"] as? String,!hash.isEmpty else{throw failure("O GBrain não retornou uma revisão confirmável.")}
                try core.checkOnboardingCancellation()
                if receipt["confirmed_hash"] as? String != hash {
                    try update(["status":"waiting_user","phase":"identity","awaitingIdentity":true,"message":"Revise e confirme suas respostas antes de criar a identidade e o índice."]);return
                }
                try localPhase("memory","Verificando a identidade e o índice local.",generation);try localDriver.finish(core)
            }
            try localPhase("bridge","Preparando a ponte local. Conectar ao Codex é opcional.",generation);try localDriver.prepareBridge(core)
            try localPhase("verification","Conferindo arquivos, memória e recibos locais.",generation)
            var verified=try localDriver.verify(core)
            if let settings=plan["maintenance"] as? [String:Any] {verified["maintenance"]=try core.configureMaintenance(settings)}
            try core.checkOnboardingCancellation()
            stateLock.lock();defer{stateLock.unlock()}
            guard runGeneration==generation else{return}
            try update(["existingBrainVerified":true]);let formation=try core.onboardingProgress()
            try update(["formation":formation,"confirmedAt":ISO8601DateFormatter().string(from:Date()),"status":"completed","phase":"ready","message":"Seu Oracle está pronto para uso local.","verification":verified,"awaitingIdentity":false])
        } catch {
            stateLock.lock();defer{stateLock.unlock()};guard runGeneration==generation else{return}
            let cancelled=fm.fileExists(atPath:core.home.appendingPathComponent("onboarding/cancel").path)
            try? update(["status":cancelled ? "cancelled" : "interrupted","message":cancelled ? "Instalação pausada; os itens confirmados foram preservados." : error.localizedDescription])
        }
    }
    private func startTurn(resume:Bool) throws {
        let workspace=core.home.appendingPathComponent("onboarding/workspace")
        let skill=core.bundledEngineResources().deletingLastPathComponent().appendingPathComponent("skills/oracle-onboarding/SKILL.md")
        guard fm.fileExists(atPath:skill.path) else{throw failure("A skill de instalação não está no pacote. Reinstale o aplicativo.")}
        let plan:[String:Any],initial:[String:Any],generation:UUID,epoch:UUID
        do {
            stateLock.lock();defer{stateLock.unlock()}
            core.refreshConfig();guard try core.onboardingReview() != nil else{throw failure("O plano mudou antes de iniciar a execução opcional.")}
            plan=try core.validatedPlan();initial=core.onboardingRecord()
            try fm.createDirectory(at:workspace,withIntermediateDirectories:true)
            runGeneration=UUID();generation=runGeneration;epoch=connectionEpoch;completedTurn=false;_=consents.invalidate();earlyCompletions.removeAll()
            try update(["status":"starting","executor":"codex","phase":"codex","message":"Enviando a configuração ao Codex por sua solicitação…","ownerPID":Int(getpid()),"threadID":NSNull(),"turnID":NSNull(),"awaitingIdentity":false])
        }
        do {
            let preferred=(initial["draft"] as? [String:Any])?["model"] as? String ?? (initial["modelSelection"] as? [String:Any])?["model"] as? String
            let model=try OracleCodexModel.choose(bridge.oracleModels(),preferred:preferred)
            try update(["modelSelection":model.snapshot])
            var config:[String:Any]=["sandbox_workspace_write.writable_roots":[core.home.path,try core.vault().path],"sandbox_workspace_write.network_access":false]
            config["model_reasoning_effort"]=model.effort
            // Explicit skill input, no untrusted project config, no global configuration mutation.
            config["features.multi_agent_v2.enabled"]=false
            var p:[String:Any]=["cwd":workspace.path,"model":model.id,"approvalPolicy":"on-request","sandbox":"workspace-write","config":config]
            let response:[String:Any]
            if resume,let thread=initial["threadID"] as? String {p["threadId"]=thread;p["excludeTurns"]=false;response=try bridge.request("thread/resume",p)} else {response=try bridge.request("thread/start",p)}
            guard let thread=response["thread"] as? [String:Any],let threadID=thread["id"] as? String else{throw failure("O Codex não confirmou a tarefa de instalação.")}
            do {
                stateLock.lock();defer{stateLock.unlock()}
                guard runGeneration==generation,connectionEpoch==epoch,!completedTurn,bridge.isRunning else{throw failure("A conexão expirou antes de confirmar a tarefa.")}
                loadedThreadID=threadID;consents.begin(thread:threadID,generation:generation);try update(["threadID":threadID])
            }
            if let running=(thread["turns"] as? [[String:Any]] ?? []).last(where:{$0["status"] as? String=="inProgress"}),let turn=running["id"] as? String {
                do {
                    stateLock.lock();defer{stateLock.unlock()}
                    guard connectionEpoch==epoch,!completedTurn else{throw failure("A conexão expirou.")}
                    let rejected=consents.bind(turn:turn);rejected.forEach{bridge.reject(id:$0)}
                    try update(["turnID":turn,"status":"running","message":"Conectado à instalação opcional já em andamento.","codexStarted":true])
                }
                if fm.fileExists(atPath:core.home.appendingPathComponent("onboarding/cancel").path){_ = try cancel()};return
            }
            try core.checkOnboardingCancellation()
            let input:[[String:Any]]=[["type":"skill","name":"oracle-onboarding","path":skill.path],["type":"text","text":installerPrompt(plan:plan),"text_elements":[]]]
            let turn=try bridge.request("turn/start",["threadId":threadID,"input":input,"effort":model.effort,"model":model.id],timeout:60)
            guard let t=turn["turn"] as? [String:Any],let turnID=t["id"] as? String else{throw failure("O Codex não confirmou o início.")}
            let cancelled=fm.fileExists(atPath:core.home.appendingPathComponent("onboarding/cancel").path)
            let early:[String:Any]?
            do {
                stateLock.lock();defer{stateLock.unlock()}
                guard runGeneration==generation,connectionEpoch==epoch,!completedTurn,bridge.isRunning else{throw failure("A conexão expirou antes de confirmar o turno.")}
                let rejected=consents.bind(turn:turnID);rejected.forEach{bridge.reject(id:$0)}
                let awaiting = !consents.pending.isEmpty
                try update(["turnID":turnID,"status":cancelled ? "cancelling" : awaiting ? "waiting_user" : "running","phase":"preparing","codexStarted":true,"message":cancelled ? "Interrompendo o Codex…" : awaiting ? "O Codex precisa da sua resposta." : "Codex está preparando o seu Oracle."])
                early=earlyCompletions.removeValue(forKey:turnID)
            }
            if cancelled {_ = try bridge.request("turn/interrupt",["threadId":threadID,"turnId":turnID])}
            if let early {notifications.async {self.notification("turn/completed",early,generation:generation)}}
        } catch {stateLock.lock();_=consents.invalidate();earlyCompletions.removeAll();completedTurn=true;stateLock.unlock();let cancelled=fm.fileExists(atPath:core.home.appendingPathComponent("onboarding/cancel").path);try update(["status":cancelled ? "cancelled" : "interrupted","message":"A execução opcional não iniciou ou perdeu a conexão. A instalação local continua disponível."]);throw error}
    }
    private func installerPrompt(plan:[String:Any])->String {
        let args=[Bundle.main.executableURL!.path,"--state",core.home.path]
        let encoded=String(decoding:(try? jsonData(args)) ?? Data(),as:UTF8.self)
        return """
        Execute a skill oracle-onboarding para este plano já revisado e autorizado pelo usuário. Não use subagentes nem outra API/modelo. Execute os comandos determinísticos com esta lista de argumentos base JSON: \(encoded). Plano: \(core.home.appendingPathComponent("setup/plan.json").path). ID: \(plan["id"] ?? ""). Não altere o plano nem invente confirmações. Todas as respostas pessoais precisam ser confirmadas na interface Oracle. Se o readback do GBrain ainda não estiver confirmado, prepare-o e encerre este turno aguardando a revisão no Oracle. Quando confirmado, prossiga até verificar estrutura, índice e skill. Preserve instalações existentes, identidade, Hermes, hooks globais, clientes e meeting-prep. Não instale provedores pagos. Não use tokens como API. O Oracle lê recibos determinísticos; sua mensagem não conta como sucesso. Em cancelamento pare e preserve o journal. Prefira invocação com Python subprocess.run(lista), sem concatenar caminhos no shell.
        """
    }
    func cancel() throws -> [String:Any] {
        let state=core.onboardingRecord();guard onboardingActiveStatuses.contains(state["status"] as? String ?? "") || state["status"] as? String=="waiting_user" else{return try snapshot()}
        try atomicWriteData(Data("cancel".utf8),to:core.home.appendingPathComponent("onboarding/cancel"))
        stateLock.lock();let pending=consents.invalidate();let local=localInFlight;stateLock.unlock()
        try update(["status":"cancelling","message":"Interrompendo a instalação; os itens confirmados serão preservados."])
        if state["executor"] as? String=="native-local" {
            if !local {try update(["status":"cancelled","message":"Configuração pausada. Seus avanços foram preservados."])}
            return try snapshot()
        }
        pending.forEach{bridge.reject(id:$0)}
        if state["status"] as? String=="waiting_user",state["awaitingIdentity"] as? Bool==true {try update(["status":"cancelled","message":"Configuração pausada. Seus avanços foram preservados."]);return try snapshot()}
        if let thread=state["threadID"] as? String,let turn=state["turnID"] as? String,bridge.isRunning {
            do {_=try bridge.request("turn/interrupt",["threadId":thread,"turnId":turn],timeout:15)}catch{try update(["status":"interrupted","message":"Cancelamento solicitado. Reconecte para verificar se o Codex parou."]);throw error}
        } else {try update(["status":"interrupted","message":"Cancelamento registrado; reconecte para conferir a tarefa."])}
        return try snapshot()
    }
    func confirmReadback(_ hash:String) throws {
        stateLock.lock();defer{stateLock.unlock()}
        try requireAccess();try ensureNotRunning();core.refreshConfig()
        guard try core.onboardingReview() != nil else{throw failure("Esta revisão já foi substituída. Revise o plano atual.")}
        let plan=try core.validatedPlan(),receipt=try readJSON(core.home.appendingPathComponent("setup/gbrain-readback.json"))
        guard receipt["plan_hash"] as? String==plan["plan_hash"] as? String,receipt["status"] as? String=="awaiting_readback_confirmation",receipt["upstream_hash"] as? String==hash,!hash.isEmpty else{throw failure("Esta revisão expirou ou pertence a outro plano.")}
        try core.confirmGBrain(hash)
        try update(["status":"paused","phase":"identity_confirmed","awaitingIdentity":false,"message":"Respostas confirmadas. Retome para concluir a instalação local."])
    }
    func refreshPlugins() throws -> [String:Any] {
        try requireAccess();guard bridge.isRunning else{throw failure("Conecte ao Codex para verificar os plugins.")};let account=try bridge.account();try writeJSON(account,core.home.appendingPathComponent("onboarding/connection.json"));guard account["connected"] as? Bool==true else{throw failure("Autorize sua conta no Codex para verificar os plugins.")}
        stateLock.lock();let loaded=loadedThreadID;stateLock.unlock()
        let result=bridge.inventory(threadID:loaded)
        try writeJSON(result,core.home.appendingPathComponent("onboarding/plugins.json"));return result
    }
    func verifyCodexSkill() throws {
        try requireAccess();guard bridge.isRunning else{throw failure("A descoberta no Codex é opcional e exige conexão explícita.")}
        let receipt=try readJSON(core.home.appendingPathComponent("setup/bridge.json"))
        guard let workspace=receipt["workspace"] as? String,let skill=receipt["skill"] as? String else{throw failure("A integração com o Codex ainda não foi preparada.")}
        let result=try bridge.request("skills/list",["cwds":[workspace],"forceReload":true])
        let skills=(result["data"] as? [[String:Any]] ?? []).flatMap{$0["skills"] as? [[String:Any]] ?? []}
        let required=Set(core.requiredGBrainCodexSkillPaths()+[skill])
        let discovered=Set(skills.filter{$0["enabled"] as? Bool==true}.compactMap{$0["path"] as? String})
        guard required.isSubset(of:discovered) else{throw failure("O Codex ainda não reconheceu todos os procedimentos instalados. Abra o espaço Oracle no Codex e verifique suas permissões.")}
        let method=try core.verifyGBrainBridge()
        try writeJSON(["workspace":workspace,"skills":required.sorted(),"verifiedAt":ISO8601DateFormatter().string(from:Date()),"skillDiscoveryVerified":true,"identityFilesVerified":method["identity"] ?? false,"modelExecutionVerified":false,"hooksTrusted":false],core.home.appendingPathComponent("setup/codex-discovery.json"))
    }
    func openCodexWorkspace() throws {
        try requireAccess()
        let receipt=try? readJSON(core.home.appendingPathComponent("setup/bridge.json"))
        let workspace=(receipt?["workspace"] as? String).map{URL(fileURLWithPath:$0)} ?? core.home.appendingPathComponent("onboarding/workspace")
        guard workspace.standardizedFileURL.path.hasPrefix(core.home.path+"/"),fm.fileExists(atPath:workspace.path) else{throw failure("Configure seu Oracle antes de abrir esse espaço.")}
        let result=try runProcess(CodexBridge.executable(),["app",workspace.path],cwd:core.home,environment:["HOME":fm.homeDirectoryForCurrentUser.path,"PATH":"/usr/bin:/bin:/opt/homebrew/bin"],timeout:15)
        guard result.code==0 else{throw failure("Não foi possível abrir o Codex. Abra o aplicativo pelo Finder.")}
    }
    private func notification(_ method:String,_ p:[String:Any],generation:UUID) {
        stateLock.lock();defer{stateLock.unlock()}
        if method=="account/login/completed" {
            guard let id=p["loginId"] as? String,id==loginID else{return}
            loginID=nil;try? update(["authorizing":false]);try? writeJSON(["connected":false],core.home.appendingPathComponent("onboarding/connection.json"));return
        }
        let state=core.onboardingRecord()
        guard generation==runGeneration,state["executor"] as? String=="codex",let thread=p["threadId"] as? String,thread==state["threadID"] as? String else{return}
        if method=="serverRequest/resolved",let id=p["requestId"] {
            if consents.resolve(thread:thread,rpcID:id) {try? publishPending()};return
        }
        guard !completedTurn,["starting","running","waiting_user","cancelling"].contains(state["status"] as? String ?? "") else{return}
        if method=="turn/completed",let turn=p["turn"] as? [String:Any],let turnID=turn["id"] as? String {
            if state["status"] as? String=="starting",!(state["turnID"] is String) {
                if earlyCompletions.count<16 {earlyCompletions[turnID]=["threadId":thread,"turn":["id":turnID,"status":turn["status"] as? String ?? "unknown"]]};return
            }
            guard turnID==state["turnID"] as? String else{return}
            completedTurn=true;_=consents.invalidate();earlyCompletions.removeAll()
            if state["status"] as? String=="cancelling" || turn["status"] as? String=="interrupted" {try? update(["status":"cancelled","message":"Instalação interrompida. Os avanços locais foram preservados."]);return}
            guard turn["status"] as? String=="completed" else{try? update(["status":"failed","message":"O Codex não concluiu esta etapa. A instalação local pode ser retomada."]);return}
            if (try? core.onboardingSnapshot()["readback"]) != nil {try? update(["status":"waiting_user","phase":"identity","awaitingIdentity":true,"message":"Revise suas respostas para continuar."]);return}
            try? update(["status":"running","phase":"verification","message":"Turno encerrado; conferindo os recibos locais."])
            queue.async { [weak self] in
                guard let self else{return}
                do {
                    var verified=try self.localDriver.verify(self.core)
                    if let settings=(try self.core.validatedPlan())["maintenance"] as? [String:Any] {verified["maintenance"]=try self.core.configureMaintenance(settings)}
                    self.stateLock.lock();defer{self.stateLock.unlock()};guard self.runGeneration==generation,self.core.onboardingRecord()["status"] as? String=="running" else{return}
                    try self.core.checkOnboardingCancellation();try self.update(["existingBrainVerified":true]);let formation=try self.core.onboardingProgress()
                    try self.update(["formation":formation,"confirmedAt":ISO8601DateFormatter().string(from:Date()),"status":"completed","phase":"ready","message":"Seu Oracle está pronto para uso local.","verification":verified])
                } catch {
                    self.stateLock.lock();defer{self.stateLock.unlock()};guard self.runGeneration==generation else{return}
                    try? self.update(["status":"paused","message":"O turno terminou, mas os recibos locais ainda não comprovam a instalação. Retome a instalação local para verificar."])
                }
            }
        } else if method=="item/started",p["turnId"] as? String==state["turnID"] as? String,state["turnID"] is String,state["status"] as? String != "cancelling",let item=p["item"] as? [String:Any],item["type"] as? String=="commandExecution" {
            try? update(["phase":"installing","message":"Codex está executando a etapa opcional."])
        }
    }
    private func publishPending() throws {
        let state=core.onboardingRecord()
        guard !completedTurn,["starting","running","waiting_user"].contains(state["status"] as? String ?? ""),state["awaitingIdentity"] as? Bool != true else{try update([:]);return}
        try update(["status":consents.pending.isEmpty ? "running" : "waiting_user","message":consents.pending.isEmpty ? "Aguardando a próxima etapa do Codex." : "O Codex precisa da sua resposta."])
    }
    private func receivedRequest(_ id:Any,_ method:String,_ params:[String:Any],generation:UUID) {
        stateLock.lock();defer{stateLock.unlock()}
        let state=core.onboardingRecord()
        guard generation==runGeneration,!completedTurn,state["executor"] as? String=="codex",["starting","running","waiting_user"].contains(state["status"] as? String ?? "") else{bridge.reject(id:id);return}
        switch consents.receive(id:id,method:method,params:params,generation:generation) {
        case .queued:try? publishPending()
        case .deferred,.duplicate:break
        case .rejected:bridge.reject(id:id)
        }
    }
    func answerRequest(_ params:[String:Any]) throws {
        try requireAccess();stateLock.lock();defer{stateLock.unlock()}
        guard bridge.isRunning,!completedTurn,core.onboardingRecord()["status"] as? String=="waiting_user",let key=params["id"] as? String,
            let pending=consents.pending.first,pending.id==key,pending.generation==runGeneration else{throw failure("Esta solicitação expirou, já foi respondida ou não é a primeira da fila.")}
        if let supplied=params["generation"] as? String,UUID(uuidString:supplied) != pending.generation {throw failure("A solicitação pertence a uma execução anterior.")}
        let result=try pending.response(params) // validate BEFORE consuming the prompt
        _=try consents.take(id:key,generation:runGeneration)
        do {try bridge.reply(id:pending.rpcID,result:result);try publishPending()}
        catch {
            _=consents.invalidate();completedTurn=true
            disconnected();bridge.stop()
            try? update(["status":"interrupted","message":"Não foi possível confirmar o envio. As aprovações expiraram; reconecte antes de decidir novamente."])
            throw error
        }
    }
}
