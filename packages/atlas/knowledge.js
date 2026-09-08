/** Canonical Obsidian paths only. Folder membership is not inferred semantic knowledge. */
import {hash,boundsOf} from './layout.js';
export const internalConnectors=new Set(['connector_openai_codex_document_control','connector_openai_hotline','connector_openai_safety_settings']);
export function orbitPlugins(plugins=[]){return plugins.filter(p=>p.status==='connected'&&!internalConnectors.has(p.id)).sort((a,b)=>a.id.localeCompare(b.id))}
export const areaDefinitions=[
  {id:'personal',name:'Pessoal',path:'AREAS/pessoal',color:'#D4A1CC',aliases:['pessoal','personal'],palette:['#D4A1CC','#B4A0E5','#DDB08D','#A2C7B4']},
  {id:'professional',name:'Profissional',path:'AREAS/profissional',color:'#83B9D7',aliases:['profissional','professional'],palette:['#83B9D7','#A2AFE4','#CEC08B','#8CBFAA']},
];
const inside=(path,root)=>path===root||path.startsWith(root+'/');
const plain=value=>String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
export function areas(entries=[]){
 return areaDefinitions.map(area=>{
  const paths=entries.filter(e=>e.directory).map(e=>e.path);
  const exact=paths.find(p=>plain(p)===plain(area.path));
  const alias=paths.find(p=>!p.includes('/')&&area.aliases.includes(plain(p)));
  const path=exact||alias||area.path;
  const descendants=entries.filter(e=>inside(e.path,path)&&e.path!==path);
  return {...area,path,exists:!!exact||!!alias||descendants.length>0,notes:descendants.filter(e=>!e.directory).length,folders:descendants.filter(e=>e.directory).length};
 });
}
export function colorFor(area,path){return area.palette[hash(path)%area.palette.length]}
export function areaEntries(entries,area){return entries.filter(e=>e.path!==area.path&&inside(e.path,area.path))}
export function children(entries,path){return entries.filter(e=>e.path.slice(0,e.path.lastIndexOf('/'))===path).sort((a,b)=>Number(b.directory)-Number(a.directory)||a.path.localeCompare(b.path))}
export function label(entry){return entry.name?.replace(/\.md$/i,'')||entry.path.split('/').at(-1).replace(/\.md$/i,'')}
export function tooltip(entry,area,entries){
 const location=entry.path===area.path?area.name:area.name+' › '+entry.path.slice(area.path.length+1).replace(/\.md$/i,'').split('/').join(' › ');
 if(entry.path===area.path&&!area.exists)return `${location} · Pasta ainda não criada no Obsidian`;
 const notes=entry.directory?entries.filter(e=>!e.directory&&e.path.startsWith(entry.path+'/')).length:0;
 return `${location} · ${entry.directory?`Pasta · ${notes} ${notes===1?'nota':'notas'}`:'Nota'}`;
}
export function orbit(entries=[],pluginRadius=105){
 const roots=areas(entries),items=roots.map(area=>({...area,name:area.name,directory:true,area:area.id,root:true,color:area.color}));
 const lists=roots.map(area=>areaEntries(entries,area).sort((a,b)=>a.path.split('/').length-b.path.split('/').length||a.path.localeCompare(b.path)));
 for(let index=0;items.length<50;index++){
  let added=false;
  for(let i=0;i<roots.length&&items.length<50;i++){const entry=lists[i][index];if(entry){items.push({...entry,area:roots[i].id,color:colorFor(roots[i],entry.path)});added=true}}
  if(!added)break;
 }
 const firstRadius=pluginRadius+58,rings=[firstRadius],points=items.slice(0,2).map((item,index)=>({...item,x:0,y:(index?1:-1)*firstRadius,r:10,tooltip:tooltip(item,roots[index],entries)}));let offset=2,ring=1;
 while(offset<items.length){
  const radius=pluginRadius+58+ring*38,capacity=Math.max(12,Math.floor(2*Math.PI*radius/34)),count=Math.min(capacity,items.length-offset);
  rings.push(radius);
  for(let i=0;i<count;i++){
   const item=items[offset+i],angle=-Math.PI/2+i*2*Math.PI/count+(ring%2?.12:0);
   const area=roots.find(a=>a.id===item.area);
   points.push({...item,x:Math.cos(angle)*radius,y:Math.sin(angle)*radius,r:item.root?10:6.5,tooltip:tooltip(item,area,entries)});
  }
  offset+=count;ring++;
 }
 return {areas:roots,points,rings,radius:rings.at(-1)||pluginRadius+58};
}
export function resolve(entries,navigation){
 const area=areas(entries).find(a=>a.id===navigation.area)||areas(entries)[0];
 const requested=String(navigation.path||area.path);
 const allowed=inside(requested,area.path)&&!requested.split('/').includes('..');
 const exists=requested===area.path||entries.some(e=>e.directory&&e.path===requested);
 return {...navigation,area:area.id,path:allowed&&exists?requested:area.path,page:Math.max(0,Number(navigation.page)||0)};
}
export function plan(entries,navigation){
 const route=resolve(entries,navigation),area=areas(entries).find(a=>a.id===route.area);
 const all=children(entries,route.path),pages=Math.max(1,Math.ceil(all.length/50));route.page=Math.min(route.page,pages-1);
 const rows=all.slice(route.page*50,route.page*50+50),id='knowledge:'+route.path;
 const root={id,name:route.path===area.path?area.name:route.path.split('/').at(-1),icon:'folder',x:0,y:0,angle:-Math.PI/2,color:route.path===area.path?area.color:colorFor(area,route.path),skills:entries.filter(e=>!e.directory&&e.path.startsWith(route.path+'/')),groups:[],knowledge:true};
 const leaves=rows.map((entry,index)=>{
  const ring=Math.floor(index/24),count=Math.min(24,rows.length-ring*24),angle=-Math.PI/2+(index%24)*Math.PI*2/count,radius=260+ring*105;
  return {id:entry.path,parent:id,group:null,source:id,name:label(entry),x:Math.cos(angle)*radius,y:Math.sin(angle)*radius,angle,dir:Math.cos(angle)>=0?1:-1,index,localIndex:index,depth:1,route:null,custom:false,knowledge:true,directory:!!entry.directory,area:area.id,color:colorFor(area,entry.path),tooltip:tooltip(entry,area,entries)};
 });
 const extent=Math.max(260,...leaves.map(p=>Math.max(Math.abs(p.x),Math.abs(p.y))))+90;
 const bounds=boundsOf([{x:-extent,y:-extent},{x:extent,y:extent}],0);
 return {nodes:[root],groups:[],leaves,bounds,focusBounds:bounds,dedicated:true,route,area,total:all.length,pages};
}
