import {
  WebGLRenderer, Scene, OrthographicCamera, PlaneGeometry, ShaderMaterial, Mesh,
  BufferGeometry, BufferAttribute, InstancedBufferGeometry, InstancedBufferAttribute,
  LineSegments, Points, Color, DataTexture, RedFormat, UnsignedByteType,
  LinearFilter, RepeatWrapping, DynamicDrawUsage, SRGBColorSpace,
} from 'three';
import * as shaders from './shaders.js';
import { FormationTimeline, revealAt, Samples, QualityGovernor, pixelRatio } from './motion.js';

const uniform = value => ({ value });
const seed = n => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
const attributes = (geometry, schema, capacity, instanced = true) => {
  for (const [name, size] of Object.entries(schema)) {
    const Attribute = instanced ? InstancedBufferAttribute : BufferAttribute;
    geometry.setAttribute(name, new Attribute(new Float32Array(capacity * size), size).setUsage(DynamicDrawUsage));
  }
};
const write = (attribute, index, ...values) => {
  let changed = false;
  for (let j = 0; j < values.length; j++) {
    const offset = index * attribute.itemSize + j;
    const next = Math.fround(values[j]);
    if (attribute.array[offset] !== next) { attribute.array[offset] = next; changed = true; }
  }
  if (changed) attribute.needsUpdate = true;
  return changed;
};
function instancedPlane(segments = 1) {
  const base = new PlaneGeometry(1, 1, segments, 1);
  const geometry = new InstancedBufferGeometry();
  geometry.index = base.index;
  geometry.setAttribute('position', base.attributes.position);
  geometry.setAttribute('uv', base.attributes.uv);
  geometry.instanceCount = 0;
  return geometry;
}

/** A single render scheduler. The SVG controller owns hit targets and camera/layout state. */
class OracleUniverse {
  constructor(container) {
    this.host = container;
    this.scene = new Scene();
    this.camera = new OrthographicCamera(-500, 500, 350, -350, .1, 100);
    this.camera.position.z = 10;
    this.active = true;
    this.quality = 'balanced';
    this.pending = 0; this.timeout = 0; this.time = 0; this.clock = 0; this.last = 0;
    this.renderCount = 0; this.dirty = true; this.paused = false; this.reduced = false;
    this.frameSamples = new Samples(); this.costSamples = new Samples();
    this.governor = new QualityGovernor();
    this.timeline = new FormationTimeline();
    this.nodeRows = new Map(); this.leafRows = new Map(); this.leafBirths = new Map(); this.colors = [];
    this.nodeCapacity = 8; this.edgeCapacity = 128; this.leafCapacity = 128;
    this.nodeTargets = new Float32Array(this.nodeCapacity * 4);
    this.receipts = new Set(); this.receiptAt = -100; this.transitioning = false;
    this.u = {
      uTime: uniform(0), uClock: uniform(0), uFormation: uniform(1), uMotion: uniform(1), uEconomy: uniform(0),
      uScale: uniform(1), uDpr: uniform(pixelRatio(devicePixelRatio, false)),
      uSelected: uniform(-2), uSelectedLeaf: uniform(-2), uHovered: uniform(-2),
      uHoveredLeaf: uniform(-2), uDragged: uniform(-2), uReceipt: uniform(-1), uHoverCore: uniform(0),
      uReconnect: uniform(0),
    };
    const canvas = document.createElement('canvas');
    canvas.className = 'universe-webgl'; canvas.setAttribute('aria-hidden', 'true');
    container.prepend(canvas); this.canvas = canvas;
    try {
      this.renderer = new WebGLRenderer({ canvas, alpha: true, antialias: false,
        powerPreference: 'low-power', depth: false, stencil: false });
    } catch (error) { canvas.remove(); this.active = false; throw error; }
    this.renderer.outputColorSpace = SRGBColorSpace;
    this.renderer.setPixelRatio(this.u.uDpr.value);
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.sortObjects = false;
    this.renderer.debug.onShaderError = (gl, program, vertex, fragment) => {
      this.error = [gl.getProgramInfoLog(program), gl.getShaderInfoLog(vertex), gl.getShaderInfoLog(fragment)].filter(Boolean).join('\n');
      this.failed = true; this.cancel(); this.host.classList.remove('three-enabled');
      this.host.classList.add('svg-fallback');
      this.timeline.set({progress:1,playing:false}); this.applyFormation(true);
    };
    try { this.setup(); } catch (error) { this.dispose(); throw error; }
    this.onLost = event => {
      event.preventDefault(); this.contextLost = true; this.cancel(); this.last = 0;
      this.timeline.set({progress:1,playing:false}); this.applyFormation(true);
      this.host.classList.remove('three-enabled'); this.host.classList.add('svg-fallback');
    };
    this.onRestored = () => {
      if (!this.active) return;
      this.contextLost = false; this.failed = false; this.error = null; this.last = 0;
      this.reconnectAt = this.clock; this.dirty = true;
      this.host.classList.add('three-enabled'); this.host.classList.remove('svg-fallback'); this.schedule();
    };
    this.onVisibility = () => { this.last = 0; this.cancel(); if (!document.hidden) { this.dirty = true; this.schedule(); } };
    canvas.addEventListener('webglcontextlost', this.onLost);
    canvas.addEventListener('webglcontextrestored', this.onRestored);
    document.addEventListener('visibilitychange', this.onVisibility);
    container.classList.add('three-enabled');
  }

  material(vertexShader, fragmentShader) {
    return new ShaderMaterial({ vertexShader, fragmentShader, uniforms: this.u,
      transparent: true, depthTest: false, depthWrite: false, toneMapped: false });
  }
  mesh(geometry, vertex, fragment, Type = Mesh) {
    const object = new Type(geometry, this.material(vertex, fragment));
    object.frustumCulled = false; this.scene.add(object); return object;
  }
  setup() {
    const noise = new Uint8Array(128 * 128);
    for (let i = 0; i < noise.length; i++) noise[i] = Math.floor(seed(i + 11) * 255);
    this.noiseTexture = new DataTexture(noise, 128, 128, RedFormat, UnsignedByteType);
    this.noiseTexture.minFilter = this.noiseTexture.magFilter = LinearFilter;
    this.noiseTexture.wrapS = this.noiseTexture.wrapT = RepeatWrapping;
    this.noiseTexture.needsUpdate = true;
    this.u.uNoise = uniform(this.noiseTexture);
    this.plane = new PlaneGeometry(1, 1);
    this.galaxy = this.mesh(this.plane, shaders.planeVertex, shaders.galaxyFragment);
    this.galaxy.scale.set(1120, 730, 1);

    const starGeometry = new BufferGeometry();
    const positions = [], seeds = [];
    for (let i = 0; i < 78; i++) {
      positions.push((seed(i + 2) - .5) * 1080, (seed(i + 901) - .5) * 720, -1);
      seeds.push(seed(i + 31));
    }
    starGeometry.setAttribute('position', new BufferAttribute(new Float32Array(positions), 3));
    starGeometry.setAttribute('seed', new BufferAttribute(new Float32Array(seeds), 1));
    this.stars = this.mesh(starGeometry, shaders.starVertex, shaders.starFragment, Points);
    const orbitGeometry = new BufferGeometry(), orbitPositions = [], along = [], orders = [];
    [[185, 95], [288, 156], [395, 233]].forEach(([rx, ry], order) => {
      for (let i = 0; i < 160; i++) for (const end of [i, i + 1]) {
        const a = end / 160 * Math.PI * 2, x = Math.cos(a) * rx, y = Math.sin(a) * ry;
        orbitPositions.push(x * .906 - y * .423, x * .423 + y * .906, -.5);
        along.push(end / 160); orders.push(order);
      }
    });
    orbitGeometry.setAttribute('position', new BufferAttribute(new Float32Array(orbitPositions), 3));
    orbitGeometry.setAttribute('along', new BufferAttribute(new Float32Array(along), 1));
    orbitGeometry.setAttribute('order', new BufferAttribute(new Float32Array(orders), 1));
    this.orbits = this.mesh(orbitGeometry, shaders.orbitVertex, shaders.orbitFragment, LineSegments);

    this.edgeGeometry = instancedPlane(24);
    attributes(this.edgeGeometry, { source: 2, target: 2, tint: 3, edgeMeta: 4 }, this.edgeCapacity);
    this.edges = this.mesh(this.edgeGeometry, shaders.edgeVertex, shaders.edgeFragment);
    this.leafGeometry = new BufferGeometry();
    attributes(this.leafGeometry, { position: 3, tint: 3, leafMeta: 4 }, this.leafCapacity, false);
    this.leafGeometry.setDrawRange(0, 0);
    this.leafPoints = this.mesh(this.leafGeometry, shaders.leafVertex, shaders.leafFragment, Points);
    this.nodeGeometry = instancedPlane();
    attributes(this.nodeGeometry, { center: 2, tint: 3, nodeState: 4, order: 1 }, this.nodeCapacity);
    this.nodes = this.mesh(this.nodeGeometry, shaders.nodeVertex, shaders.nodeFragment);
    this.sun = this.mesh(this.plane, shaders.planeVertex, shaders.sunFragment);
    this.sun.scale.set(330, 330, 1);
  }

  unavailable() {
    return !this.active || this.contextLost || this.failed || !this.model || document.hidden ||
      window.oracleWindowVisible === false || this.model.data?.hidden || !this.width || !this.height;
  }
  sync(model) {
    if (!this.active) return;
    this.model = model;
    let changed = false;
    const width = Math.round(model.width), height = Math.round(model.height);
    if (!width || !height) return;
    if (width !== this.width || height !== this.height) {
      this.width = width; this.height = height; this.renderer.setSize(width, height, false); changed = true;
    }
    const { x, y, k } = model.camera;
    if (changed || x !== this.cameraX || y !== this.cameraY || k !== this.cameraK) {
      this.cameraX = x; this.cameraY = y; this.cameraK = k;
      this.camera.left = -x / k; this.camera.right = (width - x) / k;
      this.camera.top = y / k; this.camera.bottom = (y - height) / k;
      this.camera.updateProjectionMatrix(); this.u.uScale.value = k; changed = true;
    }
    const reduced = !!model.reduced || !!this.systemReduced;
    if (reduced !== this.reduced) {
      this.reduced = reduced; changed = true; this.last = 0;
      if (reduced) this.setFormation({ progress: 1, playing: false });
    }
    const manualEconomy = !!model.data?.economy;
    if (this.manualEconomy !== manualEconomy) { this.manualEconomy = manualEconomy; this.governor.reset(); }
    changed = this.setQuality(manualEconomy || this.governor.degraded ? 'economy' : 'balanced') || changed;
    changed = this.syncGeometry(model) || changed;
    const groupIndex = id => model.nodes.get(id)?.index ?? -2;
    const hover = model.hovered || model.keyboardFocus || {};
    const values = {
      uSelected: groupIndex(model.selected), uSelectedLeaf: this.leafRows.get(model.selectedLeaf) ?? -2,
      uHovered: groupIndex(hover.category), uHoveredLeaf: this.leafRows.get(hover.skill) ?? -2,
      uDragged: groupIndex(model.drag?.category || model.drag?.node?.parent), uHoverCore: hover.core ? 1 : 0,
    };
    for (const [key, value] of Object.entries(values)) {
      if (this.u[key].value !== value) { this.u[key].value = value; changed = true; }
    }
    for (const n of model.nodes.values()) {
      const row = this.nodeRows.get(n.id);
      const selected = n.id === model.selected ? 1 : 0;
      const hovered = n.id === hover.category || model.leaves.get(hover.skill)?.parent === n.id ? 1 : 0;
      const dragged = model.drag?.node?.id === n.id ? 1 : 0;
      const targets = [selected, hovered, dragged, model.selected && !selected ? 1 : 0];
      for (let j = 0; j < 4; j++) if (this.nodeTargets[row * 4 + j] !== targets[j]) {
        this.nodeTargets[row * 4 + j] = targets[j]; this.transitioning = true; changed = true;
      }
    }
    this.paused = !!model.paused;
    if (!this.started) {
      this.started = true;
      this.setFormation({ progress: this.reduced ? 1 : 0, playing: !this.reduced });
    }
    if (model.data?.formation && model.data.formation !== this.lastFormationInput) {
      this.lastFormationInput = model.data.formation; this.setFormation(model.data.formation);
    }
    this.dirty ||= changed;
    // Input must preempt the ambient deadline or the canvas trails the SVG at 30 Hz.
    if (changed && this.timeout) { clearTimeout(this.timeout); this.timeout = 0; }
    if (this.unavailable()) { this.cancel(); this.last = 0; }
    else this.schedule();
  }

  syncGeometry(model) {
    let changed = false;
    // Topology buffers are replaced only if capacity grows. Camera, hover and selection never allocate geometry.
    if (model.nodes.size > this.nodeCapacity) {
      this.nodeCapacity = Math.max(model.nodes.size, this.nodeCapacity * 2);
      this.nodeGeometry.dispose();
      attributes(this.nodeGeometry, { center: 2, tint: 3, nodeState: 4, order: 1 }, this.nodeCapacity);
      this.nodeTargets = new Float32Array(this.nodeCapacity * 4); changed = true;
    }
    const edgeCount = model.nodes.size + model.leaves.size;
    if (edgeCount > this.edgeCapacity) {
      this.edgeCapacity = edgeCount * 2; this.edgeGeometry.dispose();
      attributes(this.edgeGeometry, { source: 2, target: 2, tint: 3, edgeMeta: 4 }, this.edgeCapacity); changed = true;
    }
    if (model.leaves.size > this.leafCapacity) {
      this.leafCapacity = model.leaves.size * 2; this.leafGeometry.dispose();
      attributes(this.leafGeometry, { position: 3, tint: 3, leafMeta: 4 }, this.leafCapacity, false); changed = true;
    }
    const node = this.nodeGeometry.attributes, edge = this.edgeGeometry.attributes, leaf = this.leafGeometry.attributes;
    this.nodeRows.clear(); this.leafRows.clear();
    let row = 0, edgeRow = 0;
    const edgeTo = (x, y, tx, ty, color, branch, group, phase, leafID) => {
      changed = write(edge.source, edgeRow, x, y) || changed;
      changed = write(edge.target, edgeRow, tx, ty) || changed;
      changed = write(edge.tint, edgeRow, color.r, color.g, color.b) || changed;
      changed = write(edge.edgeMeta, edgeRow, branch, group, phase, leafID) || changed;
      edgeRow++;
    };
    for (const n of model.nodes.values()) {
      this.nodeRows.set(n.id, row);
      const color = this.colors[n.index] ||= new Color(model.palette[n.index]);
      changed = write(node.center, row, n.x, -n.y) || changed;
      changed = write(node.tint, row, color.r, color.g, color.b) || changed;
      changed = write(node.order, row, n.index) || changed;
      edgeTo(0, 0, n.x, n.y, color, 0, n.index, n.index * .137, -3);
      row++;
    }
    let leafRow = 0;
    for (const l of model.leaves.values()) {
      const parent = model.nodes.get(l.parent); if (!parent) continue;
      const color = this.colors[parent.index];
      this.leafRows.set(l.id, leafRow);
      if (!this.leafBirths.has(l.id)) { this.leafBirths.set(l.id, this.clock); this.arrivalUntil = this.clock + .34; }
      changed = write(leaf.position, leafRow, l.x, -l.y, 1) || changed;
      changed = write(leaf.tint, leafRow, color.r, color.g, color.b) || changed;
      changed = write(leaf.leafMeta, leafRow, parent.index, l.index, leafRow, this.leafBirths.get(l.id)) || changed;
      edgeTo(parent.x, parent.y, l.x, l.y, color, 1, parent.index, parent.index * .137 + l.index * .21, leafRow);
      leafRow++;
    }
    if (this.nodeGeometry.instanceCount !== row || this.edgeGeometry.instanceCount !== edgeRow || this.leafGeometry.drawRange.count !== leafRow) changed = true;
    this.nodeGeometry.instanceCount = row; this.edgeGeometry.instanceCount = edgeRow;
    this.leafGeometry.setDrawRange(0, leafRow);
    for (const id of this.leafBirths.keys()) if (!model.leaves.has(id)) this.leafBirths.delete(id);
    return changed;
  }

  setQuality(value) {
    const dpr = pixelRatio(devicePixelRatio, value === 'economy');
    if (value === this.quality && dpr === this.u.uDpr.value) return false;
    this.quality = value; this.u.uEconomy.value = value === 'economy' ? 1 : 0;
    this.u.uDpr.value = dpr; this.renderer.setPixelRatio(dpr);
    if (this.width) this.renderer.setSize(this.width, this.height, false);
    this.dirty = true; return true;
  }
  setPaused(value) {
    if (!this.active) return;
    this.paused = !!value;
    this.cancel(); this.last = 0;
    // Pause atmosphere, including formation; direct interaction can still request a static frame.
    this.schedule();
  }
  setFormation(options) {
    if (!this.active) return this.timeline.snapshot();
    const state = this.timeline.set(this.reduced || this.failed || this.contextLost ? { ...options, progress: 1, playing: false } : options);
    this.u.uFormation.value = state.progress; this.dirty = true;
    if (this.timeout) { clearTimeout(this.timeout); this.timeout = 0; }
    this.applyFormation(true); this.schedule(); return state;
  }
  getFormation() { return this.timeline.snapshot(); }
  applyFormation(notify = false) {
    if (!this.model) return;
    const p = this.timeline.progress;
    if (p !== this.lastLabelProgress || notify) {
      for (const n of this.model.nodes.values()) n.g.style.opacity = p === 1 ? '' : String(revealAt(p, 'collection', n.index));
      for (const l of this.model.leaves.values()) l.g.style.opacity = p === 1 ? '' : String(revealAt(p, 'skill', this.model.nodes.get(l.parent)?.index ?? 0, l.index));
      this.host.querySelector('.oracle-core').style.opacity = p === 1 ? '' : String(revealAt(p, 'sun'));
      this.lastLabelProgress = p;
    }
    if (notify || p === 1 && this.lastNotifiedProgress !== 1 || this.clock - (this.lastNotifyAt || 0) > .2) {
      this.lastNotifyAt = this.clock; this.lastNotifiedProgress = p;
      this.host.dispatchEvent(new CustomEvent('oracle:formation', { detail: this.getFormation() }));
    }
  }
  signalReceipt(receipt) {
    if (!this.active || this.model?.data?.replay || receipt?.source !== 'codex-hook' || !receipt.event_id) return false;
    const age = Date.now() - Date.parse(receipt.received_at);
    if (!Number.isFinite(age) || age < 0 || age > 8000 || this.receipts.has(receipt.event_id)) return false;
    this.receipts.add(receipt.event_id);
    if (this.receipts.size > 64) this.receipts.delete(this.receipts.values().next().value);
    this.receiptAt = this.clock; this.dirty = true; this.schedule(); return true;
  }

  cancel() {
    cancelAnimationFrame(this.pending); clearTimeout(this.timeout);
    this.pending = 0; this.timeout = 0;
  }
  schedule() {
    if (this.unavailable() || this.pending || this.timeout) return;
    const transient = (this.transitioning || this.clock < (this.arrivalUntil || 0)) && !this.reduced;
    const animate = !this.paused && !this.reduced;
    if (!this.dirty && !animate && !transient) return;
    const request = () => {
      this.timeout = 0;
      this.pending = requestAnimationFrame(now => { this.pending = 0; this.render(now); this.schedule(); });
    };
    if (this.dirty || transient) request();
    else {
      const cadence = 1000 / (this.quality === 'economy' ? 15 : 30);
      this.timeout = setTimeout(request, Math.max(0, cadence - (performance.now() - this.last) - 4));
    }
  }
  render(now) {
    if (this.unavailable()) return;
    const cadence = 1000 / (this.quality === 'economy' ? 15 : 30);
    // WebKit timestamps may be quantized to 1ms. Tolerate 2ms so a 66ms economy frame
    // isn't rejected and delayed another whole display refresh.
    if (!this.dirty && !this.transitioning && this.clock >= (this.arrivalUntil || 0) && this.last && now - this.last < cadence - 2) return;
    const started = performance.now(), interval = this.last ? now - this.last : 0;
    const delta = Math.min(interval || 16.67, 100);
    this.clock += delta / 1000;
    if (!this.paused && !this.reduced) {
      this.time += delta / 1000;
      if (interval) this.frameSamples.add(interval);
      if (this.timeline.playing) {
        this.timeline.advance(delta); this.u.uFormation.value = this.timeline.progress; this.applyFormation();
      }
    }
    this.u.uTime.value = this.reduced ? 0 : this.time;
    this.u.uClock.value = this.clock;
    this.u.uMotion.value = this.reduced ? 0 : 1;
    const receiptAge = (this.clock - this.receiptAt) / 2.4;
    this.u.uReceipt.value = this.reduced || receiptAge > 1 ? -1 : receiptAge;
    this.u.uReconnect.value = this.reduced ? 0 : Math.max(0, 1 - (this.clock - (this.reconnectAt ?? -100)) / .6);
    const state = this.nodeGeometry.attributes.nodeState;
    const lerp = this.reduced ? 1 : 1 - Math.exp(-delta / 80);
    this.transitioning = false;
    let stateChanged = false;
    for (let i = 0; i < this.nodeGeometry.instanceCount * 4; i++) {
      const difference = this.nodeTargets[i] - state.array[i];
      if (Math.abs(difference) > .003) {
        state.array[i] += difference * lerp; this.transitioning = true; stateChanged = true;
      } else if (state.array[i] !== this.nodeTargets[i]) { state.array[i] = this.nodeTargets[i]; stateChanged = true; }
    }
    if (stateChanged) state.needsUpdate = true;
    this.renderer.render(this.scene, this.camera);
    this.renderCount++; this.last = now; this.dirty = false;
    const cpu = performance.now() - started;
    this.costSamples.add(cpu);
    if (!this.paused && !this.reduced && !this.manualEconomy && interval && !this.model.drag && !this.transitioning &&
        this.governor.observe(interval, cpu)) this.setQuality('economy');
  }
  resetDiagnostics() { this.frameSamples.clear(); this.costSamples.clear(); }
  diagnostics() {
    const info = this.renderer.info;
    return {
      renderer: 'Three.js r185 · WebGL2 · instanced atlas', quality: this.quality,
      adaptiveEconomy: this.governor.degraded, buffer: [this.canvas.width, this.canvas.height],
      drawCalls: info.render.calls, triangles: info.render.triangles,
      geometries: info.memory.geometries, textures: info.memory.textures,
      renderCount: this.renderCount, samples: this.frameSamples.count,
      frameIntervalMedianMs: this.frameSamples.percentile(.5), frameIntervalP95Ms: this.frameSamples.percentile(.95),
      cpuSubmitMedianMs: this.costSamples.percentile(.5), cpuSubmitP95Ms: this.costSamples.percentile(.95),
      paused: this.paused || this.unavailable(), reduced: this.reduced, active: this.active,
      pendingFrames: Number(!!this.pending), pendingTimers: Number(!!this.timeout),
      formation: this.getFormation(), contextLost: !!this.contextLost, error: this.error || null,
      note: 'CPU submission is not GPU time. Ambient cadence targets 30/15 Hz; input is scheduled separately. No telemetry is inferred from light.'
    };
  }
  dispose() {
    if (!this.active) return;
    this.active = false; this.cancel();
    document.removeEventListener('visibilitychange', this.onVisibility);
    this.canvas.removeEventListener('webglcontextlost', this.onLost);
    this.canvas.removeEventListener('webglcontextrestored', this.onRestored);
    const geometries = new Set(), materials = new Set();
    this.scene.traverse(object => { if (object.geometry) geometries.add(object.geometry); if (object.material) materials.add(object.material); });
    geometries.forEach(geometry => geometry.dispose()); materials.forEach(material => material.dispose());
    this.noiseTexture?.dispose(); this.renderer.dispose();
    this.scene.clear(); this.nodeRows.clear(); this.leafRows.clear(); this.leafBirths.clear(); this.receipts.clear();
    this.host.classList.remove('three-enabled');
    if (this.model) {
      for (const n of this.model.nodes.values()) n.g.style.opacity = '';
      for (const l of this.model.leaves.values()) l.g.style.opacity = '';
    }
    this.canvas.remove();
  }
}
window.OracleUniverse = OracleUniverse;
