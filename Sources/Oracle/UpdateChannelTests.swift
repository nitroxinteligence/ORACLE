import Foundation
import CryptoKit

private struct UpdateChannelDevice:OracleLicenseDeviceProviding {
    func identifier(create:Bool)throws->String {"ORACLE-MAC2-"+String(repeating:"c",count:64)}
}

/// A four-file distribution signed with an ephemeral fixture key. Neither a
/// production signing key nor a real engine executable is needed by this suite.
private func updateChannelDistribution(skillEntry:String="SISTEMA/skills/fixture/example/SKILL.md",structured:Bool=false,
                                       minimumOracle:String="0.3.0",oracleVersion:String="0.3.14",
                                       skillResources:[String]=[],entryLayout:String?=nil)throws->(Data,(Data)throws->DistributionManifest) {
    let key=Curve25519.Signing.PrivateKey(),release="fixture-channels-1"
    let trust:[String:Any]=["schema_version":1,"algorithm":"Ed25519","keys":[["id":"fixture","public_key_base64":key.publicKey.rawRepresentation.base64EncodedString()]]]
    let inputs=[("specialists",skillEntry),("prompts","SISTEMA/prompts/Example.md"),
                ("tutorials","SISTEMA/Tutoriais/Example.md"),("gbrain-source","sources/gbrain/"+oracleGBrainPinnedCommit+"/LICENSE")]+skillResources.map{("specialists",$0)}
    var files=[[String:Any]](),packages=[[String:Any]](),counts=[String:[String:Any]](),items=[[String:Any]]()
    for kind in ["specialists","prompts","tutorials","gbrain-source"] {
        let group=inputs.filter{$0.0==kind},id=kind+"-0001",paths=group.map{$0.1},path=group[0].1
        let rows:[[String:Any]]=group.map{_,path in
            let data=Data((path==skillEntry ? "---\nname: oracle-skill-fixture\ndescription: Synthetic nested skill.\n---\n":"Synthetic channel fixture\n").utf8)
            return ["path":path,"sha256":digest(data),"size":data.count,"mode":0o644,"content_base64":data.base64EncodedString()]
        }
        let total=rows.reduce(0){$0+($1["size"] as! Int)}
        let package=try distributionCanonical(["schema_version":3,"release_id":release,"id":id,"files":rows])
        for row in rows {var file=row;file.removeValue(forKey:"content_base64");file["kind"]=kind;file["package_id"]=id;files.append(file)}
        packages.append(["id":id,"kind":kind,"files":paths,"bytes":package.count,"expanded_bytes":total,"sha256":digest(package),
                         "asset":id+".json","url":OracleCatalogRelease.repository+"/releases/download/"+release+"/"+id+".json","dependencies":[]])
        counts[kind]=["files":rows.count,"bytes":total,"items":kind=="gbrain-source" ? 0:1]
        if let itemKind=["specialists":"skill","prompts":"prompt","tutorials":"tutorial"][kind] {
            var item:[String:Any]=["id":itemKind+"-fixture","kind":itemKind,"name":"Fixture","entry":path,"required_files":paths,"department_id":structured && itemKind=="skill" ? "code":"research","dependencies":[]]
            if itemKind=="skill" {
                item["specialist_id"]="fixture";item["host_name"]="oracle-skill-fixture"
                if let entryLayout {item["entry_layout"]=entryLayout}
            }
            items.append(item)
        }
    }
    var document:[String:Any]=["schema_version":3,"release_id":release,"sequence":1,"minimum_oracle":minimumOracle,"adapter_commit":oracleGBrainPinnedCommit,
        "gbrain_commit":oracleGBrainPinnedCommit,"gbrain_version":oracleGBrainPinnedVersion,"files":files,"items":items,"packages":packages,"counts":counts,
        "inventory_sha256":digest(try distributionCanonical(files)),"licenses":["Synthetic MIT fixture"],
        "components":["runtime":["source":"signed-app-bundle","version":oracleGBrainPinnedVersion],"gbrain-method":["source":"signed-app-bundle","commit":oracleGBrainPinnedCommit]]]
    if structured {document["skills_layout"]="department-specialist-skill"}
    let payload=try distributionCanonical(document),signature=try key.signature(for:Data("oracle-distribution-v3\0".utf8)+payload)
    let bytes=try distributionCanonical(["schema_version":3,"key_id":"fixture","payload_base64":payload.base64EncodedString(),"signature_base64":signature.base64EncodedString()])
    return (bytes,{try DistributionManifest(bytes:$0,trust:trust,oracleVersion:oracleVersion,adapterCommit:oracleGBrainPinnedCommit)})
}

func runUpdateChannelTests()throws {
    let base=try oracleTestDirectory("update-channels")
    defer{try? fm.removeItem(at:base)}
    var checks=0
    func expect(_ value:Bool,_ name:String)throws {guard value else{throw failure(name)};checks+=1;print("PASS "+name)}
    func refuses(_ name:String,_ body:()throws->Void)throws {do{try body()}catch{checks+=1;print("PASS "+name);return};throw failure("Accepted: "+name)}
    let appVersion="99.0.0",appTag="v99.0.0",appName="Oracle-99.0.0-macos-arm64.zip"
    func appAsset(_ name:String=appName)->[String:Any] {
        ["id":1,"name":name,"state":"uploaded","size":1024,"digest":"sha256:"+String(repeating:"a",count:64),
         "browser_download_url":OracleApplicationRelease.repository+"/releases/download/"+appTag+"/"+name]
    }
    func appRelease(_ assets:[[String:Any]])->[String:Any] {
        ["draft":false,"prerelease":false,"tag_name":appTag,"html_url":OracleApplicationRelease.repository+"/releases/tag/"+appTag,"assets":assets]
    }
    let app=appRelease([appAsset()]),available=try OracleApplicationRelease.resolve(app,installed:"0.3.14")
    try expect(available["status"] as? String=="install_available" && available["downloadURL"] as? String==appAsset()["browser_download_url"] as? String,"new stable app exposes only its validated updater ZIP")
    try expect(available["downloadSHA256"] as? String==appAsset()["digest"] as? String && available["downloadBytes"] as? Int==1024,"app download metadata preserves official digest and byte count")
    try expect(!OracleUpdateLedger.installable([available]) && OracleUpdateLedger.hasNews([available]),"app update is tracked separately from catalog or engine installation")
    for installed in [appVersion,"100.0.0"] {
        let row=try OracleApplicationRelease.resolve(app,installed:installed)
        try expect(row["status"] as? String=="current" && row["downloadURL"]==nil,"equal or newer local app never offers downgrade: "+installed)
    }
    for name in ["Oracle-99.0.0-macos-arm64.dmg","Oracle-99.0.0-20260916T220000Z-310b98f12345-a1b2c3d4-release-arm64.dmg","Oracle-99.0.0-macos-x64.zip","Oracle-99.0.0-developer-arm64.dmg","Source-code.zip","Oracle-98.0.0-macos-arm64.zip"] {
        let row=try OracleApplicationRelease.resolve(appRelease([appAsset(name)]),installed:"0.3.14")
        try expect(row["status"] as? String=="publication_pending" && row["downloadURL"]==nil,"unsupported or mismatched installer is not actionable: "+name)
    }
    for (field,value) in [("browser_download_url",OracleApplicationRelease.repository+"/releases/download/v98.0.0/"+appName),
                          ("browser_download_url","https://github.com/attacker/ORACLE/releases/download/"+appTag+"/"+appName),
                          ("browser_download_url",(appAsset()["browser_download_url"] as! String)+"?redirect=other"),
                          ("digest","sha256:invalid"),("state","starter")] {
        var asset=appAsset();asset[field]=value
        let row=try OracleApplicationRelease.resolve(appRelease([asset]),installed:"0.3.14")
        try expect(row["downloadURL"]==nil && row["status"] as? String=="publication_pending","unverified app asset has no download action: "+field)
    }
    for invalid in [0,-1,1_000_000_001,true,1.5] as [Any] {
        var asset=appAsset();asset["size"]=invalid
        try expect(try OracleApplicationRelease.resolve(appRelease([asset]),installed:"0.3.14")["downloadURL"]==nil,"app asset enforces positive bounded integer size: "+String(describing:invalid))
    }
    for field in ["draft","prerelease"] {var release=app;release[field]=true;try refuses("nonstable app rejected: "+field){_=try OracleApplicationRelease.resolve(release,installed:"0.3.14")}}
    try refuses("duplicate app asset names cannot pick an arbitrary installer"){_=try OracleApplicationRelease.resolve(appRelease([appAsset(),appAsset()]),installed:"0.3.14")}
    var foreign=app;foreign["html_url"]="https://github.com/attacker/ORACLE/releases/tag/"+appTag
    try refuses("app release URL must belong to the fixed repository"){_=try OracleApplicationRelease.resolve(foreign,installed:"0.3.14")}
    try refuses("malformed installed app version is not silently compared"){_=try OracleApplicationRelease.resolve(app,installed:"development")}

    func tree(_ system:String,_ readme:String="c")->[String:Any] {
        ["truncated":false,"tree":[["path":"SISTEMA","type":"tree","sha":String(repeating:system,count:40)],
                                     ["path":"README.md","type":"blob","sha":String(repeating:readme,count:40)]]]
    }
    var treeCalls=[String]()
    let changed=try OracleSourcePublication.pending(repository:"ORACLE-SKILLS",tag:"fixture-channels-1",paths:["SISTEMA"]) {url in
        treeCalls.append(url);return tree(url.hasSuffix("/main") ? "b":"a")
    }
    try expect(changed && treeCalls.count==2 && treeCalls.allSatisfy{!$0.contains("recursive")},"catalog compares bounded SISTEMA trees from release tag and main")
    let same=try OracleSourcePublication.pending(repository:"ORACLE-SKILLS",tag:"fixture-channels-1",paths:["SISTEMA"]) {url in tree("a",url.hasSuffix("/main") ? "d":"c")}
    try expect(!same,"README-only changes do not announce new catalog content")
    var truncated=tree("a");truncated["truncated"]=true
    try refuses("truncated tree cannot declare source current"){_=try OracleSourcePublication.fingerprint(truncated,paths:["SISTEMA"])}
    var duplicateTree=tree("a");duplicateTree["tree"]=[(tree("a")["tree"] as! [[String:Any]])[0],(tree("a")["tree"] as! [[String:Any]])[0]]
    try refuses("duplicate tree paths are rejected"){_=try OracleSourcePublication.fingerprint(duplicateTree,paths:["SISTEMA"])}
    try refuses("publication comparison refuses unsafe tags"){_=try OracleSourcePublication.pending(repository:"ORACLE-SKILLS",tag:"../main?recursive=1",paths:["SISTEMA"]){_ in throw failure("must not fetch")}}
    let unpublished=OracleSourcePublication.annotate(["id":"skills","status":"current"],pending:true,message:"Source ahead of publication")
    try expect(unpublished["status"] as? String=="publication_pending" && unpublished["publishedStatus"] as? String=="current" && !OracleUpdateLedger.installable([unpublished]),"unpublished source content does not become an installable package")
    let stillAvailable=OracleSourcePublication.annotate(["id":"skills","status":"available"],pending:true,message:"Source ahead")
    try expect(stillAvailable["status"] as? String=="available" && stillAvailable["publicationPending"] as? Bool==true,"a published installable package stays actionable when main is even newer")
    let pending=OracleUpdateLedger.reconcile(previous:[available,unpublished],results:[["id":"oracle","status":"error","message":"offline"],["id":"skills","status":"error","message":"offline"]])
    try expect(pending.count==2 && pending.allSatisfy{$0["recheckError"] as? String=="offline"},"query failure preserves known app and unpublished-catalog news")

    let (catalogBytes,decode)=try updateChannelDistribution(),catalog=try decode(catalogBytes)
    func catalogRelease(tag:String?=nil,bytes:Data?=nil)->[String:Any] {
        let tag=tag ?? catalog.releaseID,bytes=bytes ?? catalogBytes
        return ["draft":false,"prerelease":false,"tag_name":tag,"html_url":OracleCatalogRelease.repository+"/releases/tag/"+tag,
                "assets":[["id":2,"name":"oracle-distribution.json","state":"uploaded","size":bytes.count,"digest":"sha256:"+digest(bytes),
                            "browser_download_url":OracleCatalogRelease.repository+"/releases/download/"+tag+"/oracle-distribution.json"]]]
    }
    let reference=try OracleCatalogRelease.resolve(catalogRelease())
    try reference.verify(catalogBytes)
    try expect(reference.tag==catalog.releaseID,"catalog release metadata binds to its signed tag and bytes")
    try refuses("catalog release checksum rejects changed bytes"){try reference.verify(catalogBytes+Data([0]))}
    var badCatalog=catalogRelease();badCatalog["prerelease"]=true
    try refuses("catalog prerelease cannot replace the stable stream"){_=try OracleCatalogRelease.resolve(badCatalog)}
    var assets=catalogRelease()["assets"] as! [[String:Any]];assets.append(assets[0]);badCatalog=catalogRelease();badCatalog["assets"]=assets
    try refuses("duplicate catalog manifests are ambiguous"){_=try OracleCatalogRelease.resolve(badCatalog)}

    let directEntry="SISTEMA/skills/codigo/fixture/ask-matt/SKILL.md"
    let nestedEntry="SISTEMA/skills/codigo/fixture/01-getting-started/ask-matt/SKILL.md"
    let template="SISTEMA/skills/codigo/fixture/01-getting-started/ask-matt/references/SKILL.md"
    let (directBytes,directDecode)=try updateChannelDistribution(skillEntry:directEntry,structured:true,minimumOracle:"0.3.3")
    try expect(try directDecode(directBytes).items.first?.entry==directEntry,"six-part structured skill remains compatible with the previous contract")
    let (nestedBytes,nestedDecode)=try updateChannelDistribution(skillEntry:nestedEntry,structured:true,minimumOracle:"0.3.14",skillResources:[template],entryLayout:"reviewed-nested")
    let nested=try nestedDecode(nestedBytes)
    try expect(nested.items.filter{$0.kind=="skill"}.count==1 && nested.items.first?.entry==nestedEntry,"signed reviewed nested skill preserves phase and leaf paths")
    try expect(nested.byPath[template] != nil && !nested.items.contains{$0.entry==template},"nested SKILL.md template remains a signed resource, never an inferred skill")
    try expect(nested.items.first?.required.sorted()==[nestedEntry,template].sorted(),"nested skill keeps its reviewed resources under the final entry directory")
    func rejectNested(_ name:String,entry:String=nestedEntry,minimum:String="0.3.14",reader:String="0.3.14",layout:String?="reviewed-nested",resources:[String]=[])throws {
        let (bytes,decode)=try updateChannelDistribution(skillEntry:entry,structured:true,minimumOracle:minimum,oracleVersion:reader,skillResources:resources,entryLayout:layout)
        try refuses(name){_=try decode(bytes)}
    }
    try rejectNested("nested path without signed review marker is rejected",layout:nil)
    try rejectNested("unknown nested layout is rejected",layout:"unreviewed")
    try rejectNested("nested publication cannot declare an older minimum Oracle",minimum:"0.3.3")
    try rejectNested("older Oracle is excluded by nested release compatibility",reader:"0.3.13")
    try rejectNested("deeper than reviewed seven-part hierarchy is rejected",entry:"SISTEMA/skills/codigo/fixture/phase/subphase/ask-matt/SKILL.md")
    try rejectNested("nested review marker cannot alter a legacy six-part skill",entry:directEntry)
    try rejectNested("nested skill cannot borrow another skill's files",resources:["SISTEMA/skills/codigo/fixture/other/SKILL.md"])
    try rejectNested("structured skill cannot enter the shared-resource root",entry:"SISTEMA/recursos-skills/codigo/fixture/phase/ask-matt/SKILL.md")
    try rejectNested("structured nested specialist identity remains exact",entry:"SISTEMA/skills/codigo/another/phase/ask-matt/SKILL.md")
    try rejectNested("signed traversal still fails before nested discovery",entry:"SISTEMA/skills/codigo/fixture/../ask-matt/SKILL.md")

    let signer=Curve25519.Signing.PrivateKey(),device=UpdateChannelDevice()
    let core=try Core(home:base.appendingPathComponent("state"),licenseDevice:device,
                      licenseTrust:LicenseKeys(version:1,keys:["fixture":signer.publicKey.rawRepresentation.base64EncodedString()]))
    let vault=base.appendingPathComponent("vault")
    try fm.createDirectory(at:vault,withIntermediateDirectories:true)
    core.config["vault"]=vault.path;try core.persist()
    let nestedPlan:[String:Any]=["vault":vault.path,"library_roots":["skills":"SISTEMA/skills","prompt":"SISTEMA/prompts","tutorial":"SISTEMA/Tutoriais"],
                                "skill_department_folders":try core.distributionSkillFolders(nested)]
    try expect(try core.distributionRelativePath(nestedEntry,plan:nestedPlan)==nestedEntry,"nested distribution does not insert or move department and phase folders")
    for path in [nestedEntry,template] {
        let file=nested.byPath[path]!,target=try core.distributionDestination(file,plan:nestedPlan)
        let bytes=Data((path==nestedEntry ? "---\nname: oracle-skill-fixture\ndescription: Synthetic nested skill.\n---\n":"Synthetic channel fixture\n").utf8)
        try fm.createDirectory(at:target.deletingLastPathComponent(),withIntermediateDirectories:true)
        try atomicWriteData(bytes,to:target)
    }
    let nestedLinks=try core.distributionSkillLinks(nested,plan:nestedPlan)
    try expect(nestedLinks==["oracle-skill-fixture":vault.appendingPathComponent(nestedEntry).deletingLastPathComponent().path],"native discovery points to the reviewed leaf folder and excludes templates")
    _=try core.licenseDeviceRequest()
    let grant=OracleLicense(version:2,product:"oracle-macos",keyID:"fixture",licenseID:UUID().uuidString,subject:"Synthetic channel fixture",issuedAt:1,expiresAt:nil,deviceID:try device.identifier(create:false))
    let payload=try JSONEncoder().encode(grant)
    _=try core.activateLicense("ORACLE2."+base64URL(payload)+"."+base64URL(try signer.signature(for:Data("ORACLE2.".utf8)+payload)))
    let cancellation=core.home.appendingPathComponent("onboarding/cancel"),marker=Data("previous installation paused".utf8)
    try atomicWriteData(Data("# Synthetic untouched note\n".utf8),to:vault.appendingPathComponent("note.md"))
    try writeJSON(["profileMode":"memory-only","status":"paused"],core.onboardingURL)
    try atomicWriteData(marker,to:cancellation)
    let originalConfig=try Data(contentsOf:core.home.appendingPathComponent("config.json"))
    var attempts=0
    _=try core.downloadDistribution(reference.url,limit:24_000_000,respectOnboardingCancellation:false){_,_ in attempts+=1;return catalogBytes}
    try expect(attempts==1 && (try Data(contentsOf:cancellation))==marker,"read-only query ignores a previous pause without deleting it")
    attempts=0
    try refuses("installer download still honors the pause before GET"){_=try core.downloadDistribution(reference.url,limit:24_000_000){_,_ in attempts+=1;return catalogBytes}}
    try expect(attempts==0,"cancelled installer does not fetch")
    let resolved=try core.resolveDistribution(fetch:{url,_ in url==OracleCatalogRelease.api ? try jsonData(catalogRelease()):catalogBytes},allowCacheFallback:false,respectOnboardingCancellation:false,decode:decode)
    try expect(resolved.hash==catalog.hash && (try Data(contentsOf:cancellation))==marker,"live catalog query verifies signature despite old onboarding pause")
    let selection=core.home.appendingPathComponent("distribution/selected.json"),selectedBytes=try Data(contentsOf:selection)
    try refuses("query cannot substitute cached catalog after a live failure"){_=try core.resolveDistribution(fetch:{_,_ in throw failure("Synthetic network unavailable")},allowCacheFallback:false,respectOnboardingCancellation:false,decode:decode)}
    try expect(try Data(contentsOf:selection)==selectedBytes,"failed live query leaves authenticated selection unchanged")
    try refuses("installer cancellation cannot fall back to cached catalog"){_=try core.resolveDistribution(fetch:{_,_ in throw failure("must not fetch")},decode:decode)}
    try fm.removeItem(at:cancellation)
    let offline=try core.resolveDistribution(fetch:{_,_ in throw failure("Synthetic network unavailable")},decode:decode)
    try expect(offline.hash==catalog.hash,"offline onboarding can reuse the authenticated selection")
    try refuses("malformed release never hides behind cached catalog"){_=try core.resolveDistribution(fetch:{_,_ in try jsonData(["draft":true])},decode:decode)}
    var unsigned=try JSONSerialization.jsonObject(with:catalogBytes) as! [String:Any];unsigned["signature_base64"]=Data(repeating:0,count:64).base64EncodedString()
    let unsignedBytes=try distributionCanonical(unsigned)
    try refuses("invalid signed manifest never falls back to cache"){_=try core.resolveDistribution(fetch:{url,_ in url==OracleCatalogRelease.api ? try jsonData(catalogRelease(bytes:unsignedBytes)):unsignedBytes},decode:decode)}
    try refuses("valid signature from another tag is not the requested release"){_=try core.resolveDistribution(fetch:{url,_ in url==OracleCatalogRelease.api ? try jsonData(catalogRelease(tag:"another-tag")):catalogBytes},decode:decode)}
    attempts=0
    try refuses("cancellation during installer GET stops before retry or application") {
        _=try core.downloadDistribution(reference.url,limit:24_000_000){_,_ in attempts+=1;try atomicWriteData(marker,to:cancellation);return catalogBytes}
    }
    try expect(attempts==1,"cancellation during a fetch is not retried as network failure")
    try refuses("staging continues to honor installation cancellation") {
        try core.stageDistribution(catalog,plan:["id":UUID().uuidString,"plan_hash":"fixture"]){_,_ in throw failure("must not fetch a cancelled package")}
    }

    let runtime:[String:Any]=["draft":false,"prerelease":false,"tag_name":"v99.0.0.0","html_url":OfficialRuntimeRelease.repository+"/releases/tag/v99.0.0.0",
        "assets":[["id":3,"name":OfficialRuntimeRelease.asset,"size":1024,"digest":"sha256:"+String(repeating:"d",count:64),
                    "browser_download_url":OfficialRuntimeRelease.repository+"/releases/download/v99.0.0.0/"+OfficialRuntimeRelease.asset]]]
    var queried=[String]()
    func network(failing:String?=nil)->UpdateNetwork {
        UpdateNetwork(transport:{url,_ in
            queried.append(url)
            if url==failing {throw failure("Synthetic source unavailable")}
            switch url {
            case OracleApplicationRelease.api:return try jsonData(app)
            case OfficialRuntimeRelease.api:return try jsonData(runtime)
            case OracleCatalogRelease.api:return try jsonData(catalogRelease())
            case reference.url:return catalogBytes
            case "https://api.github.com/repos/nitroxinteligence/ORACLE-SKILLS/git/trees/"+catalog.releaseID:return try jsonData(tree("a"))
            case "https://api.github.com/repos/nitroxinteligence/ORACLE-SKILLS/git/trees/main":return try jsonData(tree("b"))
            default:throw failure("Unexpected fixture GET: "+url)
            }
        })
    }
    func check(_ network:UpdateNetwork,operation:String="check-only")throws->[String:Any] {
        let execution=try OracleUpdateExecution(core:core,requestID:UUID().uuidString,operation:operation,distribution:true)
        defer{execution.close()}
        return try core.performAdmittedUpdates(execution,perform:{try $0.performDistributionUpdatesLocked(operation:operation,network:network,decode:decode)})
    }
    let checked=try check(network()),rows=checked["results"] as? [[String:Any]] ?? []
    func status(_ id:String,_ rows:[[String:Any]])->String? {rows.first{$0["id"] as? String==id}?["status"] as? String}
    try expect(checked["phase"] as? String=="complete" && status("oracle",rows)=="install_available" && status("gbrain",rows)=="available" && status("skills",rows)=="available","all three channels detect independently in a paused-onboarding profile")
    try expect(checked["applicationUpdateAvailable"] as? Bool==true && checked["available"] as? Bool==true,"snapshot separates app download from in-app installation availability")
    let catalogRow=rows.first{$0["id"] as? String=="skills"} ?? [:]
    try expect(catalogRow["publicationPending"] as? Bool==true && (catalogRow["counts"] as? [String:Int])==["skills":1,"prompts":1,"tutorials":1],"catalog reports unpublished source and counts the three signed libraries")
    for publishedStatus in ["current","updated"] {
        let row=core.catalogUpdateRow(status:publishedStatus,message:"Published files checked",manifest:catalog,
                                     publication:["publicationChecked":true,"publicationPending":true])
        try expect(row["status"] as? String=="publication_pending" && row["publishedStatus"] as? String==publishedStatus && !OracleUpdateLedger.installable([row]),"verified published catalog does not hide unpublished source: "+publishedStatus)
    }
    var scheduled=[()->Void](),automaticRuns=0
    let automatic=OracleUpdateCoordinator(home:core.home,makeCore:{core},perform:{ service in
        automaticRuns+=1
        return try service.performDistributionUpdatesLocked(operation:"check-only",network:network(),decode:decode)
    },schedule:{_,work in scheduled.append(work)})
    let automaticAck=try automatic.start(operation:"check-only",automatic:true)
    try expect(automaticAck["accepted"] as? Bool==true && (automaticAck["status"] as? [String:Any])?["phase"] as? String=="preparing","automatic channel detection starts with a fresh request")
    guard scheduled.count==1 else{throw failure("Expected one automatic check callback")}
    scheduled.removeFirst()()
    let automaticStatus=try automatic.status(requestID:automaticAck["requestID"] as? String)
    try expect(automaticRuns==1 && automaticStatus["phase"] as? String=="complete" && automaticStatus["applicationUpdateAvailable"] as? Bool==true,"automatic request checks all channels exactly once without installing")
    for (id,url) in [("oracle",OracleApplicationRelease.api),("gbrain",OfficialRuntimeRelease.api),("skills",OracleCatalogRelease.api)] {
        let failed=try check(network(failing:url)),results=failed["results"] as? [[String:Any]] ?? []
        try expect(failed["phase"] as? String=="failed" && status(id,results)=="error","failed channel is reported explicitly: "+id)
        try expect(["oracle","gbrain","skills"].filter{$0 != id}.allSatisfy{["available","install_available"].contains(status($0,results) ?? "")},"failed source does not skip the other two channels: "+id)
    }
    let apply=try check(network(failing:OracleCatalogRelease.api),operation:"check-apply")
    try expect(status("gbrain",apply["results"] as? [[String:Any]] ?? [])=="recovery_required","paused installation still prevents an actual runtime replacement")
    try expect(!queried.contains(where:{$0.contains("/garrytan/gbrain/releases/download/")}),"check-only never downloads the engine binary")
    let finalMarker=try Data(contentsOf:cancellation),finalConfig=try Data(contentsOf:core.home.appendingPathComponent("config.json"))
    try expect(finalMarker==marker && finalConfig==originalConfig,"channel queries preserve installation pause and profile configuration")
    for path in ["setup/plan.json","updates/runtime/current.json","distribution/ledger.json"] {
        try expect(!fm.fileExists(atPath:core.home.appendingPathComponent(path).path),"detection does not create installation state: "+path)
    }
    try expect(try String(contentsOf:vault.appendingPathComponent("note.md"))=="# Synthetic untouched note\n","detection leaves canonical notes unchanged")
    try refuses("channel progress cannot be written by an unadmitted caller"){try core.recordUpdate("failed","non-owner")}
    // Optional readback of previously captured public GET responses; never fetches
    // network or reads a personal profile while running this deterministic suite.
    if let path=ProcessInfo.processInfo.environment["ORACLE_UPDATE_CHANNEL_FIXTURES"] {
        let folder=URL(fileURLWithPath:path).standardizedFileURL
        guard folder.pathComponents.contains(".work"),folder.resolvingSymlinksInPath()==folder else{throw failure("Public API fixtures must be isolated inside .work without symlinks.")}
        let capturedApp=try readJSON(folder.appendingPathComponent("app-release.json"))
        let capturedCatalog=try readJSON(folder.appendingPathComponent("catalog-release.json"))
        let capturedRuntime=try readJSON(folder.appendingPathComponent("gbrain-release.json"))
        let appRow=try OracleApplicationRelease.resolve(capturedApp,installed:"0.0.0")
        try expect(appRow["status"] as? String=="install_available","captured real app asset passes the same native URL and digest contract")
        let catalogReference=try OracleCatalogRelease.resolve(capturedCatalog)
        try expect(!catalogReference.tag.isEmpty,"captured catalog release passes stable asset validation")
        let runtimeReference=try OfficialRuntimeRelease.resolve(capturedRuntime,adapterCommit:oracleGBrainPinnedCommit)
        try expect(OfficialRuntimeRelease.valid(runtimeReference),"captured GBrain release passes independent official provenance checks")
        let summary=try readJSON(folder.appendingPathComponent("summary.json"))
        for (prefix,repo,tag,paths) in [("app","ORACLE",capturedApp["tag_name"] as! String,Set(["Sources","Resources","packages","scripts","skills","Package.swift","package.json"])),
                                      ("catalog","ORACLE-SKILLS",catalogReference.tag,Set(["SISTEMA"]))] {
            let pending=try OracleSourcePublication.pending(repository:repo,tag:tag,paths:paths) {url in
                guard url.hasSuffix("/main") || url.hasSuffix("/"+tag) else{throw failure("Unknown public fixture ref")}
                return try readJSON(folder.appendingPathComponent(prefix+(url.hasSuffix("/main") ? "-main-tree.json":"-tag-tree.json")))
            }
            try expect(pending==summary[prefix+"_source_differs"] as? Bool,"captured "+repo+" content comparison agrees with the public tree receipts")
        }
    }
    print("UPDATE_CHANNEL_RECEIPT "+String(decoding:try jsonData(["checks":checks,"network":false,"self_install":false,"real_engine":false]),as:UTF8.self))
}
