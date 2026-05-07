; (function () {

    class R5 {
        constructor(target, config) {
            this.toc = null;

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
                'style': [
                    '#[content] a, #[toc] a { color: #0099ff; }',
                    '#[content] { background-color: #eee; color: #222; }',
                    '#[content] { position: relative; font-family: Ubuntu,sans-serif; padding: 32px 72px; margin: 0px; }',
                    '#[content] h1, #[content] h2, #[content] h3, #[content] h4, #[content] h5, #[content] h6 {}',
                    '#[content] *:not(pre) code { color: #8C1C13;background-color: rgba(140,28,19,0.1); padding-left:4px; padding-right:4px; }',
                    '#[toc] { font-family: Ubuntu, sans-serif; position:fixed; top:8px; right:8px; padding:8px; background-color:rgba(255,255,255,0.8); color:#333; border:1px solid #999; z-index:999; opacity:0.2; }',
                    '#[toc]:hover { opacity:1; }',
                    // Better table styling
                    '#[content] table { border-collapse: collapse; width: 100%; margin: 1em 0; }',
                    '#[content] th, #[content] td { border: 1px solid #bbb; padding: 0.4em 0.6em; }',
                    '#[content] th { background-color: #ddd; text-align: left; }',
                    '#[content] tr:nth-child(even) { background-color: #f9f9f9; }',
                    // mermaid container styling (optional)
                    '#[content] .mermaid { background: #fff; margin: 1em 0; }'
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
                    const renderer = new commonmark.HtmlRenderer();
                    const parsed = parser.parse(readme);
                    htmlContent = renderer.render(parsed);
                } else if (this.config.parser === 'marked' && typeof marked !== 'undefined') {
                    htmlContent = marked.parse(readme);
                } else {
                    // markdown-it (fallback)
                    htmlContent = markdownit().render(readme);
                }
                this.content.innerHTML = htmlContent;
                this.toc_init();
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
                // Resolve relative images (base path already set in init)
                const base = this.basePath || '';
                const imgs = this.content.querySelectorAll('img');
                imgs.forEach(img => {
                    const src = img.getAttribute('src');
                    if (src && !src.match(/^(https?:)?\/\//i) && !src.startsWith('/')) {
                        img.setAttribute('src', base + src);
                    }
                });

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

            // Resolve relative image sources based on the source URL
            const base = this.basePath || '';
            const imgs = this.content.querySelectorAll('img');
            imgs.forEach(img => {
                const src = img.getAttribute('src');
                if (src && !src.match(/^(https?:)?\/\//i) && !src.startsWith('/')) {
                    img.setAttribute('src', base + src);
                }
            });
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
            // Compute base path for relative assets (used later in image handling)
            const urlObj = new URL(srcurl, window.location.href);
            this.basePath = urlObj.href.substring(0, urlObj.href.lastIndexOf('/') + 1);

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
