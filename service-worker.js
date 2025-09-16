
const CACHE_NAME = 'void-runner-cache-v1';
const FILES_TO_CACHE = [
  'void-runner-pwa.html',
  'manifest.json',
  'service-worker.js',
  'icon-192.png',
  'icon-512.png'
];

self.addEventListener('install', (evt) => {
  evt.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(FILES_TO_CACHE);
  })());
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil((async () => {
    const keys = await caches.keys();
    for (const key of keys) {
      if (key !== CACHE_NAME) await caches.delete(key);
    }
  })());
  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  evt.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(evt.request);
    if (cached) return cached;
    try {
      const response = await fetch(evt.request);
      if (evt.request.url.startsWith(self.location.origin)) {
        cache.put(evt.request, response.clone());
      }
      return response;
    } catch (err) {
      if (evt.request.mode === 'navigate') return cache.match('void-runner-pwa.html');
      throw err;
    }
  })());
});
