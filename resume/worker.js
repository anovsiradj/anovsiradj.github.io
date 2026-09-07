const CACHE_NAME = 'resume-cache-v2';
const ASSETS = [
    './db.json',
    './index.js',
    './index.less',
    './my-header.vue',
    './my-about.vue',
    './my-experiences.vue',
    './my-competences.vue',
    './my-random.vue',
    './my-footer.vue',
    './darkmode.js',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.match(event.request).then((cached) => {
                const fetched = fetch(event.request).then((response) => {
                    if (response && response.status === 200) {
                        cache.put(event.request, response.clone());
                    }
                    return response;
                }).catch(() => cached);

                return cached || fetched;
            });
        })
    );
});
