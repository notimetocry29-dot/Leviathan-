// رقم النسخة بييجي من index.html (sw.js?v=VER): غيّر VER هناك بس
const V=new URL(self.location.href).searchParams.get('v')||'0';
const C='gym-v'+V;
const FILES=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
// النسخة الجديدة بتستنى: التطبيق بيظهر زرار «فيه تحديث» وانت اللي تدوس (مفيش إعادة تحميل في نص التمرين)
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(FILES))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('gym-')&&k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('message',e=>{if(e.data==='skip')self.skipWaiting()});
self.addEventListener('fetch',e=>{
  const r=e.request;
  if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  const put=res=>{if(res&&res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res};
  // الصفحة: النت الأول، بس لو اتأخر أكتر من ٢٫٥ ثانية (واي فاي الجيم الضعيف) نفتح من الكاش فورًا
  if(r.mode==='navigate'){
    const cached=()=>caches.match(r,{ignoreSearch:true}).then(h=>h||caches.match('./index.html'));
    const net=fetch(r).then(put);
    const slow=new Promise(res=>setTimeout(()=>cached().then(h=>res(h||net)),2500));
    e.respondWith(Promise.race([net.catch(()=>cached().then(h=>h||Promise.reject())),slow]));
    return;
  }
  e.respondWith(caches.match(r,{ignoreSearch:true}).then(h=>h||fetch(r).then(put)));
});
