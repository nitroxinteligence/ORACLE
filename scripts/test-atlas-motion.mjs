import test from 'node:test';
import assert from 'node:assert/strict';
import { FormationTimeline, revealAt, Samples, QualityGovernor, pixelRatio } from '../packages/atlas/motion.js';

test('formation can be scrubbed, paused and resumed without any execution dependency', () => {
  const timeline = new FormationTimeline();
  timeline.set({ progress: 0, playing: true, duration: 4000 });
  timeline.advance(1000);
  assert.equal(timeline.progress, .25);
  timeline.set({ playing: false });
  timeline.advance(8000);
  assert.equal(timeline.progress, .25);
  timeline.set({ progress: .65, playing: true, rate: 2 });
  timeline.advance(700);
  assert.deepEqual(timeline.snapshot(), { progress: 1, playing: false, duration: 4000, rate: 2, phase: 'complete', visualOnly: true });
});

test('every collection and skill is fully revealed at completion; the sun arrives first', () => {
  assert.equal(revealAt(.22, 'sun'), 1);
  for (let group = 0; group < 7; group++) {
    assert.equal(revealAt(.22, 'collection', group), 0);
    assert.equal(revealAt(1, 'collection', group), 1);
    for (let leaf = 0; leaf < 8; leaf++) {
      assert.equal(revealAt(.63, 'skill', group, leaf), 0);
      assert.equal(revealAt(1, 'skill', group, leaf), 1);
    }
  }
});

test('invalid external timeline input never produces NaN or an unbounded loop', () => {
  const timeline = new FormationTimeline();
  timeline.set({ progress: .4, playing: true });
  timeline.set({ progress: NaN, duration: Infinity, rate: NaN });
  assert.equal(timeline.progress, .4);
  timeline.advance(-500);
  assert.equal(timeline.progress, .4);
  timeline.set({ progress: 2 });
  assert.equal(timeline.progress, 1);
  assert.equal(timeline.playing, false);
});

test('diagnostics retain bounded recent samples and reset without stale percentiles', () => {
  const samples = new Samples(4);
  [1, 2, 3, 4, 5, 6].forEach(value => samples.add(value));
  assert.equal(samples.count, 4);
  assert.equal(samples.percentile(1), 6);
  assert.equal(samples.percentile(0), 3);
  samples.clear();
  assert.equal(samples.percentile(.95), null);
});

test('quality remains stable under occasional jitter but downgrades sustained slow frames', () => {
  const budget = new QualityGovernor();
  for (let i = 0; i < 180; i++) assert.equal(budget.observe(i % 12 === 0 ? 70 : 33.3, .5), false);
  for (let i = 0; i < 89; i++) assert.equal(budget.observe(66.7, .5), false);
  assert.equal(budget.observe(66.7, .5), true);
  assert.equal(budget.degraded, true);
  budget.reset();
  assert.equal(budget.degraded, false);
});

test('Retina and external displays stay within the explicit pixel budgets', () => {
  assert.equal(pixelRatio(2, false), 1.5);
  assert.equal(pixelRatio(3, true), 1);
  assert.equal(pixelRatio(1, false), 1);
});
