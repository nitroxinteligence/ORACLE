#!/usr/bin/env python3
"""Focused native cache retention tests, synthetic state only."""
from pathlib import Path
import subprocess
import tempfile
root=Path(__file__).resolve().parents[1]
work=root/'.work/update-cache-retention-tests'
work.mkdir(parents=True,exist_ok=True)
with tempfile.TemporaryDirectory(prefix='run-',dir=work) as directory:
    run=Path(directory)
    main=run/'main.swift'
    main.write_text('import Foundation\nfunc oracleTestDirectory(_ name:String)throws->URL { URL(fileURLWithPath:CommandLine.arguments[1]) }\ntry runUpdateCacheRetentionTests(root:URL(fileURLWithPath:CommandLine.arguments[1]))\n')
    stubs=run/'core-stubs.swift'
    stubs.write_text("""import Foundation
import Darwin
let fm=FileManager.default
func failure(_ text:String)->NSError { NSError(domain:"TypecheckOnly",code:1) }
func atomicWriteData(_ data:Data,to url:URL,permissions:mode_t?=nil)throws {}
enum Capability { case configure }
struct DistributionManifest {
    let packages:[[String:Any]]=[]
    static func validHash(_ value:String)->Bool { true }
}
final class Core {
    let home=URL(fileURLWithPath:"/typecheck-only")
    func acquireOperationLock(_ name:String)throws->Int32 { -1 }
    func releaseOperationLock(_ fd:Int32) {}
    func requireCapability(_ capability:Capability)throws {}
    func decodeDistribution(_ data:Data,allowKnownRollback:Bool)throws->DistributionManifest { DistributionManifest() }
}
""")
    subprocess.run(['/usr/bin/swiftc','-typecheck','-module-cache-path',str(run/'ModuleCache'),str(root/'Sources/Oracle/UpdateCacheRetentionEngine.swift'),str(root/'Sources/Oracle/UpdateCacheRetention.swift'),str(stubs)],check=True)
    subprocess.run(['/usr/bin/swiftc','-D','ORACLE_CACHE_RETENTION_STANDALONE','-module-cache-path',str(run/'ModuleCache'),str(root/'Sources/Oracle/UpdateCacheRetentionEngine.swift'),str(root/'Sources/Oracle/UpdateCacheRetentionTests.swift'),str(main),'-o',str(run/'test')],check=True)
    result=subprocess.run([str(run/'test'),str(run/'fixtures')],text=True,capture_output=True,timeout=45)
    (work/'latest.log').write_text(result.stdout+result.stderr)
    print(result.stdout+result.stderr,end='')
    result.check_returncode()
