/** Explicit catalog organization, not inferred semantic relationships.
 * Only the owner's confirmed Code assignment is a default; other specialists
 * remain in "Sem departamento" until assigned. No vault paths are rewritten. */
import {identity,boundsOf} from './layout.js';

export const definitions=[
  {id:'code',name:'Código',icon:'code',color:'#91b5ed'},
  {id:'design',name:'Design',icon:'tool',color:'#d4a1cc'},
  {id:'marketing',name:'Marketing',icon:'chart',color:'#92c399'},
  {id:'sales',name:'Vendas',icon:'megaphone',color:'#dba17c'},
  {id:'research',name:'Pesquisa',icon:'search',color:'#d9c276'},
  {id:'content',name:'Conteúdo',icon:'note',color:'#7bc8b4'},
  {id:'unassigned',name:'Sem departamento',icon:'folder',color:'#afb5bf'},
];
const codeMembers=new Set(['code','cyber-security','cybersecurity','frontend-design','impeccable','frontend','richard-design']);
export function inventory(collections,entries,assignments={}) {
  const known=new Set(definitions.map(d=>d.id)),seen=new Set();
  const specialists=collections.filter(c=>c&&typeof c.id==='string'&&!seen.has(c.id)&&seen.add(c.id)).map(c=>{
    const root=`SISTEMA/skills/${c.id}/`;
    const skills=[...new Map(entries.filter(e=>!e.directory&&e.name==='SKILL.md'&&e.path.startsWith(root)&&!e.path.split('/').includes('..')).map(e=>[e.path,e])).values()].sort((a,b)=>a.path.localeCompare(b.path));
    const assigned=known.has(assignments[c.id])?assignments[c.id]:codeMembers.has(c.id)?'code':'unassigned';
    return {...c,skills,departmentID:assigned,color:identity(c.id).color};
  }).sort((a,b)=>a.id.localeCompare(b.id));
  return definitions.map(d=>({...d,specialists:specialists.filter(c=>c.departmentID===d.id)})).filter(d=>d.specialists.length).map(d=>({...d,skills:d.specialists.flatMap(s=>s.skills)}));
}
export function plan(collections,entries,department=null,page=0,minimumRadius=330,assignments={}) {
  const catalog=inventory(collections,entries,assignments),chosen=catalog.find(d=>d.id===department);
  const nodes=[],groups=[],leaves=[];
  const appendSpecialist=(specialist,root,x,y,index,showSkills)=>{
    const group={...specialist,id:'specialist:'+specialist.id,specialistID:specialist.id,parent:root.id,source:root.id,
      kind:'specialist',name:specialist.name||specialist.id,index,x,y,rootMembership:false,visibleCount:showSkills?Math.min(10,specialist.skills.length):0};
    groups.push(group);
    if(showSkills)for(const[li,entry]of specialist.skills.slice(0,10).entries()){
      const column=li%5,row=Math.floor(li/5);
      leaves.push({id:entry.path,parent:root.id,group:group.id,source:group.id,specialistID:specialist.id,
        x:x+(column-2)*34,y:y-95-row*56,name:entry.path.split('/').at(-2).replace(/-/g,' '),index:leaves.length,
        localIndex:li,depth:2,dir:column>=2?1:-1,route:null,custom:false,color:specialist.color});
    }
  };
  let pages=1,actualPage=0;
  if(chosen){
    const root={...chosen,id:'department:'+chosen.id,departmentID:chosen.id,x:0,y:250,angle:-Math.PI/2};nodes.push(root);
    // Large departments are paged; every specialist remains reachable, not just sampled.
    pages=Math.max(1,Math.ceil(chosen.specialists.length/12));actualPage=Math.max(0,Math.min(pages-1,Math.floor(Number(page)||0)));
    const rows=chosen.specialists.slice(actualPage*12,(actualPage+1)*12),columns=Math.min(4,rows.length),rowCount=Math.ceil(rows.length/columns);
    rows.forEach((s,i)=>appendSpecialist(s,root,((i%columns)-(columns-1)/2)*235,65-Math.floor(i/columns)*260,i,true));
    root.y=250;root.totalSpecialists=chosen.specialists.length;
  }else{
    const radius=Math.max(350,minimumRadius+80,catalog.length*90);
    catalog.forEach((d,index)=>{
      const angle=-Math.PI/2+index*Math.PI*2/Math.max(1,catalog.length),root={...d,id:'department:'+d.id,departmentID:d.id,x:Math.cos(angle)*radius,y:Math.sin(angle)*radius,angle};nodes.push(root);
      // Overview offers department + specialist nodes; skills only enter after drill-down.
      const shown=d.specialists.slice(0,12);
      shown.forEach((s,i)=>{const offset=(i-(shown.length-1)/2)*Math.min(.105,1.05/Math.max(1,shown.length-1));const r=radius+105+Math.floor(i/6)*60;appendSpecialist(s,root,Math.cos(angle+offset)*r,Math.sin(angle+offset)*r,i,false);});
    });
  }
  const extent=chosen?[...nodes,...groups,...leaves]:[{x:-minimumRadius,y:-minimumRadius},{x:minimumRadius,y:minimumRadius},...nodes,...groups];
  const bounds=boundsOf(extent,75);
  return {nodes,groups,leaves,bounds,focusBounds:bounds,dedicated:!!chosen,department:chosen?.id||null,departmentCatalog:catalog,pages,page:actualPage,total:chosen?.specialists.length||catalog.length};
}
