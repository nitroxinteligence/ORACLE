/** Pure projection: replay cannot call tools, write files, or re-run installation. */
export function projectJournal(baseline, events, cursor) {
  const byPath = new Map(baseline.map(entry => [entry.path, {...entry}]));
  const valid = path => typeof path === 'string' && !path.startsWith('/') && !path.split('/').some(p=>p==='..'||p==='');
  for (const event of events.slice(0, cursor + 1)) {
    for (const ref of event.subject_refs || []) {
      if (!valid(ref.path)) continue;
      const pieces = ref.path.split('/');
      for (let i=1;i<pieces.length;i++) {
        const path=pieces.slice(0,i).join('/');
        if(!byPath.has(path))byPath.set(path,{path,name:pieces[i-1],directory:true,historical:true});
      }
      if(ref.directory || /\.(md|py|js|ts|sh)$/i.test(ref.path))byPath.set(ref.path,{...byPath.get(ref.path),...ref,name:pieces.at(-1),historical:true});
    }
    for (const ref of event.removed_refs || []) {
      if (!valid(ref.path)) continue;
      byPath.delete(ref.path);
      if(ref.directory)for(const path of byPath.keys())if(path.startsWith(ref.path+'/'))byPath.delete(path);
    }
  }
  return [...byPath.values()].sort((a,b)=>a.path.localeCompare(b.path));
}
if(typeof window!=='undefined')window.OracleReplay={projectJournal};
