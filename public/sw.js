/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "fallback.json",
    "revision": "ec035bfb57d5b974ad17c5f2ef98df61"
  },
  {
    "url": "images/icons/icon-128x128.png",
    "revision": "95a1a79720117f86120d334eef4f3735"
  },
  {
    "url": "images/icons/icon-144x144.png",
    "revision": "513c1137c972e47761c8078939b43999"
  },
  {
    "url": "images/icons/icon-152x152.png",
    "revision": "e09efdf16fffb86ce4e768d6c190f8b3"
  },
  {
    "url": "images/icons/icon-192x192.png",
    "revision": "f09324d55f32000ea9ff278d7d743e12"
  },
  {
    "url": "images/icons/icon-384x384.png",
    "revision": "a32f607a781770425f09adfde4afdd8e"
  },
  {
    "url": "images/icons/icon-512x512.png",
    "revision": "b1395d111a19fb228a4b5b27ea269ba6"
  },
  {
    "url": "images/icons/icon-72x72.png",
    "revision": "8d92558c075f9e9c249dd1738077241c"
  },
  {
    "url": "images/icons/icon-96x96.png",
    "revision": "08c1c643ed1aec4ae95adeb2ae3a9b41"
  },
  {
    "url": "index.html",
    "revision": "a745c688853028c07419f6aa24f968f5"
  },
  {
    "url": "manifest.json",
    "revision": "665e0761102026cda12df50006d20816"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
