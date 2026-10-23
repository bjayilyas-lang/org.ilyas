/* Services de carte partagés : recherche d'adresses, itinéraires, tuiles — avec solutions de secours */
window.Geo=(()=>{
  const sleep=ms=>new Promise(r=>setTimeout(r,ms));
  async function getJSON(url,ms=9000){const c=new AbortController(),t=setTimeout(()=>c.abort(),ms);try{const r=await fetch(url,{signal:c.signal});if(!r.ok)throw new Error('HTTP '+r.status);return await r.json()}finally{clearTimeout(t)}}
  async function search(q,limit=6){
    try{const d=await getJSON('https://nominatim.openstreetmap.org/search?format=jsonv2&accept-language=fr&limit='+limit+'&q='+encodeURIComponent(q));if(d.length)return d.map(p=>({name:p.display_name,lat:+p.lat,lon:+p.lon}))}catch(e){}
    const d=await getJSON('https://photon.komoot.io/api/?lang=fr&limit='+limit+'&q='+encodeURIComponent(q));
    return (d.features||[]).map(f=>{const p=f.properties||{},c=f.geometry.coordinates;return{name:[p.name,(p.housenumber?p.housenumber+' ':'')+(p.street||''),p.postcode,p.city||p.county,p.country].map(x=>String(x||'').trim()).filter(Boolean).join(', '),lat:c[1],lon:c[0]}});
  }
  const km=(a,b)=>{const R=6371,r=x=>x*Math.PI/180,dLa=r(b[0]-a[0]),dLo=r(b[1]-a[1]),h=Math.sin(dLa/2)**2+Math.cos(r(a[0]))*Math.cos(r(b[0]))*Math.sin(dLo/2)**2;return 2*R*Math.asin(Math.sqrt(h))};
  async function route(coords){ // coords: [[lat,lon],...]
    const path=coords.map(c=>c[1]+','+c[0]).join(';');
    const providers=['https://router.project-osrm.org/route/v1/driving/','https://routing.openstreetmap.de/routed-car/route/v1/driving/'];
    for(const base of providers){try{const d=await getJSON(base+path+'?overview=full&geometries=geojson',12000);if(d.code==='Ok'&&d.routes?.length){const r=d.routes[0];return{geometry:r.geometry,distance:r.distance,duration:r.duration,approx:false}}}catch(e){}}
    let dist=0;for(let i=1;i<coords.length;i++)dist+=km(coords[i-1],coords[i]);dist*=1300; // m, +30 % pour tenir compte des routes
    return{geometry:{type:'LineString',coordinates:coords.map(c=>[c[1],c[0]])},distance:dist,duration:dist/1000/55*3600,approx:true};
  }
  function tiles(map){
    const CARTO='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',OSM='https://tile.openstreetmap.org/{z}/{x}/{y}.png';
    const layer=L.tileLayer(CARTO,{maxZoom:19,subdomains:'abcd',attribution:'© OpenStreetMap contributors © CARTO'}).addTo(map);
    let err=0,osm=false;layer.on('tileload',()=>{err=0});
    layer.on('tileerror',()=>{if(++err<4)return;err=0;if(!osm){osm=true;layer.options.subdomains='abc';layer.setUrl(OSM)}});
    return layer;
  }
  const fmtRoute=r=>{const k=(r.distance/1000).toLocaleString('fr-FR',{maximumFractionDigits:1}),m=Math.round(r.duration/60),d=m>=60?`${Math.floor(m/60)} h ${String(m%60).padStart(2,'0')} min`:`${m} min`;return `${r.approx?'≈ ':''}${k} km · ${r.approx?'environ ':''}${d}`};
  return{sleep,search,route,tiles,fmtRoute};
})();
