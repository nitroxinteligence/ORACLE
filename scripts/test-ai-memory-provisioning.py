#!/usr/bin/env python3
"""Compile only provisioning modules and run synthetic disk fixtures."""
import os
from pathlib import Path
import subprocess
import tempfile

repo = Path(__file__).resolve().parents[1]
reports = repo / '.work' / 'ai-memory-onboarding'
reports.mkdir(parents=True, exist_ok=True)
with tempfile.TemporaryDirectory(prefix='provisioning-fixture-', dir=reports) as directory:
    root = Path(directory)
    main = root / 'Main.swift'
    main.write_text('import Foundation\n@main struct Main { static func main() throws { try runAIMemoryProvisioningTests(root:URL(fileURLWithPath:CommandLine.arguments[1])) } }\n')
    binary = root / 'tests'
    sources = ['AIMemoryProvisioningEngine.swift', 'AIMemoryProvisioningDiscovery.swift', 'AIMemoryProvisioningProcess.swift', 'AIMemoryProvisioningTests.swift']
    subprocess.run(['/usr/bin/swiftc', *[str(repo / 'Sources/Oracle' / item) for item in sources], str(main), '-o', str(binary)], check=True, cwd=repo)
    result = subprocess.run([str(binary), str(root / 'profile')], cwd=repo, text=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    (reports / 'synthetic-tests.log').write_text(result.stdout)
    print(result.stdout, end='')
    if result.returncode:
        raise SystemExit(result.returncode)
