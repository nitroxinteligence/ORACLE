#!/usr/bin/env python3
"""Compile the actual narrow Core runtime methods with isolated filesystem support."""
from pathlib import Path
import os
import subprocess
import tempfile
root = Path(__file__).resolve().parents[1]
work = root / '.work' / 'codex-runtime-binding-tests'
work.mkdir(parents=True, exist_ok=True)
with tempfile.TemporaryDirectory(prefix='status-', dir=work) as directory:
    run = Path(directory)
    source = (root / 'Sources/Oracle/GBrainMethod.swift').read_text()
    methods = source[source.index('    func prepareCodexRuntimeBinding()'):source.index('    func verifyGBrainBridge()')]
    interview = (root / 'Sources/Oracle/KnowledgeInterview.swift').read_text()
    helper = interview[interview.index('enum OracleKnowledgeInterview {'):interview.index('    static func receiptPath(')] + '}\n'
    support = run / 'support.swift'
    support.write_text('''import Foundation
import CryptoKit
let fm=FileManager.default
func failure(_ message:String)->NSError {OracleCodexRuntimeBinding.error(message)}
func digest(_ data:Data)->String {SHA256.hash(data:data).map{String(format:"%02x",$0)}.joined()}
func jsonData(_ value:[String:Any])throws->Data {try JSONSerialization.data(withJSONObject:value,options:[.sortedKeys,.withoutEscapingSlashes])}
func readJSON(_ url:URL)throws->[String:Any] {try JSONSerialization.jsonObject(with:Data(contentsOf:url)) as! [String:Any]}
func scoped(_ relative:String,root:URL)throws->URL {let url=root.appendingPathComponent(relative).standardizedFileURL;guard url.path.hasPrefix(root.path+"/"),url.resolvingSymlinksInPath().path==url.path else{throw failure("scope")};return url}
struct ProcessResult {let code:Int32;let output:String}
func runProcess(_ executable:URL,_ args:[String],cwd:URL,environment:[String:String],timeout:Double,operation:String)throws->ProcessResult {throw failure("production signature never bypassed in fixture harness")}
struct Core {let home:URL
func oracleWorkspace()throws->URL {home.appendingPathComponent("oracle-workspace")}
func readAdapterExecutable()throws->URL {throw failure("production adapter never replaced implicitly")}
}
''' + helper + '\nextension Core {\n' + methods + '\n}\n')
    main = run / 'main.swift'
    main.write_text('''import Foundation
let home=URL(fileURLWithPath:CommandLine.arguments[1]).appendingPathComponent("state")
try fm.createDirectory(at:home,withIntermediateDirectories:true)
let bundle=try prepareOracleRuntimeBindingTestFixture(home:home),core=Core(home:home)
let binding=try core.prepareCodexRuntimeBinding()
let workspace=try core.oracleWorkspace()
try fm.createDirectory(at:workspace.appendingPathComponent(".codex"),withIntermediateDirectories:true)
try fm.createDirectory(at:home.appendingPathComponent("setup"),withIntermediateDirectories:true)
var events=[String:Any]()
for name in OracleCodexRuntimeBinding.hookEvents {events[name]=[["hooks":[["type":"command","command":OracleCodexRuntimeBinding.hookCommand(executable:binding["oracle"] as! String,state:home.path)]]]]}
let hooks:[String:Any]=["hooks":events]
try jsonData(hooks).write(to:workspace.appendingPathComponent(".codex/hooks.json"))
let adapter=binding["adapter"] as! String
let value=String(decoding:try JSONSerialization.data(withJSONObject:[adapter],options:[.withoutEscapingSlashes]),as:UTF8.self).dropFirst().dropLast()
let config=Data(("[mcp_servers.oracle_companion]\\ncommand = "+value+"\\n").utf8)
try config.write(to:workspace.appendingPathComponent(".codex/config.toml"))
var receipt:[String:Any]=["workspace":workspace.path,"runtime_binding":binding,"hooks_sha256":digest(try jsonData(hooks)),"mcp_sha256":digest(config),"mcp_status":"prepared_requires_codex_trust"]
let receiptURL=home.appendingPathComponent("setup/bridge.json")
try jsonData(receipt).write(to:receiptURL)
func check(_ expected:Bool,_ name:String)throws {let status=core.codexRuntimeBindingStatus();guard status["runtimeReady"] as? Bool==expected else{throw failure("FAIL "+name+" "+String(describing:status))};print("PASS "+name)}
try check(true,"actual Core fixture preparation and ready status")
let start=Date();for _ in 0..<100 {try check(true,"cached filesystem health")}
print("METRIC status100_ms "+String(Date().timeIntervalSince(start)*1000))
let edited=config+Data("# external change\\n".utf8)
try edited.write(to:workspace.appendingPathComponent(".codex/config.toml"))
try check(false,"external configuration is unhealthy and preserved")
receipt["pending_interview_config_sha256"]=digest(edited)
try jsonData(receipt).write(to:receiptURL)
try check(false,"unjournaled pending hash cannot authorize edit")
receipt["pending_interview_previous_sha256"]=digest(config)
receipt["pending_interview_config_path"]=workspace.appendingPathComponent(".codex/config.toml").path
receipt["pending_interview_writable_vault"]=home.appendingPathComponent("vault").path
try jsonData(receipt).write(to:receiptURL)
try check(true,"valid pending interview journal remains healthy")
try fm.removeItem(at:URL(fileURLWithPath:adapter))
try check(false,"cached healthy status detects deleted adapter")
try fm.removeItem(at:bundle)
try check(false,"trusted receipt cannot hide deleted bundle")
print("PASS Core runtime status integration")
''')
    binary = run / 'test-runtime-status'
    subprocess.run(['/usr/bin/swiftc', '-module-cache-path', str(run / 'ModuleCache'),
                    str(root / 'Sources/Oracle/CodexRuntimeBinding.swift'),
                    str(root / 'Sources/Oracle/CodexRuntimeBindingTests.swift'), str(support), str(main), '-o', str(binary)], check=True)
    environment = dict(os.environ, ORACLE_TEST_ROOT=str(run))
    result = subprocess.run([str(binary), str(run), '--self-test-runtime-binding', '--state', str(run / 'state')], env=environment, check=True, text=True, capture_output=True)
    (work / 'status-latest.log').write_text(result.stdout)
    print('\n'.join(line for line in result.stdout.splitlines() if line != 'PASS cached filesystem health'))
