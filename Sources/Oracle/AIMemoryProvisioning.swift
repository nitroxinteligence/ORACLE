import Foundation

extension Core {
    private func aiMemoryProvisioningState()throws->URL {try scoped("ai-memory-provisioning",root:home)}
    private func aiMemoryProvisioningBinding(_ plan:[String:Any]?)throws->[String:Any] {
        refreshConfig()
        var value:[String:Any]=["vault":config["vault"] as? String ?? "","vaultSelectionRevision":config["vaultSelectionRevision"] as? String ?? "legacy"]
        if let plan {
            guard let requirement=plan["ai_memory"] as? [String:Any],try OracleAIMemoryProvisioning.canonical(requirement)==OracleAIMemoryProvisioning.canonical(OracleAIMemoryProvisioning.requirement),
                  let hash=plan["plan_hash"] as? String,!hash.isEmpty,plan["vault"] as? String==config["vault"] as? String else{throw failure("O requisito AI Memory precisa de um plano íntegro vinculado ao vault atual.")}
            value["plan_hash"]=hash
        }
        return value
    }
    private func aiMemoryProvisioningProtectionRoots()throws->[URL] {
        var roots=[try vault(),home.appendingPathComponent("gbrain"),home.appendingPathComponent("oracle-workspace"),home.appendingPathComponent("codex-workspace")]
        for key in ["gbrainProfile","gbrainWorkspace"] {if let path=config[key] as? String{roots.append(URL(fileURLWithPath:path))}}
        let profiles=[home.appendingPathComponent("gbrain/profile")]+((config["gbrainProfile"] as? String).map{[URL(fileURLWithPath:$0)]} ?? [])
        for profile in profiles {
            let file=profile.appendingPathComponent(".gbrain/config.json")
            if fm.fileExists(atPath:file.path) {
                guard let document=try JSONSerialization.jsonObject(with:OracleAIMemoryProvisioning.read(file,limit:1_000_000)) as? [String:Any] else{throw failure("O perfil GBrain precisa de revisão antes de preparar AI Memory.")}
                if let path=document["database_path"] as? String {guard path.hasPrefix("/") else{throw failure("O banco GBrain precisa declarar um caminho absoluto antes de preparar AI Memory.")};roots.append(URL(fileURLWithPath:path))}
            }
        }
        return roots
    }
    private func admitAIMemoryProvisioningDestination()throws {
        let state=try aiMemoryProvisioningState().standardizedFileURL.resolvingSymlinksInPath().path
        for root in try aiMemoryProvisioningProtectionRoots() {
            let path=root.standardizedFileURL.resolvingSymlinksInPath().path
            guard state != path,!state.hasPrefix(path+"/"),!path.hasPrefix(state+"/") else{throw failure("O estado operacional AI Memory precisa ficar fora do vault e do perfil/workspace GBrain. Escolha um --state separado antes de instalar.")}
        }
    }
    private func aiMemoryExistingCodex()throws->[String:Any]? {
        let host=distributionHostHome()
        var codex=host.appendingPathComponent(".codex")
        if host.path==fm.homeDirectoryForCurrentUser.path,let configured=ProcessInfo.processInfo.environment["CODEX_HOME"] {
            guard configured.hasPrefix("/") else{throw failure("CODEX_HOME precisa de revisão antes de provisionar AI Memory.")};codex=URL(fileURLWithPath:configured)
        }
        let forbidden=try aiMemoryProvisioningProtectionRoots()
        return try OracleAIMemoryProvisioning.existingCodex(codexHome:codex,forbidden:forbidden)
    }
    private func aiMemoryProvisioningHooks()->AIMemoryProvisioningHooks {
        let network=UpdateNetwork()
        return AIMemoryProvisioningHooks(fetch:{url,limit in try self.downloadDistribution(url.absoluteString,limit:limit,fetch:{try network.fetch($0,limit:$1)})},run:{binary,args,cwd,env in
            let result=try runProcess(binary,args,cwd:cwd,environment:env,timeout:60,operation:"Preparar AI Memory local")
            guard result.code==0 else{throw failure("O runtime AI Memory não pôde ser preparado. "+result.output)};return result.output
        })
    }
    func aiMemoryProvisioningStatus()->[String:Any] {
        do {
            let state=try aiMemoryProvisioningState(),record=try OracleAIMemoryProvisioning.object(state.appendingPathComponent("receipt.json"))
            guard let binding=record["binding"] as? [String:Any] else{throw failure("Recibo AI Memory sem vínculo.")}
            let expected=try aiMemoryProvisioningBinding(nil)
            guard binding["vault"] as? String==expected["vault"] as? String,binding["vaultSelectionRevision"] as? String==expected["vaultSelectionRevision"] as? String else{throw failure("AI Memory preparado para outra seleção de vault; verificação pendente.")}
            return try OracleAIMemoryProvisioning.verify(state:state,binding:binding)
        } catch{return ["runtimePrepared":false,"captureEnabled":false,"hooksTrusted":false,"executionVerified":false,"message":error.localizedDescription,"requirement":OracleAIMemoryProvisioning.requirement]}
    }
    @discardableResult
    func prepareAIMemoryRuntime(plan:[String:Any]?=nil,bundledArchive:URL?=nil)throws->[String:Any] {
        refreshConfig();try requireCapability(.configure);try admitAIMemoryProvisioningDestination()
        let lock=try acquireOperationLock("ai-memory-provisioning");defer{releaseOperationLock(lock)}
        return try withMemoryPortabilitySelection {
            refreshConfig();try requireCapability(.configure);try admitAIMemoryProvisioningDestination()
            let binding=try aiMemoryProvisioningBinding(plan),state=try aiMemoryProvisioningState(),existing=try aiMemoryExistingCodex()
            if existing != nil,let previous=try? OracleAIMemoryProvisioning.object(state.appendingPathComponent("receipt.json")),previous["mode"] as? String=="owned" {throw failure("Uma integração AI Memory global apareceu após o preparo local. Preserve ambas e revise o vínculo antes de continuar, sem instalar uma duplicata.")}
            let bundled=bundledArchive ?? bundledEngineResources().deletingLastPathComponent().appendingPathComponent("ai-memory/ai-memory-macos-aarch64.tar.gz")
            return try OracleAIMemoryProvisioning.prepare(state:state,binding:binding,existing:existing,bundledArchive:fm.fileExists(atPath:bundled.path) ? bundled:nil,hooks:aiMemoryProvisioningHooks())
        }
    }
    func verifyAIMemoryRuntime(plan:[String:Any])throws->[String:Any] {
        try withMemoryPortabilitySelection {
            let record=try OracleAIMemoryProvisioning.verify(state:aiMemoryProvisioningState(),binding:aiMemoryProvisioningBinding(plan))
            if record["mode"] as? String=="existing" {
                guard let current=try aiMemoryExistingCodex(),current["binary"] as? String==record["binary"] as? String,current["data"] as? String==record["data"] as? String,current["serverName"] as? String==record["serverName"] as? String else{throw failure("A integração AI Memory existente precisa de revisão.")}
            }
            return record
        }
    }
    func aiMemoryCodexDescriptor(plan:[String:Any])throws->[String:Any] {
        let runtime=try verifyAIMemoryRuntime(plan:plan)
        if runtime["mode"] as? String=="existing" {return try OracleAIMemoryProvisioning.descriptor(runtime)}
        // Local stdio is a readiness probe only. Codex chats share the verified
        // Oracle-owned HTTP singleton instead of racing dataDir serve locks.
        return try aiMemoryServiceCodexDescriptor(plan:plan)
    }
}
