/* Stable SVG scene: per-frame updates touch only camera and moved geometry.
 * Folder membership is evidence. Ambient motion is decorative, never telemetry. */
class OracleAtlas {
  constructor(element, callbacks) {
    this.el=element;this.cb=callbacks;this.abort=new AbortController();this.disposed=false;this.ns='http://www.w3.org/2000/svg';
    this.defaults=[[-188,-177],[184,-188],[322,8],[-314,-3],[-208,184],[238,187],[14,277]];
    this.palette=['#dba17c','#91b5ed','#7bc8b4','#d9c276','#b29bd7','#92c399','#d49cae'];
    this.nodes=new Map();this.groups=new Map();this.leaves=new Map();this.context={kind:'global',group:null,page:0};this.history=[];this.layout={nodes:{},leaves:{}};
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
    </g><g class="atlas-edges"></g><g class="atlas-groups"></g><g class="atlas-leaves"></g><g class="atlas-nodes"></g>
    <g class="oracle-core" role="button" tabindex="0" data-core="true" aria-label="Oracle, núcleo central. Enquadrar todo o atlas" data-tooltip="Enquadrar todo o universo">
      <circle r="155" fill="url(#oracle-core-halo)" class="core-atmosphere"/><circle r="57" class="core-outline"/>
      <g class="core-orbit ambient"><circle r="62" fill="none" stroke="url(#orbit-silver)" stroke-width=".7" stroke-dasharray="100 38 34 100 18 100"/><circle cx="62" r="2" fill="#d5d6d4"/></g>
      <g class="core-orbit reverse ambient"><ellipse rx="76" ry="28" fill="none" stroke="#bfc2c5" stroke-opacity=".18" stroke-width=".7" transform="rotate(-31)"/><circle cx="-65" cy="-14" r="1.4" fill="#9fa4ac"/></g>
      <circle r="49" fill="url(#oracle-core-fill)" stroke="#a9afb6" stroke-opacity=".65" stroke-width=".8"/>
      <circle r="45" fill="none" stroke="#d9dcdd" stroke-opacity=".08" stroke-width=".6"/>
      <image x="-21" y="-21" width="42" height="42" href="brand/symbol-white.svg" aria-hidden="true"/>
      <circle r="55" fill="transparent" class="core-hit"/>
    </g></g></svg><div class="atlas-caption"><span class="atlas-instruction">Arraste para explorar · ⌘/Ctrl + rolagem para aproximar</span></div><nav class="atlas-context glass" aria-label="Navegação do mapa" hidden><button data-map-back aria-label="Voltar um nível">←</button><div class="atlas-breadcrumb"></div><div class="atlas-page" hidden><button data-map-page="-1" aria-label="Skills anteriores">‹</button><span></span><button data-map-page="1" aria-label="Próximas skills">›</button></div></nav>`;
    this.svg=this.el.querySelector('svg');this.world=this.el.querySelector('.atlas-camera');this.edgeLayer=this.el.querySelector('.atlas-edges');this.nodeLayer=this.el.querySelector('.atlas-nodes');this.leafLayer=this.el.querySelector('.atlas-leaves');this.groupLayer=this.el.querySelector('.atlas-groups');
    try{this.universe=new OracleUniverse(this.el)}catch(error){this.renderError=String(error);this.el.classList.add('svg-fallback')}
    this.bind();this.observer=new ResizeObserver(()=>this.resize());this.observer.observe(this.el.parentElement);for(const panel of document.querySelectorAll('#navigation-panel,#observatory-panel'))this.observer.observe(panel);
    this.listen(document,'visibilitychange',()=>this.setPaused(document.hidden||window.oracleWindowVisible===false||this.data?.hidden||this.data?.paused));
    this.motionPreference=matchMedia('(prefers-reduced-motion: reduce)');
    this.listen(this.motionPreference,'change',()=>{if(this.data)this.update(this.data)});
  }
  listen(target,type,handler,options={}){target.addEventListener(type,handler,{...options,signal:this.abort.signal})}
  make(tag,attrs={},parent){const el=document.createElementNS(this.ns,tag);if(['path','circle','ellipse','rect','svg'].includes(tag))el.setAttribute('aria-hidden','true');for(const [key,value]of Object.entries(attrs))el.setAttribute(key,String(value));parent?.append(el);return el}
  measureViewport(){
    const visible=id=>{const el=document.querySelector(id);return el&&!el.hidden&&getComputedStyle(el).display!=='none'?el.getBoundingClientRect():null};
    const nav=visible('#navigation-panel'),inspector=visible('#observatory-panel'),header=visible('.app-header');
    const left=nav?nav.right+16:24,right=inspector?inspector.left-16:this.width-24;
    const top=(header?.bottom||82)+74,bottom=this.height-76;
    return {left,right,top,bottom,width:Math.max(160,right-left),height:Math.max(120,bottom-top),cx:(left+right)/2,cy:(top+bottom)/2};
  }
  viewCenter(){return this.viewport?{x:this.viewport.cx,y:this.viewport.cy}:{x:(this.width||1000)/2,y:(this.height||700)/2}}
  fittedCamera(){
    const v=this.viewport||{left:24,top:156,width:(this.width||1000)-48,height:(this.height||700)-232};
    const c=OracleLayout.fitCamera(this.geometry?.focusBounds||{minX:-470,maxX:470,minY:-390,maxY:390},v.width,v.height,0,18,this.context.group?1.45:Infinity);
    return {x:c.x+v.left,y:c.y+v.top,k:c.k};
  }
  fittedScale(){return this.fittedCamera().k}
  resize(){
    const r=this.el.parentElement.getBoundingClientRect(),oldBase=this.baseScale,oldCenter=this.viewCenter();
    this.width=r.width;this.height=r.height;if(!r.width||!r.height)return;
    this.viewport=this.measureViewport();this.contentTop=this.viewport.top;const center=this.viewCenter(),v=this.viewport;
    const style=this.el.parentElement.style;style.setProperty('--atlas-center-x',center.x+'px');style.setProperty('--atlas-safe-width',v.width+'px');style.setProperty('--atlas-safe-left',v.left+'px');style.setProperty('--atlas-safe-right',(this.width-v.right)+'px');style.setProperty('--atlas-safe-top',v.top+'px');style.setProperty('--atlas-safe-bottom',(this.height-v.bottom)+'px');
    if(this.context.kind==='skill'&&this.selectedLeaf&&!this.first){const focal=this.geometry.leaves.find(l=>l.id===this.selectedLeaf);this.baseScale=this.fittedScale();const k=this.baseScale*1.35;this.target={x:center.x-focal.x*k,y:center.y-focal.y*k,k};this.contextTravelling=true;}
    else if(this.autoFit||this.first){this.fit();if(this.first){this.camera={...this.target};this.first=false}}
    else {
      const ratio=this.target.k/oldBase,world={x:(oldCenter.x-this.target.x)/this.target.k,y:(oldCenter.y-this.target.y)/this.target.k};
      this.baseScale=this.fittedScale();const k=this.baseScale*ratio;
      this.target={x:center.x-world.x*k,y:center.y-world.y*k,k};
    }
    this.lastZoom=null;this.invalidate();
  }
  update(data){
    const routeChanged=this.data&&(this.selected!==data.selected||this.selectedLeaf!==(data.selectedLeaf||null));
    if(routeChanged)this.remember();
    this.data=data;this.selected=data.selected||null;this.selectedLeaf=data.selectedLeaf||null;
    if(routeChanged||!this.context.kind)this.context={kind:this.selectedLeaf?'skill':this.selected?'specialist':'global',group:this.selectedLeaf?OracleLayout.catalogGroups(this.selected,data.entries||[]).find(g=>g.skills.some(e=>e.path===this.selectedLeaf))?.id:null,page:0};
    this.reduced=!!data.reduced||!!this.motionPreference?.matches;
    this.el.classList.toggle('motion-reduced',this.reduced);this.setPaused(document.hidden||data.hidden||data.paused);
    if(!this.loadedLayout&&data.layout){this.layout=structuredClone({nodes:data.layout.nodes||{},leaves:data.layout.leaves||{}});this.loadedLayout=true}
    const key=JSON.stringify([(data.collections||[]).map(c=>[c.id,c.name,c.icon]),(data.entries||[]).filter(e=>e.name==='SKILL.md'&&!e.directory).map(e=>e.path),data.detail,this.selected,this.context,Object.keys(this.layout.nodes),Object.keys(this.layout.leaves),(data.plugins||[]).filter(p=>p.status==='connected').map(p=>p.id).sort()]);
    if(key!==this.topologyKey){this.topologyKey=key;this.relayout();if(routeChanged||this.autoFit!==false)this.fit()}
    this.updatePlugins(data.plugins||[]);this.updateConnectors(data.connectors||[]);this.el.classList.toggle('installation-waiting',data.coreReady===false);this.selection();this.draw();
    if(data.events?.length)this.universe?.signalReceipt(data.events.at(-1));
  }
  relayout(){
    let recovered=false;
    if(this.selected&&!(this.data.collections||[]).some(c=>c.id===this.selected)){this.selected=null;this.selectedLeaf=null;this.context={kind:'global',group:null,page:0};recovered=true}
    if(this.selectedLeaf&&!(this.data.entries||[]).some(e=>e.path===this.selectedLeaf)){this.selectedLeaf=null;this.context.kind=this.context.group?'group':'specialist';recovered=true}
    if(this.context.group){const group=OracleLayout.catalogGroups(this.selected,this.data.entries||[]).find(g=>g.id===this.context.group);if(!group){this.context={kind:this.selected?'specialist':'global',group:null,page:0};this.selectedLeaf=null;recovered=true}else this.context.page=Math.min(this.context.page,Math.max(0,Math.ceil(group.skills.length/50)-1))}
    if(recovered){this.data.selected=this.selected;this.data.selectedLeaf=this.selectedLeaf;this.autoFit=true;this.cb.onSelect?.(this.selected,this.selectedLeaf)}
    const oldBase=this.baseScale,ratio=this.target.k/oldBase||1,anchor={x:(this.viewCenter().x-this.target.x)/this.target.k,y:(this.viewCenter().y-this.target.y)/this.target.k};
    this.geometry=OracleLayout.plan(this.data.collections||[],this.data.entries||[],this.selected,this.data.detail,this.layout,Math.max(105,(this.data.plugins||[]).filter(p=>p.status==='connected').length*3.8)+150,{...this.context,leaf:this.selectedLeaf});
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
        this.make('circle',{r:31,class:'selection-ring'},g);this.make('circle',{r:25,class:'planet-surface',fill:'url(#planet-fill)'},g);
        const symbol=this.make('svg',{x:-10,y:-10,width:20,height:20,viewBox:'0 0 24 24',fill:'none',stroke:'currentColor','stroke-width':1.1,'stroke-linecap':'round','stroke-linejoin':'round',class:'category-symbol'},g);
        this.make('path',{d:paths[p.icon]||paths.note},symbol);
        const label=this.make('text',{y:60,'text-anchor':'middle',class:'category-name'},g),count=this.make('text',{y:77,'text-anchor':'middle',class:'category-count'},g);
        n={id:p.id,x:p.x,y:p.y,edge,flow,g,label,count};this.nodes.set(p.id,n);
      }
      Object.assign(n,{name:p.name,tx:p.x,ty:p.y,index:i,skills:p.skills,angle:p.angle});this.palette[i]=p.color;
      n.g.style.setProperty('--node-accent',p.color);n.edge.style.setProperty('--node-accent',p.color);n.label.textContent=p.name;n.count.textContent=`${p.skills.length} skills`;
      n.g.dataset.tooltip=`${p.name} · ${p.skills.length} ${p.skills.length===1?'skill':'skills'}`;
      n.g.setAttribute('aria-label',`${p.name}, ${p.skills.length} skills. Enter explora; espaço enquadra; Alt e arrasto reorganizam.`);
    });
    const groupIDs=new Set(this.geometry.groups.map(g=>g.id));
    for(const [id,g] of this.groups)if(!groupIDs.has(id)){g.g.remove();g.edge.remove();g.bus.remove();this.groups.delete(id)}
    for(const p of this.geometry.groups){
      let group=this.groups.get(p.id);const parent=this.nodes.get(p.parent);
      if(!group){
        const edge=this.make('path',{class:'group-edge',fill:'none'},this.edgeLayer),bus=this.make('path',{class:'routing-edge',fill:'none'},this.edgeLayer);
        const g=this.make('g',{class:'atlas-group',role:'button',tabindex:0,'data-group':p.id},this.groupLayer);
        const hit=this.make('circle',{r:15,fill:'transparent',class:'group-hit'},g);
        this.make('rect',{x:-5,y:-5,width:10,height:10,rx:2,transform:'rotate(45)',class:'group-junction'},g);
        const label=this.make('text',{y:-15,'text-anchor':'middle',class:'group-name'},g);
        group={id:p.id,x:parent.x,y:parent.y,g,edge,bus,label,hit};this.groups.set(p.id,group);
      }
      Object.assign(group,{...p,x:group.x,y:group.y,tx:p.x,ty:p.y});
      group.g.style.setProperty('--node-accent',OracleLayout.identity(p.parent).color);group.edge.style.setProperty('--node-accent',OracleLayout.identity(p.parent).color);group.bus.style.setProperty('--node-accent',OracleLayout.identity(p.parent).color);
      group.label.textContent=p.name.length>22?p.name.slice(0,20)+'…':p.name;
      const description=p.kind==='folder'?'Pasta':'Faixa alfabética';
      group.g.dataset.tooltip=`${description} ${p.name} · ${p.skills.length} skills`;
      group.g.setAttribute('aria-label',`${description} ${p.name}, ${p.skills.length} skills. Enter explora este grupo.`);
    }
    if(this.width){this.baseScale=this.fittedScale();const k=this.baseScale*ratio;this.target={x:this.viewCenter().x-anchor.x*k,y:this.viewCenter().y-anchor.y*k,k};this.lastZoom=null}
    this.buildLeaves(ratio);this.lastSelectionKey=null;this.invalidate();
  }
  buildLeaves(level=this.camera.k/this.baseScale){
    if(!this.geometry)return;
    const visible=(this.contextTravelling?this.target.k/this.baseScale:level)>.500001,rows=visible?this.geometry.leaves:[],wanted=new Set(rows.map(l=>l.id));
    for(const[id,l]of this.leaves)if(!wanted.has(id)&&!l.retiring){
      if(l.g.contains(document.activeElement))this.groups.get(l.group)?.g.focus({preventScroll:true});
      l.retiring=true;l.lifeTarget=0;l.g.setAttribute('tabindex','-1');l.g.style.pointerEvents='none';
      const source=this.groups.get(l.group)||this.nodes.get(l.parent);l.tx=source?.x??l.x;l.ty=source?.y??l.y;
    }
    for(const p of rows){
      const n=this.nodes.get(p.parent),group=this.groups.get(p.group);let l=this.leaves.get(p.id);
      if(!l){
        const edge=this.make('path',{class:'skill-edge',fill:'none'},this.edgeLayer);
        const g=this.make('g',{class:'skill-node',role:'button',tabindex:0,'data-skill':p.id},this.leafLayer);
        const hit=this.make('circle',{r:13,fill:'transparent',class:'skill-hit'},g);
        this.make('circle',{r:4.5,class:'skill-dot'},g);this.make('circle',{r:8,class:'skill-selection'},g);
        this.make('path',{d:'M-2.5 -4h3l2 2v6h-5z M.5 -4v2h2 M-1 0h2 M-1 2h2',class:'skill-glyph'},g);
        const label=this.make('text',{y:4,class:'skill-name'},g);
        const name=p.name;label.textContent=name.length>34?name.slice(0,32)+'…':name;
        g.dataset.tooltip=name;g.setAttribute('aria-label',`${name}. Enter seleciona; espaço abre documento.`);
        l={...p,x:this.reduced?p.x:group.x,y:this.reduced?p.y:group.y,g,edge,label,hit,life:0};this.leaves.set(p.id,l);this.lastSelectionKey=null;
        l.arriveAt=performance.now()+(this.reduced?0:group.index*22+p.localIndex*12);
      }
      Object.assign(l,{tx:p.x,ty:p.y,source:p.source,group:p.group,depth:p.depth,index:p.index,localIndex:p.localIndex,route:p.route,dir:p.dir,custom:p.custom,retiring:false,lifeTarget:1});
      l.g.style.pointerEvents='';l.g.setAttribute('tabindex','0');
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
      if(/^data:image\/(png|jpeg|webp);base64,/.test(p.iconDataURL||''))this.make('image',{x:-8,y:-8,width:16,height:16,href:p.iconDataURL},g);
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
    const key=[this.selected,this.selectedLeaf,this.context.group,this.context.page,Math.round(level*10),this.leaves.size,this.nodes.size,detail].join('|');if(key===this.lastSelectionKey)return;this.lastSelectionKey=key;
    this.el.dataset.context=this.context.kind;
    for(const n of this.nodes.values()){const active=n.id===this.selected;n.g.classList.toggle('selected',active);n.g.classList.toggle('subdued',!!this.selected&&!active);n.edge.classList.toggle('selected',active);n.edge.classList.toggle('subdued',!!this.selected&&!active);n.flow.classList.toggle('flow-visible',active||!this.selected);n.g.setAttribute('aria-pressed',String(active))}
    for(const g of this.groups.values()){
      const active=g.id===this.context.group,member=g.parent===this.selected,dim=!!this.selected&&!member||!!this.context.group&&!active;
      g.g.classList.toggle('selected',active);g.g.classList.toggle('member',member);g.g.classList.toggle('subdued',dim);g.edge.classList.toggle('subdued',dim);g.edge.style.visibility=active?'hidden':'';g.g.setAttribute('aria-pressed',String(active));
    }
    for(const l of this.leaves.values()){const member=l.parent===this.selected,dim=!!this.selected&&!member||!!this.context.group&&l.group!==this.context.group;l.g.classList.toggle('selected',l.id===this.selectedLeaf);l.g.classList.toggle('subdued',dim);l.edge.classList.toggle('selected',l.id===this.selectedLeaf);l.edge.classList.toggle('member',member);l.g.setAttribute('aria-pressed',String(l.id===this.selectedLeaf))}
    this.renderContext();
  }
  renderContext(){
    const nav=this.el.querySelector('.atlas-context');nav.hidden=!this.selected;
    const crumbs=nav.querySelector('.atlas-breadcrumb');crumbs.replaceChildren();
    const add=(label,action,current=false)=>{const b=document.createElement('button');b.textContent=label;if(current)b.setAttribute('aria-current','page');else b.onclick=action;crumbs.append(b)};
    add('Universo',()=>this.select(null));
    if(this.selected)add(this.nodes.get(this.selected)?.name||this.selected,()=>this.focus(this.selected),!this.context.group);
    const group=this.groups.get(this.context.group);
    if(group)add(group.name,()=>this.focusGroup(group.id),!this.selectedLeaf);
    if(this.selectedLeaf)add(this.selectedLeaf.split('/').at(-2).replace(/-/g,' '),null,true);
    const page=nav.querySelector('.atlas-page');page.hidden=!group||group.skills.length<=50||!!this.selectedLeaf;
    if(group){const total=Math.ceil(group.skills.length/50);page.querySelector('span').textContent=`${this.context.page+1} / ${total}`;page.querySelector('[data-map-page="-1"]').disabled=this.context.page===0;page.querySelector('[data-map-page="1"]').disabled=this.context.page>=total-1}
  }
  edgePath(x1,y1,x2,y2,bend=.035){const dx=x2-x1,dy=y2-y1;return `M${x1} ${y1} C${x1+dx*.34-dy*bend} ${y1+dy*.34+dx*bend},${x1+dx*.72-dy*bend*.5} ${y1+dy*.72+dx*bend*.5},${x2} ${y2}`}
  draw(){
    if(this.disposed)return;const started=performance.now(),{x,y,k}=this.camera;
    this.world.setAttribute('transform',`translate(${x} ${y}) scale(${k})`);
    for(const n of this.nodes.values())if(n._x!==n.x||n._y!==n.y){n.g.setAttribute('transform',`translate(${n.x} ${n.y})`);const d=this.edgePath(0,0,n.x,n.y);n.edge.setAttribute('d',d);n.flow.setAttribute('d',d);n._x=n.x;n._y=n.y}
    for(const group of this.groups.values()){
      const parent=this.nodes.get(group.parent);
      if(group._x!==group.x||group._y!==group.y||group._px!==parent.x||group._py!==parent.y){
        group.g.setAttribute('transform',`translate(${group.x} ${group.y})`);group.edge.setAttribute('d',this.edgePath(parent.x,parent.y,group.x,group.y,.035));
        group._x=group.x;group._y=group.y;group._px=parent.x;group._py=parent.y;
      }
      const routed=[...this.leaves.values()].filter(l=>l.group===group.id&&l.route&&!l.retiring);
      if(routed.length){
        const columns=new Map();for(const l of routed){const col=l.route.column;if(!columns.has(col))columns.set(col,[]);columns.get(col).push(l)}
        const top=Math.min(...routed.map(l=>l.y))-40,left=Math.min(...routed.map(l=>l.x))-65,right=Math.max(...routed.map(l=>l.x))-34;
        let d=`M${group.x} ${group.y} C${left} ${group.y},${left} ${top},${left+18} ${top} L${right} ${top}`;
        for(const members of columns.values()){const x=members[0].x-34,bottom=Math.max(...members.map(l=>l.y));d+=` M${x} ${top} L${x} ${bottom}`}
        group.bus.setAttribute('d',d);group.busOpacity=Math.min(...routed.map(l=>l.life??1))*.48;group.bus.style.opacity=String(group.busOpacity*OracleMotion.revealAt(this.getFormation().progress,'group',parent.index,group.index,this.nodes.size));
      }else {group.busOpacity=0;group.bus.style.opacity='0';}
      if(k!==this.lastLabelK){group.label.style.fontSize=`${10/k}px`;group.label.setAttribute('y',-14/k)}
    }
    for(const l of this.leaves.values()){
      l.g.style.setProperty('--leaf-life',l.life??1);
      const parent=l.route&&!l.retiring?{x:l.x-l.route.offset,y:l.y}:this.groups.get(l.group)||this.nodes.get(l.parent);
      if(l._x!==l.x||l._y!==l.y||l._px!==parent.x||l._py!==parent.y){l.g.setAttribute('transform',`translate(${l.x} ${l.y})`);l.edge.setAttribute('d',this.edgePath(parent.x,parent.y,l.x,l.y,.035));l._x=l.x;l._y=l.y;l._px=parent.x;l._py=parent.y}
      if(k!==this.lastLabelK){l.g.querySelector('.skill-glyph').setAttribute('transform',`scale(${1/k})`);l.label.style.fontSize=`${11/k}px`;l.label.setAttribute('x',l.dir*9/k);l.label.setAttribute('y',3/k)}
    }
    if(k!==this.lastLabelK||this.geometryMoving||this.drag)this.layoutTargets();
    this.lastLabelK=k;if(this.lastZoom!==k){this.cb.onZoom?.((this.contextTravelling?this.target.k:k)/this.baseScale);this.lastZoom=k}
    this.selection();this.layoutLabels();this.universe?.sync(this);this.updateCosts.push(performance.now()-started);if(this.updateCosts.length>180)this.updateCosts.shift();
  }
  layoutTargets(){
    // Dense overview targets must not cover a neighbouring point's centre.
    // Context zoom grows the targets up to 24/28 px; keyboard targets stay available.
    const k=this.camera.k,size=28/k,cells=new Map();
    const points=[...this.groups.values(),...[...this.leaves.values()].filter(l=>!l.retiring)];
    for(const p of points){const key=`${Math.floor(p.x/size)},${Math.floor(p.y/size)}`;if(!cells.has(key))cells.set(key,[]);cells.get(key).push(p)}
    for(const p of points){const cx=Math.floor(p.x/size),cy=Math.floor(p.y/size);let radius=(p.group?12:14)/k;
      for(let x=cx-1;x<=cx+1;x++)for(let y=cy-1;y<=cy+1;y++)for(const other of cells.get(`${x},${y}`)||[])if(other!==p)radius=Math.min(radius,Math.hypot(p.x-other.x,p.y-other.y)*.46);
      p.hit.setAttribute('r',Math.max(.5/k,radius));
    }
  }
  layoutLabels(){
    const {x,y,k}=this.camera,level=k/this.baseScale,detail=Number(this.data?.detail??3),boxes=[];
    const candidates=[...this.leaves.values()].sort((a,b)=>Number(b.id===this.selectedLeaf)-Number(a.id===this.selectedLeaf)||(a.localIndex||0)-(b.localIndex||0)||a.index-b.index);
    let count=0;
    for(const l of candidates){
      const limit=l.route?Math.max(9,Math.min(34,Math.floor((205*k-29)/5.7))):34;
      const label=l.name.length>limit?l.name.slice(0,limit-1)+'…':l.name;
      if(l.label.textContent!==label)l.label.textContent=label;
      const eligible=!l.retiring&&(l.id===this.selectedLeaf||detail>0&&(this.context.group?l.group===this.context.group:l.parent===this.selected||level>1.35)&&count<(this.context.group?detail*18:detail*3));
      const sx=x+l.x*k,sy=y+l.y*k,width=Math.min(190,l.label.textContent.length*5.7),height=16;
      let dir=l.dir;if(sx+9+width>this.width-8)dir=-1;if(sx-9-width<8)dir=1;
      const box={left:dir===1?sx+9:sx-9-width,right:dir===1?sx+9+width:sx-9,top:sy-height/2,bottom:sy+height/2};
      const obstructsNode=this.context.group&&[...this.leaves.values()].some(other=>other!==l&&!other.retiring&&other.group===this.context.group&&x+other.x*k+10>box.left&&x+other.x*k-10<box.right&&y+other.y*k+10>box.top&&y+other.y*k-10<box.bottom);
      const fits=eligible&&!obstructsNode&&box.left>=8&&box.right<=this.width-8&&box.top>=24&&box.bottom<=this.height-8&&!boxes.some(b=>box.left<b.right+6&&box.right>b.left-6&&box.top<b.bottom+3&&box.bottom>b.top-3);
      l.label.setAttribute('text-anchor',dir===1?'start':'end');l.label.setAttribute('x',dir*9/k);l.g.classList.toggle('label-visible',fits);
      if(fits){boxes.push(box);count++}
    }
  }
  invalidate(){if(this.disposed||this.frame||document.hidden||window.oracleWindowVisible===false||this.data?.hidden)return;this.frame=requestAnimationFrame(now=>this.tick(now))}
  tick(now=performance.now()){
    const interval=now-(this.lastTick||now-16.67),delta=Math.min(50,interval);if(this.lastTick){this.interactionFrames.push(interval);if(this.interactionFrames.length>180)this.interactionFrames.shift()}this.lastTick=now;this.frame=0;
    const t=this.reduced?1:1-Math.exp(-delta/95);let moving=false;
    for(const key of ['x','y','k']){const d=this.target[key]-this.camera[key];if(Math.abs(d)>(key==='k'?.00001:.02)){this.camera[key]+=d*t;moving=true}else this.camera[key]=this.target[key]}
    if(this.geometryMoving){let geometryMoving=false;for(const p of [...this.nodes.values(),...this.groups.values(),...this.leaves.values()]){if(this.drag?.node===p)continue;if(!this.reduced&&p.arriveAt>now){geometryMoving=true;continue}if(p.life!==undefined){p.life=this.reduced?p.lifeTarget:p.life+(p.lifeTarget-p.life)*(1-Math.exp(-delta/95));if(Math.abs(p.lifeTarget-p.life)>.01)geometryMoving=true;else p.life=p.lifeTarget;if(!p.life&&p.retiring){p.g.remove();p.edge.remove();this.leaves.delete(p.id);continue}}for(const axis of ['x','y']){const d=p['t'+axis]-p[axis];if(Number.isFinite(d)&&Math.abs(d)>.04){p[axis]+=d*(this.reduced?1:1-Math.exp(-delta/130));geometryMoving=true}else if(Number.isFinite(d))p[axis]=p['t'+axis]}}this.geometryMoving=geometryMoving;moving||=geometryMoving}
    if(((this.contextTravelling?this.target.k:this.camera.k)/this.baseScale>.500001)!==this.leafLevel)this.buildLeaves();
    this.draw();if(moving||this.geometryMoving)this.invalidate();else {this.lastTick=0;this.contextTravelling=false;}
  }
  pointerWorld(clientX,clientY){const r=this.el.getBoundingClientRect();return{x:(clientX-r.left-this.camera.x)/this.camera.k,y:(clientY-r.top-this.camera.y)/this.camera.k}}
  zoomAt(factor,clientX,clientY){
    const r=this.el.getBoundingClientRect(),sx=clientX===undefined?this.viewCenter().x:clientX-r.left,sy=clientY===undefined?this.viewCenter().y:clientY-r.top;
    this.contextTravelling=false;this.autoFit=false;const next=Math.min(this.baseScale*4,Math.max(this.baseScale*.2,this.target.k*factor)),wx=(sx-this.target.x)/this.target.k,wy=(sy-this.target.y)/this.target.k;
    this.target={x:sx-wx*next,y:sy-wy*next,k:next};this.invalidate();
  }
  fit(){
    this.autoFit=true;this.contextTravelling=true;
    this.target=this.fittedCamera();
    this.baseScale=this.target.k;this.lastZoom=null;this.invalidate();
  }
  remember(){
    this.history.push({selected:this.selected,leaf:this.selectedLeaf,context:{...this.context},camera:{...this.target},base:this.baseScale,width:this.width,height:this.height,center:this.viewCenter(),autoFit:this.autoFit});
    if(this.history.length>32)this.history.shift();
  }
  back(){
    this.finishFormationForInput();let prior=this.history.pop();while(prior&&prior.selected&&!(this.data.collections||[]).some(c=>c.id===prior.selected))prior=this.history.pop();
    if(!prior){if(this.selected)this.select(null);else this.fit();return}
    this.selected=prior.selected;this.selectedLeaf=prior.leaf;this.context={...prior.context};
    this.data.selected=this.selected;this.data.selectedLeaf=this.selectedLeaf;
    this.relayout();this.baseScale=this.fittedScale();
    const center={x:((prior.center?.x??(prior.width||this.width)/2)-prior.camera.x)/prior.camera.k,y:((prior.center?.y??(prior.height||this.height)/2)-prior.camera.y)/prior.camera.k},k=this.baseScale*prior.camera.k/prior.base;
    this.target={x:this.viewCenter().x-center.x*k,y:this.viewCenter().y-center.y*k,k};this.autoFit=prior.autoFit;
    this.lastSelectionKey=null;this.selection();this.invalidate();this.cb.onSelect?.(this.selected,this.selectedLeaf);
  }
  navigate(category,group=null,leaf=null,page=0,keyboard=false){
    this.finishFormationForInput();
    const kind=leaf?'skill':group?'group':category?'specialist':'global';
    if(this.selected===category&&this.context.group===group&&this.selectedLeaf===leaf&&this.context.page===page){this.fit();return}
    this.remember();const level=this.target.k/this.baseScale;
    this.selected=category;this.selectedLeaf=leaf;this.context={kind,group,page};this.contextTravelling=true;
    if(this.data){this.data.selected=category;this.data.selectedLeaf=leaf}
    this.topologyKey=null;this.relayout();this.fit();
    if(level<=.500001){this.zoomAt(level);this.autoFit=false}
    if(leaf){const p=this.geometry.leaves.find(l=>l.id===leaf);if(p){const k=this.baseScale*1.35;this.target={x:this.viewCenter().x-p.x*k,y:this.viewCenter().y-p.y*k,k};this.autoFit=false}}
    this.lastSelectionKey=null;this.selection();this.invalidate();this.cb.onSelect?.(category,leaf,keyboard);
  }
  focus(id){if(this.nodes.has(id))this.navigate(id)}
  focusGroup(id){const group=this.groups.get(id);if(group)this.navigate(group.parent,id)}
  pageGroup(delta){const group=this.groups.get(this.context.group);if(!group)return;const page=Math.max(0,Math.min(Math.ceil(group.skills.length/50)-1,this.context.page+delta));if(page!==this.context.page)this.navigate(group.parent,group.id,null,page)}
  select(category,leaf=null,keyboard=false){
    const group=leaf?this.geometry.groups.find(g=>g.skills.some(s=>s.path===leaf)):null;
    const index=group?.skills.findIndex(s=>s.path===leaf)||0;
    this.navigate(category,group?.id||null,leaf,Math.floor(index/50),keyboard);
  }
  restoreLayout(layout){this.layout=structuredClone(layout||{nodes:{},leaves:{}});this.topologyKey=null;this.relayout();this.fit()}
  reset(){this.restoreLayout({nodes:{},leaves:{}});this.persistSoon()}
  translateNode(node,dx,dy,category){
    const x=Math.max(-1500,Math.min(1500,node.x+dx)),y=Math.max(-1500,Math.min(1500,node.y+dy));dx=x-node.x;dy=y-node.y;node.x=node.tx=x;node.y=node.ty=y;
    if(category){for(const g of this.groups.values())if(g.parent===category){g.x+=dx;g.y+=dy;g.tx=g.x;g.ty=g.y}for(const l of this.leaves.values())if(l.parent===category&&!l.custom){l.x+=dx;l.y+=dy;l.tx=l.x;l.ty=l.y}}else node.custom=true;
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
    const targetState=element=>({category:element?.closest?.('[data-category]')?.dataset.category,skill:element?.closest?.('[data-skill]')?.dataset.skill,group:element?.closest?.('[data-group]')?.dataset.group,core:!!element?.closest?.('[data-core]')});
    this.listen(this.el,'pointerover',e=>{if(!this.drag){this.hovered=targetState(e.target);this.universe?.sync(this)}});
    this.listen(this.el,'pointerleave',()=>{this.hovered=null;this.universe?.sync(this)});
    this.listen(this.el,'focusin',e=>{this.finishFormationForInput();this.keyboardFocus=targetState(e.target);this.universe?.sync(this)});
    this.listen(this.el,'focusout',e=>{this.keyboardFocus=targetState(e.relatedTarget);this.universe?.sync(this)});
    this.listen(this.el,'gesturestart',e=>{e.preventDefault();this.gestureScale=this.target.k});this.listen(this.el,'gesturechange',e=>{e.preventDefault();if(this.gestureScale)this.zoomAt((this.gestureScale*e.scale)/this.target.k,e.clientX,e.clientY)});
    this.listen(this.el,'wheel',e=>{if(e.target.closest('.atlas-context'))return;e.preventDefault();if(e.ctrlKey||e.metaKey)this.zoomAt(Math.exp(-Math.max(-160,Math.min(160,e.deltaY))*.006),e.clientX,e.clientY);else{this.autoFit=false;this.target.x-=e.deltaX;this.target.y-=e.deltaY;this.invalidate()}},{passive:false});
    this.listen(this.el,'pointerdown',e=>{if(e.target.closest('.atlas-context'))return;this.finishFormationForInput();if(e.button!==0||this.drag)return;const category=e.target.closest('[data-category]')?.dataset.category,skill=e.target.closest('[data-skill]')?.dataset.skill;if(e.target.closest('[data-core],[data-orbit-plugin],[data-connector],[data-group]'))return;const node=this.data?.replay||!e.altKey?null:skill?this.leaves.get(skill):category?this.nodes.get(category):null;this.camera={...this.target};this.drag={id:e.pointerId,sx:e.clientX,sy:e.clientY,start:this.pointerWorld(e.clientX,e.clientY),camera:{...this.camera},node,category,skill,moved:false,ox:node?.x,oy:node?.y};e.preventDefault();e.target.closest('[tabindex]')?.focus({preventScroll:true})});
    this.listen(this.el,'pointermove',e=>{const d=this.drag;if(!d||e.pointerId!==d.id)return;const dx=e.clientX-d.sx,dy=e.clientY-d.sy;if(!d.moved&&Math.hypot(dx,dy)<4)return;if(!d.moved){d.moved=true;this.el.setPointerCapture(e.pointerId)}this.el.classList.add('dragging');if(d.node){this.translateNode(d.node,d.ox+dx/this.camera.k-d.node.x,d.oy+dy/this.camera.k-d.node.y,d.category);this.invalidate()}else{this.autoFit=false;this.target={x:d.camera.x+dx,y:d.camera.y+dy,k:this.camera.k};this.camera={...this.target};this.invalidate()}});
    const finish=e=>{const d=this.drag;if(!d||e.pointerId!==d.id)return;this.drag=null;this.el.classList.remove('dragging');this.universe?.sync(this);if(this.el.hasPointerCapture(e.pointerId))this.el.releasePointerCapture(e.pointerId);if(d.moved){if(d.node){const group=d.skill?'leaves':'nodes';this.layout[group][d.skill||d.category]={x:d.node.x,y:d.node.y};this.persistSoon()}this.suppressClick=true;this.lastDragAt=performance.now();setTimeout(()=>this.suppressClick=false,0)}else if(d.skill)this.select(this.leaves.get(d.skill)?.parent,d.skill);else if(d.category)this.select(d.category);else if(this.selectedLeaf)this.back()};
    this.listen(this.el,'pointerup',finish);this.listen(this.el,'pointercancel',e=>{if(this.drag?.id===e.pointerId){this.drag=null;this.el.classList.remove('dragging');if(this.el.hasPointerCapture(e.pointerId))this.el.releasePointerCapture(e.pointerId);this.universe?.sync(this)}});
    this.listen(this.el,'dblclick',e=>{if(this.suppressClick||performance.now()-(this.lastDragAt||0)<350)return;const cat=e.target.closest('[data-category]')?.dataset.category,skill=e.target.closest('[data-skill]')?.dataset.skill;if(cat)this.focus(cat);else if(skill)this.cb.onOpen?.(skill);else this.fit()});
    this.listen(this.el.querySelector('[data-core]'),'click',()=>this.select(null));
    this.listen(this.el,'click',e=>{if(e.target.closest('[data-map-back]')){this.back();return}const paging=e.target.closest('[data-map-page]');if(paging){this.pageGroup(Number(paging.dataset.mapPage));return}const group=e.target.closest('[data-group]')?.dataset.group;if(group){this.focusGroup(group);return}const connector=e.target.closest('[data-connector]')?.dataset.connector;if(connector){e.stopPropagation();this.cb.onConnector?.(connector);return}const id=e.target.closest('[data-orbit-plugin]')?.dataset.orbitPlugin;if(id){e.stopPropagation();this.cb.onPlugin?.(id)}});
    this.listen(this.el,'keydown',e=>{if(e.target.closest('.atlas-context'))return;const group=e.target.closest('[data-group]')?.dataset.group;if(group&&['Enter',' '].includes(e.key)){e.preventDefault();this.focusGroup(group);return}const connector=e.target.closest('[data-connector]')?.dataset.connector;if(connector&&['Enter',' '].includes(e.key)){e.preventDefault();this.cb.onConnector?.(connector);return}const plugin=e.target.closest('[data-orbit-plugin]')?.dataset.orbitPlugin;if(plugin&&['Enter',' '].includes(e.key)){e.preventDefault();this.cb.onPlugin?.(plugin);return}const cat=e.target.closest('[data-category]')?.dataset.category,skill=e.target.closest('[data-skill]')?.dataset.skill;const node=skill?this.leaves.get(skill):cat?this.nodes.get(cat):null;
      if(e.key==='Escape'){e.preventDefault();e.stopPropagation();this.back();return}if(e.key==='+'||e.key==='='){e.preventDefault();this.zoomAt(1.2);return}if(e.key==='-'){e.preventDefault();this.zoomAt(1/1.2);return}if(e.key==='0'){e.preventDefault();this.fit();return}
      if(node&&e.altKey&&!this.data?.replay&&['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)){e.preventDefault();const delta=e.shiftKey?25:8;this.translateNode(node,e.key==='ArrowLeft'?-delta:e.key==='ArrowRight'?delta:0,e.key==='ArrowUp'?-delta:e.key==='ArrowDown'?delta:0,cat);this.layout[skill?'leaves':'nodes'][skill||cat]={x:node.x,y:node.y};this.draw();this.persistSoon();return}
      if(!e.altKey&&['ArrowLeft','ArrowRight'].includes(e.key)&&this.selected){e.preventDefault();const ids=[...this.nodes.keys()],index=ids.indexOf(this.selected);this.focus(ids[(index+(e.key==='ArrowLeft'?-1:1)+ids.length)%ids.length]);return}if(e.key==='Enter'&&e.target.closest('[data-core]')){e.preventDefault();this.select(null);return}
      if(e.key==='Enter'&&node){e.preventDefault();this.select(skill?node.parent:cat,skill,true)}if(e.key===' '){e.preventDefault();if(skill)this.cb.onOpen?.(skill);else if(cat)this.focus(cat);else this.fit()}
    });
  }
  dispose(){if(this.disposed)return;this.disposed=true;this.abort.abort();this.observer.disconnect();cancelAnimationFrame(this.frame);clearTimeout(this.saveTimer);clearTimeout(this.eventTimer);this.frame=0;this.universe?.dispose();this.nodes.clear();this.groups.clear();this.leaves.clear();this.el.replaceChildren()}
}
window.OracleAtlas=OracleAtlas;
