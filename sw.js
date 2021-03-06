const OFFLINE_PAGES = [
  '/',
  '/index.html'
];

const VERSION = '0.0.1';
const CACHE_NAME = `Offline-Site-${VERSION}`;

self.addEventListener('install', event => {
  const TIME_STAMP = Date.now();
  
  event.waitUntil(
      caches.open(CACHE_NAME).then(cache => {
        return cache.addAll(OFFLINE_PAGES)
                    .then(() => self.skipWaiting());
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(CACHE_NAME)
          .then(cache => cache.match(event.request, {ignoreSearch: true}))
          .then(response => {
            console.log(`Serving ${event.request}`);
            
            return response || fetch(event.request);
          }));
});