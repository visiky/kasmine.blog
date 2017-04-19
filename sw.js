/* ===========================================================
 * sw.js
 * ========================================================== */

const version = "1.0.0",
  CACHE = "precache." + version,
  RUNTIME = "runtime",
  ROOT = "/kasmine.blog",
  ASSETS = `${ROOT}/assets`
HOSTNAME_WHITELIST = [self.location.hostname],
offlineURL = `${ROOT}/offline.html`,
installFilesEssential = [
  // `${ASSETS}/css/bootstrap.css`, `${ASSETS}/css/kasmine-blog.css`,
  // `${ASSETS}/css/style.css`,
  `${ASSETS}/img/Calendar.svg`,
  `${ASSETS}/img/home-bg.jpg`,
  `${ASSETS}/img/avatar-kasmine.jpg`,
  `${ROOT}/pwa/manifest.json`
].concat(offlineURL),
installFilesDesirable = [`${ASSETS}/img/404-bg.jpg`];

function installStaticFiles() {
  return caches.open(CACHE) // create a new cache
    .then(cache => {
    /**
          *　@param {array} request URLs;return {Promise}
          **/
    cache.addAll(installFilesDesirable);
    return cache.addAll(installFilesEssential);
  })
}

/**
 *  @Lifecycle Install
 *  waitUntil() : installing ====> installed
 *  skipWaiting() : waiting(installed) ====> activating
 */
self.addEventListener('install', e => {

  /* cache core files */
  e.waitUntil(installStaticFiles().then(cache => self.skipWaiting()));
});

function clearOldCaches() {
  return caches
    .keys()
    .then(keylist => {
      return Promise.all(keylist.filter(key => key != CACHE)
      /**
        * @param cache entry
        * retrun {Promise}
        **/
        .map(key => caches.delete(key)));
    });
}
self.addEventListener("activate", event => {
  console.log("service worker :activated");

  event.waitUntil(
  // clearOldCaches() 设置本身为 active 的service worker　?TODO:作用? .then(() =>
  // self.clients.claim())
  self.clients.claim());
});

// A navigate request is created only while navigating between documents. The
// Util Function to detect and polyfill req.mode="navigate" request.mode of
// 'navigate' is unfortunately not supported in Chrome versions older than 49.0,
// so we need to include a less precise fallback, which checks for a GET request
// with an Accept: text/html header.
const isNavigationReq = (req) => (req.mode === 'navigate' || (req.method === 'GET' && req.headers.get('accept').includes('text/html')));

const getFixedUrl = (req) => {
  var now = Date.now(),
    url = new URL(req.url);

  url.protocol = self.location.protocol;
  url.search += (url.search
    ? '&'
    : '?') + 'cache-bust=' + now;

  return url.href;
}

self.addEventListener('fetch', event => {

  // e.g.,[cors, no-cors, cors-with-forced-preflight, same-origin, or navigate.]
  // console.log(`MODE: ${event.request.mode}`); // no-cors Skip  non-GET requests
  // and some of cross-origin requests, like those for Google Analytics.
  if (event.request.method !== "GET" || HOSTNAME_WHITELIST.indexOf(new URL(event.request.url).hostname) == -1) 
    return;
  
  // logs for debugging console.log(`fetch ${event.request.url}`);
  const cached = caches.match(event.request);
  const fixedUrl = getFixedUrl(event.request);
  const fetched = fetch(fixedUrl, {cache: "no-store"});
  const fetchedCopy = fetched.then((response) => response.clone());

  // event.respondWith(   caches.match(event.request).then(function(response) {
  //  return response || fetch(event.request).then(function(response) {       //
  // console.log('Response from network is:', response);       return response;
  //  }).catch(function(error) {       // console.error('Fetching failed:',
  // error);       caches.match(offlineURL);     });   }) ); check if there is
  // something in cache if not,about to fetch from network if neither yields a
  // response,return offline-pages USE PROMISE!
  event.respondWith(Promise.race([fetched.catch(() => cached), cached]).then(response => response || fetched).catch(() => caches.match(offlineURL)));

  // Update the cache with the version we fetched (only for ok status)
  event.waitUntil(Promise.all([
    fetchedCopy, caches.open(RUNTIME)
  ])
  /**
       * The put() method of the Cache interface allows key/value pairs to be added to the current Cache object. @param {URL,RESPONSE}
       */
    .then(([response, cache]) => response.ok && cache.put(event.request, response)).catch(() => {/* eat any errors */
  }));

});
