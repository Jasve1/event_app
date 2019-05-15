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

//Custom caching strategy
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

workbox.precaching.precacheAndRoute([]);