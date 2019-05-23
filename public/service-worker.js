importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

//Custom adjustments
const cache_name = 'events_cache_v4';
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

workbox.precaching.precacheAndRoute([]);