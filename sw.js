// sw.js
const CACHE_NAME = 'chemin-v3'; 
const ASSETS_TO_CACHE = [
    'chemin-v1-a234e6789-66.html', // Sua página principal
    'offline.html',
    'logo.png',
    'ahistory.html',
    'acolection.html'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('CDLC: Guardando arquivos para uso offline...');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request).then((response) => {
                if (response) return response;
                if (event.request.mode === 'navigate') {
                    return caches.match('offline.html');
                }
            });
        })
    );
});
