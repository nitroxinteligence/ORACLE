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
export function plan(collections,entries,selected,detail=3,manual={}) {
  const sorted=[...collections].sort((a,b)=>identity(a.id).angle-identity(b.id).angle||a.id.localeCompare(b.id));
  const known=sorted.every(c=>identities[c.id])&&sorted.length<=7;
  const radius=Math.max(248,sorted.length*23);
  const nodes=sorted.map((c,i)=>{
    const angle=(known?identity(c.id).angle:(-140+i*360/sorted.length))*Math.PI/180;
    const source=entries.filter(e=>!e.directory&&e.name==='SKILL.md'&&e.path.startsWith(`SISTEMA/skills/${c.id}/`)).sort((a,b)=>a.path.localeCompare(b.path));
    const saved=manual.nodes?.[c.id];
    return {...c,angle,color:identity(c.id).color,x:saved?.x??Math.cos(angle)*radius,y:saved?.y??Math.sin(angle)*radius,skills:source};
  });
  const leaves=[];
  for(const n of nodes){
    const count=visibleCount(n.skills.length,n.id===selected,detail,1);
    const nearest=nodes.filter(o=>o!==n).map(o=>Math.abs(Math.atan2(Math.sin(o.angle-n.angle),Math.cos(o.angle-n.angle))));
    const fan=Math.min(1.25,(nearest.length?Math.min(...nearest):1.6)*.76);
    const lanes=Math.min(7,Math.max(1,Math.ceil(Math.sqrt(count))));
    for(let i=0;i<count;i++){
      const lane=i%lanes,depth=Math.floor(i/lanes),fraction=lanes===1?0:lane/(lanes-1)-.5;
      const angle=n.angle+fraction*fan+Math.sin(depth*.85+lane*1.7)*.025;
      const distance=86+depth*33+(lane%2)*11;
      const radiusAlong=radius+distance;
      const saved=manual.leaves?.[n.skills[i].path];
      const offsetX=n.x-Math.cos(n.angle)*radius,offsetY=n.y-Math.sin(n.angle)*radius;
      leaves.push({id:n.skills[i].path,parent:n.id,x:saved?.x??Math.cos(angle)*radiusAlong+offsetX,y:saved?.y??Math.sin(angle)*radiusAlong+offsetY,
        index:i,depth,lane,angle,custom:!!saved,source:depth?n.skills[i-lanes].path:null,dir:Math.cos(angle)>=0?1:-1});
    }
  }
  const points=[{x:-105,y:-105},{x:105,y:105},...nodes,...leaves];
  const bounds={minX:Math.min(...points.map(p=>p.x))-58,maxX:Math.max(...points.map(p=>p.x))+58,minY:Math.min(...points.map(p=>p.y))-58,maxY:Math.max(...points.map(p=>p.y))+58};
  return {nodes,leaves,bounds};
}
