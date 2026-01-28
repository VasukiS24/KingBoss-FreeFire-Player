self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("kingboss-cache").then(cache => {
      return cache.addAll([
        "./",
        "./index.html"
      ]);
    })
  );
});
