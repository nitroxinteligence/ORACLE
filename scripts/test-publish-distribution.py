#!/usr/bin/env python3
"""Offline publisher protocol tests: disposable sources/keys; no GitHub writes."""
import base64
import copy
import importlib.util
import unittest
from pathlib import Path
from unittest.mock import patch

import oracle_distribution as dist


def load(name, filename):
    spec = importlib.util.spec_from_file_location(name, Path(__file__).with_name(filename))
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


pub = load('publish_distribution', 'publish-distribution.py')
fixtures = load('distribution_fixtures', 'test-distribution.py')
COMMIT = 'a' * 40


class FakeGitHub:
    def __init__(self, bundle, previous):
        self.bundle, self.previous = bundle, previous
        self.commit, self.draft, self.published = COMMIT, None, False
        self.rows, self.calls, self.uploaded = [], [], []
        self.fail_upload = self.bad_digest = self.move_main = self.bad_readback = False
        self.tree = {'truncated': False, 'tree': [{'path': p, 'sha': h, 'mode': '100644', 'type': 'blob'}
                                                for p, h in bundle['source_blobs'].items()]}
        self.previous_asset = {'id': 1, 'name': pub.MANIFEST, 'state': 'uploaded',
            'size': len(previous), 'digest': 'sha256:' + dist.sha(previous),
            'browser_download_url': pub.DOWNLOAD + 'prior-v3/' + pub.MANIFEST}

    def request(self, route, method='GET', body=None, binary=False, missing=False):
        self.calls.append((method, route))
        if route == 'git/ref/heads/main':
            return {'object': {'sha': self.commit}}
        if route.startswith('git/trees/'):
            return self.tree
        if route.startswith('git/ref/tags/'):
            return {'object': {'sha': COMMIT, 'type': 'commit'}} if self.published else None
        if route == 'releases/latest':
            if self.published and not self.bad_readback:
                return self.draft
            return {'id': 1, 'tag_name': 'prior-v3', 'draft': False, 'prerelease': False}
        if route == 'releases/assets/1':
            return self.previous
        if route == 'releases' and method == 'POST':
            self.draft = dict(body, id=2)
            return self.draft
        if route == 'releases/2' and method == 'PATCH':
            self.published = True
            self.draft.update(body)
            return self.draft
        raise AssertionError('Unexpected fake route: ' + method + ' ' + route)

    def pages(self, route):
        self.calls.append(('GET', route))
        if route == 'releases':
            return [self.draft] if self.draft else []
        if route == 'releases/1/assets':
            return [self.previous_asset]
        if route == 'releases/2/assets':
            return self.rows
        raise AssertionError(route)

    def upload(self, tag, paths):
        self.calls.append(('UPLOAD', tag))
        for path in paths:
            self.uploaded.append(path.name)
            data = path.read_bytes()
            self.rows.append({'name': path.name, 'state': 'uploaded', 'size': len(data),
                'digest': 'sha256:' + ('0' * 64 if self.bad_digest else dist.sha(data)),
                'browser_download_url': pub.DOWNLOAD + tag + '/' + path.name})
            if self.fail_upload:
                raise dist.Refused('Synthetic interrupted upload')
        if self.move_main:
            self.commit = 'b' * 40


class PublisherTests(unittest.TestCase):
    def setUp(self):
        from cryptography.hazmat.primitives import serialization
        from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PrivateKey
        self.fixture = fixtures.DistributionTests()
        self.fixture.setUp()
        self.root = self.fixture.root
        self.key = Ed25519PrivateKey.generate()
        self.trust = {'schema_version': 1, 'algorithm': 'Ed25519', 'keys': [{'id': 'fixture',
            'public_key_base64': base64.b64encode(self.key.public_key().public_bytes(
                serialization.Encoding.Raw, serialization.PublicFormat.Raw)).decode()}]}
        manifest, packages, report = self.fixture.build()
        self.assertEqual(report['problems'], [])
        manifest['sequence'] = 2
        self.artifacts = self.root / 'artifacts'
        self.artifacts.mkdir()
        for name, data in packages.items():
            (self.artifacts / name).write_bytes(data)
        signed = self.sign(manifest)
        (self.artifacts / pub.MANIFEST).write_bytes(signed)
        self.receipt = {'schema_version': 3, 'release_id': manifest['release_id'],
            'manifest_sha256': dist.sha(signed), 'assets': {n: dist.sha(d) for n, d in packages.items()},
            'complete': True, 'published': False}
        (self.artifacts / pub.RECEIPT).write_bytes(dist.canonical(self.receipt))
        self.bundle = pub.inspect_bundle(self.artifacts, self.trust)
        previous = dict(manifest, release_id='prior-v3', sequence=1)
        self.github = FakeGitHub(self.bundle, self.sign(previous))

    def tearDown(self):
        self.fixture.tearDown()

    def sign(self, manifest):
        payload = dist.canonical(manifest)
        return dist.canonical({'schema_version': 3, 'key_id': 'fixture',
            'payload_base64': base64.b64encode(payload).decode(),
            'signature_base64': base64.b64encode(self.key.sign(dist.DOMAIN + payload)).decode()})

    def publish(self, execute=False, resume=None, effects=None):
        return pub.publish(self.bundle, self.artifacts, COMMIT, 'Synthetic release notes', self.trust,
                           self.github, execute, resume, effects)

    def assert_no_publication(self):
        self.assertFalse(self.github.published)
        self.assertNotIn(('PATCH', 'releases/2'), self.github.calls)

    def test_default_preflight_is_read_only(self):
        result = self.publish()
        self.assertEqual(result['status'], 'preflight-only')
        self.assertFalse(result['published'])
        self.assertTrue(all(method == 'GET' for method, _ in self.github.calls))

    def test_complete_draft_becomes_latest_only_after_verified_uploads(self):
        result = self.publish(execute=True)
        self.assertEqual(result['status'], 'published-verified')
        self.assertEqual(set(self.github.uploaded), set(self.bundle['assets']))
        self.assertNotIn(pub.RECEIPT, self.github.uploaded)
        methods = [method for method, _ in self.github.calls]
        self.assertLess(methods.index('POST'), methods.index('UPLOAD'))
        self.assertLess(methods.index('UPLOAD'), methods.index('PATCH'))

    def test_failed_upload_retains_draft_and_explicit_resume_uploads_only_missing(self):
        self.github.fail_upload = True
        effects = {}
        with self.assertRaises(dist.Refused):
            self.publish(execute=True, effects=effects)
        self.assertEqual(effects['draft_id'], 2)
        self.assert_no_publication()
        with self.assertRaises(dist.Refused):
            self.publish(execute=True)
        self.github.fail_upload = False
        self.assertTrue(self.publish(execute=True, resume=2)['published'])
        self.assertEqual(len(self.github.uploaded), len(set(self.github.uploaded)))

    def test_corrupted_remote_asset_never_promotes_draft(self):
        self.github.bad_digest = True
        with self.assertRaises(dist.Refused):
            self.publish(execute=True)
        self.assert_no_publication()

    def test_source_push_alone_or_truncated_tree_is_not_release_delivery(self):
        original = copy.deepcopy(self.github.tree)
        for change in ('digest', 'extra', 'truncated'):
            self.github.tree = copy.deepcopy(original)
            if change == 'digest':
                self.github.tree['tree'][0]['sha'] = '0' * 40
            elif change == 'extra':
                self.github.tree['tree'].append({'path': 'SISTEMA/skills/new/SKILL.md', 'sha': '0' * 40, 'type': 'blob', 'mode': '100644'})
            else:
                self.github.tree['truncated'] = True
            with self.subTest(change=change), self.assertRaises(dist.Refused):
                self.publish(execute=True)
            self.assertIsNone(self.github.draft)

    def test_equal_signed_sequence_is_refused(self):
        self.github.previous = self.sign(dict(self.bundle['manifest'], release_id='prior-v3', sequence=2))
        self.github.previous_asset.update(size=len(self.github.previous), digest='sha256:' + dist.sha(self.github.previous))
        with self.assertRaises(dist.Refused):
            self.publish(execute=True)
        self.assertIsNone(self.github.draft)

    def test_new_main_during_upload_retains_unpublished_draft(self):
        self.github.move_main = True
        with self.assertRaises(dist.Refused):
            self.publish(execute=True)
        self.assert_no_publication()

    def test_failed_readback_marks_publication_attempt_unknown(self):
        self.github.bad_readback = True
        effects = {}
        with self.assertRaises(dist.Refused):
            self.publish(execute=True, effects=effects)
        self.assertTrue(effects['publication_attempted'])
        self.assertTrue(self.github.published)

    def test_signature_and_trust_fail_closed(self):
        data = (self.artifacts / pub.MANIFEST).read_bytes()
        envelope = dist.decode(data)
        envelope['signature_base64'] = base64.b64encode(b'0' * 64).decode()
        with self.assertRaises(dist.Refused):
            pub.verify_manifest(dist.canonical(envelope), self.trust)
        with self.assertRaises(dist.Refused):
            pub.verify_manifest(data, dict(self.trust, keys=[]))

    def test_missing_receipt_and_changed_package_are_refused(self):
        receipt_path = self.artifacts / pub.RECEIPT
        receipt_path.unlink()
        with self.assertRaises(FileNotFoundError):
            pub.inspect_bundle(self.artifacts, self.trust)
        receipt_path.write_bytes(dist.canonical(self.receipt))
        name = next(n for n in self.bundle['assets'] if n != pub.MANIFEST)
        (self.artifacts / name).write_bytes(b'changed package')
        with self.assertRaises(dist.Refused):
            pub.inspect_bundle(self.artifacts, self.trust)

    def test_private_review_cannot_be_an_upload_asset(self):
        (self.artifacts / 'review.json').write_text('Synthetic private review')
        with self.assertRaises(dist.Refused):
            pub.inspect_bundle(self.artifacts, self.trust)

    def test_signed_but_incomplete_item_inventory_is_refused(self):
        manifest = copy.deepcopy(self.bundle['manifest'])
        manifest['items'] = [i for i in manifest['items'] if i['kind'] != 'skill']
        signed = self.sign(manifest)
        (self.artifacts / pub.MANIFEST).write_bytes(signed)
        (self.artifacts / pub.RECEIPT).write_bytes(dist.canonical(dict(self.receipt, manifest_sha256=dist.sha(signed))))
        with self.assertRaises(dist.Refused):
            pub.inspect_bundle(self.artifacts, self.trust)

    def test_reviewed_nested_contract_survives_packaging_and_requires_new_oracle(self):
        path, data, review = self.fixture.nested_fixture()
        review['items'][path] = {'entry_role': 'skill', 'source_sha256': dist.sha(data),
            'license_reviewed': True, 'dependencies_reviewed': True, 'reason': 'Synthetic phase skill'}
        manifest, packages, report = self.fixture.build(review)
        self.assertEqual(report['problems'], [])
        directory = self.root / 'nested-artifacts'
        directory.mkdir()
        for name, data in packages.items():
            (directory / name).write_bytes(data)
        def write(candidate):
            signed = self.sign(candidate)
            (directory / pub.MANIFEST).write_bytes(signed)
            (directory / pub.RECEIPT).write_bytes(dist.canonical({'schema_version': 3,
                'release_id': candidate['release_id'], 'manifest_sha256': dist.sha(signed),
                'assets': {n: dist.sha(d) for n, d in packages.items()}, 'complete': True, 'published': False}))
        write(manifest)
        self.assertEqual(pub.inspect_bundle(directory, self.trust)['manifest']['minimum_oracle'], '0.3.14')
        write(dict(manifest, minimum_oracle='0.3.13'))
        with self.assertRaises(dist.Refused):
            pub.inspect_bundle(directory, self.trust)
        del next(i for i in manifest['items'] if i['entry'] == path)['entry_layout']
        write(manifest)
        with self.assertRaises(dist.Refused):
            pub.inspect_bundle(directory, self.trust)

    def test_cli_omitting_execute_never_writes_to_github(self):
        trust = self.root / 'public-trust.json'
        trust.write_bytes(dist.canonical(self.trust))
        notes = self.root / 'notes.md'
        notes.write_text('Synthetic reviewed release notes')
        with patch.object(pub, 'TRUST', trust), patch.object(pub, 'GitHub', return_value=self.github):
            result = pub.main(['--artifacts', str(self.artifacts), '--staging', str(self.root / 'cli-stage'),
                              '--source-commit', COMMIT, '--notes', str(notes)])
        self.assertEqual(result, 0)
        self.assertTrue(all(method == 'GET' for method, _ in self.github.calls))

    def test_atomic_staging_copies_only_verified_assets_and_never_overwrites(self):
        (self.artifacts / 'snapshot-receipt.json').write_text('{}')
        destination = self.root / 'staging'
        result = pub.stage_bundle(self.artifacts, destination, self.trust)
        self.assertEqual(result, self.bundle)
        self.assertEqual(set(p.name for p in destination.iterdir()), set(self.bundle['assets']) | {pub.RECEIPT})
        with self.assertRaises(dist.Refused):
            pub.stage_bundle(self.artifacts, destination, self.trust)

    def test_incomplete_staging_is_never_visible_at_final_path(self):
        destination = self.root / 'staging'
        with patch.object(pub, 'inspect_bundle', side_effect=[self.bundle, dist.Refused('Synthetic staging failure')]), self.assertRaises(dist.Refused):
            pub.stage_bundle(self.artifacts, destination, self.trust)
        self.assertFalse(destination.exists())

    def test_linked_assets_are_not_read(self):
        original = self.artifacts / pub.RECEIPT
        elsewhere = self.root / 'receipt-original'
        original.rename(elsewhere)
        original.symlink_to(elsewhere)
        with self.assertRaises(dist.Refused):
            pub.inspect_bundle(self.artifacts, self.trust)

    def test_encoded_package_budget_exceeds_source_file_budget(self):
        path = self.root / 'encoded.json'
        path.write_bytes(b' ' * 33_000_000)
        self.assertEqual(len(pub.read_bounded(path, 44_000_000)), 33_000_000)
        with self.assertRaises(dist.Refused):
            pub.read_bounded(path, 32_000_000)


if __name__ == '__main__':
    unittest.main(verbosity=2)
