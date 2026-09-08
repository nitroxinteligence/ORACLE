#!/usr/bin/env python3
"""Copy hash-verified public catalog bytes to the isolated native map fixture."""
from pathlib import Path
import hashlib,json
root=Path(__file__).resolve().parent.parent;base=root/'.work/public-gallery';vault=base/'vault';state=base/'state'
config=state/'config.json'
if config.exists():assert json.loads(config.read_text()).get('fixture') is True,'Refuse a non-fixture profile'
state.mkdir(parents=True,exist_ok=True);vault.mkdir(exist_ok=True)
manifest=json.loads((root/'Resources/catalog/manifest.json').read_text())
for item in manifest['files']:
    parts=Path(item['path']).parts;assert parts[0]=='packs' and '..' not in parts
    source=root/'Resources/catalog'/item['path'];data=source.read_bytes()
    assert hashlib.sha256(data).hexdigest()==item['sha256'],item['path']
    target=vault/'SISTEMA/skills'/Path(*parts[1:]);target.parent.mkdir(parents=True,exist_ok=True);target.write_bytes(data)
if not config.exists():config.write_text(json.dumps({'fixture':True,'vault':str(vault)}))
receipt={'source':'Bundled public catalog, each source file hash verified','counts':{c['id']:len(list((vault/'SISTEMA/skills'/c['id']).rglob('SKILL.md'))) for c in manifest['collections']},'files':len(manifest['files']),'personalVaultUsed':False}
output=root/'docs/evidence/skilltree/public-catalog.json';output.parent.mkdir(parents=True,exist_ok=True);output.write_text(json.dumps(receipt,indent=2)+'\n')
print(json.dumps(receipt))
