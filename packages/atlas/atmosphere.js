/** Decorative background only: never part of the catalog, layout bounds or hit targets. */
import {hash} from './layout.js';

export const RING_COUNT = 7;
export const RING_PERIOD = 48;
const random = key => {
  let value = hash(key);
  value = Math.imul(value ^ (value >>> 16), 0x7feb352d);
  value = Math.imul(value ^ (value >>> 15), 0x846ca68b);
  return ((value ^ (value >>> 16)) >>> 0) / 4294967296;
};

/** Screen-space stars: stable sizes, bounded density and coverage beyond the graph. */
export function starField(width, height) {
  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) return [];
  const cell = Math.max(72, Math.sqrt(width * height / 400));
  const columns = Math.ceil(width / cell), rows = Math.ceil(height / cell), stars = [];
  for (let row = 0; row < rows; row++) for (let column = 0; column < columns; column++) {
    const key = `oracle-star:${column}:${row}`, bright = random(key + ':bright') > .95;
    const x = (column + .1 + random(key + ':x') * .8) * cell;
    const y = (row + .1 + random(key + ':y') * .8) * cell;
    if (x >= width - 2 || y >= height - 2) continue;
    stars.push({x, y, r: bright ? 1.05 : .45 + random(key + ':size') * .4,
      opacity: bright ? .47 : .13 + random(key + ':opacity') * .24});
  }
  return stars;
}

/** Seven thin waves drift outward; the wrap occurs at zero opacity. */
export function expandingRings(innerRadius, seconds = 0) {
  const inner = Number.isFinite(innerRadius) ? Math.max(0, innerRadius) : 0;
  const time = Number.isFinite(seconds) ? Math.max(0, seconds) : 0;
  const span = Math.max(360, inner * 1.5);
  return Array.from({length: RING_COUNT}, (_, index) => {
    const phase = (time / RING_PERIOD + index / RING_COUNT) % 1;
    const enter = Math.min(1, phase / .075);
    return {r: inner + 22 + phase * span,
      opacity: .075 * enter * enter * (3 - 2 * enter) * Math.pow(1 - phase, 1.7)};
  });
}
