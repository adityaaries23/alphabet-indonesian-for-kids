/**
 * Service worker: caches the app shell on first visit so the app works offline.
 * Online, app files always come from the network, so changes show up on the
 * next open. Bump CACHE_VERSION when the APP_SHELL list changes.
 */
const CACHE_VERSION = 'v7';
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
            // 'reload' skips the browser's HTTP cache, so a new version never
            // gets filled with files left over from the previous one
            .then((cache) => cache.addAll(APP_SHELL.map((url) => new Request(url, { cache: 'reload' }))))
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

// App files: network first, so a new version shows up on the next open; the
// cache is the fallback when offline. Recorded clips: cache first.
self.addEventListener('fetch', (event) => {
    const { request } = event;
    if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;

    if (request.url.includes('/assets/audio/')) {
        event.respondWith(
            caches.match(request).then((cached) => cached || fetch(request).then((response) => {
                // Keep recorded voice clips for offline use once they've played
                if (response.ok) {
                    const copy = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
                }
                return response;
            }))
        );
        return;
    }

    event.respondWith(
        fetch(request, { cache: 'no-cache' }).then((response) => {
            if (response.ok) {
                const copy = response.clone();
                caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
            }
            return response;
        }).catch(() =>
            caches.match(request, { ignoreSearch: true }).then((cached) => {
                if (cached) return cached;
                // Offline and not cached: page navigations still get the app
                if (request.mode === 'navigate') return caches.match('./index.html');
                return Response.error();
            })
        )
    );
});
