var WebAppData = WebAppData || {};

var is_posting = /^(item|static\_page)$/.test(WebAppData.pageType);
var $content = $("#core_content");
WebAppData.is_content = is_posting;

function makefancycode(elm_code) {
	elm_code.className += ' ' + elm_code.dataset.prlang;
	elm_code.parentElement.className += ' no-pd bd-rad-0';
	hljs.highlightBlock(elm_code);
}

function fancy_code($elm_pre, $elm_code, prlang) {
	$elm_pre[0].className += ' no-pd bd-rad-0';
	if (prlang) $elm_code[0].className += ' ' + prlang;
	hljs.highlightBlock($elm_code[0]);
};

$(document).ready(function() {
	if (WebAppData.is_content) {
		$('.ajax-fancy-code, .fancy-code, code.makefancycode', $content[0]).each(function() {
			var hljs_it = true;
			var prlang = $(this).data('prlang') || $(this).children('code').data('prlang') || $(this).parent('pre').data('prlang');
			var is_ajax = /ajax\-fancy\-code/.test(this.className);
			if (is_ajax) { var ajx_url = $(this).text(); }

			switch(this.nodeName) {
				case('PRE'):
					var $pre = $(this);
					if (this.children[0] && this.children[0].nodeName === 'CODE') {
						var $code = this.children[0];
					} else {
						var t = this.innerHTML;
						this.innerHTML = '<code></code>';
						this.children[0].innerHTML = t;
						var $code = $(this.children[0]);
					}
				break;
				case('CODE'):
					if (this.parentElement.nodeName === 'PRE') {
						var $pre = $(this.parentElement);
					} else {
						this.insertAdjacentHTML('beforebegin', '<pre></pre>');
						this.previousElementSibling.appendChild(this);
						var $pre = $(this.parentElement);
					}
					var $code = $(this);
				break;
				case('DIV'):
					var t = this.innerHTML;
					this.innerHTML = '<pre><code></code></pre>';
					var $pre = $(this.children[0]);
					var $code = $(this.children[0].children[0]);
					this.children[0].children[0].innerHTML = t;
				break;
				default: hljs_it = false; break;
			};

			if (hljs_it) {
				if (is_ajax) {
					$.get(ajx_url, function(dat) {
						$code.text(dat);
						fancy_code($pre, $code, prlang);
					});
				} else {
					fancy_code($pre, $code, prlang);
				}
			}

		});
		/*
		$content.find('.ajax-fancy-code').each(function() {
			var prlang = $(this).data('prlang') || $(this).children('code').data('prlang') || $(this).parent('pre').data('prlang');
			var ajx_url = $(this).text();
			var do_it = true;
			switch(this.nodeName) {
				case('PRE'):
					var $pre = $(this);
					var $code = $(this).children('code');
				break;
				case('CODE'):
					var $pre = $(this).parent('pre');
					var $code = $(this);
				break;
				// todo: div
				case('DIV'):
					$(this).html('<pre><code></code></pre>');
					var $pre = $(this).find('pre:first');
					var $code = $(this).find('code:first');
				break;
				default: do_it = false; break;
			};

			if (do_it) {
				$.get(ajx_url, function(dat) {
					$code.text(dat);
					fancy_code($pre, $code, prlang);
				});
			};

		});
		*/


	};
	


});

if (is_posting) {
	// disquss-comment
	var disqus_config = function () {
		var firstBlogPostId = $("[id^=post-body]:first").prop('id').split('-');
		this.page.url = WebAppData.canonicalUrl;
		this.page.identifier = firstBlogPostId[firstBlogPostId.length-1];
	};
	(function(d) {
		var s = d.createElement('script');
		s.src = '//near-blogger.disqus.com/embed.js';
		s.setAttribute('data-timestamp', +new Date());
		(d.head || d.body).appendChild(s);
	})(document);

	// fb-app (hanya komentar saja)
	var fbAsyncInit = function() {
		FB.init({ appId: '1719982034935434', xfbml: true, version: 'v2.8' });
	};
	(function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) {return;}
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
}
