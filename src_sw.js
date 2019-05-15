importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

//Custom adjustments
const cache_name = 'events_cache_v2';

self.addEventListener('fetch', async (event) => {
    if (event.request.url.endsWith('/api/events') || event.request.url.endsWith('/api/attending')) {
        networkFallingBackToCacheWFU(event)
    }
    const cachedResponse = await caches.match(event.request);
    return cachedResponse || fetch(event.request);
});

const showNotification = () => {
    self.registration.showNotification('Post Sent', {
        body: 'You are back online and your post was successfully sent!',
    });
};

const bgSyncPlugin = new workbox.backgroundSync.Plugin('EventQueue', {
    maxRetentionTime: 24 * 60, // Retry for max of 24 Hours

    callbacks: {
        queueDidReplay: showNotification
    }
});

workbox.routing.registerRoute(
    '/api/attend',
    new workbox.strategies.NetworkOnly({
        plugins: [bgSyncPlugin]
    }),
    'POST'
);

function networkFallingBackToCacheWFU(event) {
    event.respondWith(
        caches.open(cache_name).then(cache => {
            return fetch(event.request).then(networkResponse => {
                cache.put(event.request, networkResponse.clone());
                return networkResponse;
            }).catch(() => {
                return caches.match(event.request);
            })
        })
    );
}

workbox.precaching.precacheAndRoute([]);