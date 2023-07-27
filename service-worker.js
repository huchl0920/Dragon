// service-worker.js

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");
importScripts("/Dragon/precache-manifest.5664db59b365cde4c414901c64b0da8c.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// 修改 fetch 事件的處理邏輯
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      }

      // 捕捉到 404 錯誤頁面的請求
      if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
        // 將用戶重新導向到 SPA 的首頁
        return fetch('/Dragon/index.html');
      }

      return fetch(event.request);
    })
  );
});

workbox.core.clientsClaim();

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("/Dragon/index.html"), {
  blacklist: [/^\/_/,/\/[^/?]+\.[^/]+$/],
});
