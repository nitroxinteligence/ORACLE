// Source for the local WebView bundle; upstream versions and notices live beside it.
import React from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import { MetalBadge, pauseShared, resumeShared } from 'metal-fx';
import { BorderBeam } from 'border-beam';
const roots = new Map();
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches || document.body.classList.contains('reduced');
function mount(host, content) {
  let root = roots.get(host);
  if (!root) { root = createRoot(host); roots.set(host, root); }
  flushSync(() => root.render(content));
  if (reduced()) pauseShared();
  return () => { root.unmount(); roots.delete(host); };
}
window.OracleOnboardingEffects = {
  button(host, { label, onClick, disabled = false }) {
    return mount(host, <React.Fragment>
      <button className="ob2-metal-button" type="button" onClick={onClick} disabled={disabled} aria-label={label}>
        <span className="ob2-metal-art" aria-hidden="true"><MetalBadge scale={2.08} theme="dark" metalOpacity={0.72}>{''}</MetalBadge></span>
        <span className="ob2-metal-label">{label}</span>
      </button>
    </React.Fragment>);
  },
  beam(host) {
    return mount(host, <BorderBeam borderRadius={16} size="md" colorVariant="colorful" theme="dark" strength={1} brightness={2.2} duration={3} active={!reduced()} className="ob2-beam-effect"><div className="ob2-beam-fill" /></BorderBeam>);
  },
  destroy(host) { const root = roots.get(host); if (root) { root.unmount(); roots.delete(host); } },
};
function motion() {
  if (document.hidden || reduced()) pauseShared(); else resumeShared();
}
document.addEventListener('visibilitychange', motion);
matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',motion);
new MutationObserver(motion).observe(document.body,{attributes:true,attributeFilter:['class']});
