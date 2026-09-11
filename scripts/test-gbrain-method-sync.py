#!/usr/bin/env python3
"""Synthetic offline integration: run under sandbox-exec with network denied.
Never locates personal profiles or .work/latest-* state. Every run has its own
state, HOME, TMPDIR, copied engine and resource bytes below this checkout/.work.
"""
from __future__ import annotations
import argparse
import hashlib
import json
import os
from pathlib import Path
import shutil
import subprocess
import uuid

ROOT = Path(__file__).resolve().parent.parent

def isolated_copy(source, target):
    """Independent APFS copy-on-write bytes, never shared engine links."""
    source, target = Path(source), Path(target)
    if source.is_symlink():
        raise AssertionError('Unexpected source symlink')
    copied = subprocess.run(['/bin/cp', '-c', str(source), str(target)], capture_output=True)
    if copied.returncode == 0:
        return str(target)
    return shutil.copy2(source, target)


def digest(data):
    return hashlib.sha256(data).hexdigest()


def run_test(app: Path, adapter: Path):
    assert app.resolve().is_relative_to(ROOT / '.work'), 'Use an isolated build, not the installed app'
    assert adapter.resolve().is_relative_to(ROOT / '.work'), 'Use the local rebuilt adapter'
    base = ROOT / '.work' / ('gbrain-method-sync-' + uuid.uuid4().hex)
    print('SYNTHETIC_FIXTURE ' + str(base), flush=True)
    vault, state, resources = base / 'vault', base / 'state', base / 'resources'
    for directory in (vault, state, resources / 'engine', base / 'home', base / 'tmp'):
        directory.mkdir(parents=True, exist_ok=True)
    for name, source in [('gbrain', ROOT / 'Resources/engine/gbrain'), ('oracle-gbrain-read', adapter)]:
        assert not source.is_symlink(), 'Do not compile/write through shared engine symlinks'
        isolated_copy(source, resources / 'engine' / name)
    shutil.copytree(ROOT / 'Resources/gbrain-method', resources / 'gbrain-method', copy_function=isolated_copy)
    shutil.copytree(ROOT / 'skills', resources / 'skills', copy_function=isolated_copy)
    (resources / 'catalog').symlink_to(ROOT / 'Resources/catalog', target_is_directory=True)  # read-only input
    (vault / 'alpha.md').write_text('# Alpha\n\nA fixture links to [Beta](beta.md).\n')
    (vault / 'beta.md').write_text('# Beta\n\nSynthetic target for a deterministic link.\n')
    (vault / 'gamma.md').write_text('---\nid: fixture-owned-gamma\n---\n# Gamma\n\nSynthetic rename fixture.\n')
    (state / 'config.json').write_text(json.dumps({'vault': str(vault), 'fixture': True}))
    params = base / 'plan-input.json'
    params.write_text(json.dumps({'newVault': False, 'attach': False, 'catalogCollections': [], 'answers': {
        'AGENT_NAME': 'OracleFixture', 'PRINCIPAL_NAME': 'Pessoa Sintetica Worker4',
        'AGENT_PURPOSE': 'Organizar apenas conhecimento sintetico de teste.',
        'AGENT_TOP_JOBS': 'Consultar fontes; organizar documentos; preservar evidencia.',
        'PRINCIPAL_CONTEXT': 'Perfil descartavel isolado sem dados pessoais.',
        'VOICE_REGISTER': 'Direto e claro', 'PRINCIPAL_TIMEZONE': 'UTC'}}))
    env = {'PATH': '/usr/bin:/bin:/usr/sbin:/sbin', 'HOME': str(base / 'home'), 'TMPDIR': str(base / 'tmp'), 'LANG': 'en_US.UTF-8', 'ORACLE_ENGINE_RESOURCES': str(resources / 'engine')}
    checks = []
    def check(name, predicate):
        assert predicate, name
        checks.append(name); print('PASS ' + name, flush=True)
    def call(argv, data=None, expected=0, child_env=None):
        result = subprocess.run([str(a) for a in argv], cwd=base, env=child_env or env, input=json.dumps(data) if data is not None else None, capture_output=True, text=True, timeout=240)
        if expected == 0 and result.returncode != 0:
            raise AssertionError('Command failed: ' + ' '.join(map(str, argv[-3:])) + '\n' + result.stdout[-3000:] + '\n' + result.stderr[-3000:])
        if expected != 0:
            check('expected refusal: ' + str(argv[-1])[:50], result.returncode != 0)
        return result
    def native(*args, expected=0):
        r = call([app, '--state', state, *args], expected=expected)
        if expected != 0:
            return r
        return json.loads(r.stdout) if r.stdout.lstrip().startswith('{') else r.stdout
    plan = native('--create-plan', params)
    native('--confirm-plan', plan['plan_hash'])
    native('--setup', 'apply')
    readback = native('--gbrain', 'prepare')
    native('--confirm-gbrain', readback['upstream_hash'])
    receipt = native('--gbrain', 'finish')
    check('official identity and initial index verified', receipt['status'] == 'identity_and_index_verified')
    marker = json.loads((state / 'gbrain/profile/oracle-owned.json').read_text())
    check('reviewed canonical root bound to owned profile', marker['schema_version'] == 2 and marker['vault_root'] == str(vault))
    profile = state / 'gbrain/profile'
    read_env = {'PATH': '/usr/bin:/bin', 'HOME': str(profile), 'TMPDIR': str(profile / 'tmp'), 'GBRAIN_HOME': str(profile), 'GBRAIN_HOOKS': '0', 'ORACLE_RECEIPT_DIR': str(state / 'events')}
    binary = resources / 'engine/oracle-gbrain-read'
    def adapter_call(request, expected=0):
        r = call([binary], data=request, child_env=read_env, expected=expected)
        if expected != 0:
            return r
        return json.loads([line for line in r.stdout.splitlines() if line.startswith('{')][-1])
    def sync(**kwargs):
        return adapter_call({'operation': 'index', 'source': 'oracle-vault', 'root': str(vault), **kwargs})['value']
    manifest_file = profile / 'oracle-vault-manifest.json'
    initial = json.loads(manifest_file.read_text())
    check('all index rows carry file and official page hashes', all(r.get('sha256') and r.get('page_hash') for r in initial['records']))
    before = adapter_call({'operation': 'get', 'source': 'oracle-vault', 'slug': 'alpha', 'owned': True})['value']
    no_op = sync()
    after = adapter_call({'operation': 'get', 'source': 'oracle-vault', 'slug': 'alpha', 'owned': True})['value']
    check('unchanged sync has no page/link writes', no_op['complete'] and no_op['no_op'] and no_op['changed'] == 0 and before['updated_at'] == after['updated_at'])
    check('explicit link extracted by pinned GBrain', initial['explicit_links'] >= 1)
    canonical_memory = vault / 'INBOX/oracle-memory/test.md'
    canonical_memory.write_text('# Owned memory\n\nNever imported into oracle-vault.\n')
    excluded = sync()
    check('owned memory subtree excluded without creating duplicates', excluded['no_op'] and not any(r['path'].startswith('INBOX/oracle-memory/') for r in json.loads(manifest_file.read_text())['records']))
    (vault / 'alpha.md').write_text('# Alpha\n\nA synthetic updated document without the old link.\n')
    (vault / 'beta.md').unlink()
    (vault / 'gamma.md').rename(vault / 'renamed.md')
    reconciled = sync()
    check('update rename and deletion reconcile incrementally', reconciled['complete'] and reconciled['changed'] == 2 and reconciled['removed_from_derived_index'] == 2)
    check('old derived slug removed', adapter_call({'operation': 'get', 'source': 'oracle-vault', 'slug': 'gamma', 'owned': True})['value'] is None)
    check('deleted-link edges removed', json.loads(manifest_file.read_text())['explicit_links'] == 0)
    stable = manifest_file.read_bytes()
    (vault / 'bad.md').write_text('---\ntitle: [broken yaml\n---\n# Bad\n')
    refused = sync()
    check('malformed scan cannot delete or replace stable receipt', not refused['complete'] and manifest_file.read_bytes() == stable)
    (vault / 'bad.md').unlink()
    (vault / 'linked.md').symlink_to(vault / 'alpha.md')
    refused = sync()
    check('symlink refused before source mutations', not refused['complete'] and manifest_file.read_bytes() == stable)
    (vault / 'linked.md').unlink()
    (vault / 'A!.md').write_text('# A\n\nOne.\n')
    (vault / 'A?.md').write_text('# A\n\nTwo.\n')
    refused = sync()
    check('slug collision fails before changing index', not refused['complete'] and manifest_file.read_bytes() == stable)
    (vault / 'A!.md').unlink(); (vault / 'A?.md').unlink()
    (vault / 'duplicate-id-a.md').write_text('---\nid: fixture-duplicate\n---\n# First\n')
    (vault / 'duplicate-id-b.md').write_text('---\nid: fixture-duplicate\n---\n# Second\n')
    refused = sync()
    check('duplicate external identities rejected before writes', not refused['complete'] and manifest_file.read_bytes() == stable)
    (vault / 'duplicate-id-a.md').unlink(); (vault / 'duplicate-id-b.md').unlink()
    refused = sync(files=['alpha.md'])
    check('truncated caller inventory cannot authorize deletion', not refused['complete'] and manifest_file.read_bytes() == stable)
    altered = json.loads(stable);altered['records'][0]['sha256'] = '0' * 64
    manifest_file.write_text(json.dumps(altered))
    adapter_call({'operation': 'index', 'source': 'oracle-vault', 'root': str(vault)}, expected=1)
    check('tampered ownership receipt not replaced', json.loads(manifest_file.read_text())['records'][0]['sha256'] == '0' * 64)
    manifest_file.write_bytes(stable)
    foreign = base / 'foreign'; foreign.mkdir(); (foreign / 'no.md').write_text('# Not authorized\n')
    adapter_call({'operation': 'index', 'source': 'oracle-vault', 'root': str(foreign)}, expected=1)
    check('different source target refused', manifest_file.read_bytes() == stable)
    bridge = native('--prepare-bridge')
    workspace = Path(bridge['workspace'])
    method = bridge['official_method']
    check('two explicit discoverable Codex skills', len(bridge['required_skill_paths']) == 2 and len(list((workspace / '.agents/skills').rglob('SKILL.md'))) == 2)
    check('official library outside automatic skill discovery', (workspace / '.oracle/gbrain-method/upstream/skills/RESOLVER.md').exists())
    check('verified real identity in effective Codex workspace', (workspace / '.oracle/identity/USER.md').read_bytes() == (state / 'gbrain/workspace/USER.md').read_bytes() and method['identity_status'] == 'source_and_workspace_verified')
    agents = (workspace / 'AGENTS.md').read_text()
    check('AGENTS explicitly points to actual identity and resolver wrapper', '.oracle/identity/SOUL.md' in agents and 'oracle-gbrain-method/SKILL.md' in agents)
    check('Codex trust and execution not fabricated', bridge['status'] == 'prepared_requires_codex_trust' and method['runtime_verified'] is False)
    check('official MIT license retained verbatim', (workspace / '.oracle/gbrain-method/upstream/LICENSE').read_bytes() == (resources / 'gbrain-method/upstream/LICENSE').read_bytes())
    original_identity = (workspace / '.oracle/identity/USER.md').read_bytes()
    repeated = native('--prepare-bridge')
    check('bridge preparation safely resumable', repeated['official_method']['manifest_sha256'] == method['manifest_sha256'])
    (workspace / '.oracle/identity/USER.md').write_text('# Edited by fixture owner\n')
    native('--prepare-bridge', expected=1)
    check('edited identity projection preserved', (workspace / '.oracle/identity/USER.md').read_text() == '# Edited by fixture owner\n')
    (workspace / '.oracle/identity/USER.md').write_bytes(original_identity)
    check('CLI backup defaults to disabled independently of setup', native('--backup', 'status')['enabled'] is False)
    native('--backup', 'create', expected=1)
    native('--backup', 'enable')
    created = native('--backup', 'create')
    check('Swift CLI creates a verified physical backup', created['complete'] and created['integrity_verified'] and not created['restore_verified'])
    checked = native('--backup', 'verify', '--backup-id', created['id'])
    check('Swift CLI integrity check never claims a restore', checked['status'] == 'backup_verified' and checked['restore_verified'] is False)
    native('--backup', 'restore', '--backup-id', created['id'], expected=1)
    restored = native('--backup', 'restore', '--backup-id', created['id'], '--confirm-restore')
    check('Swift CLI confirms restore only into a new inactive state', restored['restore_verified'] and not restored['activated'] and not restored['live_overwritten'] and Path(restored['new_state']).is_relative_to(state / 'gbrain-backups/restores'))
    check('Swift status exposes only the verified restore for the bound vault', native('--backup', 'status')['lastRun']['backup_id'] == created['id'])
    maintenance_input = base / 'maintenance-input.json'
    maintenance_input.write_text(json.dumps({'enabled': True, 'timezone': 'UTC', 'hour': 3, 'autoCapture': False, 'remoteProcessing': False}))
    native('--maintenance', 'configure', '--maintenance-config', maintenance_input)
    maintained = native('--maintenance', 'run-now')
    check('Actual maintenance composes sync then backup without recursive writer lock', maintained['status'] == 'local_complete' and maintained['complete'] and maintained['sync']['complete'] and maintained['backup']['status'] == 'backup_verified')
    check('Completed daily opportunity is not duplicated', native('--maintenance', 'run')['status'] == 'not_due')
    check('Actual execution does not fabricate scheduler registration', native('--maintenance', 'status')['registered'] is False and native('--maintenance', 'request')['registered'] is False)
    native('--backup', 'disable')
    check('Revoked backup remains skipped by real maintenance', native('--maintenance', 'run-now')['backup']['status'] == 'not_consented')
    native('--backup', 'create', expected=1)
    maintenance_input.write_text(json.dumps({'enabled': False, 'timezone': 'UTC', 'hour': 3}))
    native('--maintenance', 'configure', '--maintenance-config', maintenance_input)
    check('Pause prevents explicit maintenance execution', native('--maintenance', 'run-now')['status'] == 'disabled')
    maintenance_input.write_text(json.dumps({'enabled': True, 'timezone': 'UTC', 'hour': 3,
        'autoCapture': True, 'remoteProcessing': False, 'captureSource': 'codex_workspace_hooks_v1'}))
    native('--maintenance', 'configure', '--maintenance-config', maintenance_input)
    hook = {'hook_event_name': 'UserPromptSubmit', 'session_id': 'synthetic-e2e-session',
        'turn_id': 'synthetic-e2e-turn', 'cwd': str(workspace),
        'prompt': 'Synthetic authorized hook token orchidmaintenance.',
        'transcript_path': '/__never_read_private_history__/missing.jsonl'}
    call([app, '--state', state, '--hook'], data=hook)
    capture = json.loads((state / 'maintenance/last-capture.json').read_text())
    check('Actual hook CLI captures only explicitly authorized workspace messages', capture['status'] == 'captured')
    call([app, '--state', state, '--hook'], data=hook)
    check('Actual hook retry does not duplicate a captured message', len(list((state / 'maintenance/capture-events').glob('*.json'))) == 1)
    capture_run = native('--maintenance', 'run-now')
    note = vault / ('INBOX/oracle-history/conversations/oracle-' + capture['id'] + '.md')
    check('Actual maintenance projects and verifies the original captured Markdown', capture_run['complete'] and capture_run['capture']['capturedMessages'] == 1 and 'orchidmaintenance' in note.read_text())
    check('Official index finds captured Markdown after composed maintenance', 'orchidmaintenance' in json.dumps(adapter_call({'operation': 'search', 'source': 'oracle-vault', 'query': 'orchidmaintenance', 'owned': True})))
    maintenance_input.write_text(json.dumps({'enabled': False, 'timezone': 'UTC', 'hour': 3}))
    native('--maintenance', 'configure', '--maintenance-config', maintenance_input)
    hook['turn_id'] = 'synthetic-after-revocation'
    call([app, '--state', state, '--hook'], data=hook)
    check('Paused capture CLI retains original notes and saves no new private content', len(list((state / 'maintenance/capture-events').glob('*.json'))) == 1 and note.exists())
    result = {'checks': len(checks), 'passed': checks, 'state': str(state), 'vault': str(vault), 'resources': str(resources), 'engine': 'GBrain 0.48.4.0', 'network': 'denied by caller sandbox', 'personal_profiles': False, 'real_codex': False}
    (base / 'result.json').write_text(json.dumps(result, indent=2))
    print(json.dumps(result, indent=2), flush=True)
    return result


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--app', type=Path, required=True)
    parser.add_argument('--adapter', type=Path, required=True)
    args = parser.parse_args()
    run_test(args.app.resolve(), args.adapter.resolve())
