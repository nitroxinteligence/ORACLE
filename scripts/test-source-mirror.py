#!/usr/bin/env python3
"""Offline fixtures only. Does not invoke Git commit/add/init/fetch/push.

Git ref/index files below are synthetic protocol fixtures, not repository history.
The real Git executable performs only rev-parse, ls-files and check-ignore.
Crash and dataless flags are modeled in process; no iCloud file is touched.
"""
import contextlib
import errno
import hashlib
import importlib.util
import io
import json
import os
from pathlib import Path
import stat
import struct
import subprocess
import sys
import tempfile
import unittest
from unittest import mock

sys.dont_write_bytecode = True
ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / 'scripts'))
SPEC = importlib.util.spec_from_file_location('source_mirror', ROOT / 'scripts/source-mirror.py')
M = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(M)
HEAD, OTHER = '1' * 40, '2' * 40
REF = 'refs/remotes/origin/main'
SKILL = 'SISTEMA/skills/code/example/SKILL.md'
ASSET = 'SISTEMA/skills/code/example/task.sh'
BODY = b'---\nname: fixture\ndescription: Synthetic public fixture.\n---\n# Example\n'
RUN = None


def write(path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(data)


def synthetic_index(paths):
    """Git index v2 protocol bytes; no staging command and no source execution."""
    result = b'DIRC' + struct.pack('>II', 2, len(paths))
    for path in sorted(paths):
        name = path.encode()
        row = struct.pack('>10I20sH', 0, 0, 0, 0, 0, 0, 0o100644, 0, 0, 0, b'\x11' * 20, len(name))
        row += name + b'\0'
        result += row + b'\0' * (-len(row) % 8)
    return result + hashlib.sha1(result).digest()


class Crash(BaseException):
    pass


class MirrorTests(unittest.TestCase):
    def setUp(self):
        self.base = Path(tempfile.mkdtemp(prefix=self._testMethodName + '-', dir=RUN))
        self.source, self.dest = self.base / 'OS', self.base / 'ORACLE-SKILLS'
        write(self.source / SKILL, BODY)
        write(self.source / ASSET, b'#!/bin/sh\necho SHOULD_NEVER_RUN > executed-marker\nexit 99\n')
        (self.dest / '.git/objects').mkdir(parents=True)
        write(self.dest / '.git/HEAD', b'ref: refs/heads/main\n')
        write(self.dest / '.git/refs/heads/main', (HEAD + '\n').encode())
        write(self.dest / ('.git/' + REF), (HEAD + '\n').encode())
        write(self.dest / '.git/config', b'[core]\n repositoryformatversion = 0\n bare = false\n')
        write(self.dest / '.gitignore', b'/.oracle-source-mirror/\n')
        self.plan_path = self.base / 'plan.json'

    @contextlib.contextmanager
    def trees(self):
        with M.Tree(self.source) as source, M.Tree(self.dest) as dest:
            yield source, dest

    def plan(self):
        with self.trees() as (source, dest):
            return M.plan_for(source, dest, HEAD, REF, HEAD)

    def apply(self, plan, resume=False, reviewed=None, head=HEAD, base=HEAD):
        with self.trees() as (source, dest):
            return M.execute(source, dest, plan, reviewed or plan['plan_sha256'], head, REF, base, resume=resume)

    def cli(self, *extra):
        environment = {'PATH': '/usr/bin:/bin', 'PYTHONDONTWRITEBYTECODE': '1',
                       'HOME': str(RUN / 'home'), 'TMPDIR': str(RUN / 'tmp')}
        return subprocess.run([sys.executable, str(ROOT / 'scripts/source-mirror.py'),
                               '--source', str(self.source), '--destination', str(self.dest),
                               '--plan', str(self.plan_path), '--expected-head', HEAD,
                               '--remote-base-head', HEAD, *extra], cwd=self.base,
                              env=environment, capture_output=True, text=True, timeout=30)

    def files(self):
        return {p.relative_to(self.dest).as_posix(): p.read_bytes() for p in self.dest.rglob('*') if p.is_file()}

    def actions(self, plan):
        return {item['path']: item['action'] for item in plan['actions']}

    def fail_before_writes(self, plan, **kwargs):
        before = self.files()
        with self.assertRaises((M.Refused, OSError)):
            self.apply(plan, **kwargs)
        self.assertEqual(before, self.files())

    def test_default_dry_run_is_deterministic_manifest_not_release(self):
        before = self.files()
        response = self.cli()
        self.assertEqual(response.returncode, 0, response.stderr)
        plan = json.loads(self.plan_path.read_bytes())
        self.assertEqual(plan, self.plan())
        self.assertEqual(plan['plan_sha256'], M.plan_hash(plan))
        self.assertEqual(before, self.files())
        self.assertFalse((self.dest / M.CONTROL).exists())
        self.assertFalse(plan['release_asset'])
        self.assertFalse(plan['published'])
        self.assertEqual(plan['git']['remote_sync'], 'unverified-no-fetch')
        self.assertNotIn('content_base64', self.plan_path.read_text())
        preserved = self.plan_path.read_bytes()
        self.assertNotEqual(self.cli().returncode, 0)
        self.assertEqual(preserved, self.plan_path.read_bytes())

    def test_apply_requires_exact_hash_and_explicit_head(self):
        plan = self.plan()
        self.fail_before_writes(plan, reviewed='0' * 64)
        self.fail_before_writes(plan, head=OTHER)
        self.fail_before_writes(plan, base=OTHER)
        response = self.cli('--apply')
        self.assertNotEqual(response.returncode, 0)
        self.assertFalse((self.dest / M.CONTROL).exists())

    def test_cli_apply_and_resume_are_idempotent_without_git_changes(self):
        git_before = {p: b for p, b in self.files().items() if p.startswith('.git/')}
        result = self.cli()
        self.assertEqual(result.returncode, 0, result.stderr)
        plan = json.loads(self.plan_path.read_bytes())
        result = self.cli('--apply', '--reviewed-plan-sha256', plan['plan_sha256'])
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual((self.dest / SKILL).read_bytes(), BODY)
        result = self.cli('--resume', '--reviewed-plan-sha256', plan['plan_sha256'])
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(json.loads(result.stdout)['status'], 'already-applied')
        self.assertEqual({p: b for p, b in self.files().items() if p.startswith('.git/')}, git_before)
        self.assertFalse((self.base / 'executed-marker').exists())
        self.assertEqual(stat.S_IMODE((self.dest / ASSET).stat().st_mode), 0o644)

    def test_additions_update_owned_files_and_retain_original_backups(self):
        write(self.dest / 'README.md', b'user owned checkout overview')
        first = self.plan()
        self.apply(first)
        write(self.source / SKILL, BODY + b'\nSecond public revision\n')
        second = self.plan()
        self.assertEqual(self.actions(second)[SKILL], 'update')
        self.apply(second)
        self.assertEqual((self.dest / 'README.md').read_bytes(), b'user owned checkout overview')
        self.assertEqual((self.dest / SKILL).read_bytes(), (self.source / SKILL).read_bytes())
        _, backup, _ = M.operation_paths(second, 0)
        self.assertEqual((self.dest / backup).read_bytes(), BODY)
        ownership = json.loads((self.dest / M.LEDGER).read_bytes())['owned']
        self.assertEqual(ownership[SKILL]['sha256'], M.sha((self.source / SKILL).read_bytes()))
        self.assertEqual(M.summary(second, 'test')['deleted_files'], 0)

    def test_identical_and_conflicting_unowned_files_never_become_owned(self):
        write(self.dest / SKILL, BODY)
        write(self.dest / ASSET, b'user custom script')
        plan = self.plan()
        self.assertEqual(set(self.actions(plan).values()), {'preserve_unowned'})
        self.apply(plan)
        self.assertEqual(json.loads((self.dest / M.LEDGER).read_bytes())['owned'], {})
        write(self.source / SKILL, BODY + b'new')
        later = self.plan()
        self.apply(later)
        self.assertEqual((self.dest / SKILL).read_bytes(), BODY)
        self.assertEqual((self.dest / ASSET).read_bytes(), b'user custom script')

    def test_user_edits_mode_changes_and_destination_deletion_are_preserved(self):
        self.apply(self.plan())
        write(self.dest / SKILL, b'user manual edit')
        (self.dest / ASSET).chmod(0o600)
        plan = self.plan()
        self.assertEqual(set(self.actions(plan).values()), {'preserve_user_edit'})
        self.apply(plan)
        self.assertEqual((self.dest / SKILL).read_bytes(), b'user manual edit')
        (self.dest / SKILL).unlink()  # Fixture models a user deletion, never a mirror operation.
        plan = self.plan()
        self.assertEqual(self.actions(plan)[SKILL], 'preserve_destination_deleted')
        self.apply(plan)
        self.assertFalse((self.dest / SKILL).exists())
        self.assertIn(SKILL, json.loads((self.dest / M.LEDGER).read_bytes())['owned'])

    def test_source_deletion_keeps_last_known_owner_and_original_then_readdition_updates(self):
        second_skill = 'SISTEMA/skills/custom-specialist/real/SKILL.md'
        write(self.source / second_skill, BODY)
        self.apply(self.plan())
        (self.source / SKILL).unlink()
        plan = self.plan()
        self.assertEqual(self.actions(plan)[SKILL], 'preserve_source_deleted')
        self.apply(plan)
        self.assertEqual((self.dest / SKILL).read_bytes(), BODY)
        self.assertIn(SKILL, json.loads((self.dest / M.LEDGER).read_bytes())['owned'])
        write(self.source / SKILL, BODY + b'new revision')
        plan = self.plan()
        self.assertEqual(self.actions(plan)[SKILL], 'update')
        self.apply(plan)
        self.assertEqual((self.dest / SKILL).read_bytes(), BODY + b'new revision')

    def test_tracked_deleted_file_and_tracked_parent_are_never_resurrected(self):
        write(self.dest / '.git/index', synthetic_index([SKILL]))
        plan = self.plan()
        self.assertIn(SKILL, plan['git']['tracked_paths'])
        self.assertEqual(self.actions(plan)[SKILL], 'preserve_unowned_deleted')
        self.apply(plan)
        self.assertFalse((self.dest / SKILL).exists())
        write(self.dest / '.git/index', synthetic_index(['SISTEMA/skills/code/example']))
        plan = self.plan()
        self.assertEqual(self.actions(plan)[SKILL], 'preserve_parent_conflict')

    def test_stale_source_bytes_inventory_and_root_are_refused(self):
        plan = self.plan()
        write(self.source / SKILL, BODY + b'changed after review')
        self.fail_before_writes(plan)
        plan = self.plan()
        write(self.source / 'SISTEMA/skills/new/real/SKILL.md', BODY)
        self.fail_before_writes(plan)
        plan = self.plan()
        self.source.rename(self.base / 'prior-source')
        write(self.source / SKILL, BODY)
        self.fail_before_writes(plan)

    def test_stale_unowned_destination_and_owned_ledger_are_refused(self):
        plan = self.plan()
        write(self.dest / 'new-note.md', b'new user file after review')
        self.fail_before_writes(plan)
        self.apply(self.plan())
        plan = self.plan()
        value = json.loads((self.dest / M.LEDGER).read_bytes())
        value['owned'][SKILL]['sha256'] = '9' * 64
        write(self.dest / M.LEDGER, M.canonical(value))
        self.fail_before_writes(plan)

    def test_changed_head_remote_base_branch_and_index_each_refuse(self):
        for target, data in [('.git/refs/heads/main', (OTHER + '\n').encode()),
                             ('.git/' + REF, (OTHER + '\n').encode()),
                             ('.git/HEAD', ('ref: refs/heads/other\n').encode()),
                             ('.git/index', synthetic_index(['README.md']))]:
            with self.subTest(target=target):
                write(self.dest / '.git/refs/heads/other', (HEAD + '\n').encode())
                old = (self.dest / target).read_bytes() if (self.dest / target).exists() else None
                plan = self.plan()
                write(self.dest / target, data)
                self.fail_before_writes(plan, head=OTHER if target == '.git/refs/heads/main' else HEAD,
                                       base=OTHER if target == '.git/' + REF else HEAD)
                if old is not None:
                    write(self.dest / target, old)
                else:
                    (self.dest / target).unlink()

    def test_tampered_actions_and_duplicate_json_keys_refuse(self):
        plan = self.plan()
        plan['actions'][0]['action'] = 'delete'
        plan['plan_sha256'] = M.plan_hash(plan)
        self.fail_before_writes(plan)
        with self.assertRaises(M.Refused):
            M.decode(b'{"schema_version":1,"schema_version":2}')

    def test_missing_empty_inaccessible_source_never_changes_destination(self):
        self.apply(self.plan())
        before = self.files()
        (self.source / SKILL).unlink()
        with self.assertRaises(M.Refused):
            self.plan()
        self.assertEqual(before, self.files())
        write(self.source / SKILL, BODY)
        folder = self.source / 'SISTEMA/skills'
        folder.chmod(0)
        try:
            with self.assertRaises((M.Refused, OSError)):
                self.plan()
        finally:
            folder.chmod(0o755)
        self.assertEqual(before, self.files())
        self.source.rename(self.base / 'missing-source')
        with self.assertRaises((M.Refused, OSError)):
            self.plan()
        self.assertEqual(before, self.files())

    def test_dataless_file_and_directory_block_before_content_read(self):
        self.apply(self.plan())
        before = self.files()
        for target in (self.source / SKILL, self.source / 'SISTEMA/skills'):
            inode = target.stat().st_ino
            original = M.check_stat
            def flagged(info, directory=False):
                if info.st_ino == inode:
                    class Flagged:
                        st_flags = M.DATALESS
                        def __getattr__(self, key):
                            return getattr(info, key)
                    info = Flagged()
                return original(info, directory)
            with mock.patch.object(M, 'check_stat', flagged), self.assertRaises(M.Refused):
                self.plan()
            self.assertEqual(before, self.files())

    def test_source_and_destination_links_are_rejected(self):
        for root in (self.source, self.dest):
            target = root / 'SISTEMA/skills/linked/SKILL.md'
            target.parent.mkdir(parents=True, exist_ok=True)
            target.symlink_to(self.source / SKILL)
            with self.assertRaises((M.Refused, OSError)):
                self.plan()
            target.unlink()
            os.link(self.source / SKILL, target)
            with self.assertRaises((M.Refused, OSError)):
                self.plan()
            target.unlink()
        alias = self.base / 'alias'
        alias.symlink_to(self.source, target_is_directory=True)
        with self.assertRaises((M.Refused, OSError)):
            with M.Tree(alias):
                pass

    def test_unsafe_paths_hidden_files_and_oversized_source_refuse(self):
        for path in ('../outside', '/absolute', 'safe/../outside', 'safe\\bad', 'safe\nbad', 'a//b'):
            with self.assertRaises(M.Refused):
                M.relative(path)
        for name in ('.env', 'unsafe\\name.md', 'bad\nname.md', 'credentials.json', 'unknown.bin'):
            path = self.source / 'SISTEMA/skills/code/example' / name
            path.write_bytes(b'fixture')
            with self.assertRaises((M.Refused, OSError)):
                self.plan()
            path.unlink()
        large = self.source / 'SISTEMA/skills/code/example/large.md'
        with large.open('wb') as stream:
            stream.truncate(2_000_001)
        with self.assertRaises(M.Refused):
            self.plan()

    def test_secrets_are_blocked_without_echoing_matching_contents(self):
        values = [b'-----BEGIN PRIVATE KEY-----\nSECRET-CONTENT\n',
                  b'ghp_' + b'a' * 36, b'sk-proj-' + b'a' * 48, b'AKIA' + b'A' * 16]
        for value in values:
            write(self.source / SKILL, BODY + value)
            response = self.cli()
            self.assertNotEqual(response.returncode, 0)
            self.assertIn('content omitted', response.stderr)
            self.assertNotIn(value.decode(), response.stdout + response.stderr)
            self.assertFalse(self.plan_path.exists())

    def test_unsupported_git_indirection_and_hooks_are_not_executed(self):
        marker = self.base / 'hook-executed'
        hook = self.base / 'hook.sh'
        write(hook, ('#!/bin/sh\ntouch "' + str(marker) + '"\n').encode())
        hook.chmod(0o755)
        write(self.dest / '.git/config', ('[core]\n repositoryformatversion = 0\n bare = false\n fsmonitor = "' + str(hook) + '"\n hooksPath = "' + str(hook) + '"\n').encode())
        self.apply(self.plan())
        self.assertFalse(marker.exists())
        write(self.dest / '.git/config', b'[include]\n path = /does/not/exist\n')
        with self.assertRaises(M.Refused):
            self.plan()

    def test_crash_resume_each_write_ahead_boundary_retains_original(self):
        self.apply(self.plan())
        points = ['journal_written', 'staged', 'before_archive', 'after_archive', 'before_install',
                  'after_install', 'operation_recorded', 'before_ledger', 'after_ledger', 'committed']
        for point in points:
            with self.subTest(point=point):
                old = (self.dest / SKILL).read_bytes()
                new = old + ('\nrevision-' + point).encode()
                write(self.source / SKILL, new)
                plan = self.plan()
                def fail(name):
                    if name == point:
                        raise Crash(point)
                with mock.patch.object(M, 'checkpoint', fail), self.assertRaises(Crash):
                    self.apply(plan)
                result = self.apply(plan, resume=True)
                self.assertIn(result['status'], ('applied', 'already-applied'))
                self.assertEqual((self.dest / SKILL).read_bytes(), new)
                _, backup, _ = M.operation_paths(plan, 0)
                self.assertEqual((self.dest / backup).read_bytes(), old)

    def test_pending_transaction_blocks_new_plan_and_resume_rejects_foreign_edits(self):
        plan = self.plan()
        def fail(name):
            if name == 'after_install':
                raise Crash()
        with mock.patch.object(M, 'checkpoint', fail), self.assertRaises(Crash):
            self.apply(plan)
        with self.assertRaises(M.Refused):
            self.plan()
        write(self.dest / 'foreign.md', b'user note during interrupted mirror')
        before = self.files()
        with self.assertRaises(M.Refused):
            self.apply(plan, resume=True)
        self.assertEqual(before, self.files())

    def test_resume_requires_unchanged_source_and_valid_archived_original(self):
        self.apply(self.plan())
        write(self.source / SKILL, BODY + b'new')
        plan = self.plan()
        def fail(name):
            if name == 'after_archive':
                raise Crash()
        with mock.patch.object(M, 'checkpoint', fail), self.assertRaises(Crash):
            self.apply(plan)
        write(self.source / SKILL, BODY + b'newer after crash')
        before = self.files()
        with self.assertRaises(M.Refused):
            self.apply(plan, resume=True)
        self.assertEqual(before, self.files())
        _, backup, _ = M.operation_paths(plan, 0)
        self.assertEqual((self.dest / backup).read_bytes(), BODY)

    def test_late_unowned_file_cannot_be_overwritten_by_install(self):
        plan = self.plan()
        path = M.operations(plan)[0]['path']
        def race(name):
            if name == 'before_install':
                write(self.dest / path, b'user file created during mirror')
        with mock.patch.object(M, 'checkpoint', race), self.assertRaises((M.Refused, OSError)):
            self.apply(plan)
        self.assertEqual((self.dest / path).read_bytes(), b'user file created during mirror')
        with self.assertRaises((M.Refused, OSError)):
            self.apply(plan, resume=True)

    def test_late_original_edit_is_restored_without_clobbering(self):
        self.apply(self.plan())
        write(self.source / SKILL, BODY + b'new')
        plan = self.plan()
        def race(name):
            if name == 'before_archive':
                write(self.dest / SKILL, b'user edit racing the archive')
        with mock.patch.object(M, 'checkpoint', race), self.assertRaises(M.Refused):
            self.apply(plan)
        self.assertEqual((self.dest / SKILL).read_bytes(), b'user edit racing the archive')

    def test_source_change_in_visited_directory_detected_before_plan(self):
        write(self.source / 'SISTEMA/skills/z-last/real/SKILL.md', BODY)
        original = M.Tree.read
        changed = [False]
        def racing(tree, path, limit=32_000_000):
            value = original(tree, path, limit)
            if path.startswith('SISTEMA/skills/z-last/') and not changed[0]:
                changed[0] = True
                write(self.source / 'SISTEMA/skills/code/example/new.md', b'new arrival')
            return value
        with mock.patch.object(M.Tree, 'read', racing), self.assertRaises(M.Refused):
            self.plan()
        self.assertFalse((self.dest / M.CONTROL).exists())

    def test_case_or_unicode_spelling_conflict_preserves_existing_tree(self):
        alternate = 'SISTEMA/skills/CaseSensitive/real/SKILL.md'
        write(self.source / alternate, BODY)
        write(self.dest / 'SISTEMA/skills/casesensitive/README.md', b'user existing namespace')
        plan = self.plan()
        self.assertEqual(self.actions(plan)[alternate], 'preserve_spelling_conflict')
        self.apply(plan)
        self.assertFalse((self.dest / alternate).exists())
        self.assertEqual((self.dest / 'SISTEMA/skills/casesensitive/README.md').read_bytes(), b'user existing namespace')

    def test_plan_inside_roots_or_symlinked_plan_cannot_be_written(self):
        for path in (self.source / 'plan.json', self.dest / 'plan.json'):
            self.plan_path = path
            self.assertNotEqual(self.cli().returncode, 0)
            self.assertFalse(path.exists())
        self.plan_path = self.base / 'plan-link.json'
        self.plan_path.symlink_to(self.source / SKILL)
        self.assertNotEqual(self.cli().returncode, 0)
        self.assertEqual((self.source / SKILL).read_bytes(), BODY)
        with M.Tree(self.source) as source:
            with self.assertRaises(M.Refused):
                M.plan_for(source, source, HEAD, REF, HEAD)

    def test_enospc_before_journal_never_moves_any_original(self):
        self.apply(self.plan())
        write(self.source / SKILL, BODY + b'updated')
        plan = self.plan()
        before = (self.dest / SKILL).read_bytes()
        original = M.Tree.atomic
        def no_space(tree, path, data, replace=False, mode=0o600):
            if path == M.JOURNAL:
                raise OSError(errno.ENOSPC, 'Injected fixture disk full')
            return original(tree, path, data, replace, mode)
        with mock.patch.object(M.Tree, 'atomic', no_space), self.assertRaises(OSError):
            self.apply(plan)
        self.assertEqual((self.dest / SKILL).read_bytes(), before)
        self.apply(plan)
        self.assertEqual((self.dest / SKILL).read_bytes(), BODY + b'updated')

    def test_modified_archive_cannot_be_used_to_claim_successful_recovery(self):
        self.apply(self.plan())
        write(self.source / SKILL, BODY + b'updated')
        plan = self.plan()
        def fail(name):
            if name == 'after_archive':
                raise Crash()
        with mock.patch.object(M, 'checkpoint', fail), self.assertRaises(Crash):
            self.apply(plan)
        _, backup, _ = M.operation_paths(plan, 0)
        write(self.dest / backup, b'manually modified archive')
        before = self.files()
        with self.assertRaises(M.Refused):
            self.apply(plan, resume=True)
        self.assertEqual(before, self.files())

    def test_hardlinked_or_symlinked_control_state_is_refused(self):
        self.apply(self.plan())
        copy = self.base / 'ledger-copy.json'
        os.link(self.dest / M.LEDGER, copy)
        with self.assertRaises(M.Refused):
            self.plan()
        copy.unlink()
        (self.dest / M.LEDGER).rename(copy)
        (self.dest / M.LEDGER).symlink_to(copy)
        with self.assertRaises((M.Refused, OSError)):
            self.plan()

    def test_control_not_ignored_fails_before_plan_or_control_creation(self):
        (self.dest / '.gitignore').unlink()
        before = self.files()
        response = self.cli()
        self.assertNotEqual(response.returncode, 0)
        self.assertIn('fully ignored', response.stderr)
        self.assertEqual(before, self.files())
        self.assertFalse(self.plan_path.exists())
        self.assertFalse((self.dest / M.CONTROL).exists())

    def test_ignored_but_tracked_control_is_refused_despite_no_index_probe(self):
        write(self.dest / '.git/index', synthetic_index([M.LEDGER]))
        before = self.files()
        with self.assertRaisesRegex(M.Refused, 'already tracked'):
            self.plan()
        self.assertEqual(before, self.files())
        self.assertFalse((self.dest / M.CONTROL).exists())

    def test_ignore_rule_change_refuses_apply_before_control_write(self):
        plan = self.plan()
        write(self.dest / '.gitignore', b'# removed by user after review\n')
        self.fail_before_writes(plan)
        self.assertFalse((self.dest / M.CONTROL).exists())
        write(self.dest / '.gitignore', b'/.oracle-source-mirror/\n')
        plan = self.plan()
        write(self.dest / '.gitignore', b'/.oracle-source-mirror/\n# same rule but revised metadata\n')
        self.fail_before_writes(plan)
        self.assertFalse((self.dest / M.CONTROL).exists())

    def test_local_info_exclude_is_bound_and_never_modified(self):
        (self.dest / '.gitignore').unlink()
        write(self.dest / '.git/info/exclude', b'/.oracle-source-mirror/\n')
        before = (self.dest / '.git/info/exclude').read_bytes()
        plan = self.plan()
        self.assertIn('info/exclude', plan['git']['metadata'])
        self.assertTrue(plan['git']['control_ignored'])
        self.assertFalse(plan['git']['control_tracked'])
        write(self.dest / '.git/info/exclude', before + b'# changed since review\n')
        self.fail_before_writes(plan)
        plan = self.plan()
        self.apply(plan)
        self.assertEqual((self.dest / '.git/info/exclude').read_bytes(), before + b'# changed since review\n')

    def test_cli_success_and_refusal_omit_private_paths(self):
        response = self.cli()
        self.assertEqual(response.returncode, 0, response.stderr)
        for text in (str(self.source), str(self.dest), str(self.plan_path), SKILL):
            self.assertNotIn(text, response.stdout + response.stderr)
        response = self.cli('--apply', '--reviewed-plan-sha256', '0' * 64)
        self.assertNotEqual(response.returncode, 0)
        for text in (str(self.source), str(self.dest), str(self.plan_path), SKILL):
            self.assertNotIn(text, response.stdout + response.stderr)


def main():
    global RUN
    scratch = ROOT / '.work/publisher-worker'
    scratch.mkdir(parents=True, exist_ok=True)
    RUN = Path(tempfile.mkdtemp(prefix='run-', dir=scratch))
    for name in ('home', 'tmp'):
        (RUN / name).mkdir()
    result = unittest.TextTestRunner(verbosity=2).run(unittest.defaultTestLoader.loadTestsFromTestCase(MirrorTests))
    report = {'tests': result.testsRun, 'failures': len(result.failures), 'errors': len(result.errors),
              'synthetic': True, 'published': False, 'git_mutation_commands': [],
              'real_vault_accessed': False, 'dataless_flags_modeled': True, 'crashes_injected': True,
              'source_sha256': M.sha((ROOT / 'scripts/source-mirror.py').read_bytes()),
              'tests_sha256': M.sha(Path(__file__).read_bytes()), 'disposable_run': str(RUN)}
    (scratch / 'result.json').write_bytes(M.canonical(report))
    print(json.dumps(report, sort_keys=True), flush=True)
    return 0 if result.wasSuccessful() else 1


if __name__ == '__main__':
    sys.exit(main())
