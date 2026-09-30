import Foundation

extension Core {
    private func aiMemoryExportState() throws -> URL { try scoped("ai-memory-vault-export", root: home) }
    private func aiMemoryExportConsent() throws -> AIMemoryExportConsent {
        let file = try scoped("ai-memory-vault-export/consent.json", root: home)
        let values = try file.resourceValues(forKeys: [.fileSizeKey, .isRegularFileKey])
        guard values.isRegularFile == true, let size = values.fileSize, size <= 64_000 else { throw failure("Consentimento de exportação indisponível.") }
        return try JSONDecoder().decode(AIMemoryExportConsent.self, from: Data(contentsOf: file))
    }
    private func admittedAIMemoryExport() throws -> (AIMemoryExportConsent, URL, URL) {
        refreshConfig()
        var consent = try aiMemoryExportConsent()
        let target = try vault().standardizedFileURL
        if consent.enabled && consent.vault != target.path {
            consent.enabled = false
            try atomicWriteData(JSONEncoder().encode(consent), to: try scoped("ai-memory-vault-export/consent.json", root: home), permissions: 0o600)
        }
        guard consent.enabled, consent.vault == target.path, let source = consent.source else { throw failure("Autorize a exportação manual para o vault atual.") }
        let sourceURL = URL(fileURLWithPath: source)
        _ = try OracleAIMemoryVaultExportEngine.validateSource(sourceURL, vault: target)
        return (consent, sourceURL, target)
    }
    private func aiMemoryExportRunRecord(_ name: String, vaultPath: String) throws -> [String: Any] {
        let file = try scoped("ai-memory-vault-export/runs/" + OracleAIMemoryVaultExportEngine.hash(Data(vaultPath.utf8)) + "/" + name, root: home)
        let values = try file.resourceValues(forKeys: [.fileSizeKey, .isRegularFileKey])
        guard values.isRegularFile == true, let bytes = values.fileSize, bytes <= 2_000_000 else { throw failure("Recibo de exportação fora do limite.") }
        return try readJSON(file)
    }
    func aiMemoryVaultExportStatus() -> [String: Any] {
        refreshConfig()
        let consent = try? aiMemoryExportConsent(), matches = consent != nil && consent?.vault == (config["vault"] as? String).map { URL(fileURLWithPath: $0).standardizedFileURL.path }
        var recovery: [String: Any] = [:]
        if matches, let consent, consent.enabled, let sourcePath = consent.source {
            let target = URL(fileURLWithPath: consent.vault)
            do { recovery = try OracleAIMemoryVaultExportEngine.recoveryPreview(source: URL(fileURLWithPath: sourcePath), vault: target,
                state: aiMemoryExportRunState(target), consent: consent) }
            catch { recovery = ["recoveryRequired": false, "previewID": NSNull(), "conflicts": [], "message": error.localizedDescription] }
        }
        return ["enabled": consent?.enabled == true && matches, "targetMatches": matches, "source": (consent?.source).map { $0 as Any } ?? NSNull(),
                "recoveryRequired": recovery["recoveryRequired"] as? Bool ?? false,
                "recoveryPreviewID": recovery["previewID"] ?? NSNull(), "recoveryConflicts": recovery["conflicts"] ?? [],
                "recoveryMessage": recovery["message"] ?? "Nenhuma recuperação disponível.",
                "includeSessions": consent?.includeSessions ?? false, "manual": true, "automatic": false,
                "indexed": false, "retrieved": false, "semanticApproval": false,
                "lastAttempt": (try? aiMemoryExportRunRecord("last-attempt.json", vaultPath: consent?.vault ?? "")) ?? [:],
                "lastRun": (try? aiMemoryExportRunRecord("last-run.json", vaultPath: consent?.vault ?? "")) ?? [:],
                "limits": ["fileBytes": 2_000_000, "batchBytes": 16_000_000, "batch": 100, "page": 256, "entries": 5_000, "scanBytes": 64_000_000, "scanSeconds": 15]]
    }
    @discardableResult
    func configureAIMemoryVaultExport(enabled: Bool, source: URL? = nil, includeSessions: Bool = false) throws -> [String: Any] {
        let lock = try acquireOperationLock("ai-memory-vault-export"); defer { releaseOperationLock(lock) }
        refreshConfig(); try requireCapability(.configure)
        var target = (config["vault"] as? String) ?? ""
        if enabled {
            let selected = try vault().standardizedFileURL
            guard let source else { throw failure("Escolha o projeto wiki AI Memory explicitamente.") }
            _ = try OracleAIMemoryVaultExportEngine.validateSource(source.standardizedFileURL, vault: selected)
            target = selected.path
        }
        let consent = AIMemoryExportConsent(enabled: enabled, source: source?.standardizedFileURL.path, vault: target, includeSessions: includeSessions, revision: UUID().uuidString.lowercased())
        let state = try aiMemoryExportState(); try fm.createDirectory(at: state, withIntermediateDirectories: true, attributes: [.posixPermissions: 0o700])
        try atomicWriteData(JSONEncoder().encode(consent), to: try scoped("consent.json", root: state), permissions: 0o600)
        return aiMemoryVaultExportStatus()
    }
    func aiMemoryVaultExportCandidates(offset: Int = 0) throws -> [String: Any] {
        let lock = try acquireOperationLock("ai-memory-vault-export"); defer { releaseOperationLock(lock) }
        let (consent, source, target) = try admittedAIMemoryExport()
        return try OracleAIMemoryVaultExportEngine.candidates(source: source, vault: target, includeSessions: consent.includeSessions, offset: offset, revision: consent.revision)
    }
    func aiMemoryVaultExportPreview(id: String, snapshot: String) throws -> [String: Any] {
        let lock = try acquireOperationLock("ai-memory-vault-export"); defer { releaseOperationLock(lock) }
        let (consent, source, target) = try admittedAIMemoryExport()
        return try OracleAIMemoryVaultExportEngine.preview(source: source, vault: target, includeSessions: consent.includeSessions,
            revision: consent.revision, id: id, snapshot: snapshot)
    }
    private func aiMemoryExportRunState(_ target: URL) throws -> URL {
        try scoped("runs/" + OracleAIMemoryVaultExportEngine.hash(Data(target.path.utf8)), root: aiMemoryExportState())
    }
    func aiMemoryVaultExportRecoveryPreview() throws -> [String: Any] {
        let lock = try acquireOperationLock("ai-memory-vault-export"); defer { releaseOperationLock(lock) }
        let (consent, source, target) = try admittedAIMemoryExport()
        return try OracleAIMemoryVaultExportEngine.recoveryPreview(source: source, vault: target, state: aiMemoryExportRunState(target), consent: consent)
    }
    @discardableResult
    func resolveAIMemoryVaultExportRecovery(confirmed: Bool, previewID: String) throws -> [String: Any] {
        let lock = try acquireOperationLock("ai-memory-vault-export"); defer { releaseOperationLock(lock) }
        refreshConfig(); try requireCapability(.configure)
        let lockedVault = try vault().standardizedFileURL
        return try withVaultWrite {
            let (consent, source, target) = try self.admittedAIMemoryExport()
            guard target == lockedVault else { throw failure("O vault mudou antes do bloqueio de recuperação.") }
            var hooks = AIMemoryExportHooks()
            hooks.validateConsent = {
                let (current, currentSource, currentTarget) = try self.admittedAIMemoryExport()
                guard current.revision == consent.revision, currentSource == source, currentTarget == target else { throw failure("Consentimento, origem ou vault mudou após o preview de recuperação.") }
            }
            return try OracleAIMemoryVaultExportEngine.resolveRecovery(source: source, vault: target, state: self.aiMemoryExportRunState(target),
                consent: consent, confirmed: confirmed, previewID: previewID, hooks: hooks)
        }
    }
    @discardableResult
    func exportAIMemoryPages(ids: [String], confirmed: Bool, snapshot: String? = nil) throws -> [String: Any] {
        let lock = try acquireOperationLock("ai-memory-vault-export"); defer { releaseOperationLock(lock) }
        refreshConfig(); try requireCapability(.configure)
        let lockedVault = try vault().standardizedFileURL
        return try withVaultWrite {
            let (consent, source, target) = try self.admittedAIMemoryExport()
            guard target == lockedVault else { throw failure("O vault mudou antes do bloqueio; reveja o consentimento.") }
            var hooks = AIMemoryExportHooks()
            hooks.validateConsent = {
                let (current, currentSource, currentTarget) = try self.admittedAIMemoryExport()
                guard current.revision == consent.revision, currentSource == source, currentTarget == target else { throw failure("Consentimento, fonte ou vault mudou durante a exportação.") }
            }
            let state = try self.scoped("runs/" + OracleAIMemoryVaultExportEngine.hash(Data(target.path.utf8)), root: self.aiMemoryExportState())
            let result = try OracleAIMemoryVaultExportEngine.export(source: source, vault: target, state: state, consent: consent, ids: ids, confirmed: confirmed, snapshot: snapshot, hooks: hooks)
            self.notifyVaultChanged(reason: "manual-ai-memory-export")
            return result
        }
    }
}
