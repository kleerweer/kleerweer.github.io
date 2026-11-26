// Kleerweer service worker: app werkt ook zonder verbinding (met het laatst opgehaalde weer).
// v2: haalt de app altijd vers op als er internet is, zodat een update meteen zichtbaar is.
const CACHE = 'kleerweer-v2';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icons/icon-180.png', './icons/icon-192.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const u = new URL(r.url);

  // Weer en teller: nooit uit de bewaarde kopie.
  if (u.hostname.endsWith('open-meteo.com') || u.hostname.endsWith('goatcounter.com') || u.hostname === 'gc.zgo.at') return;

  // Eigen bestanden: eerst vers van internet (zonder tussenopslag), anders de bewaarde kopie.
  if (u.origin === location.origin) {
    e.respondWith(
      fetch(new Request(r.url, { cache: 'no-store', credentials: 'same-origin' }))
        .then(res => {
          if (res.ok) { const cp = res.clone(); caches.open(CACHE).then(c => c.put(r, cp)); }
          return res;
        })
        .catch(() => caches.match(r).then(m => m || caches.match('./index.html')))
    );
    return;
  }

  // Lettertypes: uit de bewaarde kopie als die er is.
  if (u.hostname.includes('fonts.googleapis.com') || u.hostname.includes('fonts.gstatic.com')) {
    e.respondWith(
      caches.match(r).then(m => m || fetch(r).then(res => {
        const cp = res.clone(); caches.open(CACHE).then(c => c.put(r, cp)); return res;
      }))
    );
  }
});
