import Foundation

func runUpdateTests(releasePath: String?) throws {
    let base = try oracleTestDirectory("oracle-update-test")
    defer { try? fm.removeItem(at: base) }
    let c = try Core(home: base.appendingPathComponent("state")), root = base.appendingPathComponent("vault")
    try fm.createDirectory(at: root, withIntermediateDirectories: true)
    c.config["vault"] = root.path; try c.persist()
    var checks = [String]()
    func expect(_ ok: Bool, _ name: String) throws { guard ok else { throw failure(name) }; checks.append(name); print("PASS \(name)") }
    func rejects(_ name: String, _ operation: () throws -> Void) throws { do { try operation() } catch { checks.append(name); print("PASS \(name)"); return }; throw failure("Did not reject: " + name) }
    func file(_ path: String, _ text: String) -> UpdateFile { let bytes = Data(text.utf8); return UpdateFile(path: path, hash: digest(bytes), data: bytes) }
    func read(_ path: String) throws -> String { try String(contentsOf: c.scoped(path, root: root), encoding: .utf8) }
    let skill = "SISTEMA/skills/code/test/SKILL.md", other = "SISTEMA/skills/ads/test/SKILL.md"
    let manual = "SISTEMA/skills/marketing/personal/SKILL.md"
    let manualURL = try c.scoped(manual, root: root)
    try fm.createDirectory(at: manualURL.deletingLastPathComponent(), withIntermediateDirectories: true)
    try Data("personal original".utf8).write(to: manualURL)
    let bytes=Data("bundle payload".utf8)
    let bundle:[String:Any]=["schema_version":1,"oracle_compatibility":"0.2","version":"1","files":[["path":skill,"sha256":digest(bytes),"content_base64":bytes.base64EncodedString()]]]
    let decoded=try c.decodeSkillsBundle(jsonData(bundle))
    try expect(decoded.0=="1" && decoded.1.count==1 && decoded.1[0].data==bytes,"release bundle decoded without filesystem extraction")
    var incompatibleBundle=bundle;incompatibleBundle["oracle_compatibility"]="9.0"
    try rejects("incompatible skill release rejected") { _=try c.decodeSkillsBundle(jsonData(incompatibleBundle)) }
    var duplicateBundle=bundle;duplicateBundle["files"]=(bundle["files"] as! [[String:Any]])+(bundle["files"] as! [[String:Any]])
    try rejects("duplicate bundle targets rejected") { _=try c.decodeSkillsBundle(jsonData(duplicateBundle)) }
    let legal=Data("MIT fixture license\n".utf8),image=Data([137,80,78,71,13,10,26,10]),sql=Data("-- reference fixture, never executed\n".utf8)
    var v2=bundle;v2["schema_version"]=2;v2["oracle_compatibility"]="0.3"
    v2["files"]=[("SISTEMA/skills/code/LICENSE",legal),("SISTEMA/skills/code/assets/reference.png",image),("SISTEMA/skills/code/reference.sql",sql)].map{["path":$0.0,"sha256":digest($0.1),"content_base64":$0.1.base64EncodedString()]}
    try expect(try c.decodeSkillsBundle(jsonData(v2)).1.count==3,"catalog v2 preserves license image and SQL reference bytes")
    var collision=bundle
    collision["files"]=[skill,skill.replacingOccurrences(of:"SKILL.md",with:"skill.md")].map{["path":$0,"sha256":digest(bytes),"content_base64":bytes.base64EncodedString()]}
    try rejects("case-colliding release targets rejected before filesystem access"){_=try c.decodeSkillsBundle(jsonData(collision))}
    try rejects("case-colliding availability targets rejected"){_=try c.previewSkillFiles([file(skill,"one"),file(skill.replacingOccurrences(of:"SKILL.md",with:"skill.md"),"two")],version:"2")}
    let unicodePath="SISTEMA/skills/code/café/SKILL.md"
    collision["files"]=[unicodePath,unicodePath.decomposedStringWithCanonicalMapping].map{["path":$0,"sha256":digest(bytes),"content_base64":bytes.base64EncodedString()]}
    try rejects("Unicode-normalization collisions refused"){_=try c.decodeSkillsBundle(jsonData(collision))}
    try expect(!c.skillPathAllowed("SISTEMA/skills/code/private\nfile.md"),"control characters refused in catalog path")
    let invalid = UpdateFile(path: skill, hash: "invalid", data: Data("test".utf8))
    try rejects("checksum rejects before mutation") { _ = try c.applySkillFiles([invalid], version: "1", repository: "test") }
    try rejects("skill path traversal rejected") { _ = try c.applySkillFiles([file("SISTEMA/skills/code/../escape.md", "invalid")], version: "1", repository: "test") }
    try rejects("unknown collection rejected") { _ = try c.applySkillFiles([file("SISTEMA/skills/unapproved/test.md", "invalid")], version: "1", repository: "test") }
    let outside = base.appendingPathComponent("outside"); try fm.createDirectory(at: outside, withIntermediateDirectories: true)
    let link = root.appendingPathComponent("SISTEMA/skills/code/link");try fm.createDirectory(at: link.deletingLastPathComponent(), withIntermediateDirectories: true);try fm.createSymbolicLink(at: link, withDestinationURL: outside)
    try rejects("symlink destination rejected") { _ = try c.applySkillFiles([file("SISTEMA/skills/code/link/SKILL.md", "invalid")], version: "1", repository: "test") }
    let first = try c.applySkillFiles([file(skill, "version one"), file(other, "ads one"), file(manual, "upstream")], version: "1", repository: "test")
    try expect(try read(skill) == "version one", "new files installed and verified")
    try expect(try read(manual) == "personal original" && (first["preserved"] as? [String]) == [manual], "unowned personal source preserved")
    try rejects("different repository cannot take over owned files"){_=try c.applySkillFiles([file(skill,"foreign")],version:"2",repository:"foreign")}
    try rejects("preview reports source migration instead of false eligibility"){_=try c.previewSkillFiles([file(skill,"foreign")],version:"2",repository:"foreign")}
    try expect(try read(skill)=="version one","repository conflict leaves bytes untouched")
    _ = try c.applySkillFiles([file(skill, "version two"), file(other, "ads two")], version: "2", repository: "test")
    try expect(try read(skill) == "version two", "owned version upgraded")
    try atomicWriteData(Data("user edit after upgrade".utf8),to:c.scoped(other,root:root))
    let rollback = try c.rollbackSkills()
    try expect(try read(skill) == "version one", "rollback restores exact preimage")
    try expect(try read(other) == "user edit after upgrade" && (rollback["preserved"] as? [String]) == [other], "rollback preserves later user edits")
    try fm.removeItem(at: c.scoped(skill, root: root))
    _ = try c.applySkillFiles([file(skill, "version three")], version: "3", repository: "test")
    try expect(!fm.fileExists(atPath: (try c.scoped(skill, root: root)).path), "intentional deletion preserved")
    // Crash between intent receipt and completed receipt: recovery recognizes the installed hash.
    _ = try c.applySkillFiles([file("SISTEMA/skills/code/new/SKILL.md", "new")], version: "4", repository: "test")
    let transactionURL = try c.updatePath("skills/transaction.json")
    var transaction = try readJSON(transactionURL), ops = transaction["operations"] as! [[String: Any]]
    ops[0]["applied"] = false;transaction["operations"] = ops;transaction["status"] = "applying";try writeJSON(transaction, transactionURL)
    _ = try c.rollbackSkills()
    try expect(!fm.fileExists(atPath: root.appendingPathComponent("SISTEMA/skills/code/new/SKILL.md").path), "interrupted transaction recovered by durable intent")
    let availablePath="SISTEMA/skills/code/available/SKILL.md"
    let availability=try c.previewSkillFiles([file(availablePath,"new release")],version:"5")
    try expect(availability["status"] as? String=="available" && availability["changes"] as? Int==1,"read-only availability detects an eligible new file")
    try expect(!fm.fileExists(atPath:root.appendingPathComponent(availablePath).path),"availability check never installs the file")
    let customized=try c.previewSkillFiles([file(manual,"upstream change")],version:"5")
    try expect(customized["status"] as? String=="preserved_edits" && customized["changes"] as? Int==0,"unowned edits do not produce false availability")
    let deleted=try c.previewSkillFiles([file(skill,"version three")],version:"5")
    try expect(deleted["changes"] as? Int==0,"deleted owned skills do not produce false availability")
    try rejects("availability rejects invalid checksum") {_ = try c.previewSkillFiles([invalid],version:"5")}
    try c.recordUpdate("complete","Verificado",results:[availability])
    try expect(try c.updateStatus()["available"] as? Bool==true,"status exposes verified availability")
    try c.recordUpdate("complete","Em dia",results:[["id":"skills","status":"current"]])
    try expect(try c.updateStatus()["available"] as? Bool==false,"current result clears availability")
    let held = try c.acquireOperationLock("updates")
    try rejects("concurrent update excluded") { _ = try c.performUpdates() }
    c.releaseOperationLock(held)
    try rejects("source with credentials rejected") { _ = try c.configureSkillSource("https://secret@github.com/test/catalog") }
    try rejects("non-HTTPS source rejected") { _ = try c.configureSkillSource("http://github.com/test/catalog") }
    _ = try c.configureSkillSource("https://github.com/test/catalog")
    try expect(c.updatePreferences()["skills_repository"] as? String == "https://github.com/test/catalog", "future source configured without changing global settings")
    _ = try c.configureSkillSource("")
    var pending=transaction;pending["status"]="applying";pending["vault"]=outside.path;try writeJSON(pending,transactionURL)
    c.config["gbrainWorkspace"]=outside.path;try c.persist()
    let independent=try c.performUpdates()
    let independentResults=independent["results"] as? [[String:Any]] ?? []
    try expect(independentResults.contains { $0["id"] as? String=="gbrain" && $0["status"] as? String=="external" } && independentResults.contains { $0["id"] as? String=="skills" && $0["status"] as? String=="error" },"blocked recovery does not hide independent source results")
    c.config.removeValue(forKey:"gbrainWorkspace");try c.persist()
    // The actual approved upstream binary is optional for quick offline tests.
    if let releasePath {
        let bytes = try Data(contentsOf: URL(fileURLWithPath: releasePath))
        let source = try c.updateManifest()["gbrain"] as! [String: Any]
        let release = (source["compatible_releases"] as! [[String: Any]])[0]
        let sentinel = c.home.appendingPathComponent("gbrain/profile/database-sentinel")
        try fm.createDirectory(at: sentinel.deletingLastPathComponent(), withIntermediateDirectories: true)
        try Data("database must remain identical".utf8).write(to: sentinel)
        let before = try fileDigest(sentinel)
        var incompatible = release; incompatible["commit"] = "unapproved"
        try rejects("runtime requires matching adapter commit") { _ = try c.activateRuntime(binary: bytes, release: incompatible) }
        try rejects("runtime rejects corrupt binary") { _ = try c.activateRuntime(binary: Data("invalid".utf8), release: release) }
        _ = try c.activateRuntime(binary: bytes, release: release)
        let active = try c.engineResources()
        try expect(try fileDigest(active.appendingPathComponent("gbrain")) == release["sha256"] as? String, "official runtime activated only after version and SHA256 checks")
        let receipt = try readJSON(c.updatePath("runtime/current.json"))
        // A staged directory is invisible until a complete receipt is atomically activated.
        let incomplete = try c.updatePath("runtime/versions/" + UUID().uuidString)
        try fm.createDirectory(at: incomplete, withIntermediateDirectories: true)
        try expect(try c.engineResources() == active, "interrupted staging preserves active runtime")
        try atomicWriteData(Data("local modification".utf8),to:active.appendingPathComponent("gbrain"))
        try rejects("modified runtime fails closed") { _ = try c.engineResources() }
        _ = try c.rollbackRuntime()
        try expect(try c.engineResources() == c.bundledEngineResources(), "runtime rollback restores bundled release")
        try expect(fm.fileExists(atPath: active.path) && receipt["previous"] != nil, "rollback retains modified runtime for inspection")
        try expect(try fileDigest(sentinel) == before, "runtime update and rollback never mutate database")
    }
    print("UPDATE_RECEIPT " + String(decoding: try jsonData(["checks": checks, "count": checks.count, "real_release_tested": releasePath != nil]), as: UTF8.self))
}
