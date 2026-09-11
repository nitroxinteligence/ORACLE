import test from 'node:test';
import assert from 'node:assert/strict';
import * as prompts from '../packages/atlas/prompts.js';
import * as knowledge from '../packages/atlas/knowledge.js';
import {plan as layout} from '../packages/atlas/layout.js';
import {orbitalPosition} from '../packages/atlas/motion.js';

const dir = path => ({path, name:path.split('/').at(-1), directory:true});
const note = path => ({path, name:path.split('/').at(-1), directory:false});
const root = prompts.rootPath;
const library = [dir(root),dir(root+'/imagens'),dir(root+'/imagens/criacao'),
  note(root+'/imagens/criacao/retrato.md'),dir(root+'/codigo'),note(root+'/codigo/revisao.md')];

test('missing and empty libraries are honest, without invented prompts',()=>{
  assert.equal(prompts.orbit([]).points.length,0);
  const empty=prompts.orbit([dir(root)]);
  assert.equal(empty.points.length,1);assert.equal(empty.area.notes,0);assert.equal(empty.total,0);
  assert.match(empty.points[0].tooltip,/0 prompts/);
});
test('each real path appears once and folders are never counted as prompts',()=>{
  const data=prompts.inventory([...library,...library,note(root+'/image.png'),note(root+'-other/secret.md'),note(root+'/../outside.md')]);
  assert.equal(data.area.notes,2);assert.equal(data.area.folders,3);
  const orbit=prompts.orbit(data.entries);
  assert.equal(orbit.points.length,6);assert.equal(new Set(orbit.points.map(p=>p.path)).size,6);
  assert.ok(orbit.points.filter(p=>!p.directory).every(p=>p.path.endsWith('.md')));
});
test('adding prompts does not change the personal/professional orbit or normal specialist layout',()=>{
  const entries=[dir('AREAS/pessoal'),dir('AREAS/profissional'),...Array.from({length:60},(_,i)=>note(`AREAS/pessoal/Nota ${i}.md`))];
  const before=knowledge.orbit(entries,105),after=knowledge.orbit([...entries,...library],105);
  assert.deepEqual(before,after);
  const p=prompts.orbit([...entries,...library],after.radius);
  assert.equal(p.rings[0]-after.radius,38);
  assert.ok(p.points.every(point=>point.r===(point.root?10:6.5)));
  const collections=['ads','code','marketing','cyber-security'].map(id=>({id,name:id}));
  assert.deepEqual(layout(collections,entries,null,3,{},before.radius+110),
    layout(collections,[...entries,...library],null,3,{},Math.max(after.radius+110,p.radius+72)));
});
test('growth is bounded at 50 drawn objects while every document remains reachable',()=>{
  const entries=[dir(root),...Array.from({length:153},(_,i)=>note(`${root}/Prompt ${i}.md`))];
  const orbit=prompts.orbit(entries,163),seen=new Set();
  assert.equal(orbit.points.length,50);assert.equal(orbit.area.notes,153);
  assert.match(orbit.points[0].tooltip,/49 de 153/);
  assert.equal(orbit.rings.length,2);
  for(let page=0;page<4;page++){
    const scene=prompts.plan(entries,{path:root,page});
    assert.ok(scene.leaves.length<=50);scene.leaves.forEach(leaf=>seen.add(leaf.id));
  }
  assert.equal(seen.size,153);
});
test('folder navigation follows real ancestry and does not duplicate personal/professional content',()=>{
  const entries=[...library,note('AREAS/pessoal/Rotina.md'),note('AREAS/profissional/Plano.md')];
  const scene=prompts.plan(entries,{path:root+'/imagens/criacao'});
  assert.deepEqual(scene.leaves.map(l=>l.id),[root+'/imagens/criacao/retrato.md']);
  assert.equal(scene.area.id,'prompts');assert.equal(scene.nodes[0].x,0);
  assert.match(scene.leaves[0].tooltip,/Prompt Markdown/);
});
test('file-only indexes retain discoverable ancestor folders; invalid paths stay inside the library',()=>{
  const entries=[note(root+'/design/interfaces/modal.md')];
  assert.equal(prompts.plan(entries,{path:root+'/design'}).leaves[0].id,root+'/design/interfaces');
  for(const path of ['../secret','AREAS/pessoal',root+'/../other',root+'/missing']){
    assert.equal(prompts.resolve(entries,{path}).path,root);
  }
});
test('many empty departments cannot crowd actual prompts out of the overview',()=>{
  const entries=[dir(root),...Array.from({length:80},(_,i)=>dir(`${root}/Dept ${i}`)),note(root+'/actual.md')];
  const orbit=prompts.orbit(entries);
  assert.equal(orbit.points.length,50);assert.ok(orbit.points.some(p=>p.path===root+'/actual.md'));
});
test('orbit spacing stays collision-free throughout a complete revolution',()=>{
  const entries=[dir(root),...Array.from({length:90},(_,i)=>note(`${root}/Prompt ${i}.md`))];
  const orbit=prompts.orbit(entries,239);
  for(const seconds of [0,42,84,126,168]){
    const points=orbit.points.map(p=>({...p,...orbitalPosition(Math.hypot(p.x,p.y),Math.atan2(p.y,p.x),seconds,168,-1,2.5)}));
    for(let i=0;i<points.length;i++)for(let j=i+1;j<points.length;j++){
      assert.ok(Math.hypot(points[i].x-points[j].x,points[i].y-points[j].y)>points[i].r+points[j].r+10);
    }
  }
});
test('orbit and folder scenes preserve the actual uppercase root spelling',()=>{
 const upper='SISTEMA/PROMPTS',entries=[dir(upper),dir(upper+'/design'),note(upper+'/design/Nota.md')];
 assert.equal(prompts.inventory(entries).area.path,upper);
 assert.ok(prompts.orbit(entries).points.some(p=>p.path===upper+'/design/Nota.md'));
 assert.equal(prompts.plan(entries,{path:upper+'/design'}).leaves[0].id,upper+'/design/Nota.md');
 assert.equal(prompts.resolve(entries,{path:root}).path,upper);
 assert.equal(prompts.inventory(entries).area.color,'#CEC08B');
});
test('case-distinct roots require explicit choice and are not merged by the orbit',()=>{
 const upper='SISTEMA/PROMPTS',entries=[note(upper+'/Upper.md'),note(root+'/Lower.md')];
 assert.equal(prompts.inventory(entries).ambiguous,true);assert.equal(prompts.orbit(entries).points.length,0);
 const chosen=prompts.orbit(entries,163,upper);
 assert.equal(chosen.area.notes,1);assert.ok(chosen.points.some(p=>p.path===upper+'/Upper.md'));
 assert.ok(!chosen.points.some(p=>p.path===root+'/Lower.md'));
 assert.equal(prompts.plan(entries,{rootChoice:root,path:root}).leaves[0].id,root+'/Lower.md');
});
