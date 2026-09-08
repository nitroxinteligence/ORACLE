#!/usr/bin/env python3
"""Collect installed upstream package notices for the bundled executable."""
import json
from pathlib import Path
roots=[Path('vendor/gbrain/node_modules'),Path('node_modules')]
seen=set(); blocks=[]
for root in roots:
 for package in sorted(root.rglob('package.json')):
  try: info=json.loads(package.read_text())
  except (ValueError,OSError): continue
  name=info.get('name'); version=info.get('version')
  if not name or (name,version) in seen: continue
  seen.add((name,version)); license_text=[]
  for f in sorted(package.parent.iterdir()):
   if f.is_file() and f.name.lower().split('.')[0] in ('license','licence','notice','copying','copyright'):
    license_text.append(f.name+'\n'+f.read_text(errors='replace'))
  blocks.append(f"{name} {version}\nDeclared license: {info.get('license','see upstream')}\n"+'\n'.join(license_text))
output=Path('Resources/engine/THIRD-PARTY-NOTICES.txt')
output.write_text('Notices from installed upstream dependency trees. This conservative inventory may include build-only dependencies.\n\n'+'\n\n'+'\n\n' .join(blocks))
print(json.dumps({'packages':len(blocks),'bytes':output.stat().st_size}))
