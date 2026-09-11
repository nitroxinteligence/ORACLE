import Foundation
import CryptoKit

func runOnboardingTests() throws {
    var count=0
    func check(_ condition:Bool,_ label:String)throws{guard condition else{throw failure("Onboarding test failed: "+label)};count+=1;print("PASS "+label)}
    func rejects(_ body:()throws->Void,_ label:String)throws{do{try body();throw failure("Unexpected acceptance: "+label)}catch{if error.localizedDescription.hasPrefix("Unexpected acceptance:"){throw error};count+=1;print("PASS "+label)}}
    let key=Curve25519.Signing.PrivateKey(),id="test-only",device=UUID().uuidString,now=Int64(10000)
    let keys=LicenseKeys(version:1,keys:[id:key.publicKey.rawRepresentation.base64EncodedString()])
    func issue(subject:String="Fixture",expiry:Int64?=20000,deviceID:String?=nil,issued:Int64=9000,signer:Curve25519.Signing.PrivateKey?=nil)throws->String{
        let p=OracleLicense(version:1,product:"oracle-macos",keyID:id,licenseID:UUID().uuidString,subject:subject,issuedAt:issued,expiresAt:expiry,deviceID:deviceID)
        let bytes=try JSONEncoder().encode(p),sig=try (signer ?? key).signature(for:Data("ORACLE1.".utf8)+bytes)
        return "ORACLE1."+base64URL(bytes)+"."+base64URL(sig)
    }
    let code=try issue()
    try check(try validateLicense(code,keys:keys,device:device,now:now).subject=="Fixture","signed valid code")
    try check(try validateLicense(" \n"+code+"\n",keys:keys,device:device,now:now).subject=="Fixture","outer whitespace is accepted")
    try rejects({_ = try validateLicense("WRONG",keys:keys,device:device,now:now)},"invalid code")
    var parts=code.split(separator:".").map(String.init);let data=decodeBase64URL(parts[1])!;let altered=String(decoding:data,as:UTF8.self).replacingOccurrences(of:"Fixture",with:"Changed");parts[1]=base64URL(Data(altered.utf8))
    try rejects({_ = try validateLicense(parts.joined(separator:"."),keys:keys,device:device,now:now)},"tampered payload")
    try rejects({_ = try validateLicense(try issue(signer:Curve25519.Signing.PrivateKey()),keys:keys,device:device,now:now)},"untrusted signer")
    try rejects({_ = try validateLicense(try issue(expiry:9999),keys:keys,device:device,now:now)},"expired code")
    try rejects({_ = try validateLicense(try issue(deviceID:UUID().uuidString),keys:keys,device:device,now:now)},"different device")
    try check(try validateLicense(try issue(deviceID:device),keys:keys,device:device,now:now).deviceID==device,"device-bound code")
    try rejects({_ = try validateLicense(try issue(issued:12000),keys:keys,device:device,now:now)},"clock before issue")
    try rejects({_ = try validateLicense(code,keys:LicenseKeys(version:1,keys:[:]),device:device,now:now)},"removed public key")
    try check(try validateLicense(try issue(expiry:nil),keys:keys,device:device,now:now).expiresAt==nil,"non-expiring code")
    let apps:[[String:Any]]=[["id":"real","name":"Real","isAccessible":true,"isEnabled":true],["id":"off","name":"Off","isAccessible":true,"isEnabled":false],["id":"catalog","name":"Catalog","isAccessible":false,"isEnabled":true]]
    let plugins:[[String:Any]]=[["id":"skills","name":"Skills","installed":true,"enabled":true],["id":"mcp","name":"MCP","installed":true,"enabled":true],["id":"uninstalled","name":"No","installed":false,"enabled":true]]
    let inventory=CodexBridge.projectInventory(apps:apps,runtime:[["id":"real","enabled":true,"callable":true],["id":"off","enabled":false,"callable":true]],packages:plugins,servers:[["pluginId":"mcp","runtimeStatus":"connected","tools":["read":[:]]]])
    let rows=inventory["plugins"] as! [[String:Any]]
    try check(rows.filter{$0["status"] as? String=="connected"}.count==2,"connected requires runtime evidence")
    try check(!rows.contains{$0["id"] as? String=="catalog" || $0["id"] as? String=="uninstalled"},"catalog availability is not installation")
    try check(rows.first{$0["id"] as? String=="skills"}?["status"] as? String=="installed","skill package is not a connected app")
    try check(rows.first{$0["id"] as? String=="off"}?["status"] as? String=="unavailable","disabled app is not connected")
    let unknown=CodexBridge.projectInventory(apps:apps,runtime:[],packages:plugins,servers:[["pluginId":"mcp","runtimeStatus":NSNull(),"tools":["read":[:]],"authStatus":"bearerToken"]])
    try check(!(unknown["plugins"] as! [[String:Any]]).contains{$0["status"] as? String=="connected"},"cached MCP tools and accessible metadata do not prove runtime connection")
    try check(PluginIconLoader.catalogURL("https://files.openai.com/content?id=fixture") != nil,"official catalog icon origin accepted")
    try check(PluginIconLoader.catalogURL("http://127.0.0.1/private") == nil && PluginIconLoader.catalogURL("file:///etc/passwd") == nil,"local and insecure icon URLs rejected")
    try check(PluginIconLoader.catalogURL("https://files.openai.com.attacker.example/a.png") == nil && PluginIconLoader.catalogURL("https://user@files.openai.com/a.png") == nil,"lookalike and credential-bearing icon URLs rejected")
    let branded=CodexBridge.projectInventory(apps:[["id":"github","name":"GitHub","isAccessible":true,"isEnabled":true,"pluginDisplayNames":["Analytics","GitHub"]]],runtime:[],packages:[["interface":["displayName":"Analytics","logoUrl":"https://files.openai.com/analytics.png"]],["interface":["displayName":"GitHub","logoUrl":"https://files.openai.com/github.png"]]],servers:[])
    try check((branded["plugins"] as? [[String:Any]])?.first?["iconURL"] as? String=="https://files.openai.com/github.png","dependent plugin artwork never replaces app identity")
    let lightOnly=CodexBridge.projectInventory(apps:[["id":"canva","name":"Canva","isAccessible":true,"isEnabled":true,"iconUrlDark":NSNull(),"iconUrl":"https://files.openai.com/canva.png"]],runtime:[],packages:[],servers:[])
    try check((lightOnly["plugins"] as? [[String:Any]])?.first?["iconURL"] as? String=="https://files.openai.com/canva.png","null dark artwork falls back to the app original")
    let home=try oracleTestDirectory("OracleOnboarding");defer{try? fm.removeItem(at:home)}
    let core=try Core(home:home);let snapshot=try core.onboardingSnapshot()
    try check(snapshot["legacyAccess"] as? Bool==false && snapshot["licensed"] as? Bool==false,"new profile is locked")
    core.config["vault"]=home.appendingPathComponent("vault").path;try core.persist()
    try check(!core.onboardingLegacyAccess(),"picking a vault cannot bypass activation")
    let controller=try OnboardingController(home:home)
    try rejects({try controller.selectVault(home)},"unlicensed selection denied")
    try rejects({_ = try controller.install("forged")},"unlicensed install denied")
    try atomicWriteData(Data("cancel".utf8),to:home.appendingPathComponent("onboarding/cancel"))
    try rejects({try core.checkOnboardingCancellation()},"cancel marker stops deterministic phases")
    try check(try core.onboardingProgress().isEmpty,"no progress before verified run")
    let legacyHome=home.appendingPathComponent("legacy"),legacy=try Core(home:legacyHome);legacy.config["vault"]=home.path;try legacy.persist()
    try check(try legacy.onboardingSnapshot()["legacyAccess"] as? Bool==true,"existing personal profile is preserved")
    print("Onboarding: \(count) checks passed")
}

private final class FixtureCodex:CodexConnection {
    var onNotification:((String,[String:Any])->Void)?,onRequest:((Any,String,[String:Any])->Void)?,onDisconnect:(()->Void)?
    var isRunning=false,version="fixture",calls=[String](),replies=[[String:Any]](),denied=false,turn="",thread=UUID().uuidString
    func start(cwd:URL)throws{isRunning=true}
    func request(_ method:String,_ params:[String:Any],timeout:Double)throws->[String:Any]{
        calls.append(method)
        switch method {
        case "model/list":return ["data":[["model":"fixture-model","displayName":"Fixture","isDefault":true,"hidden":false,"defaultReasoningEffort":"low","supportedReasoningEfforts":[["reasoningEffort":"low"]]]],"nextCursor":NSNull()]
        case "thread/start","thread/resume":return ["thread":["id":thread,"turns":[]]]
        case "turn/start":turn=UUID().uuidString;return ["turn":["id":turn,"status":"inProgress"]]
        case "turn/interrupt":onNotification?("turn/completed",["threadId":thread,"turn":["id":turn,"status":"interrupted"]]);return [:]
        default:return [:]
        }
    }
    func account()throws->[String:Any]{["connected":true]}
    func reply(id:Any,result:[String:Any])throws{replies.append(result)}
    func reject(id:Any){denied=true}
    func inventory(threadID:String?)->[String:Any]{["status":"available","plugins":[]]}
    func stop(){isRunning=false}
}
func runOnboardingLifecycleTests() throws {
    var count=0
    func check(_ condition:Bool,_ label:String)throws{guard condition else{throw failure("Lifecycle test failed: "+label)};count+=1;print("PASS "+label)}
    let home=try oracleTestDirectory("OracleLifecycle");defer{try? fm.removeItem(at:home)}
    let vault=home.appendingPathComponent("vault").resolvingSymlinksInPath();try fm.createDirectory(at:vault,withIntermediateDirectories:true)
    let c=try Core(home:home);c.config["vault"]=vault.path;c.config["gbrainWorkspace"]=home.appendingPathComponent("existing-brain").path;try c.persist()
    let fake=FixtureCodex(),controller=try OnboardingController(home:home,bridge:fake,automaticallyReconnect:false)
    try controller.selectVault(vault)
    try check(try controller.core.vault().path==vault.path,"selected vault permission survives readback")
    let denied=home.appendingPathComponent("permission-denied");try fm.createDirectory(at:denied,withIntermediateDirectories:true);try fm.setAttributes([.posixPermissions:0o000],ofItemAtPath:denied.path)
    var accepted=false;do {try controller.selectVault(denied);accepted=true}catch{}
    try check(!accepted && controller.core.config["vault"] as? String==vault.path,"permission denial preserves selected vault");try fm.setAttributes([.posixPermissions:0o700],ofItemAtPath:denied.path)
    let linked=home.appendingPathComponent("linked-vault");try fm.createSymbolicLink(at:linked,withDestinationURL:vault)
    accepted=false;do {try controller.selectVault(linked);accepted=true}catch{}
    try check(!accepted && controller.core.config["vault"] as? String==vault.path,"symlink cannot widen vault access")
    let existing=home.appendingPathComponent("existing-brain");try fm.createDirectory(at:existing,withIntermediateDirectories:true)
    try controller.selectExistingBrain(existing)
    try check(controller.core.config["gbrainWorkspace"] as? String==existing.path,"external brain selection stores only chosen path")
    let held=try controller.core.acquireOperationLock("gbrain")
    accepted=false;do{try controller.selectExistingBrain(existing);accepted=true}catch{}
    controller.core.releaseOperationLock(held)
    try check(!accepted,"external source cannot change during active GBrain operation")
    _=try controller.connect();let plan=try controller.plan(["attach":true,"newVault":true,"answers":[:]])
    _=try controller.install(plan["plan_hash"] as! String)
    try check(controller.core.onboardingRecord()["status"] as? String=="running","Codex acknowledged start")
    try check(fake.calls.contains("thread/start") && fake.calls.contains("turn/start"),"skill executes through real protocol entrypoints")
    let thread=fake.thread,turn=fake.turn
    fake.onRequest?(12,"item/commandExecution/requestApproval",["threadId":thread,"turnId":turn,"command":"fixture --verify","reason":"Fixture permission"]);controller.notifications.sync{}
    let request=controller.core.onboardingRecord()["request"] as! [String:Any]
    try check(controller.core.onboardingRecord()["status"] as? String=="waiting_user","permission remains pending")
    fake.onRequest?(120,"item/commandExecution/requestApproval",["threadId":thread,"turnId":turn,"command":"fixture second"]);controller.notifications.sync{}
    try check(controller.core.onboardingRecord()["pendingRequestCount"] as? Int==2,"two overlapping requests remain queued")
    try check((controller.core.onboardingRecord()["request"] as? [String:Any])?["id"] as? String==request["id"] as? String,"second request does not replace first")
    try controller.answerRequest(["id":request["id"]!,"allow":false])
    try check(fake.replies.last?["decision"] as? String=="decline","denial sent to Codex")
    let second=controller.core.onboardingRecord()["request"] as! [String:Any]
    try check(second["id"] as? String != request["id"] as? String && controller.core.onboardingRecord()["status"] as? String=="waiting_user","next approval is promoted")
    try controller.answerRequest(["id":second["id"]!,"allow":false])
    fake.onRequest?(121,"item/commandExecution/requestApproval",["threadId":thread,"turnId":"old-turn","command":"must-not-run"]);controller.notifications.sync{}
    try check(controller.core.onboardingRecord()["request"] is NSNull,"stale turn approval is never presented")
    fake.onRequest?(13,"item/permissions/requestApproval",["threadId":thread,"turnId":turn,"permissions":["network":["enabled":true]]]);controller.notifications.sync{}
    let network=controller.core.onboardingRecord()["request"] as! [String:Any];try controller.answerRequest(["id":network["id"]!,"allow":false])
    try check((fake.replies.last?["permissions"] as? [String:Any])?.isEmpty==true,"denied permissions grant nothing")
    _=try controller.cancel();controller.notifications.sync{}
    try check(controller.core.onboardingRecord()["status"] as? String=="cancelled","cancel waits for interrupt event")
    try check(fm.fileExists(atPath:home.appendingPathComponent("onboarding/cancel").path),"cancellation marker persists")
    _=try controller.resume();controller.notifications.sync{}
    try check(fake.calls.contains("thread/resume"),"resume uses same Codex thread")
    try check(!fm.fileExists(atPath:home.appendingPathComponent("onboarding/cancel").path),"explicit resume clears cancellation")
    let newTurn=fake.turn
    fake.onNotification?("turn/completed",["threadId":thread,"turn":["id":turn,"status":"completed"]]);controller.notifications.sync{}
    try check(controller.core.onboardingRecord()["status"] as? String=="running","late completion from old turn is ignored")
    fake.onNotification?("turn/completed",["threadId":thread,"turn":["id":newTurn,"status":"completed"]]);controller.notifications.sync{}
    try check(controller.core.onboardingRecord()["status"] as? String=="paused","turn completion does not prove installation")
    try controller.update(["status":"running"]);fake.isRunning=false;fake.onDisconnect?();controller.notifications.sync{}
    try check(controller.core.onboardingRecord()["status"] as? String=="interrupted","disconnect preserves recoverable state")
    try check((try? controller.core.onboardingSnapshot()["codexConnected"] as? Bool)==false,"disconnect invalidates connected flag")
    print("Onboarding lifecycle: \(count) checks passed")
}
