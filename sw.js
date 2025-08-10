const CACHE = 'wp-v24';
self.addEventListener('install',e=>{self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['./','./index.html','./manifest.json','./sw.js','./icon-192.png','./icon-512.png'])))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))); self.clients.claim();});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))})
function updatePrintHeader() {
  const date = document.getElementById('date')?.value || '';
  const opponent = document.getElementById('opponent')?.value || '';
  const time = document.querySelector('.timer .time')?.textContent || '00:00';
  const header = `Ryan Shultz — Mira Costa — ${date} — ${opponent || 'Opponent'} — Playing time: ${time}`;
  const el = document.getElementById('print-header');
  if (el) el.textContent = header;
}

// IMPORTANT: call print directly from the click handler (no awaits/timers)
const printBtn = document.getElementById('print');
if (printBtn) {
  printBtn.addEventListener('click', () => {
    updatePrintHeader();   // set the text first
    window.print();        // then print immediately (keeps iOS happy)
  });
}

// As a fallback (if user prints via browser menu), keep header fresh:
window.addEventListener('beforeprint', updatePrintHeader);
