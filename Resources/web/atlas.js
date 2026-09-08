/* Stable SVG scene: per-frame updates touch only camera and moved geometry.
 * Folder membership is evidence. Ambient motion is decorative, never telemetry. */
class OracleAtlas {
  constructor(element, callbacks) {
    this.el=element;this.cb=callbacks;this.ns='http://www.w3.org/2000/svg';
    this.defaults=[[-188,-177],[184,-188],[322,8],[-314,-3],[-208,184],[238,187],[14,277]];
    this.palette=['#dba17c','#91b5ed','#7bc8b4','#d9c276','#b29bd7','#92c399','#d49cae'];
    this.nodes=new Map();this.leaves=new Map();this.layout={nodes:{},leaves:{}};
    this.camera={x:0,y:0,k:1};this.target={...this.camera};this.baseScale=1;this.frame=0;this.selected=null;this.selectedLeaf=null;this.first=true;this.lastDetail='';this.interactionFrames=[];this.updateCosts=[];this.suppressClick=false;
    this.el.innerHTML=`<svg class="atlas-scene" aria-label="Atlas: sete coleções de especialistas" role="group" tabindex="0"><defs>
      <radialGradient id="oracle-core-fill"><stop offset="0" stop-color="#252628"/><stop offset=".55" stop-color="#101112"/><stop offset="1" stop-color="#030405"/></radialGradient>
      <radialGradient id="oracle-core-halo"><stop stop-color="#eeeeec" stop-opacity=".09"/><stop offset=".35" stop-color="#b5bbc3" stop-opacity=".035"/><stop offset="1" stop-color="#b5bbc3" stop-opacity="0"/></radialGradient>
      <linearGradient id="orbit-silver" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f2f2ef" stop-opacity=".5"/><stop offset=".45" stop-color="#8c929b" stop-opacity=".04"/><stop offset="1" stop-color="#dddeda" stop-opacity=".32"/></linearGradient>
      <radialGradient id="planet-fill" cx=".3" cy=".15" r=".9"><stop stop-color="#232526"/><stop offset=".7" stop-color="#0c0e0f"/><stop offset="1" stop-color="#07090a"/></radialGradient>
    </defs><g class="atlas-camera"><g class="orbital-scaffolding" aria-hidden="true">
      <ellipse rx="245" ry="113" transform="rotate(-28)"/><ellipse rx="355" ry="188" transform="rotate(-28)"/><ellipse rx="425" ry="268" transform="rotate(-28)"/>
      <path d="M-398 229 A460 285 -28 0 1 346 -262"/><path class="orbit-dash" d="M-267 -270 A394 237 -28 0 1 405 107"/>
      <path class="axis-line" d="M-440 0H440 M0-315V350"/>
    </g><g class="atlas-edges"></g><g class="atlas-leaves"></g><g class="atlas-nodes"></g>
    <g class="oracle-core" role="button" tabindex="0" data-core="true" aria-label="Oracle, núcleo central. Enquadrar todo o atlas" data-tooltip="Enquadrar todo o universo">
      <circle r="155" fill="url(#oracle-core-halo)" class="core-atmosphere"/><circle r="57" class="core-outline"/>
      <g class="core-orbit ambient"><circle r="62" fill="none" stroke="url(#orbit-silver)" stroke-width=".7" stroke-dasharray="100 38 34 100 18 100"/><circle cx="62" r="2" fill="#d5d6d4"/></g>
      <g class="core-orbit reverse ambient"><ellipse rx="76" ry="28" fill="none" stroke="#bfc2c5" stroke-opacity=".18" stroke-width=".7" transform="rotate(-31)"/><circle cx="-65" cy="-14" r="1.4" fill="#9fa4ac"/></g>
      <circle r="49" fill="url(#oracle-core-fill)" stroke="#a9afb6" stroke-opacity=".65" stroke-width=".8"/>
      <circle r="45" fill="none" stroke="#d9dcdd" stroke-opacity=".08" stroke-width=".6"/>
      <path d="M-7 -17L0-21 7-17V-9L0-5-7-9Z M0-21V-13 M-7-17L0-13 7-17 M0-13V-5" fill="none" stroke="#d5d7db" stroke-width=".8" opacity=".7"/>
      <circle r="55" fill="transparent" class="core-hit"/>
    </g></g></svg><div class="atlas-caption"><span class="atlas-instruction">Arraste para explorar · scroll para aproximar</span></div><div class="atlas-selection-hint" hidden></div>`;
    this.svg=this.el.querySelector('svg');this.world=this.el.querySelector('.atlas-camera');this.edgeLayer=this.el.querySelector('.atlas-edges');this.nodeLayer=this.el.querySelector('.atlas-nodes');this.leafLayer=this.el.querySelector('.atlas-leaves');
    try{this.universe=new OracleUniverse(this.el)}catch(error){this.renderError=String(error);this.el.classList.add('svg-fallback')}
    this.bind();this.observer=new ResizeObserver(()=>this.resize());this.observer.observe(this.el);
    document.addEventListener('visibilitychange',()=>this.setPaused(document.hidden));
  }
  make(tag,attrs={},parent){const el=document.createElementNS(this.ns,tag);if(['path','circle','ellipse','rect','svg'].includes(tag))el.setAttribute('aria-hidden','true');for(const [key,value]of Object.entries(attrs))el.setAttribute(key,String(value));parent?.append(el);return el}
  resize(){const r=this.el.getBoundingClientRect();this.width=r.width;this.height=r.height;if(!this.width||!this.height)return;this.contentTop=36;this.baseScale=Math.max(.3,Math.min((this.width-58)/880,(this.height-this.contentTop-42)/650));if(this.first){this.camera={x:this.width/2,y:(this.height+this.contentTop)/2-20*this.baseScale,k:this.baseScale};this.target={...this.camera};this.first=false}else{this.target.x+=this.width/2-(this.lastWidth||this.width)/2;this.target.y+=this.height/2-(this.lastHeight||this.height)/2}this.lastWidth=this.width;this.lastHeight=this.height;this.invalidate()}
  update(data){this.data=data;this.selected=data.selected;this.selectedLeaf=data.selectedLeaf||null;this.reduced=data.reduced;this.el.classList.toggle('motion-reduced',!!this.reduced);this.setPaused(document.hidden||data.hidden||data.paused);
    if(!this.loadedLayout&&data.layout){this.layout=structuredClone({nodes:data.layout.nodes||{},leaves:data.layout.leaves||{}});this.loadedLayout=true}
    const collections=data.collections||[];
    const ids=new Set(collections.map(c=>c.id));
    for(const [id,n]of this.nodes)if(!ids.has(id)){n.g.remove();n.edge.remove();n.flow.remove();this.nodes.delete(id)}
    collections.forEach((c,i)=>{let node=this.nodes.get(c.id);if(!node){const p=this.layout.nodes[c.id]||{x:this.defaults[i][0],y:this.defaults[i][1]};
      const edge=this.make('path',{class:'category-edge',fill:'none','data-edge':c.id},this.edgeLayer);
      const flow=this.make('path',{class:'edge-flow ambient',fill:'none',pathLength:1},this.edgeLayer);flow.style.animationDelay=`${-i*2.3}s`;flow.style.animationDuration=`${12+i*1.7}s`;
      const g=this.make('g',{class:'category-node',role:'button',tabindex:0,'data-category':c.id},this.nodeLayer);g.style.setProperty('--node-accent',this.palette[i]);g.style.animationDelay=`${i*45}ms`;
      this.make('circle',{r:47,class:'selection-ring'},g);this.make('circle',{r:39,class:'planet-surface',fill:'url(#planet-fill)'},g);
      this.make('path',{d:'M-23 -25 A34 34 0 0 1 28 -18',class:'planet-reflection'},g);
      const symbol=this.make('svg',{x:-14,y:-14,width:28,height:28,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor','stroke-width':1.1,'stroke-linecap':'round','stroke-linejoin':'round',class:'category-symbol'},g);this.make('path',{d:paths[c.icon]||paths.note},symbol);
      this.make('circle',{cx:29,cy:-28,r:2.2,class:'category-accent'},g);
      const label=this.make('text',{y:60,'text-anchor':'middle',class:'category-name'},g);label.textContent=c.name;
      const count=this.make('text',{y:77,'text-anchor':'middle',class:'category-count'},g);
      node={...c,x:p.x,y:p.y,edge,flow,g,label,count,index:i};this.nodes.set(c.id,node)}
      node.skills=(data.entries||[]).filter(e=>!e.directory&&e.path.startsWith(`SISTEMA/skills/${c.id}/`)&&e.name==='SKILL.md');node.count.textContent=data.replay?'':node.skills.length?`${node.skills.length} skills`:'Sem skills nesta fonte';node.g.dataset.tooltip=c.name+' · selecionar ou arrastar';node.g.setAttribute('aria-label',`${c.name}, ${node.skills.length} skills. Enter seleciona; espaço aproxima; setas movem o layout.`);
    });
    this.buildLeaves();this.selection();this.draw();
    if(data.events?.length){const last=data.events.at(-1);if(last.event_id!==this.lastEvent&&last.source==='codex-hook'&&!data.replay&&Date.now()-Date.parse(last.received_at)<8000){this.lastEvent=last.event_id;this.el.classList.add('real-event');clearTimeout(this.eventTimer);this.eventTimer=setTimeout(()=>this.el.classList.remove('real-event'),3000)}}
  }
  buildLeaves(){if(!this.data)return;const level=this.camera.k/this.baseScale;const ids=[];for(const n of this.nodes.values()){const focused=this.selected===n.id;let count=focused?Math.min(8,3+Number(this.data.detail||0)):level>1.45?3:2;count=Math.min(count,n.skills.length);for(let i=0;i<count;i++){const e=n.skills[i];ids.push(e.path);if(this.leaves.has(e.path))continue;const dir=n.x>=0?1:-1;const dy=(i-(Math.min(8,n.skills.length)-1)/2)*32;const saved=this.layout.leaves[e.path];const p=saved||{x:n.x+dir*(106+(i%2)*12),y:n.y+dy};
      const edge=this.make('path',{class:'skill-edge',fill:'none'},this.edgeLayer);const g=this.make('g',{class:'skill-node',role:'button',tabindex:0,'data-skill':e.path},this.leafLayer);
      this.make('rect',{x:dir===1?-12:-145,y:-15,width:158,height:30,rx:7,fill:'transparent',class:'skill-hit'},g);
      this.make('circle',{r:3.3,class:'skill-dot'},g);this.make('circle',{r:7,class:'skill-selection'},g);
      const label=this.make('text',{x:dir*12,y:4,'text-anchor':dir===1?'start':'end',class:'skill-name'},g);const name=e.path.split('/').slice(-2,-1)[0].replace(/-/g,' ');label.textContent=name.replace(/\b\w/g,m=>m.toUpperCase()).replace('Ai ','AI ').replace('Ab ','AB ').replace('Aso','ASO').replace(/\bSeo\b/g,'SEO').replace(/\bPr\b/g,'PR').replace('Cognitive Doc Design','Doc Design');
      g.dataset.tooltip=name+' · duplo clique abre a fonte';g.setAttribute('aria-label',`${name}. Enter seleciona; espaço abre documento; setas movem o layout.`);
      this.leaves.set(e.path,{id:e.path,parent:n.id,x:p.x,y:p.y,edge,g,label,custom:!!saved,dir,index:i});
    }}
    for(const [id,leaf]of this.leaves){if(!ids.includes(id)){leaf.g.remove();leaf.edge.remove();this.leaves.delete(id)}}
  }
  selection(){for(const node of this.nodes.values()){const active=node.id===this.selected;node.g.classList.toggle('selected',active);node.g.classList.toggle('subdued',!!this.selected&&!active);node.edge.classList.toggle('selected',active);node.edge.classList.toggle('subdued',!!this.selected&&!active);node.flow.classList.toggle('flow-visible',active||(!this.selected&&node.index===1));node.flow.classList.toggle('selected',active);node.g.setAttribute('aria-pressed',String(active))}
    for(const leaf of this.leaves.values()){const member=leaf.parent===this.selected;leaf.g.classList.toggle('selected',leaf.id===this.selectedLeaf);leaf.g.classList.toggle('subdued',!!this.selected&&!member);leaf.g.classList.toggle('label-visible',member||this.camera.k/this.baseScale>1.35||leaf.parent==='code');leaf.edge.classList.toggle('selected',leaf.id===this.selectedLeaf);leaf.edge.classList.toggle('member',member);leaf.g.setAttribute('aria-pressed',String(leaf.id===this.selectedLeaf))}
    const hint=this.el.querySelector('.atlas-selection-hint');hint.hidden=!this.selected;hint.textContent=this.selectedLeaf?'Oracle / '+this.nodes.get(this.selected)?.name+' / '+this.selectedLeaf.split('/').slice(-2,-1)[0]:this.selected?'Oracle / '+this.nodes.get(this.selected)?.name:'';
  }
  edgePath(x1,y1,x2,y2,bend=.13){const dx=x2-x1,dy=y2-y1;return `M${x1} ${y1} C${x1+dx*.34-dy*bend} ${y1+dy*.34+dx*bend},${x1+dx*.72-dy*bend*.5} ${y1+dy*.72+dx*bend*.5},${x2} ${y2}`}
  draw(){const started=performance.now();const {x,y,k}=this.camera;this.world.setAttribute('transform',`translate(${x} ${y}) scale(${k})`);const labelK=Math.max(.7,Math.min(1.15,this.baseScale/k));
    for(const n of this.nodes.values()){n.g.setAttribute('transform',`translate(${n.x} ${n.y})`);const path=this.edgePath(0,0,n.x,n.y);n.edge.setAttribute('d',path);n.flow.setAttribute('d',path);n.label.style.fontSize=`${18*labelK}px`;n.count.style.fontSize=`${12*labelK}px`}
    for(const leaf of this.leaves.values()){const p=this.nodes.get(leaf.parent);leaf.g.setAttribute('transform',`translate(${leaf.x} ${leaf.y})`);leaf.edge.setAttribute('d',this.edgePath(p.x,p.y,leaf.x,leaf.y,.06));leaf.label.style.fontSize=`${13*labelK}px`}
    this.cb.onZoom?.(this.camera.k/this.baseScale);this.selection();this.universe?.sync(this);this.updateCosts.push(performance.now()-started);if(this.updateCosts.length>180)this.updateCosts.shift();
  }
  invalidate(){if(this.frame)return;this.frame=requestAnimationFrame(()=>this.tick())}
  tick(){const now=performance.now();if(this.lastTick&&now-this.lastTick<90){this.interactionFrames.push(now-this.lastTick);if(this.interactionFrames.length>180)this.interactionFrames.shift()}this.lastTick=now;this.frame=0;const d=Math.max(Math.abs(this.target.x-this.camera.x),Math.abs(this.target.y-this.camera.y),Math.abs(this.target.k-this.camera.k)*100);if(d>.02){const t=this.reduced?1:.26;for(const key of ['x','y','k'])this.camera[key]+=(this.target[key]-this.camera[key])*t;this.draw();this.invalidate()}else{this.camera={...this.target};this.draw();this.buildLeaves();this.selection()}}
  pointerWorld(clientX,clientY){const r=this.el.getBoundingClientRect();return{x:(clientX-r.left-this.camera.x)/this.camera.k,y:(clientY-r.top-this.camera.y)/this.camera.k}}
  zoomAt(factor,clientX,clientY){const r=this.el.getBoundingClientRect();const sx=clientX===undefined?this.width/2:clientX-r.left,sy=clientY===undefined?(this.height+this.contentTop)/2:clientY-r.top;const next=Math.min(this.baseScale*3.2,Math.max(this.baseScale*.2,this.target.k*factor));const wx=(sx-this.target.x)/this.target.k,wy=(sy-this.target.y)/this.target.k;this.target={x:sx-wx*next,y:sy-wy*next,k:next};this.invalidate();this.persistSoon()}
  fit(){this.previous={...this.target};const points=[{x:0,y:0},...this.nodes.values(),...this.leaves.values()];const minX=Math.min(...points.map(p=>p.x))-90,maxX=Math.max(...points.map(p=>p.x))+90,minY=Math.min(...points.map(p=>p.y))-65,maxY=Math.max(...points.map(p=>p.y))+90;const k=Math.min(this.baseScale,(this.width-40)/(maxX-minX),(this.height-this.contentTop-35)/(maxY-minY));this.target={x:this.width/2-(minX+maxX)*k/2,y:(this.height+this.contentTop)/2-(minY+maxY)*k/2,k};this.invalidate()}
  back(){if(this.previous){this.target=this.previous;this.previous=null;this.invalidate()}else this.fit()}
  focus(id){const n=this.nodes.get(id);if(!n)return;this.previous={...this.target};const k=this.baseScale*1.75;this.target={x:this.width/2-n.x*k-(n.x>0?50:-50),y:(this.height+this.contentTop)/2-n.y*k,k};this.invalidate()}
  select(category,leaf=null,keyboard=false){this.selected=category;this.selectedLeaf=leaf;this.buildLeaves();this.selection();this.draw();this.cb.onSelect?.(category,leaf,keyboard)}
  restoreLayout(layout){this.layout=structuredClone(layout||{nodes:{},leaves:{}});for(const n of this.nodes.values()){const p=this.layout.nodes[n.id]||{x:this.defaults[n.index][0],y:this.defaults[n.index][1]};n.x=p.x;n.y=p.y}for(const l of this.leaves.values()){l.g.remove();l.edge.remove()}this.leaves.clear();this.buildLeaves();this.draw()}
  reset(){this.layout={nodes:{},leaves:{}};for(const n of this.nodes.values()){[n.x,n.y]=this.defaults[n.index]}for(const l of this.leaves.values()){l.g.remove();l.edge.remove()}this.leaves.clear();this.buildLeaves();this.fit();this.persistSoon()}
  persistSoon(){clearTimeout(this.saveTimer);if(this.data?.replay)return;this.saveTimer=setTimeout(()=>{this.cb.onLayout?.(this.layout)},300)}
  diagnostics(){const p=(a,q)=>{if(!a.length)return null;const b=[...a].sort((x,y)=>x-y);return Math.round(b[Math.floor((b.length-1)*q)]*100)/100};return {...this.universe?.diagnostics(),interactionSamples:this.interactionFrames.length,interactionFrameMedianMs:p(this.interactionFrames,.5),interactionFrameP95Ms:p(this.interactionFrames,.95),sceneUpdateCPU95Ms:p(this.updateCosts,.95)}}
  setPaused(paused){this.paused=!!paused;this.el.classList.toggle('ambient-paused',this.paused);this.universe?.setPaused(this.paused);if(this.svg.pauseAnimations){if(this.paused)this.svg.pauseAnimations();else this.svg.unpauseAnimations()}}
  bind(){this.el.addEventListener('gesturestart',e=>{e.preventDefault();this.gestureScale=this.target.k});this.el.addEventListener('gesturechange',e=>{e.preventDefault();if(this.gestureScale)this.zoomAt((this.gestureScale*e.scale)/this.target.k,e.clientX,e.clientY)});
    this.el.addEventListener('wheel',e=>{if(e.target.closest('.atlas-caption'))return;e.preventDefault();this.zoomAt(Math.exp(-Math.max(-120,Math.min(120,e.deltaY))*.0028),e.clientX,e.clientY)},{passive:false});
    this.el.addEventListener('pointerdown',e=>{if(e.button!==0||this.drag)return;const category=e.target.closest('[data-category]')?.dataset.category,skill=e.target.closest('[data-skill]')?.dataset.skill;if(e.target.closest('[data-core]'))return;const node=this.data?.replay?null:skill?this.leaves.get(skill):category?this.nodes.get(category):null;this.camera={...this.target};this.drag={id:e.pointerId,sx:e.clientX,sy:e.clientY,start:this.pointerWorld(e.clientX,e.clientY),camera:{...this.camera},node,category,skill,moved:false,ox:node?.x,oy:node?.y};e.preventDefault();e.target.closest('[tabindex]')?.focus({preventScroll:true})});
    this.el.addEventListener('pointermove',e=>{const d=this.drag;if(!d||e.pointerId!==d.id)return;const dx=e.clientX-d.sx,dy=e.clientY-d.sy;if(!d.moved&&Math.hypot(dx,dy)<4)return;if(!d.moved){d.moved=true;this.el.setPointerCapture(e.pointerId)}this.el.classList.add('dragging');if(d.node){const x=d.ox+dx/this.camera.k,y=d.oy+dy/this.camera.k;const shiftX=x-d.node.x,shiftY=y-d.node.y;d.node.x=Math.max(-1500,Math.min(1500,x));d.node.y=Math.max(-1200,Math.min(1200,y));if(d.category){for(const leaf of this.leaves.values()){if(leaf.parent===d.category&&!leaf.custom){leaf.x+=shiftX;leaf.y+=shiftY}}}else d.node.custom=true;this.invalidate()}else{this.target={x:d.camera.x+dx,y:d.camera.y+dy,k:this.camera.k};this.camera={...this.target};this.invalidate()}});
    const finish=e=>{const d=this.drag;if(!d||e.pointerId!==d.id)return;this.drag=null;this.el.classList.remove('dragging');if(this.el.hasPointerCapture(e.pointerId))this.el.releasePointerCapture(e.pointerId);if(d.moved){if(d.node){const group=d.skill?'leaves':'nodes';this.layout[group][d.skill||d.category]={x:d.node.x,y:d.node.y};this.persistSoon()}this.suppressClick=true;this.lastDragAt=performance.now();setTimeout(()=>this.suppressClick=false,0)}else if(d.skill)this.select(this.leaves.get(d.skill)?.parent,d.skill);else if(d.category)this.select(d.category);else {this.select(null);this.cb.onSelect?.(null,null)}};
    this.el.addEventListener('pointerup',finish);this.el.addEventListener('pointercancel',e=>{if(this.drag?.id===e.pointerId){this.drag=null;this.el.classList.remove('dragging')}});
    this.el.addEventListener('dblclick',e=>{if(this.suppressClick||performance.now()-(this.lastDragAt||0)<350)return;const cat=e.target.closest('[data-category]')?.dataset.category,skill=e.target.closest('[data-skill]')?.dataset.skill;if(cat)this.focus(cat);else if(skill)this.cb.onOpen?.(skill);else this.fit()});
    this.el.querySelector('[data-core]').addEventListener('click',()=>this.fit());
    this.el.addEventListener('keydown',e=>{const cat=e.target.closest('[data-category]')?.dataset.category,skill=e.target.closest('[data-skill]')?.dataset.skill;const node=skill?this.leaves.get(skill):cat?this.nodes.get(cat):null;
      if(e.key==='Escape'){this.select(null);this.back();return}if(e.key==='+'||e.key==='='){e.preventDefault();this.zoomAt(1.2);return}if(e.key==='-'){e.preventDefault();this.zoomAt(1/1.2);return}if(e.key==='0'){e.preventDefault();this.fit();return}
      if(node&&!this.data?.replay&&['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)){e.preventDefault();const before={x:node.x,y:node.y};const delta=e.shiftKey?25:8;if(e.key==='ArrowLeft')node.x-=delta;if(e.key==='ArrowRight')node.x+=delta;if(e.key==='ArrowUp')node.y-=delta;if(e.key==='ArrowDown')node.y+=delta;if(cat)for(const leaf of this.leaves.values()){if(leaf.parent===cat&&!leaf.custom){leaf.x+=node.x-before.x;leaf.y+=node.y-before.y}}this.layout[skill?'leaves':'nodes'][skill||cat]={x:node.x,y:node.y};this.draw();this.persistSoon();return}
      if(e.key==='Enter'&&e.target.closest('[data-core]')){e.preventDefault();this.fit()}if(e.key==='Enter'&&node){e.preventDefault();this.select(skill?node.parent:cat,skill,true)}if(e.key===' '){e.preventDefault();if(skill)this.cb.onOpen?.(skill);else if(cat)this.focus(cat);else this.fit()}
    });
  }
}
window.OracleAtlas=OracleAtlas;
