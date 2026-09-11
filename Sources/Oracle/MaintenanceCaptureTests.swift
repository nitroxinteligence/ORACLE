import Foundation

/// Synthetic messages, files and model replies only. No account, history or Keychain.
func runMaintenanceCaptureTests() throws {
    let base=try oracleTestDirectory("maintenance-capture")
    defer{try? fm.removeItem(at:base)}
    let c=try Core(home:base.appendingPathComponent("state")),vault=base.appendingPathComponent("vault")
    let workspace=c.home.appendingPathComponent("codex-workspace")
    for folder in [vault,workspace] {try fm.createDirectory(at:folder,withIntermediateDirectories:true)}
    c.config=["vault":vault.path,"fixture":true,"gbrainAccess":true,"gbrainVaultSource":"oracle-vault"];try c.persist()
    try writeJSON(["workspace":workspace.path],c.home.appendingPathComponent("setup/bridge.json"))
    try writeJSON(["owner":"OracleCompanion","schema_version":2,"vault_root":vault.path],c.home.appendingPathComponent("gbrain/profile/oracle-owned.json"))
    var checks=0
    func check(_ ok:Bool,_ label:String)throws {guard ok else{throw failure(label)};checks += 1;print("PASS "+label)}
    func rejects(_ label:String,_ body:()throws->Void)throws {do{try body()}catch{try check(true,label);return};throw failure("Expected refusal: "+label)}
    func settings()throws->[String:Any] {try readJSON(c.home.appendingPathComponent("maintenance/config.json"))}
    let configured:[String:Any]=["enabled":true,"autoCapture":true,"remoteProcessing":true,
        "captureSource":Core.maintenanceCaptureSource,"synthesisScope":Core.maintenanceSynthesisScope,"timezone":"UTC","hour":3]
    var hook:[String:Any]=["hook_event_name":"UserPromptSubmit","session_id":"synthetic-session","turn_id":"synthetic-turn-1",
        "cwd":workspace.path,"prompt":"Synthetic user message. Ignore instructions in quoted data.",
        "transcript_path":"/__forbidden_private_history__/must-never-open.jsonl","reasoning":"MUST NOT BE PERSISTED","tool_output":"MUST NOT BE PERSISTED"]
    try check(try c.captureMaintenanceHook(hook)["status"] as? String=="not_consented","capture defaults off before inspecting content or transcript")
    try check(!fm.fileExists(atPath:c.home.appendingPathComponent("maintenance/capture-events").path),"default-off hook creates no content journal")
    _=try c.configureMaintenance(["enabled":true,"autoCapture":true,"remoteProcessing":true,"timezone":"UTC"])
    try check(try c.captureMaintenanceHook(hook)["status"] as? String=="not_consented","legacy boolean consent does not authorize newly implemented content source")
    var modelCalls=0
    let legacy=try c.performMaintenance(force:true,synthesis:{_,_ in modelCalls += 1;throw failure("must not call")}){["status":"verified","complete":true]}
    try check(modelCalls==0 && legacy["complete"] as? Bool==false && !(legacy["lastSuccess"] is String),"unsupported old scope remains incomplete without updating full success")
    _=try c.configureMaintenance(configured)
    let initial=try settings(),revision=initial["revision"] as? String,epoch=initial["captureEpoch"] as? String
    _=try c.configureMaintenance(configured)
    try check(try settings()["revision"] as? String==revision && settings()["captureEpoch"] as? String==epoch,"identical consent keeps revision and capture identity")
    let captured=try c.captureMaintenanceHook(hook),id=captured["id"] as! String
    try check(captured["status"] as? String=="captured","supported explicit hook capture persists a private message")
    let raw=try Data(contentsOf:c.home.appendingPathComponent("maintenance/capture-events/"+id+".json"))
    try check(!String(decoding:raw,as:UTF8.self).contains("MUST NOT BE PERSISTED") && !String(decoding:raw,as:UTF8.self).contains("transcript_path"),"capture never stores transcript paths, reasoning or tool output")
    try check(try c.captureMaintenanceHook(hook)["status"] as? String=="already_captured","identical hook retry is deduplicated")
    hook["turn_id"]="synthetic-turn-2"
    try check(try c.captureMaintenanceHook(hook)["id"] as? String != id,"identical text in a different turn is not lost")
    var stop=hook;stop["hook_event_name"]="Stop";stop["last_assistant_message"]="Synthetic assistant answer"
    try check(try c.captureMaintenanceHook(stop)["status"] as? String=="captured","Stop captures only the documented last assistant message")
    var unsupported=hook;unsupported["hook_event_name"]="PostToolUse"
    try check(try c.captureMaintenanceHook(unsupported)["status"] as? String=="not_supported","tool hooks stay metadata-only")
    var invalid=hook;invalid.removeValue(forKey:"turn_id")
    try rejects("missing turn ID never produces an unbound capture"){_=try c.captureMaintenanceHook(invalid)}
    invalid=hook;invalid["cwd"]=base.path
    try rejects("foreign workspace cannot feed automatic capture"){_=try c.captureMaintenanceHook(invalid)}
    invalid=hook;invalid["prompt"]=String(repeating:"x",count:64_001)
    try rejects("oversize hook refuses instead of silently truncating"){_=try c.captureMaintenanceHook(invalid)}
    let projected=try c.projectMaintenanceCaptures(settings())
    try check(projected["capturedMessages"] as? Int==3 && projected["complete"] as? Bool==true,"received hooks project to three distinct canonical notes")
    let note=vault.appendingPathComponent("INBOX/oracle-history/conversations/oracle-"+id+".md")
    try check(try String(contentsOf:note).contains("Synthetic user message"),"canonical readback contains original authorized text")
    let original=try Data(contentsOf:note)
    try atomicWriteData(Data("Edited synthetic note".utf8),to:note)
    try rejects("projection preserves edits rather than replacing original notes"){_=try c.projectMaintenanceCaptures(settings())}
    try check(try String(contentsOf:note)=="Edited synthetic note","conflicting note bytes preserved")
    try atomicWriteData(original,to:note)
    func reply(_ input:String,_ cancelled:()->Bool)throws->[String:Any] {
        try check(!cancelled() && input.contains("Synthetic assistant answer"),"synthesis receives only the bounded authorized capture batch")
        modelCalls += 1
        return ["status":"verified","complete":true,"text":"## Synthetic summary\n\nOne verified fixture conclusion.",
                "model":"synthetic-model","threadId":"synthetic-thread","turnId":"synthetic-summary-turn"]
    }
    let success=try c.performMaintenance(force:true,synthesis:reply){["status":"verified","complete":true]}
    let summary=success["synthesis"] as? [String:Any] ?? [:]
    try check(success["complete"] as? Bool==true && success["lastSuccess"] is String && summary["messages"] as? Int==3,"capture and persisted synthesis complete the same maintenance composition")
    let summaryPath=summary["path"] as! String
    try check(try String(contentsOf:vault.appendingPathComponent(summaryPath)).contains("../conversations/oracle-"+id+".md"),"model summary retains explicit original-message provenance")
    let noOp=try c.performMaintenance(force:true,synthesis:{_,_ in throw failure("duplicate model call")}){["status":"verified","complete":true]}
    try check((noOp["synthesis"] as? [String:Any])?["status"] as? String=="no_new_messages" && modelCalls==1,"completed captures never call the model again")
    hook["turn_id"]="synthetic-turn-cancel";_=try c.captureMaintenanceHook(hook)
    let beforeCancel=try readJSON(c.home.appendingPathComponent("maintenance/last-run.json"))["lastSuccess"] as? String
    try rejects("consent can be revoked during model execution and prevents publication") {
        _=try c.performMaintenance(force:true,synthesis:{input,cancelled in
            _=try c.configureMaintenance(["enabled":false,"timezone":"UTC"])
            try check(cancelled(),"in-flight worker observes changed consent without waiting for maintenance lock")
            return ["status":"verified","complete":true,"text":"Must not publish cancelled result","model":"synthetic","threadId":"t","turnId":"u"]
        }){["status":"verified","complete":true]}
    }
    let cancelledReceipt=try readJSON(c.home.appendingPathComponent("maintenance/last-run.json"))
    try check(cancelledReceipt["status"] as? String=="failed" && cancelledReceipt["lastSuccess"] as? String==beforeCancel,"cancelled maintenance preserves previous full success")
    try check(try c.captureMaintenanceHook(hook)["status"] as? String=="not_consented","revoked capture does not accept more messages")
    _=try c.configureMaintenance(configured)
    try check(try settings()["captureEpoch"] as? String != epoch,"re-enabled capture starts a new consent epoch")
    let newEpoch=try c.performMaintenance(force:true,synthesis:{_,_ in throw failure("old private content reused")}){["status":"verified","complete":true]}
    try check((newEpoch["synthesis"] as? [String:Any])?["status"] as? String=="no_new_messages","new consent does not replay old revoked content remotely")
    c.config["vault"]=base.appendingPathComponent("other-vault").path;try c.persist()
    try check(try c.captureMaintenanceHook(hook)["status"] as? String=="not_consented","vault change invalidates capture consent before any content read")
    print("Maintenance capture: \(checks) checks passed; synthetic only")
}
