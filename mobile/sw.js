// Minimal service worker scaffold — extend for caching and push (FCM) handling.
const CACHE_NAME = 'heliosmed-v1';
const ASSETS = [ '/', '/mobile/index.html', '/mobile/style.css', '/mobile/app.js' ];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)).catch(()=>{}));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  // simple network-first for dynamic content
  event.respondWith(fetch(event.request).catch(()=> caches.match(event.request)));
});

self.addEventListener('push', event => {
  const data = event.data ? event.data.text() : 'New notification';
  const title = 'Heliosmed';
  const options = { body: data, icon: '/mobile/assets/logo.jpg' };
  event.waitUntil(self.registration.showNotification(title, options));
});
