self.addEventListener('install', (e)=>{
  e.waitUntil(caches.open('wp-stats-cache-v8').then(c=>c.addAll([
    './','./index.html','./manifest.json','./sw.js','./icon-192.png','./icon-512.png'
  ])));
});
self.addEventListener('fetch', (event)=>{
  event.respondWith(caches.match(event.request).then(resp => resp || fetch(event.request)));
});