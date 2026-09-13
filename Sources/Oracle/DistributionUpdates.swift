import Foundation
import Darwin

extension Core {
    func performDistributionUpdates(operation:String="check-apply") throws -> [String:Any] {
        let updates=try acquireOperationLock("updates");defer{releaseOperationLock(updates)}
        let installation=try acquireOperationLock("installation");defer{releaseOperationLock(installation)}
        refreshConfig()
        if ["rollback-distribution","rollback-skills"].contains(operation) {
            let result=try rollbackDistribution()
            try recordUpdate("complete","Acervo anterior recuperado",results:[result]);return try updateStatus()
        }
        guard ["check-apply","check-only"].contains(operation) else{throw failure("Operação de atualização inválida.")}
        try requireCapability(.configure)
        let checkOnly=operation=="check-only",network=UpdateNetwork()
        var results=[[String:Any]]()
        try recordUpdate("checking","Consultando o acervo e o GBrain")
        do {
            if config["gbrainWorkspace"] != nil {results.append(["id":"gbrain","status":"external","message":"Perfil externo preservado."])}
            else if onboardingRecord()["profileMode"] as? String=="memory-only", !["completed","not_started"].contains(onboardingRecord()["status"] as? String ?? "not_started") {results.append(["id":"gbrain","status":"recovery_required","message":"Conclua a instalação atual antes de mudar o motor."])}
            else {
                let matrix=try updateManifest()["gbrain"] as? [String:Any] ?? [:]
                let latest=try network.json("https://api.github.com/repos/garrytan/gbrain/releases/latest"),tag=latest["tag_name"] as? String ?? ""
                let version=(try? readJSON(updatePath("runtime/current.json")))?["version"] as? String ?? oracleGBrainPinnedVersion
                if tag=="v"+version {results.append(["id":"gbrain","status":"current","version":version,"message":"GBrain está atualizado no conjunto compatível."])}
                else if let release=(matrix["compatible_releases"] as? [[String:Any]])?.first(where:{$0["tag"] as? String==tag}) {
                    if checkOnly {results.append(["id":"gbrain","status":"available","version":tag,"message":"Conjunto compatível disponível."])}
                    else {
                        guard let asset=(latest["assets"] as? [[String:Any]])?.first(where:{$0["name"] as? String==release["asset"] as? String}),let url=asset["browser_download_url"] as? String,
                              asset["digest"] as? String=="sha256:"+(release["sha256"] as? String ?? "") else{throw failure("Asset GBrain não corresponde à matriz homologada.")}
                        let binary=try network.fetch(url,limit:220_000_000)
                        let setup=try acquireOperationLock("setup");defer{releaseOperationLock(setup)}
                        let brain=try acquireOperationLock("gbrain");defer{releaseOperationLock(brain)}
                        try requireCapability(.configure)
                        _=try activateRuntime(binary:binary,release:release)
                        results.append(["id":"gbrain","status":"updated","version":tag,"message":"Conjunto compatível atualizado e verificado."])
                    }
                } else {results.append(["id":"gbrain","status":"compatibility_required","version":tag,"message":"Atualize o Oracle para instalar esta versão do GBrain. O conjunto atual foi preservado."])}
            }
        } catch {results.append(["id":"gbrain","status":"error","message":error.localizedDescription])}
        do {
            try recordUpdate("verifying","Conferindo o acervo local",results:results)
            let manifest=try resolveDistribution(),ledger=(try? readJSON(distributionLedgerURL)) ?? [:]
            let saved=try? readJSON(home.appendingPathComponent("setup/plan.json"))
            if let saved,isMemoryOnly(saved),let id=saved["id"] as? String,
               let pending=try? readJSON(home.appendingPathComponent("staging/"+id+"/transaction.json")),pending["status"] as? String=="applying",saved["distribution_sha256"] as? String != manifest.hash {
                throw failure("Continue ou recupere a instalação interrompida antes de selecionar uma nova release.")
            }
            if checkOnly {
                let same=ledger["manifest_sha256"] as? String==manifest.hash
                let validPlan=try? validatedPlan()
                let contentValid=same && validPlan.map{(try? verifyDistribution(manifest,plan:$0)) != nil}==true
                let linksValid=same && validPlan.map{(try? verifyDistributionSkills(manifest,plan:$0)) != nil}==true
                results.append(["id":"skills","status":contentValid ? "current":"available","version":manifest.releaseID,"message":contentValid ? "Acervo local conferido.":same ? "Há arquivos locais que precisam ser recuperados.":"Novo acervo completo disponível: skills, prompts e tutoriais."])
                results.append(["id":"codex","status":linksValid ? "current":"available","message":linksValid ? "Skills locais conferidas; descoberta no host tem recibo próprio.":"Skills locais precisam ser instaladas ou recuperadas."])
            } else if ledger["manifest_sha256"] as? String==manifest.hash,let plan=try? validatedPlan(),isMemoryOnly(plan),
                      (try? verifyDistribution(manifest,plan:plan)) != nil,(try? verifyDistributionSkills(manifest,plan:plan)) != nil,
                      (try? verifyMemoryOnly(plan:plan)) != nil {
                results.append(["id":"skills","status":"current","version":manifest.releaseID,"message":"Acervo e arquivos locais atualizados."])
                results.append(["id":"codex","status":"current","message":"Skills locais atualizadas; descoberta no host tem verificação própria."])
            } else {
                let plan:[String:Any]
                if let saved,isMemoryOnly(saved),saved["distribution_sha256"] as? String==manifest.hash,
                   onboardingRecord()["status"] as? String != "completed" {plan=try validatedPlan()}
                else {plan=try makeMemoryOnlyPlan(manifest:manifest,id:UUID().uuidString)}
                let id=plan["id"] as! String
                func state(_ status:String,_ phase:String,_ message:String)throws {
                    var record=onboardingRecord();record["schemaVersion"]=3;record["profileMode"]="memory-only";record["runID"]=id;record["status"]=status;record["phase"]=phase;record["message"]=message;record["ownerPID"]=Int(getpid());record["localStarted"]=true
                    try writeJSON(record,onboardingURL)
                    try recordUpdate(phase,message,results:results)
                }
                try state("running","downloading","Baixando a atualização do acervo.")
                do {
                    // A prior user pause is resumed by this explicit Update action.
                    let cancel=home.appendingPathComponent("onboarding/cancel");if fm.fileExists(atPath:cancel.path){try fm.removeItem(at:cancel)}
                    try stageDistribution(manifest,plan:plan)
                    _=try initializeMemoryOnly(plan:plan);_=try applyPlan()
                    try state("running","installing","Atualizando skills, prompts e tutoriais.")
                    _=try applyDistribution(manifest,plan:plan)
                    results.append(["id":"skills","status":"updated","version":manifest.releaseID,"message":"Os arquivos das três bibliotecas foram verificados."])
                    do {_=try installDistributionSkills(manifest,plan:plan);results.append(["id":"codex","status":"updated","message":"Skills locais atualizadas; verificação no Codex pendente."])}
                    catch {results.append(["id":"codex","status":"error","message":error.localizedDescription]);throw error}
                    try state("running","indexing","Atualizando a busca e os links.")
                    _=try indexMemoryOnly(plan:plan);_=try prepareBridge()
                    try requireCapability(.configure)
                    let verification=try completeMemoryOnly(plan:plan)
                    try state("completed","ready","Acervo atualizado.")
                    var record=onboardingRecord();record["verification"]=verification;record["confirmedAt"]=ISO8601DateFormatter().string(from:Date());record["formation"]=try onboardingProgress();try writeJSON(record,onboardingURL)
                } catch {
                    try? state("failed",onboardingRecord()["phase"] as? String ?? "installing",error.localizedDescription)
                    let contentApplied=results.contains(where:{$0["id"] as? String=="skills" && $0["status"] as? String=="updated"})
                    results.append(["id":contentApplied ? "memory":"skills","status":"error","message":error.localizedDescription])
                }
            }
        } catch {results.append(["id":"skills","status":"error","message":error.localizedDescription])}
        let current=results.allSatisfy{["current","external"].contains($0["status"] as? String ?? "")}
        let failed=results.contains{$0["status"] as? String=="error"}
        try recordUpdate(failed ? "failed":"complete",failed ? "A atualização não foi concluída. Confira o erro abaixo.":current ? "Tudo atualizado":"Verificação concluída; confira o resultado de cada componente.",results:results)
        return try updateStatus()
    }
    /// Recovery is allowed without a new license grant. It only restores proven
    /// preimages and never discards edits made after the interrupted transaction.
    func rollbackDistribution() throws -> [String:Any] {
        try withVaultWrite {
            let plan=try readJSON(home.appendingPathComponent("setup/plan.json"))
            guard isMemoryOnly(plan),let id=plan["id"] as? String,UUID(uuidString:id) != nil,plan["vault"] as? String==config["vault"] as? String else{throw failure("Não há transação deste vault para recuperar.")}
            let stage=try scoped("staging/"+id,root:home),journalURL=stage.appendingPathComponent("transaction.json")
            var journal=try readJSON(journalURL)
            guard journal["plan_hash"] as? String==plan["plan_hash"] as? String,journal["status"] as? String != "rolled_back" else{throw failure("Transação já recuperada ou de outro plano.")}
            let operations=try distributionOperations(stage:stage,journal:journal),root=try vault()
            var retained=[String](),restored=0
            for (path,op) in operations.sorted(by:{$0.key>$1.key}) where op["intent"] as? Bool==true {
                guard let destination=op["destination"] as? String,let key=op["recovery"] as? String,DistributionManifest.validHash(key) else{throw failure("Operação de recuperação inválida.")}
                let target=try distributionOwnedDestination(destination,root:root),backup=stage.appendingPathComponent("recovery/"+key)
                try coordinatedWrite(at:target) {_ in
                    let exists=fm.fileExists(atPath:target.path)
                    if exists,let old=op["old_hash"] as? String,try fileDigest(target)==old{return}
                    if !exists,op["action"] as? String=="write",!(op["old_hash"] is String){return}
                    if op["action"] as? String=="remove" {
                        if exists {retained.append(path);return}
                    } else {
                        if !exists {retained.append(path);return}
                        guard try fileDigest(target)==op["new_hash"] as? String else{retained.append(path);return}
                    }
                    if let old=op["old_hash"] as? String {
                        let data=try Data(contentsOf:backup);guard digest(data)==old else{throw failure("Backup da transação alterado; fonte preservada.")}
                        try fm.createDirectory(at:target.deletingLastPathComponent(),withIntermediateDirectories:true)
                        if exists {try atomicWriteData(data,to:target)}else{try data.write(to:target,options:.withoutOverwriting)}
                    } else {guard Darwin.unlink(target.path)==0 else{throw failure("Arquivo mantido; recuperação não remove pastas.")}}
                    restored+=1
                }
            }
            try writeJSON(journal["previous"] ?? [:],distributionLedgerURL)
            journal["status"]="rolling_back";journal["retained_edits"]=retained;try writeJSON(journal,journalURL)
            // Global links are reconciled against the restored distribution only;
            // no unrelated host state is inferred from the vault files.
            let previous=journal["previous"] as? [String:Any] ?? [:]
            let retainedLinks=try rollbackDistributionSkillLinks(plan:plan)
            var restoredID=id
            if let oldID=previous["install_id"] as? String,UUID(uuidString:oldID) != nil,
               let oldPlan=try? readJSON(home.appendingPathComponent("setup/plans/"+oldID+".json")) {
                let oldManifest=try distributionForPlan(oldPlan)
                if retained.isEmpty {try publishDistributionInventory(oldManifest,plan:oldPlan)}
                try writeJSON(oldPlan,home.appendingPathComponent("setup/plan.json"))
                restoredID=oldID
            }
            var record=onboardingRecord();record["runID"]=restoredID;record["status"]="interrupted";record["message"]="Arquivos anteriores recuperados. O índice precisa ser conferido antes de concluir.";record["verification"]=NSNull();try writeJSON(record,onboardingURL)
            journal["status"]="rolled_back";try writeJSON(journal,journalURL)
            notifyVaultChanged(reason:"distribution-rollback")
            return ["id":"skills","status":"rolled_back","restored":restored,"preserved":retained,"preserved_links":retainedLinks,"index_verification_pending":true,"message":"\(restored) arquivos recuperados; \(retained.count) edições posteriores preservadas."]
        }
    }
}
