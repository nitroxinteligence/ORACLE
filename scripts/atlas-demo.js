// Synthetic visual demonstration only. Run through atlas-qa.py, never include in the app.
(() => {
  selected = null; selectedSkill = null; visualPaused = false;
  $('#motion').checked = false; $('#economy').checked = false; $('#density').value = 3;
  renderAtlas(); atlasController.reset();
  const a = atlasController;
  if (window.qaDemoVariant === 'after') a.setFormation({ progress: 0, playing: true, duration: 3500 });
  setTimeout(() => { a.select('code'); a.focus('code'); }, 4000);
  setTimeout(() => {
    const n = a.nodes.get('code'), x = n.x, y = n.y, start = performance.now();
    const step = now => {
      const t = Math.min(1, (now - start) / 2200);
      const nx = x + Math.sin(t * Math.PI) * 90, ny = y + Math.sin(t * Math.PI * 2) * 35;
      const dx = nx - n.x, dy = ny - n.y;
      n.x = nx; n.y = ny;
      for (const l of a.leaves.values()) if (l.parent === n.id && !l.custom) { l.x += dx; l.y += dy; }
      a.drag = { node: n, category: n.id, moved: true }; a.draw();
      if (t < 1) requestAnimationFrame(step);
      else { a.drag = null; a.draw(); }
    };
    requestAnimationFrame(step);
  }, 7000);
  setTimeout(() => { const l = [...a.leaves.values()].find(l => l.parent === 'code'); a.select('code', l.id); }, 10000);
  setTimeout(() => { a.zoomAt(1.2, innerWidth * .53, innerHeight * .57); }, 12000);
  setTimeout(() => { a.select(null); a.reset(); }, 14500);
  return true;
})()
