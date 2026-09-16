#!/usr/bin/env python3
"""Verify and stage an Oracle catalog release; GitHub writes require --execute.

Consumes only the signed builder output, public trust keys and reviewed release
notes. Never reads a signing key, executes source, commits, pushes or installs.
"""
import argparse
import base64
import hashlib
import importlib.util
import json
import os
from pathlib import Path
import re
import stat
import subprocess
import sys
import uuid

import oracle_distribution as dist

REPOSITORY = 'nitroxinteligence/ORACLE-SKILLS'
MANIFEST = 'oracle-distribution.json'
RECEIPT = 'release-receipt.json'
DOWNLOAD = 'https://github.com/' + REPOSITORY + '/releases/download/'
LIBRARIES = ('SISTEMA/skills/', 'SISTEMA/recursos-skills/', 'SISTEMA/prompts/', 'SISTEMA/Tutoriais/')
TRUST = Path(__file__).resolve().parent.parent / 'Resources/updates/distribution-keys.json'
require = dist.require


def read_bounded(path, limit):
    """Assets may be 44 MB encoded; dist.read_stable's source limit is 32 MB."""
    parent = dist.directory_fd(path.parent)
    try:
        before = os.stat(path.name, dir_fd=parent, follow_symlinks=False)
        require(stat.S_ISREG(before.st_mode) and before.st_nlink == 1
                and not getattr(before, 'st_flags', 0) & 0x40000000
                and before.st_size <= limit, 'Invalid, linked, dataless or oversized asset')
        fd = os.open(path.name, os.O_RDONLY | os.O_NOFOLLOW | os.O_NONBLOCK, dir_fd=parent)
        with os.fdopen(fd, 'rb') as stream:
            require(dist.stamp(os.fstat(stream.fileno())) == dist.stamp(before), 'Asset changed before read')
            data = stream.read(limit + 1)
            require(dist.stamp(os.fstat(stream.fileno())) == dist.stamp(before), 'Asset changed during read')
        require(len(data) == before.st_size and dist.stamp(os.stat(path.name, dir_fd=parent, follow_symlinks=False)) == dist.stamp(before), 'Asset replaced during read')
        return data
    finally:
        os.close(parent)


def verify_manifest(data, trust):
    from cryptography.exceptions import InvalidSignature
    from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PublicKey
    require(len(data) <= 24_000_000, 'Manifest exceeds Oracle download budget')
    envelope = dist.decode(data)
    require(envelope.get('schema_version') == 3 and trust.get('schema_version') == 1
            and trust.get('algorithm') == 'Ed25519', 'Unsupported distribution signature')
    keys = [k for k in trust['keys'] if k.get('id') == envelope.get('key_id')]
    require(len(keys) == 1, 'Signing key is not uniquely trusted by Oracle')
    payload = base64.b64decode(envelope['payload_base64'], validate=True)
    signature = base64.b64decode(envelope['signature_base64'], validate=True)
    require(len(payload) <= 16_000_000 and len(signature) == 64, 'Invalid signature envelope')
    try:
        Ed25519PublicKey.from_public_bytes(base64.b64decode(keys[0]['public_key_base64'], validate=True)).verify(signature, dist.DOMAIN + payload)
    except InvalidSignature:
        raise dist.Refused('Invalid distribution signature') from None
    manifest = dist.decode(payload)
    require(dist.canonical(manifest) == payload and manifest.get('schema_version') == 3, 'Noncanonical signed manifest')
    require(re.fullmatch(r'[A-Za-z0-9][A-Za-z0-9._-]{0,79}', manifest.get('release_id', '')), 'Invalid release tag')
    require(type(manifest.get('sequence')) is int and 0 < manifest['sequence'] <= 2**53 - 1, 'Invalid release sequence')
    require(isinstance(manifest.get('licenses'), list) and manifest['licenses'] and manifest.get('adapter_commit') == dist.PIN
            and manifest.get('gbrain_commit') == dist.PIN and manifest.get('gbrain_version') == dist.VERSION,
            'License inventory or supported GBrain provenance missing')
    return manifest


def inspect_bundle(directory, trust):
    signed = read_bounded(directory / MANIFEST, 24_000_000)
    manifest = verify_manifest(signed, trust)
    receipt = dist.decode(read_bounded(directory / RECEIPT, 1_000_000))
    require(receipt.get('schema_version') == 3 and receipt.get('complete') is True
            and receipt.get('published') is False and receipt.get('release_id') == manifest['release_id']
            and receipt.get('manifest_sha256') == dist.sha(signed), 'Missing or mismatched completed build receipt')
    files = manifest['files']
    require(0 < len(files) <= dist.MAX_FILES and manifest.get('inventory_sha256') == dist.sha(dist.canonical(files)), 'Incomplete signed file inventory')
    by_path = {r['path']: r for r in files}
    require(len(by_path) == len(files) and len({dist.path_key(p) for p in by_path}) == len(files), 'Duplicate file paths')
    for row in files:
        path = dist.safe_path(row['path'], hidden=True)
        require(row['kind'] in ('specialists', 'prompts', 'tutorials', 'gbrain-source'), 'Unsupported file kind')
        require(path.startswith('sources/gbrain/' + dist.PIN + '/') if row['kind'] == 'gbrain-source'
                else path.startswith(LIBRARIES), 'File outside approved distribution roots')
        limit = dist.MAX_FILE if row['kind'] == 'gbrain-source' else dist.file_limit(path)
        require(type(row['size']) is int and 0 <= row['size'] <= limit
                and row['mode'] in (0o644, 0o755), 'Invalid file size or mode')
    require(sum(r['size'] for r in files) <= dist.MAX_BYTES, 'Expanded distribution exceeds budget')
    keys = {dist.path_key(path) for path in by_path}
    require(all(not any('/'.join(path.split('/')[:i]) in keys for i in range(1, len(path.split('/')))) for path in keys), 'File/directory collision')
    items, item_ids = manifest['items'], set()
    require(0 < len(items) <= 20_000, 'Missing item inventory')
    for item in items:
        require(re.fullmatch(r'[a-z0-9][a-z0-9-]{0,54}', item['id']) and item['id'] not in item_ids,
                'Invalid or duplicate item identity')
        item_ids.add(item['id'])
        required = item['required_files']
        require(item['entry'] in required and len(required) == len(set(required))
                and all(p in by_path and by_path[p]['kind'] != 'gbrain-source' for p in required), 'Incomplete item resources')
        if item['kind'] == 'skill':
            entry = item['entry'].split('/')
            require(item.get('host_name') == 'oracle-' + item['id'] and entry[-1] == 'SKILL.md', 'Invalid skill entry')
            if manifest.get('skills_layout') == 'department-specialist-skill':
                nested = len(entry) == 7 and item.get('entry_layout') == 'reviewed-nested'
                if nested:
                    minimum = manifest.get('minimum_oracle', '')
                    require(re.fullmatch(r'\d+\.\d+\.\d+', minimum) and tuple(map(int, minimum.split('.'))) >= (0, 3, 14),
                            'Reviewed nested entries require Oracle 0.3.14 or later')
                    require(all(p.startswith('/'.join(entry[:-1]) + '/') for p in required), 'Nested resources escape entry directory')
                require((len(entry) == 6 or nested) and entry[3] == item.get('specialist_id')
                        and dist.DEPARTMENTS.get(entry[2]) == item['department_id'], 'Structured skill entry unsupported by Oracle')
            else:
                require(item['entry'].startswith('SISTEMA/skills/' + item['specialist_id'] + '/'), 'Invalid legacy skill entry')
    for kind, item_kind in [('specialists', 'skill'), ('prompts', 'prompt'), ('tutorials', 'tutorial'), ('gbrain-source', None)]:
        group = [r for r in files if r['kind'] == kind]
        count = len([i for i in items if i['kind'] == item_kind])
        require(group and (item_kind is None or count > 0)
                and manifest['counts'].get(kind) == {'files': len(group), 'bytes': sum(r['size'] for r in group), 'items': count},
                'Library counts are incomplete; not a deliverable catalog')
    packages = manifest['packages']
    require(0 < len(packages) <= 1024, 'Invalid package inventory')
    assets = {MANIFEST: {'sha256': dist.sha(signed), 'bytes': len(signed)}}
    source_blobs, seen = {}, set()
    for package in packages:
        name = package['asset']
        require(re.fullmatch(r'[a-z0-9][a-z0-9-]{0,63}\.json', name)
                and name == package['id'] + '.json' and name not in assets
                and package['url'] == DOWNLOAD + manifest['release_id'] + '/' + name, 'Invalid or nonofficial package asset')
        data = read_bounded(directory / name, 44_000_000)
        require(len(data) == package['bytes'] and dist.sha(data) == package['sha256'], 'Package digest/size mismatch')
        value = dist.decode(data)
        require(value.get('schema_version') == 3 and value.get('release_id') == manifest['release_id']
                and value.get('id') == package['id'], 'Package identity mismatch')
        records = value['files']
        require(0 < len(records) <= 1000 and [r['path'] for r in records] == package['files'], 'Package membership mismatch')
        expanded = 0
        for record in records:
            path = record['path']
            require(path in by_path and path not in seen, 'Missing or duplicated packaged file')
            expected = by_path[path]
            require(expected['package_id'] == package['id'] and expected['kind'] == package['kind']
                    and all(record[k] == expected[k] for k in ('sha256', 'size', 'mode')), 'Package file differs from signed inventory')
            content = base64.b64decode(record['content_base64'], validate=True)
            require(len(content) == expected['size'] and dist.sha(content) == expected['sha256'], 'Installed-file digest mismatch')
            expanded += len(content)
            seen.add(path)
            if expected['kind'] != 'gbrain-source':
                source_blobs[path] = hashlib.sha1(b'blob ' + str(len(content)).encode() + b'\0' + content).hexdigest()
        require(expanded == package['expanded_bytes'] and expanded <= dist.MAX_PACKAGE_BYTES, 'Expanded package size mismatch')
        assets[name] = {'sha256': dist.sha(data), 'bytes': len(data)}
    require(seen == set(by_path) and receipt.get('assets') == {n: v['sha256'] for n, v in assets.items() if n != MANIFEST}, 'Incomplete release assets')
    require(set(os.listdir(directory)) <= set(assets) | {RECEIPT, 'snapshot-receipt.json'}, 'Unexpected artifact; reports/reviews are not uploadable assets')
    return {'manifest': manifest, 'assets': assets, 'source_blobs': source_blobs,
            'receipt_sha256': dist.sha(read_bounded(directory / RECEIPT, 1_000_000))}


def stage_bundle(source, destination, trust):
    require(not destination.exists() and not destination.is_symlink()
            and not destination.is_relative_to(source) and not source.is_relative_to(destination), 'Choose a new, separate staging directory')
    bundle = inspect_bundle(source, trust)
    parent = dist.directory_fd(destination.parent)
    temporary = '.oracle-publication-' + uuid.uuid4().hex
    try:
        os.mkdir(temporary, mode=0o700, dir_fd=parent)
        staging = destination.parent / temporary
        for name in [*bundle['assets'], RECEIPT]:
            data = read_bounded(source / name, 44_000_000)
            expected = bundle['receipt_sha256'] if name == RECEIPT else bundle['assets'][name]['sha256']
            require(dist.sha(data) == expected, 'Artifacts changed after validation')
            with (staging / name).open('xb') as stream:
                stream.write(data)
                stream.flush()
                os.fsync(stream.fileno())
        require(inspect_bundle(staging, trust) == bundle, 'Staging differs from verified artifacts')
        fd = dist.directory_fd(staging)
        try:
            os.fsync(fd)
        finally:
            os.close(fd)
        # Reuse the mirror's proven exclusive rename; never replace an existing directory.
        spec = importlib.util.spec_from_file_location('oracle_source_mirror', Path(__file__).with_name('source-mirror.py'))
        mirror = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(mirror)
        mirror.rename_exclusive(parent, temporary, parent, destination.name)
    finally:
        os.close(parent)
    return bundle


class GitHub:
    """All routes are fixed to the official repository; no shell interpolation."""
    def request(self, route, method='GET', body=None, binary=False, missing=False):
        command = ['gh', 'api', '--hostname', 'github.com', '--method', method,
                   '-H', 'Accept: ' + ('application/octet-stream' if binary else 'application/vnd.github+json'),
                   'repos/' + REPOSITORY + '/' + route]
        if body is not None:
            command += ['--input', '-']
        result = subprocess.run(command, input=dist.canonical(body) if body is not None else None,
                                capture_output=True, timeout=120)
        if missing and result.returncode and '(HTTP 404)' in result.stderr.decode(errors='replace'):
            return None
        require(result.returncode == 0, 'GitHub request failed: ' + method + ' ' + route.split('?')[0])
        require(len(result.stdout) <= (24_000_000 if binary else 32_000_000), 'GitHub response exceeds budget')
        return result.stdout if binary else dist.decode(result.stdout)

    def pages(self, route):
        rows = []
        for page in range(1, 21):
            batch = self.request(route + '?per_page=100&page=' + str(page))
            require(isinstance(batch, list), 'Invalid GitHub page')
            rows.extend(batch)
            if len(batch) < 100:
                return rows
        raise dist.Refused('GitHub pagination exceeds bounded preflight; no partial inventory accepted')

    def upload(self, tag, paths):
        result = subprocess.run(['gh', 'release', 'upload', tag, '--repo', 'github.com/' + REPOSITORY,
                                 *map(str, paths)], capture_output=True, timeout=600)
        require(result.returncode == 0, 'Asset upload failed; draft retained for explicit resume')


def verify_source_tree(tree, expected):
    require(tree.get('truncated') is False and isinstance(tree.get('tree'), list), 'Remote source tree is incomplete')
    actual = {}
    for row in tree['tree']:
        path = row['path']
        if not path.startswith(LIBRARIES) or row['type'] == 'tree':
            continue
        require(row['type'] == 'blob' and row['mode'] in ('100644', '100755') and path not in actual, 'Remote source contains links/submodules or duplicate paths')
        actual[path] = row['sha']
    require(actual == expected, 'Signed final snapshot differs from the remote libraries; mirror/review/commit the exact snapshot before release')


def verify_remote_assets(rows, assets, tag, complete=True):
    require(len({r['name'] for r in rows}) == len(rows), 'Duplicate remote assets')
    actual = {r['name']: r for r in rows}
    require(set(actual) == set(assets) if complete else set(actual) <= set(assets), 'Unexpected or missing remote assets')
    for name, row in actual.items():
        require(row.get('state') == 'uploaded' and row.get('size') == assets[name]['bytes']
                and row.get('digest') == 'sha256:' + assets[name]['sha256']
                and row.get('browser_download_url') == DOWNLOAD + tag + '/' + name, 'Remote asset digest, state or official URL differs')
    return actual


def tag_commit(github, tag):
    ref = github.request('git/ref/tags/' + tag, missing=True)
    if ref is None:
        return None
    obj = ref['object']
    for _ in range(5):
        require(re.fullmatch(r'[a-f0-9]{40}', obj.get('sha', '')), 'Invalid remote Git object')
        if obj.get('type') == 'commit':
            return obj['sha']
        require(obj.get('type') == 'tag', 'Release tag does not resolve to a commit')
        obj = github.request('git/tags/' + obj['sha'])['object']
    raise dist.Refused('Remote tag indirection exceeds limit')


def check_latest(github, bundle, trust):
    latest = github.request('releases/latest')
    require(latest.get('draft') is False and latest.get('prerelease') is False, 'No stable baseline release')
    rows = github.pages('releases/' + str(latest['id']) + '/assets')
    manifests = [r for r in rows if r['name'] == MANIFEST]
    require(len(manifests) == 1 and 0 < manifests[0]['size'] <= 24_000_000, 'Latest release has no unique bounded manifest')
    asset = manifests[0]
    data = github.request('releases/assets/' + str(asset['id']), binary=True)
    verify_remote_assets([asset], {MANIFEST: {'sha256': dist.sha(data), 'bytes': len(data)}}, latest['tag_name'])
    previous = verify_manifest(data, trust)
    require(previous['release_id'] == latest['tag_name'] and bundle['manifest']['sequence'] > previous['sequence'], 'Release sequence must advance the signed stable baseline')
    return latest['id']


def publish(bundle, staging, commit, notes, trust, github, execute=False, resume_draft=None, effects=None):
    effects = effects if effects is not None else {}
    require(re.fullmatch(r'[a-f0-9]{40}', commit), 'Full reviewed source commit required')
    tag = bundle['manifest']['release_id']
    require(github.request('git/ref/heads/main')['object']['sha'] == commit, 'Remote main moved; review the new source before publishing')
    verify_source_tree(github.request('git/trees/' + commit + '?recursive=1'), bundle['source_blobs'])
    require(tag_commit(github, tag) in (None, commit), 'Existing release tag points to a different commit')
    baseline = check_latest(github, bundle, trust)
    candidates = [r for r in github.pages('releases') if r['tag_name'] == tag]
    require(len(candidates) <= 1, 'Ambiguous release tag')
    draft = candidates[0] if candidates else None
    if draft:
        require(draft.get('draft') is True and draft.get('prerelease') is False
                and draft.get('target_commitish') == commit and draft.get('id') == resume_draft,
                'Existing release preserved; only its exact --resume-draft ID can resume an unpublished draft')
    else:
        require(resume_draft is None, 'Requested draft no longer exists')
    existing = github.pages('releases/' + str(draft['id']) + '/assets') if draft else []
    verified = verify_remote_assets(existing, bundle['assets'], tag, complete=False)
    result = {'ready': True, 'published': False, 'repository': REPOSITORY, 'release_id': tag,
              'sequence': bundle['manifest']['sequence'], 'source_commit': commit,
              'assets': len(bundle['assets']), 'baseline_release_id': baseline}
    if not execute:
        return dict(result, status='preflight-only')
    # Copy was frozen locally, but still revalidate it immediately before upload.
    require(inspect_bundle(staging, trust) == bundle, 'Staged assets changed before upload')
    if draft is None:
        draft = github.request('releases', method='POST', body={'tag_name': tag, 'target_commitish': commit,
            'name': tag, 'body': notes, 'draft': True, 'prerelease': False, 'make_latest': 'false'})
    effects['draft_id'] = draft['id']
    require(draft.get('draft') is True and draft.get('tag_name') == tag
            and draft.get('target_commitish') == commit, 'Created release is not the expected draft')
    missing = [staging / name for name in bundle['assets'] if name not in verified]
    if missing:
        github.upload(tag, missing)
    verify_remote_assets(github.pages('releases/' + str(draft['id']) + '/assets'), bundle['assets'], tag)
    require(github.request('git/ref/heads/main')['object']['sha'] == commit and check_latest(github, bundle, trust) == baseline,
            'Source or stable release advanced during upload; draft retained')
    require(tag_commit(github, tag) in (None, commit), 'Release tag moved during upload; draft retained')
    effects['publication_attempted'] = True
    github.request('releases/' + str(draft['id']), method='PATCH', body={'draft': False, 'prerelease': False, 'make_latest': 'true'})
    latest = github.request('releases/latest')
    require(latest.get('id') == draft['id'] and latest.get('tag_name') == tag
            and latest.get('draft') is False and latest.get('prerelease') is False, 'Published release/latest readback failed; inspect GitHub before retrying')
    verify_remote_assets(github.pages('releases/' + str(draft['id']) + '/assets'), bundle['assets'], tag)
    require(tag_commit(github, tag) == commit, 'Published tag readback differs from reviewed commit')
    return dict(result, status='published-verified', published=True, github_release_id=draft['id'])


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--artifacts', required=True, type=Path)
    parser.add_argument('--staging', required=True, type=Path, help='New directory under an existing parent; private receipts remain outside it')
    parser.add_argument('--source-commit', required=True, help='Full current ORACLE-SKILLS main commit containing the reviewed final snapshot')
    parser.add_argument('--notes', required=True, type=Path, help='Explicitly reviewed public release notes')
    parser.add_argument('--execute', action='store_true', help='Create/resume draft, upload exact assets, verify and publish')
    parser.add_argument('--resume-draft', type=int)
    args = parser.parse_args(argv)
    effects = {}
    try:
        require(re.fullmatch(r'[a-f0-9]{40}', args.source_commit), 'Full reviewed source commit required')
        trust = dist.decode(read_bounded(TRUST, 100_000))
        notes = read_bounded(args.notes.absolute(), 64_000)
        dist.check_publication_bytes('release-notes', notes)
        bundle = stage_bundle(args.artifacts.absolute(), args.staging.absolute(), trust)
        result = publish(bundle, args.staging.absolute(), args.source_commit, notes.decode('utf-8'), trust,
                         GitHub(), args.execute, args.resume_draft, effects)
        print(json.dumps(result, sort_keys=True))
        return 0
    except (dist.Refused, OSError, ValueError, KeyError, TypeError, subprocess.SubprocessError) as error:
        print(json.dumps({'ready': False, 'status': 'refused', **effects,
            'publication_state': 'unknown-readback-required' if effects.get('publication_attempted') else 'not-published-by-this-run',
            'reason': str(error) if isinstance(error, dist.Refused) else 'Filesystem, metadata or GitHub operation failed; artifacts and draft preserved'}), file=sys.stderr)
        return 2


if __name__ == '__main__':
    sys.exit(main())
