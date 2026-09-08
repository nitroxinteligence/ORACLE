#!/usr/bin/env python3
"""Round-trip the real bundled GBrain in a fresh synthetic profile."""
import pathlib,json,subprocess,os,uuid,time
root=pathlib.Path(__file__).resolve().parent.parent;base=root/'.work'/('gbrain-e2e-'+uuid.uuid4().hex[:8]);vault=base/'vault';state=base/'state';vault.mkdir(parents=True);state.mkdir()
(state/'config.json').write_text(json.dumps({'vault':str(vault),'fixture':True}))
(vault/'Atlas.md').write_text('---\ntitle: Atlas de teste\ntype: note\n---\n# Atlas de teste\n\nO projeto fixture utiliza [[Decisoes]] como fonte.\n')
(vault/'Decisoes.md').write_text('---\ntitle: Decisoes\ntype: note\n---\n# Decisoes\n\nO projeto fixture preserva as fontes.\n')
answers={'AGENT_NAME':'OracleFixture','PRINCIPAL_NAME':'Pessoa Sintetica','AGENT_PURPOSE':'Organizar exclusivamente notas sintéticas de teste.','AGENT_TOP_JOBS':'1. Encontrar notas\n2. Apontar fontes\n3. Organizar procedimentos','PRINCIPAL_CONTEXT':'Contexto fictício de validação. Nenhum dado pessoal real.','VOICE_REGISTER':'Seja direto. Exemplo: a fonte está nesta nota.','PRINCIPAL_TIMEZONE':'UTC'}
request=base/'request.json';request.write_text(json.dumps({'answers':answers,'newVault':True,'attach':False}))
exe=root/'.build/release/Oracle';env=dict(os.environ,ORACLE_ENGINE_RESOURCES=str(root/'Resources/engine'))
def run(*args):
 r=subprocess.run([str(exe),'--state',str(state),*args],env=env,text=True,capture_output=True)
 if r.returncode:raise RuntimeError(r.stderr)
 return r.stdout
plan=json.loads(run('--create-plan',str(request)));run('--confirm-plan',plan['plan_hash']);run('--setup','apply')
prepared=json.loads(run('--gbrain','prepare'));run('--confirm-gbrain',prepared['upstream_hash']);finished=json.loads(run('--gbrain','finish'))
assert finished['status']=='identity_and_index_verified'
identity=vault/'INBOX/oracle/Oracle - identidade.md';assert identity.exists()
before={p.name:p.read_bytes() for p in (state/'gbrain/workspace').glob('*.md')}
# Same confirmed plan resumes without re-interviewing or duplicating identity.
resumed=json.loads(run('--gbrain','prepare'));assert resumed.get('confirmed_hash')==prepared['upstream_hash'];run('--gbrain','finish')
assert before=={p.name:p.read_bytes() for p in (state/'gbrain/workspace').glob('*.md')}
out={'state':str(state),'vault':str(vault),'status':finished['status'],'identity_in_canonical_vault':True,'resume_preserves_identity':True,'scope':'synthetic, isolated PGLite; no provider keys'}
(root/'.work/latest-gbrain-test.json').write_text(json.dumps(out));public={k:v for k,v in out.items() if k not in ['state','vault']};(root/'docs/evidence/gbrain-installer-v2.json').write_text(json.dumps(public,indent=2));print(json.dumps(public))
