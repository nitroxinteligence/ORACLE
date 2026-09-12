/* Short, interruptible UI transitions. Content is visible without animation. */
window.OracleTransitions=(()=>{
 const ease='cubic-bezier(.22,1,.36,1)',running=new Map(),closing=new Map(),snapshots=new Map();
 const preference=matchMedia('(prefers-reduced-motion: reduce)');
 let pageRevision=0;
 const enabled=()=>!preference.matches&&!document.body.classList.contains('reduced')&&!document.hidden&&window.oracleWindowVisible!==false;
 function cancel(element){
  const current=running.get(element);if(!current)return;
  running.delete(element);clearTimeout(current.timer);current.animation.cancel();
  element.removeAttribute('data-motion');
 }
 function animate(element,frames,{duration=220,delay=0,name='enter',hold=false}={}){
  if(!element)return Promise.resolve(true);
  cancel(element);
  if(!enabled()||!element.isConnected||typeof element.animate!=='function')return Promise.resolve(true);
  let animation;
  try{animation=element.animate(frames,{duration,delay,easing:ease,fill:'both'});}catch{return Promise.resolve(true);}
  element.dataset.motion=name;
  const current={animation,timer:setTimeout(()=>{try{animation.finish();}catch{}},duration+delay+100)};
  running.set(element,current);
  return animation.finished.then(()=>{
   clearTimeout(current.timer);
   if(running.get(element)!==current)return false;
   if(!hold){running.delete(element);animation.cancel();element.removeAttribute('data-motion');}
   return true;
  },()=>false);
 }
 function cancelDialog(dialog){
  const current=closing.get(dialog);
  if(current){closing.delete(dialog);dialog.inert=current.inert;}
  cancel(dialog);dialog?.removeAttribute('data-modal-motion');
 }
 function enterDialog(dialog){
  cancelDialog(dialog);if(!dialog?.open)return;
  if(enabled())dialog.dataset.modalMotion='enter';
  void animate(dialog,[{opacity:0},{opacity:1}],{duration:240,name:'modal-enter'}).then(completed=>{if(completed&&!closing.has(dialog))dialog.removeAttribute('data-modal-motion');});
 }
 function dismissDialog(dialog,{immediate=false}={}){
  if(!dialog?.open)return Promise.resolve(true);
  if(closing.has(dialog)&&!immediate)return closing.get(dialog).promise;
  cancelDialog(dialog);
  if(immediate||!enabled()){dialog.close();return Promise.resolve(true);}
  const current={inert:dialog.inert};closing.set(dialog,current);dialog.inert=true;dialog.dataset.modalMotion='exit';
  current.promise=animate(dialog,[{opacity:1},{opacity:0}],{duration:160,name:'modal-exit',hold:true}).then(completed=>{
   if(closing.get(dialog)!==current)return false;
   closing.delete(dialog);dialog.inert=current.inert;
   if(completed&&dialog.open)dialog.close();
   cancel(dialog);dialog.removeAttribute('data-modal-motion');return completed;
  });
  return current.promise;
 }
 function captureContent(element){
  if(!element||!enabled())return null;
  const stale=snapshots.get(element);if(stale){cancel(stale);stale.remove();snapshots.delete(element)}
  const clone=element.cloneNode(true);clone.removeAttribute('id');clone.removeAttribute('data-motion');clone.classList.add('modal-transition-snapshot');clone.setAttribute('aria-hidden','true');clone.inert=true;
  clone.querySelectorAll('[id]').forEach(el=>el.removeAttribute('id'));clone.querySelectorAll('input,textarea,select,button,a,[tabindex]').forEach(el=>el.tabIndex=-1);
  return clone;
 }
 function content(element,previous=null){
  if(previous&&enabled()&&element?.isConnected){
   element.parentElement.append(previous);snapshots.set(element,previous);
   void animate(previous,[{opacity:1},{opacity:0}],{duration:130,name:'content-exit',hold:true}).then(()=>{previous.remove();cancel(previous);if(snapshots.get(element)===previous)snapshots.delete(element)});
  }
  return animate(element,[{opacity:0},{opacity:1}],{duration:190,delay:previous?100:0,name:'content-enter'});
 }
 function cancelPage(){pageRevision++;cancel(document.querySelector('#graph-page'));cancel(document.querySelector('#library-page'));}
 function changePage(from,to,commit,direction=1){
  cancelPage();const revision=pageRevision;
  const enter=()=>{
   if(revision!==pageRevision||commit()===false)return;
   const graph=to.id==='graph-page';
   void animate(to,[{opacity:0,transform:graph?'scale(.992)':`translateX(${direction*10}px)`},{opacity:1,transform:graph?'scale(1)':'translateX(0)'}],{duration:220,name:'page-enter'});
  };
  if(!enabled()){enter();return;}
  void animate(from,[{opacity:1,transform:'translateX(0)'},{opacity:0,transform:`translateX(${-direction*6}px)`}],{duration:110,name:'page-exit'}).then(completed=>{if(completed)enter();});
 }
 function finish(){for(const {animation}of running.values())try{animation.finish();}catch{}}
 function reset(){for(const snapshot of snapshots.values()){cancel(snapshot);snapshot.remove()}snapshots.clear();cancelPage();for(const dialog of [...closing.keys()])cancelDialog(dialog);for(const element of [...running.keys()])cancel(element);}
 function enterApp(){
  const app=document.querySelector('#app');cancel(app);
  // Keep controls hidden until populated, then fade each surface without
  // transforming their shared ancestor (which also contains backdrop filters).
  const controls=document.querySelectorAll('.app-header,#navigation-panel,.map-tools,#observatory-panel,#footer-status');
  const entrances=[...controls].filter(element=>!element.hidden).map(element=>animate(element,[{opacity:0},{opacity:1}],{duration:440,name:'app-controls-enter'}));
  app?.removeAttribute('data-startup');return Promise.all(entrances);
 }
 async function exitApp(){
  cancelPage();for(const dialog of [...closing.keys()])cancelDialog(dialog);
  const elements=[document.querySelector('#app'),...document.querySelectorAll('dialog[open],#lock-screen:not([hidden])')];
  await Promise.all(elements.map(element=>animate(element,[{opacity:1},{opacity:0}],{duration:160,name:'app-exit',hold:true})));
 }
 function indicator(){
  const nav=document.querySelector('.workspace-tabs'),button=nav?.querySelector('[aria-selected=true]');
  if(!button||!nav.clientWidth)return;
  nav.style.setProperty('--tab-left',button.offsetLeft+'px');nav.style.setProperty('--tab-width',button.offsetWidth+'px');nav.classList.add('tabs-motion-ready');
 }
 const tabs=document.querySelector('.workspace-tabs');
 if(tabs){new ResizeObserver(indicator).observe(tabs);document.fonts?.ready.then(indicator);indicator();}
 preference.addEventListener('change',()=>{if(!enabled())finish();});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)finish();});
 return {animate,cancel,cancelDialog,enterDialog,dismissDialog,captureContent,content,cancelPage,changePage,finish,reset,enterApp,exitApp,indicator};
})();
