const cacheName = 'corniche-v1';
const offlinePage = './offline.html'; // Crie este arquivo!
const assets = ['./', './chemin-v1-a234e6789-66.html',', offlinePage, './css/style.css'];

// No Install: Adicione a página offline ao cache
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(assets))
  );
});

// No Fetch: Se falhar a rede e o cache, mostra a página offline
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request).catch(() => {
        // Se for uma navegação de página, mostra o offline.html
        if (e.request.mode === 'navigate') {
          return caches.match(offlinePage);
        }
      });
    })
  );
});
