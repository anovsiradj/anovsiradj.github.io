; (function () {
	class R5 {
		/** @origin https://github.com/anovsiradj/wiet */
		create(tname, config) {
			config ??= {};
			config = {
				options: {},
				attrs: {},
				props: {},
				handle: (element) => element,
				...config,
			};

			const element = document.createElement(tname, config.options);
			for (const prop in config.props) {
				element[prop] = config.props[prop];
			}
			for (const attr in config.attrs) {
				element.setAttribute(attr, config.attrs[attr]);
			}

			return config.handle(element);
		}

		constructor(target, config) {
			this.toc = null;
			this.file_first = null;
			this.file_current = null;
			this.hash_current = null;

			// for external link, default to _blank
			this.link_external_target = '_blank'

			if (typeof target === 'string') this.root_element = document.getElementById(target);
			else if (target) this.root_element = target;
			else this.root_element = document.body;

			this.page_element = this.create('article', {
				props: { id: `${this.root_element.id}_r5_page` }
			})
			this.root_element.appendChild(this.page_element)

			// Append timestamp to .md requests to bypass cache (cache buster)
			this.cache = true

			// Hash-based navigation routing
			this.route = true

			// default parser is markdown-it; can be overridden via this.parser = 'commonmark' or 'marked'
			this.parser = 'markdownit'

			this.vendor = {
				'css': {
					'ubuntu': 'https://fonts.googleapis.com/css?family=Ubuntu',
					'jetbrains_mono': 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap',
					'normalize': 'https://cdn.jsdelivr.net/npm/@csstools/normalize.css@12.1.1/normalize.min.css',
					'highlight': 'https://cdn.jsdelivr.net/npm/@highlightjs/cdn-assets@11.11.1/styles/base16/gruvbox-dark-soft.min.css',
				},
				'js': {
					'mermaid': 'https://cdn.jsdelivr.net/npm/mermaid@11.15.0/dist/mermaid.min.js',
					'mermaid_zenuml': 'https://cdn.jsdelivr.net/npm/@mermaid-js/mermaid-zenuml@0.2.3/dist/mermaid-zenuml.min.js',
					'highlight': 'https://cdn.jsdelivr.net/npm/@highlightjs/cdn-assets@11.11.1/highlight.min.js',
					'highlight_dart': 'https://cdn.jsdelivr.net/npm/@highlightjs/cdn-assets@11.11.1/languages/dart.min.js',
					'markdownit': 'https://cdn.jsdelivr.net/npm/markdown-it@14.1.1/dist/markdown-it.min.js',
					'commonmark': 'https://cdn.jsdelivr.net/npm/commonmark@0.31.2/dist/commonmark.min.js',
					'marked': 'https://cdn.jsdelivr.net/npm/marked@18.0.3/lib/marked.umd.min.js',
				}
			}

			this.style = [
				'#[content] a, #[toc] a { color: #0099ff; }',
				'#[content] { background-color: #eee; color: #222; }',
				'#[content] { position: relative; font-family: "JetBrains Mono",monospace; padding: 32px 72px; margin: 0px; }',
				'#[content] *:not(pre) code { color: #8C1C13;background-color: rgba(140,28,19,0.1); padding-left:4px; padding-right:4px; }',
				'#[toc] { font-family: "JetBrains Mono",monospace; position:fixed; top:5px; right:7px; z-index:999; transition: all 0.3s; }',
				'#[toc] .toc-label { background: #0099ff; color: #fff; padding: 5px 10px; border-radius: 4px; cursor: pointer; text-align: center; font-weight: bold; box-shadow: 0 2px 5px rgba(0,0,0,0.2); }',
				'#[toc] .toc-list { display: none; background: rgba(255,255,255,0.95); border: 1px solid #ddd; border-radius: 4px; padding: 10px; margin-top: 5px; max-height: 70vh; overflow-y: auto; min-width: 200px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }',
				'#[toc]:hover .toc-list { display: block; }',
				'#[toc] .toc-list a { display: block; padding: 3px 0; text-decoration: none; font-size: 0.9em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; border-bottom: 1px solid #f0f0f0; }',
				'#[toc] .toc-list a:hover { color: #007acc; background: #f8f8f8; }',
				'#[toc] .toc-list a.level-1 { font-weight: bold; padding-left: 0; }',
				'#[toc] .toc-list a.level-2 { padding-left: 15px; }',
				'#[toc] .toc-list a.level-3 { padding-left: 30px; }',
				'#[toc] .toc-list a.level-4 { padding-left: 45px; }',
				'#[menu] { position:fixed; top:5px; left:7px; z-index:999; min-width:160px; }',
				// Responsive TOC
				'@media (max-width: 768px) { #[toc] { top: auto; bottom: 80px; right: 20px; } #[toc] .toc-list { min-width: 150px; } }',
				// Back to Top styling
				'#[top] { position: fixed; bottom: 20px; right: 20px; width: 40px; height: 40px; line-height: 40px; background: #0099ff; color: #fff; text-align: center; border-radius: 50%; cursor: pointer; z-index: 998; box-shadow: 0 2px 5px rgba(0,0,0,0.2); font-size: 20px; }',
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
				'#[content].loading::before { content: "..."; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(0,0,0,0.7); color: #fff; padding: 10px 20px; border-radius: 4px; z-index: 1000; }'
			]

			this.args = {
				'hljs': {
					'tabReplace': '   ' // 3 space
				}
			}

			this.mermaid_config = {
				startOnLoad: false,
				deterministicId: true,
			}

			Object.assign(this, config)
		}

		plug_vendor() {
			var css, js;
			for (var i in this.vendor.css) {
				css = this.create('link', {
					props: { type: 'text/css', rel: 'stylesheet', href: this.vendor.css[i] },
				})
				document.head.appendChild(css);
			}
			for (var i in this.vendor.js) {
				js = this.create('script', {
					props: { async: false, src: this.vendor.js[i] },
				})
				document.head.appendChild(js);
			}
		}

		compile() {
			this.render_markdown(this.xhr.response);
		}

		render_markdown(readme) {
			const parserName = this.parser;
			let isReady = false;
			if (parserName === 'commonmark') isReady = (typeof commonmark !== 'undefined');
			else if (parserName === 'marked') isReady = (typeof marked !== 'undefined');
			else isReady = (typeof markdownit !== 'undefined');

			if (!isReady) {
				setTimeout(() => this.render_markdown(readme), 100);
			} else {
				// Use selected parser to convert markdown to HTML
				let htmlContent;
				if (this.parser === 'commonmark' && typeof commonmark !== 'undefined') {
					const parser = new commonmark.Parser();
					const renderer = new commonmark.HtmlRenderer({ safe: false });
					const parsed = parser.parse(readme);
					htmlContent = renderer.render(parsed);
				} else if (this.parser === 'marked' && typeof marked !== 'undefined') {
					htmlContent = marked.parse(readme);
				} else {
					// markdown-it (fallback)
					htmlContent = markdownit({ html: true }).render(readme);
				}
				this.page_element.innerHTML = htmlContent;
				this.page_element.classList.remove('loading');
				window.scrollTo({ top: 0, behavior: 'instant' });

				this.toc_init();
				this.top_init();
				this.link_init();
				this.exec_hljs();
				this.exec_mmjs();

				// Resolve relative assets (base path already set in init)
				const base = this.basePath || '';
				const embeds = this.page_element.querySelectorAll('img, video, audio, source, iframe');
				embeds.forEach(el => {
					const src = el.getAttribute('src');
					if (src && !src.match(/^(https?:)?\/\//i) && !src.startsWith('/')) {
						el.setAttribute('src', base + src);
					}
				});
			}
		}

		async exec_mmjs() {
			const mermaidZenUML = window['mermaid-zenuml'];
			if (mermaidZenUML) {
				await mermaid.registerExternalDiagrams([mermaidZenUML]);
			}
			mermaid.initialize(this.mermaid_config);
			const mermaidDivs = this.page_element.querySelectorAll('pre > code.language-mermaid');
			const containers = [];
			mermaidDivs.forEach(block => {
				const parent = block.parentNode;
				const mermaidContainer = document.createElement('div');
				mermaidContainer.className = 'mermaid';
				mermaidContainer.textContent = block.textContent;
				parent.parentNode.replaceChild(mermaidContainer, parent);
				containers.push(mermaidContainer);
			});
			if (containers.length) {
				await mermaid.run({ nodes: containers, suppressErrors: true });
			}
		}

		make_route(href) {
			if (href.startsWith('./') || href.startsWith('//')) {
				href = '#/' + href.substring(2)
			}
			if (href.startsWith('/')) {
				href = '#' + href.substring(1)
			}

			let route = href.split('#/')
			route = route.filter(i => i.trim() !== '');

			let file = route[0]
			let hash = route[1]
			if (!this.link_check(file)) {
				return
			}

			let link = `#/${file}`
			if (hash) {
				link = `${link}#/${hash}`
			}

			return { file, hash, link }
		}

		link_init() {
			const links = this.page_element.querySelectorAll('a');
			links.forEach(a => {
				let href = a.getAttribute('href');
				if (!href) return;

				// External link: http://, https://, or protocol-relative //
				if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//')) {
					if (this.link_external_target) {
						a.setAttribute('target', this.link_external_target);
					}
					return;
				}

				if (!this.route) return;

				let route = this.make_route(href)
				if (route) {
					a.setAttribute('href', route.link);
				}
			});
		}

		link_check(href) {
			href ??= ''
			href = href.trim().toLowerCase()

			if (href.endsWith('.md') || href.endsWith('.mkdn') || href.endsWith('.markdown')) {
				return true
			}

			if (href.includes('.md#') || href.includes('.mkdn#') || href.includes('.markdown#')) {
				return true
			}

			return false
		}

		exec_hljs() {
			if (typeof hljs === 'undefined') {
				setTimeout(() => this.exec_hljs(), 0);
			} else {
				hljs.configure(this.args.hljs);
				hljs.highlightAll();
			}
		}

		xhr_init() {
			this.xhr = new XMLHttpRequest();

			// Success handling (already defined)
			this.xhr.onerror = () => {
				this.page_element.innerHTML = '<p style="color:red;">Failed to load the markdown file.</p>';
			};

			this.xhr.timeout = 9000;
			this.xhr.ontimeout = () => {
				this.page_element.innerHTML = '<p style="color:red;">Request timed out while fetching the markdown.</p>';
			};

			this.xhr.onreadystatechange = () => {
				if (this.xhr.readyState === 4) {
					this.compile();

					// wait content ready
					setTimeout(() => this.scroll_to(this.hash_current), 199);
				}
			};
		}

		hash_init(initialTarget) {
			if (!this.route) return;

			console.debug(`hash_init(${initialTarget})`)

			const handler = () => {
				let route = location.hash
				if (route === '') {
					route = this.file_first || this.file_current
				}
				route = this.make_route(route)

				if (this.file_current === route.file) {
					this.hash_current = route.hash
					this.scroll_to(route.hash)
				} else {
					this.load(route)
				}
			};

			window.addEventListener('hashchange', handler);
			window.addEventListener('popstate', handler);
		}

		scroll_to(id) {
			console.debug(`scroll_to(${id})`)

			const el = document.getElementById(id);
			if (el) el.scrollIntoView({ behavior: 'smooth' });
		}

		make_style() {
			var style, rule;
			style = document.createElement('style');
			style.type = 'text/css';
			this.page_element.parentNode.insertBefore(style, this.page_element);
			for (var i = 0; i < this.style.length; i++) {
				rule = this.style[i]
					.replace(/\[content\]/g, this.page_element.id)
					.replace(/\[toc\]/g, this.page_element.id + '_toc')
					.replace(/\[top\]/g, this.page_element.id + '_top')
					.replace(/\[menu\]/g, this.page_element.id + '_menu');
				style.appendChild(document.createTextNode(rule));
			}
		}

		top_init() {
			const topId = this.page_element.id + '_top';
			this.top_btn = document.createElement('div');
			this.top_btn.id = topId;
			this.top_btn.innerText = '▲';
			this.top_btn.title = 'Back to Top';
			this.top_btn.onclick = () => this.root_element.scrollIntoView({ behavior: "smooth", block: "start" });

			this.root_element.appendChild(this.top_btn);
		}

		toc_init() {
			this.toc = document.createElement('div');
			this.toc.id = this.page_element.id + '_toc';
			document.body.appendChild(this.toc);

			const label = document.createElement('div');
			label.className = 'toc-label';
			label.innerText = 'TOC';
			this.toc.appendChild(label);

			const list = document.createElement('div');
			list.className = 'toc-list';
			this.toc.appendChild(list);

			var hN = this.page_element.querySelectorAll('h1, h2, h3, h4, h5, h6');
			for (var i = 0; i < hN.length; i++) {
				this.toc_make_anchor(hN[i], list);
			}
		}

		toc_make_anchor(h, container) {
			var id = this.page_element.id + '_' + h.innerText.toLowerCase().replace(/[^\w]+/g, '').replace(/\s+/g, '-');
			h.id = id;

			// RULES.md requires TOC links in format: `#/{markdown}#/{anchor}`
			let href = `#${id}`;
			if (this.route && this.file_current) {
				href = `#/${this.file_current}#/${id}`
			}

			var a = document.createElement('a');
			a.href = href;
			a.innerText = h.innerText;
			a.className = 'level-' + h.tagName.substring(1);
			container.appendChild(a);
		}

		menu_init() {
			let select;

			if (this.menu instanceof HTMLSelectElement) {
				select = this.menu;
			} else if (this.menu?.length) {
				select = this.create('select', {
					attrs: {
						style: `
							width: 100%;
							padding: 6px 8px;
							font-family: "JetBrains Mono", monospace;
							font-size: 13px;
							background: rgba(255,255,255,0.95);
							border: 1px solid #ddd;
							border-radius: 4px;
							cursor: pointer;
							box-sizing: border-box;
						`
					}
				});

				this.menu.forEach(entry => {
					const opt = document.createElement('option');
					if (typeof entry === 'string') {
						opt.value = entry;
						opt.textContent = entry.replace(/^#\//, '')
					} else {
						opt.value = entry.link
						opt.textContent = entry.text || entry.link.replace(/^#\//, '')
					}
					select.appendChild(opt);
				});
			} else {
				return;
			}

			const container = this.create('nav', {
				props: { id: this.page_element.id + '_menu' },
			});
			document.body.appendChild(container);

			const sync = () => {
				const hash = location.hash;
				if (hash && [...select.options].some(o => o.value === hash)) {
					select.value = hash;
				}
			};

			select.addEventListener('change', () => {
				location.hash = select.value;
			});

			window.addEventListener('hashchange', sync);
			setTimeout(sync, 0);

			container.appendChild(select);
		}

		init(srcurl) {
			console.debug(`init(${srcurl})`)

			this.plug_vendor();
			this.make_style();
			this.xhr_init();
			this.hash_init(srcurl);
			this.menu_init();

			if (this.route && location.hash !== '') {
				srcurl = location.hash
			}

			srcurl ??= this.file_first
			if (srcurl) {
				this.file_first = srcurl
				this.load(srcurl);
			}
		}

		load(route) {
			console.debug(`load(${route})`)

			// Abort previous request if still pending
			if (this.xhr.readyState > 0 && this.xhr.readyState < 4) {
				this.xhr.abort();
			}

			if (typeof route === 'string') {
				route = this.make_route(route)
			}

			this.file_current = route.file
			this.hash_current = route.hash
			this.page_element.classList.add('loading');

			let finalUrl = route.file;
			if (this.cache) {
				let cache

				if (this.cache === true) {
					cache = Date.now()
				} else {
					cache = this.cache
				}
				finalUrl = `${route.file}?${cache}`;
			}

			this.xhr.open("GET", finalUrl, true);
			this.xhr.overrideMimeType('text/plain'); 
			this.xhr.send();
		}
	}

	globalThis.Readme5 = R5;
	globalThis.R5 = R5;
})();
