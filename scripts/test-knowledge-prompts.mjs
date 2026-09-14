import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';
import {areas} from '../packages/atlas/knowledge.js';
const window={OracleKnowledge:{areas}};
vm.runInNewContext(fs.readFileSync(new URL('../Resources/web/knowledge-prompts.js',import.meta.url),'utf8'),{window});
const p=window.OracleKnowledgePrompts;
const dir=path=>({path,name:path.split('/').at(-1),directory:true});
test('both interviews have 30 distinct questions and selected-vault destinations',()=>{
 for(const id of ['personal','professional']){
  const questions=p.topics[id].groups.flatMap(g=>g[1]);assert.equal(questions.length,30);assert.equal(new Set(questions).size,30);
  const prompt=p.build(id,p.context('/Users/synthetic/Vault de Ana & João',[]));
  assert.ok(prompt.startsWith('/oracle\n'));assert.ok(prompt.includes('/Users/synthetic/Vault de Ana & João/AREAS/'+(id==='personal'?'pessoal':'profissional')));
  assert.equal((prompt.match(/^\d+\. /gm)||[]).length,30);
  assert.ok(!prompt.includes('/Users/mateusmpz'));
 }
});
test('existing named roots are reused and shell characters remain literal data',()=>{
 const ctx=p.context('/tmp/Vault "$(touch nope)"',[dir('Pessoal'),dir('Profissional')]);
 const prompt=p.build('professional',ctx);const json=prompt.match(/\n(\{\n[\s\S]*?\n\})\n/)[1];
 assert.equal(JSON.parse(json).destino,'/tmp/Vault "$(touch nope)"/Profissional');
});
test('invalid paths never produce prompts',()=>{
 for(const path of [undefined,'','relative','/','/tmp/a\nb','/tmp/a\0b'])assert.throws(()=>p.context(path));
 for(const path of ['/outside','../outside','a/../b','a\nb'])assert.throws(()=>p.build('personal',{vault:'/tmp/v',areas:[{id:'personal',path}]}));
});
test('welcome requires actual completed local installation, once per vault and run',()=>{
 const ob={status:'completed',licensed:true,hasVault:true,runID:'run-1'};
 assert.equal(p.welcomeEligible(ob,'/tmp/A'),true);
 for(const status of ['running','interrupted','failed','awaiting_identity','not_started'])assert.equal(p.welcomeEligible({...ob,status},'/tmp/A'),false);
 for(const extra of [{licensed:false},{hasVault:false},{runID:null},{resumeExisting:true}])assert.equal(p.welcomeEligible({...ob,...extra},'/tmp/A'),false);
 const seen={...ob,knowledgeWelcome:{runID:'run-1',vault:'/tmp/A'}};
 assert.equal(p.welcomeEligible(seen,'/tmp/A'),false);assert.equal(p.welcomeEligible(seen,'/tmp/B'),true);
 assert.equal(p.welcomeEligible({...seen,runID:'run-2'},'/tmp/A'),true);
 assert.equal(p.welcomeEligible({...ob,integrationPending:true},'/tmp/A'),true);
});
