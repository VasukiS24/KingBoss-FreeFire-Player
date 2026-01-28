const CACHE_NAME = "kingboss-cache-v1";
const urlsToCache = [
  "/index.html",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png",
  "/banner.jpg",
  "/map.jpg",
  "/prize.jpg",
  "/winner.jpg",
  "/feature.jpg",
  "/insta-icon.png",
  "/date.png",
  "/game.png",
  "/entry.png"
];

// Install service worker and cache files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting()) // Activate new SW immediately
  );
});

// Activate and clean old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }))
    ).then(() => self.clients.claim())
  );
});

// Fetch cached files or network
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request).catch(() => {
        // Optional: fallback image for offline
        if (event.request.destination === 'image') {
          return caches.match('/banner.jpg');
        }
      }))
  );
});
