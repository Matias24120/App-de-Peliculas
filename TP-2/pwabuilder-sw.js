// This is the "Offline copy of pages" service worker

const CACHE = "pwabuilder-offline";

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener(`install`,()=>{
	//Guardo los archivos en el cache
	const cache = caches.open('mi-cache-1').then( cache => {
	// Guarda los datos del caché necesario para que la app funciones sin conexión
	return cache.addAll(['/','index.html', 'css/style.css' , 'detalle.html' ,'js/main.js','js/detalle.js', 'js/bootstrap.bundle.min.js', 'img/favoritos.png' ]);
})
// Espera hasta que la promesa se resuelva
event.waitUntil( cache)
})

self.addEventListener(`fetch`, (event) => {
  // Aplicar estrategia del caché si falla la web
  const respuestaCache = caches.match(event.request).then((res) => {
    if (res) {
      return res;
    } else {
      // Si no, hacemos un fetch
      return fetch(event.request).then((respuesta) => {
        return respuesta;
      });
    }
  });

  event.respondWith(respuestaCache);
});


workbox.routing.registerRoute(
  new RegExp('/*'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE
  })
);