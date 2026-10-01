import Foundation

/// Called after completeMemoryOnly in the existing isolated real-engine fixture.
/// Resources must be disposable test copies, never the installed application.
func runBridgeReprepareTests(core:Core,resources:URL) throws {
    let fm=FileManager.default
    guard oracleRuntimeBindingTestContext(home:core.home),resources.pathComponents.contains(".work"),resources.resolvingSymlinksInPath()==resources.standardizedFileURL else{throw failure("Bridge tests require isolated copied resources.")}
    var count=0
    func check(_ condition:Bool,_ label:String)throws{guard condition else{throw failure("FAIL bridge reprepare: "+label)};count+=1;print("PASS bridge reprepare: "+label)}
    let planURL=core.home.appendingPathComponent("setup/plan.json"),planBytes=try Data(contentsOf:planURL),plan=try core.validatedPlan(),workspace=try core.oracleWorkspace()
    let sourceRoot=resources.appendingPathComponent("gbrain-method"),manifestURL=sourceRoot.appendingPathComponent("manifest.json"),manifestBytes=try Data(contentsOf:manifestURL)
    let capabilityURL=sourceRoot.appendingPathComponent("ORACLE-CAPABILITIES.md"),capabilityBytes=try Data(contentsOf:capabilityURL)
    let adapterURL=resources.appendingPathComponent("engine/oracle-gbrain-read"),adapterBytes=try Data(contentsOf:adapterURL),backupURL=resources.appendingPathComponent("engine/bridge-reprepare-original-adapter")
    let runtimeBundle=try prepareOracleRuntimeBindingTestFixture(home:core.home),runtimeAdapter=runtimeBundle.appendingPathComponent("Contents/Resources/engine/oracle-gbrain-read"),runtimeAdapterBytes=try Data(contentsOf:runtimeAdapter)
    let consentURL=core.home.appendingPathComponent("config.json"),consentBytes=try Data(contentsOf:consentURL)
    let oldFixturePath="oracle-bridge-old-fixture.md",newFixturePath="oracle-bridge-new-fixture.md"
    let oldFixtureURL=sourceRoot.appendingPathComponent(oldFixturePath),newFixtureURL=sourceRoot.appendingPathComponent(newFixturePath)
    var restored=false
    func restore()throws {
        try atomicWriteData(manifestBytes,to:manifestURL);try atomicWriteData(capabilityBytes,to:capabilityURL)
        try atomicWriteData(adapterBytes,to:adapterURL,permissions:0o755);try atomicWriteData(runtimeAdapterBytes,to:runtimeAdapter,permissions:0o700)
        if fm.fileExists(atPath:backupURL.path){try fm.removeItem(at:backupURL)}
        _=try core.prepareBridge(reprepare:true)
        for url in [oldFixtureURL,newFixtureURL] {if fm.fileExists(atPath:url.path){try fm.removeItem(at:url)}}
        restored=true
    }
    defer{if !restored{try? restore()}}
    // Create an owned obsolete file through the real updater, not by editing its
    // receipts. Package B will remove it and add a different owned file.
    let oldFixtureBytes=Data("# Obsolete fixture method\n".utf8)
    var packageA=try readJSON(manifestURL),packageARows=packageA["files"] as! [[String:Any]]
    try atomicWriteData(oldFixtureBytes,to:oldFixtureURL)
    packageARows.append(["path":oldFixturePath,"sha256":digest(oldFixtureBytes),"size":oldFixtureBytes.count]);packageA["files"]=packageARows
    try writeJSON(packageA,manifestURL);_=try core.prepareBridge(reprepare:true)
    try check(core.bridgeReprepareStatus()["bridgeRepairStatus"] as? String=="ready","initial current bridge is ready")
    // A signed app may replace its method metadata and adapter while keeping the
    // official upstream pin. The original confirmed plan stays immutable.
    var nextManifest=try readJSON(manifestURL),rows=nextManifest["files"] as! [[String:Any]]
    let newCapability=capabilityBytes+Data("\nBridge fixture updated capability description.\n".utf8)
    try atomicWriteData(newCapability,to:capabilityURL)
    guard let row=rows.firstIndex(where:{$0["path"] as? String=="ORACLE-CAPABILITIES.md"}) else{throw failure("Capability fixture missing.")}
    rows[row]["sha256"]=digest(newCapability);rows[row]["size"]=newCapability.count
    rows.removeAll{$0["path"] as? String==oldFixturePath}
    let newFixtureBytes=Data("# Added fixture method\n".utf8)
    try atomicWriteData(newFixtureBytes,to:newFixtureURL)
    rows.append(["path":newFixturePath,"sha256":digest(newFixtureBytes),"size":newFixtureBytes.count]);nextManifest["files"]=rows
    try writeJSON(nextManifest,manifestURL)
    try atomicWriteData(adapterBytes,to:backupURL,permissions:0o755)
    let wrapper="#!/bin/sh\nexec "+OracleCodexRuntimeBinding.quote(backupURL.path)+" \"$@\"\n"
    try atomicWriteData(Data(wrapper.utf8),to:adapterURL,permissions:0o755)
    try atomicWriteData(Data("#!/bin/sh\n# updated fixture runtime\nexit 0\n".utf8),to:runtimeAdapter,permissions:0o700)
    try check(core.bridgeReprepareStatus()["bridgeNeedsReprepare"] as? Bool==true,"package and runtime changes expose explicit repair")
    var strictRejected=false;do{try core.verifyMemoryOnlyRuntime(plan)}catch{strictRejected=true}
    try check(strictRejected,"initial installation hash gate remains strict")
    func rejectBeforeWrite(_ label:String,_ operation:()throws->Void)throws {
        let bridgeURL=core.home.appendingPathComponent("setup/bridge.json"),methodURL=core.home.appendingPathComponent("setup/gbrain-method-install.json")
        let bridge=try Data(contentsOf:bridgeURL),method=try Data(contentsOf:methodURL)
        var refused=false;do{try operation()}catch{refused=true}
        try check(refused && (try Data(contentsOf:bridgeURL))==bridge && (try Data(contentsOf:methodURL))==method,label)
    }
    let agentsURL=workspace.appendingPathComponent("AGENTS.md"),agentsBytes=try Data(contentsOf:agentsURL)
    try atomicWriteData(agentsBytes+Data("\nHuman edit\n".utf8),to:agentsURL)
    try rejectBeforeWrite("human method edit refuses before receipt writes"){_=try core.prepareBridge(reprepare:true)}
    try check((try Data(contentsOf:agentsURL))==agentsBytes+Data("\nHuman edit\n".utf8),"human edit is preserved")
    try atomicWriteData(agentsBytes,to:agentsURL)
    let hooksURL=workspace.appendingPathComponent(".codex/hooks.json"),hooksBytes=try Data(contentsOf:hooksURL)
    try atomicWriteData(Data("{}".utf8),to:hooksURL)
    try rejectBeforeWrite("edited hooks refuse before method writes"){_=try core.prepareBridge(reprepare:true)}
    try check((try Data(contentsOf:workspace.appendingPathComponent(".oracle/gbrain-method/ORACLE-CAPABILITIES.md")))==capabilityBytes,"hook conflict preserves old method bytes")
    try atomicWriteData(hooksBytes,to:hooksURL)
    let checkpoint=core.home.appendingPathComponent("gbrain/profile/oracle-vault-checkpoint.json")
    try writeJSON(["complete":false],checkpoint)
    try rejectBeforeWrite("partial index refuses before writes"){_=try core.prepareBridge(reprepare:true)}
    try fm.removeItem(at:checkpoint)
    let indexURL=core.home.appendingPathComponent("gbrain/profile/oracle-vault-manifest.json"),indexBytes=try Data(contentsOf:indexURL)
    let syncURL=core.home.appendingPathComponent("setup/gbrain-sync.json"),syncBytes=try Data(contentsOf:syncURL)
    var generationZero=try readJSON(indexURL);generationZero["generation"]=0
    var generationPayload=generationZero;generationPayload.removeValue(forKey:"receipt_sha256")
    generationZero["receipt_sha256"]=digest(try OracleBridgeIndexCanonical.data(generationPayload));try writeJSON(generationZero,indexURL)
    var zeroSync=try readJSON(syncURL);zeroSync["receipt_sha256"]=generationZero["receipt_sha256"];zeroSync["manifest_file_sha256"]=try fileDigest(indexURL);try writeJSON(zeroSync,syncURL)
    try check((try core.verifyBridgeReprepareIndex(plan:plan))["generation"] as? Int==0,"complete owned maintenance generation zero is admitted")
    try atomicWriteData(indexBytes,to:indexURL);try atomicWriteData(syncBytes,to:syncURL)
    var tampered=try readJSON(indexURL);tampered["generation"]=(tampered["generation"] as! Int)+1;try writeJSON(tampered,indexURL)
    try rejectBeforeWrite("current index tamper refuses before writes"){_=try core.prepareBridge(reprepare:true)}
    try atomicWriteData(indexBytes,to:indexURL)
    var wrongPin=nextManifest;wrongPin["commit"]=String(repeating:"0",count:40);try writeJSON(wrongPin,manifestURL)
    try rejectBeforeWrite("incompatible method pin refuses before writes"){_=try core.prepareBridge(reprepare:true)}
    try writeJSON(nextManifest,manifestURL)
    // Simulate interruption after new manifest and obsolete deletion, before
    // either final receipt. Missing new files still need installation on retry.
    try atomicWriteData(newCapability,to:workspace.appendingPathComponent(".oracle/gbrain-method/ORACLE-CAPABILITIES.md"))
    try atomicWriteData(Data(contentsOf:manifestURL),to:workspace.appendingPathComponent(".oracle/gbrain-method/manifest.json"))
    let obsoleteTarget=workspace.appendingPathComponent(".oracle/gbrain-method/"+oldFixturePath)
    try check((try fileDigest(obsoleteTarget))==digest(oldFixtureBytes),"obsolete fixture still has owned bytes before synthetic interruption")
    try fm.removeItem(at:obsoleteTarget)
    _=try core.prepareBridge(reprepare:true)
    try check(!fm.fileExists(atPath:obsoleteTarget.path) && (try fileDigest(workspace.appendingPathComponent(".oracle/gbrain-method/"+newFixturePath)))==digest(newFixtureBytes),"retry completes changed inventory with obsolete already removed")
    try check(core.bridgeReprepareStatus()["bridgeRepairStatus"] as? String=="ready","retry adopts exact updated bytes and completes repair")
    try check((try Data(contentsOf:planURL))==planBytes,"confirmed plan bytes remain immutable")
    try check((try Data(contentsOf:consentURL))==consentBytes,"configuration and consent bytes remain unchanged")
    let repair=try readJSON(core.home.appendingPathComponent("setup/bridge-reprepare.json"))
    try check(repair["plan_hash"] as? String==plan["plan_hash"] as? String && repair["confirmed_hash"] as? String==plan["confirmed_hash"] as? String && repair["hooksTrusted"] as? Bool==false,"separate repair receipt preserves original confirmation and trust boundary")
    _=try core.prepareBridge(reprepare:true)
    try check((try Data(contentsOf:planURL))==planBytes,"repeat repair is idempotent without plan migration")
    try restore()
    print("BRIDGE_REPREPARE_TESTS_OK \(count)")
}
