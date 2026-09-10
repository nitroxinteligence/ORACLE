/** One real Obsidian library, one outer orbit. No semantic copies or decorative files. */
import {plan as folderPlan, resolve as folderResolve} from './knowledge.js';

export const rootPath = 'SISTEMA/prompts';
export const definition = {
  id: 'prompts', name: 'Prompts', path: rootPath, color: '#CEC08B',
};
export const contains = path => typeof path === 'string' &&
  (path === rootPath || path.startsWith(rootPath + '/')) &&
  !path.split('/').some(part => part === '..' || part === '.');
const parent = path => path.slice(0, path.lastIndexOf('/'));
const displayName = path => path === rootPath ? 'Prompts' :
  path.split('/').at(-1).replace(/\.md$/i, '').replace(/[-_]+/g, ' ');
const order = (a, b) => a.path.localeCompare(b.path, 'pt-BR');

export function inventory(entries = []) {
  const files = new Map(), folders = new Map();
  // Ancestor folders are evidenced by their actual descendant path, even with a file-only index.
  const addFolder = path => {
    for (let cursor = path; contains(cursor); cursor = parent(cursor)) {
      if (folders.has(cursor)) break;
      folders.set(cursor, {path: cursor, name: displayName(cursor), directory: true});
    }
  };
  for (const entry of entries) {
    if (!contains(entry.path)) continue;
    if (entry.directory) addFolder(entry.path);
    else if (/\.md$/i.test(entry.path)) { files.set(entry.path, entry); addFolder(parent(entry.path)); }
  }
  const directories = [...folders.values()].filter(entry => entry.path !== rootPath)
    .sort((a,b) => a.path.split('/').length-b.path.split('/').length || order(a,b));
  const documents = [...files.values()].sort(order);
  const area = {...definition, exists: folders.has(rootPath), notes: documents.length, folders: directories.length};
  return {area, directories, documents, entries: [...folders.values(), ...documents]};
}

function describe(entry, data) {
  if (entry.path === rootPath) return `Prompts · ${data.area.folders} pastas · ${data.area.notes} prompts · ${rootPath}`;
  const location = entry.path.slice(rootPath.length + 1).replace(/\.md$/i, '').split('/').join(' › ');
  const count = entry.directory ? data.documents.filter(file => file.path.startsWith(entry.path + '/')).length : 0;
  return `Prompts › ${location} · ${entry.directory ? `Pasta · ${count} ${count === 1 ? 'prompt' : 'prompts'}` : 'Prompt Markdown'}`;
}

export function orbit(entries = [], innerRadius = 163) {
  const data = inventory(entries);
  if (!data.area.exists) return {area: data.area, points: [], rings: [], radius: 0, total: 0, visible: 0};
  const all = [{path: rootPath, name: 'Prompts', directory: true, root: true}];
  // Keep actual prompts visible even when the library has many empty departments.
  for (let i = 0; i < Math.max(data.directories.length, data.documents.length); i++) {
    if (data.directories[i]) all.push(data.directories[i]);
    if (data.documents[i]) all.push(data.documents[i]);
  }
  const items = all.slice(0, 50), points = [], rings = [];
  for (let offset = 0, ring = 0; offset < items.length; ring++) {
    const radius = innerRadius + 38 * (ring + 1);
    const capacity = Math.max(12, Math.floor(2 * Math.PI * radius / 34));
    const count = Math.min(capacity, items.length - offset);
    rings.push(radius);
    for (let i = 0; i < count; i++) {
      const item = items[offset + i], angle = -Math.PI / 2 + Math.PI / 8 + i * Math.PI * 2 / count;
      points.push({...item, area: 'prompts', x: Math.cos(angle) * radius, y: Math.sin(angle) * radius,
        r: item.root ? 10 : 6.5, color: definition.color, tooltip: describe(item, data)});
    }
    offset += count;
  }
  if (all.length > items.length) points[0].tooltip += ` · ${items.length - 1} de ${all.length - 1} itens no mapa; abra para explorar todos`;
  return {area: data.area, points, rings, radius: rings.at(-1), total: all.length - 1, visible: items.length - 1};
}

export function resolve(entries, navigation) {
  const data = inventory(entries);
  return folderResolve(data.entries, {...navigation, area: 'prompts'}, [data.area]);
}
export function plan(entries, navigation) {
  const data = inventory(entries);
  const result = folderPlan(data.entries, {...navigation, area: 'prompts'}, [data.area]);
  result.nodes[0].name = displayName(result.route.path);
  for (const leaf of result.leaves) {
    leaf.name = displayName(leaf.id); leaf.color = definition.color;
    leaf.tooltip = describe({path: leaf.id, directory: leaf.directory}, data);
  }
  return result;
}
