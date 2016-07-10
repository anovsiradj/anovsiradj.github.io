/*
201606172054, 201606172256

pustaka:
http://stackoverflow.com/questions/9362907/how-can-i-reference-the-html-elements-corresponding-dom-object
*/

(function(w,d) {
	w.winload = function(fn) { w.addEventListener('load', fn, false); };
	w.addelm = function(elm_name) { return d.createElement(elm_name); }
	w.byid = function(id_name) {
		return d.getElementById(id_name);
	}
	w.byid_extend = function(id_name, prepend) {
		prepend = prepend || false;
		return (function(elm) {
			if (!elm) {
				elm = w.addelm('div');
				elm.id = id_name;
				if (prepend) {
					d.body.insertBefore(elm, d.body.children[0]);
				} else {
					d.body.appendChild(elm);
				}
				return elm;
			}
			return elm;
		})(d.getElementById(id_name));
	};
	w.jsonify = function(obj) { return w.JSON.stringify(obj, undefined, 4); };
	w.addclass = function(elm, cls) { elm.className += ' ' + cls; };
	w.addstyle = function(elm, k, v) { elm.style[k] = v; };
	function anvs() {
		var that = this;
		this.config = {
			vendor: {
				css: {
					// 'normalize': '//cdnjs.cloudflare.com/ajax/libs/normalize/4.1.1/normalize.css',
					'twbs': '//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap.min.css',
					'ubuntu-font': '//fonts.googleapis.com/css?family=Ubuntu+Mono'
				},
				js: [
					'//ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js',
					'//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/js/bootstrap.min.js'
				]
			}
		}
		this.layout = {
			container: w.byid_extend('container'),
			header: w.byid_extend('header', true),
			content: w.byid_extend('content'),
		};
		// this.styling();
		// this.plug_vcss();
	}

	anvs.prototype.plug_vcss = function() {
		for (var i in this.config.vendor.css) {
			css = w.addelm('link');
			css.href = this.config.vendor.css[i];
			css.type = 'text/css';
			css.rel = 'stylesheet';
			d.head.appendChild(css);
		}
	};

	anvs.prototype.dom = function(elm_name) {
		if (elm_name === 'container') {
			(function(elm) {
				if (elm === null) {
					elm = w.addelm('div');
					elm.id = elm_name;
					d.body.appendChild(elm);
				}
			})(w.byid(elm_name));
		}
	};

	anvs.prototype.set_container = function(elm) { // harus
		var elm = w.byid('container');
		if (elm === null) {
			elm = w.addelm('div');
			elm.id = elm_name;
			d.body.appendChild(elm);
		}
	};

	anvs.prototype.init = function() {
		this.plug_vcss();
	};

	anvs.prototype.styling = function() {
		w.addclass(d.documentElement, 'h-100p pd-0 mg-0'); // html
		w.addclass(d.body, 'h-100p pd-0 mg-0'); // body
		(function(elm) {
			w.addclass(elm, 'h-100p bg-smoke');
		})(this.layout.container);

		(function(elm) {
			elm.innerText = d.title;

			w.addclass(elm, 'text-center ff-mono pd-0 mg-0 bg-green');

			// that.styling(elm, 'color', '#eee');
			w.addstyle(elm, 'font-size', '3vw');
			w.addstyle(elm, 'padding-top', '2vw');
			w.addstyle(elm, 'padding-bottom', '2vw');
		})(this.layout.header);

		(function(elm) {
			w.addclass(elm, 'ff-ubuntu pd-0 mg-0 center-block w-75p');
			w.addstyle(elm, 'padding-top', '1vw');
		})(this.layout.content);
	};

	w.Anovymous = anvs;

})(window,document);
