import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createCatalog, validateManifest, collectionForEntry, resolveSelection, selectionForSkill, search, paginate} from '../packages/atlas/departments.js';
import {hierarchyPlan, identity} from '../packages/atlas/layout.js';

const manifest = JSON.parse(fs.readFileSync(new URL('../Resources/catalog/departments.json', import.meta.url), 'utf8'));
const skill = (id, name, folder = '') => ({path:`SISTEMA/skills/${id}/${folder}${name}/SKILL.md`, name:'SKILL.md', directory:false});
const directory = id => ({path:`SISTEMA/skills/${id}`, name:id, directory:true});
const collection = id => ({id, name:id, icon:'tool'});
const clone = value => structuredClone(value);
const catalog = (entries, collections = []) => createCatalog(collections, entries, manifest);
const freeze = value => {if(value&&typeof value==='object'){Object.freeze(value);Object.values(value).forEach(freeze)}return value};

test('department manifest is extendable and never aliases collection code as a department ID', () => {
  assert.equal(validateManifest(manifest).valid,true);
  assert.ok(manifest.departments.every(d=>d.id.startsWith('department/')));
  const model=catalog([skill('code','review')]);
  assert.equal(model.departmentByID.has('code'),false);
  assert.equal(model.specialistByID.has('department/code'),false);
  const next=clone(manifest);
  next.departments.push({id:'department/research',name:'Pesquisa',icon:'search',collection_ids:['research-lab'],aliases:['Research Lab']});
  const extended=createCatalog([], [skill('research-lab','paper')], next);
  assert.equal(extended.specialistByID.get('research-lab').department,'department/research');
  assert.equal(extended.manifestValid,true);
});

test('invalid schemas, namespaces, fallbacks, colors and ambiguous selectors are rejected', () => {
  const cases=[
    m=>{m.schema_version=2}, m=>{m.departments=[]}, m=>{m.departments[0].id='code'},
    m=>{m.departments.push(clone(m.departments[0]))}, m=>{m.fallback_department='department/missing'},
    m=>{m.departments[0].color='url(javascript:bad)'}, m=>{m.departments[0].aliases=null},
    m=>{m.departments[0].collection_ids.push('../private')},
    m=>{m.departments[1].aliases.push('frontend_design')},
  ];
  for(const mutate of cases){const m=clone(manifest);mutate(m);const result=validateManifest(m);assert.equal(result.valid,false);assert.ok(result.errors.length);assert.equal(result.manifest,null)}
  for(const value of [null,[],false,'manifest'])assert.equal(validateManifest(value).valid,false);
});

test('Código maps only present specialists and keeps the original IDs and document paths', () => {
  const ids=['code','cyber-security','Cybersecurity','frontend-design','Impeccable','Frontend','Richard Design','richard_design'];
  const entries=ids.map(id=>skill(id,'actual-procedure')),before=clone(entries),model=catalog(entries);
  assert.deepEqual(entries,before);
  for(const id of ids){const specialist=model.specialistByID.get(id);assert.equal(specialist.department,'department/code');assert.equal(specialist.skills[0].path,`SISTEMA/skills/${id}/actual-procedure/SKILL.md`)}
  const partial=catalog([skill('cyber-security','actual')],['code','impeccable','frontend-design'].map(collection));
  assert.deepEqual(partial.specialists.map(s=>s.id),['cyber-security']);
  assert.equal(partial.departmentByID.get('department/code').specialistCount,1);
});

test('empty source, absent source and empty department are different states', () => {
  const model=catalog([directory('contents'),directory('my-new-specialist')],[collection('impeccable')]);
  assert.equal(model.specialistByID.get('contents').state,'empty');
  assert.equal(model.specialistByID.get('contents').skillCount,0);
  assert.equal(model.specialistByID.has('impeccable'),false);
  assert.equal(model.departmentByID.get('department/content').state,'no-skills');
  assert.equal(model.departmentByID.get('department/code').state,'empty');
  assert.equal(model.specialistByID.get('my-new-specialist').department,'department/other');
  assert.equal(model.departmentByID.get('department/other').specialistCount,1);
});

test('unmatched discovered specialists survive and inherited JavaScript names are safe IDs', () => {
  const entries=['unclassified','__proto__','constructor'].map(id=>skill(id,'real'));
  const model=catalog(entries);
  assert.equal(model.specialists.length,3);assert.equal(model.skillCount,3);
  for(const specialist of model.specialists){assert.equal(specialist.department,'department/other');assert.equal(specialist.assignment,'fallback');assert.match(specialist.color,/^#[0-9a-f]{6}$/i)}
  assert.match(identity('__proto__').color,/^#[0-9a-f]{6}$/i);
  assert.equal(catalog([]).specialistByID.has('unclassified'),false);
});

test('exact membership wins over a misleading display name; aliases are full matches', () => {
  const model=catalog([skill('code','real'),skill('frontend-design-notes','real'),skill('custom-design','real')],
    [{id:'code',name:'Marketing'},{id:'custom-design',name:'Richard Design'}]);
  assert.equal(model.specialistByID.get('code').department,'department/code');
  assert.equal(model.specialistByID.get('frontend-design-notes').department,'department/other');
  assert.equal(model.specialistByID.get('custom-design').department,'department/code');
});

test('invalid metadata fails safely without discarding discovered files or inventing classifications', () => {
  const invalid=clone(manifest);invalid.schema_version=99;
  const model=createCatalog([], [skill('code','real'),directory('empty-new')], invalid);
  assert.equal(model.manifestValid,false);assert.ok(model.manifestErrors.length);
  assert.equal(model.skillCount,1);assert.equal(model.specialists.length,2);
  assert.ok(model.specialists.every(s=>s.department==='department/other'));
  assert.equal(model.departmentByID.has('department/code'),false);
});

test('canonical path evidence rejects traversal, foreign roots and fake SKILL names; paths are deduplicated', () => {
  const valid=skill('code','real');
  const invalid=[{...valid,path:'/SISTEMA/skills/code/real/SKILL.md'},
    {...valid,path:'SISTEMA/skills/code/../other/SKILL.md'}, {...valid,path:'SISTEMA/skills//other/SKILL.md'},
    {...valid,path:'OTHER/skills/code/real/SKILL.md'}, {...valid,path:'SISTEMA/skills/code\\other/SKILL.md'}];
  for(const row of invalid)assert.equal(collectionForEntry(row),null);
  const model=catalog([valid,clone(valid),...invalid,{path:'SISTEMA/skills/code/notes.md',name:'SKILL.md'}]);
  assert.equal(model.skillCount,1);assert.equal(model.specialists.length,1);
  assert.equal(model.specialists[0].skills.length,1);
});

test('catalog construction and geometry do not mutate frozen input or depend on enumeration order', () => {
  const entries=freeze(['code','cyber-security','marketing','custom'].flatMap(id=>[directory(id),skill(id,'zulu'),skill(id,'alpha')]));
  const descriptors=freeze(['code','cyber-security','marketing','custom'].map(collection)),metadata=freeze(clone(manifest));
  const a=createCatalog(descriptors,entries,metadata),b=createCatalog([...descriptors].reverse(),[...entries].reverse(),metadata);
  assert.deepEqual(a,b);
  const hints=freeze({nodes:{code:{x:3,y:9}},leaves:{}});
  assert.deepEqual(hierarchyPlan(a,resolveSelection(a),hints),hierarchyPlan(b,resolveSelection(b),hints));
});

test('overview links departments to each real specialist exactly once, with no skill leaf clutter', () => {
  const entries=['code','cyber-security','marketing','custom'].flatMap(id=>Array.from({length:121},(_,i)=>skill(id,`skill-${i}`)));
  const model=catalog(entries),view=hierarchyPlan(model,resolveSelection(model));
  assert.deepEqual(view.leaves,[]);assert.deepEqual(view.groups,[]);
  const specialists=view.nodes.filter(n=>n.kind==='specialist'),departments=new Set(view.nodes.filter(n=>n.kind==='department').map(n=>n.id));
  assert.equal(specialists.length,4);assert.equal(new Set(specialists.map(n=>n.id)).size,4);
  for(const node of specialists){assert.ok(departments.has(node.parent));assert.equal(node.parent,model.specialistByID.get(node.id).department);assert.equal(node.skills.length,121)}
  assert.equal(model.skillCount,484);
});

test('department pages reveal only its actual skills, with no overlaps or omitted final page', () => {
  const entries=[...Array.from({length:118},(_,i)=>skill('code',`alpha-${String(i).padStart(3,'0')}`)),
    ...Array.from({length:59},(_,i)=>skill('cyber-security',`beta-${i}`)),skill('marketing','foreign'),directory('Impeccable')];
  const model=catalog(entries),department=model.departmentByID.get('department/code'),visited=new Set();
  for(let page=0;page<4;page++){
    const route=resolveSelection(model,{department:department.id,page}),view=hierarchyPlan(model,route);
    assert.equal(view.pages,4);assert.equal(view.leaves.length,page===3?27:50);
    assert.deepEqual(new Set(view.nodes.filter(n=>n.kind==='specialist').map(n=>n.id)),new Set(['code','cyber-security','Impeccable']));
    for(const leaf of view.leaves){assert.equal(leaf.source,leaf.parent);assert.ok(['code','cyber-security'].includes(leaf.parent));assert.ok(model.skillByPath.has(leaf.id));assert.equal(visited.has(leaf.id),false);visited.add(leaf.id)}
  }
  assert.equal(visited.size,department.skillCount);assert.equal(visited.size,177);
});

test('specialist browsing pages the full multigroup catalog, not repeated samples', () => {
  const entries=Array.from({length:818},(_,i)=>skill('cyber-security',`${String.fromCharCode(97+i%26)}-${String(i).padStart(4,'0')}`));
  const model=catalog(entries),visited=new Set();
  for(let page=0;page<17;page++){
    const route=resolveSelection(model,{specialist:'cyber-security',page}),view=hierarchyPlan(model,route);
    assert.equal(view.pages,17);assert.equal(view.total,818);assert.equal(view.leaves.length,page===16?18:50);
    assert.equal(view.nodes.length,1);assert.equal(view.nodes[0].skills.length,818);
    for(const leaf of view.leaves){assert.equal(visited.has(leaf.id),false);assert.ok(view.groups.some(g=>g.id===leaf.source&&g.skills.some(e=>e.path===leaf.id)));visited.add(leaf.id)}
  }
  assert.equal(visited.size,818);
});

test('full search and direct selection reach a skill that never existed in the rendered scene', () => {
  const entries=Array.from({length:818},(_,i)=>skill('cyber-security',`alpha-${String(i).padStart(4,'0')}`));
  const model=catalog(entries),overview=hierarchyPlan(model,resolveSelection(model));
  const path=entries.at(-1).path;assert.equal(overview.leaves.length,0);
  const found=search(model,'Código alpha 0817');assert.equal(found.total,1);assert.equal(found.rows[0].path,path);
  const route=selectionForSkill(model,path),view=hierarchyPlan(model,route);
  assert.equal(route.department,'department/code');assert.equal(route.specialist,'cyber-security');assert.equal(route.page,16);
  assert.ok(view.leaves.some(l=>l.id===path));assert.equal(view.leaves.length,18);
  assert.equal(selectionForSkill(model,'SISTEMA/skills/absent/no/SKILL.md'),null);
});

test('search pagination is complete and independent of department filter, zoom and display size', () => {
  const entries=['code','marketing'].flatMap(id=>Array.from({length:121},(_,i)=>skill(id,`procedure-${i}`))),model=catalog(entries),visited=new Set();
  for(let page=0;page<5;page++)for(const row of search(model,'',{page}).rows)visited.add(row.path);
  assert.equal(visited.size,242);
  assert.equal(search(model,'',{department:'department/code'}).total,121);
  assert.equal(search(model,'',{specialist:'marketing'}).total,121);
  assert.equal(search(model,'',{department:'department/missing'}).total,0);
});

test('routes recover from removed sources/groups/leaves and clamp malformed or out-of-range pages', () => {
  const model=catalog([skill('code','one')]);
  for(const page of [-1,Infinity,NaN,'bad',5.8,1e12])assert.equal(resolveSelection(model,{specialist:'code',page}).page,0);
  const route=resolveSelection(model,{specialist:'code',department:'department/marketing',group:'unknown',leaf:'missing',page:99});
  assert.equal(route.kind,'specialist');assert.equal(route.department,'department/code');assert.equal(route.group,null);assert.equal(route.leaf,null);
  assert.equal(resolveSelection(model,{specialist:'removed',department:'department/code'}).kind,'department');
  assert.equal(resolveSelection(model,{department:'code'}).kind,'global');
  assert.deepEqual(paginate([],99),{rows:[],total:0,pages:1,page:0,pageSize:50});
});

test('large newly discovered sets keep finite unique overview positions and remain searchable', () => {
  const entries=Array.from({length:128},(_,i)=>skill(`custom-${i}`,'real')),model=catalog(entries),view=hierarchyPlan(model,resolveSelection(model));
  const nodes=view.nodes.filter(n=>n.kind==='specialist');
  assert.equal(nodes.length,128);assert.equal(view.leaves.length,0);
  assert.equal(new Set(nodes.map(n=>`${n.x},${n.y}`)).size,128);
  assert.ok(nodes.every(n=>Number.isFinite(n.x)&&Number.isFinite(n.y)));
  assert.equal(search(model,'real').total,128);
});

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
