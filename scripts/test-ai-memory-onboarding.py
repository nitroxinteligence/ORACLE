#!/usr/bin/env python3
"""Focused real onboarding module, isolated Core seam and TOML parser.

No provisioning/download/host discovery is run. Runtime and workspace authority
are explicit fixture seams, so this does not qualify the integrated Core engine.
"""
from pathlib import Path
import hashlib
import json
import re
import subprocess
import tempfile
import sys

ROOT = Path(__file__).resolve().parents[1]
WORK = ROOT / '.work/ai-memory-onboarding-tests'
WORK.mkdir(parents=True, exist_ok=True)

with tempfile.TemporaryDirectory(prefix='run-', dir=WORK) as temporary:
    run = Path(temporary)
    manifest = (ROOT/'Sources/Oracle/DistributionManifest.swift').read_text()
    canonical = manifest[manifest.index('func distributionCanonical('):manifest.index('struct DistributionFile')]
    interview=(ROOT/'Sources/Oracle/KnowledgeInterview.swift').read_text()
    helper=interview[interview.index('    static func validHash('):interview.index('    /// Coverage, generation')]
    canonical+='\nenum OracleKnowledgeInterview {\n'+helper+'}\n'
    stubs = run/'fixture-core.swift'
    stubs.write_text('''import Foundation
import CryptoKit
import CoreFoundation
let fm=FileManager.default
func failure(_ message:String)->NSError {NSError(domain:"OnboardingFixture",code:1,userInfo:[NSLocalizedDescriptionKey:message])}
func digest(_ bytes:Data)->String {SHA256.hash(data:bytes).map{String(format:"%02x",$0)}.joined()}
func jsonData(_ value:Any)throws->Data {try JSONSerialization.data(withJSONObject:value,options:[.sortedKeys,.prettyPrinted])}
func readJSON(_ path:URL)throws->[String:Any] {guard let value=try JSONSerialization.jsonObject(with:Data(contentsOf:path)) as? [String:Any] else{throw failure("not object")};return value}
func writeJSON(_ value:Any,_ path:URL)throws {try fm.createDirectory(at:path.deletingLastPathComponent(),withIntermediateDirectories:true);try jsonData(value).write(to:path,options:.atomic)}
final class Core {
 let home:URL
 var workspace:URL
 var runtime:[String:Any]=["mode":"fixture","runtimePrepared":true,"receipt":"synthetic-runtime-v1"]
 var descriptor:[String:Any]
 var service:[String:Any]=["mode":"fixture","serviceAvailable":true,"receipt":"synthetic-service-v1"]
 var serviceUnavailable=false
 var runtimeUnavailable=false
 init(home:URL,workspace:URL,descriptor:[String:Any]) {self.home=home;self.workspace=workspace;self.descriptor=descriptor}
 func scoped(_ relative:String,root:URL)throws->URL {let path=root.appendingPathComponent(relative).standardizedFileURL;guard path.path.hasPrefix(root.path+"/") else{throw failure("fixture escape")};return path}
 func oracleWorkspace()throws->URL {workspace}
 func verifyAIMemoryRuntime(plan:[String:Any])throws->[String:Any] {if runtimeUnavailable{throw failure("fixture runtime unavailable")};return runtime}
 func verifyAIMemoryService(plan:[String:Any])throws->[String:Any] {if serviceUnavailable{throw failure("fixture service unavailable")};return service}
 func aiMemoryCodexDescriptor(plan:[String:Any])throws->[String:Any] {descriptor}
}
''' + canonical)
    main = run/'main.swift'
    main.write_text('''import Foundation
let root=URL(fileURLWithPath:CommandLine.arguments[1])
try runAIMemoryOnboardingTests(root:root)
var checks=0
func check(_ value:Bool,_ name:String)throws {guard value else{throw failure("FAIL "+name)};checks+=1;print("PASS "+name)}
func reject(_ name:String,_ action:()throws->Void)throws {var denied=false;do{try action()}catch{denied=true};try check(denied,name)}
let home=root.appendingPathComponent("state"),workspace=root.appendingPathComponent("workspace")
let descriptor:[String:Any]=["existingCodexConfiguration":false,"mcp":["name":"oracle_ai_memory","url":"http://127.0.0.1:43127/mcp"]]
let core=Core(home:home,workspace:workspace,descriptor:descriptor)
let legacy:[String:Any]=["plan_hash":"legacy"]
try core.recordOnboardingAIMemoryCodex(plan:legacy,descriptor:descriptor,workspace:workspace,configurationHash:"unused")
let receiptFile=home.appendingPathComponent("setup/ai-memory-codex.json")
try check(!fm.fileExists(atPath:receiptFile.path),"legacy recording creates no receipt")
try check(try core.verifyOnboardingAIMemory(plan:legacy)["required"] as? Bool==false,"legacy verification needs no runtime/config")
let plan:[String:Any]=["plan_hash":String(repeating:"a",count:64),"ai_memory":OracleAIMemoryProvisioning.requirement]
try reject("new completion needs bound Codex receipt"){_=try core.verifyOnboardingAIMemory(plan:plan)}
let fragment=try OracleAIMemoryOnboarding.codexConfiguration(descriptor)
let configFile=workspace.appendingPathComponent(".codex/config.toml")
let content=Data(("approval_policy = \\\"on-request\\\"\\n"+fragment).utf8)
try fm.createDirectory(at:configFile.deletingLastPathComponent(),withIntermediateDirectories:true)
try content.write(to:configFile)
core.runtimeUnavailable=true
try reject("recording refuses unavailable runtime"){try core.recordOnboardingAIMemoryCodex(plan:plan,descriptor:descriptor,workspace:workspace,configurationHash:digest(content))}
try check(!fm.fileExists(atPath:receiptFile.path),"failed runtime creates no successful Codex receipt")
core.runtimeUnavailable=false
core.serviceUnavailable=true
try reject("recording refuses unavailable service"){try core.recordOnboardingAIMemoryCodex(plan:plan,descriptor:descriptor,workspace:workspace,configurationHash:digest(content))}
try check(!fm.fileExists(atPath:receiptFile.path),"failed service creates no successful Codex receipt")
core.serviceUnavailable=false
try core.recordOnboardingAIMemoryCodex(plan:plan,descriptor:descriptor,workspace:workspace,configurationHash:digest(content))
let originalReceipt=try Data(contentsOf:receiptFile)
let status=try core.verifyOnboardingAIMemory(plan:plan)
try check(status["codexPrepared"] as? Bool==true,"matching runtime/plan/config verifies preparation")
try check(status["hooksTrusted"] as? Bool==false && status["executionVerified"] as? Bool==false && status["captureEnabled"] as? Bool==false,"prepared never grants trust execution or capture")
core.runtimeUnavailable=true
try reject("completion refuses unavailable runtime"){_=try core.verifyOnboardingAIMemory(plan:plan)}
core.runtimeUnavailable=false
core.serviceUnavailable=true
try reject("completion refuses unavailable service"){_=try core.verifyOnboardingAIMemory(plan:plan)}
core.serviceUnavailable=false
core.service["receipt"]="changed"
try reject("changed service receipt invalidates Codex binding"){_=try core.verifyOnboardingAIMemory(plan:plan)}
core.service["receipt"]="synthetic-service-v1"
try check(try Data(contentsOf:receiptFile)==originalReceipt,"service rejection preserves bound receipt")
var other=plan;other["plan_hash"]=String(repeating:"b",count:64)
try reject("another plan cannot reuse receipt"){_=try core.verifyOnboardingAIMemory(plan:other)}
core.runtime["receipt"]="changed"
try reject("changed runtime receipt invalidates Codex binding"){_=try core.verifyOnboardingAIMemory(plan:plan)}
core.runtime["receipt"]="synthetic-runtime-v1"
core.descriptor["changed"]=true
try reject("changed descriptor invalidates Codex binding"){_=try core.verifyOnboardingAIMemory(plan:plan)}
core.descriptor=descriptor
core.workspace=root.appendingPathComponent("different-workspace")
try reject("workspace relocation cannot reuse receipt"){_=try core.verifyOnboardingAIMemory(plan:plan)}
core.workspace=workspace
let edited=content+Data("\\n# external edit preserved\\n".utf8);try edited.write(to:configFile)
try reject("external configuration edit blocks completion"){_=try core.verifyOnboardingAIMemory(plan:plan)}
try check(try Data(contentsOf:configFile)==edited && Data(contentsOf:receiptFile)==originalReceipt,"rejected verification preserves edits and receipt")
let managed=content+Data("\\n# managed interview grant\\n".utf8);try managed.write(to:configFile)
try writeJSON(["mcp_sha256":digest(content),"interview_config_sha256":digest(managed)],home.appendingPathComponent("setup/bridge.json"))
try check(try core.verifyOnboardingAIMemory(plan:plan)["codexPrepared"] as? Bool==true,"managed interview configuration accepted with intact MCP")
try check(try Data(contentsOf:configFile)==managed,"managed verification does not rewrite configuration")
var journal:[String:Any]=["mcp_sha256":digest(content),"pending_interview_previous_sha256":digest(content),"pending_interview_config_sha256":digest(managed),"workspace":workspace.path,"pending_interview_config_path":configFile.path,"pending_interview_writable_vault":root.appendingPathComponent("vault").path]
try writeJSON(journal,home.appendingPathComponent("setup/bridge.json"))
try check(try core.verifyOnboardingAIMemory(plan:plan)["codexPrepared"] as? Bool==true,"valid managed pending interview journal accepted")
journal["pending_interview_previous_sha256"]=String(repeating:"f",count:64)
try writeJSON(journal,home.appendingPathComponent("setup/bridge.json"))
try reject("orphan pending hash is not trusted"){_=try core.verifyOnboardingAIMemory(plan:plan)}
journal["pending_interview_previous_sha256"]=digest(content);journal["pending_interview_config_path"]=root.appendingPathComponent("foreign.toml").path
try writeJSON(journal,home.appendingPathComponent("setup/bridge.json"))
try reject("pending journal at wrong path is not trusted"){_=try core.verifyOnboardingAIMemory(plan:plan)}
try check(try Data(contentsOf:configFile)==managed,"pending rejection preserves human/config data")
try writeJSON([String:Any](),home.appendingPathComponent("setup/bridge.json"))
try content.write(to:configFile)
var corrupted=try readJSON(receiptFile);corrupted["configuration_sha256"]=digest(content)
try Data("approval_policy = \\\"on-request\\\"\\n".utf8).write(to:configFile);corrupted["configuration_sha256"]=digest(try Data(contentsOf:configFile));try writeJSON(corrupted,receiptFile)
try reject("matching hash without owned fragment fails"){_=try core.verifyOnboardingAIMemory(plan:plan)}
core.descriptor=["existingCodexConfiguration":true]
try core.recordOnboardingAIMemoryCodex(plan:plan,descriptor:core.descriptor,workspace:workspace,configurationHash:"unused")
try check(try core.verifyOnboardingAIMemory(plan:plan)["existingCodexConfiguration"] as? Bool==true,"existing configuration stays attached without duplicate workspace MCP")
print("AI Memory onboarding fixture Core: \\(checks) checks passed")
''')
    sources = ['Sources/Oracle/AIMemoryProvisioningEngine.swift', 'Sources/Oracle/AIMemoryProvisioningProcess.swift',
               'Sources/Oracle/AIMemoryOnboarding.swift', 'Sources/Oracle/AIMemoryOnboardingTests.swift']
    tracked_sources=sources+['Sources/Oracle/DistributionInstall.swift','Sources/Oracle/KnowledgeInterview.swift','Sources/Oracle/DistributionManifest.swift','scripts/test-ai-memory-onboarding.py']
    source_hashes={p:hashlib.sha256((ROOT/p).read_bytes()).hexdigest() for p in tracked_sources}
    binary = run/'tests'
    compiled=subprocess.run(['/usr/bin/swiftc','-module-cache-path',str(run/'ModuleCache'),
        *[str(ROOT/p) for p in sources],str(stubs),str(main),'-o',str(binary)],capture_output=True,text=True,timeout=90)
    (WORK/'compile.log').write_text(compiled.stdout+compiled.stderr)
    if compiled.returncode:
        print(compiled.stderr);raise SystemExit(compiled.returncode)
    executed=subprocess.run([str(binary),str(run/'fixtures')],capture_output=True,text=True,timeout=30)
    (WORK/'latest.log').write_text(executed.stdout+executed.stderr)
    print(executed.stdout+executed.stderr,end='')
    if executed.returncode:raise SystemExit(executed.returncode)
    # Parse actual Swift output using an available Python stdlib TOML parser.
    parser='''import json,sys,tomllib
from pathlib import Path
root=Path(sys.argv[1]);actual=tomllib.loads((root/'configuration.toml').read_text());expected=json.loads((root/'expected.json').read_text())
assert actual['approval_policy']=='on-request' and actual['sandbox_mode']=='workspace-write'
assert actual['mcp_servers']['oracle_ai_memory']==expected
assert set(actual['mcp_servers']['oracle_ai_memory'])=={'url'}
assert set(actual['mcp_servers'])=={'foreign','oracle_ai_memory'}
assert actual['mcp_servers']['foreign']=={'command':'/synthetic/external','args':['unchanged']}
print('TOML roundtrip: 5 checks passed')
'''
    python=next((str(p) for p in [Path('/opt/homebrew/bin/python3.12'),Path(sys.executable)] if p.is_file()),sys.executable)
    parsed=subprocess.run([python,'-c',parser,str(run/'fixtures')],capture_output=True,text=True)
    (WORK/'toml.log').write_text(parsed.stdout+parsed.stderr)
    if parsed.returncode:print(parsed.stderr);raise SystemExit(parsed.returncode)
    print(parsed.stdout,end='')
    install=(ROOT/'Sources/Oracle/DistributionInstall.swift').read_text()
    start=install.index('plan["ai_memory"]=OracleAIMemoryProvisioning.requirement')
    assert start<install.index('plan["plan_hash"]=try planDigest(plan)',start)
    assert source_hashes=={p:hashlib.sha256((ROOT/p).read_bytes()).hexdigest() for p in tracked_sources}, 'sources changed during focused run; rerun after stabilization'
    report={'synthetic_only':True,'pure_checks':int(re.search(r'pure: (\d+) checks',executed.stdout)[1]),
      'fixture_core_checks':int(re.search(r'fixture Core: (\d+) checks',executed.stdout)[1]),'toml_roundtrip_checks':5,
      'source_order_check_requirement_before_plan_hash':True,'runtime_verifier':'fixture seam, not real provisioning',
      'core_methods':'real AIMemoryOnboarding.swift; fixture Core dependencies',
      'integrated_app_build':False,'personal_config_read':False,'download_or_service_run':False,
      'source_hashes':source_hashes}
    (WORK/'report.json').write_text(json.dumps(report,indent=2)+'\n')
