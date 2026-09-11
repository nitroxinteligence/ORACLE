#!/usr/bin/env python3
"""Build a complete Oracle 0.3 release asset. Never publishes or runs skills."""
import argparse, base64, hashlib, json, os, stat, unicodedata, uuid
from pathlib import Path
from catalog_safety import check_publication_bytes

def safe_name(value):
    try:check_publication_bytes('source-path',os.fsencode(value))
    except ValueError:raise SystemExit('Credential-like path refused; matching text omitted') from None

def directory_descriptor(path,create=False):
    """Walk every directory component without following links or hydrating it."""
    fd=os.open('/',os.O_RDONLY|os.O_DIRECTORY|os.O_NOFOLLOW)
    try:
        for part in Path(os.path.abspath(path)).parts[1:]:
            safe_name(part)
            if create:
                try:os.mkdir(part,mode=0o755,dir_fd=fd)
                except FileExistsError:pass
            info=os.stat(part,dir_fd=fd,follow_symlinks=False)
            if not stat.S_ISDIR(info.st_mode) or getattr(info,'st_flags',0)&0x40000000:
                raise SystemExit('Symlink/non-directory/Dataless ancestor refused')
            child=os.open(part,os.O_RDONLY|os.O_DIRECTORY|os.O_NOFOLLOW,dir_fd=fd)
            opened=os.fstat(child)
            if (opened.st_dev,opened.st_ino)!=(info.st_dev,info.st_ino):
                os.close(child);raise SystemExit('Directory changed during preflight')
            os.close(fd);fd=child
        result=fd;fd=-1;return result
    finally:
        if fd>=0:os.close(fd)

p = argparse.ArgumentParser()
p.add_argument('--source', type=Path, required=True, help='Directory containing SISTEMA/skills/<collection>/...')
p.add_argument('--version', required=True)
p.add_argument('--output', type=Path, required=True)
a = p.parse_args()
allowed = {'ads','code','contents','customer-finder','cyber-security','marketing','personal-branding'}
extensions = {'md','txt','json','yaml','yml','py','js','ts','sh','toml','css','html','csv','sql','svg','png','jpg','jpeg','webp'}
files = []
root = Path(os.path.abspath(a.source));output=Path(os.path.abspath(a.output))
for path in (root,*root.parents,output,*output.parents):
    safe_name(path)
    if path.is_symlink():raise SystemExit('Source/output must not traverse symlinks: '+str(path))
if output.is_relative_to(root):raise SystemExit('Output must be outside the source tree')
try:
    source_directory=directory_descriptor(root/'SISTEMA/skills');os.close(source_directory)
except OSError:raise SystemExit('Missing or inaccessible complete SISTEMA/skills source') from None
def failed_walk(error):raise error
paths=[]
for directory,dirs,names in os.walk(root/'SISTEMA/skills',followlinks=False,onerror=failed_walk):
    for name in dirs:
        child=Path(directory)/name
        safe_name(child.relative_to(root))
        if child.is_symlink() or name.startswith('.') or getattr(child.lstat(),'st_flags',0)&0x40000000:
            raise SystemExit('Symlink/hidden/dataless source directory refused: '+str(child))
    paths.extend(Path(directory)/name for name in names)
identities=set();observed={}
for path in sorted(paths):
    safe_name(path.relative_to(root))
    if path.is_symlink():
        raise SystemExit('Symlinks are not accepted: '+str(path))
    info=path.lstat()
    if not stat.S_ISREG(info.st_mode) or info.st_nlink>1:raise SystemExit('Source must be regular and unlinked: '+str(path))
    if getattr(info,'st_flags',0)&0x40000000:raise SystemExit('Dataless iCloud file refused; download and review before retry: '+str(path))
    relative = path.relative_to(root).as_posix()
    parts = Path(relative).parts
    if len(parts)<4 or parts[2] not in allowed or any(x.startswith('.') for x in parts) or len(relative.encode())>700 or '\\' in relative or any(ord(x)<32 or ord(x)==127 for x in relative):
        raise SystemExit('Path outside approved collections: '+relative)
    identity=unicodedata.normalize('NFC',relative).lower()
    if identity in identities:raise SystemExit('Case/Unicode-colliding path: '+relative)
    identities.add(identity)
    if path.suffix.lstrip('.').lower() not in extensions and path.name.upper() not in {'LICENSE','LICENCE','NOTICE','COPYING'}:
        raise SystemExit('Unsupported file type: '+relative)
    limit=5_000_000 if path.suffix.lstrip('.').lower() in {'png','jpg','jpeg','webp'} else 2_000_000
    if info.st_size>limit:raise SystemExit('File exceeds release limit: '+relative)
    parent=directory_descriptor(path.parent)
    try:fd=os.open(path.name,os.O_RDONLY|os.O_NOFOLLOW|getattr(os,'O_NONBLOCK',0),dir_fd=parent)
    finally:os.close(parent)
    with os.fdopen(fd,'rb') as stream:
        opened=os.fstat(stream.fileno())
        if not stat.S_ISREG(opened.st_mode) or opened.st_nlink!=1:raise SystemExit('Linked source appeared during open')
        if (opened.st_ino,opened.st_dev,opened.st_size,opened.st_mtime_ns)!=(info.st_ino,info.st_dev,info.st_size,info.st_mtime_ns):raise SystemExit('Source changed before read: '+relative)
        data=stream.read(limit+1);after=os.fstat(stream.fileno())
        if len(data)>limit or (opened.st_size,opened.st_mtime_ns,opened.st_ctime_ns)!=(after.st_size,after.st_mtime_ns,after.st_ctime_ns):raise SystemExit('Source changed during read: '+relative)
    try:check_publication_bytes(relative,data)
    except ValueError as error:raise SystemExit(str(error))
    observed[path]=(info.st_dev,info.st_ino,info.st_size,info.st_mtime_ns,info.st_ctime_ns)
    files.append({'path':relative,'sha256':hashlib.sha256(data).hexdigest(),'content_base64':base64.b64encode(data).decode()})
if not files or len(files)>5000 or sum(len(base64.b64decode(f['content_base64'])) for f in files)>50_000_000:
    raise SystemExit('Expected 1–5000 files with at most 50 MB total')
if not a.version.strip() or len(a.version.encode())>80 or any(ord(c)<32 for c in a.version):
    raise SystemExit('Version must contain 1–80 bytes')
current=[]
for directory,dirs,names in os.walk(root/'SISTEMA/skills',followlinks=False,onerror=failed_walk):
    if any((Path(directory)/name).is_symlink() for name in dirs):raise SystemExit('Source directory changed after preflight')
    current.extend(Path(directory)/name for name in names)
if set(current)!=set(observed):raise SystemExit('Source inventory changed after preflight; no output written')
for path,expected in observed.items():
    info=path.lstat()
    if (info.st_dev,info.st_ino,info.st_size,info.st_mtime_ns,info.st_ctime_ns)!=expected:raise SystemExit('Source changed after preflight: '+str(path))
source_manifest={item['path']:item['sha256'] for item in files}
source_hash=hashlib.sha256(json.dumps(source_manifest,sort_keys=True,separators=(',',':')).encode()).hexdigest()
payload=json.dumps({'schema_version':2,'oracle_compatibility':'0.3','version':a.version,'source_manifest_sha256':source_hash,'files':files},ensure_ascii=False,separators=(',',':')).encode()
if len(payload)>72_000_000:raise SystemExit('Encoded release exceeds download budget')
parent=directory_descriptor(output.parent,create=True)
temp='.oracle-release-'+uuid.uuid4().hex
try:
    try:before=os.stat(output.name,dir_fd=parent,follow_symlinks=False)
    except FileNotFoundError:before=None
    if before and (not stat.S_ISREG(before.st_mode) or before.st_nlink!=1):raise SystemExit('Irregular release destination preserved')
    fd=os.open(temp,os.O_WRONLY|os.O_CREAT|os.O_EXCL|os.O_NOFOLLOW,0o600,dir_fd=parent)
    with os.fdopen(fd,'wb') as stream:stream.write(payload);stream.flush();os.fsync(stream.fileno())
    if before:
        current=os.stat(output.name,dir_fd=parent,follow_symlinks=False)
        if (before.st_dev,before.st_ino,before.st_size,before.st_mtime_ns,before.st_ctime_ns)!=(current.st_dev,current.st_ino,current.st_size,current.st_mtime_ns,current.st_ctime_ns):raise SystemExit('Release destination changed; original preserved')
        os.replace(temp,output.name,src_dir_fd=parent,dst_dir_fd=parent)
    else:
        os.link(temp,output.name,src_dir_fd=parent,dst_dir_fd=parent,follow_symlinks=False)
    os.fsync(parent)
finally:
    try:os.unlink(temp,dir_fd=parent)
    except FileNotFoundError:pass
    os.close(parent)
print(json.dumps({'files':len(files),'size':len(payload),'sha256':hashlib.sha256(payload).hexdigest(),'source_manifest_sha256':source_hash,'output':str(output),'published':False,'content_and_license_review_required':True}))
