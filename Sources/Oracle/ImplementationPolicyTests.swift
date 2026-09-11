import Foundation

/// Synthetic fixtures only; no engine, account, Keychain or scheduler access.
func runImplementationPolicyTests() throws {
    let base=try oracleTestDirectory("oracle-policy")
    defer{try? fm.removeItem(at:base)}
    let c=try Core(home:base.appendingPathComponent("state")),vault=base.appendingPathComponent("vault")
    try fm.createDirectory(at:vault,withIntermediateDirectories:true)
    c.config["vault"]=vault.path;c.config["fixture"]=true;c.config["gbrainAccess"]=true;try c.persist()
    var checks=[String]()
    func expect(_ ok:Bool,_ name:String) throws {guard ok else{throw failure(name)};checks.append(name);print("PASS \(name)")}
    func rejects(_ name:String,_ op:() throws -> Void) throws {do{try op()}catch{checks.append(name);print("PASS \(name)");return};throw failure("Did not reject: "+name)}
    let atomicFolder=base.appendingPathComponent("atomic")
    try fm.createDirectory(at:atomicFolder,withIntermediateDirectories:true)
    let atomic=atomicFolder.appendingPathComponent("document.md"),bytes=Data("original".utf8)
    try atomicWriteData(bytes,to:atomic,permissions:0o640)
    try expect(try Data(contentsOf:atomic)==bytes,"atomic sibling publishes complete original bytes")
    try atomicWriteData(Data(),to:atomic)
    try expect(try Data(contentsOf:atomic).isEmpty && (fm.attributesOfItem(atPath:atomic.path)[.posixPermissions] as? NSNumber)?.intValue==0o640,"atomic replacement preserves mode and supports empty data")
    let alias=atomicFolder.appendingPathComponent("alias.md")
    try fm.createSymbolicLink(at:alias,withDestinationURL:atomic)
    try rejects("atomic writes refuse symbolic-link destinations"){try atomicWriteData(bytes,to:alias)}
    try fm.removeItem(at:alias);try fm.linkItem(at:atomic,to:alias)
    try rejects("atomic writes refuse hard-linked destinations"){try atomicWriteData(bytes,to:alias)}
    try fm.removeItem(at:alias)
    try expect(try Data(contentsOf:atomic).isEmpty,"rejected atomic writes preserve original bytes")
    try expect(try fm.contentsOfDirectory(atPath:atomicFolder.path)==["document.md"],"atomic writes leave no temporary siblings")
    let unreadable=vault.appendingPathComponent("unreadable")
    try fm.createDirectory(at:unreadable,withIntermediateDirectories:true)
    try fm.setAttributes([.posixPermissions:0o000],ofItemAtPath:unreadable.path)
    defer{try? fm.setAttributes([.posixPermissions:0o700],ofItemAtPath:unreadable.path)}
    try rejects("incomplete vault traversal is not presented as a complete empty scan"){_=try c.scan(root:vault)}
    try fm.setAttributes([.posixPermissions:0o700],ofItemAtPath:unreadable.path);try fm.removeItem(at:unreadable)
    let model:[String:Any]=["model":"fixture-model","displayName":"Fixture","isDefault":true,"defaultReasoningEffort":"low","supportedReasoningEfforts":[["reasoningEffort":"low"]],"inputModalities":["text"]]
    try expect(try OracleCodexModel.choose([model]).id=="fixture-model","account model and advertised effort selected")
    var incompatible=model;incompatible["defaultReasoningEffort"]="unsupported"
    try rejects("unsupported model effort refused"){_=try OracleCodexModel.choose([incompatible])}
    var hidden=model;hidden["hidden"]=true
    try rejects("hidden model refused"){_=try OracleCodexModel.choose([hidden],preferred:"fixture-model")}
    try rejects("missing preferred model refused"){_=try OracleCodexModel.choose([model],preferred:"absent")}
    var second=model;second["model"]="second";second["isDefault"]=false
    var first=model;first["isDefault"]=false
    try rejects("ambiguous models require selection"){_=try OracleCodexModel.choose([first,second])}
    try expect(try OracleCodexModel.choose([first,second],preferred:"second").id=="second","explicit account model resolves ambiguity")
    let known:[[String:Any]]=[["id":"skills","status":"available","version":"2"]]
    let failed=OracleUpdateLedger.reconcile(previous:known,results:[["id":"skills","status":"error","message":"offline"]])
    try expect(OracleUpdateLedger.installable(failed) && failed.first?["recheckError"] as? String=="offline","offline preserves known update")
    try expect(OracleUpdateLedger.reconcile(previous:failed,results:[["id":"skills","status":"updated"]]).isEmpty,"verified installation clears update")
    try expect(OracleUpdateLedger.hasNews([["id":"gbrain","status":"compatibility_required"]]),"compatibility-pending release stays visible")
    let answers=["AGENT_NAME":"Fixture","PRINCIPAL_NAME":"Synthetic Person","AGENT_PURPOSE":"Synthetic test","AGENT_TOP_JOBS":"Verify fixtures","PRINCIPAL_CONTEXT":"No real data","VOICE_REGISTER":"Direct","PRINCIPAL_TIMEZONE":"UTC"]
    let plan=try c.makePlan(answers:answers,isNew:true,attach:false,maintenance:["enabled":false,"timezone":"UTC","hour":3])
    let folders=plan["folders"] as? [String] ?? []
    try expect(!folders.contains(where:{$0.hasPrefix("SISTEMA/skills/")}) && folders.contains("SISTEMA/prompts"),"new onboarding creates functional core without optional packages")
    try writeJSON(["schemaVersion":1,"status":"review","legacyAccess":true,"runID":plan["id"]!],c.onboardingURL)
    let snapshot=try c.onboardingSnapshot()
    try expect((snapshot["reviewPlan"] as? [String:Any])?["plan_hash"] as? String==plan["plan_hash"] as? String,"review recovers matching plan")
    try expect(snapshot["status"] as? String=="review" && (snapshot["confirmed"] as? [[String:Any]])?.isEmpty==true,"review plan is not an executed installation")
    try writeJSON(["status":"awaiting_readback_confirmation","plan_hash":plan["plan_hash"]!,"upstream_hash":"fixture","readback":"Fixture readback"],c.home.appendingPathComponent("setup/gbrain-readback.json"))
    try expect(try c.onboardingSnapshot()["readback"] is [String:Any],"current plan exposes its own identity readback")
    var changedRun=c.onboardingRecord();changedRun["runID"]=NSNull();try writeJSON(changedRun,c.onboardingURL)
    try expect(try c.onboardingSnapshot()["readback"]==nil,"changed source or discarded run cannot expose an old identity readback")
    let formatter=ISO8601DateFormatter()
    func date(_ v:String)->Date {formatter.date(from:v)!}
    let utc=TimeZone(secondsFromGMT:0)!
    try expect(OracleMaintenancePolicy.due(now:date("2026-09-11T05:00:00Z"),lastSuccess:nil,createdAt:date("2026-09-10T12:00:00Z"),timeZone:utc,hour:3),"daily maintenance catches up once")
    try expect(!OracleMaintenancePolicy.due(now:date("2026-09-11T05:00:00Z"),lastSuccess:date("2026-09-11T03:10:00Z"),createdAt:date("2026-09-10T12:00:00Z"),timeZone:utc,hour:3),"successful daily period is not duplicated")
    try expect(!OracleMaintenancePolicy.due(now:date("2026-09-11T05:00:00Z"),lastSuccess:nil,createdAt:date("2026-09-11T04:00:00Z"),timeZone:utc,hour:3),"new consent does not backfill earlier periods")
    let ny=TimeZone(identifier:"America/New_York")!
    try expect(OracleMaintenancePolicy.due(now:date("2026-03-08T07:05:00Z"),lastSuccess:nil,createdAt:date("2026-03-07T00:00:00Z"),timeZone:ny,hour:3),"DST maintenance uses local wall-clock hour")
    try rejects("invalid timezone refused"){_=try c.configureMaintenance(["enabled":true,"timezone":"invalid/fixture"])}
    let configured=try c.configureMaintenance(["enabled":true,"timezone":"UTC","hour":3])
    let repeated=try c.configureMaintenance(["enabled":true,"timezone":"UTC","hour":3])
    try expect(configured["id"] as? String==repeated["id"] as? String,"maintenance identity is stable")
    try expect(configured["scheduleState"] as? String=="pending_host_registration","schedule preparation is not registration")
    c.config["gbrainWorkspace"]=base.appendingPathComponent("external").path;try c.persist()
    try expect(try c.maintenanceSnapshot()["enabled"] as? Bool==false,"external selection pauses formerly enabled local maintenance")
    try rejects("external selection cannot reuse local scheduling request"){_=try c.maintenanceScheduleRequest()}
    c.config.removeValue(forKey:"gbrainWorkspace");try c.persist()
    for status in ["unconfigured","external_preserved","blocked","verified"] {
        let result=try c.performMaintenance(force:true){["status":status,"complete":false]}
        try expect(result["status"] as? String=="blocked" && result["executed"] as? Bool==false,"incomplete \(status) is not maintenance success")
    }
    let held=try c.acquireOperationLock("setup")
    try rejects("maintenance excludes concurrent setup"){_=try c.performMaintenance(force:true){throw failure("must not start")}}
    var bridgeLockRejected=false
    do{_=try c.prepareBridge()}catch{bridgeLockRejected=error.localizedDescription.contains("Configuração em andamento")}
    try expect(bridgeLockRejected,"bridge preparation owns setup lock before reading or writing method files")
    c.releaseOperationLock(held)
    let heldBrain=try c.acquireOperationLock("gbrain")
    bridgeLockRejected=false
    do{_=try c.prepareBridge()}catch{bridgeLockRejected=error.localizedDescription.contains("Configuração em andamento")}
    c.releaseOperationLock(heldBrain)
    try expect(bridgeLockRejected,"bridge preparation excludes a concurrent memory writer")
    let success=try c.performMaintenance(force:true,backup:{throw failure("unconsented backup must not run")}){["status":"verified","complete":true]}
    try expect(success["status"] as? String=="local_complete" && success["lastSuccess"] is String && success["complete"] as? Bool==true,"local success completes only the consented available phases")
    try expect((success["backup"] as? [String:Any])?["status"] as? String=="not_consented","maintenance never implicitly opts into backup")
    c.config["gbrainVaultSource"]="oracle-vault";try c.persist()
    try writeJSON(["owner":"OracleCompanion","schema_version":2,"vault_root":vault.path],c.home.appendingPathComponent("gbrain/profile/oracle-owned.json"))
    _=try c.configureGBrainBackupConsent(enabled:true)
    var backedUp=false
    let withBackup=try c.performMaintenance(force:true,backup:{
        let writer=try c.acquireOperationLock("gbrain");defer{c.releaseOperationLock(writer)}
        backedUp=true;return ["status":"backup_verified","complete":true,"integrity_verified":true]
    }) {
        let writer=try c.acquireOperationLock("gbrain");defer{c.releaseOperationLock(writer)}
        return ["status":"verified","complete":true]
    }
    try expect(backedUp && withBackup["complete"] as? Bool==true,"consented backup runs after sync releases the writer lock")
    let lastSuccess=withBackup["lastSuccess"] as? String
    try rejects("backup failure prevents maintenance success"){_=try c.performMaintenance(force:true,backup:{throw failure("synthetic backup failure")}){["status":"verified","complete":true]}}
    let failedMaintenance=try readJSON(c.home.appendingPathComponent("maintenance/last-run.json"))
    try expect(failedMaintenance["status"] as? String=="failed" && failedMaintenance["complete"] as? Bool==false && failedMaintenance["lastSuccess"] as? String==lastSuccess,"failed backup preserves the previous success and a failed receipt")
    try rejects("incomplete backup receipt cannot complete maintenance"){_=try c.performMaintenance(force:true,backup:{["status":"backup_verified","complete":false]}){["status":"verified","complete":true]}}
    _=try c.configureGBrainBackupConsent(enabled:false)
    _=try c.configureMaintenance(["enabled":true,"timezone":"UTC","hour":3,"autoCapture":true,"remoteProcessing":true])
    let deferred=try c.performMaintenance(force:true){["status":"verified","complete":true]}
    try expect(deferred["complete"] as? Bool==false && (deferred["deferred"] as? [String])?.count==2,"unsupported consented capture and synthesis remain explicitly incomplete")
    try expect(try c.maintenanceSnapshot()["registered"] as? Bool==false,"local execution never confirms host registration")
    _=try c.configureMaintenance(["enabled":false,"timezone":"UTC","hour":3])
    let paused=try c.performMaintenance(force:true){throw failure("must not run")}
    try expect(paused["status"] as? String=="disabled","pause takes precedence over force")
    _=try c.configureMaintenance(["enabled":true,"timezone":"UTC","hour":3])
    let other=base.appendingPathComponent("other-vault");try fm.createDirectory(at:other,withIntermediateDirectories:true)
    c.config["vault"]=other.path;try c.persist()
    let changed=try c.maintenanceSnapshot()
    try expect(changed["enabled"] as? Bool==false && (changed["lastRun"] as? [String:Any])?.isEmpty==true,"vault change invalidates consent and success display")
    try rejects("changed vault cannot reuse schedule request"){_=try c.maintenanceScheduleRequest()}
    print("IMPLEMENTATION_POLICY_RECEIPT "+String(decoding:try jsonData(["checks":checks,"count":checks.count,"synthetic":true]),as:UTF8.self))
}
