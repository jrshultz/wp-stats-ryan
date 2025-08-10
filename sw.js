const CACHE = 'wp-v24';
self.addEventListener('install',e=>{self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['./','./index.html','./manifest.json','./sw.js','./icon-192.png','./icon-512.png'])))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))); self.clients.claim();});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))})
function updatePrintHeader() {
  const date = document.querySelector('input[type="date"]')?.value || '';
  const opponent = document.querySelector('input[placeholder="Opponent"]')?.value || '';
  const time = document.querySelector('.timer .time')?.textContent || '';

  // Customize this string to your exact preference
  const headerText = `Ryan Shultz — Mira Costa — ${date} — ${opponent || 'Opponent'} — Playing time: ${time}`;
  document.getElementById('print-header').textContent = headerText;
}

// Update on load and before print
document.addEventListener('DOMContentLoaded', updatePrintHeader);
window.addEventListener('beforeprint', updatePrintHeader);
