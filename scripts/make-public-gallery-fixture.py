#!/usr/bin/env python3
"""Render validation using bundled public skill bytes, never the personal vault."""
from pathlib import Path
import json,hashlib,shutil
root=Path(__file__).resolve().parent.parent;base=root/'.work/public-gallery';vault=base/'vault';state=base/'state'
state.mkdir(parents=True,exist_ok=True);vault.mkdir(exist_ok=True)
manifest=json.loads((root/'Resources/catalog/manifest.json').read_text())
for item in manifest['files']:
    source=root/'Resources/catalog'/item['path'];data=source.read_bytes()
    assert hashlib.sha256(data).hexdigest()==item['sha256'],item['path']
    parts=Path(item['path']).parts;assert parts[0]=='packs' and '..' not in parts
    target=vault/'SISTEMA/skills'/Path(*parts[1:]);target.parent.mkdir(parents=True,exist_ok=True);target.write_bytes(data)
(vault/'WIKI').mkdir(exist_ok=True)
(vault/'WIKI/Decisões.md').write_text('# Validação visual\n\nAs skills desta amostra vêm do catálogo público incluído no Oracle. Nenhuma nota pessoal foi copiada.\n')
(state/'config.json').write_text(json.dumps({'fixture':True,'vault':str(vault)}))
counts={c['id']:len(list((vault/'SISTEMA/skills'/c['id']).rglob('SKILL.md'))) for c in manifest['collections']}
receipt={'source':'Bundled public catalog; each file SHA-256 verified before copy','counts':counts,'files':len(manifest['files']),'personalVaultUsed':False}
(root/'docs/evidence/organic-ui/public-gallery-fixture.json').write_text(json.dumps(receipt,indent=2)+'\n')
print(json.dumps(receipt))
