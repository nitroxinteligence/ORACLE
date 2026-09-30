import Foundation

extension Core {
    /// Bind a directory choice to the selection displayed when the panel opened.
    /// The revision also detects A -> B -> A while the panel is pending.
    func memoryPortabilityScope() throws -> String {
        let file=home.appendingPathComponent("config.json")
        let values=try file.resourceValues(forKeys:[.isRegularFileKey,.fileSizeKey])
        guard values.isRegularFile==true,let size=values.fileSize,size<=1_000_000 else {
            throw failure("Não foi possível conferir o vault selecionado.")
        }
        let value=try readJSON(file)
        return digest(try jsonData(["vault":value["vault"] ?? NSNull(),
                                   "revision":value["vaultSelectionRevision"] ?? "legacy"]))
    }

    /// Short, shared exclusion with vault selection. Reentrant on this thread
    /// so revoking consent during selection can use the same boundary.
    func withMemoryPortabilitySelection<T>(expectedScope:String?=nil,_ body:()throws->T) throws -> T {
        let key="oracle.memory-selection."+digest(Data(home.path.utf8))
        let dictionary=Thread.current.threadDictionary
        var descriptor:Int32?
        if dictionary[key]==nil {
            descriptor=try acquireOperationLock("memory-portability-selection")
            dictionary[key]=true
        }
        defer {if let descriptor {dictionary.removeObject(forKey:key);releaseOperationLock(descriptor)}}
        if let expectedScope,try memoryPortabilityScope() != expectedScope {
            throw failure("O vault mudou enquanto a escolha estava aberta. Abra novamente e autorize o destino para o vault atual.")
        }
        refreshConfig()
        return try body()
    }

    /// A newly selected vault requires a new export/backup destination review.
    /// Returning to an older vault must not revive these global manual consents.
    func revokeMemoryPortabilityConsents() throws {
        if fm.fileExists(atPath:home.appendingPathComponent("ai-memory-vault-export/consent.json").path) {
            _=try configureAIMemoryVaultExport(enabled:false)
        }
        if fm.fileExists(atPath:home.appendingPathComponent("vault-backups/consent.json").path) {
            _=try configureVaultBackupConsent(enabled:false)
        }
    }
}
