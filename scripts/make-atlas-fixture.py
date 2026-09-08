#!/usr/bin/env python3
"""Extend the repository's synthetic fixture to eight skills in each of seven collections."""
from pathlib import Path
import subprocess
import sys

root = Path(__file__).resolve().parent.parent
subprocess.run([sys.executable, str(root / 'scripts/make-fixture.py')], check=True)
vault = root / '.work/native-fixture/vault'
for group in ['ads', 'code', 'contents', 'customer-finder', 'cyber-security', 'marketing', 'personal-branding']:
    existing = list((vault / 'SISTEMA/skills' / group).glob('*/SKILL.md'))
    for i in range(8 - len(existing)):
        file = vault / 'SISTEMA/skills' / group / f'fixture-procedure-{i+1:02d}' / 'SKILL.md'
        file.parent.mkdir(parents=True, exist_ok=True)
        file.write_text(f'# Fixture {group} {i+1}\n\nSynthetic atlas performance fixture. No actions executed.\n')
(root / '.work/atlas-qa/mailbox').mkdir(parents=True, exist_ok=True)
print(f'{len(list(vault.rglob("*.md")))} documents; seven collections with eight skills each.')
