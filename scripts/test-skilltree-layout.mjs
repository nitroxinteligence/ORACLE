import test from 'node:test';
import assert from 'node:assert/strict';
import {catalogGroups,plan,sampleGroups,fitCamera,separateSpecialists} from '../packages/atlas/layout.js';
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
  assert.ok(groups.some(g=>g.kind==='alphabet'&&g.originPath==='SISTEMA/skills/marketing'));
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

test('specialist force separates overlapping saved positions and clears the core',()=>{
  const nodes=[{id:'cyber-security',x:-120,y:180},{id:'last-30-days',x:-105,y:190},{id:'code',x:0,y:0}];
  separateSpecialists(nodes,250,168);
  for(const node of nodes)assert.ok(Math.hypot(node.x,node.y)>=249.999);
  for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++)
    assert.ok(Math.hypot(nodes[i].x-nodes[j].x,nodes[i].y-nodes[j].y)>=167.8);
});

test('global leaf fans stay inside the space assigned to their specialist',()=>{
  const collections=['ads','code','contents','customer-finder','cyber-security','marketing','personal-branding','last-30-days'].map(id=>({id,name:id}));
  const entries=collections.flatMap(({id})=>Array.from({length:10},(_,i)=>({name:'SKILL.md',path:`SISTEMA/skills/${id}/skill-${String(i).padStart(2,'0')}/SKILL.md`})));
  const manual={nodes:{'cyber-security':{x:-120,y:180},'last-30-days':{x:-105,y:190}}};
  const result=plan(collections,entries,null,3,manual);
  for(let i=0;i<result.nodes.length;i++)for(let j=i+1;j<result.nodes.length;j++)
    assert.ok(Math.hypot(result.nodes[i].x-result.nodes[j].x,result.nodes[i].y-result.nodes[j].y)>=167.8);
  for(const node of result.nodes){
    const peers=result.nodes.filter(other=>other!==node);
    const sector=Math.min(1.25,Math.min(...peers.map(other=>Math.abs(Math.atan2(Math.sin(other.angle-node.angle),Math.cos(other.angle-node.angle)))))*.82);
    for(const leaf of result.leaves.filter(leaf=>leaf.parent===node.id)){
      const angle=Math.atan2(leaf.y,leaf.x),delta=Math.abs(Math.atan2(Math.sin(angle-node.angle),Math.cos(angle-node.angle)));
      assert.ok(delta<=sector*.5+.02,`${node.id} leaf escaped its sector: ${delta} > ${sector*.5}`);
    }
  }
});

test('dedicated scenes cap the graph while retaining the entire catalog and selected file',()=>{
  const entries=Array.from({length:818},(_,i)=>entry('',`alpha-${String(i).padStart(4,'0')}`));
  for(const detail of [0,3,6]){
    const result=plan([{id:'marketing',name:'Marketing'},{id:'code',name:'Code'}],entries,'marketing',detail);
    assert.equal(result.leaves.length,50);assert.equal(result.nodes[0].skills.length,818);
    assert.deepEqual(result.nodes.map(n=>n.id),['marketing']);assert.equal(result.nodes[0].x,0);assert.equal(result.nodes[0].y,0);
  }
  const groups=catalogGroups('marketing',entries),leaf=entries.at(-1).path;
  for(const context of [{leaf},{group:groups[0].id,page:0,leaf}]){
    const result=plan([{id:'marketing'}],entries,'marketing',3,{},248,context);
    assert.equal(result.leaves.length,50);assert.ok(result.leaves.some(l=>l.id===leaf));
  }
});

test('an uneven Ads catalog does not draw group-to-file edges through the specialist',()=>{
  const entries=[{name:'SKILL.md',path:'SISTEMA/skills/ads/ads/SKILL.md'},...Array.from({length:33},(_,i)=>({name:'SKILL.md',path:`SISTEMA/skills/ads/skills/ads-${i}/SKILL.md`}))];
  const result=plan([{id:'ads'}],entries,'ads');
  assert.equal(result.groups.length,1);assert.ok(result.groups[0].rootMembership);
  const branched=plan([{id:'ads'}],entries.map((e,i)=>({...e,path:e.path.replace('ads/','ads/'+(i?'production/':'research/'))})),'ads');
  for(const leaf of branched.leaves){
    const g=branched.groups.find(g=>g.id===leaf.group),dx=leaf.x-g.x,dy=leaf.y-g.y;
    const t=Math.max(0,Math.min(1,-(g.x*dx+g.y*dy)/(dx*dx+dy*dy)));
    assert.ok(Math.hypot(g.x+t*dx,g.y+t*dy)>90);
  }
  const one=plan([{id:'ads'}],entries.slice(1),'ads');
  assert.equal(one.groups.length,1);assert.equal(one.groups[0].rootMembership,true);
  assert.equal(one.groups[0].x,0);assert.equal(one.groups[0].y,0);
});
