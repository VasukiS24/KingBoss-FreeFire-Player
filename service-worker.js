const CACHE_NAME = "kingboss-cache-v1";
const urlsToCache = [
  "/KingBoss-FreeFire-Player/",
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

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
