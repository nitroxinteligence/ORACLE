/** Integrated audit contracts over the real Atlas controller and the existing synthetic SVG fixture. */
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as OracleDepartments from '../packages/atlas/departments.js';
import * as OracleLayout from '../packages/atlas/layout.js';
import * as OracleKnowledge from '../packages/atlas/knowledge.js';
import * as OraclePrompts from '../packages/atlas/prompts.js';
import * as OracleAtmosphere from '../packages/atlas/atmosphere.js';
import * as OracleMotion from '../packages/atlas/motion.js';
import '../Resources/web/library.js';

// Reuse only the existing fixture declarations. Its legacy variable-zoom tests
// are run separately, unchanged; no production source is substituted here.
const fixtureURL = new URL('./test-department-navigation.mjs', import.meta.url);
const fixture = fs.readFileSync(fixtureURL, 'utf8');
const boundary = fixture.indexOf("\ntest('controller overview");
assert.ok(boundary > 0, 'SVG fixture boundary must remain explicit');
const prelude = fixture.slice(0,boundary).replace(/^import .*;\n/gm,'').replaceAll('import.meta.url','fixtureURL');
const {harness,data} = vm.runInNewContext(prelude+'\n({harness,data})', {
  fs,vm,URL,fixtureURL:fixtureURL.href,OracleDepartments,OracleLayout,OracleKnowledge,
  OraclePrompts,OracleAtmosphere,OracleMotion,structuredClone,performance,console,
  OracleLibrary:globalThis.OracleLibrary,AbortController,setTimeout,clearTimeout,
});
const manifest = JSON.parse(fs.readFileSync(new URL('../Resources/catalog/departments.json',import.meta.url),'utf8'));
const skill = (id,name='actual') => ({path:`SISTEMA/skills/${id}/${name}/SKILL.md`,name:'SKILL.md',directory:false});
const note = path => ({path,name:path.split('/').at(-1),directory:false});
const close = (actual,expected,label) => assert.ok(Math.abs(actual-expected)<1e-8,`${label}: ${actual} != ${expected}`);
const fixed = atlas => {
  close(atlas.camera.k/atlas.baseScale,1.2,'camera zoom');
  close(atlas.target.k/atlas.baseScale,1.2,'target zoom');
};
const center = (atlas,camera=atlas.target) => ({x:(atlas.viewCenter().x-camera.x)/camera.k,y:(atlas.viewCenter().y-camera.y)/camera.k});
const fire = (atlas,type,event) => {for(const handler of atlas.el.listeners.get(type)||[])handler({preventDefault(){},stopPropagation(){},altKey:false,...event});};

test('saved assignments override manifest membership without moving or fabricating sources',()=>{
  const entries=['code','marketing','custom','research-lab'].map(id=>Object.freeze(skill(id)));
  const assignments=Object.freeze({code:'unassigned',marketing:'code',custom:'department/design','research-lab':'research',absent:'sales'});
  const before=JSON.stringify({entries,assignments,manifest});
  const model=OracleDepartments.createCatalog([],entries,manifest,assignments);
  assert.equal(model.specialistByID.get('code').department,'department/other');
  assert.equal(model.specialistByID.get('marketing').department,'department/code');
  assert.equal(model.specialistByID.get('custom').department,'department/design');
  assert.equal(model.specialistByID.get('research-lab').department,'department/research');
  assert.equal(model.specialistByID.get('code').assignment,'user');
  assert.equal(model.specialistByID.has('absent'),false);
  assert.equal(model.skillCount,entries.length);
  assert.equal(JSON.stringify({entries,assignments,manifest}),before);
  const reordered=OracleDepartments.createCatalog([],entries.slice().reverse(),manifest,Object.fromEntries(Object.entries(assignments).reverse()));
  assert.deepEqual(model,reordered);
  assert.equal(OracleDepartments.createCatalog([],entries,manifest).specialistByID.get('code').department,'department/code');
});

test('assignment namespace mapping rejects malformed input and ignores inherited properties',()=>{
  for(const [value,expected] of [['code','department/code'],['department/code','department/code'],['unassigned','department/other'],['department/unassigned','department/other']])assert.equal(OracleDepartments.departmentID(value),expected);
  for(const value of [null,{},'', '../code','department//code','department:code'])assert.equal(OracleDepartments.departmentID(value),null);
  for(const assignments of [null,[],Object.create({code:'sales'}),{code:'../sales'},{code:'department/missing'}]){
    const model=OracleDepartments.createCatalog([],[skill('code')],manifest,assignments);
    assert.equal(model.specialistByID.get('code').department,'department/code');
  }
  const own=JSON.parse('{"__proto__":"sales","constructor":"content"}');
  const model=OracleDepartments.createCatalog([],[skill('__proto__'),skill('constructor')],manifest,own);
  assert.equal(model.specialistByID.get('__proto__').department,'department/sales');
  assert.equal(model.specialistByID.get('constructor').department,'department/content');
});

test('assignment refresh updates selected skill, callbacks and search to the same complete catalog',()=>{
  const {atlas,events}=harness();
  const path='SISTEMA/skills/code/alpha-0124/SKILL.md';atlas.revealSkill(path);
  atlas.update({...atlas.data,departmentAssignments:{code:'sales'}});
  assert.equal(atlas.selectedLeaf,path);assert.equal(atlas.context.page,2);
  assert.equal(atlas.department,'department/sales');assert.equal(atlas.leaves.has(path),true);
  assert.equal(events.at(-1).selection.department,'department/sales');
  assert.equal(atlas.searchSkills('Vendas alpha 0124').rows[0].path,path);
  atlas.update({...atlas.data,departmentAssignments:{code:'unassigned'}});
  assert.equal(atlas.department,'department/other');assert.equal(atlas.selectedLeaf,path);fixed(atlas);
});

test('history restores pages and world center while rejecting legacy variable zoom',()=>{
  const {atlas}=harness();atlas.setDepartment('department/code',{page:1});
  atlas.target={x:611,y:249,k:atlas.baseScale*1.42};atlas.autoFit=false;const departmentCenter=center(atlas);
  atlas.focus('code');atlas.pageGroup(1);
  atlas.target={x:459,y:330,k:atlas.baseScale*1.65};atlas.autoFit=false;const specialistCenter=center(atlas);
  atlas.revealSkill('SISTEMA/skills/code/alpha-0124/SKILL.md');fixed(atlas);
  atlas.back(true);fixed(atlas);assert.equal(atlas.context.kind,'specialist');assert.equal(atlas.context.page,1);
  close(center(atlas).x,specialistCenter.x,'specialist center x');close(center(atlas).y,specialistCenter.y,'specialist center y');
  atlas.back(true);fixed(atlas);assert.equal(atlas.context.page,0);
  atlas.back(true);fixed(atlas);assert.equal(atlas.context.kind,'department');assert.equal(atlas.context.page,1);
  close(center(atlas).x,departmentCenter.x,'department center x');close(center(atlas).y,departmentCenter.y,'department center y');
  atlas.back(true);fixed(atlas);assert.equal(atlas.context.kind,'global');
});

test('wheel, keyboard, resize, reset and refresh retain 120 percent in all graph routes',()=>{
  const {atlas}=harness();atlas.bind();atlas.data.replay=true;
  for(const navigate of [()=>atlas.select(null),()=>atlas.setDepartment('department/code'),()=>atlas.focus('code'),()=>atlas.revealSkill('SISTEMA/skills/code/alpha-0124/SKILL.md'),()=>atlas.navigateKnowledge('prompts','SISTEMA/prompts')]){
    navigate();fixed(atlas);atlas.zoomAt(4);fixed(atlas);
    fire(atlas,'wheel',{target:atlas.svg,ctrlKey:true,deltaY:-120,clientX:100,clientY:100});fixed(atlas);
    fire(atlas,'keydown',{target:atlas.svg,key:'+'});fixed(atlas);
    atlas.resize();fixed(atlas);atlas.update({...atlas.data,detail:5});fixed(atlas);
  }
  atlas.reset();fixed(atlas);
});

test('prompt root choice scopes orbit, drilldown and reader to the selected original path',()=>{
  const input=data();input.entries=input.entries.filter(e=>!OraclePrompts.contains(e.path));
  input.entries.push(note('SISTEMA/PROMPTS/Upper.md'),note('SISTEMA/prompts/Lower.md'));
  const {atlas}=harness(input),opened=[];atlas.cb.onOpenPrompt=path=>opened.push(path);
  assert.equal(atlas.promptOrbit.area.ambiguous,true);assert.equal(atlas.promptOrbit.points.length,0);
  atlas.update({...atlas.data,promptRoot:'SISTEMA/PROMPTS'});
  atlas.navigateKnowledge('prompts','SISTEMA/PROMPTS');
  assert.equal(atlas.knowledge.path,'SISTEMA/PROMPTS');
  assert.deepEqual([...atlas.leaves.keys()],['SISTEMA/PROMPTS/Upper.md']);
  atlas.select(null,'SISTEMA/PROMPTS/Upper.md');assert.deepEqual(opened,['SISTEMA/PROMPTS/Upper.md']);
  atlas.update({...atlas.data,promptRoot:'SISTEMA/prompts'});
  assert.equal(atlas.knowledge.path,'SISTEMA/prompts');
  assert.deepEqual([...atlas.leaves.keys()],['SISTEMA/prompts/Lower.md']);fixed(atlas);
});

test('department breadcrumbs and Escape use the typed route without duplicate handlers',()=>{
  const {atlas}=harness();atlas.bind();atlas.setDepartment('department/code');
  assert.equal(atlas.el.querySelector('.atlas-breadcrumb').children.at(-1).textContent,'Código');
  atlas.focus('code');
  assert.equal(atlas.el.querySelector('.atlas-breadcrumb').children.length,3);
  fire(atlas,'keydown',{target:atlas.el.querySelector('[data-map-back]'),key:'Escape'});
  assert.equal(atlas.context.kind,'department');assert.equal(atlas.department,'department/code');
  fire(atlas,'keydown',{target:atlas.el.querySelector('[data-map-back]'),key:'Escape'});
  assert.equal(atlas.context.kind,'global');fixed(atlas);
});

test('plugin orbit includes only connected public tools and removes stale connection nodes',()=>{
  const input=data();input.plugins=[{id:'figma',name:'Figma',status:'connected'},{id:'disabled',name:'Disabled',status:'disabled'},{id:'pending',name:'Pending',status:'installed'},{id:'connector_openai_hotline',name:'Internal',status:'connected'}];
  const {atlas}=harness(input);
  assert.deepEqual(Array.from(atlas.el.querySelectorAll('[data-orbit-plugin]'),e=>e.dataset.orbitPlugin),['figma']);
  atlas.update({...atlas.data,plugins:[{id:'figma',name:'Figma',status:'disconnected'}]});
  assert.equal(atlas.el.querySelectorAll('[data-orbit-plugin]').length,0);
});
