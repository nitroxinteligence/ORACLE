import Foundation
import Darwin

/// The conversation approves content. Oracle verifies the declared coverage and
/// original files independently, without treating a model's claim as user input.
enum OracleKnowledgeInterview {
    static let version = 1
    static func validTopic(_ topic:String) -> Bool { ["personal", "professional"].contains(topic) }
    static func validArea(_ area:String, topic:String) -> Bool {
        (topic == "personal" ? ["AREAS/pessoal", "Pessoal"] : ["AREAS/profissional", "Profissional"]).contains(area)
    }
    static func validID(_ value:String) -> Bool { UUID(uuidString:value) != nil }
    static func validHash(_ value:String) -> Bool { value.range(of:"^[a-f0-9]{64}$", options:.regularExpression) != nil }
    static func managedConfigurationHashes(_ receipt:[String:Any]) -> Set<String> {
        var hashes = Set([receipt["mcp_sha256"], receipt["interview_config_sha256"]].compactMap { $0 as? String }.filter(validHash))
        // A pending target is owned only when its previous version is already
        // known and its journal names the exact managed configuration location.
        if let previous = receipt["pending_interview_previous_sha256"] as? String, hashes.contains(previous),
           let pending = receipt["pending_interview_config_sha256"] as? String, validHash(pending),
           let workspace = receipt["workspace"] as? String,
           receipt["pending_interview_config_path"] as? String == URL(fileURLWithPath:workspace).appendingPathComponent(".codex/config.toml").path,
           let vault = receipt["pending_interview_writable_vault"] as? String, vault.hasPrefix("/") {
            hashes.insert(pending)
        }
        return hashes
    }
    /// Coverage, generation and digest all refer to the same bounded byte snapshot.
    /// The optional callback is an in-process test seam, never a serialized option.
    static func indexEvidence(manifestURL:URL, checkpointURL:URL, vault:String,
                              declared:[String:String], beforeRevalidation:(() throws -> Void)? = nil) throws -> [String:Any]? {
        func checkpointAbsent() -> Bool {
            var marker = stat()
            return lstat(checkpointURL.path, &marker) != 0 && errno == ENOENT
        }
        guard checkpointAbsent() else { return nil }
        let bytes = try data(manifestURL, limit:32_000_000)
        guard let manifest = try JSONSerialization.jsonObject(with:bytes) as? [String:Any],
              manifest["root"] as? String == vault, manifest["complete"] as? Bool == true,
              let rows = manifest["records"] as? [[String:Any]], rows.count <= 100_000 else { return nil }
        var indexed = [String:String]()
        for row in rows {
            if let path = row["path"] as? String, let hash = row["sha256"] as? String {
                guard indexed[path] == nil else { return nil }
                indexed[path] = hash
            }
        }
        guard declared.allSatisfy({ indexed[$0.key] == $0.value }) else { return nil }
        let hash = digest(bytes)
        try beforeRevalidation?()
        guard checkpointAbsent(), digest(try data(manifestURL, limit:32_000_000)) == hash,
              checkpointAbsent() else { return nil }
        return ["index_generation":manifest["generation"] ?? NSNull(), "index_manifest_sha256":hash]
    }
    static func receiptPath(_ run:String) -> String { "SISTEMA/oracle/interviews/" + run + ".json" }
    static func data(_ url:URL, limit:Int) throws -> Data {
        let values = try url.resourceValues(forKeys:[.isRegularFileKey, .isSymbolicLinkKey, .fileSizeKey])
        guard values.isRegularFile == true, values.isSymbolicLink != true,
              let size = values.fileSize, size <= limit else { throw failure("O comprovante ou a nota excede o limite de leitura.") }
        let value = try Data(contentsOf:url)
        guard value.count <= limit else { throw failure("O arquivo mudou durante a conferência.") }
        return value
    }
}

extension Core {
    private func knowledgeRunURL(_ run:String) throws -> URL {
        guard OracleKnowledgeInterview.validID(run) else { throw failure("Identificador de entrevista inválido.") }
        return try scoped("knowledge-interviews/runs/" + run + ".json", root:home)
    }

    func prepareKnowledgeInterview(_ params:[String:Any]) throws -> [String:Any] {
        let setup = try acquireOperationLock("setup"); defer { releaseOperationLock(setup) }
        refreshConfig()
        guard let selected = params["vault"] as? String, selected == config["vault"] as? String,
              let topic = params["topic"] as? String, OracleKnowledgeInterview.validTopic(topic),
              let area = params["area"] as? String, OracleKnowledgeInterview.validArea(area, topic:topic) else {
            throw failure("A pasta ou a área mudou. Reabra Knowledge Base para preparar o roteiro.")
        }
        let root = try vault().resolvingSymlinksInPath()
        _ = try scoped(area, root:root)
        let run = UUID().uuidString.lowercased()
        let context:[String:Any] = ["schema_version":OracleKnowledgeInterview.version, "run_id":run,
                                  "vault":root.path, "topic":topic, "area":area,
                                  "receipt_path":OracleKnowledgeInterview.receiptPath(run),
                                  "started_at":ISO8601DateFormatter().string(from:Date()),
                                  "approval":"not_observed", "status":"prepared"]
        // Copying a prompt creates only a private local run. Preparing the Codex
        // write scope is a separate, explicit Open Codex action.
        if params["prepareWriteScope"] as? Bool == true { try prepareKnowledgeWriteScope(root:root) }
        try writeJSON(context, knowledgeRunURL(run))
        try writeJSON(["run_id":run, "vault":root.path, "topic":topic],
                      try scoped("knowledge-interviews/latest-" + topic + ".json", root:home))
        return context
    }

    private func prepareKnowledgeWriteScope(root:URL) throws {
        let receiptURL = home.appendingPathComponent("setup/bridge.json")
        let receiptBytes = try OracleKnowledgeInterview.data(receiptURL, limit:524_288)
        guard var receipt = try JSONSerialization.jsonObject(with:receiptBytes) as? [String:Any] else { throw failure("O comprovante da conexão Oracle está inválido.") }
        guard let path = receipt["workspace"] as? String else { throw failure("Prepare a conexão Oracle antes de abrir a entrevista no Codex.") }
        let workspace = URL(fileURLWithPath:path).standardizedFileURL
        guard workspace.path.hasPrefix(home.standardizedFileURL.path + "/"),
              workspace.resolvingSymlinksInPath().path == workspace.path else { throw failure("O espaço Oracle não pertence a este perfil.") }
        let target = try scoped(".codex/config.toml", root:workspace)
        let bytes = try OracleKnowledgeInterview.data(target, limit:262_144), hash = digest(bytes)
        guard OracleKnowledgeInterview.managedConfigurationHashes(receipt).contains(hash),
              let original = String(data:bytes, encoding:.utf8) else { throw failure("A configuração do Codex foi editada. Suas alterações foram preservadas; reconcilie o arquivo antes de abrir a entrevista.") }
        let begin = "# BEGIN ORACLE INTERVIEW WRITE SCOPE\n", end = "# END ORACLE INTERVIEW WRITE SCOPE\n"
        var base = original
        if base.hasPrefix(begin), let range = base.range(of:end) { base = String(base[range.upperBound...]) }
        guard !base.contains(begin), !base.contains("[sandbox_workspace_write]"),
              base.hasPrefix("# Oracle-owned project configuration.") else { throw failure("O acesso de escrita já possui uma configuração própria. Preserve-a e confira as permissões no Codex.") }
        let literal = String(decoding:try JSONSerialization.data(withJSONObject:[root.path], options:[.withoutEscapingSlashes]), as:UTF8.self)
        // No global config, approval policy, trust or sandbox mode is changed.
        // Codex applies this project layer only after the user's project trust.
        let scope = begin + "# Review the selected Obsidian vault in Codex before approving writes.\n[sandbox_workspace_write]\nwritable_roots = " + literal + "\n" + end
        let prepared = Data((scope + base).utf8)
        let preparedHash = digest(prepared)
        let pendingKeys = ["pending_interview_previous_sha256", "pending_interview_config_sha256", "pending_interview_config_path", "pending_interview_writable_vault"]
        // Recover an interrupted managed write before preparing a new target.
        if hash == receipt["pending_interview_config_sha256"] as? String {
            receipt["interview_config_sha256"] = hash
            receipt["interview_writable_vault"] = receipt["pending_interview_writable_vault"]
        }
        for key in pendingKeys { receipt.removeValue(forKey:key) }
        try coordinatedWrite(at:target) { destination in
            guard destination.path == target.path,
                  digest(try OracleKnowledgeInterview.data(destination, limit:262_144)) == hash,
                  digest(try OracleKnowledgeInterview.data(receiptURL, limit:524_288)) == digest(receiptBytes) else {
                throw failure("A configuração da conexão mudou durante a preparação. Suas alterações foram preservadas.")
            }
            if hash != preparedHash {
                receipt["pending_interview_previous_sha256"] = hash
                receipt["pending_interview_config_sha256"] = preparedHash
                receipt["pending_interview_config_path"] = target.path
                receipt["pending_interview_writable_vault"] = root.path
                // The ledger is durable before the file. Both sides of a crash
                // remain recognized without adopting unrelated configuration.
                try writeJSON(receipt, receiptURL)
                try atomicWriteData(prepared, to:destination, permissions:0o600)
            }
            guard digest(try OracleKnowledgeInterview.data(destination, limit:262_144)) == preparedHash else {
                throw failure("A configuração foi alterada durante a gravação. Confira as permissões no Codex.")
            }
            for key in pendingKeys { receipt.removeValue(forKey:key) }
            receipt["interview_config_sha256"] = preparedHash
            receipt["interview_writable_vault"] = root.path
            receipt["interview_permission_status"] = "prepared_requires_codex_project_trust"
            try writeJSON(receipt, receiptURL)
        }
    }

    func latestKnowledgeInterview(topic:String) throws -> [String:Any] {
        guard OracleKnowledgeInterview.validTopic(topic) else { throw failure("Área da entrevista inválida.") }
        refreshConfig()
        let selected = try vault().resolvingSymlinksInPath().path
        let latest = try? readJSON(try scoped("knowledge-interviews/latest-" + topic + ".json", root:home))
        guard latest?["vault"] as? String == selected, let run = latest?["run_id"] as? String else {
            return ["status":"not_started", "topic":topic, "message":"Nenhum comprovante de entrevista foi preparado para esta área."]
        }
        return try verifyKnowledgeInterview(run:run)
    }

    func verifyKnowledgeInterview(run:String) throws -> [String:Any] {
        refreshConfig()
        let root = try vault().resolvingSymlinksInPath(), context = try readJSON(knowledgeRunURL(run))
        guard context["vault"] as? String == root.path, let topic = context["topic"] as? String, OracleKnowledgeInterview.validTopic(topic),
              let area = context["area"] as? String, OracleKnowledgeInterview.validArea(area, topic:topic) else {
            throw failure("Este comprovante pertence a outro vault ou área.")
        }
        let relative = OracleKnowledgeInterview.receiptPath(run), receiptURL = try scoped(relative, root:root)
        var result:[String:Any] = ["run_id":run, "topic":topic, "receipt_path":relative,
                                  "approval":"not_observed", "files":"not_verified", "index":"not_verified",
                                  "retrieval":"not_verified", "status":"awaiting_receipt"]
        guard fm.fileExists(atPath:receiptURL.path) else {
            result["message"] = "A entrevista ainda não entregou um comprovante. Continue no Codex e volte para conferir."
            return result
        }
        let receiptBytes = try OracleKnowledgeInterview.data(receiptURL, limit:524_288)
        guard let receipt = try JSONSerialization.jsonObject(with:receiptBytes) as? [String:Any],
              receipt["schema_version"] as? Int == OracleKnowledgeInterview.version,
              receipt["run_id"] as? String == run, receipt["vault"] as? String == root.path,
              receipt["topic"] as? String == topic, receipt["area"] as? String == area,
              let approval = receipt["approval"] as? [String:Any],
              approval["status"] as? String == "confirmed_in_codex",
              let confirmation = approval["statement"] as? String, !confirmation.trimmingCharacters(in:.whitespacesAndNewlines).isEmpty,
              confirmation.utf8.count <= 4_096, let approvedFacts = approval["facts"] as? [[String:Any]], !approvedFacts.isEmpty, approvedFacts.count <= 500,
              let pending = receipt["pending"] as? [String], pending.count <= 500,
              let facts = receipt["facts"] as? [[String:Any]], !facts.isEmpty, facts.count <= 500,
              let files = receipt["files"] as? [[String:Any]], !files.isEmpty, files.count <= 128 else {
            throw failure("Comprovante incompleto: falta vínculo, aprovação declarada, fatos, arquivos ou pendências.")
        }
        var declared = [String:String](), texts = [String:String](), totalBytes = 0
        for file in files {
            guard let path = file["path"] as? String, path.hasPrefix(area + "/"), path.hasSuffix(".md"),
                  declared[path] == nil, let hash = file["sha256"] as? String, OracleKnowledgeInterview.validHash(hash),
                  let size = file["bytes"] as? Int, size >= 0, size <= 2_000_000 else { throw failure("O comprovante contém uma nota duplicada, inválida ou fora da área aprovada.") }
            let url = try scoped(path, root:root), bytes = try OracleKnowledgeInterview.data(url, limit:2_000_000)
            guard bytes.count == size, digest(bytes) == hash, let text = String(data:bytes, encoding:.utf8) else {
                throw failure("A nota mudou ou não corresponde ao comprovante: " + path)
            }
            totalBytes += bytes.count
            guard totalBytes <= 16_000_000 else { throw failure("A entrevista excede o limite de conferência. Divida o registro em entregas menores.") }
            declared[path] = hash; texts[path] = text
        }
        var approved = [String:String]()
        for fact in approvedFacts {
            guard let id = fact["id"] as? String, !id.isEmpty, id.utf8.count <= 100, approved[id] == nil,
                  let text = fact["text"] as? String, !text.trimmingCharacters(in:.whitespacesAndNewlines).isEmpty, text.utf8.count <= 8_192 else {
                throw failure("A lista revisada de fatos possui identificador ou conteúdo inválido.")
            }
            approved[id] = text
        }
        var factIDs = Set<String>()
        for fact in facts {
            guard let id = fact["id"] as? String, !id.isEmpty, id.utf8.count <= 100, factIDs.insert(id).inserted,
                  let text = fact["text"] as? String, approved[id] == text,
                  let paths = fact["paths"] as? [String], !paths.isEmpty, paths.count <= 16,
                  Set(paths).count == paths.count, paths.allSatisfy({ texts[$0]?.contains(text) == true }) else {
                throw failure("Um fato declarado como aprovado não foi encontrado integralmente nas notas vinculadas.")
            }
        }
        guard factIDs == Set(approved.keys) else { throw failure("Há fatos da lista revisada sem cobertura nas notas. A entrega ainda está incompleta.") }
        // Re-read every file after validating facts, so a concurrent edit cannot
        // silently become a verified handoff. Later edits require another check.
        for (path, hash) in declared {
            guard digest(try OracleKnowledgeInterview.data(try scoped(path, root:root), limit:2_000_000)) == hash else {
                throw failure("A nota foi alterada durante a conferência: " + path)
            }
        }
        guard digest(try OracleKnowledgeInterview.data(receiptURL, limit:524_288)) == digest(receiptBytes) else {
            throw failure("O comprovante mudou durante a conferência. Tente novamente.")
        }
        result["approval"] = "reported_by_codex"
        result["files"] = "verified"; result["facts_covered"] = facts.count; result["files_verified"] = files.count
        result["pending_count"] = pending.count; result["pending"] = pending
        result["receipt_sha256"] = digest(receiptBytes)
        let profile = home.appendingPathComponent("gbrain/profile")
        let manifestURL = profile.appendingPathComponent("oracle-vault-manifest.json")
        result["index"] = "pending"
        if config["gbrainWorkspace"] == nil,
           let evidence = try? OracleKnowledgeInterview.indexEvidence(manifestURL:manifestURL,
               checkpointURL:profile.appendingPathComponent("oracle-vault-checkpoint.json"), vault:root.path, declared:declared) {
            result["index"] = "verified"
            for (key, value) in evidence { result[key] = value }
        }
        result["status"] = pending.isEmpty ? "files_verified" : "files_verified_with_pending"
        result["message"] = "\(facts.count) fatos declarados no comprovante foram encontrados em \(files.count) notas originais. "
            + (result["index"] as? String == "verified" ? "Essas versões estão no índice local." : "O índice local ainda precisa concluir a atualização dessas notas.")
        result["checked_at"] = ISO8601DateFormatter().string(from:Date())
        return result
    }
}
