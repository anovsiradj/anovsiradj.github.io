const CACHE_NAME = 'resume-cache-v1';
const ASSETS = [
    // './resume.html',
    './index.js',
    './index.less',
    './my-header.vue',
    './my-about.vue',
    './my-experiences.vue',
    './my-competences.vue',
    './my-random.vue',
    './my-footer.vue',
    './darkmode.js',
    './pdf-export.js',
    // './webapp.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request);
        })
    );
});
