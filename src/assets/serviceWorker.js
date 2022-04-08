'use strict';

var cacheVersion = 1;

var currentCache = {
  offline: 'ts-cache-' + cacheVersion
};

const offlineUrl = 'offline-page.html';

this.addEventListener('install', event => {
  event.waitUntil(
    caches.open(currentCache.offline).then(function(cache) {
      return cache.addAll([
          "/manifest.json",
          "/stylesheets/main.css",
          "/javascripts/main.js",
          "/images/favicon.svg",
          "/images/background-top.svg",
          "/images/background-bottom.svg",
          "/images/clients/trevor-saint.svg",
          "/images/icon-192x192.png",
          "/images/maskable-icon-192x192.png",
          "/images/icon-257x257.png",
          "/images/icon-512x512.png",
          "/fonts/Baskerville.woff2",
          "/fonts/Moderat-Bold.woff2",
          "/fonts/Moderat-Regular.woff2",
          offlineUrl
      ]);
    })
  );
});

this.addEventListener('fetch', event => {
  // Request.mode = navigate isn’t supported in all browsers so include a check for Accept: text/html header.
  if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
        event.respondWith(
          fetch(event.request.url).catch(error => {
              // Return the offline page
              return caches.match(offlineUrl);
          })
    );
  }
  else {
    // Respond with everything else if we can
    event.respondWith(caches.match(event.request)
        .then(function (response) {
        return response || fetch(event.request);
      })
    );
  }
});