#!/usr/bin/env python3
"""Synthetic offline tests for publication v3. Never reads the personal OS."""
import base64
import copy
import importlib.util
import json
import os
from pathlib import Path
import stat
import tempfile
import unittest
from unittest.mock import patch

import oracle_distribution as dist

ROOT = Path(__file__).resolve().parent.parent


class DistributionTests(unittest.TestCase):
    def setUp(self):
        directory = ROOT / '.work/onboarding-v2/publisher-tests'
        directory.mkdir(parents=True, exist_ok=True)
        self.temp = tempfile.TemporaryDirectory(dir=directory)
        self.root = Path(self.temp.name)
        self.source = self.root / 'source'
        self.inputs = {
            'SISTEMA/skills/research/example/SKILL.md': b'---\nname: example\ndescription: Synthetic test skill.\n---\n# Example\n[Reference](references/ref.md)\n',
            'SISTEMA/skills/research/example/references/ref.md': b'# Fixture\n',
            'SISTEMA/skills/research/example/task.mjs': b'// Fixture, never executed\n',
            'SISTEMA/skills/research/example/LICENSE': b'MIT synthetic fixture\n',
            'SISTEMA/prompts/Hello.md': b'# Hello\n',
            'SISTEMA/tutoriais/Guide.md': b'# Guide\n'}
        for path, data in self.inputs.items():
            target = self.source / path
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_bytes(data)
        hashes = {path: dist.sha(data) for path, data in self.inputs.items()}
        self.review = {'content_reviewed': True, 'source_inventory_sha256': dist.sha(dist.canonical(hashes)),
                       'licenses': [{'path': 'SISTEMA/skills/research/example/LICENSE', 'spdx': 'MIT'}],
                       'items': {path.replace('SISTEMA/tutoriais/', 'SISTEMA/Tutoriais/'): {'license_reviewed': True, 'dependencies_reviewed': True, 'dependencies': []}
                                 for path in self.inputs if path.endswith('/SKILL.md') or path.startswith(('SISTEMA/prompts/', 'SISTEMA/tutoriais/'))}}

    def tearDown(self):
        self.temp.cleanup()

    def build(self, review=None):
        path = 'sources/gbrain/' + dist.PIN + '/LICENSE'
        rows = [{'path': path, 'source_path': 'LICENSE', 'kind': 'gbrain-source', 'size': 7, 'mode': 0o644, 'source_sha256': dist.sha(b'fixture')}]
        with patch.object(dist, 'source_snapshot', return_value=(rows, {path: b'fixture'})):
            return dist.build(self.source, 'fixture-v3', 1, self.review if review is None else review, self.root,
                              'https://github.com/nitroxinteligence/ORACLE-SKILLS/releases/download/fixture-v3')

    def test_structured_skills_include_resources_without_discovering_templates(self):
        import shutil
        old=self.source/'SISTEMA/skills/research'
        new=self.source/'SISTEMA/skills/oferta/alex-hormozi'
        new.parent.mkdir(parents=True)
        shutil.move(str(old),str(new))
        resource=self.source/'SISTEMA/recursos-skills/example/template/SKILL.md'
        resource.parent.mkdir(parents=True);resource.write_text('Example source template, not a discoverable skill')
        inv=dist.inventory(self.source)
        review={**self.review,'skills_layout':'department-specialist-skill'}
        review['source_inventory_sha256']=dist.sha(dist.canonical({r['source_path']:dist.sha((self.source/r['source_path']).read_bytes()) for r in inv['files']}))
        review['items']={k.replace('skills/research/','skills/oferta/alex-hormozi/'):v for k,v in review['items'].items()}
        manifest,_,report=self.build(review)
        self.assertEqual(report['problems'],[])
        skills=[i for i in manifest['items'] if i['kind']=='skill']
        self.assertEqual(len(skills),1)
        self.assertEqual(skills[0]['specialist_id'],'alex-hormozi')
        self.assertEqual(skills[0]['department_id'],'oferta')
        self.assertEqual(manifest['minimum_oracle'],'0.3.3')
        self.assertTrue(any(r['path'].startswith('SISTEMA/recursos-skills/') for r in manifest['files']))

    def test_complete_signed_snapshot_preserves_resources_and_source(self):
        manifest, packages, report = self.build()
        self.assertEqual(report['problems'], [])
        self.assertEqual(len(manifest['files']), 7)
        self.assertEqual({item['kind'] for item in manifest['items']}, {'skill', 'prompt', 'tutorial'})
        self.assertIn('gbrain-source', manifest['counts'])
        all_files = {row['path']: base64.b64decode(row['content_base64']) for data in packages.values() for row in json.loads(data)['files']}
        self.assertEqual(all_files['SISTEMA/skills/research/example/task.mjs'], self.inputs['SISTEMA/skills/research/example/task.mjs'])
        skill = manifest['items'][0]
        skill = next(item for item in manifest['items'] if item['kind'] == 'skill')
        self.assertIn(('name: ' + skill['host_name']).encode(), all_files[skill['entry']])
        self.assertEqual((self.source / skill['entry']).read_bytes(), self.inputs[skill['entry']])
        self.assertEqual(len(report['adaptations']), 1)
        from cryptography.hazmat.primitives import serialization
        from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PrivateKey
        key = Ed25519PrivateKey.generate()
        path = self.root / 'signing.pem'
        path.write_bytes(key.private_bytes(serialization.Encoding.PEM, serialization.PrivateFormat.PKCS8, serialization.NoEncryption()))
        path.chmod(0o600)
        envelope = json.loads(dist.sign_manifest(manifest, path, 'fixture'))
        payload = base64.b64decode(envelope['payload_base64'])
        key.public_key().verify(base64.b64decode(envelope['signature_base64']), dist.DOMAIN + payload)
        self.assertEqual(payload, dist.canonical(manifest))
        from cryptography.exceptions import InvalidSignature
        with self.assertRaises(InvalidSignature):
            key.public_key().verify(base64.b64decode(envelope['signature_base64']), dist.DOMAIN + payload + b' ')

    def nested_fixture(self):
        import shutil
        target = self.source / 'SISTEMA/skills/codigo/example'
        target.parent.mkdir(parents=True)
        shutil.move(str(self.source / 'SISTEMA/skills/research'), str(target))
        path = 'SISTEMA/skills/codigo/matt-pocock/01-getting-started/ask-matt/SKILL.md'
        data = b'---\nname: ask-matt\ndescription: Synthetic phase entry.\n---\n# Fixture\n'
        (self.source / path).parent.mkdir(parents=True)
        (self.source / path).write_bytes(data)
        review = copy.deepcopy(self.review)
        review['skills_layout'] = 'department-specialist-skill'
        review['items'] = {p.replace('skills/research/', 'skills/codigo/example/'): v for p, v in review['items'].items()}
        review['source_inventory_sha256'] = dist.sha(dist.canonical({r['source_path']: dist.sha((self.source / r['source_path']).read_bytes()) for r in dist.inventory(self.source)['files']}))
        return path, data, review

    def test_unclassified_phase_entry_cannot_silently_disappear(self):
        path, _, review = self.nested_fixture()
        manifest, _, report = self.build(review)
        self.assertIsNone(manifest)
        self.assertIn({'path': path, 'code': 'skill_entry_classification_required'}, report['problems'])

    def test_explicit_nested_skill_preserves_path_and_requires_new_runtime(self):
        path, data, review = self.nested_fixture()
        review['items'][path] = {'entry_role': 'skill', 'source_sha256': dist.sha(data),
            'license_reviewed': True, 'dependencies_reviewed': True, 'reason': 'Synthetic standalone skill within a phase'}
        manifest, _, report = self.build(review)
        self.assertEqual(report['problems'], [])
        nested = next(i for i in manifest['items'] if i['entry'] == path)
        self.assertEqual(nested['entry_layout'], 'reviewed-nested')
        self.assertEqual(nested['specialist_id'], 'matt-pocock')
        self.assertEqual(nested['department_id'], 'code')
        self.assertEqual(manifest['minimum_oracle'], '0.3.14')
        self.assertEqual((self.source / path).read_bytes(), data)
        self.assertEqual(nested['required_files'], [path])

    def test_nested_review_requires_exact_hash_and_each_approval(self):
        path, data, review = self.nested_fixture()
        valid = {'entry_role': 'skill', 'source_sha256': dist.sha(data),
            'license_reviewed': True, 'dependencies_reviewed': True, 'reason': 'Synthetic reviewed skill'}
        for key, value in [('source_sha256', '0' * 64), ('license_reviewed', False), ('dependencies_reviewed', False), ('reason', '')]:
            review['items'][path] = dict(valid, **{key: value})
            manifest, _, report = self.build(review)
            with self.subTest(key=key):
                self.assertIsNone(manifest)
                self.assertIn({'path': path, 'code': 'nested_skill_review_required'}, report['problems'])

    def test_nested_entry_cannot_claim_resources_outside_its_directory(self):
        path, data, review = self.nested_fixture()
        review['items'][path] = {'entry_role': 'skill', 'source_sha256': dist.sha(data),
            'license_reviewed': True, 'dependencies_reviewed': True, 'reason': 'Synthetic reviewed skill',
            'required_files': ['SISTEMA/prompts/Hello.md']}
        with self.assertRaises(dist.Refused):
            self.build(review)

    def test_structured_review_draft_classifies_no_nested_candidate_automatically(self):
        path, _, _ = self.nested_fixture()
        template = self.source / 'SISTEMA/skills/codigo/example/example/templates/SKILL.md'
        template.parent.mkdir(parents=True)
        template.write_text('Synthetic template resource')
        shared = self.source / 'SISTEMA/recursos-skills/templates/SKILL.md'
        shared.parent.mkdir(parents=True)
        shared.write_text('Synthetic shared resource')
        spec = importlib.util.spec_from_file_location('review_distribution', ROOT / 'scripts/review-distribution.py')
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        report, _ = module.prepare(self.source, 'department-specialist-skill')
        self.assertEqual(report['skills_layout'], 'department-specialist-skill')
        self.assertEqual(report['items'][path]['entry_role'], 'unclassified')
        self.assertFalse(report['items'][path]['license_reviewed'])
        self.assertFalse(report['items'][path]['dependencies_reviewed'])
        self.assertFalse(report['content_reviewed'])
        self.assertNotIn(template.relative_to(self.source).as_posix(), report['items'])
        self.assertNotIn(shared.relative_to(self.source).as_posix(), report['items'])

    def test_explicit_resource_classification_is_bound_to_reviewed_bytes(self):
        path, data, review = self.nested_fixture()
        review['items'][path] = {'entry_role': 'resource', 'source_sha256': dist.sha(data),
            'license_reviewed': True, 'dependencies_reviewed': True, 'reason': 'Synthetic reference template, not an entry'}
        manifest, _, report = self.build(review)
        self.assertEqual(report['problems'], [])
        self.assertIn(path, [r['path'] for r in manifest['files']])
        self.assertNotIn(path, [r['entry'] for r in manifest['items']])
        review['items'][path]['source_sha256'] = '0' * 64
        self.assertIsNone(self.build(review)[0])

    def test_owned_nested_template_is_not_promoted_to_entry(self):
        path, data, review = self.nested_fixture()
        (self.source / path).unlink()
        template = 'SISTEMA/skills/codigo/example/example/templates/SKILL.md'
        (self.source / template).parent.mkdir(parents=True)
        (self.source / template).write_bytes(b'Not a skill; synthetic nested template.\n')
        review['source_inventory_sha256'] = dist.sha(dist.canonical({r['source_path']: dist.sha((self.source / r['source_path']).read_bytes()) for r in dist.inventory(self.source)['files']}))
        manifest, _, report = self.build(review)
        self.assertEqual(report['problems'], [])
        self.assertEqual(len([r for r in manifest['items'] if r['kind'] == 'skill']), 1)
        self.assertIn(template, [r['path'] for r in manifest['files']])

    def test_empty_library_never_certifies_complete(self):
        (self.source / 'SISTEMA/prompts/Hello.md').unlink()
        manifest, _, report = self.build()
        self.assertIsNone(manifest)
        self.assertTrue(any(p['code'] == 'empty_required_library' for p in report['problems']))

    def test_secret_and_absolute_paths_report_without_echoing_values(self):
        path = self.source / 'SISTEMA/prompts/Hello.md'
        path.write_bytes(b'-----BEGIN PRIVATE KEY-----\nprivate fixture\n')
        manifest, _, report = self.build()
        self.assertIsNone(manifest)
        self.assertTrue(any(p['code'] == 'credential_pattern' for p in report['problems']))
        self.assertNotIn('private fixture', json.dumps(report))
        path.write_bytes(b'Use /Users/operator/private/file.txt\n')
        self.assertTrue(any(p['code'] == 'machine_absolute_path' for p in self.build()[2]['problems']))

    def test_missing_relative_asset_blocks_publication(self):
        (self.source / 'SISTEMA/skills/research/example/references/ref.md').unlink()
        manifest, _, report = self.build()
        self.assertIsNone(manifest)
        self.assertTrue(any(p['code'] == 'missing_relative_reference' for p in report['problems']))

    def test_unreviewed_source_cannot_be_signed(self):
        self.assertIsNone(self.build(review={})[0])
        changed = dict(self.review, source_inventory_sha256='0' * 64)
        self.assertTrue(any(p['code'] == 'exact_content_review_required' for p in self.build(changed)[2]['problems']))

    def test_symlink_hardlink_and_directory_collisions_are_visible(self):
        path = self.source / 'SISTEMA/prompts/link.md'
        path.symlink_to(self.source / 'SISTEMA/prompts/Hello.md')
        self.assertFalse(dist.inventory(self.source)['complete'])
        path.unlink()
        os.link(self.source / 'SISTEMA/prompts/Hello.md', path)
        self.assertTrue(any(p['code'] == 'nonregular_or_linked' for p in dist.inventory(self.source)['problems']))

    def test_dataless_files_are_not_read(self):
        original = Path.lstat
        class Info:
            def __init__(self, value):
                self.value, self.st_flags = value, 0x40000000
            def __getattr__(self, name):
                return getattr(self.value, name)
        def flagged(path, *args, **kwargs):
            value = original(path, *args, **kwargs)
            return Info(value) if path.name == 'SKILL.md' else value
        with patch.object(Path, 'lstat', flagged), patch.object(dist, 'read_stable', side_effect=AssertionError('must not hydrate')):
            manifest, _, report = self.build()
        self.assertIsNone(manifest)
        self.assertTrue(any(p['code'] == 'dataless' for p in report['problems']))

    def test_package_count_and_expansion_bounds(self):
        rows, blobs = [], {}
        for index in range(2050):
            path = f'SISTEMA/prompts/{index}.md'
            blobs[path] = b'x'
            rows.append({'path': path, 'kind': 'prompts', 'size': 1, 'sha256': dist.sha(b'x'), 'mode': 0o644})
        packages, _ = dist.make_packages(rows, blobs, 'fixture', 'https://github.com/fixture')
        self.assertEqual([len(p['files']) for p in packages], [1000, 1000, 50])
        self.assertEqual(sum(p['expanded_bytes'] for p in packages), 2050)

    def test_source_changed_after_read_blocks_snapshot(self):
        original = dist.read_stable
        def changing(path, info=None):
            data = original(path, info)
            if path.name == 'Guide.md':
                (self.source / 'SISTEMA/prompts/late.md').write_text('# Added during read')
            return data
        with patch.object(dist, 'read_stable', changing), self.assertRaises(dist.Refused):
            self.build()

    def test_machine_path_unsafe_frontmatter_and_duplicate_id(self):
        path = self.source / 'SISTEMA/skills/research/example/SKILL.md'
        path.write_text('---\nname: "invalid name"\ndescription: bad\n---\n')
        self.assertTrue(any(p['code'] == 'invalid_skill_frontmatter' for p in self.build()[2]['problems']))
        for value in ['../escape', '/absolute', 'SISTEMA//file.md', 'SISTEMA/a\\b', 'SISTEMA/a\n']:
            with self.assertRaises(dist.Refused):
                dist.safe_path(value)

    def test_yaml_metadata_is_bounded_and_name_is_portable(self):
        _, name = dist.frontmatter(b'---\nname: "example"\ndescription: >\n  Valid multiline description.\n---\n')
        self.assertEqual(name, 'example')
        for metadata in [b'name: a\nname: b\ndescription: okay', b'name: &x a\ndescription: *x', b'name: >\n  example\ndescription: okay']:
            with self.assertRaises(dist.Refused):
                dist.frontmatter(b'---\n' + metadata + b'\n---\n')

    def test_reviewed_snapshot_matches_packages_and_excludes_upstream(self):
        manifest, packages, _ = self.build()
        output = self.root / 'reviewed'
        receipt = dist.write_reviewed_snapshot(manifest, packages, output)
        self.assertTrue(receipt['complete'])
        self.assertEqual(len(receipt['files']), 6)
        self.assertTrue((output / 'SISTEMA/Tutoriais/Guide.md').is_file())
        self.assertFalse((output / 'sources').exists())
        with self.assertRaises(dist.Refused):
            dist.write_reviewed_snapshot(manifest, packages, output)

    def test_metadata_exclusion_is_explicit_and_cannot_hide_content(self):
        path = self.source / 'SISTEMA/prompts/.DS_Store'
        path.write_bytes(b'fixture metadata')
        review = dict(self.review, exclusions=[{'path':'SISTEMA/prompts/.DS_Store', 'metadata_only':True, 'size':16, 'reason':'Finder metadata'}])
        manifest, _, report = self.build(review)
        self.assertIsNotNone(manifest)
        self.assertEqual(len(report['resolved_exclusions']),1)
        self.assertTrue(any(row['source_path'].endswith('.DS_Store') for row in report['inventory']['files']))
        review['exclusions'][0]['path']='SISTEMA/prompts/Hello.md'
        with self.assertRaises(dist.Refused):
            self.build(review)

    def adapted_review(self, before='Hello', after='Portable'):
        path = 'SISTEMA/prompts/Hello.md'
        data = self.inputs[path]
        review = copy.deepcopy(self.review)
        review['file_adaptations'] = [{'path': path, 'source_sha256': dist.sha(data),
            'result_sha256': dist.sha(data.decode().replace(before, after).encode()),
            'reason': 'Reviewed fixture text correction',
            'replacements': [{'before': before, 'after': after, 'count': data.decode().count(before)}]}]
        return review

    def test_reviewed_adaptation_changes_package_only_and_records_digests(self):
        manifest, packages, report = self.build(self.adapted_review())
        self.assertIsNotNone(manifest)
        path = 'SISTEMA/prompts/Hello.md'
        records = {row['path']: row for data in packages.values() for row in dist.decode(data)['files']}
        self.assertEqual(base64.b64decode(records[path]['content_base64']), b'# Portable\n')
        self.assertEqual((self.source / path).read_bytes(), self.inputs[path])
        provenance = next(row for row in report['adaptations'] if row['field'] == 'content')
        self.assertEqual(provenance['result_sha256'], records[path]['sha256'])
        self.assertNotIn('replacements', provenance)

    def test_adaptation_refuses_stale_input_result_count_and_duplicate_path(self):
        for field, value in [('source_sha256', '0' * 64), ('result_sha256', '0' * 64), ('count', 99)]:
            review = self.adapted_review()
            edit = review['file_adaptations'][0]
            (edit['replacements'][0] if field == 'count' else edit)[field] = value
            with self.subTest(field=field), self.assertRaises(dist.Refused):
                self.build(review)
        review = self.adapted_review()
        review['file_adaptations'] *= 2
        with self.assertRaises(dist.Refused):
            self.build(review)

    def test_adapted_content_still_passes_through_secret_and_link_audit(self):
        for content, code in [('ghp_' + 'A' * 40, 'credential_pattern'), ('[Missing](missing.md)', 'missing_relative_reference')]:
            manifest, _, report = self.build(self.adapted_review(after=content))
            self.assertIsNone(manifest)
            self.assertIn(code, [row['code'] for row in report['problems']])
            self.assertEqual(len(report['items']), 3)

    def test_secret_finding_does_not_hide_unreviewed_item(self):
        path = self.source / 'SISTEMA/prompts/Hello.md'
        path.write_text('# Example\nghp_' + 'A' * 40)
        _, _, report = self.build({})
        self.assertEqual(len(report['items']), 3)
        self.assertTrue(any(row['path'] == 'SISTEMA/prompts/Hello.md' and row['code'] == 'item_license_or_dependencies_unreviewed' for row in report['problems']))

    def test_review_draft_keeps_approval_false_and_scopes_license_evidence(self):
        spec = importlib.util.spec_from_file_location('review_distribution', ROOT / 'scripts/review-distribution.py')
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        nested = self.source / 'SISTEMA/skills/research/example/vendor'
        nested.mkdir()
        (nested / 'LICENSE').write_text('Different vendor license')
        (nested / 'code.py').write_text('pass\n')
        (self.source / 'SISTEMA/skills/research/example/package.json').write_text('{"dependencies":{"example":"1.0.0"}}')
        report, summary = module.prepare(self.source)
        self.assertFalse(report['content_reviewed'])
        self.assertFalse(report['published'])
        self.assertEqual(report['licenses'], [])
        self.assertEqual(summary['items'], 3)
        prompt = report['items']['SISTEMA/prompts/Hello.md']
        self.assertEqual(prompt['license_candidates'], [])
        for item in report['items'].values():
            self.assertFalse(item['license_reviewed'])
            self.assertFalse(item['dependencies_reviewed'])
        candidates = report['file_license_candidates']['SISTEMA/skills/research/example/vendor/code.py']
        self.assertEqual([row['path'] for row in candidates], ['SISTEMA/skills/research/example/vendor/LICENSE'])
        self.assertEqual(len(report['items']['SISTEMA/skills/research/example/SKILL.md']['dependency_manifests']), 1)

    def test_exact_example_review_expires_on_any_file_change(self):
        from catalog_safety import check_publication_bytes, publication_rule_counts
        data = b'# Documented example\nAKIAIOSFODNN7EXAMPLE\n'
        evidence = {'classification':'documented-public-example', 'reason':'Published AWS documentation example', 'rule_counts':publication_rule_counts(data)}
        reviews = {dist.sha(data):evidence}
        check_publication_bytes('example.md',data,reviews)
        for changed in [data+b'changed',data+b'ghp_'+b'A'*40]:
            with self.assertRaises(ValueError):
                check_publication_bytes('example.md',changed,reviews)
        with self.assertRaises(ValueError):
            check_publication_bytes('example.md',data,{dist.sha(data):{**evidence,'rule_counts':{}}})

    def test_full_private_key_cannot_be_approved_as_example(self):
        from catalog_safety import check_publication_bytes, publication_rule_counts
        from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PrivateKey
        from cryptography.hazmat.primitives import serialization
        data=Ed25519PrivateKey.generate().private_bytes(serialization.Encoding.PEM,serialization.PrivateFormat.PKCS8,serialization.NoEncryption())
        evidence={'classification':'nonfunctional-test-fixture','reason':'Invalid attempted approval','rule_counts':publication_rule_counts(data)}
        with self.assertRaises(ValueError):
            check_publication_bytes('key.txt',data,{dist.sha(data):evidence})

    def test_machine_path_review_is_bound_to_file_bytes(self):
        path='SISTEMA/prompts/Hello.md';data=b'# Documented test fixture\n/home/testuser/example\n'
        (self.source/path).write_bytes(data)
        review=copy.deepcopy(self.review)
        review['machine_path_reviews']={path:{'sha256':dist.sha(data),'classification':'test-fixture','reason':'Synthetic test path; not a runtime dependency'}}
        _,_,report=self.build(review)
        self.assertNotIn('machine_absolute_path',[p['code'] for p in report['problems']])
        self.assertIn(path,report['machine_path_reviews'])
        (self.source/path).write_bytes(data+b'Changed\n')
        _,_,report=self.build(review)
        self.assertIn('machine_absolute_path',[p['code'] for p in report['problems']])

    def test_explicit_license_supplement_is_in_complete_inventory(self):
        review=copy.deepcopy(self.review);data=b'Author permits distribution of original contributions.\n'
        review['supplemental_files']=[{'path':'SISTEMA/prompts/ORACLE-LICENSE.txt','purpose':'author-license',
            'reason':'Explicit author distribution permission','sha256':dist.sha(data),'content_base64':base64.b64encode(data).decode()}]
        manifest,packages,report=self.build(review)
        self.assertIsNotNone(manifest)
        self.assertEqual(manifest['counts']['prompts']['files'],2)
        self.assertEqual(manifest['counts']['prompts']['items'],1)
        self.assertEqual(len(report['supplemental_files']),1)
        self.assertFalse((self.source/'SISTEMA/prompts/ORACLE-LICENSE.txt').exists())
        for path in ['../../outside.txt','SISTEMA/private/LICENSE.txt','SISTEMA/prompts/Hello.md']:
            review['supplemental_files'][0]['path']=path
            with self.assertRaises(dist.Refused):self.build(review)

    def test_preserved_template_must_match_original_bytes(self):
        review=copy.deepcopy(self.review);original='SISTEMA/skills/research/example/SKILL.md';data=self.inputs[original]
        review['supplemental_files']=[{'path':'SISTEMA/skills/research/example/SKILL.upstream-template.md',
            'purpose':'preserved-upstream-template','reason':'Retain upstream template in full','original_path':original,
            'sha256':dist.sha(data),'content_base64':base64.b64encode(data).decode()}]
        manifest,_,_=self.build(review);self.assertIsNotNone(manifest)
        review['supplemental_files'][0]['original_path']='SISTEMA/prompts/Hello.md'
        with self.assertRaises(dist.Refused):self.build(review)


if __name__ == '__main__':
    unittest.main(verbosity=2)
