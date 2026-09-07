import Foundation
func runTests() throws {
    let base = fm.temporaryDirectory.appendingPathComponent("oracle-test-\(UUID().uuidString)")
    defer { try? fm.removeItem(at:base) }
    let c = try Core(home:base.appendingPathComponent("state")); let root = base.appendingPathComponent("vault")
    try fm.createDirectory(at:root,withIntermediateDirectories:true)
    c.config["vault"] = root.path; try c.persist()
    func expect(_ ok:Bool,_ message:String)throws { if !ok { throw failure(message) }; print("PASS \(message)") }
    func rejects(_ message:String,_ action:()throws->Void)throws { do { try action() } catch { print("PASS \(message)"); return }; throw failure("Did not reject: " + message) }
    try rejects("path traversal") { _ = try c.scoped("../secret.md",root:root) }
    let outside = base.appendingPathComponent("private"); try fm.createDirectory(at:outside,withIntermediateDirectories:true)
    try fm.createSymbolicLink(at:root.appendingPathComponent("escape"),withDestinationURL:outside)
    try rejects("symlink escape") { _ = try c.scoped("escape/note.md",root:root) }
    let answers = Dictionary(uniqueKeysWithValues:identityLimits.keys.map { ($0,"Fixture answer for " + $0) })
    let plan = try c.makePlan(answers:answers,isNew:true,attach:false)
    try rejects("unconfirmed installation") { _ = try c.applyPlan() }
    try c.confirmPlan(hash:plan["answers_hash"] as! String)
    let first = try c.applyPlan(); let second = try c.applyPlan()
    try expect((first["verified"] as! [String]).count == templateFolders.count,"all planned folders verified")
    try expect((second["created"] as! [String]).count == (first["created"] as! [String]).count,"idempotent setup")
    let original = "---\nname: fixture\ndescription: Fixture skill\n---\n# Original\n"
    let skill = "SISTEMA/skills/code/fixture/SKILL.md"
    let file = try c.scoped(skill,root:root); try fm.createDirectory(at:file.deletingLastPathComponent(),withIntermediateDirectories:true); try Data(original.utf8).write(to:file)
    let saved = try c.saveVersion(path:skill,original:digest(Data(original.utf8)),text:original+"Personal change\n")
    try expect(try String(contentsOf:file) == original,"vendor source preserved")
    try expect(saved["path"] as? String != skill,"personal version provenance")
    try rejects("external edit conflict") { _ = try c.saveVersion(path:skill,original:"stale",text:original) }
    try c.ingestHook(["hook_event_name":"Stop","session_id":"fixture","event_id":"one","prompt":"SECRET_SHOULD_NOT_PERSIST","tool_output":"ALSO_SECRET"])
    try c.ingestHook(["hook_event_name":"Stop","session_id":"fixture","event_id":"one"])
    let events = try c.events()
    try expect(events.filter { $0["event_type"] as? String == "Stop" }.count == 1,"hook deduplication")
    try expect(!String(decoding:try jsonData(events),as:UTF8.self).contains("SECRET"),"hook payload minimization")
    try expect(events.last?["observed_status"] as? String != "complete","turn end never means objective complete")
    _ = try c.applyPlan(rollback:true)
    try expect(fm.fileExists(atPath:file.path),"rollback preserves user files")
    try expect(!(try c.scan(root:root)).contains { ($0["path"] as? String ?? "").hasPrefix("escape") },"scan omits symlinks")
    print("All contract tests passed")
}
