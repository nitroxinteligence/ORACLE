import Foundation

extension Core {
    /// Private database backups are independent of indexing, capture and remote consent.
    /// None of these entrypoints accepts an arbitrary filesystem destination.
    private var gbrainBackupRoot:URL { home.appendingPathComponent("gbrain-backups") }

    func gbrainBackupStatus() -> [String:Any] {
        refreshConfig()
        let consent=(try? readJSON(gbrainBackupRoot.appendingPathComponent("consent.json"))) ?? [:]
        let profile=home.appendingPathComponent("gbrain/profile").path
        let owner=(try? readJSON(home.appendingPathComponent("gbrain/profile/oracle-owned.json"))) ?? [:]
        let available=config["gbrainWorkspace"] == nil && config["gbrainAccess"] as? Bool == true &&
            config["gbrainVaultSource"] as? String == "oracle-vault" && config["vault"] is String &&
            owner["owner"] as? String == "OracleCompanion" && owner["schema_version"] as? Int == 2 &&
            owner["vault_root"] as? String == config["vault"] as? String
        let matches=consent["profile"] as? String == profile && consent["vault_root"] as? String == config["vault"] as? String
        let recorded=(try? readJSON(gbrainBackupRoot.appendingPathComponent("last-run.json"))) ?? [:]
        let receipt=available && recorded["profile"] as? String == profile && recorded["vault_root"] as? String == config["vault"] as? String ? recorded : [:]
        return ["enabled":available && matches && consent["enabled"] as? Bool == true,"available":available,"targetMatches":matches,
                "lastRun":receipt,
                "scope":"full_pglite_database_only","vaultFilesIncluded":false,"private":true]
    }

    @discardableResult
    func configureGBrainBackupConsent(enabled:Bool) throws -> [String:Any] {
        let lock=try acquireOperationLock("gbrain-backup");defer{releaseOperationLock(lock)}
        refreshConfig()
        let profile=try scoped("gbrain/profile",root:home)
        if enabled {
            guard config["gbrainWorkspace"] == nil,config["gbrainAccess"] as? Bool == true,
                  config["gbrainVaultSource"] as? String == "oracle-vault",
                  let target=config["vault"] as? String else {throw failure("Backup exige o perfil local Oracle autorizado.")}
            let owner=try readJSON(try scoped("oracle-owned.json",root:profile))
            guard owner["owner"] as? String == "OracleCompanion",owner["schema_version"] as? Int == 2,
                  owner["vault_root"] as? String == target else {throw failure("O perfil não pertence ao vault autorizado.")}
        }
        let directory=try scoped("gbrain-backups",root:home)
        try fm.createDirectory(at:directory,withIntermediateDirectories:true,attributes:[.posixPermissions:0o700])
        let receipt:[String:Any]=["schema_version":1,"enabled":enabled,"scope":"full_pglite_database_only",
            "profile":profile.path,"vault_root":config["vault"] as? String ?? "",
            "private":true,"network":false,"at":ISO8601DateFormatter().string(from:Date())]
        try writeJSON(receipt,try scoped("consent.json",root:directory))
        return receipt
    }

    /// Acquires the cooperative gbrain lock itself. Do NOT call while already holding it.
    /// The adapter additionally acquires GBrain's actual PGLite writer lock.
    @discardableResult
    func createGBrainBackup() throws -> [String:Any] {
        let backup=try acquireOperationLock("gbrain-backup");defer{releaseOperationLock(backup)}
        let brain=try acquireOperationLock("gbrain");defer{releaseOperationLock(brain)}
        return try runGBrainBackupOperation(action:"create")
    }

    /// Checks manifest, sizes and hashes only; deliberately never claims a restore.
    func verifyGBrainBackup(id:String) throws -> [String:Any] {
        try validateGBrainBackupID(id)
        let lock=try acquireOperationLock("gbrain-backup");defer{releaseOperationLock(lock)}
        return try runGBrainBackupOperation(action:"verify",id:id)
    }

    /// Restores the complete database ONLY to a new private validation state.
    /// This does not activate a profile, write through to a vault or overwrite live data.
    func restoreGBrainBackup(id:String,confirmed:Bool=false) throws -> [String:Any] {
        guard confirmed else {throw failure("Confirme a restauração de teste em um estado novo. O banco ativo não será substituído.")}
        try validateGBrainBackupID(id)
        let lock=try acquireOperationLock("gbrain-backup");defer{releaseOperationLock(lock)}
        return try runGBrainBackupOperation(action:"restore",id:id,confirmed:true)
    }

    private func validateGBrainBackupID(_ id:String) throws {
        guard UUID(uuidString:id) != nil,!id.contains("/"),!id.contains("\\") else {throw failure("Identificador de backup inválido.")}
    }

    private func runGBrainBackupOperation(action:String,id:String?=nil,confirmed:Bool=false) throws -> [String:Any] {
        refreshConfig()
        guard config["gbrainWorkspace"] == nil,config["gbrainAccess"] as? Bool == true,
              config["gbrainVaultSource"] as? String == "oracle-vault" else {throw failure("Backup indisponível: acesso revogado ou instalação externa.")}
        let directory=try scoped("gbrain-backups",root:home)
        // No implicit opt-in, even on the first installation or a maintenance timer.
        if action == "create" {
            let consent=try readJSON(try scoped("consent.json",root:directory))
            guard consent["enabled"] as? Bool == true,consent["vault_root"] as? String == config["vault"] as? String,
                  consent["profile"] as? String == home.appendingPathComponent("gbrain/profile").path else {throw failure("Autorize separadamente o backup privado do banco para este vault.")}
        }
        var request:[String:Any]=["operation":"backup","action":action,"state":home.path,"confirmed":confirmed]
        if let id { request["id"]=id }
        let result=try runProcess(engineResources().appendingPathComponent("oracle-gbrain-read"),[],cwd:home,
            environment:engineEnvironment(),input:jsonData(request),timeout:600)
        guard let line=result.output.split(separator:"\n").last(where:{$0.hasPrefix("{")}),
              let response=try JSONSerialization.jsonObject(with:Data(line.utf8)) as? [String:Any] else {throw failure("Backup sem resposta verificável; não foi declarado concluído.")}
        guard result.code == 0,response["ok"] as? Bool == true,var value=response["value"] as? [String:Any] else {
            throw failure(response["error"] as? String ?? "Backup não concluído. Nenhum banco ativo foi substituído.")
        }
        guard value["complete"] as? Bool == true,value["integrity_verified"] as? Bool == true,
              value["status"] as? String == (action == "restore" ? "restore_verified" : "backup_verified"),
              value["restore_verified"] as? Bool == (action == "restore") else {
            throw failure("Resposta de backup incompleta; o último sucesso foi preservado.")
        }
        value["profile"]=home.appendingPathComponent("gbrain/profile").path
        value["vault_root"]=config["vault"]
        value["checkedAt"]=ISO8601DateFormatter().string(from:Date())
        try writeJSON(value,try scoped("last-run.json",root:directory))
        return value
    }
}
