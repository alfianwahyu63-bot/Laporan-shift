/* Sales Shift PWA — static, privacy-first offline app shell. Input data stays in browser localStorage. */
const CACHE_NAME='sales-shift-shell-v1.0.0';
const CACHE_PREFIX='sales-shift-shell-';
const ASSETS=[
 './',
 './index.html',
 './manifest.webmanifest',
 './icons/icon-192.png',
 './icons/icon-512.png',
 './icons/icon-maskable-512.png',
 './icons/icon-180.png',
 './screenshots/desktop.png',
 './screenshots/mobile.png'
];
self.addEventListener('install',event=>{
 event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(ASSETS)));
});
self.addEventListener('activate',event=>{
 event.waitUntil((async()=>{
  const names=await caches.keys();
  await Promise.all(names.filter(name=>name.startsWith(CACHE_PREFIX)&&name!==CACHE_NAME).map(name=>caches.delete(name)));
  await self.clients.claim();
 })());
});
self.addEventListener('message',event=>{
 if(event.data?.type==='SKIP_WAITING') self.skipWaiting();
});
self.addEventListener('fetch',event=>{
 const req=event.request;
 if(req.method!=='GET')return;
 const url=new URL(req.url);
 if(url.origin!==self.location.origin) return;
 if(req.mode==='navigate'){
  event.respondWith((async()=>{
   try{
    const response=await fetch(req);
    if(response.ok){const cache=await caches.open(CACHE_NAME);await cache.put('./index.html',response.clone());}
    return response;
   }catch(_){return (await caches.match('./index.html'))||Response.error();}
  })());
  return;
 }
 event.respondWith((async()=>{
  const cached=await caches.match(req);
  if(cached)return cached;
  try{return await fetch(req);}catch(_){return Response.error();}
 })());
});
