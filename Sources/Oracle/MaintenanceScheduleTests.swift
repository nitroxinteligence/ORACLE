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
    fields["rrule"]="RRULE:FREQ=DAILY;BYHOUR=15;BYMINUTE=0"
    try atomicWriteData(Data(try encoded(fields).utf8),to:automation)
    try check(core.maintenanceHostSchedule(config)["registered"] as? Bool==true,"official Codex rule without BYSECOND confirms the existing task")
    for invalidRule in ["FREQ=DAILY;BYHOUR=15;BYMINUTE=0;BYSECOND=30","FREQ=DAILY;BYHOUR=15;BYMINUTE=30","FREQ=DAILY;BYHOUR=18;BYMINUTE=0","FREQ=WEEKLY;BYHOUR=15;BYMINUTE=0","FREQ=DAILY;BYHOUR=15;BYMINUTE=0;INTERVAL=2"] {
        var invalid=fields;invalid["rrule"]=invalidRule
        try check(!OracleScheduleRecord.matches(invalid,marker:marker,hour:15),"nonmatching recurrence stays pending: "+invalidRule)
    }
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
    let hookPath="/fixture/.codex/hooks.json",workspace="/fixture"
    let hooks:[[String:Any]]=["sessionStart","userPromptSubmit","stop"].map{["sourcePath":hookPath,"eventName":$0,"enabled":true,"trustStatus":"trusted"]}
    func response(_ rows:[[String:Any]])->[String:Any]{["data":[["cwd":workspace,"hooks":rows]]]}
    try check(OracleHookVerification.check(response(hooks),path:hookPath,workspace:workspace).trusted,"required hooks complete verification")
    try check(OracleHookVerification.check(response(hooks+[["sourcePath":hookPath,"eventName":"postToolUse","enabled":false,"trustStatus":"untrusted"]]),path:hookPath,workspace:workspace).trusted,"unrelated disabled hook does not block memory integration")
    try check(!OracleHookVerification.check(response(hooks+[["sourcePath":hookPath,"eventName":"stop","enabled":false,"trustStatus":"untrusted"]]),path:hookPath,workspace:workspace).trusted,"every required event handler must be trusted")
    try check(!OracleHookVerification.check(response(Array(hooks.dropLast())),path:hookPath,workspace:workspace).trusted,"missing required hook remains pending")
    try check(!OracleHookVerification.check(response(hooks),path:"/other/hooks.json",workspace:workspace).trusted,"other workspace hooks cannot prove trust")
    try check(!OracleHookVerification.check(response([]),path:hookPath,workspace:workspace).message.isEmpty,"unavailable hooks return an actionable message")
    let note=vault.appendingPathComponent("Pessoal/Plano com espaço.md")
    try fm.createDirectory(at:note.deletingLastPathComponent(),withIntermediateDirectories:true)
    try Data("# Nota pessoal\nNão alterar.\n".utf8).write(to:note)
    let before=try fileDigest(note),first=try core.maintainGraphIndexes()
    try check(first["notes"] as? Int==1 && first["indexes"] as? Int==2,"graph indexes link real notes through folder groups")
    try check(try fileDigest(note)==before,"graph maintenance never rewrites personal notes")
    try check(try core.maintainGraphIndexes()["changed"] as? Int==0,"unchanged graph maintenance performs no writes or duplicate indexes")
    let graph=try readJSON(core.home.appendingPathComponent("maintenance/graph-index.json"))
    let files=graph["files"] as! [String:String]
    let group=files.keys.first{!$0.hasSuffix("Mapa.md")}!
    try check(try String(contentsOf:vault.appendingPathComponent(group)).contains("Plano%20com%20espa"),"graph links URL encode actual note paths")
    try fm.removeItem(at:note);_=try core.maintainGraphIndexes()
    try check(!fm.fileExists(atPath:vault.appendingPathComponent(group).path),"removed notes retire only owned index pages")
    let map=vault.appendingPathComponent("SISTEMA/indices/oracle-graph/Mapa.md")
    try Data("Minha edição".utf8).write(to:map)
    do{_=try core.maintainGraphIndexes();throw failure("unexpected graph overwrite")}catch{try check(!error.localizedDescription.contains("unexpected"),"edited graph index is preserved as a conflict")}
    print("Maintenance schedule: \(count) checks passed; isolated host fixtures only")
}
