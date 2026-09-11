/**
 * Metadata-only department membership. This module never reads or moves files.
 * Department IDs contain a slash; collection IDs are a single directory segment.
 * Names/aliases select discovered collections, never manufacture installed packages.
 *
 * Integration: snapshot.departmentManifest -> atlas.update({departmentManifest}).
 * OracleDepartments.createCatalog(collections, entries, manifest, assignments) is also usable by
 * the navigation tree. The complete index is independent of the rendered scene.
 */
import {catalogGroups, identity, skillName, boundsOf} from './layout.js';

export const PAGE_SIZE = 50;
export const FALLBACK_MANIFEST = Object.freeze({
  schema_version: 1, fallback_department: 'department/other',
  departments: Object.freeze([Object.freeze({id:'department/other', name:'Outros especialistas',
    icon:'tool', color:'#a6adb8', collection_ids:Object.freeze([]), aliases:Object.freeze([])})]),
});
const text = value => typeof value === 'string' && !!value.trim() && !/[\u0000-\u001f\u007f]/.test(value);
const segment = value => text(value) && value !== '.' && value !== '..' && !/[\\/]/.test(value);
export const normalize = value => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .toLowerCase().trim().replace(/[\s_-]+/g, ' ');
const compare = (a,b) => a < b ? -1 : a > b ? 1 : 0;
const nonnegative = value => Number.isFinite(Number(value)) ? Math.max(0, Math.floor(Number(value))) : 0;

export function validateManifest(input) {
  const errors = [], ids = new Set(), selectors = new Map();
  if (!input || typeof input !== 'object' || Array.isArray(input)) return {valid:false, errors:['Manifest must be an object.'], manifest:null};
  if (input.schema_version !== 1) errors.push('Unsupported department schema_version; expected 1.');
  if (!Array.isArray(input.departments) || !input.departments.length) errors.push('departments must be a nonempty array.');
  const departments = [];
  for (const [index, row] of (Array.isArray(input.departments) ? input.departments : []).entries()) {
    const at = `departments[${index}]`;
    if (!row || typeof row !== 'object' || Array.isArray(row)) { errors.push(`${at} must be an object.`); continue; }
    if (typeof row.id !== 'string' || !/^department\/[a-z0-9][a-z0-9-]*$/.test(row.id)) errors.push(`${at}.id must use the department/<slug> namespace.`);
    if (ids.has(row.id)) errors.push(`${at}.id is duplicated: ${row.id}.`);
    ids.add(row.id);
    if (!text(row.name)) errors.push(`${at}.name must be a nonempty label.`);
    if (row.icon !== undefined && (typeof row.icon !== 'string' || !/^[a-z][a-z0-9-]*$/i.test(row.icon))) errors.push(`${at}.icon is invalid.`);
    if (row.color !== undefined && (typeof row.color !== 'string' || !/^#[0-9a-f]{6}$/i.test(row.color))) errors.push(`${at}.color must be #RRGGBB.`);
    for (const key of ['collection_ids','aliases']) {
      if (!Array.isArray(row[key])) { errors.push(`${at}.${key} must be an array.`); continue; }
      for (const selector of row[key]) {
        if (!segment(selector)) { errors.push(`${at}.${key} contains an invalid selector.`); continue; }
        const normalized = normalize(selector), owner = selectors.get(normalized);
        if (owner && owner !== row.id) errors.push(`Ambiguous selector ${selector}: ${owner} and ${row.id}.`);
        selectors.set(normalized, row.id);
      }
    }
    departments.push({id:row.id, name:row.name, icon:row.icon || 'folder', color:row.color || '#a6adb8',
      collection_ids:Array.isArray(row.collection_ids) ? [...new Set(row.collection_ids)] : [],
      aliases:Array.isArray(row.aliases) ? [...new Set(row.aliases)] : []});
  }
  if (!ids.has(input.fallback_department)) errors.push('fallback_department must reference a declared department.');
  return {valid:!errors.length, errors, manifest:errors.length ? null : {
    schema_version:1, fallback_department:input.fallback_department, departments,
  }};
}

/** Canonical local path evidence, not a search over labels or package metadata. */
export function collectionForEntry(entry) {
  if (!entry || typeof entry.path !== 'string') return null;
  const parts = entry.path.split('/');
  if (parts.length < 3 || parts[0] !== 'SISTEMA' || parts[1] !== 'skills' || !parts.every(segment)) return null;
  if (parts.length === 3 && !entry.directory) return null;
  return parts[2];
}

/** Alternating real sources keeps a department's first page representative. */
function interleave(specialists) {
  const result = []; let active = specialists.filter(s => s.skills.length);
  // Exhausted/empty sources leave the queue: a large source alongside thousands
  // of empty folders must not turn an O(files) pass into O(files * folders).
  for (let row = 0; active.length; row++) {
    const next = [];
    for (const specialist of active) {
      result.push(specialist.skills[row]);
      if (specialist.skills.length > row + 1) next.push(specialist);
    }
    active = next;
  }
  return result;
}

/** Translate persisted audit assignments without conflating collection and route IDs. */
export function departmentID(value) {
  if (typeof value !== 'string') return null;
  const id = value.startsWith('department/') ? value.slice(11) : value;
  if (!/^[a-z0-9][a-z0-9-]*$/.test(id)) return null;
  return `department/${id === 'unassigned' ? 'other' : id}`;
}

export function createCatalog(collections = [], entries = [], input = FALLBACK_MANIFEST, assignments = {}) {
  const validation = validateManifest(input), manifest = validation.manifest || validateManifest(FALLBACK_MANIFEST).manifest;
  const exact = new Map(), aliases = new Map(), descriptions = new Map(), discovered = new Map();
  for (const department of manifest.departments) {
    for (const id of department.collection_ids) exact.set(id, department.id);
    for (const alias of [...department.collection_ids, ...department.aliases]) aliases.set(normalize(alias), department.id);
  }
  for (const collection of collections) if (collection && segment(collection.id) && !descriptions.has(collection.id)) descriptions.set(collection.id, collection);
  for (const entry of entries) {
    const id = collectionForEntry(entry); if (!id) continue;
    if (!discovered.has(id)) discovered.set(id, new Map());
    if (!entry.directory && entry.name === 'SKILL.md' && entry.path.endsWith('/SKILL.md')) discovered.get(id).set(entry.path, entry);
  }
  const departmentRows = [...manifest.departments], known = new Set(departmentRows.map(d => d.id)), assigned = new Map();
  const overrides = assignments && typeof assignments === 'object' && !Array.isArray(assignments) ? assignments : {};
  for (const [id, value] of Object.entries(overrides).sort(([a],[b]) => compare(a,b))) {
    if (!segment(id) || !discovered.has(id)) continue;
    const target = departmentID(value);
    if (!target) continue;
    if (!known.has(target)) {
      const definition = definitions.find(d => departmentID(d.id) === target);
      if (!definition) continue;
      const row = target === 'department/other' ? FALLBACK_MANIFEST.departments[0] : {...definition, id:target, collection_ids:[], aliases:[]};
      departmentRows.push(row);known.add(target);
    }
    assigned.set(id,target);
  }
  const specialists = [...discovered].sort(([a],[b]) => compare(a,b)).map(([id, docs]) => {
    const description = descriptions.get(id), name = text(description?.name) ? description.name : id.replace(/[-_]/g, ' ');
    const groups = catalogGroups(id, [...docs.values()]);
    const department = assigned.get(id) || exact.get(id) || aliases.get(normalize(id)) || aliases.get(normalize(name)) || manifest.fallback_department;
    const skills = [...docs.values()].sort((a,b) => compare(a.path,b.path));
    return {id, name, icon:description?.icon || 'tool', color:identity(id).color,
      kind:'specialist', department, originPath:`SISTEMA/skills/${id}`, groups, skills,
      skillCount:skills.length, empty:!skills.length, state:skills.length ? 'ready' : 'empty',
      assignment:assigned.has(id) ? 'user' : exact.has(id) ? 'manifest-id' : aliases.has(normalize(id)) || aliases.has(normalize(name)) ? 'manifest-alias' : 'fallback'};
  });
  const departments = departmentRows.map(row => {
    const members = specialists.filter(s => s.department === row.id), skills = interleave(members);
    return {...row, kind:'department', specialists:members, skills, skillCount:skills.length,
      specialistCount:members.length, empty:!members.length,
      state:!members.length ? 'empty' : !skills.length ? 'no-skills' : 'ready',
      fallback:row.id === manifest.fallback_department};
  });
  const specialistByID = new Map(specialists.map(s => [s.id,s])), departmentByID = new Map(departments.map(d => [d.id,d]));
  const skillByPath = new Map();
  for (const specialist of specialists) for (const entry of specialist.skills) {
    skillByPath.set(entry.path, {entry, path:entry.path, name:skillName(entry), specialist:specialist.id, department:specialist.department});
  }
  return {schema_version:1, departments, specialists, specialistByID, departmentByID, skillByPath,
    skillCount:skillByPath.size, manifestValid:validation.valid, manifestErrors:validation.errors};
}

export function paginate(rows, requestedPage = 0, requestedSize = PAGE_SIZE) {
  const size = Math.min(200, Math.max(1, nonnegative(requestedSize) || PAGE_SIZE));
  const pages = Math.max(1, Math.ceil(rows.length / size)), page = Math.min(nonnegative(requestedPage), pages - 1);
  return {rows:rows.slice(page * size, (page + 1) * size), total:rows.length, pages, page, pageSize:size};
}

/** Full local index. No dependency on current scene, sampled leaves, or zoom. */
export function search(catalog, query = '', options = {}) {
  const tokens = normalize(query).split(' ').filter(Boolean);
  const rows = [...catalog.skillByPath.values()].filter(row => {
    if (options.department && row.department !== options.department || options.specialist && row.specialist !== options.specialist) return false;
    const haystack = normalize([row.name, row.path, catalog.specialistByID.get(row.specialist).name,
      catalog.departmentByID.get(row.department).name].join(' '));
    return tokens.every(token => haystack.includes(token));
  }).sort((a,b) => compare(a.path,b.path));
  return paginate(rows, options.page, options.pageSize);
}

/** All route values are revalidated after refresh, deletion, and history restore. */
export function resolveSelection(catalog, input = {}) {
  let specialist = catalog.specialistByID.get(input.specialist ?? input.category ?? input.selected);
  const leaf = catalog.skillByPath.get(input.leaf ?? input.selectedLeaf);
  if (leaf) specialist = catalog.specialistByID.get(leaf.specialist);
  const department = specialist?.department || (catalog.departmentByID.has(input.department) ? input.department : null);
  let group = specialist?.groups.find(g => g.id === input.group) || null;
  let rows = group?.skills || specialist?.skills || catalog.departmentByID.get(department)?.skills || [];
  let page = input.page;
  if (leaf) {
    // A search result can reveal a file in a group that was never drawn.
    group = specialist.groups.find(g => g.skills.some(e => e.path === leaf.path));
    rows = group.skills; page = Math.floor(rows.findIndex(e => e.path === leaf.path) / PAGE_SIZE);
  }
  return {kind:leaf ? 'skill' : group ? 'group' : specialist ? 'specialist' : department ? 'department' : 'global',
    department, specialist:specialist?.id || null, leaf:leaf?.path || null, group:group?.id || null,
    page:paginate(rows, page).page};
}

export function selectionForSkill(catalog, path) {
  return catalog.skillByPath.has(path) ? resolveSelection(catalog, {leaf:path}) : null;
}

/** Legacy audit inventory/geometry API. Main navigation uses createCatalog/hierarchyPlan.
 * Explicit catalog organization, not inferred semantic relationships.
 * Only the owner's confirmed Code assignment is a default; other specialists
 * remain in "Sem departamento" until assigned. No vault paths are rewritten. */

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
