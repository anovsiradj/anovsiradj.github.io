;(function(w,d) {

	function r5(target) {
		this.toc = null;
		if (typeof target === 'string') this.content = d.getElementById(target);
		else this.content = target;

		this.config = {
			'vendor': {
				'css': {
					'font': '//fonts.googleapis.com/css?family=Ubuntu',
					'framework': '//cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css',
					'hjls_theme':'//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/gruvbox-dark.min.css'
				},
				'js': {
					'markdownit': '//cdnjs.cloudflare.com/ajax/libs/markdown-it/8.4.1/markdown-it.min.js',
					'hjls': '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js'
				}
			},
			'style': [
				'#[content] a, #[toc] a { color: #0099ff; }',
				'#[content] { background-color: #eee; color: #222; }',
				'#[content] { position: relative; font-family: Ubuntu,sans-serif; padding: 32px 72px; margin: 0px; }',
				'#[content]>h1, #[content]>h2, #[content]>h3, #[content]>h4, #[content]>h5, #[content]>h6 {}',
				'#[content] *:not(pre) code { color: #8C1C13;background-color: rgba(140,28,19,0.1); padding-left:4px; padding-right:4px; }',
				'#[toc] { font-family:Ubuntu,sans-serif; position:fixed; top:8px; right:8px; padding:8px; background-color:rgba(255,255,255,0.8); color:#333; border:1px solid #999; z-index:999; opacity:0.2; }',
				'#[toc]:hover { opacity:1; }',
			],
			'args': {
				'hljs': {
					'tabReplace': '  ' // 2 space
				}
			}
		};
	}

	r5.prototype.plug_vendor = function() {
		var css, js;
		for (var i in this.config.vendor.css) {
			css = d.createElement('link');
			css.href = this.config.vendor.css[i];
			css.type = 'text/css';
			css.rel = 'stylesheet';
			css.setAttribute('scoped', true);
			this.content.parentNode.insertBefore(css, this.content);
		}
		for (var i in this.config.vendor.js) {
			js = d.createElement('script');
			js.src = this.config.vendor.js[i];
			js.async = false;
			this.content.parentNode.insertBefore(js, this.content.nextSibling);
		}
	};

	r5.prototype.compile = function() {
		this.render_markdownit(this.xhr.response);
	};

	r5.prototype.render_markdownit = function(readme) {
		if (typeof markdownit === 'undefined') {
			var _this_ = this;
			setTimeout(function() {
				_this_.render_markdownit(readme);
			},0);
		} else {
			this.content.innerHTML = markdownit().render(readme);
			this.toc_init();
			this.render_hljs();
		}
	};

	r5.prototype.render_hljs = function() {
		if (typeof hljs === 'undefined') {
			var _this_ = this;
			setTimeout(function() {
				_this_.render_hljs();
			},0);
		} else {
			hljs.configure(this.config.args.hljs);
			hljs.initHighlighting();
		}
	};

	r5.prototype.xhr_init = function() {
		var _this_ = this;
		this.xhr = new XMLHttpRequest();
		this.xhr_event = this.xhr.onreadystatechange = function(ev) {
			if (this.readyState === 4) _this_.compile();
		};
	};

	r5.prototype.make_style = function() {
		var style, rule;
		style = d.createElement('style');
		style.type = 'text/css';
		this.content.parentNode.insertBefore(style, this.content);
		for (var i = 0; i < this.config.style.length; i++) {
			rule = this.config.style[i].replace(/\[content\]/g, this.content.id).replace(/\[toc\]/g, this.content.id+'_toc');
			style.appendChild(d.createTextNode(rule));
		}
	};

	r5.prototype.toc_init = function() {
		this.toc = d.createElement('div');
		this.toc.id = this.content.id + '_toc';
		this.content.appendChild(this.toc);

		var hN = this.content.querySelectorAll('h1, h2, h3, h4, h5, h6');
		for (var i = 0; i < hN.length; i++) {
			this.toc_make_anchor(hN[i]);
		}
	};

	r5.prototype.toc_make_anchor = function(h) {
		var id,a;
		id = this.content.id + '_' + h.innerText.toLowerCase().replace(/[^\w]+/g,'').replace(/\s+/g,'-');
		h.id = id;

		a = document.createElement('a');
		a.href = '#' + id;
		a.innerText = h.innerText;

		this.toc.appendChild(a);
		this.toc.appendChild(document.createElement('br'));
	};

	r5.prototype.init = function(srcurl) {
		this.plug_vendor();
		this.make_style();
		this.xhr_init();
		this.xhr.open("GET", srcurl, true);
		this.xhr.send();
	};

	w.Readme5 = r5;

})(window, document);
