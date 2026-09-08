#!/usr/bin/env python3
"""Build the 940-document fixture for the 23-item acceptance matrix. Never personal data."""
from pathlib import Path
import json,shutil,subprocess,sys
root=Path(__file__).resolve().parent.parent
subprocess.run([sys.executable,str(root/'scripts/make-fixture.py')],check=True)
base=root/'.work/native-fixture';assert json.loads((base/'state/config.json').read_text()).get('fixture') is True
skills=base/'vault/SISTEMA/skills'
counts={'ads':34,'code':37,'contents':0,'customer-finder':1,'cyber-security':818,'marketing':50,'personal-branding':0}
for group,count in counts.items():
    directory=skills/group
    if directory.exists():shutil.rmtree(directory)
    directory.mkdir(parents=True)
    for i in range(count):
        name=f'{group}-fixture-{i+1:04d}';file=directory/name/'SKILL.md';file.parent.mkdir()
        file.write_text(f'---\nname: {name}\ndescription: Documento sintético de teste.\n---\n\n# {name}\n\nSomente fixture. Nenhuma execução.\n')
(root/'.work/atlas-qa/mailbox').mkdir(parents=True,exist_ok=True)
print(json.dumps({'counts':counts,'total':sum(counts.values()),'vault':str(base/'vault')},ensure_ascii=False))
