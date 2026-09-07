#!/usr/bin/env python3
"""Create synthetic data only, outside any user's vault."""
import json, pathlib
base = pathlib.Path(__file__).resolve().parent.parent / '.work' / 'native-fixture'
vault = base / 'vault'
files = {'INBOX/oracle/Identidade.md':'# Identidade de teste\n\nEste vault contém apenas fixtures.\n', 'INBOX/oracle-history/conversations/Conversa de teste.md':'# Conversa\n\nExemplo sintético para QA.\n', 'INBOX/oracle-memory/people/Pessoa de teste.md':'# Pessoa sintética\n', 'INBOX/oracle-memory/projects/Projeto de teste.md':'# Projeto sintético\n', 'INBOX/oracle-memory/signals/Sinal de teste.md':'# Sinal sintético\n', 'PROJETOS/Atlas.md':'# Atlas\n\nRelacionado a [[Decisões]].\n', 'WIKI/Decisões.md':'# Decisões\n\nUma nota de teste.\n'}
for group, names in {'ads':['ads-audit','ads-google','ads-meta'], 'code':['branch-pr','chained-pr','cognitive-doc-design','comment-writer'], 'customer-finder':['first-customer-finder'],'cyber-security':['auditing-cloud','analyzing-network-traffic'], 'marketing':['ab-testing','ad-creative','ai-seo','analytics','aso']}.items():
    for name in names:
        files[f'SISTEMA/skills/{group}/{name}/SKILL.md'] = f'---\nname: {name}\ndescription: Fixture de teste da interface Oracle, sem execução.\n---\n\n# {name}\n\nSomente conteúdo sintético. Não representa a skill original.\n'
for rel,text in files.items():
    dest=vault/rel;dest.parent.mkdir(parents=True,exist_ok=True);dest.write_text(text)
state=base/'state';state.mkdir(parents=True,exist_ok=True)
(state/'config.json').write_text(json.dumps({'vault':str(vault),'fixture':True}))
print(state)
