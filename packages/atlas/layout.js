/** Deterministic geometry over the actual catalog. Never synthesizes documents. */
export const identities = {
  ads: { angle: -140, color: '#dba17c' }, code: { angle: -43, color: '#91b5ed' },
  contents: { angle: 3, color: '#7bc8b4' }, 'customer-finder': { angle: -184, color: '#d9c276' },
  'cyber-security': { angle: 139, color: '#b29bd7' }, marketing: { angle: 43, color: '#92c399' },
  'personal-branding': { angle: 92, color: '#d49cae' },
};
export function hash(value) { let n=2166136261; for(const c of value) n=Math.imul(n^c.charCodeAt(0),16777619);return n>>>0; }
export function identity(id) {
  if(identities[id])return identities[id];
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
// A specialist is a separate constellation: its root stays at the origin and
// at most 50 actual files surround it; the complete catalog stays in navigation.
function specialistPlan(collection, entries, context) {
  const catalog = catalogGroups(collection.id, entries);
  const root = {...collection, x:0, y:0, angle:-Math.PI/2, color:identity(collection.id).color,
    skills:catalog.flatMap(g=>g.skills), groups:catalog};
  const candidates = context.group ? catalog.filter(g=>g.id===context.group) : catalog;
  const chosen=sampleGroups(candidates,50,context.group,context.page||0,50);
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
  return {nodes:[root],groups,leaves,bounds,focusBounds:bounds,dedicated:true};
}
export function plan(collections, entries, selected, detail = 3, manual = {}, minimumRadius = 248, context = {}) {
  const specialist=collections.find(c=>c.id===selected);
  if(specialist)return specialistPlan(specialist,entries,context);
  const sorted = [...collections].sort((a, b) => identity(a.id).angle - identity(b.id).angle || a.id.localeCompare(b.id));
  const known = sorted.every(c => identities[c.id]) && sorted.length <= 7;
  const radius = Math.max(270, sorted.length * 34, minimumRadius);
  const nodes = sorted.map((c, i) => {
    const angle = (known ? identity(c.id).angle : -140 + i * 360 / sorted.length) * Math.PI / 180;
    const groups = catalogGroups(c.id, entries), saved = manual.nodes?.[c.id];
    return { ...c, angle, color: identity(c.id).color, x: saved?.x ?? Math.cos(angle) * radius,
      y: saved?.y ?? Math.sin(angle) * radius, skills: groups.flatMap(g => g.skills), groups };
  });
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
          const spread=Math.min(1.8,sector*3.4),leafAngle=angle+(members.length<2?0:i/Math.max(1,members.length-1)-.5)*spread;
          const distance=50+(i%2)*14;
          lx=x+Math.cos(leafAngle)*distance;ly=y+Math.sin(leafAngle)*distance;
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
