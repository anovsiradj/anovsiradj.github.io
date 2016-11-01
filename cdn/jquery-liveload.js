/*

	jQuery Live(re)load
	Actually, you dont need this plugin, because you can use DevTools in your favorite browser.
	This plugin watch file change, based on HTTP header request.

	Creted By anovsiradj (Mayendra Costanov) <anov.siradj(22@(gmail|live).com|@gin.co.id)>
	Date Created/Updated: 201610121146, 201610191001, 201611011919

	SOURCE: https://github.com/anovsiradj/anovsiradj.github.io/blob/master/cdn/jquery-liveload.js
	CDN: //anovsiradj.github.io/cdn/jquery-liveload.js

	LIMITATION:
	This plugin CANNOT watch file/url-generated-by PHP script or htaccess (e.g: /index.php?page=home, etc) --by default--.
	Only static file like css, js, image, etc.

	LICENSE: MIT
	NOTICE: This code belongs to me. I created this code without the intervention from the company I work (kerja3).

*/

;(function($) {

	var defaults = {
		target: window.location.href, // self
		delay: 1000, // 1 second
		refresh: true,
		reload: true, // location ( .reload() | .href = .href )
		log: true,
		stop: false,
		retry_error: false
	};

	$.liveload = function() { // target | delay | options
		var options = $.extend({}, $.liveload.defaults);
		var is_first_watch = true;
		var xhr_res_lmodif_header;
		var xhr_res_etag_header;
		var xhr_header = {};

		if (arguments[0]) {
			var param = arguments[0];
			if ($.isPlainObject(param)) { // options
				options = $.extend(options, param);
			} else if($.isNumeric(param)) { // delay
				options.delay = param;
			} else { // target
				options.target = param;
			}
		}

		var delay_get = function() {
			if (options.stop) {
				return console.log('Liveload stop:', options.target);
			}
			if (is_first_watch && options.log) console.log('Liveload Running:', options.target);

			setTimeout(modif_get, is_first_watch ? 0 : options.delay);
		}
		var update_get = function() {
			if (options.refresh) {
				if (options.reload) window.location.reload();
				else window.location.href = window.location.href;
			} else {
				if (options.log) console.log('Liveload. Changed:', options.target);
				delay_get();
			}
		}
		var modif_get = function() {
			// trap timeout then back to delay_get()
			if (options.stop) return delay_get();

			$.ajax({
				url: options.target,
				ifModified: true, // http://stackoverflow.com/a/10579657/3036312
				success: function(a, b, xhr) {

					var header_lmodif = xhr.getResponseHeader('Last-Modified');
					var header_etag = xhr.getResponseHeader('ETag');

					if (xhr.status === 304) delay_get();
					else {
						// on first request, --xhr.statuscode-- always return 200, not 304.
						// because, first request, there's no if-modif-since header request
						if (is_first_watch) {
							is_first_watch = false;
							delay_get();
						} else {
							// http://stackoverflow.com/a/1101758/3036312, http://serverfault.com/a/696832
							// disini. kita tidak bisa mempercayai renponse dari http, jika di header-nya terdapat entri "etag"
							// karena itu akan mengabaikan status 304 dan akan-selalu merespond dengan status 200
							// sehingga membuat koneksi http sulit untuk di prediksi
							if (header_etag === null) {
								if (header_lmodif !== null && header_lmodif === xhr_res_lmodif_header) delay_get();
								else update_get();
							} else {
								if (header_lmodif !== null && header_lmodif === xhr_res_lmodif_header && header_etag === xhr_res_etag_header) delay_get();
								else update_get();
							}
						}
					}
					xhr_res_lmodif_header = header_lmodif;
					xhr_res_etag_header = header_etag;
				},
				fail: function() {
					if (options.log) console.warn('Liveload: AJAX Failed:', options.target);
					if (options.retry_error) {
						if (options.log) console.warn('Liveload: Retry:', options.target);
						delay_get();
					}
				}
			});
		};

		$(delay_get);

		/*
		so, we can update option on runtime. for example:
		----------------------------------
		var ll = $.liveload();
		ll.delay = 500; // change delay to 1/2 second
		ll.stop = true; // stop liveload
		----------------------------------
		*/
		return options;
	};

	$.liveload.reset = function() {
		$.liveload.defaults = $.extend({}, defaults);
	};
	$.liveload.reset();

})(jQuery);

// example:
// $.liveload();
// $.liveload(1000);
// $.liveload('assets/style.css');
// $.liveload({ option:1, option:2 });