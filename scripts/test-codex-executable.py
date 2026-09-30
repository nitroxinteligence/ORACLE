#!/usr/bin/env python3
"""Compile discovery only, exercise synthetic layouts, then report read-only live selection."""
from pathlib import Path
import subprocess
import tempfile

root = Path(__file__).resolve().parents[1]
work = root / '.work' / 'codex-executable-tests'
work.mkdir(parents=True, exist_ok=True)
with tempfile.TemporaryDirectory(prefix='run-', dir=work) as run:
    run = Path(run)
    main = run / 'main.swift'
    main.write_text('''import Foundation
let root = URL(fileURLWithPath: CommandLine.arguments[1])
try runCodexExecutableLocatorTests(root: root)
let selected = OracleCodexExecutableLocator.systemExecutable()
if let selected {
    print("LIVE_READ_ONLY_EXECUTABLE " + selected.path)
} else {
    print("LIVE_READ_ONLY_EXECUTABLE unavailable")
}
''')
    binary = run / 'test-codex-executable'
    subprocess.run(['/usr/bin/swiftc', '-module-cache-path', str(run / 'ModuleCache'),
                    str(root / 'Sources/Oracle/CodexExecutableLocator.swift'),
                    str(root / 'Sources/Oracle/CodexExecutableLocatorTests.swift'), str(main),
                    '-o', str(binary)], check=True)
    result = subprocess.run([str(binary), str(run / 'fixtures')], check=True, text=True, capture_output=True)
    (work / 'latest.log').write_text(result.stdout)
    print(result.stdout, end='')
