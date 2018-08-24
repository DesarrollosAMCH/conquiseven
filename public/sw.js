var CACHE_NAME = 'my-site-cache-v1'
var urlsToCache = [
  '/clubes',
  '/eventos',
  '/evaluar',
  '/app.js',
  '/img/background.053100b1.jpg',
  '/img/logo-conquistadores.9223f1b5.jpg',
  '/img/logo_convencion.074390ed.png',
  'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic',
  'https://use.fontawesome.com/releases/v5.0.8/css/all.css',
  'https://use.fontawesome.com/releases/v5.0.8/webfonts/fa-solid-900.woff2',
  'https://use.fontawesome.com/releases/v5.0.8/webfonts/fa-solid-900.woff',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v41/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'
]

self.addEventListener('install', function (event) {
  console.log("Cache open!")
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log("Cache work!")
        return cache.addAll(urlsToCache)
      })
  )
})

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
