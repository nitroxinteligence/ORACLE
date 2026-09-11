#!/usr/bin/env python3
"""Assemble tested bytes in a NEW macOS validation bundle, never install/publish.
No compiler, dependency install, Git mutation, network, real signing key or skill
execution. Public shared catalog bytes are selected by their reviewed manifest.
"""
from __future__ import annotations
import argparse
import contextlib
import datetime
import hashlib
import json
import os
from pathlib import Path
import plistlib
import stat
import subprocess
import sys
import unicodedata

ROOT = Path(__file__).resolve().parent.parent
BRANCH = 'codex/oracle-onboarding-implementation-20260910'
HEAD = 'f14382479cb769f8b57cf5d38db27acf0947a243'
DATALESS = 0x40000000
MAX_FILE = 512_000_000
MAX_BUNDLE = 1_500_000_000

class Refused(Exception):
    """Safe diagnostic without contents, secrets or personal state."""

def require(condition, message):
    if not condition:
        raise Refused(message)

def encoded(value):
    return json.dumps(value, sort_keys=True, ensure_ascii=True, separators=(',', ':')).encode()

def sha(data):
    return hashlib.sha256(data).hexdigest()

def unique_json(pairs):
    result = {}
    for key, value in pairs:
        require(key not in result, 'Duplicate metadata key')
        result[key] = value
    return result

def relative(value):
    require(isinstance(value, str) and value and len(value.encode()) <= 1400, 'Invalid resource name')
    require(not value.startswith('/') and '\\' not in value and
            all(p not in ('', '.', '..') for p in value.split('/')) and
            not any(ord(c) < 32 or ord(c) == 127 for c in value), 'Unsafe resource path')
    return value

def identity(info):
    return tuple(getattr(info, k) for k in
                 ('st_dev','st_ino','st_size','st_mode','st_nlink','st_mtime_ns','st_ctime_ns'))

def safe_stat(info, directory=False):
    require(not getattr(info, 'st_flags', 0) & DATALESS, 'Dataless input refused; no hydration')
    require(stat.S_ISDIR(info.st_mode) if directory else stat.S_ISREG(info.st_mode),
            'Linked or nonregular input refused')
    require(directory or info.st_nlink == 1, 'Hardlinked input refused')
    require(not info.st_mode & (stat.S_ISUID | stat.S_ISGID), 'Privileged input mode refused')

@contextlib.contextmanager
def directory(path):
    path = Path(path)
    require(path.is_absolute() and '..' not in path.parts, 'Absolute normalized directory required')
    fd = os.open('/', os.O_RDONLY | os.O_DIRECTORY | os.O_NOFOLLOW)
    try:
        for part in path.parts[1:]:
            before = os.stat(part, dir_fd=fd, follow_symlinks=False)
            safe_stat(before, True)
            child = os.open(part, os.O_RDONLY | os.O_DIRECTORY | os.O_NOFOLLOW, dir_fd=fd)
            if identity(os.fstat(child)) != identity(before):
                os.close(child)
                raise Refused('Directory changed during open')
            os.close(fd)
            fd = child
        yield fd
    finally:
        os.close(fd)

def file_record(path, destination=None):
    """Bounded descriptor-relative read/copy with no overwrite or link traversal."""
    path = Path(path)
    with directory(path.parent) as parent:
        before = os.stat(path.name, dir_fd=parent, follow_symlinks=False)
        safe_stat(before)
        require(before.st_size <= MAX_FILE, 'Input exceeds file budget')
        fd = os.open(path.name, os.O_RDONLY | os.O_NOFOLLOW | os.O_NONBLOCK, dir_fd=parent)
        with os.fdopen(fd, 'rb') as source, contextlib.ExitStack() as stack:
            require(identity(os.fstat(source.fileno())) == identity(before), 'Input changed before read')
            output = None
            if destination is not None:
                destination = Path(destination)
                out_parent = stack.enter_context(directory(destination.parent))
                out_fd = os.open(destination.name, os.O_WRONLY | os.O_CREAT | os.O_EXCL | os.O_NOFOLLOW,
                                 0o600, dir_fd=out_parent)
                output = stack.enter_context(os.fdopen(out_fd, 'wb'))
            digest = hashlib.sha256()
            size = 0
            for block in iter(lambda: source.read(1024 * 1024), b''):
                size += len(block)
                require(size <= before.st_size, 'Input grew during copy')
                digest.update(block)
                if output is not None:
                    output.write(block)
            current = os.stat(path.name, dir_fd=parent, follow_symlinks=False)
            require(size == before.st_size and identity(os.fstat(source.fileno())) == identity(before) == identity(current),
                    'Input changed during read')
            if output is not None:
                output.flush()
                os.fchmod(output.fileno(), stat.S_IMODE(before.st_mode))
                os.fsync(output.fileno())
    with directory(path.parent) as parent:
        require(identity(os.stat(path.name, dir_fd=parent, follow_symlinks=False)) == identity(before),
                'Input path detached during read')
    return {'sha256': digest.hexdigest(), 'bytes': size, 'mode': stat.S_IMODE(before.st_mode)}

def read_json(path):
    before = file_record(path)
    require(before['bytes'] <= 8_000_000, 'Metadata exceeds budget')
    value = json.loads(Path(path).read_bytes(), object_pairs_hook=unique_json)
    require(file_record(path) == before, 'Metadata changed during decode')
    return value

def new_file(path, data):
    with directory(path.parent) as parent:
        fd = os.open(path.name, os.O_WRONLY | os.O_CREAT | os.O_EXCL | os.O_NOFOLLOW, 0o600, dir_fd=parent)
        with os.fdopen(fd, 'wb') as output:
            output.write(data)
            output.flush()
            os.fsync(output.fileno())
        os.fsync(parent)

def tree_files(root, skip=()):
    result = {}
    def visit(path, prefix=''):
        with directory(path) as fd:
            before = os.fstat(fd)
            names = sorted(os.listdir(fd))
            for name in names:
                key = relative(prefix + name)
                if key in skip:
                    continue
                info = os.stat(name, dir_fd=fd, follow_symlinks=False)
                safe_stat(info, stat.S_ISDIR(info.st_mode))
                if stat.S_ISDIR(info.st_mode):
                    visit(path / name, key + '/')
                else:
                    result[key] = path / name
                    require(len(result) <= 15000, 'Resource inventory exceeds budget')
            after = os.fstat(fd)
            require(names == sorted(os.listdir(fd)) and before.st_mtime_ns == after.st_mtime_ns and
                    before.st_ctime_ns == after.st_ctime_ns, 'Tree changed during inventory')
    visit(Path(root))
    return result

def git(*args):
    env = {'PATH':'/usr/bin:/bin', 'HOME':str(ROOT / '.work/unused-bundle-home'),
           'GIT_CONFIG_NOSYSTEM':'1', 'GIT_CONFIG_GLOBAL':'/dev/null', 'GIT_CONFIG_SYSTEM':'/dev/null',
           'GIT_OPTIONAL_LOCKS':'0', 'GIT_NO_LAZY_FETCH':'1', 'GIT_NO_REPLACE_OBJECTS':'1', 'GIT_TERMINAL_PROMPT':'0'}
    r = subprocess.run(['/usr/bin/git','--no-optional-locks','-c','core.fsmonitor=false','-c','core.hooksPath=/dev/null',
                        '-c','protocol.allow=never',*args], cwd=ROOT, env=env, capture_output=True, timeout=30)
    require(r.returncode == 0, 'Read-only worktree guard failed')
    return r.stdout

def worktree_guard():
    require(ROOT.name == 'onboarding-implementation-20260910' and Path.cwd() == ROOT, 'Wrong worktree')
    require(git('branch','--show-current').decode().strip() == BRANCH and
            git('rev-parse','HEAD').decode().strip() == HEAD, 'Unexpected branch or HEAD')
    require(not git('diff','--cached','--name-only','-z'), 'Staged work needs separate review')
    git('diff','--check')

def source_inventory():
    native = read_json(ROOT / '.work/validation-20260911/native-result.json')
    web = read_json(ROOT / '.work/atlas-worker/native/result.json')
    closeout = read_json(ROOT / '.work/validation-20260911/closeout-evidence.json')
    require(native['sourcesUnchangedDuringRun'] and all(r['passed'] and r['checks'] > 0 for r in native['suites'].values()),
            'Native receipt incomplete')
    swift = {'Sources/Oracle/' + p for p in tree_files(ROOT / 'Sources/Oracle') if p.endswith('.swift')}
    require(swift | {'Package.swift'} == set(native['sourceHashes']), 'Native source inventory changed')
    records = {}
    for p,h in native['sourceHashes'].items():
        records[p] = file_record(ROOT / relative(p))
        require(records[p]['sha256'] == h, 'Native source changed since tests')
    require(web['sourcesUnchangedDuringRun'] and web['passed'] > 0 and web['failed'] == 0, 'Web receipt incomplete')
    for p,h in web['sourceHashes'].items():
        p = 'Resources/web/' + relative(p)
        records[p] = file_record(ROOT / p)
        require(records[p]['sha256'] == h, 'Web input changed since tests')
    app = ROOT / relative(closeout['executable']['resolved_path'])
    require(app.is_relative_to(ROOT / '.work/validation-20260911/swift-prime'), 'Unexpected executable')
    require(file_record(app)['sha256'] == native['binarySHA256'] == closeout['executable']['sha256'],
            'Executable differs from tested build')
    files = {'Contents/MacOS/Oracle': app}
    resources = tree_files(ROOT / 'Resources', skip=('catalog/packs',))
    files.update({'Contents/Resources/' + p: s for p,s in resources.items()})
    files.update({'Contents/Resources/skills/' + p: s for p,s in tree_files(ROOT / 'skills').items()})
    # Read only reviewed members, never wildcard-copy a mutable shared checkout.
    packs = ROOT / 'Resources/catalog/packs'
    expected_packs = ROOT.parents[2] / 'Resources/catalog/packs'
    require(packs.is_symlink() and os.readlink(packs) == str(expected_packs), 'Shared catalog reference changed')
    catalog = read_json(ROOT / 'Resources/catalog/manifest.json')
    require(catalog.get('schema_version') == 1 and 0 < len(catalog.get('files',[])) <= 10000, 'Catalog incomplete')
    listed = set()
    for row in catalog['files']:
        p = relative(row['path'])
        require(p.startswith('packs/') and p not in listed, 'Invalid duplicate catalog member')
        listed.add(p)
        source = expected_packs / p.removeprefix('packs/')
        current = file_record(source)
        require(current['sha256'] == row['sha256'] and current['bytes'] == row['size'], 'Catalog differs from manifest')
        files['Contents/Resources/catalog/' + p] = source
    require(all(relative(row['path']) in listed for row in catalog.get('entries',[])), 'Skill omitted from manifest')
    method = read_json(ROOT / 'Resources/gbrain-method/manifest.json')
    actual = {p.removeprefix('gbrain-method/') for p in resources if p.startswith('gbrain-method/')}
    require(actual == {'manifest.json'} | {relative(r['path']) for r in method['files']}, 'Official method inventory changed')
    for row in method['files']:
        current = file_record(ROOT / 'Resources/gbrain-method' / relative(row['path']))
        require(current['sha256'] == row['sha256'] and current['bytes'] == row['bytes'], 'Official method differs from receipt')
    for p in ('Resources/engine/gbrain','Resources/engine/oracle-gbrain-read'):
        require(file_record(ROOT / p)['sha256'] == closeout['engines'][p], 'Engine differs from tested receipt')
    spellings = [unicodedata.normalize('NFC',p).casefold() for p in files]
    require(len(spellings) == len(set(spellings)), 'Bundle spelling collision')
    inputs = {p:file_record(s) for p,s in sorted(files.items())}
    require(sum(r['bytes'] for r in inputs.values()) <= MAX_BUNDLE, 'Bundle exceeds budget')
    records['scripts/assemble-onboarding-developer.py'] = file_record(Path(__file__))
    return files,inputs,records,native,len(catalog['entries'])

def checked(command, env, log):
    with log.open('xb') as output:
        r = subprocess.run([str(v) for v in command], cwd=ROOT, env=env, stdin=subprocess.DEVNULL,
                           stdout=output, stderr=subprocess.STDOUT, timeout=300)
    require(r.returncode == 0, 'Native command failed; inspect private execution log')

def assemble(destination):
    require(sys.platform == 'darwin', 'Native macOS required')
    worktree_guard()
    require('..' not in Path(destination).parts, 'Non-normalized destination refused')
    destination = Path(os.path.abspath(destination))
    require(destination.is_relative_to(ROOT / '.work') and destination != ROOT / '.work', 'New .work destination required')
    with directory(destination.parent) as parent:
        require(not os.path.lexists(destination), 'Existing delivery preserved; choose a new destination')
        files,inputs,records,native,skills = source_inventory()
        os.mkdir(destination.name, mode=0o700, dir_fd=parent)
    # Failed NEW deliveries remain for diagnosis. Never overwrite/clean a prior one.
    app = destination / 'Oracle.app'
    for folder in (app,destination/'home',destination/'tmp',destination/'state',destination/'logs'):
        folder.mkdir(mode=0o700)
    for p,source in files.items():
        target = app / p
        target.parent.mkdir(parents=True,exist_ok=True)
        if inputs[p]['bytes'] >= 32 * 1024 * 1024:
            # Independent APFS clones avoid duplicating the large engines when
            # disk space is tight. These are not hardlinks; both hashes and
            # link counts are checked by file_record before/after signing.
            clone = subprocess.run(['/bin/cp','-c','-n',str(source),str(target)],
                                   capture_output=True,timeout=60)
            require(clone.returncode == 0, 'Independent engine clone failed; prior bundles preserved')
            os.chmod(target,inputs[p]['mode'])
            require(file_record(source) == inputs[p], 'Input changed during clone')
        else:
            require(file_record(source,target) == inputs[p], 'Input changed during copy')
        require(file_record(target) == inputs[p], 'Copy readback failed')
    info = {'CFBundleName':'Oracle','CFBundleDisplayName':'Oracle — Validação',
            'CFBundleIdentifier':'com.oraclecompanion.onboarding.validation',
            'CFBundleVersion':'4','CFBundleShortVersionString':'0.3.0','CFBundleExecutable':'Oracle',
            'CFBundlePackageType':'APPL','CFBundleIconFile':'Oracle','LSMinimumSystemVersion':'13.0',
            'NSHighResolutionCapable':True,'NSPrincipalClass':'NSApplication',
            'OracleQAState':str(destination/'state'),'OracleDeveloperOnly':True,
            'NSFaceIDUsageDescription':'Desbloquear seu universo no Oracle.',
            'NSDocumentsFolderUsageDescription':'Acessar somente o vault escolhido.',
            'NSDownloadsFolderUsageDescription':'Importar somente a exportação escolhida.'}
    new_file(app/'Contents/Info.plist',plistlib.dumps(info,sort_keys=True))
    env = {'PATH':'/usr/bin:/bin:/usr/sbin:/sbin','HOME':str(destination/'home'),
           'CFFIXED_USER_HOME':str(destination/'home'),'TMPDIR':str(destination/'tmp')}
    policy = ('(version 1)(allow default)(deny network*)(deny file-write*)'
              '(allow file-write* (subpath '+json.dumps(str(destination))+') (literal "/dev/null"))')
    new_file(destination/'runtime.sb',policy.encode())
    for label,target in [('engine',app/'Contents/Resources/engine/gbrain'),
                         ('adapter',app/'Contents/Resources/engine/oracle-gbrain-read'),('bundle',app)]:
        checked(['/usr/bin/codesign','--force','--sign','-','--timestamp=none',target],env,destination/('logs/sign-'+label+'.log'))
    checked(['/usr/bin/codesign','--verify','--deep','--strict',app],env,destination/'logs/sign-verify.log')
    signed = {p:file_record(f) for p,f in tree_files(app).items()}
    sign_changes = {'Contents/MacOS/Oracle','Contents/Resources/engine/gbrain','Contents/Resources/engine/oracle-gbrain-read'}
    require(all(signed[p] == r for p,r in inputs.items() if p not in sign_changes), 'Signing changed a non-code input')
    env['ORACLE_TEST_ROOT'] = str(destination/'tmp')
    env['GBRAIN_HOME'] = str(destination/'unused-gbrain')
    # No ORACLE_ENGINE_RESOURCES: exercise real NSBundle resource resolution.
    suites = {}
    for name in ('onboarding','updates','editor','core','backup','maintenance'):
        flag = '--self-test' if name == 'core' else '--self-test-'+name
        log = destination/('logs/test-'+name+'.log')
        checked(['/usr/bin/sandbox-exec','-f',destination/'runtime.sb',app/'Contents/MacOS/Oracle',
                 '--state',destination/'state',flag],env,log)
        count = sum(line.startswith('PASS ') for line in log.read_text().splitlines())
        require(count == native['suites'][name]['checks'], 'Packaged check count differs from compiled receipt')
        suites[name] = {'checks':count,'passed':True,'log':str(log.relative_to(destination))}
    require({p:file_record(f) for p,f in tree_files(app).items()} == signed, 'Bundle changed during tests')
    require(all(file_record(s) == inputs[p] for p,s in files.items()), 'Input changed during assembly')
    require(all(file_record(ROOT/p) == r for p,r in records.items()), 'Tested source changed during assembly')
    worktree_guard()
    manifest = {'schema_version':1,'developer_only':True,'files':signed,'input_files':inputs,'tested_sources':records}
    new_file(destination/'bundle-fingerprints.json',encoded(manifest))
    receipt = {'schema_version':1,'recorded_at':datetime.datetime.now(datetime.timezone.utc).isoformat(),
               'status':'developer_bundle_verified','bundle':str(app.relative_to(ROOT)),
               'bundle_manifest_sha256':sha(encoded(manifest)),'bundled_files':len(signed),
               'bundled_bytes':sum(r['bytes'] for r in signed.values()),'catalog_skills':skills,
               'suites':suites,'checks':sum(r['checks'] for r in suites.values()),
               'signature':'ad-hoc-only','signing_identity_used':False,'bundle_resource_override':False,
               'sources_unchanged':True,'git_diff_check':'passed','installed':False,'published':False,
               'distribution_qualified':False,'real_codex':False,'personal_vault':False,
               'offline_runtime':True,'runtime_writes':'this new delivery only'}
    new_file(destination/'bundle-evidence.json',encoded(receipt))
    print(json.dumps(receipt,indent=2,ensure_ascii=False))
    return receipt

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--destination',type=Path,required=True,help='NEW directory under this worktree .work')
    args = parser.parse_args()
    try:
        assemble(args.destination)
    except (Refused,OSError,ValueError,KeyError,TypeError,subprocess.SubprocessError) as error:
        print(json.dumps({'status':'refused','reason':str(error) if isinstance(error,Refused) else
                          'Filesystem, metadata or native command failed; previous deliveries preserved',
                          'installed':False,'published':False}),file=sys.stderr)
        sys.exit(2)
