import test from 'node:test';
import assert from 'node:assert/strict';
import {plan, visibleCount, identity} from '../packages/atlas/layout.js';
import {revealAt} from '../packages/atlas/motion.js';
const ids=['ads','code','contents','customer-finder','cyber-security','marketing','personal-branding'];
const collections=ids.map(id=>({id,name:id}));
const entries=(id,n)=>Array.from({length:n},(_,i)=>({path:`SISTEMA/skills/${id}/${i.toString().padStart(4,'0')}/SKILL.md`,name:'SKILL.md'}));

test('required zoom boundary and minimum counts across empty, small and large real catalogs',()=>{
 for(const n of [0,1,10,50,818,1200])for(const zoom of [.49,.50,.51,.74,.90,1,1.12,2.59])for(const selected of [false,true])for(const detail of [0,3,6]){
  const count=visibleCount(n,selected,detail,zoom);
  if(zoom<=.5)assert.equal(count,0);else {assert.ok(count>=Math.min(selected?50:10,n));assert.ok(count<=n)}
 }
});
test('geometry keeps identity and leaf paths stable under source reordering',()=>{
 const docs=ids.flatMap(id=>entries(id,55));const a=plan(collections,docs,'marketing'),b=plan([...collections].reverse(),[...docs].reverse(),'marketing');
 assert.deepEqual(a,b);assert.deepEqual(a.nodes.map(n=>n.id),['marketing']);assert.equal(a.nodes[0].color,identity('marketing').color);
});
test('group branches avoid overlapping specialists or dense leaf clumps',()=>{
 const docs=ids.flatMap(id=>entries(id,id==='contents'?0:818));
 for(const selected of [null,...ids]){
  const geometry=plan(collections,docs,selected),points=geometry.leaves;
  for(const l of points){assert.ok(docs.some(e=>e.path===l.id));for(const n of geometry.nodes)assert.ok(Math.hypot(l.x-n.x,l.y-n.y)>60)}
  let closest=Infinity;for(let i=0;i<points.length;i++)for(let j=i+1;j<points.length;j++)closest=Math.min(closest,Math.hypot(points[i].x-points[j].x,points[i].y-points[j].y));
  assert.ok(closest>15,`minimum point distance ${closest}`);
  assert.ok(points.every(p=>p.x>geometry.bounds.minX&&p.x<geometry.bounds.maxX&&p.y>geometry.bounds.minY&&p.y<geometry.bounds.maxY));
 }
});
test('new specialists retain unique positions and stable colors',()=>{
 for(const count of [1,7,10,32,128]){
  const groups=Array.from({length:count},(_,i)=>({id:`expert-${i}`,name:`Expert ${i}`}));const docs=groups.flatMap(g=>entries(g.id,10)),result=plan(groups,docs,null);
  assert.equal(result.nodes.length,count);assert.equal(result.leaves.length,count*10);
  assert.equal(new Set(result.nodes.map(n=>`${n.x},${n.y}`)).size,count);
  assert.ok(result.nodes.every(n=>n.color===identity(n.id).color));
 }
});
test('dedicated specialist caps rendered files across density settings',()=>{
 const docs=entries('marketing',818);
 assert.equal(plan(collections,docs,'marketing',0).leaves.length,50);
 assert.equal(plan(collections,docs,'marketing',3).leaves.length,50);
 assert.equal(plan(collections,docs,'marketing',6).leaves.length,50);
});
test('formation finishes every leaf for large catalogs and arbitrary specialist counts',()=>{
 for(const groups of [1,7,10,128])for(let group=0;group<groups;group++){
  assert.equal(revealAt(1,'collection',group,0,groups),1);
  for(const leaf of [0,9,49,85,817,1200])assert.equal(revealAt(1,'skill',group,leaf,groups),1);
  assert.equal(revealAt(.22,'collection',group,0,groups),0);
  assert.equal(revealAt(.62,'skill',group,0,groups),0);
 }
});
