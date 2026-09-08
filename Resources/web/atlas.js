/* Stable SVG scene: per-frame updates touch only camera and moved geometry.
 * Folder membership is evidence. Ambient motion is decorative, never telemetry. */
class OracleAtlas {
  constructor(element, callbacks) {
    this.el=element;this.cb=callbacks;this.abort=new AbortController();this.disposed=false;this.ns='http://www.w3.org/2000/svg';
    this.defaults=[[-188,-177],[184,-188],[322,8],[-314,-3],[-208,184],[238,187],[14,277]];
    this.palette=['#dba17c','#91b5ed','#7bc8b4','#d9c276','#b29bd7','#92c399','#d49cae'];
    this.nodes=new Map();this.leaves=new Map();this.layout={nodes:{},leaves:{}};
    this.camera={x:0,y:0,k:1};this.target={...this.camera};this.baseScale=1;this.frame=0;this.selected=null;this.selectedLeaf=null;this.first=true;this.lastDetail='';this.interactionFrames=[];this.updateCosts=[];this.suppressClick=false;
    this.el.innerHTML=`<svg class="atlas-scene" aria-label="Atlas do conhecimento" role="group" tabindex="0"><defs>
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
    this.listen(document,'visibilitychange',()=>this.setPaused(document.hidden||window.oracleWindowVisible===false||this.data?.hidden||this.data?.paused));
    this.motionPreference=matchMedia('(prefers-reduced-motion: reduce)');
    this.listen(this.motionPreference,'change',()=>{if(this.data)this.update(this.data)});
  }
  listen(target,type,handler,options={}){target.addEventListener(type,handler,{...options,signal:this.abort.signal})}
  make(tag,attrs={},parent){const el=document.createElementNS(this.ns,tag);if(['path','circle','ellipse','rect','svg'].includes(tag))el.setAttribute('aria-hidden','true');for(const [key,value]of Object.entries(attrs))el.setAttribute(key,String(value));parent?.append(el);return el}
  fittedScale(){const b=this.geometry?.bounds||{minX:-470,maxX:470,minY:-390,maxY:390};return Math.max(.08,Math.min((this.width-24)/(b.maxX-b.minX),(this.height-this.contentTop-18)/(b.maxY-b.minY)))}
  resize(){
    const r=this.el.getBoundingClientRect(),oldBase=this.baseScale,oldWidth=this.width,oldHeight=this.height;
    this.width=r.width;this.height=r.height;if(!r.width||!r.height)return;this.contentTop=28;
    const ratio=this.first?1:this.target.k/oldBase;
    const center=this.first?{x:0,y:0}:{x:((oldWidth||r.width)/2-this.target.x)/this.target.k,y:(((oldHeight||r.height)+this.contentTop)/2-this.target.y)/this.target.k};
    this.baseScale=this.fittedScale();const k=this.baseScale*ratio;
    this.target={x:this.width/2-center.x*k,y:(this.height+this.contentTop)/2-center.y*k,k};
    if(this.first){this.camera={...this.target};this.first=false}
    this.lastZoom=null;this.invalidate();
  }
  update(data){
    this.data=data;this.selected=data.selected;this.selectedLeaf=data.selectedLeaf||null;
    this.reduced=!!data.reduced||!!this.motionPreference?.matches;
    this.el.classList.toggle('motion-reduced',this.reduced);this.setPaused(document.hidden||data.hidden||data.paused);
    if(!this.loadedLayout&&data.layout){this.layout=structuredClone({nodes:data.layout.nodes||{},leaves:data.layout.leaves||{}});this.loadedLayout=true}
    const key=JSON.stringify([(data.collections||[]).map(c=>[c.id,c.name,c.icon]),(data.entries||[]).filter(e=>e.name==='SKILL.md'&&!e.directory).map(e=>e.path),data.detail,this.selected,Object.keys(this.layout.nodes),Object.keys(this.layout.leaves),(data.plugins||[]).filter(p=>p.status==='connected').map(p=>p.id).sort()]);
    if(key!==this.topologyKey){const hadGeometry=!!this.geometry,ratio=this.target.k/this.baseScale;this.topologyKey=key;this.relayout();if(hadGeometry&&ratio>.5&&!data.replay)this.fit()}
    this.updatePlugins(data.plugins||[]);this.updateConnectors(data.connectors||[]);this.el.classList.toggle('installation-waiting',data.coreReady===false);this.selection();this.draw();
    if(data.events?.length)this.universe?.signalReceipt(data.events.at(-1));
  }
  relayout(){
    const oldBase=this.baseScale,ratio=this.target.k/oldBase||1,anchor={x:(this.width/2-this.target.x)/this.target.k,y:((this.height+this.contentTop)/2-this.target.y)/this.target.k};
    this.geometry=OracleLayout.plan(this.data.collections||[],this.data.entries||[],this.selected,this.data.detail,this.layout,Math.max(105,(this.data.plugins||[]).filter(p=>p.status==='connected').length*3.8)+140);
    const present=new Set(this.geometry.nodes.map(n=>n.id));
    for(const[id,n]of this.nodes)if(!present.has(id)){n.g.remove();n.edge.remove();n.flow.remove();this.nodes.delete(id)}
    if(this.selected&&!present.has(this.selected)){this.selected=null;this.selectedLeaf=null}
    // Keep rendering order keyed to identity, independent of source enumeration order.
    const ordered=[...this.geometry.nodes].sort((a,b)=>Object.keys(OracleLayout.identities).indexOf(a.id)-Object.keys(OracleLayout.identities).indexOf(b.id)||a.id.localeCompare(b.id));
    ordered.forEach((p,i)=>{
      let n=this.nodes.get(p.id);
      if(!n){
        const edge=this.make('path',{class:'category-edge',fill:'none','data-edge':p.id},this.edgeLayer);
        const flow=this.make('path',{class:'edge-flow ambient',fill:'none',pathLength:1},this.edgeLayer);flow.style.animationDelay=`${-i*2.3}s`;
        const g=this.make('g',{class:'category-node',role:'button',tabindex:0,'data-category':p.id},this.nodeLayer);
        this.make('circle',{r:47,class:'selection-ring'},g);this.make('circle',{r:39,class:'planet-surface',fill:'url(#planet-fill)'},g);
        const symbol=this.make('svg',{x:-14,y:-14,width:28,height:28,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor','stroke-width':1.1,'stroke-linecap':'round','stroke-linejoin':'round',class:'category-symbol'},g);
        this.make('path',{d:paths[p.icon]||paths.note},symbol);
        const label=this.make('text',{y:60,'text-anchor':'middle',class:'category-name'},g),count=this.make('text',{y:77,'text-anchor':'middle',class:'category-count'},g);
        n={id:p.id,x:p.x,y:p.y,edge,flow,g,label,count};this.nodes.set(p.id,n);
      }
      Object.assign(n,{name:p.name,tx:p.x,ty:p.y,index:i,skills:p.skills,angle:p.angle});this.palette[i]=p.color;
      n.g.style.setProperty('--node-accent',p.color);n.edge.style.setProperty('--node-accent',p.color);n.label.textContent=p.name;n.count.textContent=`${p.skills.length} skills`;
      n.g.dataset.tooltip=`${p.name} · ${p.skills.length} ${p.skills.length===1?'skill':'skills'}`;
      n.g.setAttribute('aria-label',`${p.name}, ${p.skills.length} skills. Enter expande; espaço enquadra; setas movem.`);
    });
    if(this.width){this.baseScale=this.fittedScale();const k=this.baseScale*ratio;this.target={x:this.width/2-anchor.x*k,y:(this.height+this.contentTop)/2-anchor.y*k,k};this.lastZoom=null}
    this.buildLeaves(ratio);this.lastSelectionKey=null;this.invalidate();
  }
  buildLeaves(level=this.camera.k/this.baseScale){
    if(!this.geometry)return;
    const visible=level>.500001,rows=visible?this.geometry.leaves:[],wanted=new Set(rows.map(l=>l.id));
    for(const[id,l]of this.leaves)if(!wanted.has(id)){if(l.g.contains(document.activeElement))this.nodes.get(l.parent)?.g.focus({preventScroll:true});l.g.remove();l.edge.remove();this.leaves.delete(id);this.lastSelectionKey=null}
    for(const p of rows){
      const n=this.nodes.get(p.parent);let l=this.leaves.get(p.id);
      if(!l){
        const edge=this.make('path',{class:'skill-edge',fill:'none'},this.edgeLayer);
        const g=this.make('g',{class:'skill-node',role:'button',tabindex:0,'data-skill':p.id},this.leafLayer);
        this.make('circle',{r:11,fill:'transparent',class:'skill-hit'},g);
        this.make('circle',{r:3.3,class:'skill-dot'},g);this.make('circle',{r:7,class:'skill-selection'},g);
        const label=this.make('text',{y:4,class:'skill-name'},g);
        const name=p.id.split('/').at(-2).replace(/-/g,' ');label.textContent=name.length>31?name.slice(0,29)+'…':name;
        g.dataset.tooltip=name;g.setAttribute('aria-label',`${name}. Enter seleciona; espaço abre documento.`);
        l={...p,x:this.reduced?p.x:n.x,y:this.reduced?p.y:n.y,g,edge,label};this.leaves.set(p.id,l);this.lastSelectionKey=null;
      }
      Object.assign(l,{tx:p.x,ty:p.y,source:p.source,depth:p.depth,index:p.index,dir:p.dir,custom:p.custom});
      l.g.style.setProperty('--node-accent',this.palette[n.index]);l.edge.style.setProperty('--node-accent',this.palette[n.index]);
      l.label.setAttribute('text-anchor',p.dir===1?'start':'end');
    }
    this.leafLevel=visible;this.geometryMoving=true;
  }
  updatePlugins(plugins){
    const connected=plugins.filter(p=>p.status==='connected').sort((a,b)=>a.id.localeCompare(b.id));
    const key=JSON.stringify(connected.map(p=>[p.id,p.name,p.iconDataURL]));if(key===this.pluginKey)return;this.pluginKey=key;
    this.pluginLayer?.remove();this.pluginLayer=this.make('g',{class:'plugin-orbit-layer'},this.world);
    const radius=Math.max(105,connected.length*3.8);this.pluginRadius=radius;
    this.make('circle',{r:radius,class:'plugin-orbit-ring'},this.pluginLayer);
    this.make('circle',{r:radius,class:'plugin-orbit-current ambient'},this.pluginLayer);
    connected.forEach((p,i)=>{
      const angle=-Math.PI/2+i*Math.PI*2/connected.length;
      const g=this.make('g',{class:'orbital-plugin',role:'button',tabindex:0,'data-orbit-plugin':p.id,transform:`translate(${Math.cos(angle)*radius} ${Math.sin(angle)*radius})`,'aria-label':`${p.name}, conectado`},this.pluginLayer);
      g.dataset.tooltip=p.name+' · conectado';this.make('circle',{r:13,class:'plugin-disc'},g);
      if(/^data:image\/(png|jpeg|webp|svg\+xml);base64,/.test(p.iconDataURL||''))this.make('image',{x:-8,y:-8,width:16,height:16,href:p.iconDataURL},g);
      else{const text=this.make('text',{y:1},g);text.textContent=p.name.slice(0,2).toUpperCase()}
    });
  }
  updateConnectors(connectors){
    const key=JSON.stringify(connectors.map(c=>[c.id,c.label]));if(key===this.connectorKey)return;this.connectorKey=key;
    this.connectorLayer?.remove();this.connectorLayer=this.make('g',{class:'verified-connectors'},this.world);
    connectors.forEach((c,i)=>{
      const angle=-Math.PI/2+i*Math.PI*2/Math.max(3,connectors.length),radius=Math.max(158,(this.pluginRadius||105)+38);
      const g=this.make('g',{class:'verified-connector',role:'button',tabindex:0,'data-connector':c.id,transform:`translate(${Math.cos(angle)*radius} ${Math.sin(angle)*radius})`,'aria-label':c.id==='gbrain'?'Second Brain conectado':'Obsidian conectado'},this.connectorLayer);
      g.dataset.tooltip=c.id==='gbrain'?'Second Brain · verificado':'Obsidian · '+c.label;
      this.make('circle',{r:16,fill:'#191919',stroke:'#ffffff40','stroke-width':.8},g);
      const symbol=this.make('svg',{x:-9,y:-9,width:18,height:18,viewBox:'0 0 24 24',fill:'none',stroke:'#ddd','stroke-width':1.2,'stroke-linecap':'round','stroke-linejoin':'round'},g);
      this.make('path',{d:paths[c.id==='gbrain'?'brain':'folder']},symbol);
    });
  }
  selection(){
    const detail=Number(this.data?.detail??3),level=this.camera.k/this.baseScale;
    const key=[this.selected,this.selectedLeaf,Math.round(level*10),this.leaves.size,this.nodes.size,detail].join('|');if(key===this.lastSelectionKey)return;this.lastSelectionKey=key;
    for(const n of this.nodes.values()){const active=n.id===this.selected;n.g.classList.toggle('selected',active);n.g.classList.toggle('subdued',!!this.selected&&!active);n.edge.classList.toggle('selected',active);n.edge.classList.toggle('subdued',!!this.selected&&!active);n.flow.classList.toggle('flow-visible',active||!this.selected);n.g.setAttribute('aria-pressed',String(active))}
    for(const l of this.leaves.values()){const member=l.parent===this.selected;l.g.classList.toggle('selected',l.id===this.selectedLeaf);l.g.classList.toggle('subdued',!!this.selected&&!member);l.edge.classList.toggle('selected',l.id===this.selectedLeaf);l.edge.classList.toggle('member',member);l.g.setAttribute('aria-pressed',String(l.id===this.selectedLeaf))}
    const hint=this.el.querySelector('.atlas-selection-hint');hint.hidden=!this.selected;hint.textContent=this.selectedLeaf?this.nodes.get(this.selected)?.name+' / '+this.selectedLeaf.split('/').at(-2):this.nodes.get(this.selected)?.name||'';
  }
  edgePath(x1,y1,x2,y2,bend=.13){const dx=x2-x1,dy=y2-y1;return `M${x1} ${y1} C${x1+dx*.34-dy*bend} ${y1+dy*.34+dx*bend},${x1+dx*.72-dy*bend*.5} ${y1+dy*.72+dx*bend*.5},${x2} ${y2}`}
  draw(){
    if(this.disposed)return;const started=performance.now(),{x,y,k}=this.camera;
    this.world.setAttribute('transform',`translate(${x} ${y}) scale(${k})`);
    for(const n of this.nodes.values())if(n._x!==n.x||n._y!==n.y){n.g.setAttribute('transform',`translate(${n.x} ${n.y})`);const d=this.edgePath(0,0,n.x,n.y);n.edge.setAttribute('d',d);n.flow.setAttribute('d',d);n._x=n.x;n._y=n.y}
    for(const l of this.leaves.values()){
      const parent=this.leaves.get(l.source)||this.nodes.get(l.parent);
      if(l._x!==l.x||l._y!==l.y||l._px!==parent.x||l._py!==parent.y){l.g.setAttribute('transform',`translate(${l.x} ${l.y})`);l.edge.setAttribute('d',this.edgePath(parent.x,parent.y,l.x,l.y,.16));l._x=l.x;l._y=l.y;l._px=parent.x;l._py=parent.y}
      if(k!==this.lastLabelK){l.label.style.fontSize=`${11/k}px`;l.label.setAttribute('x',l.dir*9/k);l.label.setAttribute('y',3/k)}
    }
    this.lastLabelK=k;if(this.lastZoom!==k){this.cb.onZoom?.(k/this.baseScale);this.lastZoom=k}
    this.selection();this.layoutLabels();this.universe?.sync(this);this.updateCosts.push(performance.now()-started);if(this.updateCosts.length>180)this.updateCosts.shift();
  }
  layoutLabels(){
    const {x,y,k}=this.camera,level=k/this.baseScale,detail=Number(this.data?.detail??3),boxes=[];
    const candidates=[...this.leaves.values()].sort((a,b)=>Number(b.id===this.selectedLeaf)-Number(a.id===this.selectedLeaf)||b.depth-a.depth||a.index-b.index);
    let count=0;
    for(const l of candidates){
      const eligible=l.id===this.selectedLeaf||detail>0&&(l.parent===this.selected||level>1.35)&&count<detail*2;
      const sx=x+l.x*k,sy=y+l.y*k,width=Math.min(190,l.label.textContent.length*5.7),height=16;
      let dir=l.dir;if(sx+9+width>this.width-8)dir=-1;if(sx-9-width<8)dir=1;
      const box={left:dir===1?sx+9:sx-9-width,right:dir===1?sx+9+width:sx-9,top:sy-height/2,bottom:sy+height/2};
      const fits=eligible&&box.left>=8&&box.right<=this.width-8&&box.top>=24&&box.bottom<=this.height-8&&!boxes.some(b=>box.left<b.right+6&&box.right>b.left-6&&box.top<b.bottom+3&&box.bottom>b.top-3);
      l.label.setAttribute('text-anchor',dir===1?'start':'end');l.label.setAttribute('x',dir*9/k);l.g.classList.toggle('label-visible',fits);
      if(fits){boxes.push(box);count++}
    }
  }
  invalidate(){if(this.disposed||this.frame||document.hidden||window.oracleWindowVisible===false||this.data?.hidden)return;this.frame=requestAnimationFrame(now=>this.tick(now))}
  tick(now=performance.now()){
    const delta=Math.min(50,now-(this.lastTick||now-16.67));if(this.lastTick&&delta<90){this.interactionFrames.push(delta);if(this.interactionFrames.length>180)this.interactionFrames.shift()}this.lastTick=now;this.frame=0;
    const t=this.reduced?1:1-Math.exp(-delta/95);let moving=false;
    for(const key of ['x','y','k']){const d=this.target[key]-this.camera[key];if(Math.abs(d)>(key==='k'?.00001:.02)){this.camera[key]+=d*t;moving=true}else this.camera[key]=this.target[key]}
    if(this.geometryMoving){let geometryMoving=false;for(const p of [...this.nodes.values(),...this.leaves.values()]){if(this.drag?.node===p)continue;for(const axis of ['x','y']){const d=p['t'+axis]-p[axis];if(Number.isFinite(d)&&Math.abs(d)>.04){p[axis]+=d*(this.reduced?1:1-Math.exp(-delta/130));geometryMoving=true}else if(Number.isFinite(d))p[axis]=p['t'+axis]}}this.geometryMoving=geometryMoving;moving||=geometryMoving}
    if((this.camera.k/this.baseScale>.500001)!==this.leafLevel)this.buildLeaves();
    this.draw();if(moving||this.geometryMoving)this.invalidate();else this.lastTick=0;
  }
  pointerWorld(clientX,clientY){const r=this.el.getBoundingClientRect();return{x:(clientX-r.left-this.camera.x)/this.camera.k,y:(clientY-r.top-this.camera.y)/this.camera.k}}
  zoomAt(factor,clientX,clientY){
    const r=this.el.getBoundingClientRect(),sx=clientX===undefined?this.width/2:clientX-r.left,sy=clientY===undefined?(this.height+this.contentTop)/2:clientY-r.top;
    const next=Math.min(this.baseScale*3.2,Math.max(this.baseScale*.2,this.target.k*factor)),wx=(sx-this.target.x)/this.target.k,wy=(sy-this.target.y)/this.target.k;
    this.target={x:sx-wx*next,y:sy-wy*next,k:next};this.invalidate();
  }
  fit(){
    this.previous={...this.target};this.baseScale=this.fittedScale();const b=this.geometry?.bounds||{minX:-470,maxX:470,minY:-390,maxY:390},k=this.baseScale;
    this.target={x:this.width/2-(b.minX+b.maxX)*k/2,y:(this.height+this.contentTop)/2-(b.minY+b.maxY)*k/2,k};this.invalidate();
  }
  back(){if(this.previous){this.target=this.previous;this.previous=null;this.invalidate()}else this.fit()}
  focus(id){
    this.finishFormationForInput();if(!this.nodes.has(id))return;if(this.selected!==id)this.select(id);
    const n=this.nodes.get(id),points=[n,...this.geometry.leaves.filter(l=>l.parent===id)],minX=Math.min(...points.map(p=>p.x))-55,maxX=Math.max(...points.map(p=>p.x))+55,minY=Math.min(...points.map(p=>p.y))-55,maxY=Math.max(...points.map(p=>p.y))+55;
    const k=Math.min(this.baseScale*2.4,(this.width-30)/(maxX-minX),(this.height-this.contentTop-20)/(maxY-minY));
    this.previous={...this.target};this.target={x:this.width/2-(minX+maxX)*k/2,y:(this.height+this.contentTop)/2-(minY+maxY)*k/2,k};this.invalidate();
  }
  select(category,leaf=null,keyboard=false){
    this.finishFormationForInput();const changed=category!==this.selected;this.selected=category;this.selectedLeaf=leaf;
    if(this.data){this.data.selected=category;this.data.selectedLeaf=leaf}if(changed){this.topologyKey=null;this.relayout();if(this.camera.k/this.baseScale>.5)this.fit()}
    this.selection();this.draw();this.cb.onSelect?.(category,leaf,keyboard);
  }
  restoreLayout(layout){this.layout=structuredClone(layout||{nodes:{},leaves:{}});this.topologyKey=null;this.relayout();this.fit()}
  reset(){this.restoreLayout({nodes:{},leaves:{}});this.persistSoon()}
  translateNode(node,dx,dy,category){
    const x=Math.max(-1500,Math.min(1500,node.x+dx)),y=Math.max(-1500,Math.min(1500,node.y+dy));dx=x-node.x;dy=y-node.y;node.x=node.tx=x;node.y=node.ty=y;
    if(category){for(const l of this.leaves.values())if(l.parent===category&&!l.custom){l.x+=dx;l.y+=dy;l.tx=l.x;l.ty=l.y}}else node.custom=true;
  }
  persistSoon(){clearTimeout(this.saveTimer);if(this.data?.replay)return;this.saveTimer=setTimeout(()=>{this.cb.onLayout?.(this.layout)},300)}
  diagnostics(){const p=(a,q)=>{if(!a.length)return null;const b=[...a].sort((x,y)=>x-y);return Math.round(b[Math.floor((b.length-1)*q)]*100)/100};return {...this.universe?.diagnostics(),interactionSamples:this.interactionFrames.length,interactionFrameMedianMs:p(this.interactionFrames,.5),interactionFrameP95Ms:p(this.interactionFrames,.95),sceneUpdateCPU95Ms:p(this.updateCosts,.95)}}
  setFormation(options){return this.universe?.setFormation(options)||{progress:1,playing:false,phase:'complete',visualOnly:true}}
  getFormation(){return this.universe?.getFormation()||{progress:1,playing:false,phase:'complete',visualOnly:true}}
  finishFormationForInput(){if(this.data?.replay)return;if(this.getFormation().progress<1)this.setFormation({progress:1,playing:false})}
  setPaused(paused){this.paused=!!paused;
    if(document.hidden||window.oracleWindowVisible===false||this.data?.hidden){cancelAnimationFrame(this.frame);this.frame=0;this.lastTick=0}
    else if(!paused)this.invalidate();this.el.classList.toggle('ambient-paused',this.paused);this.universe?.setPaused(this.paused);if(this.svg.pauseAnimations){if(this.paused)this.svg.pauseAnimations();else this.svg.unpauseAnimations()}}
  bind(){
    const targetState=element=>({category:element?.closest?.('[data-category]')?.dataset.category,skill:element?.closest?.('[data-skill]')?.dataset.skill,core:!!element?.closest?.('[data-core]')});
    this.listen(this.el,'pointerover',e=>{if(!this.drag){this.hovered=targetState(e.target);this.universe?.sync(this)}});
    this.listen(this.el,'pointerleave',()=>{this.hovered=null;this.universe?.sync(this)});
    this.listen(this.el,'focusin',e=>{this.finishFormationForInput();this.keyboardFocus=targetState(e.target);this.universe?.sync(this)});
    this.listen(this.el,'focusout',e=>{this.keyboardFocus=targetState(e.relatedTarget);this.universe?.sync(this)});
    this.listen(this.el,'gesturestart',e=>{e.preventDefault();this.gestureScale=this.target.k});this.listen(this.el,'gesturechange',e=>{e.preventDefault();if(this.gestureScale)this.zoomAt((this.gestureScale*e.scale)/this.target.k,e.clientX,e.clientY)});
    this.listen(this.el,'wheel',e=>{if(e.target.closest('.atlas-caption'))return;e.preventDefault();this.zoomAt(Math.exp(-Math.max(-120,Math.min(120,e.deltaY))*.0028),e.clientX,e.clientY)},{passive:false});
    this.listen(this.el,'pointerdown',e=>{this.finishFormationForInput();if(e.button!==0||this.drag)return;const category=e.target.closest('[data-category]')?.dataset.category,skill=e.target.closest('[data-skill]')?.dataset.skill;if(e.target.closest('[data-core],[data-orbit-plugin],[data-connector]'))return;const node=this.data?.replay?null:skill?this.leaves.get(skill):category?this.nodes.get(category):null;this.camera={...this.target};this.drag={id:e.pointerId,sx:e.clientX,sy:e.clientY,start:this.pointerWorld(e.clientX,e.clientY),camera:{...this.camera},node,category,skill,moved:false,ox:node?.x,oy:node?.y};e.preventDefault();e.target.closest('[tabindex]')?.focus({preventScroll:true})});
    this.listen(this.el,'pointermove',e=>{const d=this.drag;if(!d||e.pointerId!==d.id)return;const dx=e.clientX-d.sx,dy=e.clientY-d.sy;if(!d.moved&&Math.hypot(dx,dy)<4)return;if(!d.moved){d.moved=true;this.el.setPointerCapture(e.pointerId)}this.el.classList.add('dragging');if(d.node){this.translateNode(d.node,d.ox+dx/this.camera.k-d.node.x,d.oy+dy/this.camera.k-d.node.y,d.category);this.invalidate()}else{this.target={x:d.camera.x+dx,y:d.camera.y+dy,k:this.camera.k};this.camera={...this.target};this.invalidate()}});
    const finish=e=>{const d=this.drag;if(!d||e.pointerId!==d.id)return;this.drag=null;this.el.classList.remove('dragging');this.universe?.sync(this);if(this.el.hasPointerCapture(e.pointerId))this.el.releasePointerCapture(e.pointerId);if(d.moved){if(d.node){const group=d.skill?'leaves':'nodes';this.layout[group][d.skill||d.category]={x:d.node.x,y:d.node.y};this.persistSoon()}this.suppressClick=true;this.lastDragAt=performance.now();setTimeout(()=>this.suppressClick=false,0)}else if(d.skill)this.select(this.leaves.get(d.skill)?.parent,d.skill);else if(d.category)this.select(d.category);else {this.select(null);this.cb.onSelect?.(null,null)}};
    this.listen(this.el,'pointerup',finish);this.listen(this.el,'pointercancel',e=>{if(this.drag?.id===e.pointerId){this.drag=null;this.el.classList.remove('dragging');if(this.el.hasPointerCapture(e.pointerId))this.el.releasePointerCapture(e.pointerId);this.universe?.sync(this)}});
    this.listen(this.el,'dblclick',e=>{if(this.suppressClick||performance.now()-(this.lastDragAt||0)<350)return;const cat=e.target.closest('[data-category]')?.dataset.category,skill=e.target.closest('[data-skill]')?.dataset.skill;if(cat)this.focus(cat);else if(skill)this.cb.onOpen?.(skill);else this.fit()});
    this.listen(this.el.querySelector('[data-core]'),'click',()=>this.fit());
    this.listen(this.el,'click',e=>{const connector=e.target.closest('[data-connector]')?.dataset.connector;if(connector){e.stopPropagation();this.cb.onConnector?.(connector);return}const id=e.target.closest('[data-orbit-plugin]')?.dataset.orbitPlugin;if(id){e.stopPropagation();this.cb.onPlugin?.(id)}});
    this.listen(this.el,'keydown',e=>{const connector=e.target.closest('[data-connector]')?.dataset.connector;if(connector&&['Enter',' '].includes(e.key)){e.preventDefault();this.cb.onConnector?.(connector);return}const plugin=e.target.closest('[data-orbit-plugin]')?.dataset.orbitPlugin;if(plugin&&['Enter',' '].includes(e.key)){e.preventDefault();this.cb.onPlugin?.(plugin);return}const cat=e.target.closest('[data-category]')?.dataset.category,skill=e.target.closest('[data-skill]')?.dataset.skill;const node=skill?this.leaves.get(skill):cat?this.nodes.get(cat):null;
      if(e.key==='Escape'){this.select(null);this.back();return}if(e.key==='+'||e.key==='='){e.preventDefault();this.zoomAt(1.2);return}if(e.key==='-'){e.preventDefault();this.zoomAt(1/1.2);return}if(e.key==='0'){e.preventDefault();this.fit();return}
      if(node&&!this.data?.replay&&['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)){e.preventDefault();const delta=e.shiftKey?25:8;this.translateNode(node,e.key==='ArrowLeft'?-delta:e.key==='ArrowRight'?delta:0,e.key==='ArrowUp'?-delta:e.key==='ArrowDown'?delta:0,cat);this.layout[skill?'leaves':'nodes'][skill||cat]={x:node.x,y:node.y};this.draw();this.persistSoon();return}
      if(e.key==='Enter'&&e.target.closest('[data-core]')){e.preventDefault();this.fit();return}
      if(e.key==='Enter'&&node){e.preventDefault();this.select(skill?node.parent:cat,skill,true)}if(e.key===' '){e.preventDefault();if(skill)this.cb.onOpen?.(skill);else if(cat)this.focus(cat);else this.fit()}
    });
  }
  dispose(){if(this.disposed)return;this.disposed=true;this.abort.abort();this.observer.disconnect();cancelAnimationFrame(this.frame);clearTimeout(this.saveTimer);clearTimeout(this.eventTimer);this.frame=0;this.universe?.dispose();this.nodes.clear();this.leaves.clear();this.el.replaceChildren()}
}
window.OracleAtlas=OracleAtlas;
