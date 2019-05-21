importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

//Custom adjustments
const cache_name = 'events_cache_v3';
const queue = new workbox.backgroundSync.Queue('attendQueue');

self.addEventListener('fetch', async (e) => {
    if(e.request.url.endsWith('/api/events') || e.request.url.endsWith('/api/attending')){
        networkFallingBackToCacheWFU(e);
    }
    else if(e.request.url.endsWith('/api/attend')){
        await fetch(e.request.clone())
        .catch((err) => {
            self.clients.get(e.clientId).then(client => {
                client.postMessage("currently-offline")
            })
            return queue.pushRequest({request: e.request});
        })
    }
    else{
        const cachedResponse = await caches.match(e.request);
        return cachedResponse || fetch(e.request)
    }
});

//Custom caching strategy
function networkFallingBackToCacheWFU(event){
    event.respondWith(
        caches.open(cache_name).then(cache => {
            return fetch(event.request).then(networkResponse => {
                cache.put(event.request, networkResponse.clone());
                return networkResponse;
            }).catch(() => {
                self.clients.get(event.clientId).then(client => {
                    client.postMessage("currently-offline")
                })
                return caches.match(event.request);
            })
        })
    );
}

self.addEventListener("activate", function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cache_name !== cacheName && cacheName.startsWith("events_cache")) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });

self.addEventListener('sync', e => {
    e.waitUntil(() => {
        queue.replayRequests();
    }) 
})

workbox.precaching.precacheAndRoute([
  {
    "url": "asset-manifest.json",
    "revision": "e6e60e94e1a4834dcda65f89fc1f0b54"
  },
  {
    "url": "fallback.json",
    "revision": "ec035bfb57d5b974ad17c5f2ef98df61"
  },
  {
    "url": "index.html",
    "revision": "5095ef7f488d2b3ca9a8736381f8f5d3"
  },
  {
    "url": "manifest.json",
    "revision": "665e0761102026cda12df50006d20816"
  },
  {
    "url": "precache-manifest.ff3034c8f2983d98b711f6e0ddba5339.js",
    "revision": "ff3034c8f2983d98b711f6e0ddba5339"
  },
  {
    "url": "service-worker.js",
    "revision": "d22832cc97d9c50148389fab8eda6286"
  },
  {
    "url": "static/css/main.a35aeb38.chunk.css",
    "revision": "7bc2fdd7ff6e463f8237e8d4828ab027"
  },
  {
    "url": "static/js/2.8056d8af.chunk.js",
    "revision": "a588086f90cc1c8cd101a52ff63f3019"
  },
  {
    "url": "static/js/main.fb1de4a5.chunk.js",
    "revision": "3602a78dc570413ad5cc35a0d7444a98"
  },
  {
    "url": "static/js/runtime~main.a8a9905a.js",
    "revision": "238c9148d722c1b6291779bd879837a1"
  }
]);