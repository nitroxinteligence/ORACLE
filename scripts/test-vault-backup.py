#!/usr/bin/env python3
"""Compile only the vault snapshot engine, using synthetic local fixtures."""
from pathlib import Path
import subprocess
import tempfile

root = Path(__file__).resolve().parents[1]
work = root / '.work' / 'vault-backup-tests'
work.mkdir(parents=True, exist_ok=True)
with tempfile.TemporaryDirectory(prefix='run-', dir=work) as directory:
    run = Path(directory)
    main = run / 'main.swift'
    main.write_text('''import Foundation
func oracleTestDirectory(_ name: String) throws -> URL {
    URL(fileURLWithPath: CommandLine.arguments[1]).appendingPathComponent(name)
}
try runVaultBackupTests(root: URL(fileURLWithPath: CommandLine.arguments[1]))
''')
    binary = run / 'test-vault-backup'
    stubs = run / 'core-stubs.swift'
    stubs.write_text('''import Foundation
import Darwin
let fm = FileManager.default
enum Capability { case configure }
func failure(_ text:String)->NSError { NSError(domain:"TypecheckOnly",code:1) }
func readJSON(_ url:URL)throws->[String:Any] { [:] }
func writeJSON(_ value:Any,_ url:URL)throws {}
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
}
''')
    subprocess.run(['/usr/bin/swiftc', '-typecheck', '-module-cache-path', str(run / 'ModuleCache'),
                    str(root / 'Sources/Oracle/VaultBackupEngine.swift'),
                    str(root / 'Sources/Oracle/VaultBackup.swift'), str(stubs)], check=True)
    subprocess.run(['/usr/bin/swiftc', '-D', 'ORACLE_VAULT_BACKUP_STANDALONE', '-module-cache-path', str(run / 'ModuleCache'),
                    str(root / 'Sources/Oracle/VaultBackupEngine.swift'),
                    str(root / 'Sources/Oracle/VaultBackupTests.swift'), str(main), '-o', str(binary)], check=True)
    result = subprocess.run([str(binary), str(run / 'fixtures')], check=True, text=True, capture_output=True, timeout=45)
    (work / 'latest.log').write_text(result.stdout)
    print(result.stdout, end='')
