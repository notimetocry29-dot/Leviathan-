const CACHE='maher-v16';
const FILES=['./','./index.html','./search.json','./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon-maskable-512.png','./apple-touch-icon.png',
 './leviathan/','./leviathan/index.html','./schmitt/','./schmitt/index.html',
 './study/tafkik/','./study/tafkik/index.html',
 './assets/maher.css','./assets/maher.js','./assets/fallback.html',
 './assets/plates/leviathan.svg','./assets/plates/schmitt.svg','./assets/plates/tafkik.svg'];
/* install: fetch every file fresh (bypass the HTTP cache) so a new version never mixes with old files */
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES.map(f=>new Request(f,{cache:'reload'})))));});
self.addEventListener('message',e=>{if(e.data==='skip')self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
function fallback(u){return caches.match(u.pathname.includes('/leviathan/')?'./leviathan/index.html':u.pathname.includes('/schmitt/')?'./schmitt/index.html':u.pathname.includes('/study/tafkik/')?'./study/tafkik/index.html':'./index.html');}
self.addEventListener('fetch',e=>{
 const r=e.request; if(r.method!=='GET')return;
 const u=new URL(r.url);
 if(u.hostname==='fonts.googleapis.com'||u.hostname==='fonts.gstatic.com'){
  e.respondWith(caches.match(r).then(h=>h||fetch(r).then(res=>{const c=res.clone();caches.open(CACHE).then(x=>x.put(r,c));return res;})));return;}
 if(u.origin!==location.origin)return;
 /* cache-first: files are versioned by CACHE, so there is no need to re-download
    the heavy book pages in the background on every visit (that was a main cause of slowness) */
 e.respondWith(caches.match(r,{ignoreSearch:true}).then(hit=>hit||fetch(r).then(res=>{
   if(res&&res.ok){const c=res.clone();caches.open(CACHE).then(x=>x.put(r,c));}return res;
  }).catch(()=>r.mode==='navigate'?fallback(u):Response.error())));
});
