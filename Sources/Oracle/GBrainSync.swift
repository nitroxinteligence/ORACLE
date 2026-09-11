import Foundation

extension Core {
    /// Snapshot only: never opens a database or reads the vault's document bodies.
    func gbrainSyncStatus() -> [String:Any] {
        refreshConfig()
        if config["gbrainWorkspace"] is String { return ["status":"external_preserved","mode":"external","no_op":true,"inference":false] }
        guard config["gbrainAccess"] as? Bool != false, config["gbrainVaultSource"] as? String == "oracle-vault" else {
            return ["status":"unconfigured","mode":"disabled","no_op":true,"inference":false]
        }
        var result=(try? readJSON(home.appendingPathComponent("setup/gbrain-sync.json"))) ?? ["status":"not_verified"]
        let marker=(try? readJSON(home.appendingPathComponent("gbrain/profile/oracle-owned.json"))) ?? [:]
        let root=(config["vault"] as? String).map { URL(fileURLWithPath:$0).resolvingSymlinksInPath().standardizedFileURL.path }
        if root == nil || marker["vault_root"] as? String != root { result=["status":"target_changed","no_op":true] }
        result["running"]=operationIsRunning("gbrain"); result["inference"]=false
        result["excluded_sources"]=["INBOX/oracle-memory"]
        return result
    }
    func gbrainSyncSnapshot() -> [String:Any] { gbrainSyncStatus() }

    /// Sole public writer entrypoint for timer, explicit maintenance and post-save.
    /// Caller must NOT hold the gbrain lock; setup uses the locked helper below.
    @discardableResult
    func syncGBrainVault(force:Bool=false) throws -> [String:Any] {
        refreshConfig()
        if config["gbrainWorkspace"] is String { return ["status":"external_preserved","no_op":true,"inference":false] }
        guard config["gbrainAccess"] as? Bool != false, config["gbrainVaultSource"] as? String == "oracle-vault" else {
            return ["status":"unconfigured","no_op":true,"inference":false]
        }
        let lock=try acquireOperationLock("gbrain");defer{releaseOperationLock(lock)}
        refreshConfig()
        guard config["gbrainWorkspace"] == nil,config["gbrainAccess"] as? Bool != false,config["gbrainVaultSource"] as? String=="oracle-vault" else {return ["status":"access_changed","no_op":true]}
        return try performOwnedGBrainSyncLocked(force:force,reason:"maintenance")
    }
    @discardableResult
    func syncGBrainIndex(reason:String,allowSetup:Bool=false) throws -> [String:Any] {
        // Setup must use performOwnedGBrainSyncLocked while the CLI holds gbrain.
        guard !allowSetup else {throw failure("A sincronização de setup exige o caminho de instalação já bloqueado.")}
        return try syncGBrainVault()
    }
    func prepareOwnedGBrainRuntime() throws {
        for relative in ["gbrain/profile","gbrain/profile/tmp"] {
            let url=try scoped(relative,root:home)
            try fm.createDirectory(at:url,withIntermediateDirectories:true,attributes:[.posixPermissions:0o700])
        }
        // Guard the official CLI too, before it can resolve any configuration.
        let configFile=try scoped("gbrain/profile/.gbrain/config.json",root:home)
        let secrets=try scoped("gbrain/profile/.gbrain/.env",root:home)
        guard !fm.fileExists(atPath:secrets.path) else {throw failure("O perfil isolado Oracle não utiliza arquivos de credenciais; preserve essa instalação como externa.")}
        if fm.fileExists(atPath:configFile.path) {
            let raw=try readJSON(configFile)
            let base=try scoped("gbrain/profile/.gbrain",root:home).path
            guard raw["engine"] as? String=="pglite",raw["embedding_disabled"] as? Bool==true,
                  let database=raw["database_path"] as? String,database.hasPrefix(base+"/"),
                  URL(fileURLWithPath:database).resolvingSymlinksInPath().standardizedFileURL.path==database else {throw failure("Configuração GBrain fora do perfil local sem embeddings.")}
            func containsProvider(_ object:Any) -> Bool {
                if let dictionary=object as? [String:Any] {
                    for (key,value) in dictionary {
                        let flagged=key.range(of:"api.?key|credential|database_url|base_url|embedding_model|chat_model|expansion_model|reranker_model",options:.regularExpression) != nil
                        if flagged,!(value is NSNull),String(describing:value) != "",String(describing:value) != "false" {return true}
                        if containsProvider(value) {return true}
                    }
                } else if let array=object as? [Any] {return array.contains(where:containsProvider)}
                return false
            }
            guard !containsProvider(raw) else {throw failure("Provedores adicionais não fazem parte da integração Oracle.")}
        }
    }
    /// Bind the adapter to the reviewed canonical target before initialization.
    /// A preexisting unowned config or a different bound vault is never adopted.
    func bindOwnedGBrainTarget(plan:[String:Any]) throws {
        let root=try vault().resolvingSymlinksInPath().standardizedFileURL
        let profile=try scoped("gbrain/profile",root:home).standardizedFileURL
        guard root.path != profile.path,!root.path.hasPrefix(profile.path+"/"),!profile.path.hasPrefix(root.path+"/") else {
            throw failure("O vault e o perfil de indexação não podem se sobrepor.")
        }
        let url=try scoped("gbrain/profile/oracle-owned.json",root:home)
        let prior=try? readJSON(url)
        if let prior {
            guard prior["owner"] as? String=="OracleCompanion", [1,2].contains(prior["schema_version"] as? Int ?? 0) else {throw failure("Perfil GBrain sem propriedade Oracle válida.")}
            if let target=prior["vault_root"] as? String,target != root.path {throw failure("O perfil pertence a outro vault. Nenhuma fonte foi alterada.")}
            if let manifest=try? readJSON(profile.appendingPathComponent("oracle-vault-manifest.json")),manifest["root"] as? String != root.path {throw failure("O recibo do índice pertence a outro vault.")}
        } else if fm.fileExists(atPath:profile.appendingPathComponent(".gbrain/config.json").path) {
            throw failure("Instalação GBrain existente sem recibo Oracle; conecte-a sem reinicializar.")
        }
        try prepareOwnedGBrainRuntime()
        try writeJSON(["owner":"OracleCompanion","schema_version":2,"vault_root":root.path,"plan_hash":plan["plan_hash"] ?? "","engine_version":"0.48.4.0"],url)
    }
    /// Internal setup seam; caller owns the process-wide `gbrain` operation lock.
    @discardableResult
    func performOwnedGBrainSyncLocked(force:Bool=false,reason:String,plan:[String:Any]?=nil) throws -> [String:Any] {
        let root=try vault().resolvingSymlinksInPath().standardizedFileURL
        let owner=try readJSON(try scoped("gbrain/profile/oracle-owned.json",root:home))
        guard owner["owner"] as? String=="OracleCompanion",owner["schema_version"] as? Int==2,owner["vault_root"] as? String==root.path else {throw failure("Fonte e destino do índice precisam ser confirmados novamente.")}
        try prepareOwnedGBrainRuntime()
        var env=engineEnvironment();env["ORACLE_RECEIPT_DIR"]=try scoped("events",root:home).path
        if let id=plan?["id"] as? String,UUID(uuidString:id) != nil {env["ORACLE_PLAN_EVENTS_DIR"]=try scoped("setup/events/"+id,root:home).path}
        var request:[String:Any]=["operation":"index","source":"oracle-vault","root":root.path,"force":force,"owned":true]
        if let id=plan?["id"] as? String {request["plan_ref"]=id}
        let receipt=try scoped("setup/gbrain-sync.json",root:home)
        do {
            let result=try runProcess(engineResources().appendingPathComponent("oracle-gbrain-read"),[],cwd:try scoped("gbrain/workspace",root:home),environment:env,input:jsonData(request),timeout:600)
            guard result.code==0,let line=result.output.split(separator:"\n").last(where:{$0.hasPrefix("{")}),
                  let response=try JSONSerialization.jsonObject(with:Data(line.utf8)) as? [String:Any],response["ok"] as? Bool==true,
                  var value=response["value"] as? [String:Any],value["complete"] as? Bool==true else {
                throw failure("Índice não confirmado. O último recibo completo e os documentos originais foram preservados; confira os eventos antes de retomar.")
            }
            let manifest=try scoped("gbrain/profile/oracle-vault-manifest.json",root:home)
            guard value["manifest_file_sha256"] as? String==digest(try Data(contentsOf:manifest)) else {throw failure("O recibo do índice mudou antes da verificação final.")}
            value["status"]="verified";value["checkedAt"]=ISO8601DateFormatter().string(from:Date());value["inference"]=false;value["reason"]=reason
            try writeJSON(value,receipt);return value
        } catch {
            var last=(try? readJSON(receipt)) ?? [:]
            last["status"]="needs_attention";last["attemptedAt"]=ISO8601DateFormatter().string(from:Date());last["inference"]=false
            try? writeJSON(last,receipt);throw error
        }
    }
}
