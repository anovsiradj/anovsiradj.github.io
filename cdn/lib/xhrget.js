/*
by anovsiradj (mayendra costanov) <anov.siradj22@gmail.com>
revision: 20180102184810
--------------------------------------------------
simple use of XMLHttpRequest for GET (or HEAD) with
explicit usage.
*/

(function() {
	'use strict';

	/*
	refferences:
	https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
	https://devdocs.io/http/response_codes
	*/

	var XHRGET = (function() {
		function load(xhr, callback) {
			/*
			--------------------------------------------------
			if `responseheader:Content-Type` is match `/json/`
			then parse it to JSON.
			if responseXML isnot NULL => yes
			anything else, is responseText.
			*/
			var mime = xhr.getResponseHeader('Content-Type');
			var result;
			if (/json/.test(mime)) { // sadly, there's no such thing like `responseJSON`
				try {
					result = JSON.parse(xhr.response);
				} catch(e) {
					if (xhr._failed) {
						xhr._failed(e.message, xhr);
						return;
					}
				}
			} else if (xhr.responseXML !== null) { // https://devdocs.io/dom/xmlhttprequest/responsexml
				result = xhr.responseXML;
			} else {
				result = xhr.responseText;
			}
			/*
			--------------------------------------------------
			accept http `Successful` and `Redirection` response,
			basically `200` and `304` is what i need.
			*/
			if (xhr.status >= 200 && xhr.status < 400) {
				callback(result, xhr);
			} else {
				if (xhr._failed) {
					error(xhr, xhr._failed);
				}
			}
		}
		function error(xhr, callback) {
			callback(xhr.statusText, xhr);
		}

		/*
		--------------------------------------------------
		because __* is reserved name-format by javascript,
		so i use _* as custom variable name
		*/
		return function(target, loaded, failed, alt_method) {
			var method = alt_method ? 'head' : 'get';
			var xhr = new XMLHttpRequest();

			if (failed) {
				xhr._failed = failed;
				xhr.addEventListener('error', function() {
					error(this, failed);
				});
				xhr.addEventListener('abort', function() {
					error(this, failed);
				});
			}

			if (loaded) {
				xhr._loaded = loaded;
				xhr.addEventListener('load', function() {
					load(this, loaded);
				});
			}

			if (target) {
				xhr.open(method, target);
				xhr.send(null);
			}

			/*
			--------------------------------------------------
			to allow, manually custom xhr request if target is
			not set. for example: if i need to add custom header
			request, i'll pass target with false|null and set it later.
			*/
			return xhr;
		}
	})();

	/**
	--------------------------------------------------
	Make this script support in both Browser and Node.js
	by simply checking `module.exports` availability
	*/
	if (typeof module !== 'undefined' &&
		  typeof exports !== 'undefined' &&
		  module.hasOwnProperty('exports') &&
		  module.exports === exports) {
		module.exports = XHRGET;
	} else {
		window.XHRGET = XHRGET;
	}

})();
