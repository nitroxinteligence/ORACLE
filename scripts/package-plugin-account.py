#!/usr/bin/env python3
"""Split an immutable complete plugin ZIP for account upload; no payload reduction."""
import argparse
import hashlib
import json
import os
from pathlib import Path, PurePosixPath
import re
import shutil
import stat
import tempfile
import zipfile

PART_BYTES = 4 * 1024 * 1024
MAX_ARCHIVE_BYTES = 2 * 1024 ** 3
MAX_EXPANDED_BYTES = 4 * 1024 ** 3
MAX_FILES = 100_000


def sha(path):
    h = hashlib.sha256()
    with path.open('rb') as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b''):
            h.update(block)
    return h.hexdigest()


def zip_inventory(archive, expected_sha):
    if not re.fullmatch('[0-9a-f]{64}', expected_sha) or archive.is_symlink() or archive.stat().st_size > MAX_ARCHIVE_BYTES or sha(archive) != expected_sha:
        raise ValueError('Original complete ZIP does not match the trusted SHA/size/regular-file contract')
    inventory = {}
    expanded = 0
    with zipfile.ZipFile(archive) as bundle:
        seen = set()
        for info in bundle.infolist():
            name = info.filename
            parts = PurePosixPath(name).parts
            mode = info.external_attr >> 16
            kind = stat.S_IFMT(mode)
            if name.rstrip('/') != PurePosixPath(name).as_posix() or not parts or parts[0] != 'oracle-desktop' or name.startswith('/') or any(part in ('.', '..') for part in name.split('/')) or any(c in name for c in '\n\r\\\x00'):
                raise ValueError('Unsafe ZIP path or different package root')
            if name in seen or kind not in (0, stat.S_IFREG, stat.S_IFDIR) or info.flag_bits & 1:
                raise ValueError('Duplicate, encrypted or non-regular ZIP member')
            seen.add(name)
            if info.is_dir():
                continue
            if len(parts) < 2:
                raise ValueError('ZIP root must be a directory')
            expanded += info.file_size
            if expanded > MAX_EXPANDED_BYTES or len(inventory) >= MAX_FILES:
                raise ValueError('Expanded package exceeds account transport bounds')
            h = hashlib.sha256()
            with bundle.open(info) as member:
                for block in iter(lambda: member.read(1024 * 1024), b''):
                    h.update(block)
            inventory[name] = h.hexdigest()
        receipt = json.loads(bundle.read('oracle-desktop/package-receipt.json'))
        if receipt.get('plugin') != 'oracle-desktop' or receipt.get('platform') != 'macOS-arm64':
            raise ValueError('Unexpected complete plugin identity/platform')
        expected = {'oracle-desktop/' + name: digest for name, digest in receipt['files'].items()}
        actual = {name: digest for name, digest in inventory.items() if name != 'oracle-desktop/package-receipt.json'}
        if actual != expected:
            raise ValueError('Complete payload differs from its original immutable receipt')
        for required in ['plugin.json', 'mcp.json', 'server.mjs', 'update.mjs', 'runtime/bun', 'runtime/Oracle.app/Contents/MacOS/Oracle',
                         'runtime/Oracle.app/Contents/Resources/engine/gbrain', 'runtime/Oracle.app/Contents/Resources/engine/oracle-gbrain-read',
                         'runtime/Oracle.app/Contents/Resources/engine/GBRAIN-LICENSE', 'runtime/Oracle.app/Contents/Resources/engine/THIRD-PARTY-NOTICES.txt',
                         'licenses/BUN-LICENSE.md']:
            if 'oracle-desktop/' + required not in inventory:
                raise ValueError('Complete runtime/license resource missing: ' + required)
    return inventory, expanded, receipt


def package_archive(archive, output, outer_archive, expected_sha, template=None):
    archive, output, outer_archive = Path(archive), Path(output).absolute(), Path(outer_archive).absolute()
    if output.name != 'oracle-desktop' or output.exists() or output.is_symlink() or outer_archive.exists() or outer_archive.is_symlink() or outer_archive.is_relative_to(output):
        raise ValueError('Use a fresh oracle-desktop directory and archive outside that directory')
    inventory, expanded, receipt = zip_inventory(archive, expected_sha)
    template = Path(template) if template else Path(__file__).parent / 'templates/launch-plugin-account.sh.in'
    output.parent.mkdir(parents=True, exist_ok=True)
    outer_archive.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix='.account-transport-', dir=output.parent) as temporary:
        stage = Path(temporary) / 'oracle-desktop'
        stage.mkdir()
        with zipfile.ZipFile(archive) as bundle:
            for name in inventory:
                relative = name[len('oracle-desktop/'):]
                if relative in ('plugin.json', 'mcp.json') or relative.startswith(('skills/', 'assets/', 'licenses/')):
                    target = stage / relative
                    target.parent.mkdir(parents=True, exist_ok=True)
                    target.write_bytes(bundle.read(name))
        payload = stage / 'payload'
        (payload / 'parts').mkdir(parents=True)
        parts = []
        with archive.open('rb') as stream:
            index = 0
            while True:
                block = stream.read(PART_BYTES)
                if not block:
                    break
                name = f'parts/{index:04d}.bin'
                (payload / name).write_bytes(block)
                parts.append((name, hashlib.sha256(block).hexdigest(), len(block)))
                index += 1
        (payload / 'parts.sha256').write_text(''.join(f'{digest}  {name}\n' for name, digest, size in parts))
        (payload / 'expanded.sha256').write_text(''.join(f'{digest}  {name}\n' for name, digest in sorted(inventory.items())))
        replacements = {'ARCHIVE_SHA': expected_sha, 'INVENTORY_SHA': sha(payload / 'expanded.sha256'), 'PARTS_SHA': sha(payload / 'parts.sha256'),
                        'ARCHIVE_BYTES': str(archive.stat().st_size), 'PART_COUNT': str(len(parts)), 'FILE_COUNT': str(len(inventory)), 'EXPANDED_BYTES': str(expanded)}
        launcher = template.read_text()
        for key, value in replacements.items():
            launcher = launcher.replace('@' + key + '@', value)
        if re.search('@[A-Z_]+@', launcher):
            raise ValueError('Incomplete launcher template')
        (stage / 'scripts').mkdir()
        (stage / 'scripts/launch-mcp.sh').write_text(launcher)
        (stage / 'scripts/launch-mcp.sh').chmod(0o755)
        transport = {'schemaVersion': 1, 'plugin': 'oracle-desktop', 'transportOnly': True, 'runtimeReduced': False,
                     'originalArchiveSHA256': expected_sha, 'originalArchiveBytes': archive.stat().st_size,
                     'originalBundleCommit': receipt.get('bundleCommit'), 'originalBundleBuildID': receipt.get('bundleBuildID'),
                     'partBytes': PART_BYTES, 'parts': [{'path': name, 'sha256': digest, 'bytes': size} for name, digest, size in parts],
                     'expandedFiles': len(inventory), 'expandedBytes': expanded, 'inventorySHA256': replacements['INVENTORY_SHA']}
        (stage / 'account-transport.json').write_text(json.dumps(transport, ensure_ascii=False, indent=2) + '\n')
        pending = Path(temporary) / 'outer.zip'
        with zipfile.ZipFile(pending, 'w', compression=zipfile.ZIP_STORED) as bundle:
            for path in sorted(stage.rglob('*')):
                if path.is_file():
                    if path.stat().st_size > PART_BYTES:
                        raise ValueError('Outer ZIP member exceeds 4 MiB transport bound: ' + str(path))
                    bundle.write(path, 'oracle-desktop/' + path.relative_to(stage).as_posix())
        if sha(archive) != expected_sha:
            raise ValueError('Original archive changed during transport packaging')
        os.rename(stage, output)
        os.rename(pending, outer_archive)
    return transport


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--archive', type=Path, required=True)
    parser.add_argument('--expected-sha256', required=True)
    parser.add_argument('--output', type=Path, required=True)
    parser.add_argument('--outer-archive', type=Path, required=True)
    parser.add_argument('--template', type=Path)
    args = parser.parse_args()
    print(json.dumps(package_archive(args.archive, args.output, args.outer_archive, args.expected_sha256, args.template), indent=2))


if __name__ == '__main__':
    main()
