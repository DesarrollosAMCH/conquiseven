const OFFLINE_URL = '/evaluar-offline';
var CACHE_NAME = 'my-site-cache-v1'
var urlsToCache = [
  /*
  '/clubes',
  '/eventos',
  '/evaluar',
  '/evaluar-offline',
  '/app.js',
  '/img/background.053100b1.jpg',
  '/img/logo-conquistadores.9223f1b5.jpg',
  '/img/logo_convencion.074390ed.png',
  */
  
  'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic',
  'https://use.fontawesome.com/releases/v5.0.8/css/all.css',
  'https://use.fontawesome.com/releases/v5.0.8/webfonts/fa-solid-900.woff2',
  'https://use.fontawesome.com/releases/v5.0.8/webfonts/fa-solid-900.woff',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v41/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
  
  // PROD
  'https://amch.conquistadores.club/clubes',
  'https://amch.conquistadores.club/eventos',
  'https://amch.conquistadores.club/evaluar',
  'https://amch.conquistadores.club/evaluar-offline',
  'https://amch.conquistadores.club/app.js',
  'https://amch.conquistadores.club/css/app.3b930dfa.css',
  'https://amch.conquistadores.club/css/chunk-vendors.697b2907.css',
  'https://amch.conquistadores.club/img/background.053100b1.jpg',
  'https://amch.conquistadores.club/img/logo-conquistadores.9223f1b5.jpg',
  'https://amch.conquistadores.club/img/logo_convencion.074390ed.png',
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


/*
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
*/

self.addEventListener('fetch', (event) => {
  const requestURL = new URL(event.request.url);
  
  if (requestURL.origin === location.origin) {
    // Load static assets from cache if network is down
    if (/\.(css|js|woff|woff2|ttf|eot|svg)$/.test(requestURL.pathname)) {
      event.respondWith(
        caches.open(CACHE_NAME).then(cache =>
          caches.match(event.request).then((result) => {
            if (navigator.onLine === false) {
              // We are offline so return the cached version immediately, null or not.
              return result;
            }
            // We are online so let's run the request to make sure our content
            // is up-to-date.
            return fetch(event.request).then((response) => {
              // Save the result to cache for later use.
              cache.put(event.request, response.clone());
              return response;
            });
          }),
        ),
      );
      return;
    }
  }
  
  if (event.request.mode === 'navigate' && navigator.onLine === false) {
    // Uh-oh, we navigated to a page while offline. Let's show our default page.
    event.respondWith(caches.match(OFFLINE_URL));
    return;
  }
  
  // Passthrough for everything else
  event.respondWith(fetch(event.request));
});
