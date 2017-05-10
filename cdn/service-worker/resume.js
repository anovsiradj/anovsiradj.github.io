// https://github.com/mdn/sw-test/blob/gh-pages/sw.js
// https://googlechrome.github.io/samples/service-worker/custom-offline-page/index.html

'use strict';

const CACHE_VERSION = 'resume-v1.0.2'; // local-network

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

self.addEventListener('fetch', function(event) {
	/*
	var response;
	event.respondWith(caches.match(event.request).catch(function() {
		return fetch(event.request);
	}).then(function(rspns) {
		response = rspns;
		caches.open(CACHE_VERSION).then(function(cache) {
			cache.put(event.request, response);
		});
		return response.clone();
	}).catch(function() {
	  return caches.match(CACHE_PAGE_DEFAULT);
	}));
	*/

	console.log('sw-fetch: ', event.request.url);

	event.respondWith(
		caches.match(event.request).then(function(response) {
			caches.open(CACHE_VERSION).then(function(cache) {
				cache.put(event.request, response);
			});
			return response;
		}).catch(function() {
			return fetch(event.request).then(function(response) {
				return response;
			});
		})
	);

	/*

	event.respondWith(caches.match(event.request).catch(function() {
		console.log('sw-fetch (network):', event.request);
		return fetch(event.request);
	}).then(function(response) {
		console.log('sw-fetch-serve: ', response);

		caches.open(CACHE_VERSION).then(function(cache) {
			cache.put(event.request, response);
		});

		return response;

		console.log('sw-fetch: network');

		return fetch(event.request).then(function(response) {
			return response;
		}).catch(function(error) {
			console.error('sw-fetch-serve network-failed: ', error);
			throw error;
		});
	}));
	*/
});

