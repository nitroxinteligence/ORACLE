import Foundation

/// Reusable only in explicitly isolated self-tests or a QA validation bundle.
func oracleRuntimeBindingTestContext(home:URL,arguments:[String]=ProcessInfo.processInfo.arguments)->Bool {
    let env=ProcessInfo.processInfo.environment
    let selfTest=arguments.contains{$0.hasPrefix("--self-test")}
    let root=env["ORACLE_TEST_ROOT"].map{URL(fileURLWithPath:$0).standardizedFileURL}
    let cli=selfTest && root?.pathComponents.contains(".work")==true && root.map{home.path.hasPrefix($0.path+"/")}==true
    let qa=Bundle.main.bundleIdentifier?.hasSuffix(".validation")==true && Bundle.main.object(forInfoDictionaryKey:"OracleQAState") as? String==home.path
    return home.pathComponents.contains(".work") && home.path==home.standardizedFileURL.path && home.resolvingSymlinksInPath().path==home.path && (cli || qa)
}
func prepareOracleRuntimeBindingTestFixture(home:URL)throws->URL {
    guard oracleRuntimeBindingTestContext(home:home) else {throw OracleCodexRuntimeBinding.error("Fixture de runtime exige estado de teste isolado explícito.")}
    let root=home.appendingPathComponent("fixtures/runtime"),bundle=root.appendingPathComponent("Applications/Oracle.app")
    guard root.resolvingSymlinksInPath().path==root.path,bundle.resolvingSymlinksInPath().path==bundle.path else {throw OracleCodexRuntimeBinding.error("Fixture não pode atravessar links simbólicos.")}
    if FileManager.default.fileExists(atPath:root.path) {
        let markerURL=root.appendingPathComponent("owner.json")
        try OracleCodexRuntimeBinding.existing(markerURL)
        let previous=try JSONSerialization.jsonObject(with:Data(contentsOf:markerURL)) as? [String:Any]
        guard previous?["schema_version"] as? Int==1,previous?["owner"] as? String=="oracle-runtime-self-test",previous?["home"] as? String==home.path,previous?["bundle"] as? String==bundle.path else {throw OracleCodexRuntimeBinding.error("Fixture preexistente não pertence ao teste.")}
    }
    try writeOracleRuntimeFixture(bundle:bundle)
    let marker:[String:Any]=["schema_version":1,"owner":"oracle-runtime-self-test","home":home.path,"bundle":bundle.path]
    try JSONSerialization.data(withJSONObject:marker,options:[.sortedKeys]).write(to:root.appendingPathComponent("owner.json"),options:.atomic)
    return bundle
}
private func writeOracleRuntimeFixture(bundle:URL)throws {
    let manager=FileManager.default
    for path in ["Contents/MacOS","Contents/Resources/engine"] {try manager.createDirectory(at:bundle.appendingPathComponent(path),withIntermediateDirectories:true)}
    for path in ["Contents/MacOS/Oracle","Contents/Resources/engine/oracle-gbrain-read"] {
        let url=bundle.appendingPathComponent(path);try Data("#!/bin/sh\nexit 0\n".utf8).write(to:url)
        try manager.setAttributes([.posixPermissions:0o700],ofItemAtPath:url.path)
    }
    let info:[String:Any]=["CFBundleIdentifier":"com.oraclecompanion.macos","CFBundleExecutable":"Oracle","CFBundleShortVersionString":"1.0.0"]
    try PropertyListSerialization.data(fromPropertyList:info,format:.xml,options:0).write(to:bundle.appendingPathComponent("Contents/Info.plist"))
    let manifest:[String:Any]=["product":"oracle-macos","version":"1.0.0","commit":String(repeating:"a",count:40),"dirty":false]
    try JSONSerialization.data(withJSONObject:manifest).write(to:bundle.appendingPathComponent("Contents/Resources/build-manifest.json"))
}
func runCodexRuntimeBindingTests(root:URL)throws {
    let manager=FileManager.default,applications=root.appendingPathComponent("Applications"),bundle=applications.appendingPathComponent("Oracle.app")
    var count=0
    func check(_ value:Bool,_ name:String)throws {guard value else{throw OracleCodexRuntimeBinding.error("FAIL "+name)};count+=1;print("PASS "+name)}
    func reject(_ name:String,_ body:()throws->Void)throws {var rejected=false;do{try body()}catch{rejected=true};try check(rejected,name)}
    // Check admission before any fixture files are created. Normal CLI arguments
    // never become a self-test just because this test's own process is one.
    try check(!oracleRuntimeBindingTestContext(home:root,arguments:["oracle"]),"normal CLI is not a runtime fixture context")
    guard let testRoot=ProcessInfo.processInfo.environment["ORACLE_TEST_ROOT"] else{throw OracleCodexRuntimeBinding.error("Runtime suite requires ORACLE_TEST_ROOT.")}
    let outside=URL(fileURLWithPath:testRoot).standardizedFileURL.deletingLastPathComponent().appendingPathComponent("outside-runtime-test-"+UUID().uuidString.lowercased())
    try check(!oracleRuntimeBindingTestContext(home:outside,arguments:["oracle","--self-test-runtime-binding"]),"profile outside explicit test root is refused before fixture creation")
    try check(!manager.fileExists(atPath:outside.path),"rejected profile creates no fixture files")
    try check(oracleRuntimeBindingTestContext(home:root,arguments:["oracle","--self-test-runtime-binding"]),"isolated self-test admits runtime fixture")
    try writeOracleRuntimeFixture(bundle:bundle)
    let oracle=bundle.appendingPathComponent("Contents/MacOS/Oracle"),adapter=bundle.appendingPathComponent("Contents/Resources/engine/oracle-gbrain-read")
    func prepare(_ signature:String="test_fixture")throws->[String:Any] {try OracleCodexRuntimeBinding.prepare(bundle:bundle,oracle:oracle,adapter:adapter,installationRoots:[applications],signature:{_ in signature})}
    let binding=try prepare()
    let command=OracleCodexRuntimeBinding.hookCommand(executable:oracle.path,state:root.path)
    var events=[String:Any]();for name in OracleCodexRuntimeBinding.hookEvents {events[name]=[["hooks":[["type":"command","command":command]]]]}
    let hooks:[String:Any]=["hooks":events]
    let target=String(decoding:try JSONSerialization.data(withJSONObject:[adapter.path]),as:UTF8.self).dropFirst().dropLast()
    let mcp="[mcp_servers.oracle_companion]\ncommand = \(target)\nargs = [\"--mcp\"]\n"
    func verify(_ b:[String:Any]=binding,_ h:[String:Any]=hooks,_ config:String?=mcp)throws { _=try OracleCodexRuntimeBinding.verify(binding:b,hooks:h,mcp:config,state:root.path)}
    try verify();try check(true,"durable targets and exact managed commands")
    try verify(binding,hooks,nil);try check(true,"attached installation preserves its MCP config")
    try reject("unknown signature rejected"){_=try prepare("unknown")}
    try check(try prepare("developer_ad_hoc")["signature"] as? String=="developer_ad_hoc","ad hoc is classified separately")
    try check(try prepare("developer_id")["notarization_verified"] as? Bool==false,"Developer ID does not imply notarization")
    try reject("temporary build refused"){_=try OracleCodexRuntimeBinding.prepare(bundle:bundle,oracle:oracle,adapter:adapter,installationRoots:[root.appendingPathComponent("Elsewhere")],signature:{_ in "test_fixture"})}
    try reject("other adapter refused"){_=try OracleCodexRuntimeBinding.prepare(bundle:bundle,oracle:oracle,adapter:oracle,installationRoots:[applications],signature:{_ in "test_fixture"})}
    try reject("legacy trusted ledger cannot hide absent binding"){try verify([:])}
    try reject("MCP wrong target refused"){try verify(binding,hooks,mcp.replacingOccurrences(of:"oracle-gbrain-read",with:"missing"))}
    try reject("duplicate MCP command refused"){try verify(binding,hooks,mcp+"command = \(target)\n")}
    var changed=events;changed["Stop"]=[["hooks":[["type":"command","command":"'/missing' --hook"]]]]
    try reject("trusted hook to missing executable refused"){try verify(binding,["hooks":changed])}
    try manager.setAttributes([.posixPermissions:0o600],ofItemAtPath:adapter.path)
    try reject("non executable adapter refused"){try verify()}
    try manager.setAttributes([.posixPermissions:0o700],ofItemAtPath:adapter.path)
    try Data("#!/bin/sh\nexit 1\n".utf8).write(to:adapter)
    try reject("same location runtime replacement requires reprepare"){try verify()}
    let replaced=try prepare();try verify(replaced);try check(true,"explicit reprepare accepts current verified replacement")
    try manager.removeItem(at:adapter);try manager.createSymbolicLink(at:adapter,withDestinationURL:oracle)
    try reject("symlink adapter refused"){_=try prepare()}
    try manager.removeItem(at:adapter);try writeOracleRuntimeFixture(bundle:bundle)
    let moved=applications.appendingPathComponent("Moved.app");try manager.moveItem(at:bundle,to:moved)
    try reject("deleted and relocated bundle marks binding broken"){try verify()}
    let relocated=try OracleCodexRuntimeBinding.prepare(bundle:moved,oracle:moved.appendingPathComponent("Contents/MacOS/Oracle"),adapter:moved.appendingPathComponent("Contents/Resources/engine/oracle-gbrain-read"),installationRoots:[applications],signature:{_ in "test_fixture"})
    try check(relocated["bundle"] as? String==moved.path,"explicit current relocated bundle accepted")
    try runDesktopPluginRuntimeBindingTests(root:root.appendingPathComponent("desktop-plugin-tests"))
    print("PASS \(count) runtime binding checks")
}

func runDesktopPluginRuntimeBindingTests(root:URL)throws {
    guard oracleRuntimeBindingTestContext(home:root) else{throw failure("Runtime do plugin exige perfil sintético isolado.")}
    let manager=FileManager.default,cache=root.appendingPathComponent("cache/version-a/runtime/Oracle.app"),home=root.appendingPathComponent("profile")
    try manager.createDirectory(at:home,withIntermediateDirectories:true)
    try writeOracleRuntimeFixture(bundle:cache)
    let expected=try OracleDesktopPluginRuntime.inventory(cache)
    let signature:(URL)throws->String={_ in "test_fixture"}
    let first=try OracleDesktopPluginRuntime.prepare(home:home,source:cache,expectedFiles:expected,signature:signature)
    var pluginChecks=0
    func check(_ condition:Bool,_ label:String)throws {guard condition else{throw failure("FAIL plugin runtime "+label)};pluginChecks+=1;print("PASS plugin runtime "+label)}
    func reject(_ label:String,_ body:()throws->Void)throws {var refused=false;do{try body()}catch{refused=true};try check(refused,label)}
    let executable=first["oracle"] as! String,adapter=first["adapter"] as! String
    var events=[String:Any]();for name in OracleCodexRuntimeBinding.hookEvents {events[name]=[["hooks":[["type":"command","command":OracleCodexRuntimeBinding.hookCommand(executable:executable,state:home.path)]]]]}
    let hooks:[String:Any]=["hooks":events]
    func verifyFirst()throws {_=try OracleCodexRuntimeBinding.verify(binding:first,hooks:hooks,mcp:nil,state:home.path)}
    try check(!executable.hasPrefix(root.appendingPathComponent("cache").path),"hooks use immutable owned generation")
    try verifyFirst()
    let relocated=root.appendingPathComponent("cache/version-relocated/runtime/Oracle.app")
    try manager.createDirectory(at:relocated.deletingLastPathComponent(),withIntermediateDirectories:true)
    try manager.moveItem(at:cache,to:relocated)
    let same=try OracleDesktopPluginRuntime.prepare(home:home,source:relocated,expectedFiles:expected,signature:signature)
    try check(same["oracle"] as? String==executable,"cache relocation reuses identical verified generation")
    let copiedAdapter=URL(fileURLWithPath:adapter),before=try Data(contentsOf:copiedAdapter)
    try manager.removeItem(at:relocated)
    try verifyFirst();try check(try Data(contentsOf:copiedAdapter)==before,"cache deletion preserves hooks and adapter")
    let next=root.appendingPathComponent("cache/version-b/runtime/Oracle.app")
    try writeOracleRuntimeFixture(bundle:next)
    try Data("#!/bin/sh\nexit 2\n".utf8).write(to:next.appendingPathComponent("Contents/MacOS/Oracle"))
    let nextFiles=try OracleDesktopPluginRuntime.inventory(next)
    let second=try OracleDesktopPluginRuntime.prepare(home:home,source:next,expectedFiles:nextFiles,signature:signature)
    try check(second["oracle"] as? String != executable,"updated runtime creates separate immutable generation")
    try verifyFirst();try check(manager.fileExists(atPath:executable),"old generation survives update for existing hooks/scheduler")
    let current=home.appendingPathComponent("desktop-plugin-runtime/current.json")
    try manager.removeItem(at:current)
    let recovered=try OracleDesktopPluginRuntime.prepare(home:home,source:next,expectedFiles:nextFiles,signature:signature)
    try check(recovered["oracle"] as? String==second["oracle"] as? String && manager.fileExists(atPath:current.path),"move-before-pointer interruption recovers verified generation")
    let partial=home.appendingPathComponent("desktop-plugin-runtime/.stage-interrupted")
    try manager.createDirectory(at:partial,withIntermediateDirectories:false)
    _=try OracleDesktopPluginRuntime.prepare(home:home,source:next,expectedFiles:nextFiles,signature:signature)
    try check(manager.fileExists(atPath:partial.path),"unowned interrupted staging is preserved")
    try reject("inventory mismatch rejected"){_=try OracleDesktopPluginRuntime.prepare(home:home,source:next,expectedFiles:expected,signature:signature)}
    try reject("signature failure preserves old generation"){_=try OracleDesktopPluginRuntime.prepare(home:home,source:next,expectedFiles:nextFiles,signature:{_ in throw failure("synthetic signature failure")})}
    try Data("tampered".utf8).write(to:URL(fileURLWithPath:second["adapter"] as! String))
    try reject("tampered owned generation is not overwritten"){_=try OracleDesktopPluginRuntime.prepare(home:home,source:next,expectedFiles:nextFiles,signature:signature)}
    let foreign=root.appendingPathComponent("foreign-profile");try manager.createDirectory(at:foreign.appendingPathComponent("desktop-plugin-runtime"),withIntermediateDirectories:true)
    try writeJSON(["owner":"other","schema_version":1,"home":foreign.path],foreign.appendingPathComponent("desktop-plugin-runtime/owner.json"))
    try reject("foreign owner is preserved"){_=try OracleDesktopPluginRuntime.prepare(home:foreign,source:next,expectedFiles:nextFiles,signature:signature)}
    let linked=next.appendingPathComponent("Contents/Resources/foreign-link")
    try manager.createSymbolicLink(at:linked,withDestinationURL:home)
    try reject("source symlink is rejected"){_=try OracleDesktopPluginRuntime.inventory(next)}
    if let path=ProcessInfo.processInfo.environment["ORACLE_PLUGIN_RUNTIME_BENCHMARK_BUNDLE"] {
        let bundle=URL(fileURLWithPath:path).standardizedFileURL
        guard bundle.pathComponents.contains(".work"),bundle.pathExtension=="app" else{throw failure("Benchmark exige bundle local dentro de .work.")}
        OracleCodexRuntimeBinding.invalidateCache()
        let start=Date(),cold=try OracleDesktopPluginRuntime.inventory(bundle),middle=Date(),hot=try OracleDesktopPluginRuntime.inventory(bundle),end=Date()
        try check(cold==hot,"cold/hot inventory fingerprint cache preserves exact hashes")
        print("BENCHMARK plugin inventory files=\(cold.count) cold_ms=\(Int(middle.timeIntervalSince(start)*1000)) hot_ms=\(Int(end.timeIntervalSince(middle)*1000))")
    }
    print("PASS \(pluginChecks) desktop plugin immutable runtime relocation/update/recovery checks")
}
