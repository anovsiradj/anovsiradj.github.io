/*
Min, Mei 14 2017 00:46:27

USAGE:
IFAX(url).yes|no(callback).run()

TODO:
real yes() and no(),
because i still cannot figure it out how to handle iframe.onload() and iframe.onerror(),
iframe.onload() always called event it's error (404, no network connection, etc).
*/

;(function(w,d) {
	'use strict';

	function MyApp(url_target) {
		this.url_target = url_target;
		this.fn_callback_yes = new Array();
		this.fn_callback_no = new Array();
		this.make_element();
		this.is_error = false;
	}

	MyApp.prototype.make_element = function() {
		this.iframe = d.createElement('iframe');
		this.iframe.style.display = 'none';

		var self_this = this;

		this.iframe.addEventListener('error', function() {
			self_this.trigger_no();
			self_this.is_error = true;
		});

		this.iframe.addEventListener('load', function() {
			if (self_this.is_error) return;
			// console.log(self_this.iframe);
			// console.log(this.contentDocument.contentType);
			// console.log(this.contentDocument.activeElement.innerHTML);
			var type = this.contentDocument.contentType;
			var result;
			if (/(text|json)/.test(type)) {
				if (/(ht|x)m?l/.test(type)) {
					result = this.contentDocument.body.innerHTML;
				} else {
					result = this.contentDocument.body.children[0].innerHTML;
				}
				self_this.trigger_yes(result);
			} else {
				console.error('IFAX: Request is not text-based file.');
			}
		});
	};

	MyApp.prototype.run = function() {
		this.iframe.src = this.url_target;
		d.body.appendChild(this.iframe);
	};

	MyApp.prototype.yes = function(callback_yes) {
		if (callback_yes) {
			this.fn_callback_yes.push(callback_yes);
		}
		return this;
	};
	MyApp.prototype.no = function(callback_no) {
		if (callback_no) {
			this.fn_callback_no.push(callback_no);
		}
		return this;
	};
	MyApp.prototype.trigger_yes = function(result) {
		for (var i = 0; i < this.fn_callback_yes.length; i++) {
			this.fn_callback_yes[i](result);
		}
	};
	MyApp.prototype.trigger_no = function() {
		for (var i = 0; i < this.fn_callback_no.length; i++) {
			this.fn_callback_no[i]();
		}
	};

	w.IFAX = function(url_target) {
		return (new MyApp(url_target));
	};
})(window, document);
