import test from 'node:test';
import assert from 'node:assert/strict';
import {starField, expandingRings, RING_COUNT, RING_PERIOD} from '../packages/atlas/atmosphere.js';

test('stars cover all quadrants, including the edges, at supported window sizes', () => {
  for (const [width,height] of [[840,620],[1200,760],[1440,900],[1920,1200],[3840,2160]]) {
    const stars=starField(width,height);
    assert.ok(stars.length>=80&&stars.length<=480);
    assert.ok(stars.every(s=>s.x-s.r>=0&&s.y-s.r>=0&&s.x+s.r<=width&&s.y+s.r<=height));
    for(const x of [0,1])for(const y of [0,1])assert.ok(stars.some(s=>Math.floor(s.x/(width/2))===x&&Math.floor(s.y/(height/2))===y));
    assert.ok(stars.some(s=>s.x<width*.06)&&stars.some(s=>s.x>width*.94));
    assert.ok(stars.some(s=>s.y<height*.08)&&stars.some(s=>s.y>height*.92));
  }
});

test('star positions, sizes and light are deterministic and independent of zoom', () => {
  assert.deepEqual(starField(1440,900),starField(1440,900));
  assert.ok(starField(1440,900).every(s=>s.r>=.45&&s.r<=1.05&&s.opacity>=.13&&s.opacity<=.47));
  for(const size of [[0,900],[1200,-1],[NaN,900],[Infinity,900]])assert.deepEqual(starField(...size),[]);
});

test('expanding waves are thin decorative rings strictly outside the real orbits', () => {
  for (let seconds=0;seconds<96;seconds+=.2) {
    const rings=expandingRings(280,seconds);
    assert.equal(rings.length,RING_COUNT);
    assert.ok(rings.every(r=>r.r>=302&&r.r<722&&r.opacity>=0&&r.opacity<.075));
  }
});

test('rings travel outward slowly and wrap at invisibility without a flash', () => {
  const start=expandingRings(280,5),later=expandingRings(280,6);
  assert.ok(later.every((r,i)=>r.r>start[i].r));
  const before=expandingRings(280,RING_PERIOD-.00001)[0],after=expandingRings(280,RING_PERIOD)[0];
  assert.ok(before.opacity<.000001&&after.opacity===0);
});

test('static and reduced-motion presentation needs no clock, timers or scene objects', () => {
  assert.deepEqual(expandingRings(280),expandingRings(280,0));
  assert.ok(expandingRings(280).filter(r=>r.opacity>.001).length>=5);
  assert.ok(expandingRings(NaN,Infinity).every(r=>Number.isFinite(r.r)&&Number.isFinite(r.opacity)));
});
