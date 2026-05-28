; (function () {
	class R5 {
		constructor(target, config) {
			this.toc = null;
			this.currentFile = null;

			if (typeof target === 'string') this.content = document.getElementById(target);
			else this.content = target;

			this.config = {
				'vendor': {
					'css': {
						'font': 'https://fonts.googleapis.com/css?family=Ubuntu',
						'normalize': 'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css',
						'highlight': 'https://cdn.jsdelivr.net/npm/@highlightjs/cdn-assets@11.11.1/styles/base16/gruvbox-dark-soft.min.css',
					},
					'js': {
						'markdownit': 'https://cdn.jsdelivr.net/npm/markdown-it@14.1.1/dist/markdown-it.min.js',
						'commonmark': 'https://cdn.jsdelivr.net/npm/commonmark@0.31.2/dist/commonmark.min.js',
						'marked': 'https://cdn.jsdelivr.net/npm/marked@18.0.3/lib/marked.umd.min.js',
						'highlight': 'https://cdn.jsdelivr.net/npm/@highlightjs/cdn-assets@11.11.1/highlight.min.js',
						'mermaid': 'https://cdn.jsdelivr.net/npm/mermaid@11.14.0/dist/mermaid.min.js',
					}
				},
				// default parser is markdown-it; can be overridden via config.parser = 'commonmark' or 'marked'
				'parser': 'markdownit',
				// Hash-based navigation routing
				'route': true,
				// Append timestamp to .md requests to bypass cache
				'cache': true,
				'style': [
					'#[content] a, #[toc] a { color: #0099ff; }',
					'#[content] { background-color: #eee; color: #222; }',
					'#[content] { position: relative; font-family: Ubuntu,sans-serif; padding: 32px 72px; margin: 0px; }',
					'#[content] h1, #[content] h2, #[content] h3, #[content] h4, #[content] h5, #[content] h6 {}',
					'#[content] *:not(pre) code { color: #8C1C13;background-color: rgba(140,28,19,0.1); padding-left:4px; padding-right:4px; }',
					'#[toc] { font-family: Ubuntu, sans-serif; position:fixed; top:20px; right:20px; z-index:999; transition: all 0.3s; }',
					'#[toc] .toc-label { background: #0099ff; color: #fff; padding: 5px 10px; border-radius: 4px; cursor: pointer; text-align: center; font-weight: bold; box-shadow: 0 2px 5px rgba(0,0,0,0.2); }',
					'#[toc] .toc-list { display: none; background: rgba(255,255,255,0.95); border: 1px solid #ddd; border-radius: 4px; padding: 10px; margin-top: 5px; max-height: 80vh; overflow-y: auto; min-width: 200px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }',
					'#[toc]:hover .toc-list { display: block; }',
					'#[toc] .toc-list a { display: block; padding: 3px 0; text-decoration: none; font-size: 0.9em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; border-bottom: 1px solid #f0f0f0; }',
					'#[toc] .toc-list a:hover { color: #007acc; background: #f8f8f8; }',
					'#[toc] .toc-list a.level-1 { font-weight: bold; padding-left: 0; }',
					'#[toc] .toc-list a.level-2 { padding-left: 15px; }',
					'#[toc] .toc-list a.level-3 { padding-left: 30px; }',
					'#[toc] .toc-list a.level-4 { padding-left: 45px; }',
					// Responsive TOC
					'@media (max-width: 768px) { #[toc] { top: auto; bottom: 80px; right: 20px; } #[toc] .toc-list { min-width: 150px; } }',
					// Back to Top styling
					'#[top] { position: fixed; bottom: 20px; right: 20px; width: 40px; height: 40px; line-height: 40px; background: #0099ff; color: #fff; text-align: center; border-radius: 50%; cursor: pointer; z-index: 998; box-shadow: 0 2px 5px rgba(0,0,0,0.2); display: none; font-size: 20px; }',
					'#[top]:hover { background: #007acc; }',
					// Better table styling
					'#[content] table { border-collapse: collapse; width: 100%; margin: 1em 0; }',
					'#[content] th, #[content] td { border: 1px solid #bbb; padding: 0.4em 0.6em; }',
					'#[content] th { background-color: #ddd; text-align: left; }',
					'#[content] tr:nth-child(even) { background-color: #f9f9f9; }',
					// mermaid container styling (optional)
					'#[content] .mermaid { background: #fff; margin: 1em 0; }',
					// Loading indicator styling
					'#[content].loading { opacity: 0.5; pointer-events: none; }',
					'#[content].loading::before { content: "Loading..."; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(0,0,0,0.7); color: #fff; padding: 10px 20px; border-radius: 4px; z-index: 1000; }'
				],
				'args': {
					'hljs': {
						'tabReplace': '   ' // 3 space
					}
				},
				...config,
			};

			// eof
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
			const parserName = this.config.parser;
			let isReady = false;
			if (parserName === 'commonmark') isReady = (typeof commonmark !== 'undefined');
			else if (parserName === 'marked') isReady = (typeof marked !== 'undefined');
			else isReady = (typeof markdownit !== 'undefined');

			if (!isReady) {
				var _this_ = this;
				setTimeout(function () {
					_this_.render_markdown(readme);
				}, 100);
			} else {
				// Use selected parser to convert markdown to HTML
				let htmlContent;
				if (this.config.parser === 'commonmark' && typeof commonmark !== 'undefined') {
					const parser = new commonmark.Parser();
					const renderer = new commonmark.HtmlRenderer({ safe: false });
					const parsed = parser.parse(readme);
					htmlContent = renderer.render(parsed);
				} else if (this.config.parser === 'marked' && typeof marked !== 'undefined') {
					htmlContent = marked.parse(readme);
				} else {
					// markdown-it (fallback)
					htmlContent = markdownit({ html: true }).render(readme);
				}
				this.content.innerHTML = htmlContent;
				this.content.classList.remove('loading');
				window.scrollTo({ top: 0, behavior: 'instant' });

				this.toc_init();
				this.top_init();
				this.link_init();
				this.render_highlight();

				// Render Mermaid diagrams if any
				if (typeof mermaid !== 'undefined') {
					mermaid.initialize({ startOnLoad: false });
					const mermaidDivs = this.content.querySelectorAll('pre > code.language-mermaid');
					mermaidDivs.forEach(block => {
						const parent = block.parentNode;
						const mermaidContainer = document.createElement('div');
						mermaidContainer.className = 'mermaid';
						mermaidContainer.textContent = block.textContent;
						parent.parentNode.replaceChild(mermaidContainer, parent);
						mermaid.init(undefined, mermaidContainer);
					});
				}

				// Resolve relative assets (base path already set in init)
				const base = this.basePath || '';
				const embeds = this.content.querySelectorAll('img, video, audio, source, iframe');
				embeds.forEach(el => {
					const src = el.getAttribute('src');
					if (src && !src.match(/^(https?:)?\/\//i) && !src.startsWith('/')) {
						el.setAttribute('src', base + src);
					}
				});
			}
		}

		link_init() {
			if (!this.config.route) return;

			const links = this.content.querySelectorAll('a');
			links.forEach(a => {
				let tmp;
				let href = a.getAttribute('href');
				href = href.trim();
				href = href.split('?')[0] // file?data => file

				tmp = href.split('#')
				let file = tmp[0]
				if (file.startsWith('./')) {
					file = file.substring(2)
				}
				if (file.startsWith('/')) {
					file = file.substring(1)
				}
				tmp = file.toLowerCase()
				if (!(tmp.endsWith('.md') || tmp.endsWith('.mkdn') || tmp.endsWith('.markdown'))) {
					return
				}

				let hash = tmp[1]
				if (hash) {
					a.setAttribute('href', `#/${file}/${hash}`);
				} else {
					a.setAttribute('href', `#/${file}`);
				}
			});
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
			// Success handling (already defined)
			this.xhr.onerror = () => {
				this.content.innerHTML = '<p style="color:red;">Failed to load the markdown file.</p>';
			};
			this.xhr.timeout = 15000; // 15 seconds timeout
			this.xhr.ontimeout = () => {
				this.content.innerHTML = '<p style="color:red;">Request timed out while fetching the markdown.</p>';
			};
			this.xhr_event = this.xhr.onreadystatechange = function () {
				if (this.readyState === 4) _this_.compile();
			};
		}

		hash_init(initialTarget) {
			if (!this.config.route) return;

			const handler = () => {
				// Expecting hashes of form '/file.md' or '/file.md/anchor' (no '#anchor' legacy support)
				let raw = window.location.hash.substring(1);
				if (!raw) {
					if (initialTarget !== this.currentFile) this.load(initialTarget);
					return;
				}

				// Normalize leading slash
				if (raw.startsWith('/')) raw = raw.substring(1);

				// Match 'file.md' optionally followed by '/anchor'
				const m = raw.match(/^(.*?\.md)(?:\/(.*))?$/);
				if (m) {
					const filePath = m[1];
					const anchor = m[2] || null;
					if (filePath !== this.currentFile) {
						this.load(filePath);
						if (anchor) {
							var _this_ = this;
							setTimeout(() => _this_.scroll_to(anchor), 500);
						}
					} else if (anchor) {
						this.scroll_to(anchor);
					}
				} else {
					// fallback: treat raw as an anchor id
					this.scroll_to(raw);
				}
			};

			window.addEventListener('hashchange', handler);
			window.addEventListener('popstate', handler);
		}

		scroll_to(id) {
			const el = document.getElementById(id);
			if (el) el.scrollIntoView({ behavior: 'smooth' });
		}

		make_style() {
			var style, rule;
			style = document.createElement('style');
			style.type = 'text/css';
			this.content.parentNode.insertBefore(style, this.content);
			for (var i = 0; i < this.config.style.length; i++) {
				rule = this.config.style[i]
					.replace(/\[content\]/g, this.content.id)
					.replace(/\[toc\]/g, this.content.id + '_toc')
					.replace(/\[top\]/g, this.content.id + '_top');
				style.appendChild(document.createTextNode(rule));
			}
		}

		top_init() {
			const topId = this.content.id + '_top';
			this.top_btn = document.createElement('div');
			this.top_btn.id = topId;
			this.top_btn.innerText = '▲';
			this.top_btn.title = 'Back to Top';
			this.top_btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
			document.body.appendChild(this.top_btn);

			window.addEventListener('scroll', () => {
				if (window.scrollY > 300) this.top_btn.style.display = 'block';
				else this.top_btn.style.display = 'none';
			});
		}

		toc_init() {
			this.toc = document.createElement('div');
			this.toc.id = this.content.id + '_toc';
			this.content.appendChild(this.toc);

			const label = document.createElement('div');
			label.className = 'toc-label';
			label.innerText = 'TOC';
			this.toc.appendChild(label);

			const list = document.createElement('div');
			list.className = 'toc-list';
			this.toc.appendChild(list);

			var hN = this.content.querySelectorAll('h1, h2, h3, h4, h5, h6');
			for (var i = 0; i < hN.length; i++) {
				this.toc_make_anchor(hN[i], list);
			}
		}

		toc_make_anchor(h, container) {
			var id = this.content.id + '_' + h.innerText.toLowerCase().replace(/[^\w]+/g, '').replace(/\s+/g, '-');
			h.id = id;

			// RULES.md requires TOC links in format: `#/{markdown}/{anchor}`
			let href = '#' + id;
			if (this.config.route && this.currentFile) {
				href = '#/' + this.currentFile + '/' + id;
			}

			var a = document.createElement('a');
			a.href = href;
			a.innerText = h.innerText;
			a.className = 'level-' + h.tagName.substring(1);
			container.appendChild(a);
		}

		init(srcurl) {
			this.plug_vendor();
			this.make_style();
			this.xhr_init();
			this.hash_init(srcurl);

			// Determine startup target: prefer routed hash when present
			let hash = window.location.hash.substring(1);
			if (hash.startsWith('/')) hash = hash.substring(1);
			const mdMatch = hash.match(/^(.*?\.md)(?:\/|$)/);
			const target = (this.config.route && hash && mdMatch) ? mdMatch[1] : srcurl;

			if (target) {
				if (this.config.route && !window.location.hash && !target.includes('?')) {
					window.location.hash = '/' + target;
				} else {
					this.load(target);
				}
			}
		}

		load(srcurl) {
			// Abort previous request if still pending
			if (this.xhr.readyState > 0 && this.xhr.readyState < 4) {
				this.xhr.abort();
			}

			// Track current file (strip queries)
			this.currentFile = srcurl.split('?')[0];

			this.content.classList.add('loading');

			// Compute base path for relative assets
			const urlObj = new URL(srcurl, window.location.href);
			this.basePath = urlObj.href.substring(0, urlObj.href.lastIndexOf('/') + 1);

			let finalUrl = srcurl;
			if (this.config.cache) {
				const bust = (typeof this.config.cache === 'string') ? this.config.cache : new Date().getTime();
				const sep = finalUrl.indexOf('?') > -1 ? '&' : '?';
				finalUrl += sep + '_=' + bust;
			}

			this.xhr.open("GET", finalUrl, true);
			this.xhr.send();
		}
	}

	globalThis.Readme5 = R5;
	globalThis.R5 = R5;

})();
