import Foundation

func runEditorTests() throws {
    let base=try oracleTestFixture("editor")
    defer { try? fm.removeItem(at:base) }
    let c=try Core(home:base.appendingPathComponent("state")),root=base.appendingPathComponent("vault")
    try fm.createDirectory(at:root,withIntermediateDirectories:true)
    c.config["vault"]=root.path;try c.persist()
    var passed=0
    func expect(_ ok:Bool,_ message:String)throws { guard ok else {throw failure(message)};passed += 1;print("PASS \(message)") }
    func rejects(_ message:String,_ action:()throws->Void)throws { do {try action()}catch {passed += 1;print("PASS \(message)");return};throw failure("Accepted: "+message) }
    let path="WIKI/Nota.md",file=try c.scoped(path,root:root)
    try fm.createDirectory(at:file.deletingLastPathComponent(),withIntermediateDirectories:true)
    let original="# Documento\n\nConteúdo original.\n",edited=original+"Alteração com acentos e 👁.\n"
    try Data(original.utf8).write(to:file);try fm.setAttributes([.posixPermissions:0o640],ofItemAtPath:file.path)
    let before=try c.readNote(path)
    _ = try c.saveDraft(path:path,original:before["hash"] as! String,text:edited)
    let reopened=try Core(home:c.home)
    try expect(try reopened.readDraft(path)?["text"] as? String==edited,"draft survives Core restart")
    let saved=try c.saveNote(path:path,original:before["hash"] as! String,text:edited)
    try expect(saved["status"] as? String=="saved","direct save returns verified success")
    try expect(try String(contentsOf:file,encoding:.utf8)==edited,"original vault file updated")
    try expect((saved["document"] as? [String:Any])?["path"] as? String==file.path,"readback points to original file")
    try expect((saved["document"] as? [String:Any])?["hash"] as? String==digest(Data(edited.utf8)),"readback hash matches written bytes")
    try expect(try c.readDraft(path)==nil,"saved draft removed")
    let recoveryID=saved["recoveryID"] as! String
    try expect(try String(contentsOf:c.home.appendingPathComponent("editor-recovery/\(recoveryID).md"),encoding:.utf8)==original,"previous bytes retained for recovery")
    try expect((try fm.attributesOfItem(atPath:file.path)[.posixPermissions] as? NSNumber)?.intValue==0o640,"file permissions preserved")
    try expect(try fm.contentsOfDirectory(atPath:file.deletingLastPathComponent().path)==["Nota.md"],"no alternate document or temporary file in vault")
    let external=edited+"Alteração externa.\n";try Data(external.utf8).write(to:file,options:.atomic)
    let conflict=try c.saveNote(path:path,original:digest(Data(edited.utf8)),text:edited+"Rascunho pendente.\n")
    try expect(conflict["status"] as? String=="conflict","external edit is detected")
    try expect(try String(contentsOf:file,encoding:.utf8)==external,"conflict preserves external content")
    try expect(try c.readDraft(path)?["text"] as? String==edited+"Rascunho pendente.\n","conflicting draft is recoverable")
    _ = try c.saveNote(path:path,original:digest(Data(external.utf8)),text:external+"Mesclado.\n")
    try expect(try String(contentsOf:file,encoding:.utf8)==external+"Mesclado.\n","explicit rebase saves merged document")
    try rejects("absolute path excluded") { _ = try c.editableURL(file.path) }
    try rejects("parent traversal excluded") { _ = try c.editableURL("../outside.md") }
    let symlink=root.appendingPathComponent("link.md");try fm.createSymbolicLink(at:symlink,withDestinationURL:file)
    try rejects("symlink document excluded") { _ = try c.editableURL("link.md") }
    try Data("{}".utf8).write(to:root.appendingPathComponent("config.json"))
    try rejects("non-Markdown excluded") { _ = try c.editableURL("config.json") }
    let mirror=base.appendingPathComponent("Library/Application Support/OracleGBrain/obsidian")
    try fm.createDirectory(at:mirror,withIntermediateDirectories:true);try Data(original.utf8).write(to:mirror.appendingPathComponent("note.md"));c.config["vault"]=mirror.path
    try rejects("index mirror cannot be edited") { _ = try c.saveNote(path:"note.md",original:digest(Data(original.utf8)),text:edited) }
    c.config["vault"]=root.path
    try rejects("oversized draft rejected") { _ = try c.saveDraft(path:path,original:digest(Data(original.utf8)),text:String(repeating:"x",count:2_000_001)) }
    let extraPath="SISTEMA/skills/research/team/SKILL.md"
    let extraURL=try c.scoped(extraPath,root:root);try fm.createDirectory(at:extraURL.deletingLastPathComponent(),withIntermediateDirectories:true);try Data(original.utf8).write(to:extraURL)
    let extraScan=try c.scan(root:root);let extraCollections=c.discoveredCollections(extraScan)
    try expect(extraCollections.contains{$0["id"]=="research"},"new specialist folders are discovered from actual skills, including aliased vault roots")
    print("Editor: \(passed) checks passed, isolated temporary vault.")
}
