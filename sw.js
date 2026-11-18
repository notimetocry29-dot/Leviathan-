const CACHE='maher-v7';
const FILES=['./','./index.html','./search.json','./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon-maskable-512.png','./apple-touch-icon.png','./leviathan/','./leviathan/index.html','./assets/maher.css','./assets/maher.js','./assets/fallback.html'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));});
self.addEventListener('message',e=>{if(e.data==='skip')self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE&&!k.startsWith('gym')).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
 const r=e.request; if(r.method!=='GET')return;
 const u=new URL(r.url);
 if(u.origin===location.origin&&u.pathname.includes('/gym/'))return;
 if(u.hostname==='fonts.googleapis.com'||u.hostname==='fonts.gstatic.com'){
  e.respondWith(caches.match(r).then(h=>h||fetch(r).then(res=>{const c=res.clone();caches.open(CACHE).then(x=>x.put(r,c));return res;})));return;}
 if(u.origin!==location.origin)return;
 e.respondWith(caches.match(r,{ignoreSearch:true}).then(hit=>{
  const net=fetch(r).then(res=>{if(res&&res.ok){const c=res.clone();caches.open(CACHE).then(x=>x.put(r,c));}return res;}).catch(()=>hit||caches.match(r.mode==='navigate'&&u.pathname.includes('/leviathan/')?'./leviathan/index.html':'./index.html'));
  return hit||net;}));
});
