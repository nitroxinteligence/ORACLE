#!/usr/bin/env python3
"""Build the one-asset public skills release contract. Never publishes anything."""
import argparse, base64, hashlib, json
from pathlib import Path

p = argparse.ArgumentParser()
p.add_argument('--source', type=Path, required=True, help='Directory containing SISTEMA/skills/<collection>/...')
p.add_argument('--version', required=True)
p.add_argument('--output', type=Path, required=True)
a = p.parse_args()
allowed = {'ads','code','contents','customer-finder','cyber-security','marketing','personal-branding'}
extensions = {'md','txt','json','yaml','yml','py','js','ts','sh','toml','css','html','csv'}
files = []
root = a.source.resolve()
for path in sorted((root/'SISTEMA/skills').rglob('*')):
    if path.is_symlink():
        raise SystemExit('Symlinks are not accepted: '+str(path))
    if not path.is_file():
        continue
    relative = path.relative_to(root).as_posix()
    parts = Path(relative).parts
    if len(parts)<4 or parts[2] not in allowed or any(x.startswith('.') for x in parts):
        raise SystemExit('Path outside approved collections: '+relative)
    if path.suffix.lstrip('.').lower() not in extensions:
        raise SystemExit('Unsupported file type: '+relative)
    data = path.read_bytes()
    if len(data)>2_000_000:
        raise SystemExit('File larger than 2 MB: '+relative)
    files.append({'path':relative,'sha256':hashlib.sha256(data).hexdigest(),'content_base64':base64.b64encode(data).decode()})
if not files or len(files)>5000 or sum(len(base64.b64decode(f['content_base64'])) for f in files)>50_000_000:
    raise SystemExit('Expected 1–5000 files with at most 50 MB total')
if not a.version or len(a.version.encode())>80:
    raise SystemExit('Version must contain 1–80 bytes')
payload=json.dumps({'schema_version':1,'oracle_compatibility':'0.2','version':a.version,'files':files},ensure_ascii=False,separators=(',',':')).encode()
a.output.parent.mkdir(parents=True,exist_ok=True)
a.output.write_bytes(payload)
print(json.dumps({'files':len(files),'size':len(payload),'sha256':hashlib.sha256(payload).hexdigest(),'output':str(a.output)}))
