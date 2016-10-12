/*

	By Mayendra Costanov (anovsiradj)
	Created: 201610121146
	License: MIT (I dont know what it is)

*/
;(function($) {
	// simple jquery live(re)load url
	$.extend({ // http://stackoverflow.com/a/1758534/3036312
		liveload: function() { // target | delay | options
			var options = {
				target: window.location.href, // self
				delay: 1000, // 1 second
				reload: true, // reload() | href = href
				log: true,
				retry_error: false
			};
			var is_first_watch = true;

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
				if (is_first_watch && options.log) console.log('Liveload Running...,');
				setTimeout(modif_get, options.delay);
			}
			var modif_get = function() {
				var jqxhr = $.ajax({
					url: options.target,
					ifModified: true, // http://stackoverflow.com/a/10579657/3036312
					success: function(a, b, xhr) {
						if (xhr.status === 304) delay_get();
						else {
							// on first ajax, --xhr.status-- always return 200, not 304. I dont know why :P
							if (is_first_watch) {
								is_first_watch = false;
								delay_get();
							} else {
								if (options.reload) window.location.reload();
								else window.location.href = window.location.href;
							};
						}
					},
					fail: function() {
						if (options.log) console.error('Liveload: AJAX Failed.');
						if (options.retry_error) {
							delay_get();
						}
					}
				});
			};

			$(delay_get);
		}
	});
})(jQuery);

// example:
// $.liveload();
// $.liveload('aset/style.css');
// $.liveload(1000);
