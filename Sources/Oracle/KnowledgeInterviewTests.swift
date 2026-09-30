import Foundation

func runKnowledgeInterviewTests() throws {
    let root = try oracleTestDirectory("knowledge-interview-tests")
    defer { try? fm.removeItem(at:root) }
    let core = try Core(home:root.appendingPathComponent("state")), vault = root.appendingPathComponent("Vault de Ana & João")
    try fm.createDirectory(at:vault, withIntermediateDirectories:true)
    core.config["vault"] = vault.path; try core.persist()
    var count = 0
    func check(_ value:Bool, _ name:String) throws {
        guard value else { throw failure("Knowledge interview test failed: " + name) }
        count += 1; print("PASS " + name)
    }
    func rejects(_ name:String, _ body:() throws -> Void) throws {
        var rejected = false; do { try body() } catch { rejected = true }
        try check(rejected, name)
    }
    func note(_ relative:String, _ text:String) throws -> [String:Any] {
        let url = try core.scoped(relative, root:vault), bytes = Data(text.utf8)
        try fm.createDirectory(at:url.deletingLastPathComponent(), withIntermediateDirectories:true)
        try atomicWriteData(bytes, to:url)
        return ["path":relative, "bytes":bytes.count, "sha256":digest(bytes)]
    }
    for (topic, area, fact) in [("personal", "AREAS/pessoal", "Quero caminhar três vezes por semana."),
                                ("professional", "Profissional", "Meu projeto sintético se chama Aurora.")] {
        let run = try core.prepareKnowledgeInterview(["vault":vault.path, "topic":topic, "area":area]), id = run["run_id"] as! String
        try check(try core.latestKnowledgeInterview(topic:topic)["status"] as? String == "awaiting_receipt", "\(topic): invitation is not interview completion")
        try check(!fm.fileExists(atPath:vault.appendingPathComponent(OracleKnowledgeInterview.receiptPath(id)).path), "\(topic): preparation creates no vault content")
        let file = try note(area + "/Perfil.md", "# Perfil\n\n" + fact + "\n")
        var receipt:[String:Any] = ["schema_version":1, "run_id":id, "vault":vault.path, "topic":topic, "area":area,
                                  "approval":["status":"confirmed_in_codex", "statement":"Aprovo os fatos e os caminhos sintéticos.", "facts":[["id":"fact-1", "text":fact]]],
                                  "facts":[["id":"fact-1", "text":fact, "paths":[file["path"]!]]], "files":[file], "pending":[String]()]
        let target = try core.scoped(OracleKnowledgeInterview.receiptPath(id), root:vault)
        try writeJSON(receipt, target)
        let verified = try core.verifyKnowledgeInterview(run:id)
        try check(verified["files"] as? String == "verified" && verified["facts_covered"] as? Int == 1, "\(topic): approved fact coverage and original hash verified")
        try check(verified["approval"] as? String == "reported_by_codex" && verified["retrieval"] as? String == "not_verified", "\(topic): declaration does not fabricate human authentication or retrieval")
        try check(verified["index"] as? String == "pending", "\(topic): files do not imply indexed versions")
        let profile = core.home.appendingPathComponent("gbrain/profile")
        try writeJSON(["root":vault.path, "complete":true, "generation":2, "records":[["path":file["path"]!, "sha256":file["sha256"]!]]], profile.appendingPathComponent("oracle-vault-manifest.json"))
        try check(try core.verifyKnowledgeInterview(run:id)["index"] as? String == "verified", "\(topic): complete index binds same canonical hashes")
        let indexURL = profile.appendingPathComponent("oracle-vault-manifest.json")
        let checkpointURL = profile.appendingPathComponent("oracle-vault-checkpoint.json")
        let indexBytes = try Data(contentsOf:indexURL), declaredIndex = [file["path"] as! String:file["sha256"] as! String]
        let evidence = try OracleKnowledgeInterview.indexEvidence(manifestURL:indexURL, checkpointURL:checkpointURL,
            vault:vault.path, declared:declaredIndex)
        try check(evidence?["index_generation"] as? Int == 2 && evidence?["index_manifest_sha256"] as? String == digest(indexBytes),
                  "\(topic): generation and digest bind the same manifest bytes")
        let changedEvidence = try OracleKnowledgeInterview.indexEvidence(manifestURL:indexURL, checkpointURL:checkpointURL,
            vault:vault.path, declared:declaredIndex, beforeRevalidation:{
                try writeJSON(["root":vault.path, "complete":true, "generation":3,
                               "records":[["path":file["path"]!, "sha256":file["sha256"]!]]], indexURL)
            })
        try check(changedEvidence == nil, "\(topic): generation changed between reads refuses index evidence")
        try atomicWriteData(indexBytes, to:indexURL)
        let interruptedEvidence = try OracleKnowledgeInterview.indexEvidence(manifestURL:indexURL, checkpointURL:checkpointURL,
            vault:vault.path, declared:declaredIndex, beforeRevalidation:{try writeJSON(["complete":false], checkpointURL)})
        try check(interruptedEvidence == nil, "\(topic): checkpoint appearing during verification refuses index evidence")
        try fm.removeItem(at:checkpointURL)
        try writeJSON(["complete":false], profile.appendingPathComponent("oracle-vault-checkpoint.json"))
        try check(try core.verifyKnowledgeInterview(run:id)["index"] as? String == "pending", "\(topic): pending checkpoint refuses index completion")
        try fm.removeItem(at:profile.appendingPathComponent("oracle-vault-checkpoint.json"))
        receipt["facts"] = [["id":"fact-1", "text":"Um fato que não existe na nota.", "paths":[file["path"]!]]]
        try writeJSON(receipt, target)
        try rejects("\(topic): omitted fact is not complete") { _ = try core.verifyKnowledgeInterview(run:id) }
        receipt["facts"] = [["id":"fact-1", "text":fact, "paths":[file["path"]!]]]
        receipt["approval"] = ["status":"confirmed_in_codex", "statement":"Aprovo", "facts":[["id":"fact-1", "text":fact], ["id":"fact-2", "text":"Segundo fato aprovado, ainda ausente."]]]
        try writeJSON(receipt, target)
        try rejects("\(topic): approved fact omitted from coverage is rejected") { _ = try core.verifyKnowledgeInterview(run:id) }
        receipt["approval"] = ["status":"not_confirmed", "statement":"Aguardando resposta"]
        try writeJSON(receipt, target)
        try rejects("\(topic): missing real confirmation declaration") { _ = try core.verifyKnowledgeInterview(run:id) }
        receipt["approval"] = ["status":"confirmed_in_codex", "statement":"Aprovo", "facts":[["id":"fact-1", "text":fact]]]
        receipt["pending"] = ["Uma pergunta foi pulada."]
        try writeJSON(receipt, target)
        try check(try core.verifyKnowledgeInterview(run:id)["status"] as? String == "files_verified_with_pending", "\(topic): pending answers remain visible")
        _ = try note(area + "/Perfil.md", "# Perfil\n\nAlteração externa.\n")
        try rejects("\(topic): concurrent edit invalidates original receipt") { _ = try core.verifyKnowledgeInterview(run:id) }
    }
    try rejects("stale selected vault") { _ = try core.prepareKnowledgeInterview(["vault":vault.path + "-other", "topic":"personal", "area":"AREAS/pessoal"]) }
    try rejects("invalid topic") { _ = try core.prepareKnowledgeInterview(["vault":vault.path, "topic":"unknown", "area":"AREAS/pessoal"]) }
    try rejects("area traversal") { _ = try core.prepareKnowledgeInterview(["vault":vault.path, "topic":"personal", "area":"AREAS/pessoal/../../outside"]) }
    try rejects("invalid run id") { _ = try core.verifyKnowledgeInterview(run:"../../outside") }
    let workspace = core.home.appendingPathComponent("oracle-workspace"), configURL = workspace.appendingPathComponent(".codex/config.toml")
    let config = Data("# Oracle-owned project configuration. Review in Codex; no global settings changed.\n[mcp_servers.oracle_companion]\ncommand = \"fixture\"\n".utf8)
    try fm.createDirectory(at:configURL.deletingLastPathComponent(), withIntermediateDirectories:true)
    try atomicWriteData(config, to:configURL)
    try writeJSON(["workspace":workspace.path, "mcp_sha256":digest(config)], core.home.appendingPathComponent("setup/bridge.json"))
    _ = try core.prepareKnowledgeInterview(["vault":vault.path, "topic":"personal", "area":"AREAS/pessoal", "prepareWriteScope":false])
    try check(try Data(contentsOf:configURL) == config, "copy action never broadens Codex write scope")
    _ = try core.prepareKnowledgeInterview(["vault":vault.path, "topic":"personal", "area":"AREAS/pessoal", "prepareWriteScope":true])
    let prepared = try String(contentsOf:configURL, encoding:.utf8)
    try check(prepared.contains("[sandbox_workspace_write]") && prepared.contains(vault.path) && !prepared.contains("danger-full-access") && !prepared.contains("approval_policy"), "Open Codex prepares only chosen vault without global permission bypass")
    try check(try readJSON(core.home.appendingPathComponent("setup/bridge.json"))["interview_permission_status"] as? String == "prepared_requires_codex_project_trust", "prepared scope is not trusted execution")
    _ = try core.prepareKnowledgeInterview(["vault":vault.path, "topic":"personal", "area":"AREAS/pessoal", "prepareWriteScope":true])
    try check(try String(contentsOf:configURL, encoding:.utf8) == prepared, "owned scope preparation is idempotent")
    let bridgeURL = core.home.appendingPathComponent("setup/bridge.json")
    let pending:[String:Any] = ["workspace":workspace.path, "mcp_sha256":digest(config),
                               "pending_interview_previous_sha256":digest(config),
                               "pending_interview_config_sha256":digest(Data(prepared.utf8)),
                               "pending_interview_config_path":configURL.path,
                               "pending_interview_writable_vault":vault.path]
    // Model the two durable boundaries of an interrupted operation. Neither
    // recovery may require adopting foreign file bytes or broadening consent.
    try atomicWriteData(config, to:configURL); try writeJSON(pending, bridgeURL)
    _ = try core.prepareKnowledgeInterview(["vault":vault.path, "topic":"personal", "area":"AREAS/pessoal", "prepareWriteScope":true])
    try check(try String(contentsOf:configURL, encoding:.utf8) == prepared, "interrupted ledger-before-config write resumes")
    try check(try readJSON(bridgeURL)["pending_interview_config_sha256"] == nil, "successful recovery closes pending ledger")
    try writeJSON(pending, bridgeURL)
    _ = try core.prepareKnowledgeInterview(["vault":vault.path, "topic":"personal", "area":"AREAS/pessoal", "prepareWriteScope":true])
    try check(try readJSON(bridgeURL)["interview_config_sha256"] as? String == digest(Data(prepared.utf8)), "interrupted config-before-final-receipt write resumes")
    var forged = pending; forged["pending_interview_previous_sha256"] = String(repeating:"0",count:64)
    try writeJSON(forged, bridgeURL)
    try rejects("pending hash without known previous ownership is rejected") { _ = try core.prepareKnowledgeInterview(["vault":vault.path,"topic":"personal","area":"AREAS/pessoal","prepareWriteScope":true]) }
    forged = pending; forged["pending_interview_config_path"] = workspace.appendingPathComponent("elsewhere.toml").path
    try writeJSON(forged, bridgeURL)
    try rejects("pending hash for another configuration location is rejected") { _ = try core.prepareKnowledgeInterview(["vault":vault.path,"topic":"personal","area":"AREAS/pessoal","prepareWriteScope":true]) }
    try writeJSON(pending, bridgeURL)
    let held = try core.acquireOperationLock("setup")
    try rejects("concurrent bridge operation preserves interview scope") { _ = try core.prepareKnowledgeInterview(["vault":vault.path,"topic":"personal","area":"AREAS/pessoal","prepareWriteScope":true]) }
    core.releaseOperationLock(held)
    try check(try String(contentsOf:configURL, encoding:.utf8) == prepared, "busy operation leaves configuration unchanged")
    _ = try core.prepareKnowledgeInterview(["vault":vault.path,"topic":"personal","area":"AREAS/pessoal","prepareWriteScope":true])
    try atomicWriteData(Data((prepared + "# custom configuration\n").utf8), to:configURL)
    try rejects("foreign configuration edits are preserved") { _ = try core.prepareKnowledgeInterview(["vault":vault.path, "topic":"personal", "area":"AREAS/pessoal", "prepareWriteScope":true]) }
    try check(try String(contentsOf:configURL, encoding:.utf8).hasSuffix("# custom configuration\n"), "foreign bytes unchanged")
    print("Knowledge interview checks passed: \(count)")
}
