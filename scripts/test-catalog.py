#!/usr/bin/env python3
import pathlib,json,subprocess,os,hashlib,time
root=pathlib.Path(__file__).resolve().parent.parent
base=root/'.work/catalog-e2e';vault=base/'vault';state=base/'state';vault.mkdir(parents=True,exist_ok=True);state.mkdir(parents=True,exist_ok=True)
(state/'config.json').write_text(json.dumps({'vault':str(vault),'fixture':True}))
exe=root/'.build/release/Oracle';env=dict(os.environ,ORACLE_ENGINE_RESOURCES=str(root/'Resources/engine'))
def run(*args):return subprocess.run([str(exe),'--state',str(state),*args],env=env,text=True,capture_output=True,check=True).stdout
request=base/'request.json';request.write_text(json.dumps({'answers':{},'newVault':True,'attach':True,'catalogCollections':['ads','code','customer-finder','cyber-security','marketing']}))
plan=json.loads(run('--create-plan',str(request)));run('--confirm-plan',plan['plan_hash'])
t0=time.monotonic();run('--setup','apply');elapsed=time.monotonic()-t0
assert len(list(vault.rglob('SKILL.md')))==940
journal=json.loads((state/'setup'/f'{plan["id"]}.catalog.json').read_text());assert journal['verified']==journal['total']==4902
run('--setup','apply');run('--setup','verify')
# Reconstruct the journal before rollback, and compare the real Markdown inventory.
archive=state/'setup/events'/plan['id'];events=sorted((json.loads(p.read_text()) for p in archive.glob('*.json')),key=lambda e:e['sequence'])
baseline=json.loads((state/'setup'/f'{plan["id"]}.baseline.json').read_text())
(base/'replay-input.json').write_text(json.dumps({'baseline':baseline,'events':events}))
file=next(vault.rglob('SKILL.md'));file.write_text(file.read_text()+'\nFixture personal edit to preserve.\n');run('--setup','rollback')
assert file.exists() and 'Fixture personal edit' in file.read_text()
assert len(list(vault.rglob('SKILL.md')))==1
out={'copied_skills':940,'verified_files':4902,'apply_seconds':round(elapsed,2),'repeat_apply':'passed','verify':'passed','rollback_preserves_edited_skill':True,'remaining_skills_after_rollback':1,'scope':'isolated synthetic vault; no personal vault writes'}
(root/'docs/evidence/catalog-installation.json').write_text(json.dumps(out,indent=2));print(json.dumps(out))
