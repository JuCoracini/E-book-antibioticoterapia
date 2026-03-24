/* js/sw.js - PWA (cache estático + atualização limpa) */

const VERSION = "v1.1.1";              // << aumente quando mudar CSS/JS
const CACHE_STATIC = `static-${VERSION}`;

const STATIC_ASSETS = [
  "./",
  "./index.html",
  "./css/base.css",
  "./css/components.css",
  "./js/app.js"
];

// Instalação: baixa essenciais e ativa imediatamente
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_STATIC)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Ativação: remove caches antigos e assume controle
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k.startsWith("static-") && k !== CACHE_STATIC)
          .map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch: cache-first para assets; navegação com fallback
self.addEventListener("fetch", (event) => {
  const req = event.request;

  // Navegação (HTML): tenta rede, cai para cache
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req).catch(() => caches.match("./index.html"))
    );
    return;
  }

  // Demais (CSS/JS/imagens): cache-first
  event.respondWith(
    caches.match(req).then((cached) => cached || fetch(req))
  );
});