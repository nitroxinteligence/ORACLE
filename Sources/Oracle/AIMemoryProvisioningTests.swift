import Foundation

func runAIMemoryProvisioningTests(root:URL)throws {
    let fm=FileManager.default
    try fm.createDirectory(at:root,withIntermediateDirectories:true)
    var count=0,initCalls=0,probes=0,fetches=0
    func check(_ value:Bool,_ message:String)throws{guard value else{throw OracleAIMemoryProvisioning.error(message)};count+=1;print("PASS "+message)}
    func refuses(_ message:String,_ body:()throws->Void)throws{do{try body()}catch{count+=1;print("PASS "+message);return};throw OracleAIMemoryProvisioning.error("Accepted: "+message)}
    func executable(_ minimum:UInt32=0x000b0000,cpu:UInt32=0x0100000c)->Data {
        let words:[UInt32]=[0xfeedfacf,cpu,0,2,1,24,0,0,0x32,24,1,minimum,0x000f0500,0]
        return Data(words.flatMap{value in (0..<4).map{UInt8((value>>UInt32($0*8))&255)}})
    }
    func local(_ binary:URL,_ args:[String],_ cwd:URL,_ env:[String:String])throws->String {
        let process=Process(),output=Pipe(),errors=Pipe();process.executableURL=binary;process.arguments=args;process.currentDirectoryURL=cwd;process.environment=env;process.standardOutput=output;process.standardError=errors;try process.run()
        let bytes=output.fileHandleForReading.readDataToEndOfFile(),bad=errors.fileHandleForReading.readDataToEndOfFile();process.waitUntilExit()
        guard process.terminationStatus==0 else{throw OracleAIMemoryProvisioning.error(String(decoding:bad,as:UTF8.self))};return String(decoding:bytes,as:UTF8.self)
    }
    let payload=root.appendingPathComponent("payload"),archive=root.appendingPathComponent("fixture.tar.gz"),bytes=executable(),originalConfig=Data("embedding_provider = \"none\"\ncapture_assistant = false\n[auth]\ntoken_pepper = \"synthetic\"\n".utf8)
    try fm.createDirectory(at:payload,withIntermediateDirectories:true);try bytes.write(to:payload.appendingPathComponent("ai-memory"));try fm.setAttributes([.posixPermissions:0o700],ofItemAtPath:payload.appendingPathComponent("ai-memory").path)
    _=try local(URL(fileURLWithPath:"/usr/bin/tar"),["-czf",archive.path,"-C",payload.path,"."],root,["PATH":"/usr/bin:/bin"])
    var pin=AIMemoryProvisioningPin(archiveSHA256:OracleAIMemoryProvisioning.hash(try Data(contentsOf:archive)),binarySHA256:OracleAIMemoryProvisioning.hash(bytes));pin.existingBinarySHA256=["2.4.1":pin.binarySHA256,"2.4.2":pin.binarySHA256]
    var hooks=AIMemoryProvisioningHooks(fetch:{_,_ in fetches+=1;throw OracleAIMemoryProvisioning.error("Network forbidden")},run:{binary,args,cwd,env in
        if binary.lastPathComponent=="tar" {return try local(binary,args,cwd,env)}
        if args==["--version"] {return "ai-memory 2.4.2\n"}
        guard let index=args.firstIndex(of:"--data-dir"),index+1<args.count,args.last=="init" else{throw OracleAIMemoryProvisioning.error("Unexpected fixture command")}
        initCalls+=1;let data=URL(fileURLWithPath:args[index+1]);try fm.createDirectory(at:data,withIntermediateDirectories:true);try originalConfig.write(to:data.appendingPathComponent("config.toml"));return ""
    },probe:{binary,args,cwd,env in
        probes+=1
        guard !binary.path.contains(".stage-"),!args.contains(where:{$0.contains(".stage-")}),env["AI_MEMORY_EMBEDDING_PROVIDER"]=="none",env["OPENAI_API_KEY"]=="",env["AI_MEMORY_LLM_PROVIDER"]=="" else{throw OracleAIMemoryProvisioning.error("Unisolated final protocol descriptor")}
        return ["serverVersion":"2.4.2","protocolVersion":"2024-11-05","tools":["memory_query"],"localProtocolVerified":true]
    })
    let binding:[String:Any]=["plan_hash":"synthetic","vault":"empty-synthetic-vault","vaultSelectionRevision":"revision-A"],state=root.appendingPathComponent("state")
    let first=try OracleAIMemoryProvisioning.prepare(state:state,binding:binding,bundledArchive:archive,pin:pin,hooks:hooks)
    try check(first["runtimePrepared"] as? Bool==true && first["localProtocolVerified"] as? Bool==true,"owned runtime requires final MCP readiness")
    try check(first["captureEnabled"] as? Bool==false && first["hooksTrusted"] as? Bool==false && first["executionVerified"] as? Bool==false,"local readiness never fabricates capture or Codex trust/execution")
    try check(try Data(contentsOf:URL(fileURLWithPath:first["config"] as! String))==originalConfig,"init configuration is preserved without duplicate TOML keys")
    try check(fetches==0 && initCalls==1 && probes==1,"bundled archive avoids network and performs one bounded init/probe")
    let again=try OracleAIMemoryProvisioning.prepare(state:state,binding:binding,bundledArchive:archive,pin:pin,hooks:hooks)
    try check(try OracleAIMemoryProvisioning.canonical(first)==OracleAIMemoryProvisioning.canonical(again),"idempotent preparation returns stable receipt bytes")
    try check(initCalls==1 && probes==1,"verified rerun never reinitializes or restarts runtime")
    let descriptor=try OracleAIMemoryProvisioning.descriptor(first),mcp=descriptor["mcp"] as! [String:Any]
    try check(mcp["name"] as? String=="oracle_ai_memory" && (mcp["args"] as! [String]).contains("stdio"),"project MCP uses owned namespace and official stdio without HTTP service")
    try check((mcp["env"] as! [String:String])["HOME"]!.hasPrefix(state.path+"/") && (mcp["env"] as! [String:String])["ANTHROPIC_API_KEY"]=="","project descriptor uses private HOME and clears ambient credentials")
    try refuses("foreign binding cannot certify runtime"){_=try OracleAIMemoryProvisioning.verify(state:state,binding:["plan_hash":"other"],pin:pin)}
    var forged=first;forged["data"]=root.appendingPathComponent("vault").path;try OracleAIMemoryProvisioning.write(forged,to:state.appendingPathComponent("receipt.json"))
    try refuses("forged data path cannot redirect MCP into vault"){_=try OracleAIMemoryProvisioning.verify(state:state,binding:binding,pin:pin)}
    try OracleAIMemoryProvisioning.write(first,to:state.appendingPathComponent("receipt.json"))
    try refuses("x86 binary is refused before execution"){_=try OracleAIMemoryProvisioning.admission(executable(cpu:0x01000007))}
    try refuses("runtime beyond macOS13 is refused"){_=try OracleAIMemoryProvisioning.admission(executable(0x000e0000))}
    let bad=root.appendingPathComponent("bad.tar.gz");try Data("invalid archive".utf8).write(to:bad)
    let failed=root.appendingPathComponent("failed")
    try refuses("archive SHA mismatch stops before init"){_=try OracleAIMemoryProvisioning.prepare(state:failed,binding:binding,bundledArchive:bad,pin:pin,hooks:hooks)}
    try check(try fm.contentsOfDirectory(atPath:failed.path).isEmpty,"failed owned stage is removed without publishing receipt")
    let foreign=root.appendingPathComponent("foreign"),foreignInstall=foreign.appendingPathComponent("installation-2.4.2")
    try fm.createDirectory(at:foreignInstall,withIntermediateDirectories:true);try Data("keep".utf8).write(to:foreignInstall.appendingPathComponent("note.md"))
    try refuses("unowned existing installation is preserved"){_=try OracleAIMemoryProvisioning.prepare(state:foreign,binding:binding,bundledArchive:archive,pin:pin,hooks:hooks)}
    try check(try String(contentsOf:foreignInstall.appendingPathComponent("note.md"),encoding:.utf8)=="keep","foreign file bytes survive failed preparation")
    let interrupted=root.appendingPathComponent("interrupted"),normalProbe=hooks.probe
    hooks.probe={_,_,_,_ in throw OracleAIMemoryProvisioning.error("Synthetic interruption after move")}
    try refuses("readiness failure after move leaves recoverable owned installation"){_=try OracleAIMemoryProvisioning.prepare(state:interrupted,binding:binding,bundledArchive:archive,pin:pin,hooks:hooks)}
    try check(!fm.fileExists(atPath:interrupted.appendingPathComponent("receipt.json").path),"interrupted move never produces completed receipt")
    hooks.probe=normalProbe;let beforeInit=initCalls
    let recovered=try OracleAIMemoryProvisioning.prepare(state:interrupted,binding:binding,bundledArchive:archive,pin:pin,hooks:hooks)
    try check(recovered["localProtocolVerified"] as? Bool==true && initCalls==beforeInit,"rerun verifies moved owned files without reinit or deletion")
    let host=root.appendingPathComponent("codex"),existingData=root.appendingPathComponent("existing-data"),alias=root.appendingPathComponent("aliases/ai-memory"),real=payload.appendingPathComponent("ai-memory")
    try fm.createDirectory(at:host,withIntermediateDirectories:true);try fm.createDirectory(at:existingData,withIntermediateDirectories:true);try fm.createDirectory(at:alias.deletingLastPathComponent(),withIntermediateDirectories:true)
    try fm.createSymbolicLink(at:alias,withDestinationURL:real);try originalConfig.write(to:existingData.appendingPathComponent("config.toml"))
    let url="http://127.0.0.1:49375/mcp",toml="[mcp_servers.ai-memory]\nurl = \"\(url)\"\n"
    try Data(toml.utf8).write(to:host.appendingPathComponent("config.toml"))
    let command="'\(alias.path)' --data-dir '\(existingData.path)' hook --event session-start --agent codex --server-url http://127.0.0.1:49375"
    try OracleAIMemoryProvisioning.write(["hooks":["SessionStart":[["hooks":[["type":"command","command":command]]]]]],to:host.appendingPathComponent("hooks.json"))
    let existing=try OracleAIMemoryProvisioning.existingCodex(codexHome:host,forbidden:[root.appendingPathComponent("vault")])!
    try check(existing["binary"] as? String==real.path,"legitimate executable alias is canonicalized read-only")
    for header in ["[ mcp_servers.ai_memory ]","[mcp_servers . ai_memory]","  [ mcp_servers . ai_memory ] # preserved comment"] {
        let fixture=Data((header+"\nurl = \""+url+"\"\n[unrelated]\nurl = \"http://127.0.0.1:49374/mcp\"\n").utf8)
        try fixture.write(to:host.appendingPathComponent("config.toml"))
        let detected=try OracleAIMemoryProvisioning.existingCodex(codexHome:host,forbidden:[])
        try check(detected?["serverName"] as? String=="ai_memory" && detected?["serverURL"] as? String==url,"valid TOML whitespace preserves existing server: "+header)
        try check(try Data(contentsOf:host.appendingPathComponent("config.toml"))==fixture,"read-only discovery preserves spaced configuration bytes")
    }
    for fixture in ["[mcp_servers.ai_memory]\n[unrelated]\nurl = \""+url+"\"\n",toml+"[mcp_servers.\"ai_memory\"]\nurl = \""+url+"\"\n","mcp_servers={ai_memory={url=\""+url+"\"}}\n"] {
        try Data(fixture.utf8).write(to:host.appendingPathComponent("config.toml"))
        try refuses("unparsed AI Memory or unrelated table cannot permit a duplicate"){_=try OracleAIMemoryProvisioning.existingCodex(codexHome:host,forbidden:[])}
    }
    try Data("[mcp_servers.unrelated]\nurl = \"http://127.0.0.1:12345/mcp\"\n".utf8).write(to:host.appendingPathComponent("config.toml"))
    try check(try OracleAIMemoryProvisioning.existingCodex(codexHome:host,forbidden:[])==nil,"unrelated MCP alone does not claim AI Memory")
    try Data(toml.utf8).write(to:host.appendingPathComponent("config.toml"))
    var existingHooks=hooks;existingHooks.run={binary,args,cwd,env in if args==["--version"]{return "ai-memory 2.4.1"};throw OracleAIMemoryProvisioning.error("Existing install must not mutate")}
    let reusedState=root.appendingPathComponent("reuse"),reused=try OracleAIMemoryProvisioning.prepare(state:reusedState,binding:binding,existing:existing,pin:pin,hooks:existingHooks)
    try check(reused["version"] as? String=="2.4.1" && reused["pinApplied"] as? Bool==false,"compatible existing release is preserved without upgrade")
    try check(try OracleAIMemoryProvisioning.descriptor(reused)["mcp"] is NSNull,"existing Codex integration suppresses duplicate project MCP")
    try check(try String(contentsOf:host.appendingPathComponent("config.toml"),encoding:.utf8)==toml,"existing global configuration is never changed")
    try fm.removeItem(at:alias);let changed=payload.appendingPathComponent("changed");try bytes.write(to:changed);try fm.createSymbolicLink(at:alias,withDestinationURL:changed)
    try refuses("changed executable alias invalidates old evidence"){_=try OracleAIMemoryProvisioning.verify(state:reusedState,binding:binding,pin:pin)}
    try refuses("existing data cannot overlap vault"){_=try OracleAIMemoryProvisioning.existingCodex(codexHome:host,forbidden:[existingData])}
    try Data("[mcp_servers.ai-memory]\nurl = \"http://127.0.0.1:49374/mcp\"\n".utf8).write(to:host.appendingPathComponent("config.toml"))
    try refuses("Hermes port is never adopted as Codex installation"){_=try OracleAIMemoryProvisioning.existingCodex(codexHome:host,forbidden:[])}
    print("AI Memory provisioning: \(count) synthetic checks; no global config, service or model")
}
