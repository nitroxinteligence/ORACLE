import importlib.util
import json
import os
from pathlib import Path
import plistlib
import shutil
import subprocess
import tempfile
import unittest
import zipfile

BASE = Path(__file__).resolve().parent
WORK = BASE.parent / ".work/plugin-account-tests"
WORK.mkdir(parents=True, exist_ok=True)
spec = importlib.util.spec_from_file_location('account_transport', BASE / 'package-plugin-account.py')
packager = importlib.util.module_from_spec(spec)
spec.loader.exec_module(packager)


class AccountTransportTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(dir=WORK)
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.source = self.root / 'source/oracle-desktop'
        self.source.mkdir(parents=True)
        files = {'plugin.json': json.dumps({'name': 'oracle-desktop', 'version': '0.3.21', 'extensions': {'com.openai': {'interface': {'displayName': 'Oracle System'}}}}),
                 'mcp.json': json.dumps({'mcpServers': {'oracle-desktop': {'type': 'stdio', 'command': './scripts/launch-mcp.sh', 'cwd': './'}}}),
                 'server.mjs': '// complete synthetic server\n', 'update.mjs': '// complete synthetic update module\n',
                 'skills/oracle-desktop/SKILL.md': 'synthetic skill', 'assets/icon.svg': '<svg/>',
                 'licenses/BUN-LICENSE.md': 'synthetic Bun notices',
                 'runtime/bun': '#!/bin/sh\nprintf "fixture launched:%s\\n" "$1"\n',
                 'runtime/Oracle.app/Contents/Resources/engine/oracle-gbrain-read': 'synthetic adapter',
                 'runtime/Oracle.app/Contents/Resources/engine/GBRAIN-LICENSE': 'synthetic GBrain license',
                 'runtime/Oracle.app/Contents/Resources/engine/THIRD-PARTY-NOTICES.txt': 'synthetic third-party notices'}
        for relative, value in files.items():
            path = self.source / relative
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text(value)
        (self.source / 'runtime/bun').chmod(0o755)
        # Real ad hoc native signature for the synthetic app; verification is not bypassed.
        app = self.source / 'runtime/Oracle.app'
        (app / 'Contents/MacOS').mkdir()
        shutil.copyfile('/usr/bin/true', app / 'Contents/MacOS/Oracle')
        (app / 'Contents/MacOS/Oracle').chmod(0o755)
        (app / 'Contents/Info.plist').write_bytes(plistlib.dumps({'CFBundleIdentifier': 'test.oracle.account.transport', 'CFBundleExecutable': 'Oracle', 'CFBundlePackageType': 'APPL'}))
        (app / 'Contents/Resources/engine/gbrain').write_bytes(os.urandom(5 * 1024 * 1024))
        subprocess.run(['/usr/bin/codesign', '--force', '--sign', '-', str(app)], check=True, capture_output=True)
        inventory = {p.relative_to(self.source).as_posix(): packager.sha(p) for p in self.source.rglob('*') if p.is_file()}
        (self.source / 'package-receipt.json').write_text(json.dumps({'plugin': 'oracle-desktop', 'platform': 'macOS-arm64', 'bundleCommit': 'synthetic', 'files': inventory}))
        self.archive = self.root / 'complete.zip'
        with zipfile.ZipFile(self.archive, 'w', zipfile.ZIP_STORED) as archive:
            for p in self.source.rglob('*'):
                if p.is_file():
                    archive.write(p, 'oracle-desktop/' + p.relative_to(self.source).as_posix())
        self.archive_sha = packager.sha(self.archive)
        self.outer = self.root / 'outer/oracle-desktop'
        self.outer_zip = self.root / 'outer.zip'
        self.report = packager.package_archive(self.archive, self.outer, self.outer_zip, self.archive_sha)
        self.home = self.root / 'home'
        self.home.mkdir(mode=0o700)
        self.environment = dict(os.environ, HOME=str(self.home))
        self.launcher = self.outer / 'scripts/launch-mcp.sh'

    def launch(self):
        return subprocess.run([str(self.launcher)], env=self.environment, text=True, capture_output=True, timeout=30)

    def test_assemble_and_reuse_verify_complete_bytes(self):
        first = self.launch()
        self.assertEqual(first.returncode, 0, first.stderr)
        generation = self.home / '.codex/oracle-plugin-payloads' / self.archive_sha
        self.assertEqual(packager.sha(generation / 'payload.zip'), self.archive_sha)
        reconstructed = generation / 'oracle-desktop'
        for path in self.source.rglob('*'):
            if path.is_file():
                self.assertEqual(packager.sha(path), packager.sha(reconstructed / path.relative_to(self.source)))
        stamp = (generation / '.owner').stat().st_mtime_ns
        second = self.launch()
        self.assertEqual(second.returncode, 0, second.stderr)
        self.assertEqual((generation / '.owner').stat().st_mtime_ns, stamp)
        self.assertIn(str(reconstructed / 'server.mjs'), second.stdout)
        with zipfile.ZipFile(self.outer_zip) as archive:
            self.assertLessEqual(max(info.file_size for info in archive.infolist()), packager.PART_BYTES)

    def test_concurrent_cold_launches_share_one_verified_generation(self):
        first = subprocess.Popen([str(self.launcher)], env=self.environment, text=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        second = subprocess.Popen([str(self.launcher)], env=self.environment, text=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        a = first.communicate(timeout=30)
        b = second.communicate(timeout=30)
        self.assertEqual(first.returncode, 0, a[1])
        self.assertEqual(second.returncode, 0, b[1])
        store = self.home / '.codex/oracle-plugin-payloads'
        self.assertEqual(sorted(p.name for p in store.iterdir()), ['.owner', self.archive_sha])
        self.assertEqual(packager.sha(store / self.archive_sha / 'payload.zip'), self.archive_sha)

    def test_tampered_part_rejected_without_generation(self):
        part = self.outer / 'payload/parts/0000.bin'
        with part.open('r+b') as stream:
            stream.write(b'!')
        result = self.launch()
        self.assertNotEqual(result.returncode, 0)
        self.assertFalse((self.home / '.codex/oracle-plugin-payloads' / self.archive_sha).exists())

    def test_tampered_extracted_cache_rejected_without_overwrite(self):
        self.assertEqual(self.launch().returncode, 0)
        generation = self.home / '.codex/oracle-plugin-payloads' / self.archive_sha
        server = generation / 'oracle-desktop/server.mjs'
        server.write_text('tampered')
        result = self.launch()
        self.assertNotEqual(result.returncode, 0)
        self.assertEqual(server.read_text(), 'tampered')

    def test_tampered_full_zip_rejected_on_reuse(self):
        self.assertEqual(self.launch().returncode, 0)
        archive = self.home / '.codex/oracle-plugin-payloads' / self.archive_sha / 'payload.zip'
        with archive.open('r+b') as stream:
            stream.write(b'!')
        self.assertNotEqual(self.launch().returncode, 0)

    def test_symlinked_owner_store_rejected(self):
        (self.home / '.codex').mkdir(mode=0o700)
        outside = self.root / 'outside'
        outside.mkdir()
        (self.home / '.codex/oracle-plugin-payloads').symlink_to(outside, target_is_directory=True)
        self.assertNotEqual(self.launch().returncode, 0)
        self.assertEqual(list(outside.iterdir()), [])

    def test_invalid_zip_path_rejected_before_transport(self):
        bad = self.root / 'bad.zip'
        with zipfile.ZipFile(bad, 'w') as archive:
            archive.writestr('oracle-desktop/../outside', 'escape')
        with self.assertRaises(ValueError):
            packager.package_archive(bad, self.root / 'bad/oracle-desktop', self.root / 'bad-outer.zip', packager.sha(bad))


if __name__ == '__main__':
    unittest.main()
