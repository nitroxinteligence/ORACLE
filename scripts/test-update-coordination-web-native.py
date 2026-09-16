#!/usr/bin/env python3
"""Focused updater regression in actual WKWebView with a synthetic native bridge.

Only this suite's .work directory is writable. Personal home reads and network
are denied. No installed app, real Core, profile or vault is opened or mutated.
"""
from __future__ import annotations

import hashlib
import json
import os
from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
WEB = ROOT / 'Resources/web'
SCRATCH = ROOT / '.work/update-coordination-web-tests'


def main() -> int:
    if sys.platform != 'darwin':
        raise RuntimeError('This test requires macOS and WebKit')
    if SCRATCH.resolve() != SCRATCH or WEB.resolve() != WEB:
        raise RuntimeError('Refusing symlinked test paths')
    SCRATCH.mkdir(parents=True, exist_ok=True)
    for name in ('home', 'tmp', 'cache'):
        (SCRATCH / name).mkdir(exist_ok=True)
    fixture = '\n'.join((ROOT / 'scripts' / name).read_text() for name in
                        ('fixture-onboarding-v2.js', 'fixture-update-coordination.js'))
    (SCRATCH / 'fixture.js').write_text(fixture)
    harness = (ROOT / 'scripts/atlas-web-fixture.m').read_text()
    harness = harness.replace('    if ([body[@"type"] isEqual:@"case"]) {', '''    if ([body[@"type"] isEqual:@"snapshot"]) {
        [self.web takeSnapshotWithConfiguration:nil completionHandler:^(NSImage *image, NSError *error) {
            NSBitmapImageRep *bitmap = image ? [NSBitmapImageRep imageRepWithData:image.TIFFRepresentation] : nil;
            NSData *png = [bitmap representationUsingType:NSBitmapImageFileTypePNG properties:@{}];
            NSString *path = [[self.reportPath stringByDeletingLastPathComponent] stringByAppendingPathComponent:@"channels.png"];
            BOOL saved = png && [png writeToFile:path options:0 error:nil];
            [self.web evaluateJavaScript:saved ? @"window.__updateChannelScreenshot=true" : @"window.__updateChannelScreenshot=false" completionHandler:nil];
        }];
        return;
    }
    if ([body[@"type"] isEqual:@"case"]) {''')
    (SCRATCH / 'host.m').write_text(harness)
    env = {'PATH': '/usr/bin:/bin:/usr/sbin:/sbin', 'HOME': str(SCRATCH / 'home'),
           'CFFIXED_USER_HOME': str(SCRATCH / 'home'), 'TMPDIR': str(SCRATCH / 'tmp') + '/',
           'CLANG_MODULE_CACHE_PATH': str(SCRATCH / 'cache'), 'LC_ALL': 'en_US.UTF-8'}
    home, scratch, web = map(json.dumps, (str(Path.home()), str(SCRATCH), str(WEB)))
    profile = '(version 1)(allow default)(deny network*)\n'
    profile += f'(deny file-write* (require-all (require-not (subpath {scratch})) (require-not (literal "/dev/null"))))\n'
    profile += f'(deny file-read* (require-all (subpath {home}) (require-not (subpath {scratch})) (require-not (subpath {web}))))\n'
    (SCRATCH / 'runtime.sb').write_text(profile)
    sandbox = ['/usr/bin/sandbox-exec', '-f', str(SCRATCH / 'runtime.sb')]
    binary = SCRATCH / 'host'
    compile_result = subprocess.run(sandbox + ['/usr/bin/clang', '-fobjc-arc', '-fno-modules',
        '-O0', '-g0', '-framework', 'AppKit', '-framework', 'WebKit', str(SCRATCH / 'host.m'),
        '-o', str(binary)], cwd=SCRATCH, env=env, capture_output=True, text=True, timeout=45)
    (SCRATCH / 'compile.log').write_text(compile_result.stdout + compile_result.stderr)
    if compile_result.returncode:
        print(compile_result.stdout + compile_result.stderr)
        return compile_result.returncode
    before = {str(p.relative_to(WEB)): hashlib.sha256(p.read_bytes()).hexdigest()
              for p in WEB.rglob('*') if p.is_file()}
    report_path = SCRATCH / 'result.json'
    report_path.unlink(missing_ok=True)
    result = subprocess.run(sandbox + [str(binary), str(WEB), str(SCRATCH / 'fixture.js'),
                            str(report_path)], cwd=SCRATCH, env=env,
                            capture_output=True, text=True, timeout=85)
    (SCRATCH / 'run.log').write_text(result.stdout + result.stderr)
    print(result.stdout + result.stderr)
    if not report_path.exists():
        return result.returncode or 1
    report = json.loads(report_path.read_text())
    report['sourceHashes'] = before
    report['sourcesUnchangedDuringRun'] = all(hashlib.sha256((WEB / name).read_bytes()).hexdigest() == value for name, value in before.items())
    report['isolation'] = {'realCore': False, 'network': 'denied', 'personalHomeReads': 'denied',
                           'writeScope': str(SCRATCH), 'websiteData': 'nonpersistent'}
    report_path.write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps({k: report.get(k) for k in ('passed', 'failed', 'cases', 'sourcesUnchangedDuringRun')}, ensure_ascii=False, indent=2))
    return 0 if result.returncode == 0 and report.get('passed', 0) > 0 and report.get('failed') == 0 and report['sourcesUnchangedDuringRun'] else 1


if __name__ == '__main__':
    try:
        raise SystemExit(main())
    except (OSError, RuntimeError, subprocess.SubprocessError) as error:
        print('UPDATE_UI_TEST_ERROR: ' + str(error), file=sys.stderr)
        raise SystemExit(2)
