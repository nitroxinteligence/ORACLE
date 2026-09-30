#!/usr/bin/env python3
"""Isolated HTTP service tests. Never calls launchctl or installs LaunchAgents."""
from pathlib import Path
import argparse
import subprocess

repo = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument('--binary', type=Path, required=True)
parser.add_argument('--config', type=Path, required=True)
args = parser.parse_args()
root = repo / '.work/ai-memory-service-tests'
root.mkdir(parents=True, exist_ok=True)
import tempfile
with tempfile.TemporaryDirectory(prefix='synthetic-', dir=root) as directory:
    fixture = Path(directory)
    main = fixture / 'Main.swift'
    main.write_text('import Foundation\n@main struct Main { static func main() throws { if CommandLine.arguments[1]=="--guard-probe" { _=try OracleAIMemoryServiceTestDriver.hooksIfAllowed(profile:URL(fileURLWithPath:CommandLine.arguments[2]),state:URL(fileURLWithPath:CommandLine.arguments[2]+"/service"));return }; try runAIMemoryServiceTests(root:URL(fileURLWithPath:CommandLine.arguments[1]),binary:URL(fileURLWithPath:CommandLine.arguments[2]),config:URL(fileURLWithPath:CommandLine.arguments[3]));try runAIMemoryServiceDriverTests(root:URL(fileURLWithPath:CommandLine.arguments[1]),binary:URL(fileURLWithPath:CommandLine.arguments[2]),config:URL(fileURLWithPath:CommandLine.arguments[3])) } }\n')
    sources = ['AIMemoryProvisioningEngine.swift','AIMemoryProvisioningDiscovery.swift','AIMemoryProvisioningProcess.swift','AIMemoryServiceEngine.swift','AIMemoryServiceProcess.swift','AIMemoryServiceTestDriver.swift','AIMemoryServiceTests.swift']
    executable = fixture / 'tests'
    subprocess.run(['/usr/bin/swiftc', *[str(repo/'Sources/Oracle'/s) for s in sources],str(main),'-o',str(executable)],check=True)
    import os
    test_env = dict(os.environ, ORACLE_AI_MEMORY_SERVICE_TEST='1', ORACLE_TEST_ROOT=str(fixture))
    for name, extra, patch, success in [
        ('absent guard returns nil', [], {'ORACLE_AI_MEMORY_SERVICE_TEST': None}, True),
        ('missing selftest refused', [], {}, False),
        ('other selftest refused', ['--self-test-distribution','--self-test-core'], {}, False),
        ('non-work test root refused', ['--self-test-distribution'], {'ORACLE_TEST_ROOT':'/tmp'}, False),
    ]:
        guard_env = dict(test_env)
        for key,value in patch.items():
            if value is None: guard_env.pop(key, None)
            else: guard_env[key] = value
        guard = subprocess.run([str(executable),'--guard-probe',str(fixture/'guard-profile'),*extra],env=guard_env,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
        if (guard.returncode == 0) != success: raise SystemExit('FAIL '+name)
        print('PASS '+name)
    result = subprocess.run([str(executable),str(fixture/'profile'),str(args.binary.resolve()),str(args.config.resolve()),"--self-test-distribution"],env=test_env,text=True,stdout=subprocess.PIPE,stderr=subprocess.STDOUT,timeout=150)
    (root/'latest.log').write_text(result.stdout)
    report = fixture/'profile/report.json'
    if report.exists():
        import json
        document = json.loads(report.read_text())
        document.update(sharedChildDriverVerified=result.returncode == 0, guardChecks=4, sharedDriverChecks=2, totalChecks=document['checks']+6)
        (root/'report.json').write_text(json.dumps(document, sort_keys=True))
    print(result.stdout,end='')
    raise SystemExit(result.returncode)
