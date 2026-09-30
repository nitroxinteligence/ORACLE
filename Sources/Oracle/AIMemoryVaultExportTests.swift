import Foundation

func runAIMemoryVaultExportTests(root: URL) throws {
    let fm = FileManager.default
    try fm.createDirectory(at: root, withIntermediateDirectories: true)
    var count = 0
    func expect(_ value: Bool, _ label: String) throws {
        guard value else { throw NSError(domain: "AIMemoryExportTests", code: 1, userInfo: [NSLocalizedDescriptionKey: label]) }
        count += 1; print("PASS " + label)
    }
    func refuses(_ label: String, _ action: () throws -> Void) throws {
        do { try action() } catch { count += 1; print("PASS " + label); return }
        throw NSError(domain: "AIMemoryExportTests", code: 2, userInfo: [NSLocalizedDescriptionKey: "Accepted: " + label])
    }
    func folder(_ path: String) throws -> URL { let url = root.appendingPathComponent(path); try fm.createDirectory(at: url, withIntermediateDirectories: true); return url }
    func write(_ source: URL, _ relative: String, _ text: String) throws {
        let file = source.appendingPathComponent(relative); try fm.createDirectory(at: file.deletingLastPathComponent(), withIntermediateDirectories: true)
        try Data(text.utf8).write(to: file)
    }
    func markdown(_ title: String = "Decisão sintética", tier: String = "semantic", extra: String = "") -> String {
        "---\ntype: Decision\ntier: \(tier)\ntitle: \(title)\ngenerated:\n  by: process:ai-memory/2.4.2\n\(extra)---\n# Conteúdo fictício\nPreservar o texto original.\n"
    }
    let workspace = "11111111-1111-4111-8111-111111111111", project = "22222222-2222-4222-8222-222222222222"
    let source = try folder("installation/wiki/" + workspace + "/" + project), vault = try folder("vault"), state = try folder("state")
    let consent = AIMemoryExportConsent(enabled: true, source: source.path, vault: vault.path, includeSessions: false, revision: "synthetic-v1")
    try write(source, "decisions/a.md", markdown())
    try write(source, "concepts/b.md", markdown())
    try write(source, "sessions/session.md", markdown(tier: "episodic"))
    try write(source, "_pending/proposal.md", markdown())
    try write(source, "decisions/expired.md", markdown(extra: "expires_at: 2000-01-01\n"))
    try write(source, "decisions/deleted.md", markdown(extra: "status: deleted\n"))
    try write(source, "log.md", "raw not exported")
    try write(source, "index.md", markdown())
    func listing(_ selected: AIMemoryExportConsent = consent) throws -> [String: Any] {
        try OracleAIMemoryVaultExportEngine.candidates(source: source, vault: vault, includeSessions: selected.includeSessions, revision: selected.revision)
    }
    func export(_ ids: [String], snapshot: String? = nil, selected: AIMemoryExportConsent = consent, confirmed: Bool = true, hooks: AIMemoryExportHooks = .init()) throws -> [String: Any] {
        try OracleAIMemoryVaultExportEngine.export(source: source, vault: vault, state: state, consent: selected, ids: ids,
            confirmed: confirmed, snapshot: snapshot ?? listing(selected)["snapshot"] as? String, hooks: hooks)
    }
    let initial = try listing(), rows = initial["items"] as! [[String: Any]], ids = rows.map { $0["id"] as! String }
    try expect(rows.count == 2 && initial["semanticApproval"] as? Bool == false, "only current durable eligible pages, without truth certification")
    try expect(Set(ids).count == 2, "same content retains distinct source page identities")
    var sessions = consent; sessions.includeSessions = true
    try expect((try listing(sessions)["total"] as? Int) == 3, "episodic sessions require separate explicit opt-in")
    try expect(rows.allSatisfy { $0["sourceVersion"] as? String == "process:ai-memory/2.4.2" }, "source version is read from provenance, not installed-host inference")
    try refuses("confirmation required") { _ = try export(ids, confirmed: false) }
    try refuses("snapshot required") { _ = try OracleAIMemoryVaultExportEngine.export(source: source, vault: vault, state: state, consent: consent, ids: ids, confirmed: true, snapshot: nil) }
    try refuses("selected IDs bounded and validated") { _ = try export(["unknown"]) }
    try refuses("source must be UUID-scoped wiki project") { _ = try OracleAIMemoryVaultExportEngine.validateSource(root, vault: vault) }
    let first = try export(ids), results = first["results"] as! [[String: Any]]
    try expect(results.allSatisfy { $0["status"] as? String == "written" }, "selected original Markdown copied locally")
    try expect(first["indexed"] as? Bool == false && first["retrieved"] as? Bool == false, "copy does not claim GBrain indexing or retrieval")
    let destination = vault.appendingPathComponent(results[0]["path"] as! String)
    try expect(try Data(contentsOf: destination) == Data(markdown().utf8), "preserves Markdown bytes and identity")
    try expect((try export(ids)["results"] as! [[String: Any]]).allSatisfy { $0["status"] as? String == "no_op" }, "same ID and hash are idempotent")
    try Data("human edit".utf8).write(to: destination)
    let conflict = try export([ids[0]])
    try expect((conflict["results"] as! [[String: Any]])[0]["status"] as? String == "conflict", "human edit becomes preserved conflict")
    try expect(try String(contentsOf: destination, encoding: .utf8) == "human edit", "conflict never overwrites human text")
    let oldSnapshot = try listing()["snapshot"] as! String
    try write(source, "decisions/a.md", markdown("Nova decisão"))
    try refuses("reviewed snapshot rejects source change") { _ = try export([ids[1]], snapshot: oldSnapshot) }
    let foreignRelative = "INBOX/oracle-ai-memory/" + workspace + "/" + project + "/decisions/foreign.md"
    try write(source, "decisions/foreign.md", markdown())
    try write(vault, foreignRelative, markdown())
    let foreign = (try listing()["items"] as! [[String: Any]]).first { $0["path"] as? String == "decisions/foreign.md" }!["id"] as! String
    try expect((try export([foreign])["results"] as! [[String: Any]])[0]["status"] as? String == "conflict", "foreign file remains foreign even with identical bytes")
    try write(source, "procedures/cut.md", markdown("Cut", tier: "procedural"))
    let cut = (try listing()["items"] as! [[String: Any]]).first { $0["path"] as? String == "procedures/cut.md" }!["id"] as! String
    var cutHooks = AIMemoryExportHooks(); cutHooks.afterWrite = { throw NSError(domain: "SyntheticCut", code: 1) }
    try refuses("cut after atomic write leaves durable journal") { _ = try export([cut], hooks: cutHooks) }
    try expect(fm.fileExists(atPath: state.appendingPathComponent("pending.json").path), "pending journal exists before interrupted receipt")
    try expect((try export([cut])["results"] as! [[String: Any]])[0]["status"] as? String == "no_op", "recovery recognizes own completed write without foreign classification")
    try expect(!fm.fileExists(atPath: state.appendingPathComponent("pending.json").path), "recovery completes manifest then clears journal")
    try write(source, "procedures/race.md", markdown("Race", tier: "procedural"))
    let race = (try listing()["items"] as! [[String: Any]]).first { $0["path"] as? String == "procedures/race.md" }!["id"] as! String
    var sourceRace = AIMemoryExportHooks(); sourceRace.beforeRecheck = { try write(source, "procedures/race.md", markdown("Changed", tier: "procedural")) }
    try refuses("concurrent source edit rechecked inside coordination") { _ = try export([race], hooks: sourceRace) }
    var changed = consent; changed.vault = try folder("other-vault").path
    try refuses("vault change revokes consent") { _ = try export([race], selected: changed) }
    var revoked = AIMemoryExportHooks(); revoked.validateConsent = { throw NSError(domain: "SyntheticRevocation", code: 1) }
    try refuses("concurrent consent revision change refuses publication") { _ = try export([race], hooks: revoked) }
    try write(source, "procedures/before.md", markdown("Before", tier: "procedural"))
    let before = (try listing()["items"] as! [[String: Any]]).first { $0["path"] as? String == "procedures/before.md" }!["id"] as! String
    var validations = 0, beforeHooks = AIMemoryExportHooks()
    beforeHooks.validateConsent = { validations += 1; if validations == 3 { throw NSError(domain: "CutBeforePublish", code: 1) } }
    try refuses("cut after journal before publication leaves recoverable intent") { _ = try export([before], hooks: beforeHooks) }
    try expect((try export([before])["results"] as! [[String: Any]])[0]["status"] as? String == "written", "unpublished journal recovery retries selected bytes")
    try write(source, "procedures/destination-race.md", markdown("Destination race", tier: "procedural"))
    let destinationRace = (try listing()["items"] as! [[String: Any]]).first { $0["path"] as? String == "procedures/destination-race.md" }!["id"] as! String
    var destinationHooks = AIMemoryExportHooks()
    destinationHooks.beforeRecheck = { try write(vault, "INBOX/oracle-ai-memory/" + workspace + "/" + project + "/procedures/destination-race.md", "Concurrent human edit") }
    try expect((try export([destinationRace], hooks: destinationHooks)["results"] as! [[String: Any]])[0]["status"] as? String == "conflict", "concurrent destination creation remains preserved foreign content")
    try write(source, "decisions/Case.md", markdown())
    let caseID = (try listing()["items"] as! [[String: Any]]).first { $0["path"] as? String == "decisions/Case.md" }!["id"] as! String
    try write(vault, "INBOX/oracle-ai-memory/" + workspace + "/" + project + "/decisions/case.md", "Foreign case")
    try refuses("case and Unicode aliases do not overwrite other paths") { _ = try export([caseID]) }
    try fm.createSymbolicLink(at: source.appendingPathComponent("decisions/alias"), withDestinationURL: vault)
    try expect((try listing()["issues"] as! [[String: String]]).contains { $0["path"] == "decisions/alias" }, "symlink directory is never traversed")
    try fm.removeItem(at: source.appendingPathComponent("decisions/alias"))
    try expect((try OracleAIMemoryVaultExportEngine.preview(source: source, vault: vault, includeSessions: false, revision: consent.revision, id: before, snapshot: listing()["snapshot"] as! String))["text"] as? String == markdown("Before", tier: "procedural"), "preview returns exact bounded source text with reviewed hash")
    try refuses("preview refuses stale snapshot") { _ = try OracleAIMemoryVaultExportEngine.preview(source: source, vault: vault, includeSessions: false, revision: consent.revision, id: before, snapshot: oldSnapshot) }
    try write(source, "concepts/duplicate.md", "---\ntype: Concept\ntype: Decision\ntier: semantic\n---\n")
    try expect(!(try listing()["issues"] as! [[String: String]]).isEmpty, "unsupported duplicate YAML reports visible issue")
    try fm.createSymbolicLink(at: source.appendingPathComponent("concepts/escape.md"), withDestinationURL: destination)
    try expect((try listing()["issues"] as! [[String: String]]).contains { $0["path"] == "concepts/escape.md" }, "symlink file escape visibly refused")
    try write(source, "concepts/large.md", String(repeating: "x", count: 2_000_001))
    try expect((try listing()["issues"] as! [[String: String]]).contains { $0["path"] == "concepts/large.md" }, "oversize and partial candidates are visible, never purge")
    try refuses("partial scanner cannot authorize export") { _ = try export([before]) }
    try expect(!OracleAIMemoryVaultExportEngine.validPath("../raw") && !OracleAIMemoryVaultExportEngine.validPath("/db"), "traversal paths refused")
    try fm.removeItem(at: source.appendingPathComponent("procedures/cut.md"))
    try expect(fm.fileExists(atPath: vault.appendingPathComponent("INBOX/oracle-ai-memory/" + workspace + "/" + project + "/procedures/cut.md").path), "missing source never purges existing destination")
    let bounded = try folder("installation/wiki/" + workspace + "/33333333-3333-4333-8333-333333333333")
    for number in 0..<300 { try write(bounded, "concepts/p\(number).md", markdown()) }
    let page1 = try OracleAIMemoryVaultExportEngine.candidates(source: bounded, vault: vault, includeSessions: false)
    let page2 = try OracleAIMemoryVaultExportEngine.candidates(source: bounded, vault: vault, includeSessions: false, offset: 256)
    try expect((page1["items"] as! [[String: Any]]).count == 256 && (page2["items"] as! [[String: Any]]).count == 44, "metadata pagination bounds output without hiding remaining candidates")
    try expect(page1["snapshot"] as? String == page2["snapshot"] as? String, "unchanged pages share one consistent snapshot")
    try write(bounded, "concepts/p0.md", markdown("Updated"))
    let changedPage = try OracleAIMemoryVaultExportEngine.candidates(source: bounded, vault: vault, includeSessions: false, offset: 256)
    try expect(page1["snapshot"] as? String != changedPage["snapshot"] as? String, "changes between pages invalidate selected snapshot")
    let largeText = markdown() + String(repeating: "x", count: 1_900_000)
    for number in 0..<9 { try write(bounded, "concepts/large\(number).md", largeText) }
    let batchListing = try OracleAIMemoryVaultExportEngine.candidates(source: bounded, vault: vault, includeSessions: false)
    let batchIDs = (batchListing["items"] as! [[String: Any]]).filter { ($0["path"] as! String).contains("large") }.map { $0["id"] as! String }
    let boundedConsent = AIMemoryExportConsent(enabled: true, source: bounded.path, vault: vault.path, includeSessions: false, revision: "")
    try refuses("batch exceeding 16 MB is rejected before writing") {
        _ = try OracleAIMemoryVaultExportEngine.export(source: bounded, vault: vault, state: try folder("batch-state"), consent: boundedConsent,
            ids: batchIDs, confirmed: true, snapshot: batchListing["snapshot"] as? String)
    }
    for number in 9..<35 { try write(bounded, "concepts/large\(number).md", largeText) }
    let incomplete = try OracleAIMemoryVaultExportEngine.candidates(source: bounded, vault: vault, includeSessions: false)
    try expect(incomplete["complete"] as? Bool == false && (incomplete["issues"] as! [[String: String]]).contains { $0["message"]?.contains("64 MB") == true }, "aggregate scanner budget returns visible incomplete snapshot")
    let recoverySource = try folder("installation/wiki/" + workspace + "/44444444-4444-4444-8444-444444444444")
    let recoveryState = try folder("recovery-state")
    let recoveryConsent = AIMemoryExportConsent(enabled: true, source: recoverySource.path, vault: vault.path, includeSessions: false, revision: "recovery-v1")
    try write(recoverySource, "decisions/changed.md", markdown("Recover changed"))
    try write(recoverySource, "decisions/intact.md", markdown("Recover intact"))
    func recoveryListing() throws -> [String: Any] { try OracleAIMemoryVaultExportEngine.candidates(source: recoverySource, vault: vault, includeSessions: false, revision: recoveryConsent.revision) }
    let recoveryRows = try recoveryListing()["items"] as! [[String: Any]]
    let changedID = recoveryRows.first { $0["path"] as? String == "decisions/changed.md" }!["id"] as! String
    let intactID = recoveryRows.first { $0["path"] as? String == "decisions/intact.md" }!["id"] as! String
    func exportRecovery(_ id: String, hooks: AIMemoryExportHooks = .init()) throws -> [String: Any] {
        try OracleAIMemoryVaultExportEngine.export(source: recoverySource, vault: vault, state: recoveryState, consent: recoveryConsent,
            ids: [id], confirmed: true, snapshot: recoveryListing()["snapshot"] as? String, hooks: hooks)
    }
    func recoveryPreview() throws -> [String: Any] { try OracleAIMemoryVaultExportEngine.recoveryPreview(source: recoverySource, vault: vault, state: recoveryState, consent: recoveryConsent) }
    func resolve(_ token: String, confirmed: Bool = true, selected: AIMemoryExportConsent = recoveryConsent, hooks: AIMemoryExportHooks = .init()) throws -> [String: Any] {
        try OracleAIMemoryVaultExportEngine.resolveRecovery(source: recoverySource, vault: vault, state: recoveryState, consent: selected, confirmed: confirmed, previewID: token, hooks: hooks)
    }
    try expect(try recoveryPreview()["recoveryRequired"] as? Bool == false, "no journal produces no recovery action")
    try refuses("synthetic interruption creates recovery journal") { _ = try exportRecovery(changedID, hooks: cutHooks) }
    let changedPath = "INBOX/oracle-ai-memory/" + workspace + "/44444444-4444-4444-8444-444444444444/decisions/changed.md"
    try write(vault, changedPath, "Human recovery edit v1")
    let recovery1 = try recoveryPreview(), token1 = recovery1["previewID"] as! String
    try expect(recovery1["recoveryRequired"] as? Bool == true && (recovery1["conflicts"] as! [[String: Any]])[0]["path"] as? String == changedPath, "recovery preview exposes only bounded conflict metadata")
    try refuses("divergent pending journal prevents unrelated export until explicit choice") { _ = try exportRecovery(intactID) }
    try refuses("recovery requires separate confirmation") { _ = try resolve(token1, confirmed: false) }
    try write(vault, changedPath, "Human recovery edit v2")
    try refuses("human edit after recovery preview invalidates confirmation") { _ = try resolve(token1) }
    let token2 = try recoveryPreview()["previewID"] as! String
    try write(recoverySource, "decisions/changed.md", markdown("Source recovery edit"))
    try refuses("source edit after recovery preview invalidates confirmation") { _ = try resolve(token2) }
    let token3 = try recoveryPreview()["previewID"] as! String
    var changedConsent = recoveryConsent; changedConsent.revision = "recovery-v2"
    try refuses("consent revision is part of recovery preview") { _ = try resolve(token3, selected: changedConsent) }
    var changedVaultConsent = recoveryConsent; changedVaultConsent.vault = root.appendingPathComponent("other-vault").path
    try refuses("vault mismatch refuses recovery") { _ = try resolve(token3, selected: changedVaultConsent) }
    var recoveryRace = AIMemoryExportHooks(); recoveryRace.beforeRecheck = { try write(vault, changedPath, "Human race after click") }
    try refuses("recovery rechecks destination inside coordination") { _ = try resolve(token3, hooks: recoveryRace) }
    let beforeJournalToken = try recoveryPreview()["previewID"] as! String
    let pendingFile = recoveryState.appendingPathComponent("pending.json")
    let pendingBytes = try Data(contentsOf: pendingFile) + Data("\n".utf8)
    try pendingBytes.write(to: pendingFile)
    try refuses("pending journal changes invalidate preview confirmation") { _ = try resolve(beforeJournalToken) }
    var forged = try JSONSerialization.jsonObject(with: pendingBytes) as! [String: Any]
    var forgedEntry = forged["entry"] as! [String: Any]
    forgedEntry["path"] = "raw/log.md"
    forgedEntry["destination"] = "INBOX/oracle-ai-memory/" + workspace + "/44444444-4444-4444-8444-444444444444/raw/log.md"
    forgedEntry["id"] = OracleAIMemoryVaultExportEngine.hash(Data((workspace + "/44444444-4444-4444-8444-444444444444/raw/log.md").utf8))
    forged["entry"] = forgedEntry
    try JSONSerialization.data(withJSONObject: forged).write(to: pendingFile)
    try refuses("recovery journal cannot expand reads into raw or logs") { _ = try recoveryPreview() }
    try pendingBytes.write(to: pendingFile)
    let finalToken = try recoveryPreview()["previewID"] as! String
    let resolved = try resolve(finalToken)
    try expect(resolved["status"] as? String == "preserved_conflicts" && resolved["notesChanged"] as? Bool == false, "explicit resolution archives journal and changes private state only")
    try expect(try String(contentsOf: vault.appendingPathComponent(changedPath), encoding: .utf8) == "Human race after click", "recovery preserves exact human content")
    try expect(!fm.fileExists(atPath: recoveryState.appendingPathComponent("pending.json").path), "confirmed resolution revokes only pending journal")
    let receiptID = resolved["receiptID"] as! String
    try expect(fm.fileExists(atPath: recoveryState.appendingPathComponent("recovery/" + receiptID + "/journal.json").path) && fm.fileExists(atPath: recoveryState.appendingPathComponent("recovery/" + receiptID + "/receipt.json").path), "private journal and conflict receipt retained durably")
    let archivedBytes = try Data(contentsOf: recoveryState.appendingPathComponent("recovery/" + receiptID + "/journal.json"))
    try expect(archivedBytes == pendingBytes && OracleAIMemoryVaultExportEngine.hash(archivedBytes) == resolved["journalSHA256"] as? String, "archive preserves exact confirmed journal bytes and hash")
    try refuses("resolved preview cannot be replayed") { _ = try resolve(finalToken) }
    let disposition = try String(contentsOf: recoveryState.appendingPathComponent("manifest.json"), encoding: .utf8)
    let humanHash = OracleAIMemoryVaultExportEngine.hash(Data("Human race after click".utf8))
    try expect(disposition.contains("foreign") && !disposition.contains(humanHash), "foreign marker never adopts human hash into managed manifest")
    try expect((try exportRecovery(intactID)["results"] as! [[String: Any]])[0]["status"] as? String == "written", "another intact page becomes exportable after preservation")
    try expect((try exportRecovery(changedID)["results"] as! [[String: Any]])[0]["status"] as? String == "conflict", "preserved human page remains foreign after later export")
    try write(vault, changedPath, markdown("Source recovery edit"))
    try expect((try exportRecovery(changedID)["results"] as! [[String: Any]])[0]["status"] as? String == "conflict", "matching source bytes never re-adopt explicitly foreign page")
    try expect(try recoveryPreview()["recoveryRequired"] as? Bool == false, "resolved journal no longer requires global recovery")
    print("AIMemory export: \(count) checks passed; synthetic fixtures only")
}
