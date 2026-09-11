#!/usr/bin/env python3
"""Isolated native UI integration: no installed app, real identity, login or network.

Builds a separate fixture executable against the real services and onboarding bridge.
All generated state/resources are private copies under this worktree's .work.
"""
from pathlib import Path
import hashlib
import json
import os
import shutil
import signal
import subprocess
import sys
import uuid

ROOT = Path(__file__).resolve().parents[1]
WORK = ROOT / '.work/integration-prime'
# Conservative headroom for this developer fixture, not a product disk requirement.
MIN_FREE_BYTES = 3 * 1024 ** 3
EXPECTED_CHECKS = 13


def require_headroom(path, phase):
    free = shutil.disk_usage(path).free
    if free < MIN_FREE_BYTES:
        raise RuntimeError(f'Insufficient fixture disk headroom before {phase}: '
                           f'{free} bytes free, {MIN_FREE_BYTES} required. '
                           'No database repair or automatic cleanup was attempted.')
    return {'phase': phase, 'freeBytes': free, 'minimumBytes': MIN_FREE_BYTES}


def validate_report(report):
    if not isinstance(report, dict) or report.get('fatal') or report.get('finished') is not True:
        raise RuntimeError('Native UI did not produce a successful completed report')
    checks = report.get('checks')
    if not isinstance(checks, list) or len(checks) != EXPECTED_CHECKS:
        raise RuntimeError('Native UI report is missing required assertions')
    names = [check.get('name') if isinstance(check, dict) else None for check in checks]
    if any(not isinstance(name, str) or not name for name in names) or len(set(names)) != EXPECTED_CHECKS:
        raise RuntimeError('Native UI assertion names are missing or duplicated')
    if (any(check.get('pass') is not True for check in checks)
            or type(report.get('passed')) is not int or report['passed'] != EXPECTED_CHECKS
            or type(report.get('failed')) is not int or report['failed'] != 0):
        raise RuntimeError('Native UI assertions or summary counts failed validation')
    if report.get('physicalDeviceActivationVerified') is not False or report.get('remoteInferenceUsed') is not False:
        raise RuntimeError('Native UI report is missing its isolation limitations')


def sha(path):
    h = hashlib.sha256()
    with path.open('rb') as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b''):
            h.update(chunk)
    return h.hexdigest()


def main():
    WORK.mkdir(parents=True, exist_ok=True)
    if WORK.resolve() != WORK:
        raise RuntimeError('The work root must not traverse symlinks')
    disk_samples = [require_headroom(WORK, 'fixture creation')]
    native = sorted(path for path in (ROOT / 'Sources/Oracle').glob('*.swift') if path.name != 'main.swift')
    host = ROOT / 'scripts/audit-native-ui-host.swift'
    inputs = native + [host, Path(__file__).resolve(), ROOT / 'scripts/test-native-ui.js',
                       ROOT / 'Resources/catalog/manifest.json']
    for directory in ('Resources/web', 'skills', 'Resources/updates'):
        inputs += sorted(path for path in (ROOT / directory).rglob('*') if path.is_file())
    inputs += sorted(path for path in (ROOT / 'packages/gbrain-adapter').glob('*.ts'))
    inputs += [ROOT / 'Resources/engine' / name for name in ('gbrain', 'questions.json', 'BOOTSTRAP_FOR_AGENTS.md')]
    before = {str(path.relative_to(ROOT)): sha(path) for path in inputs}
    fixture = WORK / ('native-ui-' + uuid.uuid4().hex)
    fixture.mkdir(mode=0o700)
    if fixture.resolve() != fixture:
        raise RuntimeError('The fixture root must not traverse symlinks')
    resources = fixture / 'Resources'
    resources.mkdir()
    for name in ('host-home', 'tmp', 'ModuleCache', 'vault/WIKI'):
        (fixture / name).mkdir(parents=True)
    (fixture / 'vault/WIKI/integration-note.md').write_text('# Integration note\n\nInitial synthetic revision\n')
    shutil.copytree(ROOT / 'Resources/web', resources / 'web')
    shutil.copytree(ROOT / 'skills', resources / 'skills')
    shutil.copytree(ROOT / 'Resources/updates', resources / 'updates')
    (resources / 'catalog').mkdir()
    shutil.copy2(ROOT / 'Resources/catalog/manifest.json', resources / 'catalog/manifest.json')
    (resources / 'engine').mkdir()
    for name in ('gbrain', 'questions.json', 'BOOTSTRAP_FOR_AGENTS.md'):
        source = ROOT / 'Resources/engine' / name
        if source.is_symlink():
            raise RuntimeError('Refusing a shared engine symlink')
        shutil.copy2(source, resources / 'engine' / name)
    script = fixture / 'test-native-ui.js'
    shutil.copy2(ROOT / 'scripts/test-native-ui.js', script)
    env = {'HOME': str(fixture / 'host-home'), 'TMPDIR': str(fixture / 'tmp') + '/',
           'PATH': '/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin',
           'CLANG_MODULE_CACHE_PATH': str(fixture / 'ModuleCache'),
           'SWIFT_MODULE_CACHE_PATH': str(fixture / 'ModuleCache'),
           'BUN_RUNTIME_TRANSPILER_CACHE_PATH': str(fixture / 'bun-cache'),
           'ORACLE_ENGINE_RESOURCES': str(resources / 'engine'), 'LC_ALL': 'en_US.UTF-8'}
    bun = os.environ.get('ORACLE_TEST_BUN', '/Users/mateusmpz/.bun/bin/bun')
    if not Path(bun).is_file():
        raise RuntimeError('Set ORACLE_TEST_BUN to the already installed Bun binary')
    sandbox = ['/usr/bin/sandbox-exec', '-p', '(version 1)(allow default)(deny network*)']
    commands = []
    def run(args, log, timeout):
        disk_samples.append(require_headroom(fixture, log))
        command = [str(a) for a in [*sandbox, *args]]
        record = {'argv': command, 'log': log, 'timeoutSeconds': timeout}
        commands.append(record)
        with (fixture / log).open('w') as output:
            process = subprocess.Popen(command, cwd=ROOT, env=env, start_new_session=True,
                                       stdout=output, stderr=subprocess.STDOUT)
            record['pid'] = process.pid
            try:
                record['exitCode'] = process.wait(timeout=timeout)
            except subprocess.TimeoutExpired:
                record['timedOut'] = True
                raise
            finally:
                # Only the group created for this exact command, never a process name.
                try:
                    os.killpg(process.pid, signal.SIGKILL)
                except ProcessLookupError:
                    pass
                if process.poll() is None:
                    process.wait(timeout=10)
                record['exitCode'] = process.returncode
        if process.returncode:
            print((fixture / log).read_text()[-14000:])
            raise RuntimeError(f'{log} failed with exit {process.returncode}')
    print('Fixture:', fixture, flush=True)
    bun_config = fixture / 'bunfig.toml'
    bun_config.write_text('[install]\nauto = "disable"\n')
    guard = "import socket,sys\ntry:\n s=socket.socket();s.connect(('127.0.0.1',9))\nexcept OSError as e:\n print('network guard errno',e.errno);sys.exit(0 if e.errno in (1,13) else 1)\nsys.exit(2)"
    network_denied = False
    try:
        run([sys.executable, '-c', guard], 'network-denial.log', 10)
        network_denied = True
        run([bun, 'build', '--no-env-file', '--no-install', '--config=' + str(bun_config),
             '--compile', '--target=bun-darwin-arm64', '--no-compile-autoload-dotenv', '--no-compile-autoload-bunfig',
             ROOT / 'packages/gbrain-adapter/read.ts', '--outfile', resources / 'engine/oracle-gbrain-read'], 'adapter-build.log', 180)
        if not (resources / 'engine/oracle-gbrain-read').is_file():
            raise RuntimeError('The build did not produce an adapter executable')
        executable = fixture / 'OracleNativeUIFixture'
        run(['/usr/bin/swiftc', '-module-cache-path', fixture / 'ModuleCache', '-o', executable,
             *native, host], 'native-host-build.log', 240)
        run([executable, fixture, resources, script], 'native-ui.log', 330)
    finally:
        after = {str(path.relative_to(ROOT)): sha(path) if path.is_file() else None for path in inputs}
        adapter = resources / 'engine/oracle-gbrain-read'
        evidence = {'sourceHashes': before, 'sourceChangedDuringRun': [name for name in before if before[name] != after[name]],
                    'engineSHA256': sha(resources / 'engine/gbrain'), 'adapterSHA256': sha(adapter) if adapter.is_file() else None,
                    'networkDenied': network_denied, 'fixture': str(fixture), 'commands': commands,
                    'diskHeadroom': disk_samples, 'diskFreeBytesAfter': shutil.disk_usage(fixture).free}
        (fixture / 'provenance.json').write_text(json.dumps(evidence, indent=2) + '\n')
        print('Evidence:', fixture / 'provenance.json', flush=True)
    if evidence['sourceChangedDuringRun']:
        raise RuntimeError('Sources changed during execution; rerun against one stable revision')
    report = json.loads((fixture / 'native-ui-result.json').read_text())
    validate_report(report)
    print(json.dumps({'passed': report.get('passed'), 'failed': report.get('failed'), 'result': str(fixture / 'native-ui-result.json')}, indent=2))
    (WORK / 'native-ui-latest.json').write_text(json.dumps({'fixture': str(fixture), 'result': report, 'provenance': evidence}, indent=2) + '\n')


if __name__ == '__main__':
    main()
