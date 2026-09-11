import Foundation
import CryptoKit

private final class NativeAccessChecks {
    var count=0
    func check(_ value:Bool,_ name:String)throws {guard value else{throw failure("Native access test failed: "+name)};count+=1;print("PASS "+name)}
    func rejects(_ name:String,_ body:()throws->Void)throws {var rejected=false;do{try body()}catch{rejected=true};try check(rejected,name)}
}
private struct FixtureDeviceIdentity:OracleDeviceIdentity {
    let key=P256.Signing.PrivateKey()
    var publicKey:Data {key.publicKey.x963Representation}
    func sign(_ bytes:Data)throws->Data {try key.signature(for:bytes).rawRepresentation}
}
private struct BrokenFixtureIdentity:OracleDeviceIdentity {
    let publicKey:Data
    func sign(_ bytes:Data)throws->Data {try P256.Signing.PrivateKey().signature(for:bytes).rawRepresentation}
}
private func nativeAccessTestRoot() throws -> URL {
    let repository=URL(fileURLWithPath:#filePath).deletingLastPathComponent().deletingLastPathComponent().deletingLastPathComponent()
    let root=repository.appendingPathComponent(".work/native-access-tests/"+UUID().uuidString).standardizedFileURL
    guard root.path.split(separator:"/").contains(".work"),root.resolvingSymlinksInPath().path==root.path else{throw failure("Synthetic native tests require a non-symlink .work root.")}
    try fm.createDirectory(at:root,withIntermediateDirectories:true,attributes:[.posixPermissions:0o700]);return root
}
private func fixtureLicense(device:OracleDeviceIdentity,signer:Curve25519.Signing.PrivateKey,keyID:String="fixture",role:String="student",expiry:Int64?=nil,issued:Int64=1,product:String="oracle-macos")throws->String {
    let value=OracleLicense(version:2,product:product,keyID:keyID,licenseID:UUID().uuidString,subject:"Synthetic user",issuedAt:issued,expiresAt:expiry,
        deviceID:device.fingerprint,devicePublicKey:base64URL(device.publicKey),invitationID:digest(Data("Synthetic invitation".utf8)),requestID:UUID().uuidString,role:role)
    let data=try JSONEncoder().encode(value)
    return "ORACLE2."+base64URL(data)+"."+base64URL(try signer.signature(for:Data("ORACLE2.".utf8)+data))
}
private func fixtureAccess() throws -> ()throws->Void {
    let device=FixtureDeviceIdentity(),signer=Curve25519.Signing.PrivateKey()
    let code=try fixtureLicense(device:device,signer:signer),keys=LicenseKeys(version:1,keys:["fixture":signer.publicKey.rawRepresentation.base64EncodedString()])
    return {_ = try validateDeviceLicense(code,keys:keys,identity:device)}
}

func runOnboardingTests() throws {
    let t=NativeAccessChecks(),device=FixtureDeviceIdentity(),other=FixtureDeviceIdentity(),key=Curve25519.Signing.PrivateKey()
    let keys=LicenseKeys(version:1,keys:["fixture":key.publicKey.rawRepresentation.base64EncodedString()])
    let code=try fixtureLicense(device:device,signer:key)
    let license=try validateDeviceLicense(code,keys:keys,identity:device,now:10000)
    try t.check(license.role=="student" && license.expiresAt==nil,"permanent signed license plus local key possession")
    try t.check(try validateDeviceLicense(" \n"+code+"\n",keys:keys,identity:device,now:10000).licenseID==license.licenseID,"outer whitespace only is normalized")
    try t.rejects("copied license rejected by second device key") {_ = try validateDeviceLicense(code,keys:keys,identity:other,now:10000)}
    try t.rejects("public fingerprint alone cannot prove private key possession") {_ = try validateDeviceLicense(code,keys:keys,identity:BrokenFixtureIdentity(publicKey:device.publicKey),now:10000)}
    var parts=code.split(separator:".").map(String.init)
    let text=String(decoding:decodeBase64URL(parts[1])!,as:UTF8.self).replacingOccurrences(of:"Synthetic user",with:"Changed user")
    parts[1]=base64URL(Data(text.utf8))
    try t.rejects("altered license payload rejected") {_ = try validateDeviceLicense(parts.joined(separator:"."),keys:keys,identity:device,now:10000)}
    try t.rejects("untrusted owner signer rejected") {_ = try validateDeviceLicense(fixtureLicense(device:device,signer:Curve25519.Signing.PrivateKey(),role:"owner"),keys:keys,identity:device,now:10000)}
    try t.rejects("legacy ORACLE1 cannot activate an unbound student") {_ = try validateLicense(code.replacingOccurrences(of:"ORACLE2.",with:"ORACLE1."),keys:keys,device:device.fingerprint,now:10000)}
    try t.rejects("expiring response rejected by permanent policy") {_ = try validateDeviceLicense(fixtureLicense(device:device,signer:key,expiry:20000),keys:keys,identity:device,now:10000)}
    try t.rejects("future-dated license rejected") {_ = try validateDeviceLicense(fixtureLicense(device:device,signer:key,issued:20000),keys:keys,identity:device,now:10000)}
    try t.rejects("wrong product signature rejected") {_ = try validateDeviceLicense(fixtureLicense(device:device,signer:key,product:"other-product"),keys:keys,identity:device,now:10000)}
    try t.rejects("unknown capability role rejected") {_ = try validateDeviceLicense(fixtureLicense(device:device,signer:key,role:"admin-from-config"),keys:keys,identity:device,now:10000)}
    try t.rejects("removed trust key rejected") {_ = try validateDeviceLicense(code,keys:LicenseKeys(version:1,keys:[:]),identity:device,now:10000)}
    try t.rejects("oversized envelope rejected") {_ = try validateDeviceLicense(String(repeating:"A",count:8193),keys:keys,identity:device)}
    try t.check(decodeBase64URL("abc=")==nil && decodeBase64URL("a+")==nil,"noncanonical base64 rejected")
    let invitation="ORACLEINV2."+base64URL(Data(repeating:9,count:32)),request=try makeActivationRequest(invitation:invitation,identity:device,now:1000)
    let parsed=try validateActivationRequest(request)
    try t.check(parsed.invitation==invitation && parsed.deviceID==device.fingerprint,"offline activation request binds invitation and P256 key proof")
    try t.rejects("tampered activation request proof rejected") {_ = try validateActivationRequest(request+"A")}
    try t.rejects("arbitrary invitation cannot generate a request") {_ = try makeActivationRequest(invitation:"shared-code",identity:device)}
    let owner=try validateDeviceLicense(fixtureLicense(device:device,signer:key,role:"owner"),keys:keys,identity:device,now:10000)
    try t.check(licenseCapabilities(license)["useOracle"]==true && licenseCapabilities(license)["manageCatalogSource"]==false,"student lacks administrative capability")
    try t.check(licenseCapabilities(owner)["manageCatalogSource"]==true && licenseCapabilities(owner)["manageDistribution"]==true,"signed owner has native admin capabilities")
    try t.check(licenseCapabilities(owner)["issueLicenses"]==false && licenseCapabilities(nil).values.allSatisfy{!$0},"packaged app never has issuer capability")

    let root=try nativeAccessTestRoot();defer{try? fm.removeItem(at:root)}
    let core=try Core(home:root.appendingPathComponent("new-profile")),snapshot=try core.onboardingSnapshot()
    try t.check(snapshot["legacyAccess"] as? Bool==false && snapshot["licensed"] as? Bool==false,"new profile starts locked without touching a hardware key")
    core.config["vault"]=root.path;core.config["owner"]=true;core.config["deviceID"]=UUID().uuidString;try core.persist()
    try writeJSON(["legacyAccess":true,"status":"completed"],core.onboardingURL)
    try t.check(!core.onboardingLegacyAccess(),"config UUID/vault/legacy flag cannot mint owner access")
    try t.rejects("native admin capability rejects forged config") {try core.requireCapability(.manageCatalogSource)}
    let controller=try OnboardingController(home:core.home,bridge:FixtureCodex(),automaticallyReconnect:false);defer{controller.shutdown()}
    try t.rejects("unlicensed vault selection denied") {try controller.selectVault(root)}
    try t.rejects("unlicensed install denied") {_ = try controller.install("forged")}
    let legacy=try Core(home:root.appendingPathComponent("legacy-profile"));legacy.config["vault"]=root.path;legacy.config["personal-setting"]="preserve";try legacy.persist()
    try t.check(try legacy.onboardingSnapshot()["legacyProfilePreserved"] as? Bool==true,"existing owner profile is reported and preserved without inventing authorization")
    try t.check(legacy.config["personal-setting"] as? String=="preserve" && !legacy.onboardingLegacyAccess(),"legacy data is not deleted or permanently bypassed")
    try Data("cancel".utf8).write(to:core.home.appendingPathComponent("onboarding/cancel"),options:.atomic)
    try t.rejects("cancel marker stops local phases") {try core.checkOnboardingCancellation()}
    try t.check(try core.onboardingProgress().isEmpty,"no fabricated progress without a reviewed run")

    let apps:[[String:Any]]=[["id":"real","name":"Real","isAccessible":true,"isEnabled":true],["id":"off","name":"Off","isAccessible":true,"isEnabled":false],["id":"catalog","name":"Catalog","isAccessible":false,"isEnabled":true]]
    let plugins:[[String:Any]]=[["id":"skills","name":"Skills","installed":true,"enabled":true],["id":"mcp","name":"MCP","installed":true,"enabled":true],["id":"uninstalled","name":"No","installed":false,"enabled":true]]
    let inventory=CodexBridge.projectInventory(apps:apps,runtime:[["id":"real","enabled":true,"callable":true],["id":"off","enabled":false,"callable":true]],packages:plugins,servers:[["pluginId":"mcp","runtimeStatus":"connected","tools":["read":[:]]]])
    let rows=inventory["plugins"] as! [[String:Any]]
    try t.check(rows.filter{$0["status"] as? String=="connected"}.count==2,"connected requires supported runtime evidence")
    try t.check(!rows.contains{$0["id"] as? String=="catalog" || $0["id"] as? String=="uninstalled"},"catalog availability is not installation")
    try t.check(rows.first{$0["id"] as? String=="skills"}?["status"] as? String=="installed","skill package is not a connected app")
    try t.check(rows.first{$0["id"] as? String=="off"}?["status"] as? String=="unavailable","disabled app is not connected")
    let unknown=CodexBridge.projectInventory(apps:apps,runtime:[],packages:plugins,servers:[["pluginId":"mcp","runtimeStatus":NSNull(),"tools":["read":[:]],"authStatus":"bearerToken"]])
    try t.check(!(unknown["plugins"] as! [[String:Any]]).contains{$0["status"] as? String=="connected"},"cached tools do not prove runtime authorization")
    try t.check(PluginIconLoader.catalogURL("https://files.openai.com/content?id=fixture") != nil,"official icon origin accepted")
    try t.check(PluginIconLoader.catalogURL("http://127.0.0.1/private")==nil && PluginIconLoader.catalogURL("file:///etc/passwd")==nil,"local/insecure icon origins rejected")
    try t.check(PluginIconLoader.catalogURL("https://files.openai.com.attacker.example/a.png")==nil && PluginIconLoader.catalogURL("https://user@files.openai.com/a.png")==nil,"lookalike/credential icon origins rejected")
    let branded=CodexBridge.projectInventory(apps:[["id":"github","name":"GitHub","isAccessible":true,"isEnabled":true,"pluginDisplayNames":["Analytics","GitHub"]]],runtime:[],packages:[["interface":["displayName":"Analytics","logoUrl":"https://files.openai.com/analytics.png"]],["interface":["displayName":"GitHub","logoUrl":"https://files.openai.com/github.png"]]],servers:[])
    try t.check((branded["plugins"] as? [[String:Any]])?.first?["iconURL"] as? String=="https://files.openai.com/github.png","dependent artwork cannot replace app identity")
    let light=CodexBridge.projectInventory(apps:[["id":"canva","name":"Canva","isAccessible":true,"isEnabled":true,"iconUrlDark":NSNull(),"iconUrl":"https://files.openai.com/canva.png"]],runtime:[],packages:[],servers:[])
    try t.check((light["plugins"] as? [[String:Any]])?.first?["iconURL"] as? String=="https://files.openai.com/canva.png","null dark icon falls back to original artwork")
    try consentTests(t)
    print("Onboarding licensing/consent: \(t.count) checks passed")
}

private func consentTests(_ t:NativeAccessChecks)throws {
    let q=OnboardingConsentQueue(),generation=UUID(),thread="thread-fixture",turn="turn-fixture"
    func p(_ turnID:String?=turn)->[String:Any] {var v:[String:Any]=["threadId":thread,"itemId":"item-fixture","command":"synthetic --check"];if let turnID{v["turnId"]=turnID};return v}
    q.begin(thread:thread,generation:generation)
    try t.check(q.receive(id:1,method:"item/commandExecution/requestApproval",params:p(),generation:generation) == .deferred,"request before turn acknowledgement is deferred")
    try t.check(q.pending.isEmpty && q.early.count==1,"unacknowledged turn exposes no permission UI")
    try t.check(q.receive(id:2,method:"item/fileChange/requestApproval",params:p("old-turn"),generation:generation) == .deferred,"early approval retained only until turn identity is known")
    try t.check(q.bind(turn:turn).count==1 && q.pending.count==1,"binding rejects early request from another turn")
    try t.check(q.receive(id:1,method:"item/commandExecution/requestApproval",params:p(),generation:generation) == .duplicate,"duplicate server request never creates another consent")
    try t.check(q.receive(id:3,method:"item/fileChange/requestApproval",params:p("old-turn"),generation:generation) == .rejected,"stale turn request rejected")
    try t.check(q.receive(id:4,method:"item/fileChange/requestApproval",params:p(nil),generation:generation) == .rejected,"missing turn field rejected")
    try t.check(q.receive(id:5,method:"item/fileChange/requestApproval",params:p(),generation:UUID()) == .rejected,"stale generation rejected")
    try t.check(q.receive(id:6,method:"unknown/request",params:p(),generation:generation) == .rejected,"unsupported request rejected without unresolvable waiting state")
    try t.check(q.receive(id:true,method:"item/fileChange/requestApproval",params:p(),generation:generation) == .rejected,"boolean JSON-RPC ID rejected")
    try t.check(q.receive(id:"1",method:"item/fileChange/requestApproval",params:p(),generation:generation) == .queued,"string and numeric JSON-RPC IDs remain distinct")
    let first=q.pending[0],second=q.pending[1]
    try t.rejects("FIFO approval cannot answer second item first") {_ = try q.take(id:second.id,generation:generation)}
    try t.check(try first.response(["allow":false])["decision"] as? String=="decline","native command denial uses documented decision")
    _=try q.take(id:first.id,generation:generation)
    try t.rejects("duplicate UI answer rejected") {_ = try q.take(id:first.id,generation:generation)}
    try t.check(!q.resolve(thread:"other-thread",rpcID:"1") && q.pending.count==1,"resolved event is scoped to thread")
    try t.check(q.resolve(thread:thread,rpcID:"1") && q.pending.isEmpty,"documented resolved requestId works without invented turn field")
    _=q.resolve(thread:thread,rpcID:7)
    try t.check(q.receive(id:7,method:"item/fileChange/requestApproval",params:p(),generation:generation) == .duplicate,"resolved-before-request remains invalidated")
    var permissions=p();permissions["permissions"]=["network":["enabled":true]]
    _=q.receive(id:8,method:"item/permissions/requestApproval",params:permissions,generation:generation)
    let perm=q.pending[0],denied=try perm.response(["allow":false]),allowed=try perm.response(["allow":true,"permissions":["filesystem":["write":["/"]]]])
    try t.check((denied["permissions"] as? [String:Any])?.isEmpty==true && denied["scope"] as? String=="turn","denied permissions grant nothing; scope remains turn")
    try t.check((allowed["permissions"] as? [String:Any])?["filesystem"]==nil,"UI cannot add permissions never requested")
    _=q.invalidate();q.begin(thread:thread,generation:generation);_=q.bind(turn:turn)
    var question=p();question["questions"]=[["id":"choice","header":"Fixture","question":"Choose","isOther":false,"isSecret":false,"options":[["label":"Keep","description":"Preserve"]]]]
    _=q.receive(id:9,method:"item/tool/requestUserInput",params:question,generation:generation)
    let tool=q.pending[0]
    try t.rejects("user-input answer cannot inject unknown question IDs") {_ = try tool.response(["answers":["wrong":["answers":["Keep"]]]])}
    try t.rejects("user-input answer must use documented nested answers array") {_ = try tool.response(["answers":["choice":"Keep"]])}
    try t.rejects("unsupported option cannot broaden consent") {_ = try tool.response(["answers":["choice":["answers":["Other"]]]])}
    let response=try tool.response(["answers":["choice":["answers":["Keep"]]]])
    try t.check(((response["answers"] as? [String:Any])?["choice"] as? [String:Any])?["answers"] as? [String]==["Keep"],"supported question response preserves exact protocol shape")
    _=q.invalidate(newTransport:true)
    try t.check(q.pending.isEmpty && q.early.isEmpty && q.thread==nil,"disconnect invalidates all queued questions and context")
    let selected=try CodexOnboardingModel.select([["model":"hidden-fixture","hidden":true,"isDefault":true],["model":"fixture-only","isDefault":true,"inputModalities":["text"],"defaultReasoningEffort":"low","supportedReasoningEfforts":[["reasoningEffort":"low"]]]])
    try t.check(selected.model=="fixture-only" && selected.effort=="low","model/effort selected from supported discovered fields")
    try t.rejects("no text model cannot silently assume fixed model") {_ = try CodexOnboardingModel.select([["model":"image-fixture","inputModalities":["image"]]])}
}

private final class FixtureCodex:CodexConnection {
    var onNotification:((String,[String:Any])->Void)?,onRequest:((Any,String,[String:Any])->Void)?,onDisconnect:(()->Void)?
    var isRunning=false,version="fixture",calls=[String](),callParams=[[String:Any]](),replies=[[String:Any]](),rejected=[String](),turn="",thread="thread-"+UUID().uuidString,starts=0
    var onTurnStart:(()->Void)?,failReply=false,repeatedModelCursor=false
    func start(cwd:URL)throws {starts+=1;isRunning=true}
    func request(_ method:String,_ params:[String:Any],timeout:Double)throws->[String:Any] {
        calls.append(method);callParams.append(params)
        switch method {
        case "model/list":return ["data":[["id":"fixture-id","model":"fixture-discovered","isDefault":true,"hidden":false,"inputModalities":["text"],"defaultReasoningEffort":"medium","supportedReasoningEfforts":[["reasoningEffort":"medium","description":"Synthetic"]]]],"nextCursor":repeatedModelCursor ? "same" : NSNull()]
        case "thread/start","thread/resume":return ["thread":["id":thread,"turns":[]]]
        case "turn/start":turn="turn-"+UUID().uuidString;onTurnStart?();return ["turn":["id":turn,"status":"inProgress"]]
        case "turn/interrupt":onNotification?("turn/completed",["threadId":thread,"turn":["id":turn,"status":"interrupted"]]);return [:]
        default:return [:]
        }
    }
    func account()throws->[String:Any] {calls.append("account/read");callParams.append(["refreshToken":false]);return ["connected":true]}
    func reply(id:Any,result:[String:Any])throws {if failReply{throw failure("Synthetic transport error")};replies.append(result)}
    func reject(id:Any) {rejected.append(onboardingRPCKey(id) ?? "invalid")}
    func inventory(threadID:String?)->[String:Any] {["status":"available","plugins":[]]}
    func stop() {isRunning=false}
}

private final class FixtureLocalInstallation:OfflineInstallationDriver {
    var phases=[String](),failVerification=false,failAt:String?,beforeApply:(()throws->Void)?
    func apply(_ core:Core)throws {phases.append("apply");try beforeApply?();if failAt=="apply"{throw failure("Synthetic structure interruption")};_=try core.applyPlan()}
    func prepare(_ core:Core)throws->[String:Any] {
        phases.append("prepare");let plan=try core.validatedPlan(),path=core.home.appendingPathComponent("setup/gbrain-readback.json")
        if let saved=try? readJSON(path),saved["plan_hash"] as? String==plan["plan_hash"] as? String{return saved}
        let receipt:[String:Any]=["status":"awaiting_readback_confirmation","plan_hash":plan["plan_hash"]!,"upstream_hash":digest(Data("synthetic official readback".utf8)),"readback":"Synthetic identity answers for explicit review"]
        try writeJSON(receipt,path);return receipt
    }
    func finish(_ core:Core)throws {
        phases.append("finish");if failAt=="finish"{throw failure("Synthetic index interruption")}
        let path=core.home.appendingPathComponent("setup/gbrain-readback.json");var receipt=try readJSON(path)
        guard receipt["confirmed_hash"] as? String==receipt["upstream_hash"] as? String,receipt["confirmed_hash"] is String else{throw failure("Fixture refused unconfirmed identity")}
        receipt["status"]="identity_and_index_verified";try writeJSON(receipt,path)
    }
    func prepareBridge(_ core:Core)throws {phases.append("bridge");if failAt=="bridge"{throw failure("Synthetic bridge interruption")};try writeJSON(["synthetic":true],core.home.appendingPathComponent("setup/fixture-bridge.json"))}
    func verify(_ core:Core)throws->[String:Any] {
        phases.append("verify");if failVerification{throw failure("Synthetic missing local receipt")}
        let plan=try core.validatedPlan();_=try core.applyPlan(verifyOnly:true)
        if plan["attach"] as? Bool != true {guard (try readJSON(core.home.appendingPathComponent("setup/gbrain-readback.json")))["status"] as? String=="identity_and_index_verified" else{throw failure("Missing confirmed identity fixture")}}
        guard (try readJSON(core.home.appendingPathComponent("setup/fixture-bridge.json")))["synthetic"] as? Bool==true else{throw failure("Missing bridge fixture")}
        return ["localOnly":true,"structure":true,"memory":true,"skill":true,"hooksTrusted":false,"syntheticDriver":true]
    }
}

func runOnboardingLifecycleTests() throws {
    let t=NativeAccessChecks(),root=try nativeAccessTestRoot();defer{try? fm.removeItem(at:root)}
    let priorEnvironment=ProcessInfo.processInfo.environment["ORACLE_ENGINE_RESOURCES"]
    let resource=root.appendingPathComponent("resources"),skill=resource.appendingPathComponent("skills/oracle-onboarding/SKILL.md")
    try fm.createDirectory(at:skill.deletingLastPathComponent(),withIntermediateDirectories:true)
    try Data("# Synthetic optional Codex skill\n".utf8).write(to:skill)
    setenv("ORACLE_ENGINE_RESOURCES",resource.appendingPathComponent("engine").path,1)
    defer{if let priorEnvironment{setenv("ORACLE_ENGINE_RESOURCES",priorEnvironment,1)}else{unsetenv("ORACLE_ENGINE_RESOURCES")}}
    let home=root.appendingPathComponent("local-profile"),vault=root.appendingPathComponent("vault")
    try fm.createDirectory(at:vault,withIntermediateDirectories:true);let original=vault.appendingPathComponent("original.md");try Data("Keep original".utf8).write(to:original)
    let fake=FixtureCodex(),driver=FixtureLocalInstallation(),access=try fixtureAccess()
    let controller=try OnboardingController(home:home,bridge:fake,automaticallyReconnect:false,localDriver:driver,accessCheck:access)
    defer{controller.shutdown()}
    try controller.selectVault(vault)
    try t.check(fake.starts==0 && fake.calls.isEmpty,"licensed fixture initialization does not reconnect globally")
    let denied=root.appendingPathComponent("permission-denied");try fm.createDirectory(at:denied,withIntermediateDirectories:true);try fm.setAttributes([.posixPermissions:0o000],ofItemAtPath:denied.path)
    try t.rejects("permission-denied vault preserves selected path") {try controller.selectVault(denied)};try fm.setAttributes([.posixPermissions:0o700],ofItemAtPath:denied.path)
    let linked=root.appendingPathComponent("linked-vault");try fm.createSymbolicLink(at:linked,withDestinationURL:vault)
    try t.rejects("symlink vault cannot widen access") {try controller.selectVault(linked)}
    try t.check(controller.core.config["vault"] as? String==vault.path,"failed selections do not mutate vault")
    let answers=Dictionary(uniqueKeysWithValues:identityLimits.keys.map{($0,"Synthetic "+$0)})
    let parameters:[String:Any]=["answers":answers,"newVault":false,"attach":false,"catalogCollections":[String]()]
    let plan=try controller.plan(parameters),hash=plan["plan_hash"] as! String
    let reopened=try Core(home:home).onboardingSnapshot(),review=reopened["review"] as? [String:Any]
    try t.check(review?["plan_hash"] as? String==hash && review?["vault"]==nil,"review/hash survive reopened UI without exposing canonical vault path")
    try t.rejects("wrong review hash cannot install") {_ = try controller.install("stale")}
    _=try controller.install(hash);controller.queue.sync{}
    try t.check(driver.phases==["apply","prepare"],"local sequence stops after prepare for explicit readback")
    try t.check(controller.core.onboardingRecord()["status"] as? String=="waiting_user" && fake.calls.isEmpty && fake.starts==0,"local install never calls Codex/account/model")
    let readback=(try controller.snapshot())["readback"] as! [String:Any],readbackHash=readback["hash"] as! String
    _=try controller.resume();controller.queue.sync{}
    try t.check(!driver.phases.contains("finish"),"resume cannot invent readback confirmation")
    try t.rejects("stale readback hash rejected") {try controller.confirmReadback("wrong")}
    try controller.confirmReadback(readbackHash)
    try t.check(controller.core.onboardingRecord()["status"] as? String=="paused","readback confirmation enables explicit local resume")
    driver.failAt="finish";_=try controller.resume();controller.queue.sync{}
    try t.check(controller.core.onboardingRecord()["status"] as? String=="interrupted","phase failure remains resumable with journal")
    driver.failAt=nil;_=try controller.resume();controller.queue.sync{}
    try t.check(Array(driver.phases.suffix(5))==["apply","prepare","finish","bridge","verify"],"confirmed resume runs deterministic finish/bridge/local verification")
    try t.check(controller.core.onboardingRecord()["status"] as? String=="completed" && fake.calls.isEmpty,"local completion requires no skills/list or remote turn")
    try t.check(try String(contentsOf:original)=="Keep original","resumable local phases preserve original vault document")
    try t.check((controller.core.onboardingRecord()["verification"] as? [String:Any])?["hooksTrusted"] as? Bool==false,"local readiness never asserts Codex hook trust")
    let nextPlan=try controller.plan(parameters),entered=DispatchSemaphore(value:0),release=DispatchSemaphore(value:0)
    driver.beforeApply={entered.signal();guard release.wait(timeout:.now()+5) == .success else{throw failure("Synthetic phase synchronization timed out")}}
    _=try controller.install(nextPlan["plan_hash"] as! String)
    try t.check(entered.wait(timeout:.now()+5) == .success,"synthetic running phase entered")
    var same=parameters;same["step"]="progress"
    try controller.saveDraft(same);try controller.saveUIState(["step":"progress","expanded":false])
    var changed=parameters;changed["newVault"]=true
    try t.rejects("running install rejects changed configuration draft") {try controller.saveDraft(changed)}
    try t.check((controller.core.onboardingRecord()["ui"] as? [String:Any])?["step"] as? String=="progress","running install accepts separate UI state")
    _=try controller.cancel();release.signal();controller.queue.sync{};driver.beforeApply=nil
    try t.check(controller.core.onboardingRecord()["status"] as? String=="cancelled","cancel marker stops native phase without remote interruption")
    try t.check(fake.calls.isEmpty,"all local lifecycle fixtures stay offline")
    var edit=parameters;edit["newVault"]=true;try controller.saveDraft(edit)
    try t.check(try controller.snapshot()["review"]==nil,"editing reviewed inputs invalidates stale review")
    try t.rejects("old approved plan cannot install after draft mutation") {_ = try controller.install(nextPlan["plan_hash"] as! String)}
    try t.rejects("invalidated plan cannot confirm stale identity readback") {try controller.confirmReadback(readbackHash)}
    let editedPlan=try controller.plan(parameters),planFile=controller.core.home.appendingPathComponent("setup/plan.json")
    var tampered=try readJSON(planFile);tampered["new_vault"]=true;try writeJSON(tampered,planFile)
    try t.check((try controller.snapshot())["review"]==nil,"tampered plan no longer projects a trusted review")
    try t.rejects("tampered plan cannot install with old hash") {_ = try controller.install(editedPlan["plan_hash"] as! String)}

    let attachedHome=root.appendingPathComponent("attach-profile"),attachedDriver=FixtureLocalInstallation(),attachedBridge=FixtureCodex()
    let attached=try OnboardingController(home:attachedHome,bridge:attachedBridge,automaticallyReconnect:false,localDriver:attachedDriver,accessCheck:access);defer{attached.shutdown()}
    try attached.selectVault(vault)
    let existingWorkspace=root.appendingPathComponent("external-workspace"),existingProfile=root.appendingPathComponent("external-profile"),database=root.appendingPathComponent("external-database")
    for path in [existingWorkspace,existingProfile,database] {try fm.createDirectory(at:path,withIntermediateDirectories:true)}
    try writeJSON(["engine":"pglite","database_path":database.path],existingProfile.appendingPathComponent(".gbrain/config.json"))
    try attached.selectBrain(workspace:existingWorkspace,profile:existingProfile)
    try t.check(attached.core.config["gbrainProfile"] as? String==existingProfile.path,"external brain requires explicitly selected local profile")
    let remoteProfile=root.appendingPathComponent("remote-profile")
    try writeJSON(["remote_mcp":"https://fixture.invalid"],remoteProfile.appendingPathComponent(".gbrain/config.json"))
    try t.rejects("remote profile cannot replace offline selected brain") {try attached.selectBrain(workspace:existingWorkspace,profile:remoteProfile)}
    try t.check(attached.core.config["gbrainProfile"] as? String==existingProfile.path,"invalid profile leaves previous configuration intact")
    var attachParameters=parameters;attachParameters["attach"]=true;attachParameters["answers"]=[String:String]()
    let attachPlan=try attached.plan(attachParameters);_=try attached.install(attachPlan["plan_hash"] as! String);attached.queue.sync{}
    try t.check(attachedDriver.phases==["apply","bridge","verify"] && attached.core.onboardingRecord()["status"] as? String=="completed","attach never initializes or renders the existing brain")
    try t.check(attachedBridge.starts==0 && attachedBridge.calls.isEmpty,"attaching existing local brain never contacts Codex")

    let remoteHome=root.appendingPathComponent("optional-profile"),remoteFake=FixtureCodex(),remoteDriver=FixtureLocalInstallation()
    remoteDriver.failVerification=true
    let remote=try OnboardingController(home:remoteHome,bridge:remoteFake,automaticallyReconnect:false,localDriver:remoteDriver,accessCheck:access);defer{remote.shutdown()}
    try remote.selectVault(vault);let remotePlan=try remote.plan(parameters)
    _=try remote.connect();_=try remote.installWithCodex(remotePlan["plan_hash"] as! String);remote.notifications.sync{}
    try t.check(remoteFake.calls.contains("model/list") && remoteFake.calls.contains("turn/start"),"explicit optional Codex execution discovers model first")
    let turnIndex=remoteFake.calls.firstIndex(of:"turn/start")!
    try t.check(remoteFake.callParams[turnIndex]["model"] as? String=="fixture-discovered" && remoteFake.callParams[turnIndex]["effort"] as? String=="medium","turn uses discovered model/effort, not fixed assumptions")
    let thread=remoteFake.thread,turn=remoteFake.turn
    remoteFake.onRequest?(12,"item/commandExecution/requestApproval",["threadId":thread,"turnId":turn,"itemId":"command-12","command":"SENSITIVE_FIXTURE_COMMAND","reason":"Synthetic approval"])
    remoteFake.onRequest?(13,"item/permissions/requestApproval",["threadId":thread,"turnId":turn,"itemId":"permission-13","environmentId":"local","cwd":home.path,"permissions":["network":["enabled":true]]]);remote.notifications.sync{}
    let current=(try remote.snapshot())["request"] as! [String:Any]
    try t.check((try remote.snapshot())["pendingRequestCount"] as? Int==2 && current["kind"] as? String=="item/commandExecution/requestApproval","concurrent prompts are presented FIFO")
    let persisted=try String(contentsOf:remote.core.onboardingURL)
    try t.check(!persisted.contains("SENSITIVE_FIXTURE_COMMAND") && !persisted.contains("\"request\""),"protocol commands/reasons/answers are not persisted")
    try remote.answerRequest(["id":current["id"]!,"allow":false])
    try t.check(remoteFake.replies.last?["decision"] as? String=="decline" && remote.core.onboardingRecord()["status"] as? String=="waiting_user","answering first prompt leaves next pending")
    try t.rejects("same UI permission cannot be submitted twice") {try remote.answerRequest(["id":current["id"]!,"allow":true])}
    remoteFake.onNotification?("serverRequest/resolved",["threadId":thread,"requestId":13]);remote.notifications.sync{}
    try t.check((try remote.snapshot())["request"]==nil && remote.core.onboardingRecord()["status"] as? String=="running","serverRequest/resolved invalidates permission without turn field")
    remoteFake.onRequest?(14,"item/fileChange/requestApproval",["threadId":thread,"turnId":"stale-turn","itemId":"stale"])
    remoteFake.onRequest?(15,"item/fileChange/requestApproval",["threadId":thread,"itemId":"missing-turn"]);remote.notifications.sync{}
    try t.check(remoteFake.rejected.contains("n:14") && remoteFake.rejected.contains("n:15"),"stale and missing-turn requests receive rejection")
    remoteFake.onRequest?(16,"item/tool/requestUserInput",["threadId":thread,"turnId":turn,"itemId":"question-16","questions":[["id":"q","header":"Synthetic","question":"SENSITIVE_FIXTURE_QUESTION","isOther":true,"isSecret":true,"options":NSNull()]]]);remote.notifications.sync{}
    let expired=(try remote.snapshot())["request"] as! [String:Any],oldRequestCallback=remoteFake.onRequest
    remoteFake.isRunning=false;remoteFake.onDisconnect?();remote.notifications.sync{}
    try t.check((try remote.snapshot())["request"]==nil && remote.core.onboardingRecord()["status"] as? String=="interrupted","disconnect clears all pending questions")
    try t.rejects("disconnected approval cannot be answered") {try remote.answerRequest(["id":expired["id"]!,"answers":["q":["answers":["SECRET_FIXTURE_ANSWER"]]]])}
    try t.check((try remote.snapshot())["codexConnected"] as? Bool==false,"disconnect invalidates cached connection flag")
    _=try remote.connect();_=try remote.resumeWithCodex();remote.notifications.sync{}
    let newTurn=remoteFake.turn
    oldRequestCallback?(17,"item/commandExecution/requestApproval",["threadId":thread,"turnId":newTurn,"itemId":"old-transport","command":"stale transport"]);remote.notifications.sync{}
    try t.check((try remote.snapshot())["request"]==nil,"old transport callback rejected even with current thread/turn")
    remoteFake.onNotification?("turn/completed",["threadId":thread,"turn":["id":turn,"status":"completed"]]);remote.notifications.sync{}
    try t.check(remote.core.onboardingRecord()["status"] as? String=="running","old turn completion cannot complete current run")
    remoteFake.onNotification?("turn/completed",["threadId":thread,"turn":["id":newTurn,"status":"completed"]]);remote.notifications.sync{};remote.queue.sync{}
    try t.check(remote.core.onboardingRecord()["status"] as? String=="paused","remote completion alone is not installation evidence")
    remoteFake.onNotification?("turn/completed",["threadId":thread,"turn":["id":newTurn,"status":"completed"]]);remote.notifications.sync{}
    try t.check(remote.core.onboardingRecord()["status"] as? String=="paused","duplicate completion cannot re-run finalization")
    _=try remote.resumeWithCodex();_=try remote.cancel();remote.notifications.sync{}
    try t.check(remote.core.onboardingRecord()["status"] as? String=="cancelled","optional cancellation waits for matching interruption")
    let remoteCalls=remoteFake.calls.count
    _=try remote.resume();remote.queue.sync{}
    try t.check(remoteFake.calls.count==remoteCalls && remote.core.onboardingRecord()["executor"] as? String=="native-local","default resume after optional Codex is local, not automatic paid execution")
    try t.check(!(try String(contentsOf:remote.core.onboardingURL)).contains("SENSITIVE_FIXTURE_") && !(try String(contentsOf:remote.core.onboardingURL)).contains("SECRET_FIXTURE_ANSWER"),"no sensitive protocol fields survive lifecycle persistence")
    let races=FixtureCodex(),raceController=try OnboardingController(home:root.appendingPathComponent("race-profile"),bridge:races,automaticallyReconnect:false,localDriver:FixtureLocalInstallation(),accessCheck:access)
    defer{raceController.shutdown()};try raceController.selectVault(vault)
    let racePlan=try raceController.plan(parameters);_=try raceController.connect()
    races.onTurnStart={
        races.onRequest?(81,"item/commandExecution/requestApproval",["threadId":races.thread,"turnId":races.turn,"itemId":"early-81","command":"Synthetic before ack"])
        raceController.notifications.sync{}
    }
    _=try raceController.installWithCodex(racePlan["plan_hash"] as! String);raceController.notifications.sync{}
    let earlyPrompt=(try raceController.snapshot())["request"] as? [String:Any]
    try t.check(earlyPrompt != nil && raceController.core.onboardingRecord()["status"] as? String=="waiting_user","controller binds deferred approval after actual turn acknowledgement")
    races.failReply=true
    try t.rejects("failed reply invalidates rather than replaying permission") {try raceController.answerRequest(["id":earlyPrompt!["id"]!,"allow":true])}
    try t.check((try raceController.snapshot())["request"]==nil && raceController.core.onboardingRecord()["status"] as? String=="interrupted","failed transport leaves no stale permission UI")
    races.failReply=false
    _=try raceController.connect()
    races.onTurnStart={
        races.onNotification?("turn/completed",["threadId":races.thread,"turn":["id":races.turn,"status":"completed"]])
        raceController.notifications.sync{}
    }
    _=try raceController.resumeWithCodex();raceController.notifications.sync{};raceController.queue.sync{}
    try t.check(raceController.core.onboardingRecord()["status"] as? String=="paused","early completion is matched and verified after turn acknowledgement")
    races.onRequest?(82,"item/fileChange/requestApproval",["threadId":races.thread,"turnId":races.turn,"itemId":"late-82"]);raceController.notifications.sync{}
    try t.check(races.rejected.contains("n:82"),"approval after completed turn cannot reopen consent")
    races.onTurnStart={races.isRunning=false;races.onDisconnect?();raceController.notifications.sync{}}
    try t.rejects("disconnect during turn start cannot resurrect a running state") {_=try raceController.resumeWithCodex()}
    try t.check(raceController.core.onboardingRecord()["status"] as? String=="interrupted" && (try raceController.snapshot())["request"]==nil,"late turn acknowledgement after disconnect stays interrupted")
    let pagination=FixtureCodex();pagination.repeatedModelCursor=true
    try t.rejects("model discovery rejects repeated pagination cursor") {_ = try pagination.discoverOnboardingModel()}
    try codexTransportTests(t,root:root)
    print("Onboarding lifecycle: \(t.count) checks passed (synthetic driver, no login or inference)")
}

private func codexTransportTests(_ t:NativeAccessChecks,root:URL)throws {
    let python=URL(fileURLWithPath:"/usr/bin/python3")
    guard fm.isExecutableFile(atPath:python.path) else{throw failure("Synthetic transport test requires /usr/bin/python3; no real Codex was started.")}
    let script=root.appendingPathComponent("stdio-fixture.py")
    let source="""
    import json, os, sys, time
    def send(value):
        sys.stdout.write(json.dumps(value) + '\\n'); sys.stdout.flush()
    for line in sys.stdin:
        value=json.loads(line); method=value.get('method'); i=value.get('id')
        if i is None: continue
        if method=='initialize':
            send({'id':True,'result':{'userAgent':'invalid-boolean-id'}})
            send({'id':i,'result':{'userAgent':'synthetic-stdio'}})
        elif method=='fixture/duplicate':
            sys.stdout.write(json.dumps({'id':i,'result':{'value':'first'}})+'\\n'+json.dumps({'id':i,'result':{'value':'duplicate'}})+'\\n');sys.stdout.flush()
        elif method=='fixture/fragment':
            text=json.dumps({'id':i,'result':{'value':'fragmented'}})+'\\n'
            sys.stdout.write(text[:9]);sys.stdout.flush();time.sleep(0.03)
            sys.stdout.write(text[9:]);sys.stdout.flush()
        elif method=='fixture/late':
            time.sleep(1.15);send({'id':i,'result':{'value':'late'}})
        elif method=='fixture/disconnect': os._exit(0)
        elif method=='fixture/error': send({'id':i,'error':{'code':-32603,'message':'SENSITIVE_UPSTREAM_ERROR'}})
        else: send({'id':i,'result':{'value':method}})
    """
    try Data(source.utf8).write(to:script,options:.atomic)
    let bridge=CodexBridge(launch:CodexLaunchConfiguration(executable:python,arguments:["-I","-u",script.path],environment:["HOME":root.path,"PATH":"/usr/bin:/bin","PYTHONNOUSERSITE":"1"]))
    defer{bridge.stop()}
    try bridge.start(cwd:root)
    try t.check(bridge.version=="synthetic-stdio","transport rejects boolean ID masquerading as numeric initialization response")
    try t.check(try bridge.request("fixture/duplicate")["value"] as? String=="first","transport accepts first response only, not duplicate overwrite")
    try t.check(try bridge.request("fixture/fragment")["value"] as? String=="fragmented","fragmented JSON-line response is assembled correctly")
    try t.rejects("timed-out request does not remain pending") {_ = try bridge.request("fixture/late",[:],timeout:1)}
    try t.check(try bridge.request("fixture/after-timeout")["value"] as? String=="fixture/after-timeout","late response cannot satisfy a different request")
    var errorText="";do{_ = try bridge.request("fixture/error")}catch{errorText=error.localizedDescription}
    try t.check(!errorText.isEmpty && !errorText.contains("SENSITIVE_UPSTREAM_ERROR"),"transport does not propagate sensitive upstream error messages")
    let disconnected=DispatchSemaphore(value:0);bridge.onDisconnect={disconnected.signal()}
    try t.rejects("process exit releases waiting request") {_ = try bridge.request("fixture/disconnect",[:],timeout:3)}
    try t.check(disconnected.wait(timeout:.now()+3) == .success && !bridge.isRunning,"synthetic transport publishes one disconnect")
    bridge.stop();try bridge.start(cwd:root)
    try t.check(try bridge.request("fixture/restarted")["value"] as? String=="fixture/restarted","new transport starts with empty response/buffer state")
    bridge.stop();try t.check(!bridge.isRunning,"test fixture transport stopped without real Codex or login")
}
