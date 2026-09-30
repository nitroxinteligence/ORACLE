#!/usr/bin/env python3
"""Run real native fixture processes and updater filesystem swaps in isolated .work."""
from pathlib import Path
import subprocess
import tempfile

root = Path(__file__).resolve().parents[1]
work = root / '.work' / 'application-update-health-tests'
work.mkdir(parents=True, exist_ok=True)
with tempfile.TemporaryDirectory(prefix='run-', dir=work) as directory:
    run = Path(directory)
    main = run / 'main.swift'
    main.write_text('''import Foundation
if CommandLine.arguments.count == 3 && CommandLine.arguments[1] == "--fixture-app" {
    try runApplicationUpdateFixtureProcess(bundle: URL(fileURLWithPath: CommandLine.arguments[2]))
} else {
    try runApplicationUpdateHealthTests(root: URL(fileURLWithPath: CommandLine.arguments[1]), executable: URL(fileURLWithPath: CommandLine.arguments[0]))
}
''')
    binary = run / 'test-update-health'
    subprocess.run(['/usr/bin/swiftc', '-module-cache-path', str(run / 'ModuleCache'),
                    str(root / 'Sources/Oracle/ApplicationUpdateRecovery.swift'),
                    str(root / 'Sources/Oracle/ApplicationUpdateHealthTests.swift'), str(main),
                    '-o', str(binary)], check=True)
    result = subprocess.run([str(binary), str(run / 'fixtures')], check=True, text=True, capture_output=True, timeout=30)
    (work / 'latest.log').write_text(result.stdout)
    print(result.stdout, end='')
