/**
 * Service worker: caches the app shell on first visit so the app works offline.
 * Bump CACHE_VERSION whenever any file in APP_SHELL changes, so returning
 * visitors pick up the new files.
 */
const CACHE_VERSION = 'v4';
const CACHE_NAME = `alfabet-${CACHE_VERSION}`;

const APP_SHELL = [
    './',
    './index.html',
    './manifest.json',
    './css/styles.css',
    './js/data.js',
    './js/voice.js',
    './js/app.js',
    './assets/favicon.png',
    './assets/icons/apple-touch-icon.png',
    './assets/icons/icon-192.png',
    './assets/icons/icon-512.png',
    './assets/icons/icon-maskable-192.png',
    './assets/icons/icon-maskable-512.png',
    './assets/fonts/nunito-latin.woff2',
    './assets/fonts/nunito-latin-ext.woff2'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(APP_SHELL))
            .then(() => self.skipWaiting())
    );
});

// Remove caches from older versions
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((keys) => Promise.all(
                keys
                    .filter((key) => key.startsWith('alfabet-') && key !== CACHE_NAME)
                    .map((key) => caches.delete(key))
            ))
            .then(() => self.clients.claim())
    );
});

// Cache-first: serve from cache, fall back to the network
self.addEventListener('fetch', (event) => {
    const { request } = event;
    if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;

    event.respondWith(
        caches.match(request, { ignoreSearch: true }).then((cached) => {
            if (cached) return cached;
            return fetch(request).then((response) => {
                // Keep recorded voice clips for offline use once they've played
                if (response.ok && request.url.includes('/assets/audio/')) {
                    const copy = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
                }
                return response;
            }).catch(() => {
                // Offline and not cached: page navigations still get the app
                if (request.mode === 'navigate') return caches.match('./index.html');
                return Response.error();
            });
        })
    );
});
