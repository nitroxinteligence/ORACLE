import Foundation

extension Core {
    func isMemoryOnly(_ plan:[String:Any])->Bool {plan["schema_version"] as? Int==3 && plan["profile_mode"] as? String=="memory-only"}
    func verifyMemoryOnlyRuntime(_ plan:[String:Any]) throws {
        guard isMemoryOnly(plan) else{throw failure("Esta operação exige um plano de memória sem identidade.")}
        guard let roots=plan["library_roots"] as? [String:String],roots==config["libraryRoots"] as? [String:String] else{throw failure("As bibliotecas mudaram desde este plano. Restaure as raízes escolhidas ou selecione outro vault.")}
        var identity=stat();let root=try vault()
        guard lstat(root.path,&identity)==0,let expected=plan["vault_identity"] as? [String:Any],
              (expected["device"] as? NSNumber)?.int64Value==Int64(identity.st_dev),(expected["inode"] as? NSNumber)?.uint64Value==UInt64(identity.st_ino) else{throw failure("O vault foi movido ou substituído. Selecione a pasta novamente para criar um plano separado.")}
        let engine=try engineResources()
        guard try fileDigest(engine.appendingPathComponent("gbrain"))==plan["runtime_sha256"] as? String,
              try fileDigest(engine.appendingPathComponent("oracle-gbrain-read"))==plan["adapter_sha256"] as? String,
              try fileDigest(officialGBrainMethodRoot().appendingPathComponent("manifest.json"))==plan["method_sha256"] as? String else{throw failure("O conjunto de motor, adapter ou método mudou. Retome com a versão do Oracle usada neste plano.")}
    }
    /// No answers, interview, render or synthetic readback. Existing identity
    /// documents remain untouched and cannot grant trust to this new profile.
    func initializeMemoryOnly(plan:[String:Any]) throws -> [String:Any] {
        let lock=try acquireOperationLock("gbrain");defer{releaseOperationLock(lock)}
        return try withVaultWrite {
            try verifyMemoryOnlyRuntime(plan)
            try bindOwnedGBrainTarget(plan:plan)
            let workspace=try scoped("gbrain/workspace",root:home),configFile=try scoped("gbrain/profile/.gbrain/config.json",root:home)
            try fm.createDirectory(at:workspace,withIntermediateDirectories:true,attributes:[.posixPermissions:0o700])
            if !fm.fileExists(atPath:configFile.path){_=try official(["init","--pglite","--no-embedding"],workspace:workspace)}
            try prepareOwnedGBrainRuntime()
            let status=try gbrainRead(["operation":"status"],allowSetup:true)
            let receipt:[String:Any]=["schema_version":3,"profile_mode":"memory-only","plan_hash":plan["plan_hash"]!,"status":"engine_verified","identity_status":"not_applicable","engine":status,"inference":false]
            try writeJSON(receipt,home.appendingPathComponent("setup/memory-only.json"))
            try distributionEvent(plan:plan,phase:"preparing",kind:"connector",itemID:"gbrain",status:"verified",paths:[],completed:0,total:nil,extra:["name":"Second Brain"])
            return receipt
        }
    }
    func configureMemoryOnlySources(plan:[String:Any]) throws {
        let workspace=try scoped("gbrain/workspace",root:home),root=try vault()
        let status=try gbrainRead(["operation":"status"],allowSetup:true) as? [String:Any]
        let sources=status?["sources"] as? [[String:Any]] ?? []
        if let source=sources.first(where:{$0["id"] as? String=="oracle-vault"}) {
            guard source["local_path"] is NSNull || source["local_path"]==nil else{throw failure("oracle-vault precisa ser um índice derivado sem destino de escrita.")}
        } else {_=try official(["sources","add","oracle-vault","--name","Oracle vault"],workspace:workspace)}
        let memory=try scoped("INBOX/oracle-memory",root:root)
        try fm.createDirectory(at:memory,withIntermediateDirectories:true)
        if let source=sources.first(where:{$0["id"] as? String=="oracle-memory"}) {
            guard source["local_path"] as? String==memory.path else{throw failure("A memória canônica aponta para outro vault; nenhuma fonte foi alterada.")}
        } else {_=try official(["sources","add","oracle-memory","--path",memory.path,"--name","Oracle memory","--force"],workspace:workspace)}
        _=try official(["config","set","search.mcp_keyword_only","true"],workspace:workspace)
        config["gbrainVaultSource"]="oracle-vault";config["gbrainAccess"]=true
        config.removeValue(forKey:"gbrainWorkspace");config.removeValue(forKey:"gbrainProfile");try persist()
    }
    func indexMemoryOnly(plan:[String:Any]) throws -> [String:Any] {
        let lock=try acquireOperationLock("gbrain");defer{releaseOperationLock(lock)}
        try verifyMemoryOnlyRuntime(plan)
        try withVaultWrite {try configureMemoryOnlySources(plan:plan)}
        var snapshot=try scanSnapshot(root:vault()),lastVerified = -1,stalled=0
        guard snapshot.complete else{throw failure("Inventário incompleto; a indexação pode ser retomada após corrigir a leitura.")}
        let progressPath=home.appendingPathComponent("onboarding/installations/"+(plan["id"] as! String)+"/index.json")
        let prior=(try? readJSON(progressPath)) ?? [:]
        var generation=(prior["generation"] as? Int ?? 0)+1,changedGenerations=0
        while true {
            try checkOnboardingCancellation()
            let result=try indexVaultSnapshot(snapshot,generation:generation,planRef:plan["id"] as? String,budget:120,maxUpserts:5000)
            let count=result["verified"] as? Int ?? 0
            try writeJSON(["plan_hash":plan["plan_hash"]!,"generation":generation,"signature":snapshot.signature,"result":result],progressPath)
            try distributionEvent(plan:plan,phase:"indexing",kind:"index",itemID:"oracle-vault",status:result["complete"] as? Bool==true ? "verified":"partial",paths:[],completed:count,total:result["total"] as? Int)
            if result["complete"] as? Bool==true {
                guard count==result["total"] as? Int,(result["failures"] as? [Any] ?? []).isEmpty else{throw failure("O índice declarou conclusão com páginas pendentes.")}
                let receipt:[String:Any]=["schema_version":3,"profile_mode":"memory-only","plan_hash":plan["plan_hash"]!,"status":"memory_and_index_verified","identity_status":"not_applicable","index":result,"generation":generation,"inference":false]
                try writeJSON(receipt,home.appendingPathComponent("setup/memory-only.json"))
                return receipt
            }
            if count<=lastVerified {stalled+=1}else{stalled=0};lastVerified=count
            if result["needs_resume"] as? Bool==true && stalled<2 {continue}
            let current=try scanSnapshot(root:vault())
            if current.complete,current.signature != snapshot.signature,changedGenerations<3 {
                snapshot=current;generation+=1;changedGenerations+=1;lastVerified = -1;stalled=0;continue
            }
            throw failure("A indexação está incompleta e parou de avançar. Confira as notas indisponíveis e tente novamente; o checkpoint foi preservado.")
        }
    }
    func verifyMemoryOnly(plan:[String:Any]) throws -> [String:Any] {
        try verifyMemoryOnlyRuntime(plan)
        let receipt=try readJSON(home.appendingPathComponent("setup/memory-only.json"))
        guard receipt["profile_mode"] as? String=="memory-only",receipt["plan_hash"] as? String==plan["plan_hash"] as? String,
              receipt["status"] as? String=="memory_and_index_verified",receipt["identity_status"] as? String=="not_applicable",
              let index=receipt["index"] as? [String:Any],index["complete"] as? Bool==true,
              index["manifest_file_sha256"] as? String == (try fileDigest(home.appendingPathComponent("gbrain/profile/oracle-vault-manifest.json"))) else{throw failure("Memória e índice ainda não têm recibo integral deste plano.")}
        let status=try gbrainRead(["operation":"status"],allowSetup:true) as? [String:Any],sources=status?["sources"] as? [[String:Any]] ?? []
        let memory=try scoped("INBOX/oracle-memory",root:vault()).path
        guard sources.contains(where:{$0["id"] as? String=="oracle-memory" && $0["local_path"] as? String==memory}),
              sources.contains(where:{$0["id"] as? String=="oracle-vault" && ($0["local_path"]==nil || $0["local_path"] is NSNull)}) else{throw failure("As fontes de memória mudaram desde a instalação.")}
        return ["memory":true,"index":index,"identity_status":"not_applicable","inference":false]
    }
    func completeMemoryOnly(plan:[String:Any]) throws -> [String:Any] {
        let manifest=try distributionForPlan(plan)
        _=try applyPlan(verifyOnly:true)
        let content=try verifyDistribution(manifest,plan:plan),memory=try verifyMemoryOnly(plan:plan),method=try verifyGBrainBridge(),codex=try verifyDistributionSkills(manifest,plan:plan)
        guard method["identity_status"] as? String=="not_applicable" else{throw failure("Ponte de memória sem identidade não verificada.")}
        let verification:[String:Any]=["schema_version":3,"plan_hash":plan["plan_hash"]!,"manifest_sha256":manifest.hash,"structure":true,"distribution":content,"memory":memory,"method":method,"codex":codex,"identity_status":"not_applicable","localOnly":true,"hooksTrusted":false,"completed_at":ISO8601DateFormatter().string(from:Date())]
        try writeJSON(verification,home.appendingPathComponent("onboarding/installations/"+(plan["id"] as! String)+"/completed.json"))
        return verification
    }
}
