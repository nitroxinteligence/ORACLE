/** Real controller methods + an in-memory SVG DOM double; no browser/WebGL process. */
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

const manifest=JSON.parse(fs.readFileSync(new URL('../Resources/catalog/departments.json',import.meta.url),'utf8'));
const source=fs.readFileSync(new URL('../Resources/web/atlas.js',import.meta.url),'utf8');
const plain=value=>JSON.parse(JSON.stringify(value));
const skill=(id,i)=>({path:`SISTEMA/skills/${id}/alpha-${String(i).padStart(4,'0')}/SKILL.md`,name:'SKILL.md',directory:false});
const data=()=>({departmentManifest:manifest,collections:['code','cyber-security','marketing'].map(id=>({id,name:id,icon:'code'})),
  entries:[...Array.from({length:125},(_,i)=>skill('code',i)),...Array.from({length:65},(_,i)=>skill('cyber-security',i)),skill('marketing',0),
    {path:'AREAS/pessoal',name:'pessoal',directory:true},{path:'AREAS/profissional',name:'profissional',directory:true},
    {path:'SISTEMA/prompts',name:'prompts',directory:true},{path:'SISTEMA/prompts/test.md',name:'test.md',directory:false}],
  selected:null,selectedLeaf:null,plugins:[],connectors:[],detail:3,reduced:true});

function harness(input=data()) {
  let document;
  class Element {
    constructor(tag='div') {
      this.tagName=tag;this.children=[];this.attributes=new Map();this.dataset={};this.listeners=new Map();this.hidden=false;this.textContent='';
      this.style={setProperty(key,value){this[key]=value},removeProperty(key){delete this[key]}};
      const classes=new Set();this.classList={add:(...names)=>names.forEach(n=>classes.add(n)),remove:(...names)=>names.forEach(n=>classes.delete(n)),
        contains:name=>classes.has(name),toggle:(name,force)=>{const next=force??!classes.has(name);if(next)classes.add(name);else classes.delete(name);return next}};
      this.offsetWidth=160;this.offsetHeight=22;
    }
    set className(value){this.setAttribute('class',value)}
    get className(){return this.getAttribute('class')||''}
    setAttribute(name,value){value=String(value);this.attributes.set(name,value);if(name==='class')this.classList.add(...value.split(/\s+/));if(name.startsWith('data-'))this.dataset[name.slice(5).replace(/-([a-z])/g,(_,c)=>c.toUpperCase())]=value}
    getAttribute(name){return this.attributes.get(name)??null}
    removeAttribute(name){this.attributes.delete(name)}
    append(...children){for(const child of children){child.remove();child.parentElement=this;this.children.push(child)}}
    replaceChildren(...children){for(const child of this.children)child.parentElement=null;this.children=[];this.append(...children)}
    remove(){if(this.parentElement){this.parentElement.children=this.parentElement.children.filter(e=>e!==this);this.parentElement=null}}
    contains(element){return element===this||this.children.some(c=>c.contains(element))}
    matches(selector){
      if(selector.startsWith('.'))return this.classList.contains(selector.slice(1));
      if(selector.startsWith('#'))return this.getAttribute('id')===selector.slice(1);
      const attr=selector.match(/^\[([^=\]]+)(?:="([^"]*)")?\]$/);
      if(attr)return this.attributes.has(attr[1])&&(attr[2]===undefined||this.getAttribute(attr[1])===attr[2]);
      return this.tagName===selector;
    }
    querySelectorAll(selector){const selectors=selector.split(',').map(s=>s.trim()),results=[];const visit=e=>{for(const child of e.children){if(selectors.some(s=>child.matches(s)))results.push(child);visit(child)}};visit(this);return results}
    querySelector(selector){return this.querySelectorAll(selector)[0]||null}
    closest(selector){return selector.split(',').some(s=>this.matches(s.trim()))?this:this.parentElement?.closest(selector)||null}
    focus(){document.activeElement=this}
    animate(){return {finished:Promise.resolve(),cancel(){}}}
    setPointerCapture(id){this.pointerCapture=id}
    hasPointerCapture(id){return this.pointerCapture===id}
    releasePointerCapture(){this.pointerCapture=null}
    addEventListener(type,handler){if(!this.listeners.has(type))this.listeners.set(type,[]);this.listeners.get(type).push(handler)}
    getBoundingClientRect(){return {left:0,top:0,right:1000,bottom:700,width:1000,height:700}}
  }
  document={hidden:false,documentElement:{dataset:{inputMode:'pointer'}},activeElement:null,
    createElement:tag=>new Element(tag),createElementNS:(_,tag)=>new Element(tag),querySelector:()=>null};
  const window={OracleDepartmentManifest:manifest,oracleWindowVisible:true};
  const scope={window,document,OracleDepartments,OracleLayout,OracleKnowledge,OraclePrompts,OracleAtmosphere,OracleMotion,
    structuredClone,performance,console,paths:{code:'M0 0',note:'M0 0',folder:'M0 0',tool:'M0 0'},
    requestAnimationFrame:()=>1,cancelAnimationFrame:()=>{},setTimeout,clearTimeout,getComputedStyle:()=>({display:'block'})};
  vm.runInNewContext(source,scope,{filename:'Resources/web/atlas.js'});
  const atlas=Object.create(window.OracleAtlas.prototype),events=[];
  const add=(tag,attrs,parent)=>{const element=new Element(tag);for(const [key,value]of Object.entries(attrs||{}))element.setAttribute(key,value);parent?.append(element);return element};
  const host=add('div'),el=add('div',{},host),svg=add('svg',{},el),world=add('g',{},svg);
  const nav=add('nav',{class:'atlas-context'},el);add('button',{'data-map-back':''},nav);add('div',{class:'atlas-breadcrumb'},nav);
  const page=add('div',{class:'atlas-page'},nav);add('button',{'data-map-page':'-1'},page);add('span',{},page);add('button',{'data-map-page':'1'},page);
  add('g',{class:'oracle-core','data-core':'true'},world);
  Object.assign(atlas,{el,svg,world,ns:'http://www.w3.org/2000/svg',abort:new AbortController(),disposed:false,
    nodeLayer:add('g',{},world),edgeLayer:add('g',{},world),groupLayer:add('g',{},world),leafLayer:add('g',{},world),
    expansionWorld:add('g',{},el),expansionRings:Array.from({length:OracleAtmosphere.RING_COUNT},()=>add('circle')),
    starfield:add('svg',{},el),specialistHeading:add('h3',{},el),atmosphereSeconds:0,
    nodes:new Map(),groups:new Map(),leaves:new Map(),orbitTracks:new Map(),history:[],layout:{nodes:{},leaves:{}},
    selected:null,selectedLeaf:null,department:null,knowledge:null,catalog:null,context:{kind:'global',group:null,page:0},
    camera:{x:500,y:350,k:1},target:{x:500,y:350,k:1},baseScale:1,frame:0,width:1000,height:700,first:false,
    viewport:{left:0,right:1000,top:0,bottom:700,width:1000,height:700,cx:500,cy:350},
    interactionFrames:[],updateCosts:[],palette:[],motionPreference:{matches:true},
    cb:{onSelect:(id,leaf,keyboard,selection)=>events.push({id,leaf,keyboard,selection:plain(selection)})}});
  atlas.update(input);
  return {atlas,events,document,Element,window};
}

test('controller overview renders typed department-to-specialist edges and no skill leaves',()=>{
  const {atlas}=harness();
  assert.equal(atlas.context.kind,'global');assert.equal(atlas.leaves.size,0);
  assert.equal(atlas.catalog.skillCount,191);
  assert.equal(atlas.nodes.get('code').parent,'department/code');
  assert.equal(atlas.nodes.get('cyber-security').parent,'department/code');
  assert.equal(atlas.nodes.get('department/code').g.dataset.kind,'department');
  assert.equal(atlas.nodes.get('department/code').label.style.display,'block');
  assert.equal(atlas.nodes.get('department/code').label.style.fill,'#eee');
  assert.equal(atlas.target.k/atlas.baseScale,1.18);
});

test('department selection is separate from code and reports its typed native/app callback contract',()=>{
  const {atlas,events}=harness();
  assert.equal(atlas.setDepartment('code'),false);assert.equal(atlas.context.kind,'global');
  assert.equal(atlas.setDepartment('department/code'),true);
  assert.equal(atlas.selected,null);assert.equal(atlas.department,'department/code');
  assert.equal(atlas.context.kind,'department');assert.equal(atlas.leaves.size,50);
  const event=events.at(-1);assert.equal(event.id,null);assert.equal(event.leaf,null);
  assert.equal(event.selection.kind,'department');assert.equal(event.selection.department,'department/code');
  assert.equal(atlas.data.selectedDepartment,'department/code');
  assert.equal(atlas.el.querySelector('.atlas-context').hidden,false);
  assert.equal(atlas.el.querySelector('.atlas-page').hidden,false);
  assert.ok([...atlas.nodes.values()].every(n=>n.kind==='department'||n.department==='department/code'));
  assert.equal(atlas.nodes.get('code').edge.style.display,'block');
  assert.equal(atlas.nodes.get('department/code').edge.style.display,'none');
});

test('specialist and department pagers display disjoint complete catalogs and disable the final button',()=>{
  const {atlas}=harness();atlas.setDepartment('department/code');
  const first=new Set(atlas.geometry.leaves.map(l=>l.id));atlas.pageGroup(1);
  assert.equal(atlas.context.page,1);assert.ok(atlas.geometry.leaves.every(l=>!first.has(l.id)));
  atlas.select('code');assert.equal(atlas.context.kind,'specialist');assert.equal(atlas.department,'department/code');
  assert.equal(atlas.context.group,null);assert.equal(atlas.geometry.pages,3);
  const visited=new Set(atlas.geometry.leaves.map(l=>l.id));
  for(let page=1;page<3;page++){atlas.pageGroup(1);for(const leaf of atlas.geometry.leaves){assert.equal(visited.has(leaf.id),false);visited.add(leaf.id)}}
  assert.equal(visited.size,125);assert.equal(atlas.geometry.leaves.length,25);
  assert.equal(atlas.el.querySelector('[data-map-page="1"]').disabled,true);
  atlas.pageGroup(1);assert.equal(atlas.context.page,2);
});

test('back restores department, catalog page and custom camera; overview returns to 118%',()=>{
  const {atlas}=harness();atlas.setDepartment('department/code',{page:1});
  atlas.target={x:611,y:249,k:atlas.baseScale*1.42};atlas.autoFit=false;const departmentCamera={...atlas.target};
  atlas.focus('code');atlas.pageGroup(1);
  atlas.target={x:459,y:330,k:atlas.baseScale*1.65};atlas.autoFit=false;const specialistCamera={...atlas.target};
  atlas.revealSkill(skill('code',124).path);assert.equal(atlas.context.kind,'skill');
  atlas.back(true);assert.equal(atlas.context.kind,'specialist');assert.equal(atlas.context.page,1);
  for(const key of ['x','y','k'])assert.ok(Math.abs(atlas.target[key]-specialistCamera[key])<1e-8);
  atlas.back(true);assert.equal(atlas.context.kind,'specialist');assert.equal(atlas.context.page,0);
  atlas.back(true);assert.equal(atlas.context.kind,'department');assert.equal(atlas.department,'department/code');assert.equal(atlas.context.page,1);
  for(const key of ['x','y','k'])assert.ok(Math.abs(atlas.target[key]-departmentCamera[key])<1e-8);
  atlas.back(true);assert.equal(atlas.context.kind,'global');assert.equal(atlas.department,null);
  assert.equal(atlas.target.k/atlas.baseScale,1.18);
});

test('search reveals a hidden skill from overview and back restores the overview without leftover leaves',()=>{
  const {atlas}=harness(),path=skill('code',124).path;
  assert.equal(atlas.leaves.has(path),false);
  const result=atlas.searchSkills('Código alpha 0124');assert.equal(result.total,1);
  assert.equal(atlas.revealSkill(path),true);assert.equal(atlas.selected,'code');assert.equal(atlas.selectedLeaf,path);
  assert.equal(atlas.context.page,2);assert.ok(atlas.leaves.has(path));
  atlas.back(true);assert.equal(atlas.context.kind,'global');assert.equal(atlas.leaves.size,0);
  assert.equal(atlas.revealSkill('SISTEMA/skills/absent/none/SKILL.md'),false);
});

test('snapshot refresh preserves internal department/page when no external department override is supplied',()=>{
  const input=data(),{atlas}=harness(input);atlas.setDepartment('department/code',{page:2});
  const depth=atlas.history.length;
  atlas.update({...input,detail:6});
  assert.equal(atlas.context.kind,'department');assert.equal(atlas.context.page,2);assert.equal(atlas.department,'department/code');
  assert.equal(atlas.history.length,depth);
  atlas.update({...input,selected:'code',selectedLeaf:skill('code',124).path,selectedDepartment:null});
  assert.equal(atlas.context.kind,'skill');assert.equal(atlas.selectedLeaf,skill('code',124).path);
  assert.equal(atlas.context.page,2);assert.equal(atlas.department,'department/code');
});

test('refresh recovers removed leaves and specialists, with no phantom packages or stale focal crashes',()=>{
  const input=data(),{atlas,events}=harness(input),path=skill('code',124).path;
  atlas.revealSkill(path);
  atlas.update({...input,selected:'code',selectedLeaf:path,entries:input.entries.filter(e=>e.path!==path)});
  assert.equal(atlas.selectedLeaf,null);assert.equal(atlas.selected,'code');assert.equal(atlas.leaves.has(path),false);
  assert.doesNotThrow(()=>atlas.resize());
  atlas.update({...input,selected:'code',entries:input.entries.filter(e=>!e.path.startsWith('SISTEMA/skills/code/'))});
  assert.equal(atlas.selected,null);assert.equal(atlas.context.kind,'department');assert.equal(atlas.nodes.has('code'),false);
  assert.equal(events.at(-1).id,null);
  assert.doesNotThrow(()=>atlas.back(true));
});

test('empty department and empty discovered specialist have distinct visible explanations',()=>{
  const input=data();input.entries.push({path:'SISTEMA/skills/contents',name:'contents',directory:true});
  const {atlas}=harness(input);
  atlas.setDepartment('department/sales');
  assert.match(atlas.el.querySelector('.knowledge-empty').textContent,/Nenhum especialista/);
  atlas.setDepartment('department/content');
  assert.match(atlas.el.querySelector('.knowledge-empty').textContent,/presentes, mas ainda não contêm skills/);
  atlas.select('contents');
  assert.match(atlas.el.querySelector('.knowledge-empty').textContent,/fonte está presente/);
  assert.equal(atlas.leaves.size,0);assert.equal(atlas.context.kind,'specialist');
});

test('invalid manifests disclose fallback while leaving all discovered skills searchable',()=>{
  const input=data();input.departmentManifest={...manifest,schema_version:500};const {atlas}=harness(input);
  assert.equal(atlas.catalog.manifestValid,false);assert.equal(atlas.catalog.skillCount,191);
  assert.match(atlas.el.querySelector('.knowledge-empty').textContent,/Classificação indisponível/);
  assert.equal(atlas.searchSkills('alpha').total,191);
  atlas.revealSkill(skill('code',124).path);assert.equal(atlas.department,'department/other');
});

test('Pessoal, Profissional and Prompts routes and colors survive department navigation',()=>{
  const input=data(),{atlas}=harness(input);
  const colors=atlas.knowledgeOrbit.areas.map(a=>[a.name,a.color]),promptColor=atlas.promptOrbit.points[0].color;
  assert.deepEqual(colors,[['Pessoal','#D4A1CC'],['Profissional','#83B9D7']]);
  atlas.setDepartment('department/code',{page:1});atlas.navigateKnowledge('prompts','SISTEMA/prompts');
  assert.equal(atlas.context.kind,'knowledge');assert.equal(atlas.department,null);
  atlas.update({...input});assert.equal(atlas.context.kind,'knowledge');assert.equal(atlas.knowledge.area,'prompts');
  atlas.back(true);assert.equal(atlas.context.kind,'department');assert.equal(atlas.context.page,1);
  atlas.select(null);assert.deepEqual(atlas.knowledgeOrbit.areas.map(a=>[a.name,a.color]),colors);
  assert.equal(atlas.promptOrbit.points[0].color,promptColor);assert.equal(atlas.target.k/atlas.baseScale,1.18);
});

test('keyboard Enter opens a department and specialist arrows remain inside that department',()=>{
  const {atlas}=harness();atlas.bind();
  const fire=(key,target)=>{for(const handler of atlas.el.listeners.get('keydown')||[])handler({key,target,preventDefault(){},stopPropagation(){},altKey:false})};
  fire('Enter',atlas.nodes.get('department/code').g);
  assert.equal(atlas.context.kind,'department');assert.equal(atlas.department,'department/code');
  fire('Enter',atlas.nodes.get('code').g);assert.equal(atlas.selected,'code');
  fire('ArrowRight',atlas.nodes.get('code').g);assert.equal(atlas.selected,'cyber-security');assert.equal(atlas.department,'department/code');
  fire('ArrowRight',atlas.nodes.get('cyber-security').g);assert.equal(atlas.selected,'code');
});

test('pointer clicks enter department, specialist and actual skill without conflating their IDs',()=>{
  const {atlas}=harness();atlas.bind();
  const click=target=>{
    const event={target,button:0,pointerId:1,clientX:500,clientY:350,preventDefault(){},stopPropagation(){},altKey:false};
    for(const handler of atlas.el.listeners.get('pointerdown')||[])handler(event);
    for(const handler of atlas.el.listeners.get('pointerup')||[])handler(event);
  };
  click(atlas.nodes.get('department/code').g);assert.equal(atlas.context.kind,'department');
  click(atlas.nodes.get('code').g);assert.equal(atlas.context.kind,'specialist');
  const leaf=atlas.leaves.values().next().value;click(leaf.g);
  assert.equal(atlas.context.kind,'skill');assert.equal(atlas.selectedLeaf,leaf.id);assert.equal(atlas.selected,'code');
});

test('rapid animated department changes settle only the latest navigation',async()=>{
  const {atlas,events}=harness();atlas.reduced=false;
  atlas.setDepartment('department/code');atlas.setDepartment('department/marketing');
  // Resolve both animation stages without wall-clock timers or a rendering process.
  for(let i=0;i<12;i++)await Promise.resolve();
  assert.equal(atlas.department,'department/marketing');assert.equal(atlas.context.kind,'department');
  assert.equal(atlas.el.classList.contains('scene-travelling'),false);
  assert.equal(atlas.history.length,1);assert.equal(atlas.sceneError,undefined);
  assert.equal(events.filter(e=>e.selection.kind==='department').length,1);
});
