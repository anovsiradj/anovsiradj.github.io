// https://github.com/mdn/sw-test/blob/gh-pages/sw.js
// https://googlechrome.github.io/samples/service-worker/custom-offline-page/index.html

'use strict';

const CACHE_VERSION = 'resume-v1.0.3'; // local-network

let CACHE_PAGE_DEFAULT = '/resume.html';

this.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(CACHE_VERSION).then(function(cache) {
			return cache.addAll([
				CACHE_PAGE_DEFAULT,
				'/cdn/lib/w3l3k.js'
			]);
		})
	);
});

this.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request).catch(function() {
			return fetch(event.request);
		}).then(function(response) {
			caches.open(CACHE_VERSION).then(function(cache) {
				cache.put(event.request, response);
			});
			return response;
		}).catch(function() {
			return caches.match(CACHE_PAGE_DEFAULT);
		})
	);
});
