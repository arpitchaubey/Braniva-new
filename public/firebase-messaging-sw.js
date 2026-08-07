// Firebase Messaging Service Worker
// Self-registering service worker stub to support push notifications & PWA compatibility
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body || 'New notification from Braniva',
      icon: '/logo.png',
      badge: '/logo-16.png',
    };
    event.waitUntil(self.registration.showNotification(data.title || 'Braniva', options));
  }
});
