#!/usr/bin/env python3
"""Synthetic package/registration tests; no personal profile or native UI."""
import importlib.util
import json
from pathlib import Path
import tempfile
import subprocess
import unittest
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]


def load(name):
    spec = importlib.util.spec_from_file_location(name.replace('-', '_'), ROOT / f'scripts/{name}.py')
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


packager = load('package-desktop-plugin')
installer = load('install-desktop-plugin')


class PackageTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory(dir=ROOT / '.work')
        self.addCleanup(self.temporary.cleanup)
        self.base = Path(self.temporary.name)
        self.app = self.base / 'Oracle.app'
        resources = self.app / 'Contents/Resources'
        resources.mkdir(parents=True)
        executable = self.app / 'Contents/MacOS/Oracle'
        executable.parent.mkdir()
        executable.write_text('synthetic optimized native executable')
        executable.chmod(0o755)
        self.manifest = {'architecture': 'arm64', 'channel': 'developer', 'minimumMacOS': '13.0',
                         'buildID': 'synthetic-test', 'commit': 'synthetic', 'sourceHash': 'synthetic', 'provenance': {'adapterCompilerBun': '1.3.10'}}
        (resources / 'build-manifest.json').write_text(json.dumps(self.manifest))
        (resources / 'GBRAIN-LICENSE').write_text('synthetic license')
        self.bun = self.base / 'bun'
        self.bun.write_text('synthetic Bun')
        self.bun.chmod(0o755)
        self.package = self.base / 'package'
        with patch.object(packager, 'source_snapshot', return_value={'commit': 'synthetic', 'sourceHash': 'synthetic'}), patch.object(packager, 'probe_native_plugin', return_value={'method': 'boot', 'exitCode': 0}), patch.object(packager.subprocess, 'run') as calls, patch.object(packager.subprocess, 'check_output', side_effect=['arm64\n', '1.3.10\n']):
            packager.package(self.app, self.bun, self.package, 'developer')
            self.assertEqual(calls.call_count, 2)
        self.home = self.base / 'home'
        self.home.mkdir()

    def test_packaged_runtime_resources_and_immutable_output(self):
        installer.verify(self.package)
        self.assertTrue((self.package / 'runtime/Oracle.app/Contents/Resources/GBRAIN-LICENSE').is_file())
        with self.assertRaises(ValueError):
            packager.package(self.app, self.bun, self.package, 'developer')

    def test_mixed_source_is_rejected_before_bundle_verification_or_copy(self):
        output = self.base / 'mismatched-package'
        with patch.object(packager, 'source_snapshot', return_value={'commit': 'synthetic', 'sourceHash': 'newer-source'}), patch.object(packager.subprocess, 'run') as native:
            with self.assertRaisesRegex(ValueError, 'Bundle source differs'):
                packager.package(self.app, self.bun, output, 'developer')
            native.assert_not_called()
        self.assertFalse(output.exists())

    def test_native_probe_exact_boot_reply_and_disposable_profile(self):
        reply = {'id': 'package-boot-probe', 'value': {'locked': False, 'accessibility': {'reduceMotion': False, 'reduceTransparency': True}}}
        with patch.object(packager.subprocess, 'run', return_value=subprocess.CompletedProcess([], 0, json.dumps(reply) + '\n', '')) as native:
            result = packager.probe_native_plugin(self.app)
        command = native.call_args.args[0]
        state = Path(command[command.index('--state') + 1])
        self.assertTrue(state.is_relative_to(ROOT / '.work'))
        self.assertNotEqual(state, self.home)
        self.assertNotIn('HOME', native.call_args.kwargs['env'])
        self.assertNotIn('CODEX_HOME', native.call_args.kwargs['env'])
        self.assertEqual(result['response'], reply['value'])
        self.assertTrue(json.loads((state.parent / 'probe-receipt.json').read_text())['passed'])
        self.assertTrue((state.parent / 'stdout.jsonl').is_file())

    def test_native_probe_rejects_wrong_id_or_non_boolean_accessibility(self):
        for reply in [
            {'id': 'other', 'value': {'locked': False, 'accessibility': {'reduceMotion': False, 'reduceTransparency': False}}},
            {'id': 'package-boot-probe', 'value': {'locked': False, 'accessibility': {'reduceMotion': 'false', 'reduceTransparency': False}}},
        ]:
            with self.subTest(reply=reply), patch.object(packager.subprocess, 'run', return_value=subprocess.CompletedProcess([], 0, json.dumps(reply) + '\n', '')):
                with self.assertRaises(ValueError):
                    packager.probe_native_plugin(self.app)

    def test_failed_signature_prevents_executing_native_probe(self):
        with patch.object(packager, 'source_snapshot', return_value={'commit': 'synthetic', 'sourceHash': 'synthetic'}), patch.object(packager.subprocess, 'run', side_effect=[subprocess.CompletedProcess([], 0), subprocess.CalledProcessError(1, ['signature'])]), patch.object(packager, 'probe_native_plugin') as probe:
            with self.assertRaises(subprocess.CalledProcessError):
                packager.package(self.app, self.bun, self.base / 'rejected-package', 'developer')
            probe.assert_not_called()

    def test_register_preserves_existing_entries_and_host_config(self):
        marketplace = self.home / '.agents/plugins/marketplace.json'
        marketplace.parent.mkdir(parents=True)
        other = {'name': 'existing', 'source': {'source': 'local', 'path': './plugins/existing'}, 'custom': True}
        original = {'name': 'my-marketplace', 'plugins': [other], 'extension': {'preserve': True}}
        marketplace.write_text(json.dumps(original))
        config = self.home / '.codex/config.toml'
        config.parent.mkdir()
        config.write_text('hooks_trusted = false\n')
        result = installer.register(self.package, self.home)
        catalog = json.loads(marketplace.read_text())
        self.assertEqual(catalog['plugins'][0], other)
        self.assertEqual(catalog['extension'], original['extension'])
        self.assertEqual(result['marketplace'], 'my-marketplace')
        self.assertFalse(result['activated'])
        self.assertFalse(result['hooksTrusted'])
        self.assertEqual(config.read_text(), 'hooks_trusted = false\n')
        self.assertEqual(json.loads((Path(result['backupPath']) / 'marketplace.json').read_text()), original)
        second = installer.register(self.package, self.home)
        self.assertTrue((Path(second['backupPath']) / 'oracle-desktop/plugin.json').is_file())
        self.assertEqual(len(json.loads(marketplace.read_text())['plugins']), 2)

    def test_tamper_or_extra_file_rejected_before_registration(self):
        (self.package / 'server.mjs').write_text('tampered')
        with self.assertRaises(ValueError):
            installer.register(self.package, self.home)
        self.assertFalse((self.home / '.agents').exists())

    def test_invalid_catalog_preserved(self):
        marketplace = self.home / '.agents/plugins/marketplace.json'
        marketplace.parent.mkdir(parents=True)
        marketplace.write_text('invalid json')
        with self.assertRaises(ValueError):
            installer.register(self.package, self.home)
        self.assertEqual(marketplace.read_text(), 'invalid json')
        self.assertFalse((self.home / 'plugins').exists())

    def test_symlink_destination_escape_rejected(self):
        outside = self.base / 'outside'
        outside.mkdir()
        (self.home / 'plugins').symlink_to(outside, target_is_directory=True)
        with self.assertRaises(ValueError):
            installer.register(self.package, self.home)
        self.assertEqual(list(outside.iterdir()), [])

    def test_catalog_write_failure_rolls_back_runtime(self):
        installer.register(self.package, self.home)
        old = (self.home / 'plugins/oracle-desktop/plugin.json').read_bytes()
        with patch.object(installer, 'atomic_json', side_effect=OSError('synthetic failure')):
            with self.assertRaises(OSError):
                installer.register(self.package, self.home)
        self.assertEqual((self.home / 'plugins/oracle-desktop/plugin.json').read_bytes(), old)
        self.assertTrue((self.home / '.agents/plugins/marketplace.json').is_file())


if __name__ == '__main__':
    unittest.main()
