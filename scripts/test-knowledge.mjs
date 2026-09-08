import test from 'node:test';
import assert from 'node:assert/strict';
import {areas,orbit,plan,orbitPlugins} from '../packages/atlas/knowledge.js';
const dir=path=>({path,name:path.split('/').at(-1),directory:true});
const note=path=>({path,name:path.split('/').at(-1),directory:false});
const catalog=[dir('AREAS'),dir('AREAS/pessoal'),dir('AREAS/profissional'),dir('AREAS/pessoal/Rotina'),note('AREAS/pessoal/Rotina/Habitos.md'),dir('AREAS/profissional/Empresa'),note('AREAS/profissional/Empresa/Plano.md')];
test('areas use real canonical folders and support existing named roots',()=>{
 assert.deepEqual(areas(catalog).map(a=>[a.path,a.notes]),[['AREAS/pessoal',1],['AREAS/profissional',1]]);
 assert.deepEqual(areas([dir('Pessoal'),dir('Profissional')]).map(a=>a.path),['Pessoal','Profissional']);
 assert.ok(areas([]).every(a=>!a.exists&&a.notes===0));
});
test('orbit remains outside plugins, caps visible nodes and preserves both roots',()=>{
 const entries=[...catalog,...Array.from({length:900},(_,i)=>note(`AREAS/profissional/Empresa/Nota ${i}.md`))];
 const result=orbit(entries,140);assert.equal(result.points.length,50);assert.equal(result.points.filter(p=>p.root).length,2);
 assert.ok(result.points.every(p=>Math.hypot(p.x,p.y)>170));assert.ok(result.points.every(p=>p.tooltip&&/^#[0-9A-F]{6}$/i.test(p.color)));
 assert.ok(result.points.filter(p=>!p.root).every(p=>entries.some(e=>e.path===p.path)));
 assert.deepEqual(result.points.filter(p=>p.root).map(p=>[p.x,p.y]),orbit(catalog,140).points.filter(p=>p.root).map(p=>[p.x,p.y]));
});
test('folder scene shows only direct members, not unrelated notes or skills',()=>{
 const result=plan(catalog,{area:'personal',path:'AREAS/pessoal',page:0});
 assert.deepEqual(result.leaves.map(l=>l.id),['AREAS/pessoal/Rotina']);
 assert.equal(result.nodes[0].x,0);assert.equal(result.nodes[0].y,0);
 const nested=plan(catalog,{area:'personal',path:'AREAS/pessoal/Rotina'});
 assert.deepEqual(nested.leaves.map(l=>l.id),['AREAS/pessoal/Rotina/Habitos.md']);assert.equal(nested.leaves[0].directory,false);
});
test('every folder item remains reachable with 50-item pages, including the tail',()=>{
 const entries=[dir('AREAS/profissional'),...Array.from({length:153},(_,i)=>note(`AREAS/profissional/Nota ${i}.md`))],seen=new Set();
 for(let page=0;page<4;page++){const r=plan(entries,{area:'professional',path:'AREAS/profissional',page});assert.ok(r.leaves.length<=50);for(const l of r.leaves)seen.add(l.id)}
 assert.equal(seen.size,153);
});
test('invalid or vanished folder scope falls back to its area without escaping',()=>{
 for(const path of ['../secrets','AREAS/pessoal/../../other','AREAS/profissional','AREAS/pessoal/missing'])assert.equal(plan(catalog,{area:'personal',path}).route.path,'AREAS/pessoal');
});
test('internal service connectors are omitted only from the orbit',()=>{
 const plugins=['connector_openai_hotline','connector_openai_codex_document_control','connector_openai_safety_settings','figma'].map(id=>({id,status:'connected'}));
 assert.deepEqual(orbitPlugins(plugins).map(p=>p.id),['figma']);assert.equal(plugins.length,4);
});
