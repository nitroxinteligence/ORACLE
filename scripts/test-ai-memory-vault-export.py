#!/usr/bin/env python3
"""Compile only manual export engine and Core API with synthetic fixtures."""
from pathlib import Path
import subprocess
import hashlib
import json
import re
import tempfile
root = Path(__file__).resolve().parents[1]
work = root / '.work/ai-memory-export-tests'
work.mkdir(parents=True, exist_ok=True)
with tempfile.TemporaryDirectory(prefix='run-', dir=work) as temporary:
    run = Path(temporary)
    main = run / 'main.swift'
    main.write_text('import Foundation\ntry runAIMemoryVaultExportTests(root: URL(fileURLWithPath: CommandLine.arguments[1]))\n')
    stubs = run / 'stubs.swift'
    stubs.write_text('''import Foundation
import Darwin
let fm = FileManager.default
enum Capability { case configure }
func failure(_ text:String)->NSError { NSError(domain:"TypecheckOnly",code:1) }
func readJSON(_ url:URL)throws->[String:Any] { [:] }
func atomicWriteData(_ data:Data,to url:URL,permissions:mode_t?=nil)throws {}
final class Core {
    var config:[String:Any]=[:]
    let home=URL(fileURLWithPath:"/typecheck-only")
    func scoped(_ relative:String,root:URL)throws->URL { root.appendingPathComponent(relative) }
    func refreshConfig() {}
    func requireCapability(_ capability:Capability)throws {}
    func acquireOperationLock(_ name:String)throws->Int32 { -1 }
    func releaseOperationLock(_ lock:Int32) {}
    func vault()throws->URL { home }
    func withVaultWrite<T>(_ action:()->T)throws->T { action() }
    func notifyVaultChanged(reason:String) {}
}
''')
    # Throwing closure matches actual Core write coordinator.
    stubs.write_text(stubs.read_text().replace('(_ action:()->T)throws->T { action() }', '(_ action:()throws->T)throws->T { try action() }'))
    engine = root / 'Sources/Oracle/AIMemoryVaultExportEngine.swift'
    subprocess.run(['/usr/bin/swiftc', '-typecheck', '-module-cache-path', str(run/'ModuleCache'), str(engine), str(root/'Sources/Oracle/AIMemoryVaultExport.swift'), str(stubs)], check=True)
    binary = run / 'engine-tests'
    subprocess.run(['/usr/bin/swiftc', '-module-cache-path', str(run/'ModuleCache'), str(engine), str(root/'Sources/Oracle/AIMemoryVaultExportTests.swift'), str(main), '-o', str(binary)], check=True)
    result = subprocess.run([str(binary), str(run/'fixtures')], check=True, text=True, capture_output=True, timeout=45)
    (work/'latest.log').write_text(result.stdout)
    paths = ['Sources/Oracle/AIMemoryVaultExport.swift', 'Sources/Oracle/AIMemoryVaultExportEngine.swift',
             'Sources/Oracle/AIMemoryVaultExportTests.swift', 'scripts/test-ai-memory-vault-export.py']
    report = {'synthetic_only': True, 'engine_checks_passed': int(re.search(r'AIMemory export: (\d+) checks passed', result.stdout)[1]),
              'core_api_typecheck_with_stubs': True, 'integrated_app_build': False, 'personal_memory_read': False,
              'scope': 'manual_export_and_explicit_preservation_recovery',
              'files': {name: hashlib.sha256((root/name).read_bytes()).hexdigest() for name in paths}}
    (work/'report.json').write_text(json.dumps(report, indent=2) + '\n')
    print(result.stdout, end='')
