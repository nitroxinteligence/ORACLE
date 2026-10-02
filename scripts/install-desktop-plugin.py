#!/usr/bin/env python3
"""Register a verified Oracle package in a personal local marketplace."""
import argparse
from datetime import datetime, timezone
import hashlib
import json
import os
from pathlib import Path
import shutil
import subprocess
import tempfile

NAME = 'oracle-desktop'


def sha(path):
    h = hashlib.sha256()
    with path.open('rb') as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b''):
            h.update(block)
    return h.hexdigest()


def verify(package):
    receipt = json.loads((package / 'package-receipt.json').read_text())
    files = receipt['files']
    actual = set()
    for path in package.rglob('*'):
        if path.is_symlink():
            raise ValueError('Package must contain no symlinks')
        if path.is_file() and path.name != 'package-receipt.json':
            actual.add(path.relative_to(package).as_posix())
    if actual != set(files):
        raise ValueError('Package inventory mismatch')
    for relative, expected in files.items():
        path = package / relative
        if not path.resolve().is_relative_to(package.resolve()) or sha(path) != expected:
            raise ValueError(f'Package integrity mismatch: {relative}')
    for required in ['plugin.json', 'mcp.json', 'server.mjs', 'runtime/bun',
                     'runtime/Oracle.app/Contents/MacOS/Oracle', 'scripts/launch-mcp.sh']:
        if required not in files:
            raise ValueError(f'Incomplete package: {required}')
    manifest = json.loads((package / 'plugin.json').read_text())
    if manifest['name'] != NAME or receipt['platform'] != 'macOS-arm64':
        raise ValueError('Unexpected plugin/platform')
    return receipt


def atomic_json(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    descriptor, temp = tempfile.mkstemp(prefix='.' + path.name, dir=path.parent)
    try:
        with os.fdopen(descriptor, 'w') as stream:
            json.dump(value, stream, ensure_ascii=False, indent=2)
            stream.write('\n')
            stream.flush()
            os.fsync(stream.fileno())
        os.replace(temp, path)
    finally:
        if os.path.exists(temp):
            os.unlink(temp)


def register(package, home):
    package, home = package.resolve(), home.resolve()
    verify(package)
    home.mkdir(parents=True, exist_ok=True)
    market = home / '.agents/plugins/marketplace.json'
    destination = home / 'plugins/oracle-desktop'
    if market.is_symlink() or destination.is_symlink():
        raise ValueError('Refusing symlinked marketplace or plugin destination')
    for target in [market.parent, destination.parent]:
        if not target.resolve().is_relative_to(home):
            raise ValueError('Destination escapes selected home')
    original = market.read_bytes() if market.exists() else None
    catalog = json.loads(original) if original is not None else {'name': 'personal', 'interface': {'displayName': 'Personal'}, 'plugins': []}
    if not isinstance(catalog.get('name'), str) or not isinstance(catalog.get('plugins'), list):
        raise ValueError('Invalid existing marketplace; preserved without edits')
    stamp = datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%S.%fZ')
    backups = home / '.codex/plugin-backups' / f'oracle-desktop-{stamp}'
    backups.mkdir(parents=True)
    if original is not None:
        (backups / 'marketplace.json').write_bytes(original)
    (backups / 'rollback.json').write_text(json.dumps({'marketplaceExisted': original is not None, 'pluginExisted': destination.exists(), 'marketplace': str(market), 'destination': str(destination)}) + '\n')
    destination.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix='.oracle-install-', dir=destination.parent) as temporary:
        pending = Path(temporary) / NAME
        shutil.copytree(package, pending)
        verify(pending)
        old = destination.exists()
        if old:
            os.rename(destination, backups / 'oracle-desktop')
        try:
            os.rename(pending, destination)
            entry = {'name': NAME, 'source': {'source': 'local', 'path': './plugins/oracle-desktop'},
                     'policy': {'installation': 'AVAILABLE', 'authentication': 'ON_INSTALL'}, 'category': 'Productivity'}
            entries = [item for item in catalog['plugins'] if item.get('name') != NAME]
            catalog['plugins'] = entries + [entry]
            current = market.read_bytes() if market.exists() else None
            if current != original:
                raise ValueError('Marketplace changed concurrently; preserved without overwrite')
            atomic_json(market, catalog)
        except Exception:
            if destination.exists():
                shutil.rmtree(destination)
            if old:
                os.rename(backups / 'oracle-desktop', destination)
            # atomic_json replaces only after a complete write. Do not restore an
            # old catalog here: an external edit must survive this rollback.
            raise
    return {'registered': True, 'activated': False, 'marketplace': catalog['name'],
            'pluginPath': str(destination), 'backupPath': str(backups), 'hooksTrusted': False}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--package', type=Path, required=True)
    parser.add_argument('--home', type=Path, default=Path.home(), help='Personal marketplace root; use synthetic home for tests')
    parser.add_argument('--activate', action='store_true', help='Explicitly install with the host Codex CLI after registration')
    parser.add_argument('--codex', default='codex')
    args = parser.parse_args()
    result = register(args.package, args.home)
    if args.activate:
        environment = dict(os.environ, HOME=str(args.home.resolve()), CODEX_HOME=str(args.home.resolve() / '.codex'))
        subprocess.run([args.codex, 'plugin', 'add', f'{NAME}@{result["marketplace"]}', '--json'], env=environment, check=True)
        result['activated'] = True
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
