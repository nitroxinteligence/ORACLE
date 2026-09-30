#!/usr/bin/env python3
"""Compile the runtime binding module and exercise synthetic files only."""
from pathlib import Path
import subprocess
import tempfile
root = Path(__file__).resolve().parents[1]
work = root / '.work' / 'codex-runtime-binding-tests'
work.mkdir(parents=True, exist_ok=True)
with tempfile.TemporaryDirectory(prefix='run-', dir=work) as directory:
    run = Path(directory)
    main = run / 'main.swift'
    main.write_text('import Foundation\ntry runCodexRuntimeBindingTests(root: URL(fileURLWithPath: CommandLine.arguments[1]))\n')
    binary = run / 'test-runtime-binding'
    subprocess.run(['/usr/bin/swiftc', '-module-cache-path', str(run / 'ModuleCache'),
                    str(root / 'Sources/Oracle/CodexRuntimeBinding.swift'),
                    str(root / 'Sources/Oracle/CodexRuntimeBindingTests.swift'), str(main), '-o', str(binary)], check=True)
    result = subprocess.run([str(binary), str(run / 'fixtures')], check=True, text=True, capture_output=True)
    (work / 'latest.log').write_text(result.stdout)
    print(result.stdout, end='')
