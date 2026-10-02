#!/usr/bin/env python3
"""Create an immutable local macOS plugin from a verified existing Oracle bundle."""
import argparse
import hashlib
import importlib.util
import json
import os
from pathlib import Path
import shutil
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[1]
_spec = importlib.util.spec_from_file_location('oracle_build_manifest', ROOT / 'scripts/build-manifest.py')
_build_manifest = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_build_manifest)
source_snapshot = _build_manifest.source_snapshot


def verify_source_provenance(manifest):
    current = source_snapshot()
    if any(manifest.get(key) != current.get(key) for key in ('commit', 'sourceHash')):
        raise ValueError('Bundle source differs from current plugin/native source; build the frozen current source first')


def digest(path):
    h = hashlib.sha256()
    with path.open('rb') as source:
        for block in iter(lambda: source.read(1024 * 1024), b''):
            h.update(block)
    return h.hexdigest()


def inventory(root):
    result = {}
    for path in sorted(root.rglob('*')):
        if path.is_symlink():
            raise ValueError(f'Unresolved symlink in package: {path}')
        if path.is_file() and path.name != 'package-receipt.json':
            result[path.relative_to(root).as_posix()] = digest(path)
    return result



def probe_native_plugin(app):
    """Probe only boot/EOF in a new retained .work profile, without native UI."""
    probe_root = ROOT / '.work/desktop-plugin-package-probes'
    probe_root.mkdir(parents=True, exist_ok=True)
    directory = Path(tempfile.mkdtemp(prefix='probe-', dir=probe_root))
    state = directory / 'state'
    temporary = directory / 'tmp'
    for path in (state, temporary):
        path.mkdir(parents=True)
    request = {'id': 'package-boot-probe', 'method': 'boot', 'params': {}}
    environment = {'PATH': '/usr/bin:/bin:/usr/sbin:/sbin', 'TMPDIR': str(temporary)}
    record = {'schemaVersion': 1, 'app': str(app), 'state': str(state),
              'request': request, 'passed': False}
    try:
        result = subprocess.run([str(app / 'Contents/MacOS/Oracle'), '--plugin-server', '--state', str(state)],
                                input=json.dumps(request) + '\n', text=True, capture_output=True,
                                env=environment, timeout=30, check=False)
        (directory / 'stdout.jsonl').write_text(result.stdout)
        (directory / 'stderr.txt').write_text(result.stderr)
        record['exitCode'] = result.returncode
        if result.returncode != 0:
            raise ValueError('Native plugin boot probe failed; inspect ' + str(directory))
        lines = result.stdout.splitlines()
        if len(lines) != 1:
            raise ValueError('Native plugin boot probe returned an invalid JSONL stream; inspect ' + str(directory))
        response = json.loads(lines[0])
        if not isinstance(response, dict) or response.get('id') != request['id'] or set(response) != {'id', 'value'}:
            raise ValueError('Native plugin boot probe returned an incompatible response; inspect ' + str(directory))
        value = response['value']
        if not isinstance(value, dict) or set(value) != {'locked', 'accessibility'} or type(value['locked']) is not bool:
            raise ValueError('Native plugin boot probe returned incompatible boot state; inspect ' + str(directory))
        accessibility = value['accessibility']
        if not isinstance(accessibility, dict) or set(accessibility) != {'reduceMotion', 'reduceTransparency'} or any(type(item) is not bool for item in accessibility.values()):
            raise ValueError('Native plugin boot probe returned incompatible accessibility state; inspect ' + str(directory))
        record['passed'] = True
        record['response'] = response
        return {'method': 'boot', 'exitCode': 0, 'response': value}
    except subprocess.TimeoutExpired as error:
        for name, output in [('stdout.jsonl', error.stdout), ('stderr.txt', error.stderr)]:
            (directory / name).write_text(output.decode(errors='replace') if isinstance(output, bytes) else output or '')
        record['error'] = 'Native plugin boot probe timed out'
        raise ValueError(record['error'] + '; inspect ' + str(directory)) from error
    except Exception as error:
        record['error'] = str(error)
        raise
    finally:
        (directory / 'probe-receipt.json').write_text(json.dumps(record, ensure_ascii=False, indent=2) + '\n')


def package(app, bun, output, channel):
    app, bun, output = app.resolve(), bun.resolve(), output.absolute()
    if output.exists() or output.is_symlink():
        raise ValueError('Output already exists; choose a fresh package directory')
    manifest = json.loads((app / 'Contents/Resources/build-manifest.json').read_text())
    if manifest['architecture'] != 'arm64' or manifest['channel'] != channel:
        raise ValueError('Bundle architecture/channel does not match requested package')
    verify_source_provenance(manifest)
    subprocess.run(['python3', str(ROOT / 'scripts/build-manifest.py'), 'verify', '--channel', channel, '--app', str(app)], check=True)
    subprocess.run(['python3', str(ROOT / 'scripts/build-manifest.py'), 'verify-signature', '--channel', channel, '--app', str(app)], check=True)
    if channel == 'release':
        subprocess.run(['xcrun', 'stapler', 'validate', str(app)], check=True)
    verify_source_provenance(manifest)
    native_probe = probe_native_plugin(app)
    if not bun.is_file() or not os.access(bun, os.X_OK):
        raise ValueError('An existing executable Bun runtime must be supplied')
    arch = subprocess.check_output(['lipo', '-archs', str(bun)], text=True).strip().split()
    if 'arm64' not in arch:
        raise ValueError('Bun runtime lacks macOS arm64 support')
    version = subprocess.check_output([str(bun), '--version'], text=True).strip()
    if version != manifest['provenance']['adapterCompilerBun'] or version != '1.3.10':
        raise ValueError('Bun must match the reviewed bundle/compiler and license pin (1.3.10)')
    server = ROOT / 'packages/oracle-desktop-plugin/server.mjs'
    updater = ROOT / 'packages/oracle-desktop-plugin/update.mjs'
    if not updater.is_file():
        raise ValueError('Plugin update module source missing')
    if not server.is_file():
        raise ValueError('MCP server source missing')
    output.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix='.oracle-plugin-stage-', dir=output.parent) as temporary:
        stage = Path(temporary) / 'oracle-desktop'
        shutil.copytree(ROOT / 'plugins/oracle-desktop', stage)
        (stage / 'runtime').mkdir()
        shutil.copytree(app, stage / 'runtime/Oracle.app', symlinks=False)
        shutil.copy2(bun, stage / 'runtime/bun')
        shutil.copy2(server, stage / 'server.mjs')
        shutil.copy2(updater, stage / 'update.mjs')
        # SDK-free server has no npm dependencies; all native resources, pins and
        # third-party notices travel inside the verified app bundle.
        verify_source_provenance(manifest)
        receipt = {'schemaVersion': 1, 'plugin': 'oracle-desktop', 'platform': 'macOS-arm64',
                   'minimumMacOS': manifest['minimumMacOS'], 'channel': channel,
                   'bundleBuildID': manifest['buildID'], 'bundleCommit': manifest['commit'],
                   'bundleSourceHash': manifest['sourceHash'], 'bunVersion': version,
                   'bunSHA256': digest(bun), 'nativePluginProbe': native_probe, 'files': inventory(stage),
                   'installed': False, 'published': False}
        (stage / 'package-receipt.json').write_text(json.dumps(receipt, ensure_ascii=False, indent=2) + '\n')
        os.rename(stage, output)
    return output


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--app', type=Path, required=True)
    parser.add_argument('--bun', type=Path, required=True)
    parser.add_argument('--output', type=Path, required=True)
    parser.add_argument('--channel', choices=['developer', 'release'], required=True)
    args = parser.parse_args()
    print(package(args.app, args.bun, args.output, args.channel))


if __name__ == '__main__':
    main()
