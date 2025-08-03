self.addEventListener('install', (event) => {
  console.log('Service worker installing...');
  // Add a call to skipWaiting here
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service worker activating...');
});

self.addEventListener('fetch', (event) => {
  // We are not adding caching logic here to keep it simple,
  // but this file is required for PWA installability.
  return;
});
