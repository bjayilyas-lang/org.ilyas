/* Service worker : permet d'installer le site et de l'ouvrir hors connexion */
const V='doucement-v2';
const ASSETS=['index.html','accueil.html','planning.html','projet.html','historique.html','voyages.html','souvenirs.html','idees.html','journee.html','budget.html','messages.html','stats.html','style.css','app.js','studio.js','geo.js','extras.js','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png','fonts/dm-sans-latin-400-normal.woff2','fonts/dm-sans-latin-500-normal.woff2','fonts/dm-sans-latin-600-normal.woff2','fonts/dm-sans-latin-700-normal.woff2','fonts/space-grotesk-latin-500-normal.woff2','fonts/space-grotesk-latin-600-normal.woff2','fonts/space-grotesk-latin-700-normal.woff2','vendor/leaflet/leaflet.js','vendor/leaflet/leaflet.css','vendor/leaflet/images/marker-icon.png','vendor/leaflet/images/marker-icon-2x.png','vendor/leaflet/images/marker-shadow.png','vendor/leaflet/images/layers.png','vendor/leaflet/images/layers-2x.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.allSettled(ASSETS.map(a=>c.add(a)))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==location.origin)return;
  e.respondWith(fetch(r).then(res=>{if(res.ok){const copy=res.clone();caches.open(V).then(c=>c.put(r,copy))}return res}).catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||caches.match('index.html'))));
});
