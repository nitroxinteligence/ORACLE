import Foundation
import Darwin

/// Native fixture process, launched by the same monitor contract as open -W.
/// Interface readiness is synthetic here; real WKWebView integration is separate.
func runApplicationUpdateFixtureProcess(bundle: URL) throws {
    let resources=bundle.appendingPathComponent("Contents/Resources")
    let behavior=try String(contentsOf:resources.appendingPathComponent("behavior.txt"),encoding:.utf8).trimmingCharacters(in:.whitespacesAndNewlines)
    if behavior == "old" { return }
    let receipt=URL(fileURLWithPath:try String(contentsOf:resources.appendingPathComponent("receipt.txt"),encoding:.utf8))
    if behavior == "prelaunch-crash" { _=kill(getpid(),SIGKILL);return }
    guard let launched=try OracleApplicationUpdateRecovery.beginLaunch(receipt:receipt,currentBundle:bundle) else{throw NSError(domain:"Fixture",code:1)}
    if behavior == "crash" {usleep(200_000);_=kill(getpid(),SIGKILL);return}
    if behavior == "slow" || behavior == "slow-crash" {usleep(1_500_000)}
    if behavior == "slow-crash" {_=kill(getpid(),SIGKILL);return}
    guard try OracleApplicationUpdateRecovery.confirmHealthy(receipt:receipt,currentBundle:bundle,token:launched.token,interfaceReady:true,localStateReady:true) else{throw NSError(domain:"Fixture",code:2)}
    usleep(300_000)
}

func runApplicationUpdateHealthTests(root: URL, executable: URL) throws {
    let manager=FileManager.default
    try manager.createDirectory(at:root,withIntermediateDirectories:true)
    var count=0
    func expect(_ value:Bool,_ label:String)throws {
        guard value else{throw NSError(domain:"OracleUpdateHealthTests",code:1,userInfo:[NSLocalizedDescriptionKey:label])}
        count+=1;print("PASS "+label)
    }
    func refuses(_ label:String,_ body:()throws->Void)throws {
        do{try body()}catch{count+=1;print("PASS "+label);return}
        throw NSError(domain:"OracleUpdateHealthTests",code:2,userInfo:[NSLocalizedDescriptionKey:label])
    }
    func app(_ path:URL,version:String,behavior:String,receipt:URL)throws {
        let contents=path.appendingPathComponent("Contents"),resources=contents.appendingPathComponent("Resources"),macOS=contents.appendingPathComponent("MacOS")
        try manager.createDirectory(at:resources,withIntermediateDirectories:true)
        try manager.createDirectory(at:macOS,withIntermediateDirectories:true)
        try manager.copyItem(at:executable,to:macOS.appendingPathComponent("Oracle"))
        let info:[String:Any]=["CFBundleIdentifier":"com.oraclecompanion.macos","CFBundleExecutable":"Oracle","CFBundleShortVersionString":version,"CFBundlePackageType":"APPL"]
        try PropertyListSerialization.data(fromPropertyList:info,format:.xml,options:0).write(to:contents.appendingPathComponent("Info.plist"))
        try Data(behavior.utf8).write(to:resources.appendingPathComponent("behavior.txt"))
        try Data(receipt.path.utf8).write(to:resources.appendingPathComponent("receipt.txt"))
    }
    func prepared(_ name:String,behavior:String,relocated:Bool=false)throws->(OracleApplicationUpdateJournal,URL,URL) {
        let base=root.appendingPathComponent(name),parent=base.appendingPathComponent("install"),receipt=base.appendingPathComponent("state/pending.json")
        try manager.createDirectory(at:parent,withIntermediateDirectories:true)
        try manager.createDirectory(at:receipt.deletingLastPathComponent(),withIntermediateDirectories:true)
        let token=UUID().uuidString.lowercased(),current=parent.appendingPathComponent("Oracle.app")
        let original=relocated ? base.appendingPathComponent("admin/Oracle.app") : current
        let replacement=parent.appendingPathComponent(".Oracle.update-"+token+".app"),backup=parent.appendingPathComponent(".Oracle.backup-"+token+".app")
        try app(original,version:"1.0.0",behavior:"old",receipt:receipt)
        try app(replacement,version:"2.0.0",behavior:behavior,receipt:receipt)
        if relocated {try manager.copyItem(at:original,to:backup)}
        let record=OracleApplicationUpdateJournal(schemaVersion:2,token:token,version:"2.0.0",previousVersion:"1.0.0",current:current.path,original:original.path,
            replacement:replacement.path,backup:backup.path,phase:.prepared,launchPID:nil,changedAt:"fixture")
        try OracleApplicationUpdateRecovery.write(record,to:receipt)
        let launcher=base.appendingPathComponent("fixture-launcher.sh")
        try Data("#!/bin/sh\nfor arg do app=\"$arg\"; done\nexec \"$app/Contents/MacOS/Oracle\" --fixture-app \"$app\"\n".utf8).write(to:launcher)
        try manager.setAttributes([.posixPermissions:0o755],ofItemAtPath:launcher.path)
        return(record,receipt,launcher)
    }
    func startMonitor(_ record:OracleApplicationUpdateJournal,receipt:URL,launcher:URL,ticks:Int=50)throws->Process {
        let process=Process();process.executableURL=URL(fileURLWithPath:"/bin/sh")
        // This PID is known not to exist; no installed or personal app is closed.
        process.arguments=["-c",OracleApplicationUpdateRecovery.helperScript,"fixture-updater","2147483647",record.current,record.replacement,record.backup,receipt.path,record.token,record.original,launcher.path,String(ticks)]
        process.environment=["PATH":"/usr/bin:/bin:/usr/sbin:/sbin","HOME":root.path]
        process.standardOutput=FileHandle.nullDevice;process.standardError=FileHandle.nullDevice
        try process.run();return process
    }
    func monitor(_ record:OracleApplicationUpdateJournal,receipt:URL,launcher:URL,ticks:Int=50)throws->Int32 {
        let process=try startMonitor(record,receipt:receipt,launcher:launcher,ticks:ticks)
        process.waitUntilExit();return process.terminationStatus
    }
    let (healthy,healthyReceipt,healthyLauncher)=try prepared("healthy",behavior:"healthy")
    try expect(try monitor(healthy,receipt:healthyReceipt,launcher:healthyLauncher)==0,"monitor accepts explicit native fixture health handshake")
    let healthyRecord=try OracleApplicationUpdateRecovery.read(healthyReceipt)
    try expect(healthyRecord?.phase == .healthy,"journal reaches healthy after launch")
    try expect(OracleApplicationUpdateRecovery.version(at:healthy.backupURL)=="1.0.0","previous app stays recoverable after health")
    try expect(try OracleApplicationUpdateRecovery.read(healthyReceipt.deletingLastPathComponent().appendingPathComponent("last-known-good.json"))?.token==healthy.token,"last-known-good records the recovery copy")
    try OracleApplicationUpdateRecovery.recoverAbandoned(receipt:healthyReceipt,currentBundle:healthy.target)
    try expect(manager.fileExists(atPath:healthy.backup),"matching installed version never deletes known-good backup")
    let nextToken=UUID().uuidString.lowercased(),nextParent=healthy.target.deletingLastPathComponent()
    let next=OracleApplicationUpdateJournal(schemaVersion:2,token:nextToken,version:"3.0.0",previousVersion:"2.0.0",current:healthy.current,original:healthy.current,
        replacement:nextParent.appendingPathComponent(".Oracle.update-"+nextToken+".app").path,backup:nextParent.appendingPathComponent(".Oracle.backup-"+nextToken+".app").path,
        phase:.prepared,launchPID:nil,changedAt:"fixture")
    try app(next.replacementURL,version:"3.0.0",behavior:"healthy",receipt:healthyReceipt)
    try OracleApplicationUpdateRecovery.write(next,to:healthyReceipt)
    try expect(manager.fileExists(atPath:healthy.backup),"preparing next update retains previous known-good app")
    try expect(try monitor(next,receipt:healthyReceipt,launcher:healthyLauncher)==0,"next update reaches verified health")
    try expect(OracleApplicationUpdateRecovery.version(at:next.backupURL)=="2.0.0" && !manager.fileExists(atPath:healthy.backup),"only next verified update rotates last-known-good backup")

    for behavior in ["crash","prelaunch-crash"] {
        let (record,receipt,launcher)=try prepared(behavior,behavior:behavior)
        try expect(try monitor(record,receipt:receipt,launcher:launcher)==26,"real native fixture termination triggers rollback: "+behavior)
        try expect(OracleApplicationUpdateRecovery.version(at:record.target)=="1.0.0","previous app restored on disk: "+behavior)
        try expect(try OracleApplicationUpdateRecovery.read(receipt)?.phase == .rolledBack,"crash journal records recovery: "+behavior)
        try expect(manager.fileExists(atPath:record.backup) && manager.fileExists(atPath:record.failedURL.path),"rollback preserves previous and failed app evidence: "+behavior)
    }
    let (interrupted,interruptedReceipt,interruptedLauncher)=try prepared("interrupted-swap",behavior:"healthy")
    try manager.moveItem(at:interrupted.target,to:interrupted.backupURL)
    try expect(try monitor(interrupted,receipt:interruptedReceipt,launcher:interruptedLauncher)==0,"interrupted swap resumes safely with previous bundle retained")
    let (slow,slowReceipt,slowLauncher)=try prepared("slow",behavior:"slow")
    let slowMonitor=try startMonitor(slow,receipt:slowReceipt,launcher:slowLauncher,ticks:1)
    usleep(600_000)
    try expect(slowMonitor.isRunning,"live slow process remains watched beyond patience threshold without forced rollback")
    try expect(OracleApplicationUpdateRecovery.version(at:slow.target)=="2.0.0" && manager.fileExists(atPath:slow.backup),"pending health keeps new app and recovery copy")
    slowMonitor.waitUntilExit()
    try expect(slowMonitor.terminationStatus==0 && (try OracleApplicationUpdateRecovery.read(slowReceipt))?.phase == .healthy,"slow fixture confirms health after reduced-frequency monitoring")
    let (lateCrash,lateReceipt,lateLauncher)=try prepared("slow-crash",behavior:"slow-crash")
    try expect(try monitor(lateCrash,receipt:lateReceipt,launcher:lateLauncher,ticks:1)==26,"watcher restores app after crash beyond initial patience threshold")
    try expect(OracleApplicationUpdateRecovery.version(at:lateCrash.target)=="1.0.0","late crash recovery restores previous app on disk")

    let (relocated,relocatedReceipt,relocatedLauncher)=try prepared("relocation",behavior:"healthy",relocated:true)
    try expect(try monitor(relocated,receipt:relocatedReceipt,launcher:relocatedLauncher)==0,"explicit relocation launches update in new target")
    try expect(OracleApplicationUpdateRecovery.version(at:URL(fileURLWithPath:relocated.original))=="1.0.0" && OracleApplicationUpdateRecovery.version(at:relocated.target)=="2.0.0","relocation preserves admin original while new destination becomes healthy")

    let (unverified,unverifiedReceipt,_)=try prepared("unverified",behavior:"healthy")
    try manager.moveItem(at:unverified.target,to:unverified.backupURL)
    try manager.moveItem(at:unverified.replacementURL,to:unverified.target)
    try OracleApplicationUpdateRecovery.recoverAbandoned(receipt:unverifiedReceipt,currentBundle:unverified.target)
    try expect(manager.fileExists(atPath:unverified.backup) && manager.fileExists(atPath:unverifiedReceipt.path),"installed version alone cannot finalize prepared update")
    let launch=try OracleApplicationUpdateRecovery.beginLaunch(receipt:unverifiedReceipt,currentBundle:unverified.target)
    try expect(launch?.phase == .launched,"first new process enters launched before interface health")
    try expect(try !OracleApplicationUpdateRecovery.confirmHealthy(receipt:unverifiedReceipt,currentBundle:unverified.target,token:unverified.token,interfaceReady:false,localStateReady:true),"local state alone cannot confirm health")
    try expect(try !OracleApplicationUpdateRecovery.confirmHealthy(receipt:unverifiedReceipt,currentBundle:unverified.target,token:unverified.token,interfaceReady:true,localStateReady:false),"interface alone cannot confirm local health")
    try expect(try !OracleApplicationUpdateRecovery.confirmHealthy(receipt:unverifiedReceipt,currentBundle:unverified.target,token:UUID().uuidString,interfaceReady:true,localStateReady:true),"unrelated handshake token cannot confirm health")

    var stale=try OracleApplicationUpdateRecovery.read(unverifiedReceipt)!
    stale.launchPID=Int32.max
    try OracleApplicationUpdateRecovery.write(stale,to:unverifiedReceipt)
    let recovered=try OracleApplicationUpdateRecovery.beginLaunch(receipt:unverifiedReceipt,currentBundle:unverified.target)
    try expect(recovered?.rolledBack==true && OracleApplicationUpdateRecovery.version(at:unverified.target)=="1.0.0","subsequent launch recovers stale crashed update without new UI")
    try expect(try OracleApplicationUpdateRecovery.beginLaunch(receipt:unverifiedReceipt,currentBundle:unverified.target)==nil,"restored app does not relaunch repeatedly from historical rollback receipt")

    let (legacy,legacyReceipt,_)=try prepared("legacy",behavior:"healthy")
    try manager.moveItem(at:legacy.target,to:legacy.backupURL)
    try manager.moveItem(at:legacy.replacementURL,to:legacy.target)
    try JSONSerialization.data(withJSONObject:["schema_version":1,"version":legacy.version,"current":legacy.current,"replacement":legacy.replacement,"backup":legacy.backup]).write(to:legacyReceipt)
    try expect(try OracleApplicationUpdateRecovery.read(legacyReceipt)?.phase == .prepared,"legacy receipt migration does not infer health from version")
    try expect(try OracleApplicationUpdateRecovery.beginLaunch(receipt:legacyReceipt,currentBundle:legacy.target)?.phase == .launched,"legacy pending update retains backup and enters health protocol")

    let invalid=root.appendingPathComponent("oversized.json")
    try Data(repeating:32,count:16_385).write(to:invalid)
    try refuses("oversized health receipt rejected"){_=try OracleApplicationUpdateRecovery.read(invalid)}
    let forged=root.appendingPathComponent("forged.json")
    var object=try JSONSerialization.jsonObject(with:JSONEncoder().encode(healthy)) as! [String:Any]
    object["backup"]="/Applications/Other.app"
    try JSONSerialization.data(withJSONObject:object).write(to:forged)
    try refuses("receipt cannot redirect recovery outside prepared siblings"){_=try OracleApplicationUpdateRecovery.read(forged)}
    print("Application update health: \(count) checks; synthetic native apps and launcher, no Launch Services or personal profile")
}
