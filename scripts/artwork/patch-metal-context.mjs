// Reproducible correction for the pinned metal-fx 2.0.10 browser bundle.
// A disposed canvas emits contextlost asynchronously. Its listener must not
// stop the new shared context mounted by the next onboarding step.
import { readFileSync, writeFileSync } from 'node:fs';
const path = new URL('../../Resources/web/effects/onboarding.js', import.meta.url);
let source = readFileSync(path, 'utf8');
const before = 'c=(a)=>{a.preventDefault(),C&&(C.contextLost=!0)},d=()=>{if(!C)return;let a=Rp(C.gl)';
const after = 'c=(a)=>{a.preventDefault(),C?.gl===t&&(C.contextLost=!0)},d=()=>{if(!C||C.gl!==t)return;let a=Rp(C.gl)';
if (!source.includes(after)) {
  if (source.split(before).length !== 2) throw Error('Pinned metal-fx context handlers changed; review before patching.');
  source = source.replace(before, after);
  writeFileSync(path, source);
}
