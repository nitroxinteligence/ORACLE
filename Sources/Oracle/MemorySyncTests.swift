import Foundation
import Darwin

func oracleTestFixture(_ name:String) throws -> URL {
    let root=ProcessInfo.processInfo.environment["ORACLE_TEST_ROOT"].map { URL(fileURLWithPath:$0) }
        ?? URL(fileURLWithPath:fm.currentDirectoryPath).appendingPathComponent(".work/data-build/fixtures")
    guard root.pathComponents.contains(".work") else { throw failure("Os testes exigem um diretório sintético dentro de .work.") }
    let base=root.appendingPathComponent(name+"-"+UUID().uuidString)
    try fm.createDirectory(at:base,withIntermediateDirectories:true);return base
}

func runDataReliabilityTests() throws {
    let base=try oracleTestFixture("native-data"),root=base.appendingPathComponent("vault")
    defer { try? fm.removeItem(at:base) }
    try fm.createDirectory(at:root,withIntermediateDirectories:true)
    let core=try Core(home:base.appendingPathComponent("state"))
    core.config["vault"]=root.path;core.config["gbrainAccess"]=false;try core.persist()
    func expect(_ value:Bool,_ message:String)throws { guard value else { throw failure(message) };print("PASS \(message)") }
    func rejects(_ message:String,_ operation:()throws->Void)throws {
        do { try operation() } catch { print("PASS \(message)");return };throw failure("Accepted: "+message)
    }
    func write(_ path:String,_ text:String)throws { try Data(text.utf8).write(to:root.appendingPathComponent(path)) }
    let storageFailure=gbrainFailureMessage(ProcessResult(code:1,output:"PGLite failed to initialize its WASM runtime. Possible cause: corrupt WAL/checkpoint state. Original error: ErrnoError (errno 51)"))
    try expect(storageFailure.contains("Espaço insuficiente") && storageFailure.contains("PGLite ENOSPC"),"pinned PGLite errno 51 reports storage exhaustion instead of generic corruption")
    try expect(!storageFailure.contains("pglite-repair") && storageFailure.contains("não apague"),"storage error does not recommend deleting locks or repairing the database")
    let unrelated=gbrainFailureMessage(ProcessResult(code:7,output:"Native ErrnoError (errno 51)"))
    try expect(unrelated == "GBrain (7): Native ErrnoError (errno 51)","unrelated numeric errno 51 is not classified as PGLite ENOSPC")
    let different=gbrainFailureMessage(ProcessResult(code:1,output:"PGLite failed to initialize its WASM runtime. Original error: ErrnoError (errno 44)"))
    try expect(!different.contains("Espaço insuficiente") && different.hasPrefix("GBrain (1):"),"other PGLite failures retain their original bounded diagnostic")
    try write("a.md","# A\n");try write("b.md","# B\n")
    let initial=try core.scanSnapshot(root:root)
    try expect(initial.complete && initial.files.count == 2,"complete bounded scan identifies Markdown notes")
    let limited=try core.scanSnapshot(root:root,maxEntries:1)
    try expect(!limited.complete && limited.entries.count == 1 && !limited.issues.isEmpty,"scan cap returns safe partial entries with explicit issue")
    try Data(repeating:65,count:2_000_001).write(to:root.appendingPathComponent("too-large.md"))
    let partial=try core.scanSnapshot(root:root)
    try expect(!partial.complete && partial.files.contains("a.md") && partial.files.contains("b.md"),"oversized note does not hide readable siblings")
    try rejects("authoritative scan refuses partial snapshot") { _=try core.scan(root:root) }
    try fm.removeItem(at:root.appendingPathComponent("too-large.md"))
    let unreadable=root.appendingPathComponent("unreadable")
    try fm.createDirectory(at:unreadable,withIntermediateDirectories:true)
    try Data("# Hidden by permissions\n".utf8).write(to:unreadable.appendingPathComponent("note.md"))
    try fm.setAttributes([.posixPermissions:0o000],ofItemAtPath:unreadable.path)
    do {
        defer { try? fm.setAttributes([.posixPermissions:0o700],ofItemAtPath:unreadable.path) }
        let unreadableScan=try core.scanSnapshot(root:root)
        try expect(!unreadableScan.complete && unreadableScan.files.contains("b.md") && unreadableScan.issues.contains(where:{$0["path"]=="unreadable"}),"unreadable subtree reports partial error and continues safe siblings")
    }
    try expect(try core.withVaultWrite { try core.withVaultWrite { true } },"nested writer wrappers do not acquire a second flock")
    let descriptor=Darwin.open(root.path,O_RDONLY|O_DIRECTORY|O_CLOEXEC)
    guard descriptor >= 0,flock(descriptor,LOCK_EX|LOCK_NB) == 0 else { throw failure("Directory flock unavailable") }
    do {
        defer { flock(descriptor,LOCK_UN);Darwin.close(descriptor) }
        let note=try core.readNote("a.md")
        try rejects("editor respects shared vault lock") { _=try core.saveNote(path:"a.md",original:note["hash"] as! String,text:"# Proposal\n") }
        try expect(try core.readDraft("a.md")?["text"] as? String == "# Proposal\n","lock conflict preserves editor draft")
        let other=try Core(home:base.appendingPathComponent("other-state"));other.config["vault"]=root.path;try other.persist()
        let bytes=Data("# Dynamic\n".utf8)
        try rejects("different state updater respects same directory inode lock") {
            _=try other.applySkillFiles([UpdateFile(path:"SISTEMA/skills/research-lab/agent/SKILL.md",hash:digest(bytes),data:bytes)],version:"fixture",repository:"owner/fixture")
        }
        try expect(!fm.fileExists(atPath:root.appendingPathComponent("SISTEMA").path),"contending updater performs no canonical write")
    }
    let external=base.appendingPathComponent("selected-external"),database=external.appendingPathComponent("local-db")
    try fm.createDirectory(at:database,withIntermediateDirectories:true)
    try writeJSON(["engine":"pglite","database_path":database.path],external.appendingPathComponent(".gbrain/config.json"))
    try core.selectExternalGBrain(workspace:external,profile:external)
    try expect(core.engineEnvironment(existing:true)["GBRAIN_HOME"] == external.path,"external workspace resolves its explicit profile")
    try expect(core.engineEnvironment(existing:true)["HOME"] != fm.homeDirectoryForCurrentUser.path,"subprocess HOME is isolated")
    let saved=try Data(contentsOf:core.home.appendingPathComponent("config.json"))
    try rejects("missing external config fails before changing selection") { try core.selectExternalGBrain(workspace:base.appendingPathComponent("missing"),profile:base.appendingPathComponent("missing")) }
    try expect(try Data(contentsOf:core.home.appendingPathComponent("config.json")) == saved,"failed external selection preserves settings")
    try writeJSON(["engine":"postgres","database_url":"postgresql://remote.invalid/private"],external.appendingPathComponent(".gbrain/config.json"))
    try rejects("remote endpoint is not an offline external profile") { try core.validateExternalGBrainProfile(external) }
    core.config.removeValue(forKey:"gbrainWorkspace");core.config.removeValue(forKey:"gbrainProfile");core.config["gbrainAccess"]=false;try core.persist()
    try core.prepareEngineScratch()
    var environment=core.engineEnvironment();environment.removeValue(forKey:"ORACLE_CANCEL_FILE")
    let childFile=base.appendingPathComponent("child.pid"),began=ProcessInfo.processInfo.systemUptime
    try rejects("deadline covers blocked stdin and descendant cleanup") {
        _=try runProcess(URL(fileURLWithPath:"/bin/sh"),["-c","trap '' TERM; /bin/sleep 60 & echo $! > '\(childFile.path)'; wait"],
                         cwd:base,environment:environment,input:Data(repeating:65,count:8_000_000),timeout:0.5)
    }
    try expect(ProcessInfo.processInfo.systemUptime-began < 5,"blocked process returns within bounded cleanup grace")
    guard let raw=try? String(contentsOf:childFile),let pid=Int32(raw.trimmingCharacters(in:.whitespacesAndNewlines)) else { throw failure("Synthetic child not observed") }
    let childDeadline=Date().addingTimeInterval(3)
    while Darwin.kill(pid,0) == 0 && Date() < childDeadline { Thread.sleep(forTimeInterval:0.03) }
    try expect(Darwin.kill(pid,0) != 0 && errno == ESRCH,"timed-out subprocess leaves no sleeping child")
    try rejects("stdout allocation is strictly capped") {
        _=try runProcess(URL(fileURLWithPath:"/usr/bin/head"),["-c","5000000","/dev/zero"],cwd:base,environment:environment,timeout:5)
    }
    let normal=try runProcess(URL(fileURLWithPath:"/bin/sh"),["-c","printf 'ok'; /bin/sleep 60 & exit 0"],cwd:base,environment:environment,timeout:2)
    try expect(normal.code == 0 && normal.output == "ok","exited parent cannot leave inherited pipe hanging")
    core.memorySync.start();defer { core.memorySync.stop() }
    func waitFor(_ description:String,_ predicate:()->Bool)throws {
        let deadline=Date().addingTimeInterval(8)
        while !predicate() && Date() < deadline { Thread.sleep(forTimeInterval:0.05) }
        try expect(predicate(),description)
    }
    func paths()->[String] { (core.memorySync.cachedSnapshot(root:root)["entries"] as? [[String:Any]] ?? []).compactMap { $0["path"] as? String } }
    _=paths()
    try waitFor("coordinator produces background cached scan") { core.memorySync.status()["scanComplete"] as? Bool == true }
    let stamp=core.memorySync.cachedSnapshot(root:root)["scan"] as! [String:Any]
    for _ in 0..<100 { _=paths() }
    let after=core.memorySync.cachedSnapshot(root:root)["scan"] as! [String:Any]
    try expect(stamp["at"] as? Double == after["at"] as? Double,"one hundred UI polls reuse the same snapshot")
    try write("external-created.md","# External\n")
    try waitFor("filesystem observer detects external creation") { paths().contains("external-created.md") }
    try fm.moveItem(at:root.appendingPathComponent("external-created.md"),to:root.appendingPathComponent("external-renamed.md"))
    try waitFor("filesystem observer detects external rename") { paths().contains("external-renamed.md") }
    try fm.removeItem(at:root.appendingPathComponent("external-renamed.md"))
    try waitFor("filesystem observer detects external deletion") { !paths().contains("external-renamed.md") }
    core.memorySync.stop()
    for _ in 0..<100 { _=paths() }
    try expect(core.memorySync.status()["active"] as? Bool == false,"cached UI reads cannot restart a stopped coordinator")
    try expect(fm.fileExists(atPath:core.home.appendingPathComponent("memory-sync/cancel").path),"cached UI reads preserve the explicit stop marker")
    core.memorySync.start()
    try waitFor("explicit lifecycle start resumes the coordinator") { core.memorySync.status()["active"] as? Bool == true && core.memorySync.status()["scanPending"] as? Bool == false }
}

/// Opt-in real engine lifecycle; every path is a newly created .work fixture.
/// The executable is the private copied official GBrain plus this worker's adapter.
func runNativeMemoryEngineTests() throws {
    guard ProcessInfo.processInfo.environment["ORACLE_RUN_ENGINE_TESTS"] == "1" else { return }
    let base=try oracleTestFixture("native-memory-engine"),root=base.appendingPathComponent("vault")
    let core=try Core(home:base.appendingPathComponent("state"))
    let workspace=core.home.appendingPathComponent("gbrain/workspace"),profile=core.home.appendingPathComponent("gbrain/profile")
    try fm.createDirectory(at:root,withIntermediateDirectories:true)
    try fm.createDirectory(at:workspace,withIntermediateDirectories:true)
    let obsidian=root.appendingPathComponent(".obsidian")
    try fm.createDirectory(at:obsidian,withIntermediateDirectories:true)
    try Data("{}".utf8).write(to:obsidian.appendingPathComponent("workspace.json"))
    defer { core.memorySync.stop() }
    core.config["vault"]=root.path;try core.persist()
    try core.bindOwnedGBrainTarget(plan:["plan_hash":"synthetic-native-lifecycle"])
    _=try core.official(["init","--pglite","--no-embedding"],workspace:workspace)
    _=try core.official(["sources","add","oracle-vault","--name","Synthetic native lifecycle"],workspace:workspace)
    let memory=root.appendingPathComponent("INBOX/oracle-memory")
    try fm.createDirectory(at:memory,withIntermediateDirectories:true)
    _=try core.official(["sources","add","oracle-memory","--path",memory.path,"--name","Synthetic memory","--force"],workspace:workspace)
    _=try core.official(["config","set","search.mcp_keyword_only","true"],workspace:workspace)
    core.config["gbrainAccess"]=true;core.config["gbrainVaultSource"]="oracle-vault";try core.persist()
    func write(_ path:String,_ text:String)throws { try atomicWriteData(Data(text.utf8),to:root.appendingPathComponent(path)) }
    func expect(_ value:Bool,_ message:String)throws { guard value else { throw failure(message) };print("PASS \(message)") }
    func generation()->Int { core.memorySync.status()["generation"] as? Int ?? -1 }
    func waitFor(_ message:String,_ condition:()->Bool)throws {
        let deadline=Date().addingTimeInterval(25)
        while !condition() && Date()<deadline { Thread.sleep(forTimeInterval:0.08) }
        if !condition() { fputs("Native memory state: \(core.memorySync.status())\n",stderr) }
        try expect(condition(),message)
    }
    func waitCurrent(_ after:Int,_ message:String)throws {
        try waitFor(message) {
            let status=core.memorySync.status()
            return (status["generation"] as? Int ?? -1)>after && status["state"] as? String == "current" && status["indexing"] as? Bool == false
        }
    }
    func page(_ slug:String)throws->[String:Any] {
        guard let page=try core.gbrainRead(["operation":"get","source":"oracle-vault","slug":slug]) as? [String:Any] else { throw failure("Expected synthetic indexed page") }
        return page
    }
    try write("native.md","# Native\n\ninitial contents\n")
    core.memorySync.start()
    _=core.memorySync.cachedSnapshot(root:root)
    try waitCurrent(-1,"native coordinator indexes a complete snapshot through the copied official engine")
    try expect(try page("native")["freshness"] as? String == "current_at_read","native get verifies canonical hash against real derived page")

    // Hold only the named derived-engine scheduler lock. The canonical external
    // editor remains free; a read can prove stale before background synchronization.
    let beforeEdit=generation(),operation=try core.acquireOperationLock("gbrain")
    do {
        defer { core.releaseOperationLock(operation) }
        try write("native.md","# Native\n\nexternal replacement\n")
        var refused=false
        do { _=try page("native") } catch { refused=true }
        try expect(refused,"native get refuses externally stale derived content")
    }
    core.memorySync.invalidate(reason:"fixture-engine-lock-released")
    try waitCurrent(beforeEdit,"native watcher and queued index restore freshness after external edit")
    try expect(try (page("native")["compiled_truth"] as? String ?? "").contains("external replacement"),"real engine returns the new external content")

    let beforeSave=generation(),note=try core.readNote("native.md")
    let saved=try core.saveNote(path:"native.md",original:note["hash"] as! String,text:"# Native\n\ninternal editor replacement\n")
    try expect(saved["status"] as? String == "saved" && core.memorySync.status()["state"] as? String != "current","internal save invalidates cached index synchronously")
    try waitCurrent(beforeSave,"internal editor save is indexed without restarting Oracle")

    let cancel=core.home.appendingPathComponent("onboarding/cancel")
    try fm.createDirectory(at:cancel.deletingLastPathComponent(),withIntermediateDirectories:true)
    try Data("paused".utf8).write(to:cancel)
    let status=try core.gbrainRead(["operation":"status"]) as? [String:Any]
    try expect(status?["engine"] as? String == "pglite","paused onboarding marker does not disable established read access")

    let beforeCreate=generation();try write("created.md","# Created\n\ncreated externally after pause\n")
    try waitCurrent(beforeCreate,"external creation queues official indexing despite an old setup cancel marker")
    try expect(try page("created")["freshness"] as? String == "current_at_read","created canonical note is available from current real index")
    let beforeRename=generation()
    try fm.moveItem(at:root.appendingPathComponent("created.md"),to:root.appendingPathComponent("renamed.md"))
    try waitCurrent(beforeRename,"external rename is reconciled in the native live index")
    try expect(try page("renamed")["freshness"] as? String == "current_at_read","renamed result maps to the current canonical file")
    let beforeDelete=generation();try fm.removeItem(at:root.appendingPathComponent("renamed.md"))
    try waitCurrent(beforeDelete,"external deletion is reconciled only after a complete live snapshot")
    let rows=try core.gbrainRead(["operation":"list","source":"oracle-vault"]) as? [[String:Any]] ?? []
    try expect(!rows.contains(where:{$0["slug"] as? String == "renamed"}),"complete live reconciliation removes only obsolete derived page")
    Thread.sleep(forTimeInterval:0.7)
    let beforeMetadata=generation()
    try atomicWriteData(Data("{\"synthetic\":true}".utf8),to:obsidian.appendingPathComponent("workspace.json"))
    Thread.sleep(forTimeInterval:1.4)
    try expect(generation() == beforeMetadata,"Obsidian workspace metadata does not trigger unnecessary reindexing")
    print("Native real-engine fixture: \(base.path)")
}
