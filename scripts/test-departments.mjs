import test from 'node:test';import assert from 'node:assert/strict';
import {inventory,plan} from '../packages/atlas/departments.js';
const groups=['code','cyber-security','impeccable','marketing'].map(id=>({id,name:id}));
const entries=groups.flatMap(g=>Array.from({length:17},(_,i)=>({name:'SKILL.md',path:`SISTEMA/skills/${g.id}/${i}/SKILL.md`})));
test('confirmed Code membership is explicit; unassigned specialists are not guessed',()=>{
 const result=inventory(groups,entries);assert.equal(result.find(d=>d.id==='code').specialists.length,3);assert.equal(result.find(d=>d.id==='unassigned').specialists[0].id,'marketing');
 const assigned=inventory(groups,entries,{marketing:'marketing'});assert.equal(assigned.find(d=>d.id==='marketing').specialists[0].id,'marketing');
});
test('overview has departments and specialists, never a cloud of skill leaves',()=>{
 const result=plan(groups,entries);assert.equal(result.nodes.length,2);assert.equal(result.groups.length,4);assert.equal(result.leaves.length,0);assert.ok(result.groups.every(g=>result.nodes.some(n=>n.id===g.parent)));
});
test('department drill-down includes only its specialists and their real skills',()=>{
 const result=plan(groups,entries,'code');assert.equal(result.nodes.length,1);assert.equal(result.nodes[0].departmentID,'code');assert.equal(result.groups.length,3);assert.equal(result.leaves.length,30);
 assert.ok(result.leaves.every(l=>entries.some(e=>e.path===l.id)&&result.groups.some(g=>g.id===l.source&&g.skills.some(s=>s.path===l.id))));
 assert.ok(result.leaves.every(l=>l.y<result.nodes[0].y));
});
test('all specialists in a growing department remain reachable with bounded pages',()=>{
 const large=Array.from({length:31},(_,i)=>({id:'expert-'+i,name:'E '+i})),assign=Object.fromEntries(large.map(c=>[c.id,'code']));const seen=new Set();
 for(let p=0;p<3;p++){const r=plan(large,[],'code',p,330,assign);assert.ok(r.groups.length<=12);r.groups.forEach(g=>seen.add(g.specialistID));}
 assert.equal(seen.size,31);
});
test('catalog source reordering preserves geometry and membership',()=>{
 assert.deepEqual(plan(groups,entries),plan([...groups].reverse(),[...entries].reverse()));
});
