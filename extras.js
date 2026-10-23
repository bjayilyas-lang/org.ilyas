/* Fonctions communes : sauvegarde / import des données, application installable, confettis */
(function(){
  'use strict';
  const $=s=>document.querySelector(s);
  // Application installable + hors connexion
  try{if('serviceWorker' in navigator&&/^https?:$/.test(location.protocol))navigator.serviceWorker.register('sw.js').catch(()=>{})}catch(e){}
  // Confettis réutilisables
  window.confettiBurst=function(rect){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const x=rect?rect.left+rect.width/2:innerWidth/2,y=rect?rect.top+rect.height/2:innerHeight/2,cols=['#ff5638','#ff7b9c','#ffc857','#9a72ff','#35a66f'];for(let i=0;i<40;i++){const d=document.createElement('i');d.className='confetti';d.style.cssText=`left:${x}px;top:${y}px;background:${cols[i%5]};border-radius:${i%3?'2px':'50%'}`;document.body.append(d);const a=Math.random()*Math.PI*2,v=80+Math.random()*160;d.animate([{transform:'translate(0,0)',opacity:1},{transform:`translate(${Math.cos(a)*v}px,${Math.sin(a)*v-70}px) rotate(${Math.random()*540}deg)`,opacity:1,offset:.55},{transform:`translate(${Math.cos(a)*v*1.2}px,${Math.sin(a)*v+160}px) rotate(${Math.random()*720}deg)`,opacity:0}],{duration:1200+Math.random()*500,easing:'cubic-bezier(.2,.7,.3,1)'}).onfinish=()=>d.remove()}};
  function say(msg){let t=document.querySelector('.toast');if(!t){t=document.createElement('div');t.className='toast';document.body.append(t)}t.hidden=false;t.textContent=msg;clearTimeout(say.t);say.t=setTimeout(()=>{t.hidden=true},3200)}
  const ls={get:k=>{try{return localStorage.getItem(k)}catch(e){return null}},set:(k,v)=>{try{localStorage.setItem(k,v);return true}catch(e){return false}}};
  const mine=k=>/^doucement/i.test(k);
  function exportData(){
    const data={};try{for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(mine(k)&&k!=='doucement.lastBackup')data[k]=localStorage.getItem(k)}}catch(e){}
    const blob=new Blob([JSON.stringify({app:'doucement',version:1,exported:new Date().toISOString(),data},null,1)],{type:'application/json'});
    const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='doucement-sauvegarde-'+new Date().toISOString().slice(0,10)+'.json';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),2000);
    ls.set('doucement.lastBackup',String(Date.now()));info();say('Sauvegarde téléchargée ✓ Garde ce fichier précieusement.');
  }
  function importData(file){
    const r=new FileReader();r.onerror=()=>say('Fichier illisible.');
    r.onload=()=>{let j;try{j=JSON.parse(r.result)}catch(e){say('Ce fichier n’est pas une sauvegarde Doucement.');return}
      if(!j||j.app!=='doucement'||typeof j.data!=='object'){say('Ce fichier n’est pas une sauvegarde Doucement.');return}
      const keys=Object.keys(j.data).filter(mine);if(!keys.length){say('Sauvegarde vide.');return}
      if(!confirm(`Remplacer les données actuelles de ce navigateur par cette sauvegarde (${keys.length} éléments, du ${String(j.exported||'').slice(0,10)}) ?`))return;
      keys.forEach(k=>{if(typeof j.data[k]==='string')ls.set(k,j.data[k])});say('Sauvegarde restaurée ✓');setTimeout(()=>{try{(window.top||window).location.reload()}catch(e){location.reload()}},700)};
    r.readAsText(file);
  }
  function info(){const el=$('#bkInfo');if(!el)return;const t=+ls.get('doucement.lastBackup')||0;if(!t){el.textContent='Pense à sauvegarder tes données.';el.className='warn';return}const d=Math.floor((Date.now()-t)/864e5);el.textContent=d<1?'Dernière sauvegarde : aujourd’hui':`Dernière sauvegarde : il y a ${d} j`;el.className=d>14?'warn':''}
  function mount(){
    const sb=document.querySelector('.dash-sidebar');if(!sb||$('#bkBox'))return;
    const box=document.createElement('div');box.className='backup-box';box.id='bkBox';
    box.innerHTML='<b>💾 Mes données</b><div class="bk-row"><button type="button" id="bkExport">⇩ Exporter</button><button type="button" id="bkImport">⇧ Importer</button></div><small id="bkInfo"></small><input type="file" id="bkFile" accept="application/json,.json" hidden>';
    const note=sb.querySelector('.dash-sidebar-note');sb.insertBefore(box,note||null);
    $('#bkExport').onclick=exportData;$('#bkImport').onclick=()=>$('#bkFile').click();$('#bkFile').onchange=e=>{const f=e.target.files[0];if(f)importData(f);e.target.value=''};info();
  }
  window.mountBackup=mount;
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
  setTimeout(mount,300);
})();
