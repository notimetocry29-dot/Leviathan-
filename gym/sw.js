// غيّر الرقم ده كل ما تعدّل أي ملف
const C='gym-v36';
const FILES=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
// النسخة الجديدة بتشتغل فورًا من غير ما تستنى
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('gym-')&&k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('message',e=>{if(e.data==='skip')self.skipWaiting()});
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  const put=res=>{if(res&&res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res};
  // الصفحة نفسها: من النت الأول عشان أي تحديث يوصل فورًا، ومن الكاش لو مفيش نت
  if(r.mode==='navigate'){e.respondWith(fetch(r).then(put).catch(()=>caches.match(r,{ignoreSearch:true}).then(h=>h||caches.match('./index.html'))));return}
  e.respondWith(caches.match(r,{ignoreSearch:true}).then(h=>h||fetch(r).then(put)));
});
