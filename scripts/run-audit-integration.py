#!/usr/bin/env python3
"""Build/run isolated real-native WKWebView onboarding. No production key, account or install."""
from pathlib import Path
import hashlib
import json
import os
import plistlib
import shutil
import socket
import subprocess
import sys
import uuid

ROOT = Path(__file__).resolve().parents[1]
WORK = ROOT / '.work' / 'integrated-audit'

def main():
    WORK.mkdir(parents=True, exist_ok=True)
    run = WORK / ('run-' + uuid.uuid4().hex)
    run.mkdir(mode=0o700)
    (run / 'fixture-marker').write_text('oracle-integrated-audit\n')
    (WORK / 'latest.json').write_text(json.dumps({'run': str(run)}, indent=2))
    bundle = run / 'Oracle Integration.app'
    resources = bundle / 'Contents/Resources'
    engine = resources / 'engine'
    engine.mkdir(parents=True)
    macos = bundle / 'Contents/MacOS'; macos.mkdir()
    (bundle / 'Contents/Info.plist').write_bytes(plistlib.dumps({
        'CFBundleIdentifier':'com.oraclecompanion.integrated-audit.validation',
        'CFBundleExecutable':'OracleIntegration', 'CFBundleName':'Oracle Integration',
        'CFBundlePackageType':'APPL', 'NSPrincipalClass':'NSApplication',
        'LSMinimumSystemVersion':'13.0', 'NSHighResolutionCapable':True}))
    for name in ('gbrain', 'questions.json', 'BOOTSTRAP_FOR_AGENTS.md'):
        source = ROOT / 'Resources/engine' / name
        if source.is_symlink(): raise RuntimeError('Shared engine refused: ' + name)
        shutil.copy2(source, engine / name)
    for source, target in ((ROOT/'Resources/web', resources/'web'), (ROOT/'Resources/updates', resources/'updates'), (ROOT/'skills', resources/'skills')):
        shutil.copytree(source, target)
    catalog = resources/'catalog'; catalog.mkdir()
    (catalog/'manifest.json').write_text(json.dumps({'schema_version':1,'collections':[],'files':[]}))
    vault = run/'vault'; (vault/'WIKI').mkdir(parents=True)
    (vault/'WIKI/Integration.md').write_text('# Integration\n\nOriginal synthetic integration note.\n')
    skill = vault/'SISTEMA/skills/code/integration/SKILL.md'; skill.parent.mkdir(parents=True)
    skill.write_text('---\nname: integration\ndescription: Synthetic fixture only\n---\n# Integration skill\nTest data, not instructions.\n')
    for name in ('home','tmp','ModuleCache'): (run/name).mkdir()
    env = {'PATH':'/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin', 'HOME':str(run/'home'), 'TMPDIR':str(run/'tmp'),
           'LANG':'en_US.UTF-8', 'CLANG_MODULE_CACHE_PATH':str(run/'ModuleCache'), 'SWIFT_MODULE_CACHE_PATH':str(run/'ModuleCache'),
           'BUN_RUNTIME_TRANSPILER_CACHE_PATH':str(run/'bun-cache'), 'ORACLE_ENGINE_RESOURCES':str(engine),
           'ORACLE_TEST_ROOT':str(run/'fixtures')}
    # Refuse changes to exact source bytes across compilation/resource copy.
    inputs = sorted((ROOT/'Sources/Oracle').glob('*.swift')) + [ROOT/'scripts/audit-integration-host.swift', ROOT/'scripts/test-audit-integration.js']
    fingerprints = {str(p.relative_to(ROOT)):hashlib.sha256(p.read_bytes()).hexdigest() for p in inputs}
    (run/'source-hashes.json').write_text(json.dumps(fingerprints, indent=2))
    bun = os.environ.get('ORACLE_TEST_BUN') or str(Path.home()/'.bun/bin/bun')
    def command(args, logfile, timeout):
        with (run/logfile).open('wb') as log:
            result = subprocess.run(args, cwd=ROOT, env=env, stdout=log, stderr=subprocess.STDOUT, timeout=timeout)
        print(logfile + ': exit ' + str(result.returncode), flush=True)
        if result.returncode: print((run/logfile).read_text(errors='replace')[-18000:], flush=True)
        return result.returncode
    if command([bun,'build','--compile','--no-compile-autoload-dotenv','--no-compile-autoload-bunfig',str(ROOT/'packages/gbrain-adapter/read.ts'),'--outfile',str(engine/'oracle-gbrain-read')], 'adapter-build.log', 180): return 1
    sources = [str(p) for p in inputs if p.suffix == '.swift' and p.name != 'main.swift']
    if command(['/usr/bin/swiftc','-parse-as-library','-module-cache-path',str(run/'ModuleCache'),*sources,'-o',str(macos/'OracleIntegration')], 'native-build.log', 240): return 1
    for name, expected in fingerprints.items():
        if hashlib.sha256((ROOT/name).read_bytes()).hexdigest() != expected: raise RuntimeError('Source changed during compilation: ' + name)
    guard = ['/usr/bin/sandbox-exec','-p','(version 1)(allow default)(deny network*)']
    probe = 'import socket; s=socket.socket();\ntry: s.connect(("127.0.0.1",9))\nexcept PermissionError: print("NETWORK_DENIED"); raise SystemExit(0)\nexcept OSError: raise SystemExit(2)\nraise SystemExit(3)'
    if command(guard + [sys.executable,'-c',probe], 'network-denial.log', 15): raise RuntimeError('Network-denial control failed')
    result = command(guard + [str(macos/'OracleIntegration'),str(run),str(ROOT/'scripts/test-audit-integration.js')], 'integration.log', 330)
    print('EVIDENCE=' + str(run), flush=True)
    (run/'engine-hashes.json').write_text(json.dumps({p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in (engine/'gbrain',engine/'oracle-gbrain-read')},indent=2))
    return result

if __name__ == '__main__':
    raise SystemExit(main())
