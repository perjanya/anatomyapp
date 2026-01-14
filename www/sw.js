// Service Worker for PWA offline support
const CACHE_NAME = 'anatomy-hub-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/embryology.html',
  '/upper-limb.html',
  '/css/style.css',
  '/css/anatomy-modern.css',
  '/js/toc.js',
  '/js/interactive-features.js',
  '/js/app-init.js',
  '/js/topic-tools.js',
  '/data/toc.json',
  '/manifest.json'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(URLS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Activate event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - Network first, fallback to cache
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip cross-origin requests
  if (!event.request.url.includes(self.location.origin)) return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Cache successful responses
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => cache.put(event.request, responseToCache));
        }
        return response;
      })
      .catch(() => {
        // Return cached version on network error
        return caches.match(event.request)
          .then(response => response || new Response('Offline - content not available'));
      })
  );
});
