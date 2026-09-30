#!/usr/bin/env python3
from pathlib import Path
import subprocess, os, uuid, shutil, json, hashlib
repo=Path(__file__).resolve().parents[1]
base=repo/'.work/mcp-vault-binding';base.mkdir(parents=True,exist_ok=True)
fixture=base/('run-'+uuid.uuid4().hex);(fixture/'engine').mkdir(parents=True)
engine=repo/'Resources/engine/gbrain'
if not engine.is_file() or engine.is_symlink(): raise SystemExit('Regular copied official GBrain required')
shutil.copy2(engine,fixture/'engine/gbrain')
bun=os.environ.get('ORACLE_TEST_BUN','/Users/mateusmpz/.bun/bin/bun')
(fixture/'bunfig.toml').write_text('# Isolated test\n')
env={'PATH':'/usr/bin:/bin:/usr/sbin:/sbin','HOME':str(fixture),'TMPDIR':str(fixture),'LANG':'en_US.UTF-8','BUN_RUNTIME_TRANSPILER_CACHE_PATH':str(fixture/'bun-cache')}
flags=['--no-env-file','--no-install','--config='+str(fixture/'bunfig.toml')]
sources=list((repo/'packages/gbrain-adapter').glob('*.ts'))+[repo/'Sources/Oracle/Catalog.swift']
hashes={str(p.relative_to(repo)):hashlib.sha256(p.read_bytes()).hexdigest() for p in sources}
(fixture/'source-hashes.json').write_text(json.dumps(hashes,sort_keys=True))
subprocess.run([bun,'build',*flags,'--compile','--no-compile-autoload-dotenv','--no-compile-autoload-bunfig',str(repo/'packages/gbrain-adapter/read.ts'),'--outfile',str(fixture/'engine/adapter')],env=env,cwd=fixture,check=True,stdout=subprocess.PIPE,stderr=subprocess.STDOUT)
r=subprocess.run(['/usr/bin/sandbox-exec','-p','(version 1)(allow default)(deny network*)',bun,'run',*flags,str(repo/'scripts/test-mcp-vault-binding.ts'),str(fixture)],env=env,cwd=fixture,text=True,stdout=subprocess.PIPE,stderr=subprocess.STDOUT,timeout=180)
(fixture/'execution.log').write_text(r.stdout);print(r.stdout);print('FIXTURE',fixture)
if (fixture/'report.json').exists(): (base/'latest.json').write_bytes((fixture/'report.json').read_bytes())
raise SystemExit(r.returncode)
