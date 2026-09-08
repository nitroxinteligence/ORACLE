import test from 'node:test';
import assert from 'node:assert/strict';
import {catalogGroups,plan,sampleGroups,fitCamera} from '../packages/atlas/layout.js';
const entry = (folder,name) => ({path:`SISTEMA/skills/marketing/${folder}${name}/SKILL.md`,name:'SKILL.md'});

test('hierarchy links files only to membership groups, never to a preceding skill',()=>{
  const entries=Array.from({length:818},(_,i)=>entry('skills/',`${String.fromCharCode(97+i%26)}-${String(i).padStart(4,'0')}`));
  const result=plan([{id:'marketing',name:'Marketing'}],entries,'marketing');
  const paths=new Set(entries.map(e=>e.path)),groups=new Map(result.groups.map(g=>[g.id,g]));
  assert.equal(result.nodes[0].skills.length,818);
  assert.equal(result.leaves.length,50);
  for(const leaf of result.leaves){assert.ok(paths.has(leaf.id));assert.ok(!paths.has(leaf.source));assert.equal(leaf.source,leaf.group);assert.ok(groups.get(leaf.source).skills.some(e=>e.path===leaf.id))}
  assert.equal(new Set(result.groups.flatMap(g=>g.skills.map(e=>e.path))).size,818);
});
test('real folder provenance survives, packaging folders are honestly alphabetical',()=>{
  const entries=[entry('research/','audience'),entry('research/','market'),entry('skills/','campaign'),entry('','launch')];
  const groups=catalogGroups('marketing',entries);
  const folder=groups.find(g=>g.kind==='folder');assert.equal(folder.name,'research');assert.equal(folder.originPath,'SISTEMA/skills/marketing/research');assert.equal(folder.skills.length,2);
  assert.equal(groups.filter(g=>g.kind==='alphabet').length,2);
  assert.ok(groups.some(g=>g.kind==='alphabet'&&g.originPath==='SISTEMA/skills/marketing/skills'));
});
test('every file in a growing group remains reachable through pages, including the last 18',()=>{
  const groups=catalogGroups('marketing',Array.from({length:818},(_,i)=>entry('',`alpha-${i}`)));
  assert.equal(groups.length,1);const visited=new Set();
  for(let page=0;page<Math.ceil(818/50);page++){
    const members=sampleGroups(groups,50,groups[0].id,page).get(groups[0].id);
    assert.equal(members.length,50);for(const member of members)visited.add(member.path);
  }
  assert.equal(visited.size,818);
});
test('fit reserves navigation space and contains focal geometry on small and wide windows',()=>{
  const bounds={minX:-720,maxX:1160,minY:-430,maxY:980};
  for(const [w,h] of [[520,440],[886,584],[1180,724]]){
    const c=fitCamera(bounds,w,h,56,18);
    assert.ok(c.x+bounds.minX*c.k>=17.999);assert.ok(c.x+bounds.maxX*c.k<=w-17.999);
    assert.ok(c.y+bounds.minY*c.k>=73.999);assert.ok(c.y+bounds.maxY*c.k<=h-17.999);
    assert.ok(Number.isFinite(c.k)&&c.k>0);
  }
});
