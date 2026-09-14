/* Real WebKit/controller + synthetic department paths, no personal vault reads. */
(()=>{
 const f=window.__oracleFixture,base=window.__oracleFixtureReceive,q=s=>document.querySelector(s),qa=s=>[...document.querySelectorAll(s)];
 const sleep=ms=>new Promise(r=>setTimeout(r,ms)),assert=(v,m)=>{if(!v)throw Error(m)},wait=async(fn,m)=>{for(let i=0;i<240;i++){if(fn())return;await sleep(20)}throw Error(m)};
 const people={conversao:['joanna-wiebe','peep-laja'],entrega:['donna-weber','lincoln-murphy','ricardo-vargas'],leads:['aaron-ross','rodrigo-noll'],marketing:['corey-haines','rory-vaden'],oferta:['alex-hormozi','madhavan-ramanujam'],sistemas:['laszlo-bock','paulo-caroli','tiago-forte'],trafego:['ann-handley','frederick-vallaeys'],vendas:['chris-voss','neil-rackham'],codigo:['frontend']};
 const files=[],folders=new Set(['SISTEMA','SISTEMA/skills','AREAS/pessoal','AREAS/profissional']);
 for(const [department,ids] of Object.entries(people))for(const id of ids)for(let i=0;i<(id==='frontend'?117:3);i++)files.push(`SISTEMA/skills/${department}/${id}/habilidade-${i}/SKILL.md`);
 for(const root of ['prompts','Tutoriais'])for(let i=0;i<6500;i++)files.push(`SISTEMA/${root}/categoria-${i%12}/documento-${String(i).padStart(4,'0')}.md`);
 for(const path of files){const parts=path.split('/');for(let i=1;i<parts.length;i++)folders.add(parts.slice(0,i).join('/'))}
 const entries=[...folders].map(path=>({path,name:path.split('/').at(-1),directory:true})).concat(files.map(path=>({path,name:path.split('/').at(-1),directory:false,size:120})));
 f.config.vault='/__synthetic_oracle__/Graph';f.ob={...f.ob,status:'completed',licensed:true,legacyAccess:true,hasVault:true,runID:'graph-1',knowledgeWelcome:{runID:'graph-1',vault:f.config.vault}};
 window.__oracleFixtureReceive=async r=>{
  if(r.method==='snapshot'){window.oracleReply(r.id,{value:{config:f.config,entries,collections:Object.values(people).flat().map(id=>({id,name:id.split('-').map(s=>s[0].toUpperCase()+s.slice(1)).join(' '),icon:'folder'})),events:[],projects:[],scan:{signature:'graph-synthetic-1',complete:true,pending:false},onboarding:f.ob,operations:{setup:false,gbrain:false},gbrainSync:{status:'verified'},departmentManifest:window.OracleDepartmentManifest}});return}
  if(r.method==='read'){f.calls.push({method:r.method,params:r.params});window.oracleReply(r.id,{value:{path:r.params.path,text:'# Documento sintético\n\nConteúdo da biblioteca.\n\n![Ilustração](image.png)',hash:'synthetic',editable:false}});return}
  if(r.method==='readLibraryImage'){f.calls.push({method:r.method,params:r.params});window.oracleReply(r.id,{value:{dataURL:''}});return}
  return base(r);
 };
 window.__oracleFixtureRun=async()=>{
  if(f.started)return;f.started=true;const cases=[],metrics={};const check=async(name,fn)=>{try{await fn();cases.push({name,ok:true})}catch(e){cases.push({name,ok:false,error:e.message+'\n'+e.stack});throw e}};
  const shot=async name=>{window.__fixtureSnapshotSaved=false;window.webkit.messageHandlers.fixture.postMessage({type:'snapshot',name});await wait(()=>window.__fixtureSnapshotSaved,'snapshot')};
  try{
   await check('All eighteen named portraits load locally; generic specialist keeps the dot',async()=>{
    await wait(()=>atlasController?.catalog?.specialistByID.has('rodrigo-noll'),'graph ready');await wait(()=>qa('.has-portrait').length===18,'18 portraits loaded');assert(!atlasController.nodes.get('frontend').portrait,'generic photo');assert(getComputedStyle(q('#atlas')).getPropertyValue('-webkit-user-select')==='none','graph text selectable');await sleep(800);await shot('overview');
   });
   await check('Portraits stay clear of department titles through a full rotation',async()=>{
    const controller=atlasController;
    for(let step=0;step<24;step++){
     controller.rotateDepartments(Math.PI/12);controller.draw();
     for(const n of controller.nodes.values())if(n.kind==='department'){
      const a=n.label.getBoundingClientRect();
      for(const p of controller.nodes.values())if(p.portrait){const b=p.g.querySelector('.planet-surface').getBoundingClientRect();assert(!(a.left<b.right&&a.right>b.left&&a.top<b.bottom&&a.bottom>b.top),'title/photo collision: '+n.name+' / '+p.name+' rotation '+step+' '+JSON.stringify({label:a.toJSON(),photo:b.toJSON(),camera:controller.camera,node:{x:p.x,y:p.y,r:controller.nodeScreenRadius(p)},labelNode:{x:n.x,y:n.y,px:n.label.getAttribute('x'),py:n.label.getAttribute('y')}}))}
     }
    }
   });
   await check('Every specialist opens real branches including the physical department segment',async()=>{
    for(const ids of Object.values(people))for(const id of ids){atlasController.navigate(id,null,null,0,false,true);await sleep(25);const leaves=[...atlasController.leaves.values()];assert(leaves.length===(id==='frontend'?50:3),id+' wrong leaves '+leaves.length);assert(leaves.every(l=>files.includes(l.id)&&l.parent===id),id+' invalid paths')}
    atlasController.navigate('rodrigo-noll',null,null,0,false,true);await wait(()=>atlasController.nodes.get('rodrigo-noll').g.classList.contains('has-portrait'),'focused portrait');atlasController.draw();await sleep(100);const photo=atlasController.nodes.get('rodrigo-noll').portrait.getBoundingClientRect();assert(photo.width>=100,'focused portrait too small');assert(qa('[data-skill]').length>=3,'no rendered skills');await shot('specialist');
   });
   await check('All pages and actual skill navigation remain reachable',async()=>{
    atlasController.navigate('frontend',null,null,0,false,true);const visited=new Set();for(let i=0;i<3;i++){for(const l of atlasController.geometry.leaves)visited.add(l.id);if(i<2)atlasController.pageGroup(1)}assert(visited.size===117,'pagination lost skills');const path=[...visited].at(-1);atlasController.revealSkill(path);assert(atlasController.selectedLeaf===path&&atlasController.leaves.has(path),'real skill unreachable');
   });
   await check('Tutorials paint a skeleton before catalog work and load only visible metadata',async()=>{
    atlasController.select(null);applyAccessibility({reduceMotion:false});const start=performance.now();setView('tutorials');assert(q('.gallery-skeleton'),'skeleton missing');assert(q('#library-page').getAttribute('aria-busy')==='true','busy missing');await wait(()=>qa('[data-card-path]').length===9&&!libraryGallery.loading,'tutorials');metrics.tutorialsReadyMs=Math.round(performance.now()-start);await sleep(200);assert(!f.calls.some(c=>c.method==='readLibraryImage'),'images eagerly decoded');assert(f.calls.filter(c=>c.method==='read').length<=9,'whole library read');await shot('gallery');
   });
   await check('Rapid tab changes finish on the last tab with intact search and page size',async()=>{
    setView('prompts');setView('map');setView('tutorials');setView('prompts');await wait(()=>view==='prompts'&&!libraryGallery.loading&&q('.gallery-heading h1')?.textContent==='Prompts','last tab');assert(!q('#library-page').hidden,'last tab hidden');const input=q('.gallery-search input');input.value='documento 6499';input.dispatchEvent(new Event('input',{bubbles:true}));await wait(()=>qa('[data-card-path]').length===1,'search result');assert(q('[data-card-path]').dataset.cardPath.endsWith('documento-6499.md'),'wrong search');setView('map');await wait(()=>!q('#graph-page').hidden&&q('#library-page').hidden,'return graph');assert(!libraryGallery.active,'gallery still active');await sleep(400);assert(!q('.page-transition-snapshot'),'stale fade snapshot');assert(!q('#graph-page').inert,'graph inert after fade');
   });
  }catch{}
  if(f.jsErrors.length||f.failures.length)cases.push({name:'No JavaScript or bridge failures',ok:false,error:JSON.stringify([...f.jsErrors,...f.failures])});
  window.webkit.messageHandlers.fixture.postMessage({type:'done',passed:cases.filter(c=>c.ok).length,failed:cases.filter(c=>!c.ok).length,cases,metrics,synthetic:true,realCore:false});
 };
})();
