; (function () {

	class R5 {
		constructor(target) {
			this.toc = null;

			if (typeof target === 'string') this.content = document.getElementById(target);
			else this.content = target;

			this.config = {
				'vendor': {
					'css': {
						'font': 'https://fonts.googleapis.com/css?family=Ubuntu',
						'normalize': 'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css',
						'highlight': 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/styles/base16/gruvbox-dark-soft.min.css',
					},
					'js': {
						'markdown': 'https://cdnjs.cloudflare.com/ajax/libs/markdown-it/13.0.2/markdown-it.min.js',
						'highlight': 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/highlight.min.js'
					}
				},
				'style': [
					'#[content] a, #[toc] a { color: #0099ff; }',
					'#[content] { background-color: #eee; color: #222; }',
					'#[content] { position: relative; font-family: Ubuntu,sans-serif; padding: 32px 72px; margin: 0px; }',
					'#[content]>h1, #[content]>h2, #[content]>h3, #[content]>h4, #[content]>h5, #[content]>h6 {}',
					'#[content] *:not(pre) code { color: #8C1C13;background-color: rgba(140,28,19,0.1); padding-left:4px; padding-right:4px; }',
					'#[toc] { font-family: Ubuntu, sans-serif; position:fixed; top:8px; right:8px; padding:8px; background-color:rgba(255,255,255,0.8); color:#333; border:1px solid #999; z-index:999; opacity:0.2; }',
					'#[toc]:hover { opacity:1; }',
				],
				'args': {
					'hljs': {
						'tabReplace': '   ' // 3 space
					}
				}
			};
		}

		plug_vendor() {
			var css, js;
			for (var i in this.config.vendor.css) {
				css = document.createElement('link');
				css.href = this.config.vendor.css[i];
				css.type = 'text/css';
				css.rel = 'stylesheet';
				css.setAttribute('scoped', true);
				this.content.parentNode.insertBefore(css, this.content);
			}
			for (var i in this.config.vendor.js) {
				js = document.createElement('script');
				js.src = this.config.vendor.js[i];
				js.async = false;
				this.content.parentNode.insertBefore(js, this.content.nextSibling);
			}
		}

		compile() {
			this.render_markdown(this.xhr.response);
		}

		render_markdown(readme) {
			if (typeof markdownit === 'undefined') {
				var _this_ = this;
				setTimeout(function () {
					_this_.render_markdown(readme);
				}, 0);
			} else {
				this.content.innerHTML = markdownit().render(readme);
				this.toc_init();
				this.render_highlight();
			}
		}

		render_highlight() {
			if (typeof hljs === 'undefined') {
				var _this_ = this;
				setTimeout(function () {
					_this_.render_highlight();
				}, 0);
			} else {
				hljs.configure(this.config.args.hljs);
				hljs.highlightAll();
			}
		}

		xhr_init() {
			var _this_ = this;
			this.xhr = new XMLHttpRequest();
			this.xhr_event = this.xhr.onreadystatechange = function () {
				if (this.readyState === 4) _this_.compile();
			};
		}

		make_style() {
			var style, rule;
			style = document.createElement('style');
			style.type = 'text/css';
			this.content.parentNode.insertBefore(style, this.content);
			for (var i = 0; i < this.config.style.length; i++) {
				rule = this.config.style[i].replace(/\[content\]/g, this.content.id).replace(/\[toc\]/g, this.content.id + '_toc');
				style.appendChild(document.createTextNode(rule));
			}
		}

		toc_init() {
			this.toc = document.createElement('div');
			this.toc.id = this.content.id + '_toc';
			this.content.appendChild(this.toc);

			var hN = this.content.querySelectorAll('h1, h2, h3, h4, h5, h6');
			for (var i = 0; i < hN.length; i++) {
				this.toc_make_anchor(hN[i]);
			}
		}

		toc_make_anchor(h) {
			var id, a;
			id = this.content.id + '_' + h.innerText.toLowerCase().replace(/[^\w]+/g, '').replace(/\s+/g, '-');
			h.id = id;

			a = document.createElement('a');
			a.href = '#' + id;
			a.innerText = h.innerText;

			this.toc.appendChild(a);
			this.toc.appendChild(document.createElement('br'));
		}

		init(srcurl) {
			this.plug_vendor();
			this.make_style();
			this.xhr_init();
			this.xhr.open("GET", srcurl, true);
			this.xhr.send();
		}
	}

	globalThis.Readme5 = R5;
	globalThis.R5 = R5;

})();
