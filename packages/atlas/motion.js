/** Visual time only. No journal, backend or execution callbacks belong here. */
export const clamp01 = value => Math.min(1, Math.max(0, value));
export const smooth = (start, end, value) => {
  const t = clamp01((value - start) / (end - start));
  return t * t * (3 - 2 * t);
};

export function revealAt(progress, kind, index = 0, leafIndex = 0, groupCount = 7) {
  const group = Math.min(1, Math.max(0, index) / Math.max(1, groupCount - 1));
  const start = kind === 'sun' ? 0 : kind === 'connector' ? .18 : kind === 'collection' ? .23 + group * .20 : kind === 'group' ? .45 + group * .12 : .63 + group * .09 + Math.max(0, leafIndex) / (Math.max(0, leafIndex) + 8) * .14;
  return smooth(start, start + (kind === 'sun' ? .2 : .12), progress);
}

export class FormationTimeline {
  constructor() { this.progress = 1; this.playing = false; this.duration = 4200; this.rate = 1; }
  set({ progress, playing, duration, rate } = {}) {
    if (Number.isFinite(progress)) this.progress = clamp01(progress);
    if (Number.isFinite(duration)) this.duration = Math.max(500, Math.min(60000, duration));
    if (Number.isFinite(rate)) this.rate = Math.max(.25, Math.min(4, rate));
    if (typeof playing === 'boolean') this.playing = playing && this.progress < 1;
    if (this.progress === 1) this.playing = false;
    return this.snapshot();
  }
  advance(delta) {
    if (this.playing) this.set({ progress: this.progress + Math.max(0, delta) * this.rate / this.duration });
    return this.progress;
  }
  snapshot() {
    const p = this.progress;
    return { progress: p, playing: this.playing, duration: this.duration, rate: this.rate,
      phase: p < .23 ? 'sun' : p < .63 ? 'collections' : p < 1 ? 'skills' : 'complete', visualOnly: true };
  }
}

/** Bounded allocation-free recording; sorting happens only when diagnostics are requested. */
export class Samples {
  constructor(capacity = 360) { this.values = new Float32Array(capacity); this.clear(); }
  clear() { this.count = 0; this.cursor = 0; }
  add(value) { this.values[this.cursor] = value; this.cursor = (this.cursor + 1) % this.values.length; this.count = Math.min(this.count + 1, this.values.length); }
  percentile(q) {
    if (!this.count) return null;
    const sorted = this.values.slice(0, this.count).sort();
    return Math.round(sorted[Math.floor((this.count - 1) * q)] * 100) / 100;
  }
}

export function pixelRatio(dpr, economy) { return Math.min(Math.max(1, dpr || 1), economy ? 1 : 1.5); }

/** Quality decisions use active render cadence, never hidden-window or paused gaps. */
export class QualityGovernor {
  constructor() { this.reset(); }
  reset() { this.frames = 0; this.slow = 0; this.degraded = false; }
  observe(interval, cpu) {
    if (this.degraded) return false;
    this.frames++;
    if (interval > 52 || cpu > 10) this.slow++;
    if (this.frames < 90) return false;
    const degrade = this.slow > 18;
    this.frames = 0; this.slow = 0;
    this.degraded = degrade;
    return degrade;
  }
}
