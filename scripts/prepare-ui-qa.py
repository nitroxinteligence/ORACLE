#!/usr/bin/env python3
"""Prepare a new native UI test profile with synthetic notes and public catalog selection.
The installer is run separately so its actual progress can be observed in Oracle.app.
"""
import json, pathlib, subprocess, uuid
root=pathlib.Path(__file__).resolve().parent.parent
base=root/'.work'/('ui-qa-'+uuid.uuid4().hex[:8]);vault=base/'vault';state=base/'state'
vault.mkdir(parents=True);state.mkdir()
(state/'config.json').write_text(json.dumps({'vault':str(vault),'fixture':True}))
for path,text in {'INBOX/oracle/Identidade de teste.md':'# Identidade de teste\n\nPessoa sintética para validação do Oracle.', 'INBOX/oracle-history/conversations/Conversa de teste.md':'# Conversa de teste\n\nExemplo sintético.', 'INBOX/oracle-memory/people/Pessoa de teste.md':'# Pessoa de teste\n\nSomente dados sintéticos.', 'PROJETOS/Atlas.md':'# Atlas\n\nLeia [[Decisoes]].', 'WIKI/Decisoes.md':'# Decisoes\n\nPreservar as fontes locais.'}.items():
    file=vault/path;file.parent.mkdir(parents=True,exist_ok=True);file.write_text(text)
answers={'AGENT_NAME':'Oracle QA','PRINCIPAL_NAME':'Pessoa Sintética','AGENT_PURPOSE':'Validar apenas documentos sintéticos.','AGENT_TOP_JOBS':'1. Encontrar fontes\n2. Explorar procedimentos','PRINCIPAL_CONTEXT':'Perfil de teste isolado, sem dados pessoais.','VOICE_REGISTER':'Respostas claras e curtas.'}
request=base/'request.json';request.write_text(json.dumps({'answers':answers,'newVault':True,'attach':False,'catalogCollections':['ads','code','customer-finder','cyber-security','marketing']}))
exe=root/'.work/build/Oracle.app/Contents/MacOS/Oracle'
def run(*args):return subprocess.check_output([str(exe),'--state',str(state),*args],text=True)
plan=json.loads(run('--create-plan',str(request)));run('--confirm-plan',plan['plan_hash'])
result={'state':str(state),'vault':str(vault),'plan_id':plan['id'],'app':str(root/'.work/build/Oracle.app'),'source':'synthetic notes and bundled public skills'}
(root/'.work/latest-ui-qa.json').write_text(json.dumps(result,indent=2))
print(json.dumps(result))
