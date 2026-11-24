/* مَاهِر — shared settings, themes, backup, updates */
(function(){
var H=document.documentElement,KEY='maher:ui',FONTS={"naskh":"\"Noto Naskh Arabic\",\"Amiri\",\"Traditional Arabic\",\"Noto Sans Arabic\",Tahoma,serif","sans":"\"Noto Sans Arabic\",\"Segoe UI\",\"Geeza Pro\",Tahoma,sans-serif","classic":"\"Amiri\",\"Scheherazade New\",\"Traditional Arabic\",\"Noto Naskh Arabic\",serif","kufi":"\"Noto Kufi Arabic\",\"Droid Arabic Kufi\",\"Noto Sans Arabic\",Tahoma,sans-serif","system":"system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif"};
var ROOT=new URL('../',document.currentScript.src).href;
var DEF={style:'copper',accent:'',font:'naskh',hsans:false,fs:null,lh:1.95,mw:760,pg:15,dim:1,al:'start',eg:true,egfold:false,map:true,op:true,cite:true,qplain:false,bar:true,autohide:false,restore:true,quote:true,motion:true};
function rd(k,d){try{var v=JSON.parse(localStorage.getItem(k)||'null');return v==null?d:v;}catch(e){return d;}}
function wr(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}
var U=rd(KEY,null);
if(!U){U={};var o=rd('leviathan-ui',{})||{};for(var k in o)if(k in DEF)U[k]=o[k];var d=rd('diwan:ui',{})||{};if('quote' in d)U.quote=d.quote;if('motion' in d)U.motion=d.motion;wr(KEY,U);}
for(var k in DEF)if(!(k in U))U[k]=DEF[k];
var subs=[];
function sv(){wr(KEY,U);}
function baseFs(){return innerWidth>=700?18.5:17.5;}
function shade(hex,amt){var n=parseInt(hex.slice(1),16),r=n>>16,g=n>>8&255,b=n&255;function m(c){return Math.round(c+(255-c)*amt);}return '#'+[m(r),m(g),m(b)].map(function(x){return ('0'+x.toString(16)).slice(-2);}).join('');}
function apply(){
 if(U.style==='copper')H.removeAttribute('data-style');else H.setAttribute('data-style',U.style);
 var s=H.style;
 if(U.accent){s.setProperty('--acc',U.accent);s.setProperty('--acc2',shade(U.accent,.35));}else{s.removeProperty('--acc');s.removeProperty('--acc2');}
 s.setProperty('--font',FONTS[U.font]||FONTS.naskh);s.setProperty('--hfont',U.hsans?FONTS.sans:'var(--font)');
 var fs=U.fs||baseFs();s.setProperty('--fs',fs+'px');s.setProperty('--z',(fs/baseFs()).toFixed(3));
 s.setProperty('--lh',U.lh);s.setProperty('--mw',U.mw+'px');s.setProperty('--pg',U.pg+'px');s.setProperty('--dim',U.dim);s.setProperty('--al',U.al);
 var T={nodim:U.dim>=0.999,noeg:!U.eg,egfold:U.egfold,nomap:!U.map,noop:!U.op,nocite:!U.cite,qplain:U.qplain,nobar:!U.bar,autohide:U.autohide,noq:!U.quote,nomo:!U.motion};
 for(var c in T)H.classList.toggle(c,!!T[c]);
 var mt=document.querySelector('meta[name=theme-color]'),bg=getComputedStyle(H).getPropertyValue('--bg').trim();if(mt&&bg)mt.setAttribute('content',bg);
 sync();subs.forEach(function(f){try{f(U);}catch(e){}});
}
function fmt(k,v){if(k==='fs')return Math.round(v*2)/2;if(k==='lh')return (+v).toFixed(2);if(k==='dim')return Math.round(v*100)+'٪';return v;}
function sync(){var P=document.getElementById('panel');if(!P)return;
 P.querySelectorAll('[data-set]').forEach(function(el){var k=el.dataset.set;
  if(el.type==='checkbox')el.checked=!!U[k];
  else if(el.type==='range'){var v=k==='fs'?(U.fs||baseFs()):U[k];el.value=v;var o=P.querySelector('[data-o="'+k+'"]');if(o)o.textContent=fmt(k,v);}
  else el.setAttribute('aria-pressed',String(U[k])===el.dataset.v);});}
var tt;function toast(m){var t=document.getElementById('toast');if(!t)return;t.textContent=m;t.classList.add('on');clearTimeout(tt);tt=setTimeout(function(){t.classList.remove('on');},1900);}
function openP(o){H.classList.toggle('ps',o);}
function dump(){var o={};for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);if(/^(maher:|leviathan-|diwan:)/.test(k))o[k]=localStorage.getItem(k);}return {app:'maher',v:2,at:new Date().toISOString(),data:o};}
var dp=null;
function init(){
 document.body.insertAdjacentHTML('beforeend',"<div id=\"scrim\"></div><div id=\"panel\" role=\"dialog\" aria-label=\"الإعدادات\"><div class=\"grab\"></div>\n<div class=\"hd\"><b>الإعدادات</b><button type=\"button\" class=\"o\" id=\"pclose\">تم</button></div>\n<div id=\"instw\" hidden><button type=\"button\" class=\"o\" id=\"inst\">ثبّت التطبيق على الموبايل</button></div>\n<h5>الشكل</h5><div class=\"sws\"><button type=\"button\" class=\"sw\" data-set=\"style\" data-v=\"copper\"><i style=\"background:#0f0d0b;border-color:#4a3a2a\"><u style=\"background:#d9893a\"></u></i>نحاسي ليلي</button><button type=\"button\" class=\"sw\" data-set=\"style\" data-v=\"midnight\"><i style=\"background:#0b1020;border-color:#2f3b5e\"><u style=\"background:#e2b84a\"></u></i>منتصف الليل</button><button type=\"button\" class=\"sw\" data-set=\"style\" data-v=\"amoled\"><i style=\"background:#000000;border-color:#333333\"><u style=\"background:#ff9f43\"></u></i>أسود تام</button><button type=\"button\" class=\"sw\" data-set=\"style\" data-v=\"sepia\"><i style=\"background:#f4ecd8;border-color:#cdb98f\"><u style=\"background:#9a5b1e\"></u></i>ورق قديم</button><button type=\"button\" class=\"sw\" data-set=\"style\" data-v=\"paper\"><i style=\"background:#ffffff;border-color:#cfcfcf\"><u style=\"background:#8b1e1e\"></u></i>حبر على أبيض</button><button type=\"button\" class=\"sw\" data-set=\"style\" data-v=\"manuscript\"><i style=\"background:#ece2c6;border-color:#b99d68\"><u style=\"background:#7d1f1a\"></u></i>مخطوطة</button><button type=\"button\" class=\"sw\" data-set=\"style\" data-v=\"slate\"><i style=\"background:#1e2124;border-color:#41484f\"><u style=\"background:#7fb3d5\"></u></i>رمادي هادئ</button><button type=\"button\" class=\"sw\" data-set=\"style\" data-v=\"forest\"><i style=\"background:#0f1410;border-color:#33452f\"><u style=\"background:#b9c46a\"></u></i>أخضر زيتوني</button></div>\n<h5>لون التمييز</h5><div class=\"row\"><button type=\"button\" class=\"acc\" data-set=\"accent\" data-v=\"\" title=\"افتراضي\" aria-label=\"افتراضي\" style=\"background:conic-gradient(#d9893a,#e2b84a,#4fa3a5,#a07cc5,#d9893a)\"></button><button type=\"button\" class=\"acc\" data-set=\"accent\" data-v=\"#d9893a\" title=\"نحاسي\" aria-label=\"نحاسي\" style=\"background:#d9893a\"></button><button type=\"button\" class=\"acc\" data-set=\"accent\" data-v=\"#e2b84a\" title=\"ذهبي\" aria-label=\"ذهبي\" style=\"background:#e2b84a\"></button><button type=\"button\" class=\"acc\" data-set=\"accent\" data-v=\"#c0504d\" title=\"قرمزي\" aria-label=\"قرمزي\" style=\"background:#c0504d\"></button><button type=\"button\" class=\"acc\" data-set=\"accent\" data-v=\"#4fa3a5\" title=\"فيروزي\" aria-label=\"فيروزي\" style=\"background:#4fa3a5\"></button><button type=\"button\" class=\"acc\" data-set=\"accent\" data-v=\"#8fae5b\" title=\"زيتوني\" aria-label=\"زيتوني\" style=\"background:#8fae5b\"></button><button type=\"button\" class=\"acc\" data-set=\"accent\" data-v=\"#a07cc5\" title=\"بنفسجي\" aria-label=\"بنفسجي\" style=\"background:#a07cc5\"></button><button type=\"button\" class=\"acc\" data-set=\"accent\" data-v=\"#6f9fd8\" title=\"أزرق\" aria-label=\"أزرق\" style=\"background:#6f9fd8\"></button></div>\n<h5>الخط</h5><div class=\"row\"><button type=\"button\" class=\"o\" data-set=\"font\" data-v=\"naskh\" style=\"font-family:\"Noto Naskh Arabic\",\"Amiri\",\"Traditional Arabic\",\"Noto Sans Arabic\",Tahoma,serif\">نسخ</button><button type=\"button\" class=\"o\" data-set=\"font\" data-v=\"sans\" style=\"font-family:\"Noto Sans Arabic\",\"Segoe UI\",\"Geeza Pro\",Tahoma,sans-serif\">حديث</button><button type=\"button\" class=\"o\" data-set=\"font\" data-v=\"classic\" style=\"font-family:\"Amiri\",\"Scheherazade New\",\"Traditional Arabic\",\"Noto Naskh Arabic\",serif\">كلاسيكي</button><button type=\"button\" class=\"o\" data-set=\"font\" data-v=\"kufi\" style=\"font-family:\"Noto Kufi Arabic\",\"Droid Arabic Kufi\",\"Noto Sans Arabic\",Tahoma,sans-serif\">كوفي</button><button type=\"button\" class=\"o\" data-set=\"font\" data-v=\"system\" style=\"font-family:system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif\">خط الجهاز</button></div><label class=\"tg\"><span>عناوين بخط حديث</span><input type=\"checkbox\" data-set=\"hsans\"></label>\n<h5>المقاسات</h5><div class=\"sl\"><span>حجم الخط</span><input type=\"range\" min=\"14\" max=\"26\" step=\"0.5\" data-set=\"fs\"><output data-o=\"fs\"></output></div><div class=\"sl\"><span>تباعد السطور</span><input type=\"range\" min=\"1.5\" max=\"2.5\" step=\"0.05\" data-set=\"lh\"><output data-o=\"lh\"></output></div><div class=\"sl\"><span>عرض النص</span><input type=\"range\" min=\"520\" max=\"1100\" step=\"20\" data-set=\"mw\"><output data-o=\"mw\"></output></div><div class=\"sl\"><span>بين الفقرات</span><input type=\"range\" min=\"6\" max=\"34\" step=\"1\" data-set=\"pg\"><output data-o=\"pg\"></output></div><div class=\"sl\"><span>الإضاءة</span><input type=\"range\" min=\"0.5\" max=\"1\" step=\"0.05\" data-set=\"dim\"><output data-o=\"dim\"></output></div>\n<h5>محاذاة الفقرات</h5><div class=\"row\"><button type=\"button\" class=\"o\" data-set=\"al\" data-v=\"start\">يمين</button><button type=\"button\" class=\"o\" data-set=\"al\" data-v=\"justify\">ضبط من الجانبين</button></div>\n<div class=\"prev\">«العهود بلا سيف مجرد كلمات، لا قوة فيها لتأمين إنسان على الإطلاق». معاينة لشكل النص.</div>\n<h5>جوه الكتب</h5><label class=\"tg\"><span>شرح «بالمصري»</span><input type=\"checkbox\" data-set=\"eg\"></label><label class=\"tg\"><span>طيّ «بالمصري» (يفتح باللمس)</span><input type=\"checkbox\" data-set=\"egfold\"></label><label class=\"tg\"><span>خرائط الحجة</span><input type=\"checkbox\" data-set=\"map\"></label><label class=\"tg\"><span>قسم «رأيي»</span><input type=\"checkbox\" data-set=\"op\"></label><label class=\"tg\"><span>مواضع الاقتباسات تحتها</span><input type=\"checkbox\" data-set=\"cite\"></label><label class=\"tg\"><span>اقتباسات بإطار بسيط</span><input type=\"checkbox\" data-set=\"qplain\"></label>\n<h5>التصفح</h5><label class=\"tg\"><span>شريط التقدم في المقالة</span><input type=\"checkbox\" data-set=\"bar\"></label><label class=\"tg\"><span>إخفاء الشريط العلوي وإنت نازل</span><input type=\"checkbox\" data-set=\"autohide\"></label><label class=\"tg\"><span>الرجوع لمكاني في كل مقالة</span><input type=\"checkbox\" data-set=\"restore\"></label>\n<h5>الصفحة الرئيسية</h5><label class=\"tg\"><span>إظهار الحكمة</span><input type=\"checkbox\" data-set=\"quote\"></label><label class=\"tg\"><span>الحركة (الظهور وعقرب الثواني الناعم)</span><input type=\"checkbox\" data-set=\"motion\"></label>\n<h5>بياناتك</h5><div class=\"ft\" style=\"margin-top:0\"><button type=\"button\" id=\"bk\">نسخة احتياطية</button><button type=\"button\" id=\"rs\">استرجاع نسخة</button></div><input type=\"file\" id=\"rf\" accept=\".json,.txt,application/json,text/plain\" hidden>\n<p class=\"note\">النسخة فيها مواضع القراءة والمفضلات والإعدادات.</p>\n<div class=\"ft\"><button type=\"button\" id=\"preset\">رجّع الإعدادات الأصلية</button><button type=\"button\" id=\"rprog\">امسح علامات القراءة</button></div>\n</div><div id=\"toast\"></div><div id=\"upd\" hidden><span>فيه نسخة جديدة</span><button type=\"button\">حدّث</button></div><div id=\"dimmer\"></div>");
 var P=document.getElementById('panel'),rf=document.getElementById('rf');
 P.addEventListener('input',function(e){var el=e.target,k=el.dataset&&el.dataset.set;if(!k)return;
  if(el.type==='range')U[k]=parseFloat(el.value);else if(el.type==='checkbox')U[k]=el.checked;apply();sv();});
 document.addEventListener('click',function(e){var t=e.target;
  if(t.closest('[data-act="gear"]')){openP(true);return;}
  if(t.id==='scrim'||t.id==='pclose'){openP(false);return;}
  var o=t.closest('#panel [data-v]');if(o){U[o.dataset.set]=o.dataset.v;apply();sv();return;}
  var z=t.closest('[data-fs]');if(z){U.fs=Math.max(14,Math.min(26,(U.fs||baseFs())+parseFloat(z.dataset.fs)));apply();sv();toast('حجم الخط '+fmt('fs',U.fs));return;}
  if(t.id==='preset'){var keep={};U=JSON.parse(JSON.stringify(DEF));M.U=U;apply();sv();toast('رجعت الإعدادات الأصلية');return;}
  if(t.id==='rprog'){if(confirm('تمسح علامات «قريتها» ومواضع القراءة في كل الكتب؟')){for(var i=localStorage.length-1;i>=0;i--){var k=localStorage.key(i);if(/-v1$/.test(k)&&!/^maher:/.test(k))localStorage.removeItem(k);}toast('اتمسحت علامات القراءة');subs.forEach(function(f){f(U,'progress');});}return;}
  if(t.id==='bk'){var d=JSON.stringify(dump(),null,1),name='maher-backup-'+new Date().toISOString().slice(0,10)+'.json';
   try{var f=new File([d],name,{type:'application/json'});if(navigator.canShare&&navigator.canShare({files:[f]})){navigator.share({files:[f],title:name}).catch(function(){});return;}}catch(x){}
   var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([d],{type:'application/json'}));a.download=name;document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove();},1000);toast('اتحفظت النسخة');return;}
  if(t.id==='rs'){rf.click();return;}
  if(t.id==='inst'&&dp){dp.prompt();dp.userChoice.then(function(){dp=null;document.getElementById('instw').hidden=true;});return;}
 });
 rf.addEventListener('change',function(){var f=rf.files[0];if(!f)return;f.text().then(function(t){var d=JSON.parse(t);if(!d||d.app!=='maher'||!d.data)throw 0;
  if(!confirm('الاسترجاع هيستبدل مواضع القراءة والمفضلات والإعدادات الحالية. تكمّل؟'))return;
  Object.keys(d.data).forEach(function(k){if(/^(maher:|leviathan-|diwan:)/.test(k))localStorage.setItem(k,d.data[k]);});
  if(!d.data['maher:ui']&&d.data['leviathan-ui'])localStorage.removeItem(KEY);
  location.reload();}).catch(function(){toast('الملف ده مش نسخة احتياطية صالحة');});rf.value='';});
 addEventListener('keydown',function(e){if(e.key==='Escape')openP(false);});
 addEventListener('resize',function(){if(!U.fs)apply();});
 addEventListener('storage',function(e){if(e.key===KEY){U=rd(KEY,U);for(var k in DEF)if(!(k in U))U[k]=DEF[k];M.U=U;apply();}});
 /* top bar: hairline on scroll + autohide */
 var tb=document.querySelector('.tb'),ly=0;
 addEventListener('scroll',function(){var y=scrollY;if(tb){tb.classList.toggle('sc',y>8);if(U.autohide)tb.classList.toggle('up',y>ly&&y>120);else tb.classList.remove('up');}ly=y;},{passive:true});
 /* install: offered on the home page only */
 addEventListener('beforeinstallprompt',function(e){e.preventDefault();dp=e;if(H.dataset.page==='home')document.getElementById('instw').hidden=false;});
 addEventListener('appinstalled',function(){document.getElementById('instw').hidden=true;});
 /* service worker + update prompt */
 if('serviceWorker' in navigator&&/^https?:/.test(location.protocol)){
  var rl=false;navigator.serviceWorker.addEventListener('controllerchange',function(){if(rl)return;rl=true;location.reload();});
  navigator.serviceWorker.register(ROOT+'sw.js',{scope:ROOT}).then(function(r){
   function show(){var b=document.getElementById('upd');if(!r.waiting||!navigator.serviceWorker.controller)return;b.hidden=false;b.querySelector('button').onclick=function(){b.hidden=true;r.waiting.postMessage('skip');};}
   show();r.addEventListener('updatefound',function(){var w=r.installing;if(w)w.addEventListener('statechange',function(){if(w.state==='installed')show();});});
  }).catch(function(){});}
 apply();
}
var M=window.MAHER={U:U,rd:rd,wr:wr,toast:toast,save:sv,apply:apply,baseFs:baseFs,on:function(f){subs.push(f);},open:openP,ROOT:ROOT};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
