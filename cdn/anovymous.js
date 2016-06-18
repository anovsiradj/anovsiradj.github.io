/*
201606172054, 201606172256

pustaka:
http://stackoverflow.com/questions/9362907/how-can-i-reference-the-html-elements-corresponding-dom-object
*/

(function(w,d) {
	w.winload = function(fn) { w.addEventListener('load', fn, false); };
	w.byid = function(id_name) { return d.getElementById(id_name); };
	w.jsonify = function(obj) { return w.JSON.stringify(obj, undefined, 4); };
	w.makeelm = function(elm_name) { return d.createElement(elm_name); }
	function anovymous() {
		this.config = {
			vendor: {
				css: {
					// 'normalize': '//cdnjs.cloudflare.com/ajax/libs/normalize/4.1.1/normalize.css',
					'twbs': '//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap.min.css',
					'ubuntu-font': '//fonts.googleapis.com/css?family=Ubuntu+Mono'
				}
				// js: { 'jquery': '//ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js' }
			}
		}
		// html, body
		this.addclass(d.documentElement, 'h-100p pd-0 mg-0');
		this.addclass(d.body, 'h-100p pd-0 mg-0');
		this.layout = {
			container: w.byid('container'),
			header: w.byid('header'),
			content: w.byid('content'),
		};
	}
	anovymous.prototype.init = function() {
		this.dox();
		this.doxc();
		for (var i in this.config.vendor.css) {
			css = w.makeelm('link');
			css.href = this.config.vendor.css[i];
			css.type = 'text/css';
			css.rel = 'stylesheet';
			d.head.appendChild(css);
		}
		/*
		for (var i in this.config.js) {
			js = d.createElement('script');
			js.src = this.config.js[i];
			js.async = false;
			d.body.appendChild(js);
		}
		*/
	};
	anovymous.prototype.dox = function() {
		this.addclass(d.documentElement, 'h-100p pd-0 mg-0');
		this.addclass(d.body, 'h-100p pd-0 mg-0');
	};
	anovymous.prototype.doxc = function() {
		var that = this;

		(function(elm) {
			that.addclass(elm, 'h-100p bg-smoke');
			// that.styling(elm, 'color', '#eee');
		})(this.layout.container);

		(function(elm) {
			elm.innerText = d.title;

			that.addclass(elm, 'text-center ff-mono pd-0 mg-0 bg-green');

			// that.styling(elm, 'color', '#eee');
			that.styling(elm, 'font-size', '4vw');
			that.styling(elm, 'padding-top', '2vw');
			that.styling(elm, 'padding-bottom', '2vw');
		})(this.layout.header);

		(function(elm) {
			that.addclass(elm, 'ff-ubuntu pd-0 mg-0 center-block w-75p');
			that.styling(elm, 'padding-top', '1vw');
		})(this.layout.content);
	};

	anovymous.prototype.addclass = function(elm, cls) {
		elm.className += ' ' + cls;
	};
	anovymous.prototype.styling = function(elm, k, v) {
		elm.style[k] = v;
	};
	w.Anovymous = anovymous;
})(window,document);
