import Foundation
import Darwin

func runAIMemoryServiceTests(root:URL,binary:URL,config:URL)throws {
    let fm=FileManager.default;try fm.createDirectory(at:root,withIntermediateDirectories:true)
    let installation=root.appendingPathComponent("installation-2.4.2"),runtimeDir=installation.appendingPathComponent("runtime"),data=installation.appendingPathComponent("data")
    try fm.createDirectory(at:runtimeDir,withIntermediateDirectories:true);try fm.createDirectory(at:data,withIntermediateDirectories:true)
    let executable=runtimeDir.appendingPathComponent("ai-memory"),configuration=data.appendingPathComponent("config.toml")
    try fm.copyItem(at:binary,to:executable);try fm.copyItem(at:config,to:configuration)
    var runtime:[String:Any]=["mode":"owned","runtimePrepared":true,"localProtocolVerified":true,"version":"2.4.2","binary":executable.path,"data":data.path,"config":configuration.path,"binarySHA256":OracleAIMemoryProvisioning.hash(try Data(contentsOf:executable)),"configSHA256":OracleAIMemoryProvisioning.hash(try Data(contentsOf:configuration)),"binding":["vault":root.appendingPathComponent("vault-a").path,"vaultSelectionRevision":"fixture1","plan_hash":"synthetic1"]]
    var child:Process?,registrations=0,failStart=false,failRegister=true,stopCalls=0
    func stop(){if let p=child,p.isRunning{p.terminate();p.waitUntilExit()};child=nil}
    defer{stop()}
    let state=root.appendingPathComponent("service"),agents=root.appendingPathComponent("synthetic-launch-agents")
    let hooks=AIMemoryServiceHooks(register:{_,_ in registrations+=1;if failRegister{throw OracleAIMemoryService.fail("synthetic registration cut")}},start:{_ in
        if failStart{throw OracleAIMemoryService.fail("synthetic start failure")}
        if child?.isRunning==true{return}
        let receipt=try OracleAIMemoryProvisioning.object(state.appendingPathComponent("receipt.json")),p=Process()
        p.executableURL=executable;p.arguments=OracleAIMemoryService.arguments(runtime:runtime,port:receipt["port"] as! Int)
        p.environment=OracleAIMemoryProvisioning.environment(home:installation.appendingPathComponent("execution-home"),data:data)
        p.standardOutput=FileHandle.nullDevice;p.standardError=FileHandle.nullDevice;try p.run();child=p
    },stop:{_,_ in stopCalls+=1;stop()},identity:{_,_,_,_ in
        guard let p=child,p.isRunning else{throw OracleAIMemoryService.fail("synthetic child unavailable")};return p.processIdentifier
    },probe:{url in
        let end=Date().addingTimeInterval(20)
        repeat{if let proof=try? OracleAIMemoryServiceHTTP.probe(url){return proof};Thread.sleep(forTimeInterval:0.1)}while Date()<end
        throw OracleAIMemoryService.fail("real HTTP child readiness failed")
    })
    func check(_ condition:Bool,_ message:String)throws{guard condition else{throw OracleAIMemoryService.fail(message)};print("PASS "+message)}
    func rejects(_ message:String,_ body:()throws->Void)throws{do{try body()}catch{print("PASS "+message);return};throw OracleAIMemoryService.fail("expected refusal "+message)}
    try rejects("pending registration cut resumes owned plist"){_=try OracleAIMemoryService.prepare(state:state,runtime:runtime,launchAgents:agents,hooks:hooks)}
    failRegister=false
    failStart=true
    try rejects("start failure persists owned receipt"){_=try OracleAIMemoryService.prepare(state:state,runtime:runtime,launchAgents:agents,hooks:hooks)}
    failStart=false
    let prepared=try OracleAIMemoryService.prepare(state:state,runtime:runtime,launchAgents:agents,hooks:hooks)
    try check(prepared["serviceAvailable"] as? Bool==false,"registration is not runtime readiness")
    try rejects("static descriptor refused"){_=try OracleAIMemoryService.descriptor(prepared)}
    let ready=try OracleAIMemoryService.verify(state:state,runtime:runtime,hooks:hooks)
    try check((ready["protocol"] as? [String:Any])?["twoClientsVerified"] as? Bool==true,"real HTTP two clients same singleton")
    var foreignHooks=hooks;foreignHooks.identity={_,_,_,_ in throw OracleAIMemoryService.fail("foreign process")}
    try rejects("foreign endpoint identity refused"){_=try OracleAIMemoryService.verify(state:state,runtime:runtime,hooks:foreignHooks)}
    var wrongProtocol=hooks;wrongProtocol.probe={_ in ["httpProtocolVerified":true,"serverVersion":"foreign"]}
    try rejects("wrong HTTP server version refused"){_=try OracleAIMemoryService.verify(state:state,runtime:runtime,hooks:wrongProtocol)}
    try check(![49374,49375].contains(prepared["port"] as! Int),"reserved existing service ports excluded")
    let again=try OracleAIMemoryService.verify(state:state,runtime:runtime,hooks:hooks)
    try check(try OracleAIMemoryProvisioning.canonical(ready)==OracleAIMemoryProvisioning.canonical(again),"stable verified receipt")
    try check(try OracleAIMemoryServiceProcess.arguments(pid:child!.processIdentifier)==[executable.path]+OracleAIMemoryService.arguments(runtime:runtime,port:prepared["port"] as! Int),"kernel argv identity exact")
    let oldPID=child!.processIdentifier
    _=try OracleAIMemoryService.prepare(state:state,runtime:runtime,launchAgents:agents,hooks:hooks)
    try check(child!.processIdentifier==oldPID,"idempotent live reuse")
    stop();try rejects("crash invalidates readiness"){_=try OracleAIMemoryService.verify(state:state,runtime:runtime,hooks:hooks)}
    _=try OracleAIMemoryService.prepare(state:state,runtime:runtime,launchAgents:agents,hooks:hooks);_=try OracleAIMemoryService.verify(state:state,runtime:runtime,hooks:hooks)
    let saved=try OracleAIMemoryProvisioning.object(state.appendingPathComponent("receipt.json"))
    let savedPlist=URL(fileURLWithPath:saved["plist"] as! String)
    var forged=saved;forged["label"]="foreign-service";forged["plist"]=root.appendingPathComponent("foreign.plist").path
    try OracleAIMemoryProvisioning.write(forged,to:state.appendingPathComponent("receipt.json"))
    var nextRuntime=runtime;nextRuntime["binding"]=["vault":root.appendingPathComponent("vault-cut-b").path,"vaultSelectionRevision":"cut-b","plan_hash":"cut-b"]
    let beforeStops=stopCalls
    try rejects("foreign receipt rejected before stop"){_=try OracleAIMemoryService.prepare(state:state,runtime:nextRuntime,launchAgents:agents,hooks:hooks)}
    try check(stopCalls==beforeStops,"foreign label never stopped")
    try OracleAIMemoryProvisioning.write(saved,to:state.appendingPathComponent("receipt.json"))
    let savedBytes=try Data(contentsOf:savedPlist)
    var next=saved
    var nextDoc=try PropertyListSerialization.propertyList(from:savedBytes,options:[],format:nil) as! [String:Any]
    nextDoc["ProgramArguments"]=[executable.path]+OracleAIMemoryService.arguments(runtime:nextRuntime,port:saved["port"] as! Int)
    let nextBytes=try PropertyListSerialization.data(fromPropertyList:nextDoc,format:.xml,options:0)
    next["binding"]=nextRuntime["binding"];next["runtimeFingerprint"]=try OracleAIMemoryService.fingerprint(nextRuntime)
    next["previousPlistSHA256"]=saved["plistSHA256"];next["plistSHA256"]=OracleAIMemoryProvisioning.hash(nextBytes);next["plistBytes"]=nextBytes.base64EncodedString();next["registered"]=false;next["serviceAvailable"]=false
    try OracleAIMemoryProvisioning.write(next,to:state.appendingPathComponent("pending.json"))
    _=try OracleAIMemoryService.prepare(state:state,runtime:runtime,launchAgents:agents,hooks:hooks)
    try check(try Data(contentsOf:savedPlist)==savedBytes,"cut A to B before plist replacement returns A")
    _=try OracleAIMemoryService.verify(state:state,runtime:runtime,hooks:hooks)
    try OracleAIMemoryProvisioning.write(next,to:state.appendingPathComponent("pending.json"));stop();try nextBytes.write(to:savedPlist)
    _=try OracleAIMemoryService.prepare(state:state,runtime:runtime,launchAgents:agents,hooks:hooks)
    try check(try Data(contentsOf:savedPlist)==savedBytes,"cut A to B after plist replacement restores A")
    _=try OracleAIMemoryService.verify(state:state,runtime:runtime,hooks:hooks)
    let initialState=root.appendingPathComponent("initial-cut-service"),initialAgents=root.appendingPathComponent("initial-cut-agents")
    try fm.createDirectory(at:initialState,withIntermediateDirectories:true)
    var initial=saved
    let initialLabel="com.oraclecompanion.ai-memory."+OracleAIMemoryProvisioning.hash(Data(initialState.path.utf8)).prefix(20)
    var initialDoc=try PropertyListSerialization.propertyList(from:savedBytes,options:[],format:nil) as! [String:Any];initialDoc["Label"]=String(initialLabel);initialDoc["StandardOutPath"]=initialState.appendingPathComponent("stdout.log").path;initialDoc["StandardErrorPath"]=initialState.appendingPathComponent("stderr.log").path
    let initialBytes=try PropertyListSerialization.data(fromPropertyList:initialDoc,format:.xml,options:0)
    initial["label"]=String(initialLabel);initial["plist"]=initialAgents.appendingPathComponent(String(initialLabel)+".plist").path;initial["plistBytes"]=initialBytes.base64EncodedString();initial["plistSHA256"]=OracleAIMemoryProvisioning.hash(initialBytes);initial["registered"]=false
    try OracleAIMemoryProvisioning.write(initial,to:initialState.appendingPathComponent("pending.json"))
    let noJob=AIMemoryServiceHooks(register:{_,_ in},start:{_ in},stop:{_,_ in throw OracleAIMemoryService.fail("must not stop initial journal")},identity:{_,_,_,_ in 0})
    let rebound=try OracleAIMemoryService.prepare(state:initialState,runtime:nextRuntime,launchAgents:initialAgents,hooks:noJob)
    try check(rebound["runtimeFingerprint"] as? String==(try OracleAIMemoryService.fingerprint(nextRuntime)),"initial cut before plist permits vault rebind without stop")
    let old=runtime;runtime["binding"]=["vault":root.appendingPathComponent("vault-b").path,"vaultSelectionRevision":"fixture2","plan_hash":"synthetic2"]
    try rejects("changed vault revokes old service verification"){_=try OracleAIMemoryService.verify(state:state,runtime:runtime,hooks:hooks)}
    _=try OracleAIMemoryService.prepare(state:state,runtime:runtime,launchAgents:agents,hooks:hooks);_=try OracleAIMemoryService.verify(state:state,runtime:runtime,hooks:hooks)
    try rejects("previous vault cannot verify rebound service"){_=try OracleAIMemoryService.verify(state:state,runtime:old,hooks:hooks)}
    let receipt=try OracleAIMemoryProvisioning.object(state.appendingPathComponent("receipt.json")),plist=URL(fileURLWithPath:receipt["plist"] as! String)
    let foreign=Data("foreign plist synthetic".utf8);try foreign.write(to:plist)
    try rejects("foreign edited plist preserved"){_=try OracleAIMemoryService.prepare(state:state,runtime:runtime,launchAgents:agents,hooks:hooks)}
    try check(try Data(contentsOf:plist)==foreign,"no overwrite foreign plist")
    let existing=try OracleAIMemoryService.prepare(state:root.appendingPathComponent("existing-service"),runtime:["mode":"existing"],launchAgents:agents,hooks:hooks)
    try check(existing["registered"] as? Bool==false && !fm.fileExists(atPath:root.appendingPathComponent("existing-service").path),"existing installation never managed")
    try OracleAIMemoryProvisioning.write(["syntheticLaunchAgentAdapter":true,"actualLaunchAgentRegistered":false,"realHTTP":true,"twoClients":true,"checks":22],to:root.appendingPathComponent("report.json"))
}

func runAIMemoryServiceDriverTests(root:URL,binary:URL,config:URL)throws {
    let fm=FileManager.default,profile=root.appendingPathComponent("driver-profile"),state=profile.appendingPathComponent("service"),installation=profile.appendingPathComponent("installation-2.4.2")
    let runtimeDir=installation.appendingPathComponent("runtime"),data=installation.appendingPathComponent("data")
    try fm.createDirectory(at:runtimeDir,withIntermediateDirectories:true);try fm.createDirectory(at:data,withIntermediateDirectories:true)
    let executable=runtimeDir.appendingPathComponent("ai-memory"),configuration=data.appendingPathComponent("config.toml")
    try fm.copyItem(at:binary,to:executable);try fm.copyItem(at:config,to:configuration)
    let runtime:[String:Any]=["mode":"owned","runtimePrepared":true,"localProtocolVerified":true,"version":"2.4.2","binary":executable.path,"data":data.path,"config":configuration.path,"binarySHA256":OracleAIMemoryProvisioning.hash(try Data(contentsOf:executable)),"configSHA256":OracleAIMemoryProvisioning.hash(try Data(contentsOf:configuration)),"binding":["vault":profile.appendingPathComponent("vault").path,"vaultSelectionRevision":"driver-fixture","plan_hash":"driver-fixture"]]
    guard let hooks=try OracleAIMemoryServiceTestDriver.hooksIfAllowed(profile:profile,state:state) else{throw OracleAIMemoryService.fail("Expected explicitly gated child driver")}
    defer{OracleAIMemoryServiceTestDriver.cleanup(profile:profile)}
    _=try OracleAIMemoryService.prepare(state:state,runtime:runtime,launchAgents:profile.appendingPathComponent("host-fixture/Library/LaunchAgents"),hooks:hooks)
    let ready=try OracleAIMemoryService.verify(state:state,runtime:runtime,hooks:hooks)
    guard ready["httpProtocolVerified"] as? Bool==true else{throw OracleAIMemoryService.fail("Child driver failed real HTTP proof")}
    print("PASS gated shared child driver real HTTP and kernel/listener identity")
    OracleAIMemoryServiceTestDriver.cleanup(profile:profile)
    do{_=try OracleAIMemoryService.verify(state:state,runtime:runtime,hooks:hooks)}catch{print("PASS shared child cleanup revokes readiness");return}
    throw OracleAIMemoryService.fail("Cleaned child still verified")
}
