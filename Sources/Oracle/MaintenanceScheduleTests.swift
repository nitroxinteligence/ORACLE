import Foundation

func runMaintenanceScheduleTests() throws {
    let root=try oracleTestDirectory("maintenance-schedule")
    defer{try? fm.removeItem(at:root)}
    let core=try Core(home:root.appendingPathComponent("state")),vault=root.appendingPathComponent("vault")
    try fm.createDirectory(at:vault,withIntermediateDirectories:true)
    core.config=["vault":vault.path,"fixture":true,"gbrainAccess":true];try core.persist()
    var count=0
    func check(_ value:Bool,_ label:String)throws{guard value else{throw failure(label)};count+=1;print("PASS "+label)}
    try check(try core.oracleWorkspace().lastPathComponent=="oracle-workspace","new installation uses oracle-workspace")
    let legacy=core.home.appendingPathComponent("codex-workspace")
    try writeJSON(["workspace":legacy.path],core.home.appendingPathComponent("setup/bridge.json"))
    try check(try core.oracleWorkspace()==legacy,"existing workspace receipts keep their exact trusted path")
    try fm.removeItem(at:core.home.appendingPathComponent("setup/bridge.json"))
    let status=try core.configureMaintenance(["enabled":true])
    try check(status["hour"] as? Int==15 && status["registered"] as? Bool==false,"new maintenance defaults to 15h and cannot self-register")
    let config=try readJSON(core.home.appendingPathComponent("maintenance/config.json"))
    let marker=core.maintenanceMarker(config)
    var fields=["id":"fixture-task","kind":"cron","status":"ACTIVE","model":"gpt-5.6-sol","reasoning_effort":"medium",
                "rrule":"FREQ=DAILY;BYHOUR=15;BYMINUTE=0;BYSECOND=0","prompt":marker+"\nRun only the authorized profile."]
    func encoded(_ values:[String:String])throws->String{try values.keys.sorted().map{k in k+" = "+String(decoding:try JSONSerialization.data(withJSONObject:values[k]!,options:.fragmentsAllowed),as:UTF8.self)}.joined(separator:"\n")}
    let automation=core.distributionHostHome().appendingPathComponent(".codex/automations/fixture-task/automation.toml")
    try fm.createDirectory(at:automation.deletingLastPathComponent(),withIntermediateDirectories:true)
    try atomicWriteData(Data(try encoded(fields).utf8),to:automation)
    try check(core.maintenanceHostSchedule(config)["registered"] as? Bool==true,"readback confirms matching active host schedule with exact model effort and hour")
    fields["status"]="PAUSED";try atomicWriteData(Data(try encoded(fields).utf8),to:automation)
    try check(core.maintenanceHostSchedule(config)["registered"] as? Bool==false,"paused task is never advertised as active")
    fields["status"]="ACTIVE";fields["model"]="other-model"
    try check(!OracleScheduleRecord.matches(fields,marker:marker,hour:15),"wrong model cannot satisfy registration")
    fields["model"]="gpt-5.6-sol";fields["rrule"]="FREQ=DAILY;BYHOUR=3;BYMINUTE=0;BYSECOND=0"
    try check(!OracleScheduleRecord.matches(fields,marker:marker,hour:15),"wrong hour cannot satisfy registration")
    fields["rrule"]="FREQ=DAILY;BYHOUR=15;BYMINUTE=0;BYSECOND=0"
    try check(!OracleScheduleRecord.matches(fields,marker:marker+"changed",hour:15),"changed consent invalidates stale task receipt")
    let request=try core.maintenanceScheduleRequest()
    try check(request.contains(marker)&&request.contains("gpt-5.6-sol")&&request.contains("reasoningEffort medium"),"host handoff carries consent marker and exact execution settings")
    try check(request.contains("oracle-workspace") && request.contains("hostSchedule.registered") && request.contains("Vault autorizado:"),"concise handoff binds project vault and registration readback")
    let rows:[[String:Any]]=[["model":"gpt-5.6-sol","defaultReasoningEffort":"low","supportedReasoningEfforts":[["reasoningEffort":"low"],["reasoningEffort":"medium"]]]]
    try check(try OracleCodexModel.choose(rows,preferred:"gpt-5.6-sol",preferredEffort:"medium").effort=="medium","maintenance overrides host default effort only when medium is supported")
    do{_=try OracleCodexModel.choose(rows,preferred:"missing",preferredEffort:"medium");throw failure("unexpected model fallback")}catch{try check(!error.localizedDescription.contains("unexpected"),"unavailable selected model fails without fallback")}
    print("Maintenance schedule: \(count) checks passed; isolated host fixtures only")
}
