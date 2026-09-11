#!/usr/bin/env python3
"""Reviewable, local-only source mirror. Never deletes a source/destination file.

--source is the OS root containing SISTEMA/skills; --destination is a standalone
Git checkout. Planning writes only --plan. Applying requires its reviewed hash.
No Git mutation, network operation, package execution, or hydration is provided.
"""
import argparse
import contextlib
import ctypes
import errno
import fcntl
import hashlib
import json
import os
from pathlib import Path
import re
import stat
import subprocess
import sys
import unicodedata
import uuid

from catalog_safety import check_publication_bytes

PREFIX = 'SISTEMA/skills'
CONTROL = '.oracle-source-mirror'
LEDGER = CONTROL + '/ownership.json'
JOURNAL = CONTROL + '/journal.json'
KIND = 'oracle-source-mirror-plan'
EXTENSIONS = set('md txt json yaml yml py js ts sh toml css html csv sql svg png jpg jpeg webp'.split())
IMAGES = set('png jpg jpeg webp'.split())
LICENSES = {'LICENSE', 'LICENCE', 'NOTICE', 'COPYING'}
MAX_FILES, MAX_SOURCE, MAX_DESTINATION = 5000, 50_000_000, 200_000_000
NOFOLLOW = getattr(os, 'O_NOFOLLOW', 0)
DIRECTORY = getattr(os, 'O_DIRECTORY', 0)
DATALESS = 0x40000000


class Refused(Exception):
    """Safe diagnostic: never include file bytes, tokens, or Git stderr."""


def require(condition, message):
    if not condition:
        raise Refused(message)


def canonical(value):
    return json.dumps(value, sort_keys=True, ensure_ascii=True, separators=(',', ':')).encode()


def sha(data):
    return hashlib.sha256(data).hexdigest()


def unique_json(pairs):
    result = {}
    for key, value in pairs:
        require(key not in result, 'Duplicate JSON key refused')
        result[key] = value
    return result


def decode(data):
    try:
        return json.loads(data, object_pairs_hook=unique_json)
    except (ValueError, UnicodeError):
        raise Refused('Invalid JSON; original files preserved') from None


def relative(path):
    require(isinstance(path, str) and path and len(path.encode()) <= 700,
            'Invalid or oversized relative path')
    require(not path.startswith('/') and '\\' not in path and
            not any(ord(c) < 32 or ord(c) == 127 for c in path), 'Unsafe relative path')
    require(all(piece not in ('', '.', '..') for piece in path.split('/')), 'Unsafe path component')
    return path


def absolute(path):
    path = os.fspath(path)
    require('..' not in Path(path).parts and '\\' not in path and
            not any(ord(c) < 32 or ord(c) == 127 for c in path), 'Unsafe root path')
    return Path(os.path.abspath(path))


def check_stat(info, directory=False):
    require(not (getattr(info, 'st_flags', 0) & DATALESS), 'Dataless item refused; no hydration attempted')
    require(stat.S_ISDIR(info.st_mode) if directory else stat.S_ISREG(info.st_mode),
            'Symlink or nonregular filesystem item refused')
    require(directory or info.st_nlink == 1, 'Hardlinked file refused')
    require(info.st_mode & (0o444 if not directory else 0o444) and
            (not directory or info.st_mode & 0o111), 'Inaccessible item refused')


def identity(info, directory=False):
    result = {'kind': 'directory' if directory else 'file', 'dev': info.st_dev,
              'ino': info.st_ino, 'mode': stat.S_IMODE(info.st_mode)}
    if not directory:
        result.update(size=info.st_size, mtime_ns=info.st_mtime_ns, ctime_ns=info.st_ctime_ns)
    return result


def moved_identity(info):
    return {key: value for key, value in info.items() if key != 'ctime_ns'}


def checkpoint(name):
    """Test injection point, not a CLI or environment-variable escape hatch."""


def rename_exclusive(source_fd, source_name, destination_fd, destination_name):
    """Atomic no-clobber rename; fail closed on filesystems without support."""
    libc = ctypes.CDLL(None, use_errno=True)
    if sys.platform == 'darwin':
        fn, flag = getattr(libc, 'renameatx_np', None), 0x00000004  # RENAME_EXCL
    elif sys.platform.startswith('linux'):
        fn, flag = getattr(libc, 'renameat2', None), 1  # RENAME_NOREPLACE
    else:
        fn, flag = None, 0
    require(fn is not None, 'Atomic exclusive rename unavailable on this platform')
    fn.argtypes = [ctypes.c_int, ctypes.c_char_p, ctypes.c_int, ctypes.c_char_p, ctypes.c_uint]
    fn.restype = ctypes.c_int
    if fn(source_fd, os.fsencode(source_name), destination_fd, os.fsencode(destination_name), flag):
        raise OSError(ctypes.get_errno(), 'Exclusive rename refused; no existing target overwritten')
    os.fsync(source_fd)
    if destination_fd != source_fd:
        os.fsync(destination_fd)


class Tree:
    """Directory-descriptor anchored access. Never follows any path component."""
    def __init__(self, path):
        require(NOFOLLOW and DIRECTORY, 'Filesystem no-follow support is required')
        self.path = absolute(path)
        fd = os.open('/', os.O_RDONLY | DIRECTORY | NOFOLLOW)
        try:
            for piece in self.path.parts[1:]:
                fd_new = self._child(fd, piece)
                os.close(fd)
                fd = fd_new
            self.fd = fd
            self.root_identity = identity(os.fstat(fd), True)
        except BaseException:
            os.close(fd)
            raise

    @staticmethod
    def _child(fd, piece):
        before = os.stat(piece, dir_fd=fd, follow_symlinks=False)
        check_stat(before, True)
        child = os.open(piece, os.O_RDONLY | DIRECTORY | NOFOLLOW, dir_fd=fd)
        try:
            require(identity(os.fstat(child), True) == identity(before, True), 'Directory changed during open')
        except BaseException:
            os.close(child)
            raise
        return child

    def __enter__(self):
        return self

    def __exit__(self, *unused):
        os.close(self.fd)

    @contextlib.contextmanager
    def directory(self, path=''):
        fd = os.dup(self.fd)
        try:
            if path:
                for part in relative(path).split('/'):
                    new = self._child(fd, part)
                    os.close(fd)
                    fd = new
            yield fd
        finally:
            os.close(fd)

    def assert_attached(self):
        with Tree(self.path) as current:
            require(current.root_identity == self.root_identity, 'Root directory replaced; stop and review again')

    def stat(self, path):
        relative(path)
        parent, _, name = path.rpartition('/')
        try:
            with self.directory(parent) as fd:
                return os.stat(name, dir_fd=fd, follow_symlinks=False)
        except FileNotFoundError:
            return None

    def read(self, path, limit=32_000_000):
        relative(path)
        parent, _, name = path.rpartition('/')
        with self.directory(parent) as fd:
            before = os.stat(name, dir_fd=fd, follow_symlinks=False)
            check_stat(before)
            require(before.st_size <= limit, 'File exceeds bounded preflight budget')
            opened = os.open(name, os.O_RDONLY | NOFOLLOW | getattr(os, 'O_NONBLOCK', 0), dir_fd=fd)
            with os.fdopen(opened, 'rb') as stream:
                info = os.fstat(stream.fileno())
                check_stat(info)
                require(identity(info) == identity(before), 'File changed before read')
                data = stream.read(limit + 1)
                after = os.fstat(stream.fileno())
            current = os.stat(name, dir_fd=fd, follow_symlinks=False)
            check_stat(after)
            check_stat(current)
            require(len(data) == before.st_size and identity(after) == identity(before) == identity(current),
                    'File changed during read')
            return data, dict(identity(current), sha256=sha(data))

    def json(self, path):
        if self.stat(path) is None:
            return None
        return decode(self.read(path)[0])

    def mkdirs(self, path, mode=0o755):
        self.assert_attached()
        fd = os.dup(self.fd)
        try:
            for part in relative(path).split('/'):
                created = False
                try:
                    os.mkdir(part, mode=mode, dir_fd=fd)
                    created = True
                    os.fsync(fd)
                except FileExistsError:
                    pass
                new = self._child(fd, part)
                if created:
                    os.fchmod(new, mode)
                    os.fsync(new)
                os.close(fd)
                fd = new
        finally:
            os.close(fd)

    def atomic(self, path, data, replace=False, mode=0o600):
        """Replacement is reserved for this program's own journal and ledger."""
        self.assert_attached()
        relative(path)
        require(not replace or path in (LEDGER, JOURNAL), 'Replacing an unowned file is forbidden')
        parent, _, name = path.rpartition('/')
        with self.directory(parent) as fd:
            if self.stat(path) is not None:
                require(replace, 'Output already exists; preserve it and select a new plan filename')
                check_stat(os.stat(name, dir_fd=fd, follow_symlinks=False))
            temporary = '.mirror-tmp-' + uuid.uuid4().hex
            out = os.open(temporary, os.O_WRONLY | os.O_CREAT | os.O_EXCL | NOFOLLOW, mode, dir_fd=fd)
            try:
                with os.fdopen(out, 'wb') as stream:
                    stream.write(data)
                    stream.flush()
                    os.fchmod(stream.fileno(), mode)
                    os.fsync(stream.fileno())
                if replace:
                    os.replace(temporary, name, src_dir_fd=fd, dst_dir_fd=fd)
                    os.fsync(fd)
                else:
                    rename_exclusive(fd, temporary, fd, name)
            finally:
                # Only the just-created private temporary name, never a source or destination original.
                try:
                    os.unlink(temporary, dir_fd=fd)
                except FileNotFoundError:
                    pass

    def move(self, source, destination):
        self.assert_attached()
        relative(source)
        relative(destination)
        sp, _, sn = source.rpartition('/')
        dp, _, dn = destination.rpartition('/')
        with self.directory(sp) as sfd, self.directory(dp) as dfd:
            check_stat(os.stat(sn, dir_fd=sfd, follow_symlinks=False))
            rename_exclusive(sfd, sn, dfd, dn)

    def inventory(self, prefix='', source=False):
        rows, blobs, names, byte_count, file_count = {}, {}, set(), [0], [0]

        def record_stat(info, directory=False):
            record = identity(info, directory)
            if source and directory:
                record.update(mtime_ns=info.st_mtime_ns, ctime_ns=info.st_ctime_ns)
            return record

        def walk(fd, path):
            before = os.fstat(fd)
            check_stat(before, True)
            rows[path or '.'] = record_stat(before, True)
            require(len(rows) <= 20000, 'Inventory exceeds directory budget')
            children = sorted(os.listdir(fd))
            for name in children:
                full = (path + '/' if path else '') + name
                relative(full)
                key = unicodedata.normalize('NFC', full).casefold()
                require(key not in names, 'Case/Unicode path collision refused')
                names.add(key)
                info = os.stat(name, dir_fd=fd, follow_symlinks=False)
                # Git metadata and mirror control are not sources, release assets, or user-file ownership.
                if not path and not source and name in ('.git', CONTROL):
                    check_stat(info, True)
                    continue
                if source:
                    require(not name.startswith('.'), 'Hidden source item refused')
                if stat.S_ISDIR(info.st_mode):
                    child = self._child(fd, name)
                    try:
                        walk(child, full)
                    finally:
                        os.close(child)
                else:
                    check_stat(info)
                    limit = 32_000_000
                    if source:
                        extension = Path(name).suffix.lstrip('.').lower()
                        require(extension in EXTENSIONS or name.upper() in LICENSES, 'Unsupported source file type')
                        require(len(full.split('/')) >= 4 and full.startswith(PREFIX + '/'), 'Source outside skill collection')
                        require(name.casefold() not in ('credentials.json', 'token.json', 'secrets.json'), 'Credential file refused')
                        limit = 5_000_000 if extension in IMAGES else 2_000_000
                    data, record = self.read(full, limit)
                    byte_count[0] += len(data)
                    require(byte_count[0] <= (MAX_SOURCE if source else MAX_DESTINATION), 'Inventory exceeds total byte budget')
                    rows[full] = record
                    file_count[0] += 1
                    require(len(rows) <= 20000 and file_count[0] <= (MAX_FILES if source else 10000), 'Inventory exceeds file budget')
                    if source:
                        try:
                            check_publication_bytes(full, data)
                            check_publication_bytes('source-path', full.encode())
                        except ValueError:
                            raise Refused('Credential-like source material refused; content omitted') from None
                        blobs[full] = data
            after = os.fstat(fd)
            require(children == sorted(os.listdir(fd)) and before.st_mtime_ns == after.st_mtime_ns and
                    before.st_ctime_ns == after.st_ctime_ns, 'Directory inventory changed during preflight')

        with self.directory(prefix) as fd:
            walk(fd, prefix)
        self.assert_attached()
        for path, expected in rows.items():
            info = os.fstat(self.fd) if path == '.' else self.stat(path)
            if info is not None:
                check_stat(info, expected['kind'] == 'directory')
            require(info is not None and record_stat(info, expected['kind'] == 'directory') ==
                    {k: v for k, v in expected.items() if k != 'sha256'}, 'Inventory changed after preflight')
        if source:
            require(blobs and any(p.endswith('/SKILL.md') for p in blobs), 'Missing or empty complete skill source refused')
        return rows, blobs


def git_state(destination, expected_head, remote_ref, remote_head):
    for value in (expected_head, remote_head):
        require(isinstance(value, str) and re.fullmatch(r'(?:[0-9a-f]{40}|[0-9a-f]{64})', value), 'Expected full Git object ID required')
    relative(remote_ref)
    require(re.fullmatch(r'refs/remotes/[A-Za-z0-9][A-Za-z0-9._/-]*', remote_ref) and
            '..' not in remote_ref and not remote_ref.endswith('.lock'), 'Expected local remote-tracking ref required')
    info = destination.stat('.git')
    require(info is not None, 'Destination must be the root of a standalone Git checkout')
    check_stat(info, True)
    # Do not traverse external gitdir/alternates or included private Git configuration.
    for name in ('commondir', 'gitdir', 'objects/info/alternates'):
        require(destination.stat('.git/' + name) is None, 'External Git metadata indirection refused')
    fingerprints = {}
    metadata_paths = [(name, '.git/' + name) for name in ('HEAD', 'config', 'index', 'packed-refs', 'info/exclude')]
    metadata_paths.append(('.gitignore', '.gitignore'))
    for name, path in metadata_paths:
        if destination.stat(path) is not None:
            data, record = destination.read(path)
            if name == 'config':
                require(not re.search(rb'(?im)^\s*\[\s*(?:include|includeif|extensions)\b', data),
                        'Included or extended Git config requires separate qualification')
            fingerprints[name] = record
    # Validate the ref paths before Git can traverse them. No object traversal is required by rev-parse.
    head_data = destination.read('.git/HEAD', 4096)[0].decode('ascii', 'strict').strip()
    refs = [remote_ref]
    if head_data.startswith('ref: '):
        local_ref = relative(head_data[5:])
        require(local_ref.startswith('refs/heads/'), 'Local branch ref required')
        refs.append(local_ref)
    for ref in refs:
        if destination.stat('.git/' + ref) is not None:
            destination.read('.git/' + ref, 4096)
    environment = {'PATH': '/usr/bin:/bin', 'HOME': str(destination.path / CONTROL / 'unused-home'),
                   'GIT_CONFIG_NOSYSTEM': '1', 'GIT_CONFIG_SYSTEM': '/dev/null', 'GIT_CONFIG_GLOBAL': '/dev/null',
                   'GIT_OPTIONAL_LOCKS': '0', 'GIT_NO_LAZY_FETCH': '1', 'GIT_NO_REPLACE_OBJECTS': '1',
                   'GIT_TERMINAL_PROMPT': '0', 'LC_ALL': 'C'}

    def query(command, *args, strip=True, allow_unmatched=False, input_bytes=None):
        standard_input = {'stdin': subprocess.DEVNULL} if input_bytes is None else {'input': input_bytes}
        result = subprocess.run(['/usr/bin/git', '--no-optional-locks', '-c', 'core.fsmonitor=false',
                                 '-c', 'core.hooksPath=/dev/null', '-c', 'core.excludesFile=/dev/null', '-c', 'protocol.allow=never',
                                 '-C', str(destination.path), command, *args],
                                env=environment, capture_output=True, timeout=10, **standard_input)
        require(result.returncode == 0 or allow_unmatched and result.returncode == 1, 'Read-only Git identity check failed')
        value = result.stdout.decode('utf-8', 'strict')
        return value.strip() if strip else value

    require(query('rev-parse', '--show-toplevel') == str(destination.path), 'Destination is not checkout root')
    require(query('rev-parse', '--absolute-git-dir') == str(destination.path / '.git'), 'External Git directory refused')
    head = query('rev-parse', '--verify', '--end-of-options', 'HEAD')
    base = query('rev-parse', '--verify', '--end-of-options', remote_ref)
    tracked = sorted(set(p for p in query('ls-files', '--cached', '-z', strip=False).split('\0') if p))
    for path in tracked:
        relative(path)
    require(not any(unicodedata.normalize('NFC', p).casefold() == CONTROL or
                    unicodedata.normalize('NFC', p).casefold().startswith(CONTROL + '/') for p in tracked),
            'Mirror control is already tracked; stop for a separate privacy review')
    # --no-index is used only AFTER independently rejecting every tracked control path.
    # Probe the directory itself, not just a child matched by an incomplete ignore rule.
    probes = [CONTROL + '/', CONTROL + '/ownership.json', CONTROL + '/transactions/reviewed/plan.json']
    ignored = query('check-ignore', '--no-index', '-z', '--stdin', strip=False, allow_unmatched=True,
                    input_bytes=('\0'.join(probes) + '\0').encode())
    require(set(ignored.split('\0')) - {''} == set(probes),
            'Mirror control must be fully ignored by checkout-local Git rules before planning or applying')
    require(head == expected_head, 'Local Git HEAD changed or mismatches expected HEAD')
    require(base == remote_head, 'Local remote-base ref changed or mismatches expected base')
    destination.assert_attached()
    return {'head': head, 'remote_base_ref': remote_ref, 'remote_base_head': base,
            'head_reference': head_data, 'metadata': fingerprints, 'git_directory': identity(info, True),
            'remote_sync': 'unverified-no-fetch', 'local_equals_base': head == base, 'tracked_paths': tracked,
            'control_ignored': True, 'control_tracked': False}


def ledger_value(source, destination):
    value = destination.json(LEDGER)
    if value is None:
        return {'schema_version': 1, 'source_root': str(source.path), 'destination_root': str(destination.path), 'owned': {}}
    require(isinstance(value, dict) and value.get('schema_version') == 1 and isinstance(value.get('owned'), dict), 'Invalid ownership ledger')
    require(value.get('source_root') == str(source.path) and value.get('destination_root') == str(destination.path), 'Ownership belongs to different roots')
    for path, record in value['owned'].items():
        relative(path)
        require(path.startswith(PREFIX + '/') and isinstance(record, dict) and
                re.fullmatch(r'[0-9a-f]{64}', record.get('sha256', '')) and
                isinstance(record.get('mode'), int) and 0 <= record['mode'] <= 0o777, 'Invalid ownership entry')
    return value


def actions_for(source_rows, destination_rows, ledger, tracked=()):
    output = []
    tracked = set(tracked)
    spelling = {unicodedata.normalize('NFC', p).casefold(): p for p in set(destination_rows) | tracked}
    files = {p: r for p, r in source_rows.items() if r['kind'] == 'file'}
    for path in sorted(set(files) | set(ledger['owned'])):
        src, dest, owned = files.get(path), destination_rows.get(path), ledger['owned'].get(path)
        if not src:
            action = 'preserve_source_deleted'
        elif any(spelling.get(unicodedata.normalize('NFC', parent).casefold(), parent) != parent
                 for parent in ('/'.join(path.split('/')[:i]) for i in range(1, len(path.split('/')) + 1))):
            action = 'preserve_spelling_conflict'
        elif any(destination_rows.get('/'.join(path.split('/')[:i]), {}).get('kind') == 'file' or
                 '/'.join(path.split('/')[:i]) in tracked
                 for i in range(1, len(path.split('/')))):
            action = 'preserve_parent_conflict'
        elif dest is None:
            action = 'preserve_destination_deleted' if owned else 'preserve_unowned_deleted' if path in tracked else 'add'
        elif not owned:
            action = 'preserve_unowned'
        elif dest['kind'] != 'file' or any(dest.get(k) != owned[k] for k in ('sha256', 'mode')):
            action = 'preserve_user_edit'
        else:
            action = 'unchanged' if src['sha256'] == dest['sha256'] else 'update'
        output.append({'path': path, 'action': action,
                       'source_sha256': src['sha256'] if src else None,
                       'before': dest, 'mode': dest['mode'] if action == 'update' else 0o644})
    return output


def plan_for(source, destination, expected_head, remote_ref, remote_head):
    require(source.path != destination.path and not source.path.is_relative_to(destination.path) and
            not destination.path.is_relative_to(source.path), 'Source and destination must not overlap')
    active = destination.json(JOURNAL)
    require(not active or active.get('state') == 'committed', 'Pending transaction: resume its reviewed plan first')
    git = git_state(destination, expected_head, remote_ref, remote_head)
    source_rows, _ = source.inventory(PREFIX, source=True)
    dest_rows, _ = destination.inventory()
    ledger = ledger_value(source, destination)
    plan = {'schema_version': 1, 'kind': KIND, 'source_root': str(source.path), 'destination_root': str(destination.path),
            'source_identity': source.root_identity, 'destination_identity': destination.root_identity,
            'source_snapshot': source_rows, 'destination_snapshot': dest_rows, 'ownership_before': ledger,
            'git': git, 'actions': actions_for(source_rows, dest_rows, ledger, git['tracked_paths']),
            'deletion_policy': 'retain-all-originals', 'published': False, 'release_asset': False,
            'content_and_license_review_required': True}
    require(git_state(destination, expected_head, remote_ref, remote_head) == git, 'Git metadata changed during planning')
    plan['plan_sha256'] = sha(canonical(plan))
    return plan


def plan_hash(plan):
    return sha(canonical({k: v for k, v in plan.items() if k != 'plan_sha256'}))


def operations(plan):
    return [a for a in plan['actions'] if a['action'] in ('add', 'update')]


def transaction_root(plan):
    return CONTROL + '/transactions/' + plan['plan_sha256']


def operation_paths(plan, index):
    root = transaction_root(plan) + '/' + str(index).zfill(5)
    return root + '.stage', root + '.before', root + '.receipt.json'


def next_ledger(plan):
    value = decode(canonical(plan['ownership_before']))
    for action in operations(plan):
        value['owned'][action['path']] = {'sha256': action['source_sha256'], 'mode': action['mode']}
    return value


def verify_effects(destination, plan, journal):
    """Allow only the journal's proven renames, never arbitrary matching bytes."""
    expected = decode(canonical(plan['destination_snapshot']))
    ops = operations(plan)
    allowed_directories = set()
    for item in ops:
        for i in range(1, len(item['path'].split('/'))):
            allowed_directories.add('/'.join(item['path'].split('/')[:i]))
    for index, item in enumerate(ops):
        stage, backup, receipt = operation_paths(plan, index)
        if index < journal['cursor']:
            proof = destination.json(receipt)
            require(isinstance(proof, dict) and proof.get('path') == item['path'], 'Missing completed operation receipt')
            expected[item['path']] = proof['after']
        elif index == journal['cursor'] and journal['phase'] in ('install_intent', 'installed'):
            current = destination.stat(item['path'])
            if current is not None and destination.stat(stage) is None:
                current = destination.read(item['path'])[1]
                require(journal.get('staged') and moved_identity(current) == moved_identity(journal['staged']), 'Unexpected destination; not the journaled staged file')
                expected[item['path']] = current
            elif item['action'] == 'update':
                expected.pop(item['path'], None)
        elif index == journal['cursor'] and journal['phase'] in ('archive_intent', 'archived'):
            if destination.stat(backup) is not None:
                expected.pop(item['path'], None)
        if item['action'] == 'update' and (index < journal['cursor'] or destination.stat(backup) is not None):
            archived = destination.read(backup)[1]
            require(moved_identity(archived) == moved_identity(item['before']), 'Archived original changed; retained for manual recovery')
    actual, _ = destination.inventory()
    for path in set(actual) - set(expected):
        require(path in allowed_directories and actual[path]['kind'] == 'directory' and actual[path]['mode'] == 0o755,
                'Unexpected destination addition; transaction stopped')
    for path, record in expected.items():
        require(actual.get(path) == record, 'Destination changed since review or transaction receipt')
    return actual


def save_journal(destination, journal):
    destination.atomic(JOURNAL, canonical(journal), replace=destination.stat(JOURNAL) is not None)


@contextlib.contextmanager
def transaction_lock(destination):
    destination.mkdirs(CONTROL, 0o700)
    with destination.directory(CONTROL) as fd:
        lock = os.open('lock', os.O_RDWR | os.O_CREAT | NOFOLLOW, 0o600, dir_fd=fd)
        try:
            check_stat(os.fstat(lock))
            try:
                fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
            except BlockingIOError:
                raise Refused('Another source-mirror operation holds the local lock') from None
            yield
        finally:
            os.close(lock)


def execute(source, destination, plan, reviewed_hash, expected_head, remote_ref, remote_head, resume=False):
    require(isinstance(plan, dict) and plan.get('kind') == KIND and plan.get('schema_version') == 1, 'Not a source mirror plan')
    require(re.fullmatch(r'[0-9a-f]{64}', reviewed_hash or '') and plan.get('plan_sha256') == reviewed_hash == plan_hash(plan),
            'Reviewed plan hash mismatch')
    require(plan.get('source_root') == str(source.path) and plan.get('destination_root') == str(destination.path) and
            plan.get('source_identity') == source.root_identity and plan.get('destination_identity') == destination.root_identity,
            'Reviewed roots changed')
    require(git_state(destination, expected_head, remote_ref, remote_head) == plan['git'], 'Reviewed Git state changed')
    source_rows, blobs = source.inventory(PREFIX, source=True)
    require(source_rows == plan['source_snapshot'], 'Source changed since review')
    require(actions_for(plan['source_snapshot'], plan['destination_snapshot'], plan['ownership_before'], plan['git']['tracked_paths']) == plan['actions'],
            'Plan actions differ from ownership-preserving policy')
    if not resume:
        require(plan_for(source, destination, expected_head, remote_ref, remote_head) == plan, 'Destination or ownership changed since review')
    with transaction_lock(destination):
        active = destination.json(JOURNAL)
        if resume:
            require(active and active.get('plan_sha256') == reviewed_hash, 'No matching pending or completed journal')
            require(destination.json(transaction_root(plan) + '/plan.json') == plan, 'Journal plan changed')
            journal = active
        else:
            require(not active or active.get('state') == 'committed', 'Pending transaction must be resumed')
            # Recheck after obtaining the lock: a racing cooperating mirror cannot be silently accepted.
            require(destination.inventory()[0] == plan['destination_snapshot'] and
                    ledger_value(source, destination) == plan['ownership_before'], 'Destination changed before journal')
            destination.mkdirs(transaction_root(plan), 0o700)
            saved_plan = transaction_root(plan) + '/plan.json'
            if destination.stat(saved_plan) is None:
                destination.atomic(saved_plan, canonical(plan))
            else:
                require(destination.json(saved_plan) == plan, 'Existing transaction plan differs')
            journal = {'schema_version': 1, 'plan_sha256': reviewed_hash, 'state': 'applying', 'cursor': 0,
                       'phase': 'ready', 'staged': None}
            save_journal(destination, journal)
            checkpoint('journal_written')
        require(journal.get('schema_version') == 1 and journal.get('state') in ('applying', 'committed') and
                isinstance(journal.get('cursor'), int) and 0 <= journal['cursor'] <= len(operations(plan)), 'Invalid journal')
        owned = ledger_value(source, destination)
        require(owned == plan['ownership_before'] or
                journal['cursor'] == len(operations(plan)) and owned == next_ledger(plan), 'Ownership changed during transaction')
        verify_effects(destination, plan, journal)
        if journal['state'] == 'committed':
            require(owned == next_ledger(plan), 'Committed ownership receipt changed')
            return summary(plan, 'already-applied')
        for index in range(journal['cursor'], len(operations(plan))):
            item = operations(plan)[index]
            stage, backup, receipt = operation_paths(plan, index)
            require(git_state(destination, expected_head, remote_ref, remote_head) == plan['git'], 'Git changed during application')
            source.assert_attached()
            if journal['phase'] == 'ready':
                if destination.stat(stage) is None:
                    destination.atomic(stage, blobs[item['path']], mode=item['mode'])
                staged = destination.read(stage)[1]
                require(staged['sha256'] == item['source_sha256'] and staged['mode'] == item['mode'], 'Invalid staged source file')
                journal.update(phase='staged', staged=staged)
                save_journal(destination, journal)
                checkpoint('staged')
            if journal['phase'] == 'staged':
                require(moved_identity(destination.read(stage)[1]) == moved_identity(journal['staged']), 'Staged file changed')
                parent = item['path'].rpartition('/')[0]
                if parent:
                    destination.mkdirs(parent)
                journal['phase'] = 'archive_intent' if item['action'] == 'update' else 'install_intent'
                save_journal(destination, journal)
            if journal['phase'] == 'archive_intent':
                if destination.stat(backup) is None:
                    require(destination.read(item['path'])[1] == item['before'], 'Owned file was edited; original preserved')
                    checkpoint('before_archive')
                    destination.move(item['path'], backup)
                    checkpoint('after_archive')
                if moved_identity(destination.read(backup)[1]) != moved_identity(item['before']):
                    # A noncooperating writer raced the rename. Restore only to an empty path, never overwrite.
                    if destination.stat(item['path']) is None:
                        destination.move(backup, item['path'])
                    raise Refused('Original changed during archive; preserved, review recovery manually')
                journal['phase'] = 'archived'
                save_journal(destination, journal)
            if journal['phase'] == 'archived':
                journal['phase'] = 'install_intent'
                save_journal(destination, journal)
            if journal['phase'] == 'install_intent':
                if destination.stat(stage) is not None:
                    require(moved_identity(destination.read(stage)[1]) == moved_identity(journal['staged']), 'Staged bytes changed')
                    checkpoint('before_install')
                    destination.move(stage, item['path'])  # Atomic exclusive: never clobbers a late unowned file.
                    checkpoint('after_install')
                after = destination.read(item['path'])[1]
                require(moved_identity(after) == moved_identity(journal['staged']), 'Installed file does not match staged identity')
                journal['phase'] = 'installed'
                save_journal(destination, journal)
            require(journal['phase'] == 'installed', 'Unknown journal phase')
            proof = {'path': item['path'], 'after': destination.read(item['path'])[1]}
            if destination.stat(receipt) is None:
                destination.atomic(receipt, canonical(proof))
            else:
                require(destination.json(receipt) == proof, 'Operation receipt changed')
            journal.update(cursor=index + 1, phase='ready', staged=None)
            save_journal(destination, journal)
            checkpoint('operation_recorded')
        require(source.inventory(PREFIX, source=True)[0] == plan['source_snapshot'], 'Source changed during application; resume refused until reviewed')
        require(git_state(destination, expected_head, remote_ref, remote_head) == plan['git'], 'Git changed before final receipt')
        verify_effects(destination, plan, journal)
        checkpoint('before_ledger')
        destination.atomic(LEDGER, canonical(next_ledger(plan)), replace=destination.stat(LEDGER) is not None)
        checkpoint('after_ledger')
        journal['state'] = 'committed'
        save_journal(destination, journal)
        checkpoint('committed')
        return summary(plan, 'applied')


def summary(plan, status):
    counts = {}
    for item in plan['actions']:
        counts[item['action']] = counts.get(item['action'], 0) + 1
    return {'status': status, 'kind': KIND, 'plan_sha256': plan['plan_sha256'], 'actions': counts,
            'published': False, 'release_asset': False, 'remote_sync': 'unverified-no-fetch',
            'deleted_files': 0, 'content_and_license_review_required': True}


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', required=True, type=Path)
    parser.add_argument('--destination', required=True, type=Path)
    parser.add_argument('--plan', required=True, type=Path, help='New dry-run JSON path, or existing reviewed plan for apply/resume')
    parser.add_argument('--expected-head', required=True)
    parser.add_argument('--remote-base-ref', default='refs/remotes/origin/main')
    parser.add_argument('--remote-base-head', required=True, help='Previously reviewed LOCAL tracking OID, not a remote freshness assertion')
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument('--apply', action='store_true')
    mode.add_argument('--resume', action='store_true')
    parser.add_argument('--reviewed-plan-sha256')
    args = parser.parse_args(argv)
    try:
        plan_path = absolute(args.plan)
        with Tree(args.source) as source, Tree(args.destination) as destination, Tree(plan_path.parent) as plans:
            require(not plan_path.is_relative_to(source.path) and not plan_path.is_relative_to(destination.path),
                    'Plan must be outside both source and destination')
            if args.apply or args.resume:
                plan = plans.json(plan_path.name)
                result = execute(source, destination, plan, args.reviewed_plan_sha256, args.expected_head,
                                 args.remote_base_ref, args.remote_base_head, resume=args.resume)
            else:
                require(not args.reviewed_plan_sha256, 'Review hash is only used by apply/resume')
                plan = plan_for(source, destination, args.expected_head, args.remote_base_ref, args.remote_base_head)
                plans.atomic(plan_path.name, canonical(plan))
                result = summary(plan, 'dry-run')
            print(json.dumps(result, sort_keys=True))
        return 0
    except (Refused, OSError, ValueError, KeyError, TypeError, subprocess.SubprocessError):
        # Do not echo arbitrary exception text: malformed metadata or Git output may include secrets.
        error = sys.exc_info()[1]
        print(json.dumps({'status': 'refused', 'reason': str(error) if isinstance(error, Refused) else
                          'Filesystem, metadata, or read-only Git check failed; originals retained',
                          'published': False}), file=sys.stderr)
        return 2


if __name__ == '__main__':
    sys.exit(main())
