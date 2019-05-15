importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

//Custom adjustments
const cache_name = 'events_cache_v2';

self.addEventListener('fetch', async (event) => {
    if(event.request.url.endsWith('/api/events') || event.request.url.endsWith('/api/attending')){
        networkFallingBackToCacheWFU(event)
    }
    const cachedResponse = await caches.match(event.request);
    return cachedResponse || fetch(event.request);
});

function networkFallingBackToCacheWFU(event){
    event.respondWith(
        caches.open(cache_name).then(cache => {
            return fetch(event.request).then(networkResponse => {
                cache.put(event.request, networkResponse.clone());
                return networkResponse;
            }).catch(() => {
                self.clients.get(event.clientId).then(client => {
                    client.postMessage("currently-offline");
                })
                return caches.match(event.request);
            })
        })
    );
}

workbox.precaching.precacheAndRoute([
  {
    "url": "fallback.json",
    "revision": "ec035bfb57d5b974ad17c5f2ef98df61"
  },
  {
    "url": "index.html",
    "revision": "3ea4b24d30b28daf6172f83b0b50c84d"
  },
  {
    "url": "manifest.json",
    "revision": "63681b97a484cf7c3f7e752783cdce3f"
  }
]);