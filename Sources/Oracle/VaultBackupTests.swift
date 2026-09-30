import Foundation
import CryptoKit

func runVaultBackupTests(root: URL? = nil) throws {
    let base: URL
    if let root { base = root } else { base = try oracleTestDirectory("vault-backup") }
    let manager = FileManager.default
    try manager.createDirectory(at: base, withIntermediateDirectories: true)
    defer { try? manager.removeItem(at: base) }
    var count = 0
    func expect(_ value: Bool, _ label: String) throws {
        guard value else { throw NSError(domain: "OracleVaultBackupTests", code: 1, userInfo: [NSLocalizedDescriptionKey: label]) }
        count += 1; print("PASS " + label)
    }
    func refuses(_ label: String, _ action: () throws -> Void) throws {
        do { try action() } catch { count += 1; print("PASS " + label); return }
        throw NSError(domain: "OracleVaultBackupTests", code: 2, userInfo: [NSLocalizedDescriptionKey: "Accepted: " + label])
    }
    func folder(_ path: String) throws -> URL {
        let url = base.appendingPathComponent(path)
        try manager.createDirectory(at: url, withIntermediateDirectories: true); return url
    }
    func file(_ root: URL, _ path: String, _ bytes: Data) throws {
        let url = root.appendingPathComponent(path)
        try manager.createDirectory(at: url.deletingLastPathComponent(), withIntermediateDirectories: true)
        try bytes.write(to: url)
    }
    func sha(_ data: Data) -> String { SHA256.hash(data: data).map { String(format: "%02x", $0) }.joined() }
    let vault = try folder("vault"), destination = try folder("snapshots"), state = try folder("oracle-state")
    let markdown = Data("# Memória sintética\nDecisão: testar apenas fixtures.\n".utf8)
    let attachment = Data([0, 255, 128, 1, 2, 13, 10, 0] + Array(repeating: 211, count: 150_000))
    try file(vault, "Notas/Decisão e ação.md", markdown)
    try file(vault, "Anexos/Imagem 🪐.bin", attachment)
    try file(vault, ".obsidian/app.json", Data("{\"synthetic\":true}".utf8))
    try manager.createDirectory(at: vault.appendingPathComponent("Pasta vazia"), withIntermediateDirectories: true)
    let receipt = try OracleVaultBackupEngine.create(vault: vault, destination: destination, protectedRoots: [state])
    try expect(receipt.fullVault && receipt.files == 3 && receipt.bytes == Int64(markdown.count + attachment.count + 18), "snapshot covers Markdown Unicode, attachment bytes and safe .obsidian")
    try expect(receipt.directories == 4, "empty directories are represented in complete inventory")
    let snapshot = URL(fileURLWithPath: receipt.snapshot), manifest = snapshot.appendingPathComponent("manifest.json")
    try expect(sha(try Data(contentsOf: manifest)) == receipt.manifestSHA256, "receipt binds exact manifest SHA-256")
    let restore = try folder("restore")
    let restored = try OracleVaultBackupEngine.restore(receipt, destination: restore, confirmed: true, forbiddenRoots: [state])
    try expect(restored["complete"] as? Bool == true, "verified restore publishes into explicitly selected empty directory")
    try expect(try Data(contentsOf: restore.appendingPathComponent("Notas/Decisão e ação.md")) == markdown, "restored note preserves exact original bytes")
    try expect(try Data(contentsOf: restore.appendingPathComponent("Anexos/Imagem 🪐.bin")) == attachment, "restored attachment preserves Unicode filename and binary bytes")
    try expect(manager.fileExists(atPath: restore.appendingPathComponent("Pasta vazia").path), "restored empty directory remains available")
    try expect(try Data(contentsOf: vault.appendingPathComponent("Notas/Decisão e ação.md")) == markdown, "backup and restore never rewrite original note")
    try refuses("restore requires separate explicit confirmation") { _ = try OracleVaultBackupEngine.restore(receipt, destination: try folder("unconfirmed"), confirmed: false) }
    try refuses("restore refuses original vault self-overwrite") { _ = try OracleVaultBackupEngine.restore(receipt, destination: vault, confirmed: true) }
    try refuses("restore refuses snapshot ancestor and sibling scope") { _ = try OracleVaultBackupEngine.restore(receipt, destination: try folder("snapshots/restore"), confirmed: true) }
    try refuses("restore refuses nonempty selected directory") { _ = try OracleVaultBackupEngine.restore(receipt, destination: restore, confirmed: true) }
    try refuses("backup destination cannot be inside vault") { _ = try OracleVaultBackupEngine.create(vault: vault, destination: try folder("vault/backups")) }
    try refuses("backup destination cannot contain its source") { _ = try OracleVaultBackupEngine.create(vault: vault, destination: base) }
    try refuses("backup destination cannot overlap Oracle state") { _ = try OracleVaultBackupEngine.create(vault: vault, destination: state, protectedRoots: [state]) }
    try manager.removeItem(at: vault.appendingPathComponent("backups"))

    var cloudHooks = OracleVaultBackupHooks()
    cloudHooks.available = { !$0.lastPathComponent.hasSuffix(".bin") }
    try refuses("simulated dataless attachment prevents complete snapshot without hydration") { _ = try OracleVaultBackupEngine.create(vault: vault, destination: destination, hooks: cloudHooks) }
    var failedRead = OracleVaultBackupHooks()
    failedRead.available = { _ in throw NSError(domain: "SyntheticReadFailure", code: 5) }
    try refuses("simulated cloud or permission error cannot become partial success") { _ = try OracleVaultBackupEngine.create(vault: vault, destination: destination, hooks: failedRead) }
    let outside = try folder("outside")
    try file(outside, "secret.txt", Data("not a vault source".utf8))
    let link = vault.appendingPathComponent("outside-link")
    try manager.createSymbolicLink(at: link, withDestinationURL: outside)
    try refuses("external symbolic link is never copied") { _ = try OracleVaultBackupEngine.create(vault: vault, destination: destination) }
    try manager.removeItem(at: link)
    try file(vault, ".gbrain/brain.pglite/active.bin", Data("active database bytes".utf8))
    try file(vault, "Não incluir/private.md", Data("excluded scope".utf8))
    let excluded = try OracleVaultBackupEngine.create(vault: vault, destination: destination, exclusions: ["Não incluir"])
    try expect(!excluded.fullVault && excluded.excludedRoots == [".gbrain", "Não incluir"], "explicit and active-database exclusions reduce declared full-vault coverage")
    try expect(!manager.fileExists(atPath: URL(fileURLWithPath: excluded.snapshot).appendingPathComponent("payload/.gbrain").path), "active PGLite files are absent from vault backup")
    try refuses("manual exclusions cannot traverse outside source") { _ = try OracleVaultBackupEngine.create(vault: vault, destination: destination, exclusions: ["../outside"]) }
    try manager.removeItem(at: vault.appendingPathComponent(".gbrain")); try manager.removeItem(at: vault.appendingPathComponent("Não incluir"))

    let note = vault.appendingPathComponent("Notas/Decisão e ação.md")
    var changed = OracleVaultBackupHooks()
    changed.afterInventory = { try Data("# Alteração concorrente preservada\n".utf8).write(to: note) }
    try refuses("external modification between inventory and copy prevents completion") { _ = try OracleVaultBackupEngine.create(vault: vault, destination: destination, hooks: changed) }
    try expect(try String(contentsOf: note, encoding: .utf8).contains("concorrente"), "concurrent source edit remains untouched")
    try markdown.write(to: note)
    var membership = OracleVaultBackupHooks()
    membership.afterInventory = { try file(vault, "Nova nota.md", Data("new external note".utf8)) }
    try refuses("new source note invalidates final membership readback") { _ = try OracleVaultBackupEngine.create(vault: vault, destination: destination, hooks: membership) }
    try expect(manager.fileExists(atPath: vault.appendingPathComponent("Nova nota.md").path), "failed snapshot preserves newly created external note")
    try manager.removeItem(at: vault.appendingPathComponent("Nova nota.md"))

    let collision = try folder("collision-restore")
    var collisionHooks = OracleVaultBackupHooks()
    collisionHooks.beforeRestorePublish = { try file(collision, "Nota externa.md", Data("keep this external note".utf8)) }
    try refuses("external destination note after selection blocks atomic restore") { _ = try OracleVaultBackupEngine.restore(receipt, destination: collision, confirmed: true, hooks: collisionHooks) }
    try expect(try Data(contentsOf: collision.appendingPathComponent("Nota externa.md")) == Data("keep this external note".utf8), "collision failure preserves external destination note")
    var entryLimit = OracleVaultBackupLimits(); entryLimit.entries = 1
    try refuses("entry count limit stops complete backup") { _ = try OracleVaultBackupEngine.create(vault: vault, destination: destination, limits: entryLimit) }
    var fileLimit = OracleVaultBackupLimits(); fileLimit.fileBytes = 10
    try refuses("attachment size limit is enforced") { _ = try OracleVaultBackupEngine.create(vault: vault, destination: destination, limits: fileLimit) }
    var byteLimit = OracleVaultBackupLimits(); byteLimit.bytes = 10
    try refuses("aggregate byte limit is enforced") { _ = try OracleVaultBackupEngine.create(vault: vault, destination: destination, limits: byteLimit) }
    var spaceLimit = OracleVaultBackupLimits(); spaceLimit.reserveBytes = 1_000_000_000_000_000
    try refuses("free space requirement fails before snapshot copy") { _ = try OracleVaultBackupEngine.create(vault: vault, destination: destination, limits: spaceLimit) }
    var clock: Double = 0, timeHooks = OracleVaultBackupHooks()
    timeHooks.now = { clock += 1; return clock }
    var timeLimit = OracleVaultBackupLimits(); timeLimit.seconds = 0.5
    try refuses("monotonic time budget rejects incomplete operation") { _ = try OracleVaultBackupEngine.create(vault: vault, destination: destination, limits: timeLimit, hooks: timeHooks) }
    var revoked = OracleVaultBackupHooks(); revoked.beforeBackupPublish = { throw NSError(domain: "SyntheticConsentRevoked", code: 1) }
    try refuses("consent revoked before publication prevents complete receipt") { _ = try OracleVaultBackupEngine.create(vault: vault, destination: destination, hooks: revoked) }

    let payloadFile = snapshot.appendingPathComponent("payload/Anexos/Imagem 🪐.bin")
    try Data([0, 1, 2]).write(to: payloadFile)
    try refuses("corrupted snapshot attachment blocks restore") { _ = try OracleVaultBackupEngine.restore(receipt, destination: try folder("corrupt-restore"), confirmed: true) }
    try attachment.write(to: payloadFile)
    let originalManifest = try Data(contentsOf: manifest)
    try Data("{}".utf8).write(to: manifest)
    try refuses("modified manifest without matching trusted receipt is rejected") { _ = try OracleVaultBackupEngine.restore(receipt, destination: try folder("manifest-restore"), confirmed: true) }
    try originalManifest.write(to: manifest)
    for malicious in ["../escape.md", "Notas/DECISÃO E AÇÃO.md"] {
        var object = try JSONSerialization.jsonObject(with: originalManifest) as! [String: Any]
        var entries = object["entries"] as! [[String: Any]]
        entries.append(["path": malicious, "directory": false, "bytes": 0, "sha256": sha(Data())]); object["entries"] = entries
        let data = try JSONSerialization.data(withJSONObject: object); try data.write(to: manifest)
        let forged = OracleVaultBackupReceipt(id: receipt.id, snapshot: receipt.snapshot, sourceVault: receipt.sourceVault, manifestSHA256: sha(data), bytes: receipt.bytes,
            files: receipt.files+1, directories: receipt.directories, fullVault: receipt.fullVault, excludedRoots: receipt.excludedRoots, createdAt: receipt.createdAt)
        try refuses("owned manifest still refuses traversal or case alias: " + malicious) { _ = try OracleVaultBackupEngine.restore(forged, destination: try folder("forged-" + UUID().uuidString), confirmed: true) }
    }
    try originalManifest.write(to: manifest)
    let unsafePayload = snapshot.appendingPathComponent("payload/outside-link")
    try manager.createSymbolicLink(at: unsafePayload, withDestinationURL: outside)
    try refuses("snapshot external link is rejected before restore") { _ = try OracleVaultBackupEngine.restore(receipt, destination: try folder("link-restore"), confirmed: true) }
    try manager.removeItem(at: unsafePayload)
    try file(snapshot, "payload/.gbrain/extra.bin", Data("unmanifested active bytes".utf8))
    try refuses("unmanifested hidden database entries cannot hide from integrity scan") { _ = try OracleVaultBackupEngine.restore(receipt, destination: try folder("extra-restore"), confirmed: true) }
    var lateChange=OracleVaultBackupHooks()
    lateChange.beforeBackupPublish={try Data("late source edit".utf8).write(to:note)}
    try refuses("source mutation after readback still blocks final publication"){_=try OracleVaultBackupEngine.create(vault:vault,destination:destination,hooks:lateChange)}
    try expect(try Data(contentsOf:note)==Data("late source edit".utf8),"late source mutation remains intact")
    print("Vault backup: \(count) checks; synthetic Markdown, Unicode attachment, local snapshots only")
    #if !ORACLE_VAULT_BACKUP_STANDALONE
    try runVaultBackupCoreTests()
    #endif
}
