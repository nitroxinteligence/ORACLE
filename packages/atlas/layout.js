/** Deterministic geometry over the actual catalog. Never synthesizes documents. */
export const identities = {
  ads: { angle: -140, color: '#dba17c' }, code: { angle: -43, color: '#91b5ed' },
  contents: { angle: 3, color: '#7bc8b4' }, 'customer-finder': { angle: -184, color: '#d9c276' },
  'cyber-security': { angle: 139, color: '#b29bd7' }, marketing: { angle: 43, color: '#92c399' },
  'personal-branding': { angle: 92, color: '#d49cae' },
};
export function hash(value) { let n=2166136261; for(const c of value) n=Math.imul(n^c.charCodeAt(0),16777619);return n>>>0; }
export function identity(id) {
  if(Object.prototype.hasOwnProperty.call(identities,id))return identities[id];
  const hue=hash(id)%360,s=.38,l=.64,a=s*Math.min(l,1-l);
  const f=n=>{const k=(n+hue/30)%12;return Math.round(255*(l-a*Math.max(-1,Math.min(k-3,9-k,1)))).toString(16).padStart(2,'0')};
  return {angle:hash(id)%360,color:`#${f(0)}${f(8)}${f(4)}`};
}
export function visibleCount(total, selected, detail=3, zoom=1) {
  if(zoom<=.500001)return 0;
  const extra=Math.max(0,Math.min(6,Number(detail)||0)-3);
  return Math.min(total,(selected?50:10)+extra*(selected?12:4));
}
// These are alphabetical browsing ranges, not subject areas or prerequisites.
const alphabet = ['A–C', 'D–F', 'G–I', 'J–L', 'M–O', 'P–R', 'S–U', 'V–Z', '#'];
export function skillName(entry) { return entry.path.split('/').at(-2).replace(/-/g, ' '); }
export function catalogGroups(collection, entries) {
  const root = `SISTEMA/skills/${collection}/`, groups = new Map();
  for (const entry of entries) {
    if (entry.directory || entry.name !== 'SKILL.md' || !entry.path.startsWith(root)) continue;
    const parts = entry.path.slice(root.length).split('/');
    const folder = parts.slice(0, -2).join('/');
    const semanticFolder = folder && parts.at(-3) !== 'skills';
    const first = skillName(entry).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase().charCodeAt(0);
    const band = first >= 65 && first <= 90 ? Math.min(7, Math.floor((first - 65) / 3)) : 8;
    const key = semanticFolder ? `folder:${folder}` : `alphabet:${band}`;
    if (!groups.has(key)) groups.set(key, { id: `${collection}/${key}`, parent: collection,
      name: semanticFolder ? folder : alphabet[band], kind: semanticFolder ? 'folder' : 'alphabet',
      originPath: semanticFolder ? root + folder : root.slice(0, -1), skills: [] });
    groups.get(key).skills.push(entry);
  }
  const ordered=[...groups.values()].sort((a,b)=>a.id.localeCompare(b.id)),seen=new Map();
  return ordered.map(group=>{const total=ordered.filter(g=>g.name===group.name).length,index=(seen.get(group.name)||0)+1;seen.set(group.name,index);return {...group,name:total>1?`${group.name} · ${index}`:group.name,skills:group.skills.sort((a,b)=>a.path.localeCompare(b.path))}});
}
// Round-robin samples represent every nonempty range before adding a second leaf.
// Every point is an actual file and all remaining members can be paged in group view.
export function sampleGroups(groups, limit, focus = null, page = 0, pageSize = 50, selectedLeaf = null) {
  const chosen = new Map(groups.map(g => [g.id, []]));
  let count = 0;
  for (let row = 0; count < limit; row++) {
    let added = false;
    for (const g of groups) if (count < limit && row < g.skills.length) {
      chosen.get(g.id).push(g.skills[row]); count++; added = true;
    }
    if (!added) break;
  }
  const group = groups.find(g => g.id === focus);
  if (group) { const start=Math.min(page * pageSize,Math.max(0,group.skills.length-pageSize)); chosen.set(group.id, group.skills.slice(start,start+pageSize)); }
  if (selectedLeaf) {
    const owner = groups.find(g => g.skills.some(s => s.path === selectedLeaf));
    if (owner && !chosen.get(owner.id).some(s => s.path === selectedLeaf))
      chosen.get(owner.id).push(owner.skills.find(s => s.path === selectedLeaf));
  }
  return chosen;
}
export function boundsOf(points, padding = 30) {
  if (!points.length) points = [{ x: 0, y: 0 }];
  return { minX: Math.min(...points.map(p => p.x)) - padding, maxX: Math.max(...points.map(p => p.x)) + padding,
    minY: Math.min(...points.map(p => p.y)) - padding, maxY: Math.max(...points.map(p => p.y)) + padding };
}
export function fitCamera(bounds, width, height, top = 48, padding = 18, maximum = Infinity) {
  const k = Math.max(.025, Math.min(maximum, (width - padding * 2) / Math.max(1, bounds.maxX - bounds.minX),
    (height - top - padding * 2) / Math.max(1, bounds.maxY - bounds.minY)));
  return { x: width / 2 - (bounds.minX + bounds.maxX) * k / 2,
    y: (height + top) / 2 - (bounds.minY + bounds.maxY) * k / 2, k };
}
// Saved drag positions are hints. Keep specialist roots and their constellations
// apart in the rendered geometry so a crowded or older layout can recover
// without rewriting the user's saved coordinates.
export function separateSpecialists(nodes, coreRadius = 250, minimum = 168) {
  for(let pass=0;pass<24;pass++){
    let changed=false;
    for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){
      const a=nodes[i],b=nodes[j],dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy);
      if(d>=minimum)continue;
      const angle=d>.001?Math.atan2(dy,dx):(hash(a.id+'|'+b.id)%6283)/1000;
      const push=(minimum-d)/2+.05,px=Math.cos(angle)*push,py=Math.sin(angle)*push;
      a.x-=px;a.y-=py;b.x+=px;b.y+=py;changed=true;
    }
    for(const node of nodes){
      const distance=Math.hypot(node.x,node.y);
      if(distance>=coreRadius)continue;
      const angle=distance>.001?Math.atan2(node.y,node.x):identity(node.id).angle*Math.PI/180;
      node.x=Math.cos(angle)*coreRadius;node.y=Math.sin(angle)*coreRadius;changed=true;
    }
    if(!changed)break;
  }
  for(const node of nodes)node.angle=Math.atan2(node.y,node.x);
  return nodes;
}
// A specialist is a separate constellation: its root stays at the origin and
// at most 50 actual files surround it; the complete catalog stays in navigation.
function specialistPlan(collection, entries, context) {
  const catalog = catalogGroups(collection.id, entries);
  const root = {...collection, x:0, y:0, angle:-Math.PI/2, color:identity(collection.id).color,
    skills:catalog.flatMap(g=>g.skills), groups:catalog};
  const candidates = context.group ? catalog.filter(g=>g.id===context.group) : catalog;
  const all=context.group?candidates.flatMap(g=>g.skills):(collection.skills||root.skills).slice().sort((a,b)=>a.path<b.path?-1:a.path>b.path?1:0);
  const pages=Math.max(1,Math.ceil(all.length/50));
  const page=Math.min(pages-1,Math.max(0,Number.isFinite(Number(context.page))?Math.floor(Number(context.page)):0));
  // Hierarchical navigation pages the complete specialist, not a repeated sample
  // from each alphabetical range. Keep legacy sampling for archived callers.
  const paths=new Set(all.slice(page*50,(page+1)*50).map(e=>e.path));
  const chosen=context.fullCatalog?new Map(candidates.map(g=>[g.id,g.skills.filter(e=>paths.has(e.path))])):sampleGroups(candidates,50,context.group,context.page||0,50);
  if(context.leaf&&!Array.from(chosen.values()).flat().some(e=>e.path===context.leaf)){
    const owner=candidates.find(g=>g.skills.some(e=>e.path===context.leaf));
    if(owner){const rows=Array.from(chosen.values());if(rows.flat().length>=50)rows.findLast(items=>items.length)?.pop();chosen.get(owner.id).push(owner.skills.find(e=>e.path===context.leaf));}
  }
  const visible=candidates.filter(g=>chosen.get(g.id).length);
  const groups=[], leaves=[], tau=Math.PI*2;
  // Equal sectors prevent a large group wrapping behind the root and crossing it.
  const radius=Math.max(180,visible.length*27);
  let cursor=-Math.PI/2;
  for(const [gi,g] of visible.entries()) {
    const members=chosen.get(g.id);
    const share=tau/Math.max(1,visible.length), angle=cursor+share/2;
    const rootMembership=visible.length===1;
    const group={...g,x:rootMembership?0:Math.cos(angle)*radius,y:rootMembership?0:Math.sin(angle)*radius,rootMembership,angle,index:gi,
      focused:g.id===context.group,source:root.id,visibleCount:members.length};
    groups.push(group);
    let slot=0,ring=0,radial=radius+120;
    for(const [i,entry] of members.entries()) {
      const capacity=Math.max(1,Math.floor(radial*Math.max(.08,share-.12)/65));
      if(slot>=capacity){slot=0;ring++;radial+=85;}
      const ringCapacity=Math.max(1,Math.floor(radial*Math.max(.08,share-.12)/65));
      const remaining=members.length-i+slot,count=Math.min(ringCapacity,remaining);
      const a=angle+(slot-(count-1)/2)*(share-.12)/Math.max(1,count);
      leaves.push({id:entry.path,parent:root.id,group:g.id,source:g.id,x:Math.cos(a)*radial,y:Math.sin(a)*radial,
        custom:false,name:skillName(entry),index:leaves.length,localIndex:i,depth:2,route:null,angle:a,dir:Math.cos(a)>=0?1:-1});
      slot++;
    }
    cursor+=share;
  }
  const points=[root,...groups,...leaves];
  const extent=Math.max(220,...points.map(p=>Math.max(Math.abs(p.x),Math.abs(p.y))))+90;
  const bounds={minX:-extent,maxX:extent,minY:-extent,maxY:extent};
  return {nodes:[root],groups,leaves,bounds,focusBounds:bounds,dedicated:true,total:all.length,pages,page};
}

/**
 * Department -> discovered specialist -> actual file. Receives the complete
 * OracleDepartments catalog; it never turns manifest selectors into packages.
 * Overview deliberately has zero skill leaves and zero alphabetical groups.
 */
export function hierarchyPlan(catalog, route = {}, manual = {}, minimumRadius = 248) {
  const specialist=catalog.specialistByID.get(route.specialist);
  if(specialist){
    const geometry=specialistPlan(specialist,specialist.skills,{...route,fullCatalog:true});
    Object.assign(geometry.nodes[0],{kind:'specialist',department:specialist.department,parent:null,empty:specialist.empty,state:specialist.state});
    return {...geometry,hierarchy:true,route:{...route,page:geometry.page}};
  }
  const department=catalog.departmentByID.get(route.department),nodes=[],leaves=[];
  const point=(row,x,y,parent=null)=>({...row,x,y,angle:Math.atan2(y,x),parent,groups:row.groups||[]});
  const safeSaved=id=>{const p=manual.nodes?.[id];return p&&Number.isFinite(p.x)&&Number.isFinite(p.y)?p:null};
  if(!department){
    const departments=catalog.departments.filter(d=>!d.fallback||d.specialistCount||catalog.departments.length===1);
    const total=departments.reduce((sum,d)=>sum+Math.max(2,d.specialistCount),0);
    const radius=Math.max(300,minimumRadius,departments.length*85);let cursor=-Math.PI;
    for(const d of departments){
      const sector=Math.PI*2*Math.max(2,d.specialistCount)/Math.max(1,total),angle=cursor+sector/2;cursor+=sector;
      const saved=safeSaved(d.id),root=point(d,saved?.x??Math.cos(angle)*radius,saved?.y??Math.sin(angle)*radius);
      root.angle=angle;nodes.push(root);
      let offset=0,ring=0;
      while(offset<d.specialists.length){
        const r=radius+155+ring*135,span=Math.min(Math.PI*1.5,sector*.84),capacity=Math.max(1,Math.floor(r*span/125));
        const count=Math.min(capacity,d.specialists.length-offset);
        for(let i=0;i<count;i++){
          const s=d.specialists[offset+i],a=angle+(i-(count-1)/2)*span/count,saved=safeSaved(s.id);
          nodes.push(point(s,saved?.x??Math.cos(a)*r,saved?.y??Math.sin(a)*r,d.id));
        }
        offset+=count;ring++;
      }
    }
    separateSpecialists(nodes,Math.max(250,radius-20),112);
    const bounds=boundsOf([{x:-150,y:-150},{x:150,y:150},...nodes],70);
    return {nodes,groups:[],leaves:[],bounds,focusBounds:bounds,dedicated:false,hierarchy:true,
      route:{kind:'global',department:null,specialist:null,group:null,leaf:null,page:0},total:catalog.skillCount,pages:1,page:0};
  }
  const total=department.skills.length,pages=Math.max(1,Math.ceil(total/50));
  const page=Math.min(pages-1,Math.max(0,Number.isFinite(Number(route.page))?Math.floor(Number(route.page)):0));
  const rows=department.skills.slice(page*50,(page+1)*50),members=department.specialists;
  nodes.push(point(department,0,0));
  const radius=Math.max(260,members.length*70),tau=Math.PI*2;
  for(const [index,s] of members.entries()){
    const angle=-Math.PI/2+index*tau/Math.max(1,members.length),node=point(s,Math.cos(angle)*radius,Math.sin(angle)*radius,department.id);
    nodes.push(node);
    const files=rows.filter(e=>catalog.skillByPath.get(e.path)?.specialist===s.id),span=Math.min(1.7,tau/Math.max(1,members.length)*.84);
    let offset=0,ring=0;
    while(offset<files.length){
      const r=radius+145+ring*85,capacity=Math.max(1,Math.floor(r*span/70)),count=Math.min(capacity,files.length-offset);
      for(let i=0;i<count;i++){
        const entry=files[offset+i],a=angle+(i-(count-1)/2)*span/count;
        leaves.push({id:entry.path,parent:s.id,department:department.id,group:null,source:s.id,
          x:Math.cos(a)*r,y:Math.sin(a)*r,angle:a,dir:Math.cos(a)>=0?1:-1,name:skillName(entry),
          index:leaves.length,localIndex:offset+i,depth:2,route:null,custom:false});
      }
      offset+=count;ring++;
    }
  }
  const bounds=boundsOf(nodes.concat(leaves),90);
  return {nodes,groups:[],leaves,bounds,focusBounds:bounds,dedicated:true,hierarchy:true,
    route:{...route,page},department,total,pages,page};
}

export function plan(collections, entries, selected, detail = 3, manual = {}, minimumRadius = 248, context = {}) {
  const specialist=collections.find(c=>c.id===selected);
  if(specialist)return specialistPlan(specialist,entries,context);
  const sorted = [...collections].sort((a, b) => identity(a.id).angle - identity(b.id).angle || a.id.localeCompare(b.id));
  const known = sorted.every(c => Object.prototype.hasOwnProperty.call(identities,c.id)) && sorted.length <= 7;
  const radius = Math.max(270, sorted.length * 34, minimumRadius);
  const nodes = sorted.map((c, i) => {
    const angle = (known ? identity(c.id).angle : -140 + i * 360 / sorted.length) * Math.PI / 180;
    const groups = catalogGroups(c.id, entries), saved = manual.nodes?.[c.id];
    return { ...c, angle, color: identity(c.id).color, x: saved?.x ?? Math.cos(angle) * radius,
      y: saved?.y ?? Math.sin(angle) * radius, skills: groups.flatMap(g => g.skills), groups };
  });
  separateSpecialists(nodes,Math.max(250,radius-20),Math.max(168,radius*.5));
  const groups = [], leaves = [];
  for (const n of nodes) {
    const active = n.id === selected, limit = visibleCount(n.skills.length, active, detail, 1);
    const chosen = sampleGroups(n.groups, limit, active ? context.group : null, context.page || 0, 50, context.leaf);
    const nearby = nodes.filter(o => o !== n).map(o => Math.abs(Math.atan2(Math.sin(o.angle - n.angle), Math.cos(o.angle - n.angle))));
    const sector = Math.min(1.25, (nearby.length ? Math.min(...nearby) : 1.8) * .82);
    // Global groups share a compact silhouette. Focus opens a separate, legible fan.
    const span = active ? 3.45 : sector, count = n.groups.length;
    const weight=n.groups.reduce((sum,g)=>sum+Math.max(2,chosen.get(g.id).length),0);let cursor=-span/2;
    const groupRadius = active ? Math.max(235, count * 24) : radius + 102;
    n.groups.forEach((g, gi) => {
      const share=span*Math.max(2,chosen.get(g.id).length)/Math.max(1,weight);
      const fraction = count < 2 ? 0 : gi / (count - 1) - .5, angle = n.angle + (active?cursor+share/2:fraction*span);cursor+=share;
      const focused = g.id === context.group && active;
      let x = active ? n.x + Math.cos(angle) * groupRadius : n.x + Math.cos(angle) * groupRadius - Math.cos(n.angle) * radius;
      let y = active ? n.y + Math.sin(angle) * groupRadius : n.y + Math.sin(angle) * groupRadius - Math.sin(n.angle) * radius;
      const members = chosen.get(g.id);
      if(focused){
        const columns=Math.min(5,Math.max(1,Math.ceil(members.length/8))),width=175+(columns-1)*205+145;
        // The reading constellation stays outside the global galaxy. A fixed
        // left-to-right reading direction must not cross back through the SOL.
        x=n.x+Math.cos(n.angle)*1400-width/2;y=n.y+Math.sin(n.angle)*1400;
      }
      const group = { ...g, x, y, angle, index: gi, focused, source: n.id, visibleCount: chosen.get(g.id).length };
      groups.push(group);
      members.forEach((entry, i) => {
        let lx, ly;
        if (focused) {
          const columns = Math.min(5,Math.max(1,Math.ceil(members.length/8)));
          const rows = Math.ceil(members.length/columns), col = Math.floor(i/rows), row = i%rows;
          // Short lateral file branches off unlabelled routing spines. The spines
          // are drawing geometry only; every semantic edge still belongs to g.id.
          lx=x+175+col*205;ly=y+(row-(rows-1)/2)*66;
        } else if (active) {
          let slot=i,ring=0,radial=groupRadius+105;
          let capacity=Math.max(1,Math.floor(radial*Math.max(.12,share-.06)/43));
          while(slot>=capacity){slot-=capacity;ring++;radial+=56;capacity=Math.max(1,Math.floor(radial*Math.max(.12,share-.06)/43))}
          const consumed=i-slot,actual=Math.min(capacity,members.length-consumed);
          const offset=(slot-(actual-1)/2)*Math.min(43/radial,(share-.06)/Math.max(1,actual));
          const leafAngle=angle+offset;
          lx=n.x+Math.cos(leafAngle)*radial;ly=n.y+Math.sin(leafAngle)*radial;
        } else {
          // The leaf fan belongs to this specialist's angular sector. Letting a
          // fan grow wider than its sector made neighbouring specialists share
          // the same visual space even when their roots were well separated.
          const gap=Math.max(17,Math.min(22,(radius+150)*sector*.82/Math.max(1,members.length-1)));
          const tangent=(i-(members.length-1)/2)*gap,distance=50+(i%2)*14;
          lx=x+Math.cos(angle)*distance-Math.sin(angle)*tangent;
          ly=y+Math.sin(angle)*distance+Math.cos(angle)*tangent;
        }
        const saved = manual.leaves?.[entry.path];
        leaves.push({ id: entry.path, parent: n.id, group: g.id, source: g.id,
          x: saved?.x ?? lx, y: saved?.y ?? ly, custom: !!saved, name: skillName(entry),
          index: leaves.filter(l => l.parent === n.id).length, localIndex: i, depth: 2,
          route: focused ? {column:Math.floor(i/Math.ceil(members.length/Math.min(5,Math.max(1,Math.ceil(members.length/8))))),offset:34} : null,
          angle, dir: focused ? 1 : Math.cos(n.angle) >= 0 ? 1 : -1 });
      });
    });
  }
  // Rare intersections with the dimmed context are resolved only in view geometry.
  // A spatial grid keeps catalog growth from turning this into an all-pairs solver.
  for(let pass=0;pass<4;pass++){
    const cells=new Map(),size=19;
    const ordered=[...leaves].sort((a,b)=>Number(b.parent===selected)-Number(a.parent===selected)||a.id.localeCompare(b.id));
    for(const leaf of ordered){
      if(!leaf.custom)for(let step=0;step<3;step++){
        const cx=Math.floor(leaf.x/size),cy=Math.floor(leaf.y/size);let moved=false;
        for(let ix=cx-1;ix<=cx+1;ix++)for(let iy=cy-1;iy<=cy+1;iy++)for(const other of cells.get(`${ix},${iy}`)||[]){
          if(other.parent===leaf.parent)continue;
          const dx=leaf.x-other.x,dy=leaf.y-other.y,d=Math.hypot(dx,dy);
          if(d<size){const angle=d>.001?Math.atan2(dy,dx):hash(leaf.id)*.001;leaf.x+=Math.cos(angle)*(size-d+.1);leaf.y+=Math.sin(angle)*(size-d+.1);moved=true}
        }
        if(!moved)break;
      }
      const key=`${Math.floor(leaf.x/size)},${Math.floor(leaf.y/size)}`;if(!cells.has(key))cells.set(key,[]);cells.get(key).push(leaf);
    }
  }
  const core = [{ x: -150, y: -150 }, { x: 150, y: 150 }];
  const bounds = boundsOf([...core, ...nodes, ...groups, ...leaves], 35);
  // Keep the SOL whole when a specialist opens. Group and skill contexts travel beyond it.
  const focusPoints = context.group ? [...groups.filter(g => g.id === context.group), ...leaves.filter(l => l.group === context.group)] :
    selected ? [...core, ...nodes.filter(n => n.id === selected), ...groups.filter(g => g.parent === selected), ...leaves.filter(l => l.parent === selected)] : [...core, ...nodes, ...groups, ...leaves];
  if(context.group){const members=leaves.filter(l=>l.group===context.group);if(members.length)focusPoints.push({x:Math.max(...members.map(l=>l.x))+145,y:Math.min(...members.map(l=>l.y))-62})}
  return { nodes, groups, leaves, bounds, focusBounds: boundsOf(focusPoints, context.group ? 42 : 38) };
}
