import Foundation

extension Core {
    private func vaultBackupState(_ path: String) throws -> URL { try scoped("vault-backups/" + path, root: home) }
    private func vaultBackupJSON(_ path: String, limit: Int = 8_000_000) throws -> [String: Any] {
        let file = try vaultBackupState(path)
        guard let size = try file.resourceValues(forKeys: [.fileSizeKey, .isRegularFileKey]).fileSize,
              size <= limit, (try file.resourceValues(forKeys: [.isRegularFileKey])).isRegularFile == true else { throw failure("Recibo de backup do vault inválido ou fora do limite.") }
        return try readJSON(file)
    }
    /// These paths are only protection boundaries. No database bytes are copied.
    private func vaultBackupProtectionRoots() throws -> (protected: [URL], destinations: [URL]) {
        var protected = [home], destinations = [home]
        let profiles = [home.appendingPathComponent("gbrain/profile")] + ((config["gbrainProfile"] as? String).map { [URL(fileURLWithPath: $0)] } ?? [])
        for profile in profiles {
            protected.append(profile); destinations.append(profile)
            let file = try scoped(".gbrain/config.json", root: profile)
            if fm.fileExists(atPath: file.path) {
                guard let size = try file.resourceValues(forKeys: [.fileSizeKey]).fileSize, size <= 1_000_000 else { throw failure("A origem do banco ativo precisa de revisão antes de copiar o vault.") }
                let document = try readJSON(file)
                if let path = document["database_path"] as? String {
                    guard path.hasPrefix("/") else { throw failure("O banco ativo não declara uma origem absoluta; o backup do vault ficou pendente.") }
                    let database = URL(fileURLWithPath: path).resolvingSymlinksInPath()
                    protected.append(database); destinations.append(database)
                }
            } else if config["gbrainProfile"] as? String == profile.path && config["gbrainAccess"] as? Bool != false {
                throw failure("Não foi possível conferir a origem do perfil GBrain ativo. O backup do vault não foi iniciado.")
            }
        }
        if let workspace = config["gbrainWorkspace"] as? String { destinations.append(URL(fileURLWithPath: workspace)) }
        return (protected, destinations)
    }
    func vaultBackupStatus() -> [String: Any] {
        refreshConfig()
        let consent = (try? vaultBackupJSON("consent.json", limit: 64_000)) ?? [:]
        let selected=(config["vault"] as? String).map { URL(fileURLWithPath: $0).standardizedFileURL.path }
        let matches = selected != nil && consent["vault"] as? String == selected
        return ["enabled": consent["enabled"] as? Bool == true && matches, "targetMatches": matches,
                "scope": "vault_files_and_attachments", "databaseIncluded": false, "network": false,
                "destination": consent["destination"] ?? NSNull(), "exclusions": consent["exclusions"] ?? [],
                "lastRun": (try? vaultBackupJSON("last-run.json")) ?? [:],
                "lastAttempt": (try? vaultBackupJSON("last-attempt.json")) ?? [:],
                "lastRestore": (try? vaultBackupJSON("last-restore.json")) ?? [:],
                "limits": ["entries": 100_000, "bytes": 20 * 1024 * 1024 * 1024, "fileBytes": 2 * 1024 * 1024 * 1024, "seconds": 600],
                "message": "Backup local separado do banco PGLite. Inclui notas, anexos, pastas vazias e .obsidian quando todos os arquivos estiverem disponíveis; exclusões reduzem a cobertura declarada."]
    }
    @discardableResult
    func configureVaultBackupConsent(enabled: Bool, destination: URL? = nil, exclusions: [String] = []) throws -> [String: Any] {
        let lock = try acquireOperationLock("vault-backup-consent"); defer { releaseOperationLock(lock) }
        refreshConfig(); try requireCapability(.configure)
        let exclusions = try OracleVaultBackupEngine.validateExclusions(exclusions)
        var record: [String: Any] = ["schemaVersion": 1, "enabled": enabled, "scope": "vault_files_and_attachments",
            "network": false, "revision": UUID().uuidString.lowercased(), "vault": config["vault"] as? String ?? "",
            "exclusions": exclusions, "at": ISO8601DateFormatter().string(from: Date())]
        if enabled {
            let source = try vault().standardizedFileURL
            guard let destination else { throw failure("Escolha explicitamente uma pasta externa para autorizar o backup do vault.") }
            let roots = try vaultBackupProtectionRoots()
            try OracleVaultBackupEngine.validateDestination(destination, outside: [source] + roots.destinations)
            record["vault"] = source.path; record["destination"] = destination.standardizedFileURL.path
        }
        try writeJSON(record, vaultBackupState("consent.json")); return vaultBackupStatus()
    }
    @discardableResult
    func createVaultBackup() throws -> [String: Any] {
        let lock = try acquireOperationLock("vault-backup"); defer { releaseOperationLock(lock) }
        refreshConfig(); try requireCapability(.configure)
        let source = try vault().standardizedFileURL, consent = try vaultBackupJSON("consent.json", limit: 64_000)
        guard consent["enabled"] as? Bool == true, consent["vault"] as? String == source.path,
              let revision = consent["revision"] as? String, let destination = consent["destination"] as? String,
              let exclusions = consent["exclusions"] as? [String] else { throw failure("Autorize separadamente o backup deste vault e escolha seu destino antes de copiar arquivos.") }
        let roots = try vaultBackupProtectionRoots()
        var hooks = OracleVaultBackupHooks()
        hooks.beforeBackupPublish = {
            self.refreshConfig()
            let current = try self.vaultBackupJSON("consent.json", limit: 64_000)
            guard current["enabled"] as? Bool == true, current["revision"] as? String == revision,
                  self.config["vault"] as? String == source.path else { throw failure("O consentimento ou vault mudou durante o backup; nenhuma conclusão foi registrada.") }
        }
        do {
            let receipt = try OracleVaultBackupEngine.create(vault: source, destination: URL(fileURLWithPath: destination), exclusions: exclusions,
                protectedRoots: roots.protected, destinationForbiddenRoots: roots.destinations, hooks: hooks)
            let data = try JSONEncoder().encode(receipt), file = try vaultBackupState("snapshots/" + receipt.id + ".json")
            try fm.createDirectory(at: file.deletingLastPathComponent(), withIntermediateDirectories: true, attributes: [.posixPermissions: 0o700])
            try atomicWriteData(data, to: file, permissions: 0o600)
            try writeJSON(receipt.projection, vaultBackupState("last-run.json"))
            try writeJSON(["status": "snapshot_verified", "complete": true, "id": receipt.id], vaultBackupState("last-attempt.json"))
            return receipt.projection
        } catch {
            try? writeJSON(["status": "failed", "complete": false, "message": error.localizedDescription, "at": ISO8601DateFormatter().string(from: Date())], vaultBackupState("last-attempt.json"))
            throw error
        }
    }
    @discardableResult
    func restoreVaultBackup(id: String, destination: URL, confirmed: Bool) throws -> [String: Any] {
        let lock = try acquireOperationLock("vault-backup"); defer { releaseOperationLock(lock) }
        refreshConfig(); try requireCapability(.configure)
        guard confirmed, UUID(uuidString: id)?.uuidString.lowercased() == id else { throw failure("Escolha um backup registrado e confirme o restauro em uma nova pasta vazia.") }
        let record = try vaultBackupJSON("snapshots/" + id + ".json")
        let receipt = try JSONDecoder().decode(OracleVaultBackupReceipt.self, from: JSONSerialization.data(withJSONObject: record))
        guard receipt.id == id else { throw failure("O recibo não pertence ao backup escolhido.") }
        let roots = try vaultBackupProtectionRoots(), current = (config["vault"] as? String).map { [URL(fileURLWithPath: $0)] } ?? []
        let result = try OracleVaultBackupEngine.restore(receipt, destination: destination, confirmed: true, forbiddenRoots: roots.destinations + current)
        try writeJSON(result, vaultBackupState("last-restore.json")); return result
    }
}
