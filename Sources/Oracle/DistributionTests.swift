import Foundation
import CryptoKit

func runDistributionTests() throws {
    if let release=ProcessInfo.processInfo.environment["ORACLE_DISTRIBUTION_RELEASE"] {
        try runReviewedDistributionInstallation(URL(fileURLWithPath:release));return
    }
    let base=try oracleTestFixture("distribution-v3"),state=base.appendingPathComponent("state"),vault=base.appendingPathComponent("vault"),resources=base.appendingPathComponent("resources")
    defer{if ProcessInfo.processInfo.environment["ORACLE_TEST_KEEP_FIXTURE"] != "1"{try? fm.removeItem(at:base)}else{print("FIXTURE_PRESERVED "+base.path)}}
    try fm.createDirectory(at:vault,withIntermediateDirectories:true)
    let prior=ProcessInfo.processInfo.environment["ORACLE_ENGINE_RESOURCES"]
    defer{if let prior{setenv("ORACLE_ENGINE_RESOURCES",prior,1)}else{unsetenv("ORACLE_ENGINE_RESOURCES")}}
    let key=Curve25519.Signing.PrivateKey(),trust:[String:Any]=["schema_version":1,"algorithm":"Ed25519","keys":[["id":"synthetic","public_key_base64":key.publicKey.rawRepresentation.base64EncodedString()]]]
    try writeJSON(trust,resources.appendingPathComponent("updates/distribution-keys.json"))
    try writeJSON(["oracle_version":"0.3.0","gbrain":["adapter_commit":oracleGBrainPinnedCommit]],resources.appendingPathComponent("updates/sources.json"))
    let realEngine=ProcessInfo.processInfo.environment["ORACLE_DISTRIBUTION_REAL_ENGINE"].map{URL(fileURLWithPath:$0)}
    if let realEngine {
        guard realEngine.pathComponents.contains(".work") else{throw failure("Real engine test requires staged resources inside .work.")}
        for name in ["engine","gbrain-method","skills"] {try fm.copyItem(at:realEngine.appendingPathComponent(name),to:resources.appendingPathComponent(name))}
    } else {
        try writeJSON(["fixture":true],resources.appendingPathComponent("gbrain-method/manifest.json"))
    }
    try fm.createDirectory(at:resources.appendingPathComponent("engine"),withIntermediateDirectories:true)
    if realEngine==nil {for name in ["gbrain","oracle-gbrain-read"]{try Data("synthetic executable bytes, never run".utf8).write(to:resources.appendingPathComponent("engine/"+name))}}
    setenv("ORACLE_ENGINE_RESOURCES",resources.appendingPathComponent("engine").path,1)
    let core=try Core(home:state);core.config["vault"]=vault.path;try core.persist()
    var checks=[String]()
    func check(_ ok:Bool,_ name:String)throws{guard ok else{throw failure(name)};checks.append(name);print("PASS "+name)}
    func rejects(_ name:String,_ action:()throws->Void)throws{do{try action()}catch{checks.append(name);print("PASS "+name);return};throw failure("Did not reject: "+name)}
    let skillCore=try Core(home:base.appendingPathComponent("skill-state")),skillVault=base.appendingPathComponent("ATLAS")
    try fm.createDirectory(at:skillVault,withIntermediateDirectories:true)
    skillCore.config["vault"]=skillVault.path;try skillCore.persist()
    let installedSkill=try skillCore.installVaultSkill(),skillFolder=URL(fileURLWithPath:installedSkill["folder"] as! String)
    try check(installedSkill["name"] as? String=="obsidian-atlas","vault skill takes its name from the selected vault")
    try check(try readJSON(skillFolder.appendingPathComponent("references/vault.json"))["vault"] as? String==skillVault.path,"vault skill binds the selected canonical path")
    try check(try fm.destinationOfSymbolicLink(atPath:installedSkill["codex"] as! String)==skillFolder.path,"Codex discovers canonical vault skill through a link")
    let originalSkill=try Data(contentsOf:skillFolder.appendingPathComponent("SKILL.md"))
    _=try skillCore.installVaultSkill()
    try check(try Data(contentsOf:skillFolder.appendingPathComponent("SKILL.md"))==originalSkill,"repeat vault skill install is idempotent")
    try Data("User customization".utf8).write(to:skillFolder.appendingPathComponent("SKILL.md"))
    try rejects("edited vault skill is preserved"){_=try skillCore.installVaultSkill()}
    let alternate=base.appendingPathComponent("other/ATLAS");try fm.createDirectory(at:alternate,withIntermediateDirectories:true)
    skillCore.config["vault"]=alternate.path;try skillCore.persist()
    let otherSkill=try skillCore.installVaultSkill()
    try check(otherSkill["name"] as? String != installedSkill["name"] as? String,"same-name vaults do not replace each other's skills")
    let routerSource=bundledRouterFixtureSource()
    try fm.createDirectory(at:resources.appendingPathComponent("skills"),withIntermediateDirectories:true)
    if !fm.fileExists(atPath:resources.appendingPathComponent("skills/oracle").path) {try fm.copyItem(at:routerSource,to:resources.appendingPathComponent("skills/oracle"))}
    let router=try skillCore.installOracleSkill(),routerFolder=URL(fileURLWithPath:router["folder"] as! String)
    try check(routerFolder.path.hasPrefix(skillCore.distributionHostHome().path+"/.agents/skills/"),"Oracle router lives directly in Codex")
    try check(!routerFolder.path.hasPrefix(skillVault.path+"/"),"Oracle router is not installed in the vault")
    _=try skillCore.installOracleSkill()
    skillCore.config["vault"]=skillVault.path;try skillCore.persist();_=try skillCore.installOracleSkill()
    let profiles=try readJSON(routerFolder.appendingPathComponent("references/context.json"))["profiles"] as? [String:Any]
    try check(profiles?.count==1,"same Oracle profile updates its selected vault without duplicate routers")
    try Data("User router edit".utf8).write(to:routerFolder.appendingPathComponent("SKILL.md"))
    try rejects("edited Oracle router is preserved"){_=try skillCore.installOracleSkill()}
    let batchRoot=base.appendingPathComponent("batch")
    try fm.createDirectory(at:batchRoot,withIntermediateDirectories:true)
    try rejects("batch releases coordination after accessor failure") {
        try core.coordinatedWriteBatch(at:[batchRoot]) { throw failure("Synthetic batch interruption") }
    }
    try core.coordinatedWriteBatch(at:[batchRoot]) {
        for i in 0..<130 {
            let path=batchRoot.appendingPathComponent("note-\(i).md")
            try core.coordinatedWrite(at:path) { target in try Data("# Note \(i)".utf8).write(to:target) }
        }
    }
    try check(try fm.contentsOfDirectory(atPath:batchRoot.path).count==130,"nested coordinated writes complete after interrupted batch")
    let provider=NSError(domain:"NSFileProviderErrorDomain",code:-5009)
    try check(core.installationErrorMessage(provider).contains("código -5009"),"provider error keeps original code with actionable Portuguese message")
    try check(core.installationErrorMessage(NSError(domain:NSCocoaErrorDomain,code:1,userInfo:[NSUnderlyingErrorKey:provider])).contains("código -5009"),"wrapped provider error is localized")
    try check(core.installationErrorMessage(failure("Synthetic disk failure"))=="Synthetic disk failure","unrelated failure is not mislabeled as iCloud")
    let skill="SISTEMA/skills/research-lab/example/SKILL.md",resource="SISTEMA/skills/research-lab/example/references/reference.txt",prompt="SISTEMA/prompts/Olá.md",tutorial="SISTEMA/Tutoriais/Guide.md"
    func fixture(_ sequence:Int=1,extra:String="",includeResource:Bool=true,structured:Bool=false)throws->(Data,[String:Data],[String:Any]){
        let skill=structured ? "SISTEMA/skills/oferta/research-lab/example/SKILL.md":"SISTEMA/skills/research-lab/example/SKILL.md"
        let resource=structured ? "SISTEMA/recursos-skills/research-lab/reference.txt":"SISTEMA/skills/research-lab/example/references/reference.txt"
        let release="fixture-\(sequence)"
        var inputs:[(String,String,String)]=[(skill,"specialists","---\nname: oracle-skill-example\ndescription: Synthetic skill for offline verification.\n---\n# Example\n"+extra),(prompt,"prompts","# Olá\n"+extra),(tutorial,"tutorials","# Guide\n"+extra),("sources/gbrain/"+oracleGBrainPinnedCommit+"/LICENSE","gbrain-source","MIT synthetic upstream snapshot")]
        if includeResource{inputs.append((resource,"specialists","Fixture resource"+extra))}
        for i in 0..<130 {inputs.append(("sources/gbrain/"+oracleGBrainPinnedCommit+"/fixture-\(i).txt","gbrain-source","Source fixture \(i)"))}
        var files=[[String:Any]](),packages=[[String:Any]](),payloads=[String:Data](),counts=[String:[String:Any]]()
        for kind in ["specialists","prompts","tutorials","gbrain-source"] {
            let group=inputs.filter{$0.1==kind},id=kind+"-0001",asset=id+".json",url="https://github.com/nitroxinteligence/ORACLE-SKILLS/releases/download/"+release+"/"+asset
            let rows:[[String:Any]]=group.map{path,_,text in let bytes=Data(text.utf8);return ["path":path,"sha256":digest(bytes),"size":bytes.count,"mode":0o644,"content_base64":bytes.base64EncodedString()]}
            let bytes=try distributionCanonical(["schema_version":3,"release_id":release,"id":id,"files":rows]);payloads[url]=bytes
            let total=group.reduce(0){$0+$1.2.utf8.count}
            packages.append(["id":id,"kind":kind,"files":group.map{$0.0},"bytes":bytes.count,"expanded_bytes":total,"sha256":digest(bytes),"url":url,"asset":asset,"dependencies":[String]()])
            for row in rows{var file=row;file.removeValue(forKey:"content_base64");file["kind"]=kind;file["package_id"]=id;files.append(file)}
            counts[kind]=["files":group.count,"bytes":total,"items":kind=="gbrain-source" ? 0:1]
        }
        let required=includeResource ? [skill,resource]:[skill]
        let items:[[String:Any]]=[
            ["id":"skill-example","name":"Example","kind":"skill","entry":skill,"required_files":required,"department_id":structured ? "oferta":"research","specialist_id":"research-lab","host_name":"oracle-skill-example","dependencies":[]],
            ["id":"prompt-example","name":"Olá","kind":"prompt","entry":prompt,"required_files":[prompt],"department_id":"unassigned","dependencies":[]],
            ["id":"tutorial-example","name":"Guide","kind":"tutorial","entry":tutorial,"required_files":[tutorial],"department_id":"unassigned","dependencies":[]]]
        var manifest:[String:Any]=["schema_version":3,"release_id":release,"sequence":sequence,"minimum_oracle":"0.3.0","adapter_commit":oracleGBrainPinnedCommit,"gbrain_commit":oracleGBrainPinnedCommit,"gbrain_version":oracleGBrainPinnedVersion,"files":files,"items":items,"packages":packages,"counts":counts,"inventory_sha256":digest(try distributionCanonical(files)),"licenses":["MIT fixture"],"components":["runtime":["source":"signed-app-bundle","version":oracleGBrainPinnedVersion],"gbrain-method":["source":"signed-app-bundle","commit":oracleGBrainPinnedCommit]]]
        if structured {manifest["skills_layout"]="department-specialist-skill";manifest["minimum_oracle"]="0.3.3"}
        return (try signed(manifest),payloads,manifest)
    }
    func signed(_ manifest:[String:Any])throws->Data {
        let payload=try distributionCanonical(manifest),signature=try key.signature(for:Data("oracle-distribution-v3\0".utf8)+payload)
        return try distributionCanonical(["schema_version":3,"key_id":"synthetic","payload_base64":payload.base64EncodedString(),"signature_base64":signature.base64EncodedString()])
    }
    func decode(_ bytes:Data)throws->DistributionManifest {try DistributionManifest(bytes:bytes,trust:trust,oracleVersion:"0.3.0",adapterCommit:oracleGBrainPinnedCommit)}
    func cache(_ manifest:DistributionManifest)throws {let path=state.appendingPathComponent("cache/distributions/"+manifest.hash+"/oracle-distribution.json");try fm.createDirectory(at:path.deletingLastPathComponent(),withIntermediateDirectories:true);try manifest.bytes.write(to:path)}
    let (structuredBytes,structuredPackages,_)=try fixture(structured:true)
    let structuredManifest=try DistributionManifest(bytes:structuredBytes,trust:trust,oracleVersion:"0.3.3",adapterCommit:oracleGBrainPinnedCommit)
    for package in structuredManifest.packages {_=try structuredManifest.decodePackage(structuredPackages[package["url"] as! String]!,metadata:package)}
    try check(core.distributionSkillFolders(structuredManifest).isEmpty,"structured distribution does not inject another department folder")
    try check(structuredManifest.items.first?.specialist=="research-lab" && structuredManifest.items.first?.department=="oferta","structured distribution distinguishes department and specialist")
    try rejects("older apps cannot install structured release"){_=try decode(structuredBytes)}
    let (bytes,payloads,document)=try fixture(),manifest=try decode(bytes)
    try check(manifest.files.count==135 && manifest.items.count==3,"signed manifest contains all three libraries and source snapshot")
    try check(String(decoding:try distributionCanonical(["a":"Olá/💡","z":true]),as:UTF8.self)=="{\"a\":\"Ol\\u00e1/\\ud83d\\udca1\",\"z\":true}","canonical signature bytes match Python for Unicode slash and booleans")
    var envelope=try JSONSerialization.jsonObject(with:bytes) as! [String:Any];envelope["signature_base64"]=Data(repeating:0,count:64).base64EncodedString()
    try rejects("tampered signature rejected before filesystem access"){_=try decode(distributionCanonical(envelope))}
    envelope=try JSONSerialization.jsonObject(with:bytes) as! [String:Any];envelope["key_id"]="unknown"
    try rejects("unknown signing key rejected"){_=try decode(distributionCanonical(envelope))}
    try rejects("automatic downgrade rejected"){_=try DistributionManifest(bytes:bytes,trust:trust,oracleVersion:"0.3.0",adapterCommit:oracleGBrainPinnedCommit,minimumSequence:2)}
    try rejects("same sequence with different bytes rejected"){_=try DistributionManifest(bytes:bytes,trust:trust,oracleVersion:"0.3.0",adapterCommit:oracleGBrainPinnedCommit,minimumSequence:1,knownHash:String(repeating:"f",count:64))}
    var bad=document;bad["adapter_commit"]="unknown"
    try rejects("adapter upgrade requires new compatible app"){_=try decode(signed(bad))}
    bad=document;var rows=document["files"] as! [[String:Any]];rows[0]["path"]="SISTEMA/prompts/../escape.md";bad["files"]=rows;bad["inventory_sha256"]=digest(try distributionCanonical(rows))
    try rejects("signed traversal path rejected"){_=try decode(signed(bad))}
    bad=document;bad["counts"]=[String:Any]()
    try rejects("partial or empty inventory rejected even with valid signature"){_=try decode(signed(bad))}
    let firstPackage=manifest.packages[0],packageData=payloads[firstPackage["url"] as! String]!
    try rejects("corrupt package is rejected"){_=try manifest.decodePackage(packageData+Data([0]),metadata:firstPackage)}
    try rejects("distribution cannot overwrite or delete personal notes via a ledger destination"){_=try core.distributionOwnedDestination(vault.appendingPathComponent("AREAS/pessoal/nota.md").path,root:vault)}
    try cache(manifest)
    let plan=try core.makeMemoryOnlyPlan(manifest:manifest,id:UUID().uuidString)
    try check(try core.distributionRelativePath(skill,plan:plan)=="SISTEMA/skills/Pesquisa/research-lab/example/SKILL.md","fresh installation groups complete skills by department")
    try check(try core.distributionRelativePath(resource,plan:plan)=="SISTEMA/skills/Pesquisa/research-lab/example/references/reference.txt","relative skill resources remain together")
    try check(try core.memoryOnlyInstallationMode()=="install","absent GBrain selects fresh installation")
    let reuse=try Core(home:base.appendingPathComponent("reuse-state"));reuse.config["vault"]=vault.path;try reuse.persist()
    let reuseProfile=reuse.home.appendingPathComponent("gbrain/profile"),reuseDatabase=reuse.home.appendingPathComponent("gbrain/profile/.gbrain/db")
    try fm.createDirectory(at:reuseDatabase,withIntermediateDirectories:true)
    try writeJSON(["engine":"pglite","embedding_disabled":true,"database_path":reuseDatabase.path],reuseProfile.appendingPathComponent(".gbrain/config.json"))
    try writeJSON(["owner":"OracleCompanion","schema_version":2,"vault_root":vault.path],reuseProfile.appendingPathComponent("oracle-owned.json"))
    try Data("existing database sentinel".utf8).write(to:reuseDatabase.appendingPathComponent("sentinel"))
    for _ in 0..<2 {try check(try reuse.memoryOnlyInstallationMode()=="update","existing owned GBrain selects update without a second installation")}
    try check(try String(contentsOf:reuseDatabase.appendingPathComponent("sentinel"))=="existing database sentinel","reinstall detection preserves existing database bytes")
    try fm.removeItem(at:reuseDatabase)
    try rejects("incomplete existing database never silently becomes a fresh duplicate"){_=try reuse.memoryOnlyInstallationMode()}
    try check(plan["answers"]==nil && plan["answers_hash"]==nil && plan["profile_mode"] as? String=="memory-only","memory-only plan never fabricates identity answers")
    try check((try core.validatedPlan())["plan_hash"] as? String==plan["plan_hash"] as? String,"native install confirms immutable plan")
    try check(!(plan["folders"] as! [String]).contains(where:{$0.contains("oracle-history")}),"new structure does not enable conversation capture")
    let selectedRoots=core.config["libraryRoots"]
    core.config["libraryRoots"]=["skills":"SISTEMA/Skills","prompt":"SISTEMA/prompts","tutorial":"SISTEMA/Tutoriais"]
    try rejects("changed library selection cannot certify an old plan"){try core.verifyMemoryOnlyRuntime(plan)}
    core.config["libraryRoots"]=selectedRoots
    var unavailableAttempts=0
    try rejects("network retries are bounded before any vault write") {
        _=try core.downloadDistribution("https://github.com/fixture",limit:10,fetch:{_,_ in unavailableAttempts+=1;throw failure("Synthetic HTTP 429")})
    }
    try check(unavailableAttempts==3,"transient network failure gets exactly three bounded attempts")
    var stageAttempts=0
    try rejects("interrupted package download leaves only staging and cache") {
        try core.stageDistribution(manifest,plan:plan,fetch:{url,_ in stageAttempts+=1;if stageAttempts>1{throw failure("Synthetic offline")};return payloads[url]!})
    }
    let cachedPackage=manifest.packages[0],cachedFile=state.appendingPathComponent("cache/packages/"+(cachedPackage["sha256"] as! String)+".json")
    try atomicWriteData(Data("corrupt cache fixture".utf8),to:cachedFile)
    try core.stageDistribution(manifest,plan:plan,fetch:{url,_ in guard let data=payloads[url] else{throw failure("Unexpected fixture download")};return data})
    try check(try fileDigest(cachedFile)==cachedPackage["sha256"] as? String,"retry replaces corrupted owned cache only after a verified download")
    try check(!fm.fileExists(atPath:vault.appendingPathComponent("SISTEMA/skills/Pesquisa/research-lab/example/SKILL.md").path),"staging all packages never applies a partial distribution")
    if realEngine != nil {
        _=try core.initializeMemoryOnly(plan:plan)
        let config=try readJSON(state.appendingPathComponent("gbrain/profile/.gbrain/config.json")),database=URL(fileURLWithPath:config["database_path"] as! String)
        let identity=try fm.attributesOfItem(atPath:database.path)[.systemFileNumber] as? NSNumber
        let repeated=try core.initializeMemoryOnly(plan:plan)
        try check(repeated["installation_mode"] as? String=="update" && identity == (try fm.attributesOfItem(atPath:database.path)[.systemFileNumber] as? NSNumber),"real repeated initialization reuses the same database directory")
    }
    _=try core.applyPlan();_=try core.applyDistribution(manifest,plan:plan)
    try check((try core.verifyDistribution(manifest,plan:plan))["complete"] as? Bool==true,"full applied distribution verifies every byte")
    let codex=try core.installDistributionSkills(manifest,plan:plan)
    try check(codex["files_installed"] as? Bool==true && codex["host_discovered"] as? Bool==false && codex["execution_verified"] as? Bool==false,"Codex file install never implies discovery or execution")
    try check(core.distributionHostHome().path.hasPrefix(state.path+"/"),"synthetic skills cannot touch operator global skills")
    _=try core.applyDistribution(manifest,plan:plan);_=try core.installDistributionSkills(manifest,plan:plan)
    try check((try core.verifyDistributionSkills(manifest,plan:plan))["count"] as? Int==1,"resume is idempotent with no duplicate Codex skills")
    try rejects("files alone cannot satisfy final onboarding verification"){_=try core.completeMemoryOnly(plan:plan)}
    if realEngine != nil {
        _=try core.indexMemoryOnly(plan:plan);_=try core.prepareBridge()
        let result=try core.completeMemoryOnly(plan:plan)
        try check(result["identity_status"] as? String=="not_applicable","real engine completes memory-only installation without identity")
        try check(!fm.fileExists(atPath:state.appendingPathComponent("setup/identity-render.json").path) && !fm.fileExists(atPath:state.appendingPathComponent("gbrain/workspace/SOUL.md").path),"real official initialization never renders personal identity")
        let reopened=try Core(home:state)
        try check((try reopened.completeMemoryOnly(plan:plan))["plan_hash"] as? String==plan["plan_hash"] as? String,"reopened profile verifies complete real-engine installation")
        let slotID=UUID().uuidString,slot=state.appendingPathComponent("updates/runtime/versions/"+slotID)
        try fm.createDirectory(at:slot,withIntermediateDirectories:true)
        var hashes=[String:String]()
        for name in ["gbrain","oracle-gbrain-read"] {
            let source=resources.appendingPathComponent("engine/"+name)
            try fm.copyItem(at:source,to:slot.appendingPathComponent(name));hashes[name]=try fileDigest(source)
        }
        let metadata:[String:Any]=["directory":slotID,"version":oracleGBrainPinnedVersion,"commit":oracleGBrainPinnedCommit,"files":hashes,"previous":["bundled":true,"version":oracleGBrainPinnedVersion]]
        try writeJSON(["oracle_version":"0.3.0","gbrain":["adapter_commit":oracleGBrainPinnedCommit,"compatible_releases":[["version":oracleGBrainPinnedVersion,"sha256":hashes["gbrain"]!]]]],resources.appendingPathComponent("updates/sources.json"))
        for phase in ["after-validation","after-archive","after-profile-activation","after-runtime-activation"] {
            let request:[String:Any]=["operation":"runtime-generation","action":"activate","id":UUID().uuidString,"commit":oracleGBrainPinnedCommit,"database_compatibility":"same-schema","metadata":metadata,"fail_at":phase]
            var environment=core.engineEnvironment();environment.removeValue(forKey:"ORACLE_CANCEL_FILE")
            let failureResult=try runProcess(resources.appendingPathComponent("engine/oracle-gbrain-read"),[],cwd:state,environment:environment,input:jsonData(request),timeout:120)
            try check(failureResult.code != 0 && failureResult.output.contains("Synthetic fault"),"runtime fault reached "+phase+" ("+failureResult.output.suffix(250)+")")
            try check((try core.verifyMemoryOnly(plan:plan))["memory"] as? Bool==true && !fm.fileExists(atPath:state.appendingPathComponent("updates/runtime/transition.json").path),"runtime fault restores readable database and clears gate: "+phase)
        }
        for phase in ["after-gate","after-archive","after-profile-activation","after-runtime-activation"] {
            let request:[String:Any]=["operation":"runtime-generation","action":"activate","id":UUID().uuidString,"commit":oracleGBrainPinnedCommit,"database_compatibility":"same-schema","metadata":metadata,"crash_at":phase]
            var environment=core.engineEnvironment();environment.removeValue(forKey:"ORACLE_CANCEL_FILE")
            let crashed=try runProcess(resources.appendingPathComponent("engine/oracle-gbrain-read"),[],cwd:state,environment:environment,input:jsonData(request),timeout:120)
            try check(crashed.code==86,"actual process interruption reached "+phase)
            try rejects("pending runtime gate rejects a new reader: "+phase){_=try core.gbrainRead(["operation":"status"],allowSetup:true)}
            _=try core.recoverRuntimeGenerationIfNeeded()
            try check((try core.verifyMemoryOnly(plan:plan))["memory"] as? Bool==true,"reopening recovers interrupted runtime: "+phase)
        }
        let activated=try core.runRuntimeGeneration(["operation":"runtime-generation","action":"activate","id":UUID().uuidString,"commit":oracleGBrainPinnedCommit,"database_compatibility":"same-schema","metadata":metadata])
        try check(activated["database_verified"] as? Bool==true,"real runtime generation validates and activates closed database copy")
        try check((try core.verifyMemoryOnly(plan:plan))["memory"] as? Bool==true,"activated runtime retains sources and complete index")
        try Data("# External note\nAdded after runtime activation.\n".utf8).write(to:vault.appendingPathComponent("External.md"))
        _=try core.indexMemoryOnly(plan:plan)
        let rollback=try core.rollbackRuntime()
        try check(rollback["status"] as? String=="rolled_back" && (try core.verifyMemoryOnly(plan:plan))["memory"] as? Bool==true,"runtime rollback preserves post-activation indexed notes")
        let secondVault=base.appendingPathComponent("Vault com espaços e acentuação")
        try fm.createDirectory(at:secondVault,withIntermediateDirectories:true)
        _=try core.runRuntimeGeneration(["operation":"runtime-generation","action":"switch-vault","id":UUID().uuidString,"vault":secondVault.path])
        core.refreshConfig()
        try check(core.config["vault"] as? String==secondVault.path && fm.fileExists(atPath:vault.appendingPathComponent("SISTEMA/skills/Pesquisa/research-lab/example/SKILL.md").path),"selecting another vault preserves original canonical files")
        try check(!fm.fileExists(atPath:state.appendingPathComponent("setup/plan.json").path),"new vault receives a separate plan and preserved prior profile")
        let secondPlan=try core.makeMemoryOnlyPlan(manifest:manifest,id:UUID().uuidString)
        try core.stageDistribution(manifest,plan:secondPlan,fetch:{url,_ in payloads[url]!})
        _=try core.initializeMemoryOnly(plan:secondPlan);_=try core.applyPlan();_=try core.applyDistribution(manifest,plan:secondPlan)
        _=try core.indexMemoryOnly(plan:secondPlan);_=try core.installDistributionSkills(manifest,plan:secondPlan);_=try core.prepareBridge()
        try check((try core.completeMemoryOnly(plan:secondPlan))["identity_status"] as? String=="not_applicable","second vault completes without altering the first profile")
        let switchedBack=try core.runRuntimeGeneration(["operation":"runtime-generation","action":"switch-vault","id":UUID().uuidString,"vault":vault.path])
        core.refreshConfig()
        try check(switchedBack["restored"] as? Bool==true && (try core.verifyMemoryOnly(plan:plan))["memory"] as? Bool==true,"returning to a vault restores its original database sources and plan")
        _=try core.installDistributionSkills(manifest,plan:plan)
        try check((try core.verifyDistributionSkills(manifest,plan:plan))["count"] as? Int==1,"vault switch keeps one active global skill destination")
        let request:[String:Any]=["operation":"runtime-generation","action":"switch-vault","id":UUID().uuidString,"vault":secondVault.path,"crash_at":"after-vault-archive"]
        var environment=core.engineEnvironment();environment.removeValue(forKey:"ORACLE_CANCEL_FILE")
        let crashed=try runProcess(resources.appendingPathComponent("engine/oracle-gbrain-read"),[],cwd:state,environment:environment,input:jsonData(request),timeout:120)
        try check(crashed.code==86,"actual process interruption reaches vault archive boundary")
        _=try core.recoverRuntimeGenerationIfNeeded();core.refreshConfig()
        try check(core.config["vault"] as? String==vault.path && (try core.verifyMemoryOnly(plan:plan))["memory"] as? Bool==true,"interrupted vault switch restores original profile and preferences")
        let controller=try OnboardingController(home:state,accessCheck:{},distributionResolver:{try $0.decodeDistribution(bytes)})
        defer{controller.shutdown()}
        let started=try controller.installMemoryOnly(),duplicate=try controller.installMemoryOnly()
        try check(started["runID"] as? String==duplicate["runID"] as? String,"duplicate native install resolves to the active immutable install ID")
        let secondWindow=try OnboardingController(home:state,accessCheck:{},distributionResolver:{try $0.decodeDistribution(bytes)})
        let concurrent=try secondWindow.installMemoryOnly()
        try check(concurrent["runID"] as? String==started["runID"] as? String && onboardingActiveStatuses.contains(concurrent["status"] as? String ?? ""),"second window preserves and reuses the active native installation")
        let deadline=Date().addingTimeInterval(180)
        var observed=try controller.snapshot()
        while onboardingActiveStatuses.contains(observed["status"] as? String ?? ""),Date()<deadline {Thread.sleep(forTimeInterval:0.1);observed=try controller.snapshot()}
        try check(observed["status"] as? String=="completed","native controller completes every memory-only phase: "+String(describing:observed["message"] ?? "unknown"))
        try check(core.distributionDepartmentAssignments()["research-lab"]=="research","verified item receipt feeds the signed department assignment")
        try check(observed["readback"]==nil && observed["codexConnected"] as? Bool==false,"native controller neither requests identity nor connects an account")
    }
    let (nextBytes,nextPackages,_)=try fixture(2,extra:"new version"),next=try decode(nextBytes)
    try cache(next);let nextPlan=try core.makeMemoryOnlyPlan(manifest:next,id:UUID().uuidString)
    try core.stageDistribution(next,plan:nextPlan,fetch:{url,_ in nextPackages[url]!})
    try atomicWriteData(Data("user edit".utf8),to:vault.appendingPathComponent(prompt))
    try rejects("local edits block completion without overwriting originals"){_=try core.applyDistribution(next,plan:nextPlan)}
    try check(try String(contentsOf:vault.appendingPathComponent(prompt))=="user edit","local prompt edit preserved")
    try check(try String(contentsOf:vault.appendingPathComponent("SISTEMA/skills/Pesquisa/research-lab/example/SKILL.md")).contains("# Example") && !String(contentsOf:vault.appendingPathComponent("SISTEMA/skills/Pesquisa/research-lab/example/SKILL.md")).contains("new version"),"conflict preflight prevents unrelated partial writes")
    let resolved=try core.resolveDistributionConflicts()
    try check(resolved["copies"] as? Int==1,"explicit conflict resolution verifies a copy before authorizing replacement")
    let copy=vault.appendingPathComponent("INBOX/oracle/conflitos/"+(nextPlan["id"] as! String)+"/"+prompt)
    try check(try String(contentsOf:copy)=="user edit","conflict resolution keeps user content in the canonical vault")
    _=try core.applyDistribution(next,plan:nextPlan);_=try core.installDistributionSkills(next,plan:nextPlan)
    try check(try String(contentsOf:vault.appendingPathComponent(tutorial)).contains("new version"),"updater and installer share ownership for tutorials")
    let removedFixture=try fixture(3,extra:"third",includeResource:false),removed=try decode(removedFixture.0)
    try cache(removed);let removedPlan=try core.makeMemoryOnlyPlan(manifest:removed,id:UUID().uuidString)
    try core.stageDistribution(removed,plan:removedPlan,fetch:{url,_ in removedFixture.1[url]!})
    _=try core.applyDistribution(removed,plan:removedPlan)
    let ledger=try readJSON(core.distributionLedgerURL)
    try check(!fm.fileExists(atPath:vault.appendingPathComponent("SISTEMA/skills/Pesquisa/research-lab/example/references/reference.txt").path) && (ledger["tombstones"] as? [[String:Any]])?.count==1,"removed unedited owned resource is archived with tombstone")
    let tombstone=(ledger["tombstones"] as! [[String:Any]])[0]
    try check(fm.fileExists(atPath:tombstone["recovery"] as! String),"release removal preserves recovery bytes")
    _=try core.installDistributionSkills(removed,plan:removedPlan)
    try atomicWriteData(Data("edit after release three".utf8),to:vault.appendingPathComponent(prompt))
    let rollback=try core.rollbackDistribution()
    try check((rollback["preserved"] as? [String])?.contains(prompt)==true && (try String(contentsOf:vault.appendingPathComponent(prompt)))=="edit after release three","rollback preserves canonical edits made after the update")
    try check((try String(contentsOf:vault.appendingPathComponent("SISTEMA/skills/Pesquisa/research-lab/example/references/reference.txt"))).contains("new version"),"rollback restores retired resources from their exact preimage")
    try check((try readJSON(state.appendingPathComponent("setup/plan.json")))["id"] as? String==nextPlan["id"] as? String,"content rollback restores the previous immutable plan")
    let link=core.distributionHostHome().appendingPathComponent(".agents/skills/oracle-skill-example")
    try fm.removeItem(at:link);try fm.createDirectory(at:link,withIntermediateDirectories:true)
    try rejects("an unrelated Codex folder cannot be overwritten"){_=try core.installDistributionSkills(removed,plan:removedPlan)}
    try check(fm.fileExists(atPath:link.path),"unrelated global skill folder preserved")
    if realEngine != nil,ProcessInfo.processInfo.environment["ORACLE_DISTRIBUTION_LARGE_INDEX"]=="1" {
        let folder=vault.appendingPathComponent("WIKI/scale-fixture")
        try fm.createDirectory(at:folder,withIntermediateDirectories:true)
        for number in 0..<5001 {try Data("# Scale \(number)\n\nSynthetic searchable scalesentinel\n".utf8).write(to:folder.appendingPathComponent("note-\(number).md"))}
        let large=try core.indexMemoryOnly(plan:nextPlan),index=large["index"] as? [String:Any] ?? [:]
        try check(index["complete"] as? Bool==true && (index["total"] as? Int ?? 0)>5000 && index["total"] as? Int==index["verified"] as? Int,"5001-note corpus resumes across the native 5000-upsert boundary")
        let search=try core.gbrainRead(["operation":"search","query":"scalesentinel","source":"oracle-vault"],allowSetup:true)
        try check(String(decoding:try jsonData(search),as:UTF8.self).contains("scalesentinel"),"keyword search reaches indexed synthetic content after checkpoint completion")
    }
    let output=URL(fileURLWithPath:ProcessInfo.processInfo.environment["ORACLE_TEST_ROOT"]!).appendingPathComponent("distribution-result.json")
    try writeJSON(["synthetic":true,"checks":checks,"count":checks.count,"published":false,"host_discovered":false,"engine_executed":realEngine != nil],output)
    print("Distribution v3: \(checks.count) checks passed")
}

/// Exercise the same controller with a complete reviewed release. Access is
/// synthetic; all filesystem destinations and host links remain in the fixture.
func runReviewedDistributionInstallation(_ release:URL) throws {
    setbuf(stdout,nil)
    guard release.pathComponents.contains(".work"),release.resolvingSymlinksInPath()==release.standardizedFileURL,
          let resourcePath=ProcessInfo.processInfo.environment["ORACLE_DISTRIBUTION_REAL_ENGINE"],
          URL(fileURLWithPath:resourcePath).pathComponents.contains(".work") else{throw failure("Acervo e motor de teste devem estar em .work.")}
    let base=try oracleTestFixture("reviewed-distribution"),state=base.appendingPathComponent("state"),vault=base.appendingPathComponent("vault"),resources=base.appendingPathComponent("resources")
    print("REVIEWED_FIXTURE "+base.path)
    try fm.createDirectory(at:vault,withIntermediateDirectories:true)
    try fm.createDirectory(at:resources,withIntermediateDirectories:true)
    let originalResources=URL(fileURLWithPath:resourcePath)
    for name in ["engine","gbrain-method","skills","updates"]{try fm.copyItem(at:originalResources.appendingPathComponent(name),to:resources.appendingPathComponent(name))}
    let prior=ProcessInfo.processInfo.environment["ORACLE_ENGINE_RESOURCES"]
    defer{if let prior{setenv("ORACLE_ENGINE_RESOURCES",prior,1)}else{unsetenv("ORACLE_ENGINE_RESOURCES")}}
    setenv("ORACLE_ENGINE_RESOURCES",resources.appendingPathComponent("engine").path,1)
    let core=try Core(home:state);core.config["vault"]=vault.path;try core.persist()
    let bytes=try Data(contentsOf:release.appendingPathComponent("oracle-distribution.json")),manifest=try core.decodeDistribution(bytes)
    let releaseReceipt=try readJSON(release.appendingPathComponent("release-receipt.json"))
    guard releaseReceipt["complete"] as? Bool==true,releaseReceipt["manifest_sha256"] as? String==digest(bytes) else{throw failure("Release local incompleta.")}
    let cached=state.appendingPathComponent("cache/distributions/"+manifest.hash+"/oracle-distribution.json")
    try fm.createDirectory(at:cached.deletingLastPathComponent(),withIntermediateDirectories:true);try bytes.write(to:cached)
    let plan=try core.makeMemoryOnlyPlan(manifest:manifest,id:UUID().uuidString)
    let remote=ProcessInfo.processInfo.environment["ORACLE_DISTRIBUTION_NETWORK"]=="1"
    if remote {try core.stageDistribution(manifest,plan:plan)}
    else {try core.stageDistribution(manifest,plan:plan,fetch:{url,_ in
        guard let package=manifest.packages.first(where:{$0["url"] as? String==url}),let asset=package["asset"] as? String else{throw failure("Asset não declarado.")}
        return try Data(contentsOf:release.appendingPathComponent(asset))
    })}
    print("REVIEWED_STAGED files=\(manifest.files.count) items=\(manifest.items.count) network=\(remote)")
    let controller=try OnboardingController(home:state,accessCheck:{},distributionResolver:{try $0.decodeDistribution(bytes)})
    defer{controller.shutdown()}
    let started=try controller.installMemoryOnly(),duplicate=try controller.installMemoryOnly()
    guard started["runID"] as? String==duplicate["runID"] as? String else{throw failure("Instalação duplicada do acervo.")}
    let began=Date(),deadline=began.addingTimeInterval(3600)
    var observed=try controller.snapshot(),lastPhase="",firstVisible:Double?
    while onboardingActiveStatuses.contains(observed["status"] as? String ?? ""),Date()<deadline {
        let phase=(observed["phase"] as? String ?? "")+":"+(observed["status"] as? String ?? "")
        if phase != lastPhase{print("REVIEWED_PHASE "+phase);lastPhase=phase}
        if firstVisible==nil,(try core.memoryOnlyProgress()).contains(where:{$0["kind"] as? String=="skill"}){firstVisible=Date().timeIntervalSince(began)}
        Thread.sleep(forTimeInterval:0.5);observed=try controller.snapshot()
    }
    guard observed["status"] as? String=="completed" else {
        try writeJSON(observed,base.appendingPathComponent("failure.json"))
        throw failure("Instalação do acervo: "+String(describing:observed["message"] ?? observed["status"] ?? "timeout"))
    }
    let activePlan=try core.validatedPlan()
    let files=try core.verifyDistribution(manifest,plan:activePlan),skills=try core.verifyDistributionSkills(manifest,plan:activePlan),memory=try core.verifyMemoryOnly(plan:activePlan)
    guard files["complete"] as? Bool==true,memory["memory"] as? Bool==true,
          core.distributionHostHome().path.hasPrefix(state.path+"/"),observed["readback"]==nil,
          skills["count"] as? Int==manifest.items.filter({$0.kind=="skill"}).count else{throw failure("Recibo final do acervo incompleto.")}
    let reopened=try Core(home:state);_=try reopened.completeMemoryOnly(plan:activePlan)
    let result:[String:Any]=["release_id":manifest.releaseID,"manifest_sha256":manifest.hash,"files":manifest.files.count,"items":manifest.items.count,
        "skills":skills,"memory":memory,"complete":true,"reopened_verified":true,"seconds":Date().timeIntervalSince(began),
        "first_verified_item_seconds":firstVisible as Any? ?? NSNull(),"network_downloads":remote,
        "access_check":"synthetic isolated fixture","host_discovered":false,"physical_license_verified":false,"fixture":base.path]
    try writeJSON(result,state.appendingPathComponent("reviewed-distribution-result.json"))
    print("REVIEWED_DISTRIBUTION_COMPLETE files=\(manifest.files.count) items=\(manifest.items.count) seconds=\(Date().timeIntervalSince(began))")
}

private func bundledRouterFixtureSource() -> URL {
    let candidate=URL(fileURLWithPath:fm.currentDirectoryPath).appendingPathComponent("skills/oracle")
    if fm.fileExists(atPath:candidate.path){return candidate}
    return Bundle.main.resourceURL!.appendingPathComponent("skills/oracle")
}
