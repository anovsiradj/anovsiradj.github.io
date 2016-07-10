;(function(w,d) {

	function r5(elm) {
		this.toc = null;
		this.content = d.getElementById(elm);
		this.config = {
			'vendor': {
				'css': {
					'framework': '//cdnjs.cloudflare.com/ajax/libs/normalize/4.1.1/normalize.css',
					'font': '//fonts.googleapis.com/css?family=Ubuntu',
					'hjls_theme' :'//cdn.jsdelivr.net/highlight.js/9.4.0/styles/gruvbox-dark.min.css'
				},
				'js': {
					'markdownit': '//cdnjs.cloudflare.com/ajax/libs/markdown-it/6.0.2/markdown-it.min.js',
					'hjls': '//cdn.jsdelivr.net/highlight.js/9.4.0/highlight.min.js'
				}
			},
			'style': [
				'body {background-color: #eee;}',
				'#[content] {position: relative;font-family:Ubuntu,sans-serif;padding:32px 72px;margin: 0px;}',
				'#[content] > h1,#[content] > h2,#[content] > h3 {margin-top: 8px;margin-bottom: 0px;}',
				'#[content]>p code {color: #8C1C13;background-color:rgba(140,28,19,0.1);padding-left:4px;padding-right:4px;}',
				'#[toc] {font-family:Ubuntu,sans-serif;position:fixed;top:8px;right:8px;padding:8px;background-color:rgba(255,255,255,0.8);border:1px solid #999;z-index:999;opacity:0.2;}',
				'#[toc]:hover{opacity:1;}',
				'#[content] a,#[toc] a {color: #0099ff;}'
			],
			'hljs': {
				'tabReplace': '    ' // 4 space
			}
		};
	}

	r5.prototype.plug_vendor = function() {
		var vcss = this.config.vendor.css;
		var vjs = this.config.vendor.js;
		var css, js;
		for (var i in vcss) {
			css = d.createElement('link');
			css.href = vcss[i];
			css.type = 'text/css';
			css.rel = 'stylesheet';
			d.head.appendChild(css);
		}
		for (var i in vjs) {
			js = d.createElement('script');
			js.src = vjs[i];
			js.async = false;
			d.body.appendChild(js);
		}
	};

	r5.prototype.compile = function() {
		this.render_markdownit(this.xhr.response);
	};

	r5.prototype.render_markdownit = function(readme) {
		var self = this;
		if (typeof markdownit === 'undefined') {
			setTimeout(function() {
				self.render_markdownit(readme);
			},0);
		} else {
			this.content.innerHTML = markdownit().render(readme);
			this.make_toc();
			this.render_hljs();
		}
	};

	r5.prototype.render_hljs = function() {
		var self = this;
		if (typeof hljs === 'undefined') {
			setTimeout(function() {
				self.render_hljs();
			},0);
		} else {
			hljs.configure(this.config.hljs);
			hljs.initHighlighting();
		}
	};

	r5.prototype.xhr_handle = function() {
		var self = this;
		this.xhr = new XMLHttpRequest();
		this.xhr_event = this.xhr.onreadystatechange = function(ev) {
			if (this.readyState === 4) { // done, ok
				self.compile();
			}
		};
	};

	r5.prototype.make_style = function() {
		var s = d.createElement('style');
		s.type = 'text/css';
		d.head.appendChild(s);
		var cs = this.config.style;
		for (var i = 0; i < cs.length; i++) {
			var rule = cs[i].replace(/\[content\]/g, this.content.id).replace(/\[toc\]/g, this.content.id+'_toc');
			s.appendChild(d.createTextNode(rule));
		}
	};

	r5.prototype.make_toc = function() {
		this.toc = d.createElement('div');
		this.toc.id = this.content.id + '_toc';
		this.content.appendChild(this.toc);
		for (var i = 0; i < this.content.children.length; i++) {
			if(/^H\d$/.test(this.content.children[i].nodeName)) {
				this.toc_anchor(this.content.children[i]);
			}
		}
	};

	r5.prototype.toc_anchor = function(heading) {
		var heading_id = heading.innerText.toLowerCase().replace(/[^\w ]+/g,'').replace(/\s+/g,'-');
		heading.id = heading_id;
		this.toc.innerHTML += "<a href='#"+heading_id+"'>"+heading.innerText+"</a><br/>";
	};

	r5.prototype.init = function(md_url) {
		this.plug_vendor();
		this.make_style();
		this.xhr_handle();
		this.xhr.open("GET", md_url, true);
		this.xhr.send();
	};
	w.Readme5 = r5;

})(window, document);
