import test from 'node:test';
import assert from 'node:assert/strict';
import {pluginOrbitRadius,orbitalPosition} from '../packages/atlas/motion.js';
import {orbit} from '../packages/atlas/knowledge.js';
test('plugin orbit preserves at least 7 units between 26-unit icon discs',()=>{
 for(const count of [1,7,16,32,80])for(const seconds of [0,5,37,72,240]){
  const radius=pluginOrbitRadius(count),points=Array.from({length:count},(_,i)=>orbitalPosition(radius,-Math.PI/2+i*Math.PI*2/count,seconds,72));
  for(let i=0;i<count;i++)for(let j=i+1;j<count;j++)assert.ok(Math.hypot(points[i].x-points[j].x,points[i].y-points[j].y)>=33);
 }
});
test('knowledge rings remain clear of plugins and one another at different phases',()=>{
 const entries=[{path:'AREAS/pessoal',name:'pessoal',directory:true},...Array.from({length:90},(_,i)=>({path:`AREAS/pessoal/Nota ${i}.md`,name:`Nota ${i}.md`,directory:false}))];
 const pluginRadius=pluginOrbitRadius(32),model=orbit(entries,pluginRadius);
 for(const seconds of [0,7,37,89,301]){
  const points=model.points.map(p=>{const ring=model.rings.findIndex(r=>Math.abs(r-Math.hypot(p.x,p.y))<.01);return {...orbitalPosition(model.rings[ring],Math.atan2(p.y,p.x),seconds+ring*13,96+ring*24,ring%2?-1:1,2.5),r:p.r}});
  for(const p of points)assert.ok(Math.hypot(p.x,p.y)-p.r>pluginRadius+13+20);
  for(let i=0;i<points.length;i++)for(let j=i+1;j<points.length;j++)assert.ok(Math.hypot(points[i].x-points[j].x,points[i].y-points[j].y)>points[i].r+points[j].r+5);
 }
});
