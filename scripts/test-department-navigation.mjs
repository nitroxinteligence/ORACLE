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
import '../Resources/web/library.js';
const OracleLibrary=globalThis.OracleLibrary;

const manifest=JSON.parse(fs.readFileSync(new URL('../Resources/catalog/departments.json',import.meta.url),'utf8'));
const source=fs.readFileSync(new URL('../Resources/web/atlas.js',import.meta.url),'utf8');
const plain=value=>JSON.parse(JSON.stringify(value));
const skill=(id,i)=>({path:`SISTEMA/skills/${id}/alpha-${String(i).padStart(4,'0')}/SKILL.md`,name:'SKILL.md',directory:false});
const data=()=>({departmentManifest:manifest,collections:['code','cyber-security','marketing'].map(id=>({id,name:id,icon:'code'})),
  entries:[...Array.from({length:125},(_,i)=>skill('code',i)),...Array.from({length:65},(_,i)=>skill('cyber-security',i)),skill('marketing',0),
    {path:'AREAS/pessoal',name:'pessoal',directory:true},{path:'AREAS/profissional',name:'profissional',directory:true},
    {path:'SISTEMA/prompts',name:'prompts',directory:true},{path:'SISTEMA/prompts/test.md',name:'test.md',directory:false}],
  selected:null,selectedLeaf:null,plugins:[],connectors:[],detail:3,reduced:true});

function harness(input=data(),{autoFlush=true}={}) {
  const frames=new Map();let frameID=0;
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
    insertBefore(child,reference){child.remove();child.parentElement=this;const index=this.children.indexOf(reference);if(index<0)this.children.push(child);else this.children.splice(index,0,child);return child}
    getComputedTextLength(){return this.textContent.length*7}
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
  document={addEventListener(){},hidden:false,documentElement:{dataset:{inputMode:'pointer'}},activeElement:null,
    createElement:tag=>new Element(tag),createElementNS:(_,tag)=>new Element(tag),querySelector:()=>null};
  const window=Object.assign(new Element('window'),{OracleDepartmentManifest:manifest,oracleWindowVisible:true});
  const scope={window,document,OracleDepartments,OracleLayout,OracleKnowledge,OraclePrompts,OracleAtmosphere,OracleMotion,OracleLibrary,
    structuredClone,performance,console,paths:{code:'M0 0',note:'M0 0',folder:'M0 0',tool:'M0 0'},
    requestAnimationFrame:fn=>{frames.set(++frameID,fn);return frameID},cancelAnimationFrame:id=>frames.delete(id),setTimeout,clearTimeout,getComputedStyle:()=>({display:'block'})};
  vm.runInNewContext(fs.readFileSync(new URL('../Resources/web/installation-visual.js',import.meta.url),'utf8'),scope);
  scope.OracleInstallationVisual=window.OracleInstallationVisual;
  vm.runInNewContext(source,scope,{filename:'Resources/web/atlas.js'});
  const atlas=Object.create(window.OracleAtlas.prototype),events=[];
  const add=(tag,attrs,parent)=>{const element=new Element(tag);for(const [key,value]of Object.entries(attrs||{}))element.setAttribute(key,value);parent?.append(element);return element};
  const host=add('div'),el=add('div',{},host),svg=add('svg',{},el),world=add('g',{},svg);
  add('defs',{},svg);
  const nav=add('nav',{class:'atlas-context'},el);add('button',{'data-map-back':''},nav);add('div',{class:'atlas-breadcrumb'},nav);
  const page=add('div',{class:'atlas-page'},nav);add('button',{'data-map-page':'-1'},page);add('span',{},page);add('button',{'data-map-page':'1'},page);
  add('g',{class:'oracle-core','data-core':'true'},world);
  Object.assign(atlas,{el,svg,world,ns:'http://www.w3.org/2000/svg',abort:new AbortController(),disposed:false,
    contextNav:nav,nodeLayer:add('g',{},world),edgeLayer:add('g',{},world),groupLayer:add('g',{},world),leafLayer:add('g',{},world),
    expansionWorld:add('g',{},el),expansionRings:Array.from({length:OracleAtmosphere.RING_COUNT},()=>add('circle')),
    starfield:add('svg',{},el),specialistHeading:add('h3',{},el),atmosphereSeconds:0,
    nodes:new Map(),groups:new Map(),leaves:new Map(),orbitTracks:new Map(),history:[],layout:{nodes:{},leaves:{}},
    selected:null,selectedLeaf:null,department:null,knowledge:null,catalog:null,context:{kind:'global',group:null,page:0},
    camera:{x:500,y:350,k:1},target:{x:500,y:350,k:1},baseScale:1,frame:0,width:1000,height:700,first:false,
    viewport:{left:0,right:1000,top:0,bottom:700,width:1000,height:700,cx:500,cy:350},
    interactionFrames:[],updateCosts:[],palette:[],motionPreference:{matches:true},
    cb:{onSelect:(id,leaf,keyboard,selection)=>events.push({id,leaf,keyboard,selection:plain(selection)})}});
  const flushCentralLayout=()=>{let steps=0;while(atlas.centralLayoutPending){if(steps++>100)throw Error('Central layout did not settle');const id=atlas.centralLayoutFrame,fn=frames.get(id);frames.delete(id);if(!fn)throw Error('Missing scheduled central layout');fn(performance.now());}};
  const update=atlas.update.bind(atlas);atlas.update=(...args)=>{const result=update(...args);if(autoFlush)flushCentralLayout();return result;};
  atlas.update(input);
  return {atlas,events,document,Element,window,frames,flushCentralLayout};
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
  assert.equal(atlas.target.k/atlas.baseScale,1.2);
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

test('back restores department, catalog page and custom pan at the fixed 120% scale',()=>{
  const {atlas}=harness();atlas.setDepartment('department/code',{page:1});
  atlas.target={x:611,y:249,k:atlas.baseScale*1.2};atlas.autoFit=false;const departmentCamera={...atlas.target};
  atlas.focus('code');atlas.pageGroup(1);
  atlas.target={x:459,y:330,k:atlas.baseScale*1.2};atlas.autoFit=false;const specialistCamera={...atlas.target};
  atlas.revealSkill(skill('code',124).path);assert.equal(atlas.context.kind,'skill');
  atlas.back(true);assert.equal(atlas.context.kind,'specialist');assert.equal(atlas.context.page,1);
  for(const key of ['x','y','k'])assert.ok(Math.abs(atlas.target[key]-specialistCamera[key])<1e-8);
  atlas.back(true);assert.equal(atlas.context.kind,'specialist');assert.equal(atlas.context.page,0);
  atlas.back(true);assert.equal(atlas.context.kind,'department');assert.equal(atlas.department,'department/code');assert.equal(atlas.context.page,1);
  for(const key of ['x','y','k'])assert.ok(Math.abs(atlas.target[key]-departmentCamera[key])<1e-8);
  atlas.back(true);assert.equal(atlas.context.kind,'global');assert.equal(atlas.department,null);
  assert.equal(atlas.target.k/atlas.baseScale,1.2);
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

test('empty department stays quiet while an empty discovered specialist explains its source',()=>{
  const input=data();input.entries.push({path:'SISTEMA/skills/contents',name:'contents',directory:true});
  const {atlas}=harness(input);
  atlas.setDepartment('department/sales');
  assert.equal(atlas.el.querySelector('.knowledge-empty').hidden,true);
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
  assert.equal(atlas.promptOrbit.points[0].color,promptColor);assert.equal(atlas.target.k/atlas.baseScale,1.2);
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
  const {atlas,window}=harness();atlas.bind();
  const click=target=>{
    const event={target,button:0,pointerId:1,clientX:500,clientY:350,preventDefault(){},stopPropagation(){},altKey:false};
    for(const handler of atlas.el.listeners.get('pointerdown')||[])handler(event);
    for(const handler of window.listeners.get('pointerup')||[])handler(event);
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


test('snapshot refresh adds Pesquisa and removes missing departments without reopening the graph',()=>{
 const input=data(),{atlas}=harness(input);
 assert.equal(atlas.catalog.departmentByID.has('department/content'),false);
 const research={path:'SISTEMA/skills/pesquisa/deep-research/review/SKILL.md',name:'SKILL.md',directory:false};
 const added={...input,entries:[...input.entries,research]};
 atlas.update(added);
 assert.equal(atlas.catalog.departmentByID.get('department/research').skillCount,1);
 assert.ok(atlas.nodes.has('department/research'));
 atlas.select('deep-research');
 assert.ok(atlas.leaves.has(research.path));
 atlas.update({...input,selected:'deep-research',selectedDepartment:'department/research'});
 assert.equal(atlas.catalog.departmentByID.has('department/research'),false);
 assert.equal(atlas.selected,null);
 assert.equal(atlas.context.kind,'global');
 assert.equal(atlas.nodes.has('department/research'),false);
});

test('unrelated diary notes preserve the catalog, overview topology and central mesh',()=>{
 const input=data(),{atlas}=harness(input),catalog=atlas.catalog,key=atlas.topologyKey,central=atlas.centralNodes;
 atlas.update({...input,entries:[...input.entries,{path:'DIARIO/hoje.md',name:'hoje.md',directory:false}]});
 assert.equal(atlas.catalog,catalog);assert.equal(atlas.topologyKey,key);assert.equal(atlas.centralNodes,central);
 assert.ok(atlas.data.entries.some(e=>e.path==='DIARIO/hoje.md'));
});
test('a real tutorial addition updates the central mesh without rebuilding department topology',()=>{
 const input=data();input.entries.push({path:'SISTEMA/Tutoriais',name:'Tutoriais',directory:true});
 const {atlas}=harness(input),catalog=atlas.catalog,key=atlas.topologyKey,central=atlas.centralNodes;
 atlas.update({...input,entries:[...input.entries,{path:'SISTEMA/Tutoriais/novo.md',name:'novo.md',directory:false}]});
 assert.equal(atlas.catalog,catalog);assert.equal(atlas.topologyKey,key);assert.notEqual(atlas.centralNodes,central);
 assert.ok(atlas.centralNodes.some(e=>e.path==='SISTEMA/Tutoriais/novo.md'));
 atlas.navigateKnowledge('tutorials','SISTEMA/Tutoriais');
 assert.ok(atlas.geometry.leaves.some(e=>e.id==='SISTEMA/Tutoriais/novo.md'));
});
test('presentation inventory retains area aliases, library ambiguity and custom skill roots',()=>{
 const input=data(),{atlas}=harness(input),extra=[
  {path:'Pessoal',directory:true},{path:'Pessoal/Perfil.md',directory:false},
  {path:'SISTEMA/Prompts/outro.md',directory:false},{path:'SISTEMA/tutoriais/guia.md',directory:false},
  {path:'Custom/skills/test/SKILL.md',name:'SKILL.md',directory:false},{path:'DIARIO/hoje.md',directory:false}];
 const relevant=atlas.constructor.presentationEntries(extra,'Custom/skills');
 assert.equal(relevant.length,5);assert.ok(!relevant.some(e=>e.path.startsWith('DIARIO/')));
});
test('tutorial navigation invalidates its visible folder when the inventory changes',()=>{
 const input=data();input.entries.push({path:'SISTEMA/Tutoriais',directory:true},{path:'SISTEMA/Tutoriais/Guias',directory:true},{path:'SISTEMA/Tutoriais/Guias/um.md',name:'um.md',directory:false});
 const {atlas}=harness(input);atlas.navigateKnowledge('tutorials','SISTEMA/Tutoriais/Guias');
 assert.ok(atlas.geometry.leaves.some(e=>e.id.endsWith('/um.md')));
 atlas.update({...input,entries:input.entries.filter(e=>e.path!=='SISTEMA/Tutoriais/Guias/um.md')});
 assert.ok(!atlas.geometry.leaves.some(e=>e.id.endsWith('/um.md')));
});
test('central physics can be scheduled in batches with the exact same final geometry',()=>{
 const {atlas}=harness(data()),model=()=>{
  const parent={x:10,y:-20,vx:0,vy:0,radius:2,root:true,seed:.2};
  const child={x:-40,y:15,vx:0,vy:0,radius:3,parent,seed:.6};return [parent,child];
 };
 const uninterrupted=model(),batched=model();
 atlas.constructor.settleCentralKnowledge(uninterrupted,180);
 for(let i=0;i<15;i++)atlas.constructor.settleCentralKnowledge(batched,12);
 assert.deepEqual(batched.map(({x,y,vx,vy})=>({x,y,vx,vy})),uninterrupted.map(({x,y,vx,vy})=>({x,y,vx,vy})));
});
test('cooperative central layout keeps committed DOM unchanged until exact final geometry is ready',()=>{
 const input=data(),h=harness(input,{autoFlush:false});h.flushCentralLayout();const prior=h.atlas.centralNodes;
 const next={...input,entries:[...input.entries,{path:'SISTEMA/prompts/new.md',name:'new.md',directory:false}]};
 h.atlas.update(next);assert.ok(h.atlas.centralLayoutPending);assert.equal(h.atlas.centralNodes,prior);
 const nodes=h.atlas.centralLayoutModel.nodes,expected=new Map(nodes.map(n=>[n.path,{...n,g:undefined,edge:undefined,children:undefined,parent:undefined}]));
 for(const n of nodes)if(n.parent)expected.get(n.path).parent=expected.get(n.parent.path);
 h.atlas.constructor.settleCentralKnowledge([...expected.values()],180);
 h.flushCentralLayout();assert.notEqual(h.atlas.centralNodes,prior);
 assert.deepEqual(plain(h.atlas.centralNodes.map(({path,x,y,vx,vy})=>({path,x,y,vx,vy}))),plain([...expected.values()].map(({path,x,y,vx,vy})=>({path,x,y,vx,vy}))));
});
test('a newer snapshot, explicit cancellation and vault switch discard stale central layouts',()=>{
 const input=data(),h=harness(input,{autoFlush:false});h.flushCentralLayout();const prior=h.atlas.centralNodes;
 h.atlas.update({...input,vault:'/synthetic/one',entries:[...input.entries,{path:'SISTEMA/prompts/stale.md',name:'stale.md'}]});
 const first=h.atlas.centralLayoutFrame;
 h.atlas.cancelCentralLayout();assert.equal(h.frames.has(first),false);assert.equal(h.atlas.centralNodes,prior);
 h.atlas.update({...input,vault:'/synthetic/two',entries:[...input.entries,{path:'SISTEMA/prompts/latest.md',name:'latest.md'}]});
 h.flushCentralLayout();assert.ok(h.atlas.centralNodes.some(e=>e.path.endsWith('/latest.md')));assert.ok(!h.atlas.centralNodes.some(e=>e.path.endsWith('/stale.md')));
});
test('cooperative physics errors retain committed DOM and a subsequent refresh recovers',()=>{
 const input=data(),h=harness(input,{autoFlush:false});h.flushCentralLayout();const prior=h.atlas.centralNodes,klass=h.atlas.constructor,settle=klass.settleCentralKnowledge;
 const next={...input,entries:[...input.entries,{path:'SISTEMA/prompts/recover.md',name:'recover.md'}]};
 try{klass.settleCentralKnowledge=()=>{throw Error('synthetic layout failure')};h.atlas.update(next);h.flushCentralLayout();}
 finally{klass.settleCentralKnowledge=settle;}
 assert.equal(h.atlas.centralNodes,prior);assert.equal(h.atlas.centralLayoutPending,false);assert.match(h.atlas.centralLayoutError,/synthetic layout failure/);
 h.atlas.update(next);h.flushCentralLayout();assert.equal(h.atlas.centralLayoutError,null);assert.ok(h.atlas.centralNodes.some(e=>e.path.endsWith('/recover.md')));
});
test('disposing the controller cancels every pending central layout before clearing SVG',()=>{
 const h=harness(data(),{autoFlush:false}),frame=h.atlas.centralLayoutFrame;
 h.atlas.observer={disconnect(){}};h.atlas.dispose();
 assert.equal(h.atlas.centralLayoutPending,false);assert.equal(h.atlas.centralLayoutModel,null);assert.equal(h.frames.has(frame),false);
});
