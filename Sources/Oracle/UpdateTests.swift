import Foundation
import CryptoKit

private struct UpdateFixtureDevice: OracleLicenseDeviceProviding {
    func identifier(create: Bool) throws -> String { "ORACLE-MAC2-" + String(repeating: "a", count: 64) }
}

func runUpdateTests(releasePath: String?, officialReleasePath:String?=nil) throws {
    let base = try oracleTestDirectory("oracle-update-test")
    defer { try? fm.removeItem(at: base) }
    let signer=Curve25519.Signing.PrivateKey(),device=UpdateFixtureDevice()
    let trust=LicenseKeys(version:1,keys:["fixture":signer.publicKey.rawRepresentation.base64EncodedString()])
    let c = try Core(home: base.appendingPathComponent("state"),licenseDevice:device,licenseTrust:trust), root = base.appendingPathComponent("vault")
    // Keep this suite offline; the public catalog is tested separately.
    let originalEngine=c.bundledEngineResources(),oldOverride=ProcessInfo.processInfo.environment["ORACLE_ENGINE_RESOURCES"]
    let fixtureResources=base.appendingPathComponent("resources"),fixtureEngine=fixtureResources.appendingPathComponent("engine")
    try fm.createDirectory(at:fixtureEngine,withIntermediateDirectories:true)
    var fixtureManifest=try c.updateManifest();fixtureManifest.removeValue(forKey:"skills");fixtureManifest.removeValue(forKey:"oracle")
    try writeJSON(fixtureManifest,fixtureResources.appendingPathComponent("updates/sources.json"))
    for name in ["gbrain","oracle-gbrain-read"] {try fm.linkItem(at:originalEngine.appendingPathComponent(name),to:fixtureEngine.appendingPathComponent(name))}
    setenv("ORACLE_ENGINE_RESOURCES",fixtureEngine.path,1)
    defer{if let oldOverride{setenv("ORACLE_ENGINE_RESOURCES",oldOverride,1)}else{unsetenv("ORACLE_ENGINE_RESOURCES")}}
    _=try c.licenseDeviceRequest()
    let license=OracleLicense(version:2,product:"oracle-macos",keyID:"fixture",licenseID:UUID().uuidString,subject:"Synthetic update fixture",issuedAt:1,expiresAt:nil,deviceID:try device.identifier(create:false))
    let payload=try JSONEncoder().encode(license)
    _=try c.activateLicense("ORACLE2."+base64URL(payload)+"."+base64URL(try signer.signature(for:Data("ORACLE2.".utf8)+payload)))
    try fm.createDirectory(at: root, withIntermediateDirectories: true)
    c.config["vault"] = root.path; try c.persist()
    var checks = [String]()
    func expect(_ ok: Bool, _ name: String) throws { guard ok else { throw failure(name) }; checks.append(name); print("PASS \(name)") }
    func rejects(_ name: String, _ operation: () throws -> Void) throws { do { try operation() } catch { checks.append(name); print("PASS \(name)"); return }; throw failure("Did not reject: " + name) }
    func file(_ path: String, _ text: String) -> UpdateFile { let bytes = Data(text.utf8); return UpdateFile(path: path, hash: digest(bytes), data: bytes) }
    func read(_ path: String) throws -> String { try String(contentsOf: c.scoped(path, root: root), encoding: .utf8) }
    let assetURL=OfficialRuntimeRelease.repository+"/releases/download/v0.99.1.0/"+OfficialRuntimeRelease.asset
    let officialAsset:[String:Any]=["id":123,"name":OfficialRuntimeRelease.asset,"size":1024,"digest":"sha256:"+String(repeating:"a",count:64),"browser_download_url":assetURL]
    let officialResponse:[String:Any]=["draft":false,"prerelease":false,"tag_name":"v0.99.1.0","html_url":OfficialRuntimeRelease.repository+"/releases/tag/v0.99.1.0","assets":[officialAsset]]
    let candidate=try OfficialRuntimeRelease.resolve(officialResponse,adapterCommit:oracleGBrainPinnedCommit)
    try expect(OfficialRuntimeRelease.valid(candidate) && candidate["version"] as? String=="0.99.1.0","new official release needs no embedded version allowlist")
    for field in ["draft","prerelease"] {
        var bad=officialResponse;bad[field]=true
        try rejects("rejects "+field){_=try OfficialRuntimeRelease.resolve(bad,adapterCommit:oracleGBrainPinnedCommit)}
    }
    for (field,value) in [("digest",""),("digest","sha256:invalid"),("browser_download_url","https://github.com/attacker/gbrain/releases/download/v0.99.1.0/gbrain-darwin-arm64"),("name","gbrain-linux-x64")] {
        var asset=officialAsset;asset[field]=value;var response=officialResponse;response["assets"]=[asset]
        try rejects("rejects invalid official asset "+field){_=try OfficialRuntimeRelease.resolve(response,adapterCommit:oracleGBrainPinnedCommit)}
    }
    var duplicate=officialResponse;duplicate["assets"]=[officialAsset,officialAsset]
    try rejects("duplicate platform assets are ambiguous"){_=try OfficialRuntimeRelease.resolve(duplicate,adapterCommit:oracleGBrainPinnedCommit)}
    var future=candidate;future["tag"]="v0.99.1.1"
    try expect(!OfficialRuntimeRelease.valid(future),"release receipt rejects mismatched version and tag")
    var attempts=0
    let transient=ProcessResult(code:1,output:String(decoding:try JSONSerialization.data(withJSONObject:["ok":false,"error":"PGLite failed to initialize its WASM runtime."]),as:UTF8.self))
    let recovered=try readGBrainResponse(retryInitialization:true,run:{attempts+=1;return attempts<3 ? transient:ProcessResult(code:0,output:"{\"ok\":true,\"value\":{}}")},wait:{_ in})
    try expect(attempts==3 && recovered["ok"] as? Bool==true,"setup status recovers from transient PGLite initialization")
    attempts=0
    try rejects("persistent initialization failure stays visible after three attempts") {_=try readGBrainResponse(retryInitialization:true,run:{attempts+=1;return transient},wait:{_ in})}
    try expect(attempts==3,"initialization retry is bounded")
    attempts=0
    try rejects("normal reads never retry initialization implicitly") {_=try readGBrainResponse(retryInitialization:false,run:{attempts+=1;return transient},wait:{_ in})}
    try expect(attempts==1,"normal read attempts remain unchanged")
    let cloud=[root.appendingPathComponent("cloud-a.md"),root.appendingPathComponent("cloud-b.md")]
    var local=Set<URL>(),requested=[URL](),clock:TimeInterval=0,progress=[Int]()
    try OracleVaultDownloads.prepare(cloud,request:{requested.append($0)},available:{local.contains($0)},progress:{done,_ in progress.append(done)},timeout:3,now:{clock},sleep:{clock+=1;local.insert(cloud[Int(clock)-1])})
    try expect(requested==cloud && progress.last==2,"cloud download waits for every file without duplicate requests")
    requested=[]
    try OracleVaultDownloads.prepare(cloud,request:{requested.append($0)},available:{_ in true},progress:{_,_ in})
    try expect(requested.isEmpty,"already local files never request downloads")
    clock=0
    try rejects("incomplete cloud download times out before installation") {
        try OracleVaultDownloads.prepare(cloud,request:{_ in},available:{_ in false},progress:{_,_ in},timeout:2,now:{clock},sleep:{clock+=1})
    }
    try rejects("cloud provider failure prevents installation") {
        try OracleVaultDownloads.prepare(cloud,request:{_ in throw failure("synthetic provider unavailable")},available:{_ in false},progress:{_,_ in})
    }
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
    try rejects("invalid specialist identifier rejected") { _ = try c.applySkillFiles([file("SISTEMA/skills/Invalid ID/test.md", "invalid")], version: "1", repository: "test") }
    try expect(c.skillPathAllowed("SISTEMA/skills/research-lab/agent/SKILL.md"),"dynamic validated specialist IDs accepted beyond seven")
    try rejects("case-insensitive package path collision rejected") {
        _=try c.applySkillFiles([file("SISTEMA/skills/research-lab/Agent/SKILL.md","a"),file("SISTEMA/skills/research-lab/agent/SKILL.md","b")],version:"bad",repository:"test")
    }
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
    do {
    let statusExecution=try c.acquireUpdateExecution(operation:"check-only")
    try statusExecution.claim();c.updateExecution=statusExecution
    defer{c.updateExecution=nil;statusExecution.close()}
    try c.recordUpdate("complete","Verificado",results:[availability])
    try expect(try c.updateStatus()["available"] as? Bool==true,"status exposes verified availability")
    try c.recordUpdate("complete","Em dia",results:[["id":"skills","status":"current"]])
    try expect(try c.updateStatus()["available"] as? Bool==false,"current result clears availability")
    try c.recordUpdate("complete","Disponível",results:[["id":"skills","status":"available"]])
    try c.recordUpdate("complete","Consulta concluída",results:[["id":"skills","status":"error","message":"Markdown ainda não está disponível localmente."]])
    let failedStatus=try c.updateStatus()
    try expect(failedStatus["phase"] as? String=="failed" && failedStatus["error"] as? String=="Markdown ainda não está disponível localmente.","terminal component errors are exposed as failures with their actual cause")
    try expect(failedStatus["knownUpdate"] as? Bool==true,"failed installation preserves known update for explicit retry")

    let priorOnboarding=c.onboardingRecord(),oldRun=UUID().uuidString
    try writeJSON(["status":"running","runID":oldRun],c.onboardingURL)
    try writeJSON(["completed":13501,"total":13501],base.appendingPathComponent("state/onboarding/installations/"+oldRun+"/progress.json"))
    try c.recordUpdate("downloading","Download",completed:25,total:100,progressSource:"runtime")
    let downloadStatus=try c.updateStatus()
    try expect(downloadStatus["completed"] as? Int==25 && downloadStatus["total"] as? Int==100,"runtime download never inherits old onboarding counters")
    try c.recordUpdate("verifying","Verificando",progressSource:"runtime")
    try expect(try c.updateStatus()["total"] as? Int==0,"verification does not retain a completed download percentage")
    try writeJSON(priorOnboarding,c.onboardingURL)
    }

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
    if let officialReleasePath {
        let binary=try Data(contentsOf:URL(fileURLWithPath:officialReleasePath))
        var release=candidate
        release["version"]="0.50.0.0";release["tag"]="v0.50.0.0"
        release["download_url"]=OfficialRuntimeRelease.repository+"/releases/download/v0.50.0.0/"+OfficialRuntimeRelease.asset
        release["sha256"]=digest(binary)
        try rejects("official download rejects corrupt bytes before activation"){_=try c.activateRuntime(binary:Data("broken".utf8),release:release)}
        _=try c.activateRuntime(binary:binary,release:release)
        let active=try c.engineResources(),pointer=try Data(contentsOf:c.updatePath("runtime/current.json"))
        try expect(try fileDigest(active.appendingPathComponent("gbrain"))==digest(binary),"new official runtime receipt opens without an embedded allowlist entry")
        try rejects("failed candidate never replaces active runtime"){_=try c.activateRuntime(binary:binary,release:release,validate:{_ in throw failure("synthetic validation failure")})}
        try expect(try Data(contentsOf:c.updatePath("runtime/current.json"))==pointer,"failed activation preserves exact previous pointer")
        _=try c.rollbackRuntime()
        try expect(try c.engineResources()==c.bundledEngineResources(),"official runtime rollback returns to bundled engine")
    }
    // Reproduce replacing Oracle.app after installing an official CLI release.
    // Tiny inert files exercise the receipt resolver without executing anything.
    do {
        let id=UUID().uuidString,slot=try c.updatePath("runtime/versions/"+id)
        try fm.createDirectory(at:slot,withIntermediateDirectories:true)
        let cli=Data("synthetic official CLI".utf8),oldAdapter=Data("previous Oracle build adapter".utf8)
        try cli.write(to:slot.appendingPathComponent("gbrain"));try oldAdapter.write(to:slot.appendingPathComponent("oracle-gbrain-read"))
        var release=candidate;release["sha256"]=digest(cli)
        let receipt:[String:Any]=["directory":id,"version":release["version"]!,"commit":oracleGBrainPinnedCommit,"official_release":release,"files":["gbrain":digest(cli),"oracle-gbrain-read":digest(oldAdapter)],"previous":["bundled":true]]
        let pointer=try c.updatePath("runtime/current.json");try writeJSON(receipt,pointer)
        defer{try? fm.removeItem(at:pointer)}
        let before=try Data(contentsOf:pointer)
        try expect(try c.engineResources().path==slot.path,"app replacement accepts an intact official runtime with a previous-build adapter")
        try expect(try c.readAdapterExecutable()==fixtureEngine.appendingPathComponent("oracle-gbrain-read"),"reads use the current app adapter, never the archived adapter")
        let reopened=try Core(home:c.home,licenseDevice:device,licenseTrust:trust)
        try expect(try reopened.engineResources().path==slot.path,"official runtime remains valid after reopening the app")
        try expect(try Data(contentsOf:pointer)==before,"app replacement preserves the release receipt without rewriting it")
        var wrongPin=receipt;wrongPin["commit"]="unknown-adapter-pin"
        try rejects("app replacement still rejects an unsupported adapter API pin"){_=try c.verifiedRuntime(wrongPin)}
        try atomicWriteData(Data("tampered CLI".utf8),to:slot.appendingPathComponent("gbrain"))
        try rejects("app replacement still rejects modified official runtime bytes"){_=try c.readAdapterExecutable()}
        try atomicWriteData(cli,to:slot.appendingPathComponent("gbrain"))
        try atomicWriteData(Data("tampered archived adapter".utf8),to:slot.appendingPathComponent("oracle-gbrain-read"))
        try rejects("archived adapter integrity remains checked"){_=try c.engineResources()}
        try atomicWriteData(oldAdapter,to:slot.appendingPathComponent("oracle-gbrain-read"))
        _=try c.rollbackRuntime()
        try expect(try c.engineResources().path==fixtureEngine.path,"rollback remains available after an app replacement")
    }
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
