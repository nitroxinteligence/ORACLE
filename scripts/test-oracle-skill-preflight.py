#!/usr/bin/env python3
"""Real router installer and preflight, Core shell stubbed to isolated state only."""
from pathlib import Path
import subprocess
import tempfile
root=Path(__file__).resolve().parents[1]
work=root/'.work/oracle-skill-preflight-tests'
work.mkdir(parents=True,exist_ok=True)
with tempfile.TemporaryDirectory(prefix='run-',dir=work) as directory:
    run=Path(directory)
    stubs=run/'core-fixture.swift'
    stubs.write_text('''import Foundation
import CryptoKit
import Darwin
let fm=FileManager.default
func failure(_ text:String)->NSError { NSError(domain:"OracleFixture",code:1,userInfo:[NSLocalizedDescriptionKey:text]) }
func digest(_ data:Data)->String { SHA256.hash(data:data).map{String(format:"%02x",$0)}.joined() }
func fileDigest(_ url:URL)throws->String { digest(try Data(contentsOf:url)) }
func jsonData(_ value:Any)throws->Data { try JSONSerialization.data(withJSONObject:value,options:[.sortedKeys,.prettyPrinted]) }
func readJSON(_ url:URL)throws->[String:Any] { try JSONSerialization.jsonObject(with:Data(contentsOf:url)) as! [String:Any] }
func atomicWriteData(_ data:Data,to url:URL)throws {try data.write(to:url,options:.atomic)}
func writeJSON(_ value:Any,_ url:URL)throws {try fm.createDirectory(at:url.deletingLastPathComponent(),withIntermediateDirectories:true);try atomicWriteData(jsonData(value),to:url)}
func oracleTestDirectory(_ name:String)throws->URL { URL(fileURLWithPath:CommandLine.arguments[1]) }
final class Core {
    let home:URL
    var config=[String:Any]()
    init(home:URL)throws {self.home=home;try fm.createDirectory(at:home,withIntermediateDirectories:true)}
    func distributionHostHome()->URL { home.appendingPathComponent("host-fixture") }
    func vault()throws->URL { URL(fileURLWithPath:config["vault"] as! String) }
    func bundledEngineResources()->URL { URL(fileURLWithPath:ProcessInfo.processInfo.environment["ORACLE_ENGINE_RESOURCES"]!) }
    func scoped(_ relative:String,root:URL)throws->URL {
        guard !relative.hasPrefix("/"),!relative.split(separator:"/").contains("..") else{throw failure("escape")}
        var current=root
        for piece in relative.split(separator:"/") {
            current.appendPathComponent(String(piece))
            if (try? current.resourceValues(forKeys:[.isSymbolicLinkKey]).isSymbolicLink)==true{throw failure("symlink")}
        }
        return current
    }
}
''')
    main=run/'main.swift'
    main.write_text('import Foundation\ntry runOracleSkillPreflightTests(root:URL(fileURLWithPath:CommandLine.arguments[1]))\n')
    subprocess.run(['/usr/bin/swiftc','-module-cache-path',str(run/'ModuleCache'),str(root/'Sources/Oracle/OracleSkillPreflight.swift'),str(root/'Sources/Oracle/OracleSkill.swift'),str(root/'Sources/Oracle/OracleSkillPreflightTests.swift'),str(stubs),str(main),'-o',str(run/'test')],check=True)
    result=subprocess.run([str(run/'test'),str(run/'fixtures')],capture_output=True,text=True,timeout=45)
    (work/'latest.log').write_text(result.stdout+result.stderr)
    print(result.stdout+result.stderr,end='')
    result.check_returncode()
