if (typeof window.winload === 'undefined') throw new Error('Kamu siapa?');

// setter
var is_posting = /^(item|static\_page)$/.test(near.pageType);
var $content = $("#core_content");

hljs.configure({tabReplace: '	'}); // tab:4
// var sidebar = $("#core_sidebar");
// var header = $("#core_header");

// sementara, fullpage/print di non-aktifkan
/*
var isFullpage = false;
var crx = document.cookie.match('isfullpage=([^\\s;]*)'); // match('[; ]isfullpage=([^\\s;]*)');
if(crx !== null) { isFullpage = !!Number(crx[1]); togglefullpage(); }
function togglefullpage() {
	var oem = "#core_content .blog-posts>.date-outer .date-header, #core_comments, #core_comments_nav"; // other element(s);
	if (isFullpage) {
		sidebar.hide(); header.hide(); $(oem).hide();
		$content.css({
			"padding-top":"0px",
			"margin-top":"16px"
		}).parent().removeClass("col-md-9").addClass("col-md-12").css("padding","0px");
		document.cookie = "isfullpage=1;path=/";
	} else {
		$content.css({
			"padding-top":"",
			"margin-top":""
		}).parent().removeClass("col-md-12").addClass("col-md-9").css("padding","");
		header.show(); sidebar.show(); $(oem).show();
		document.cookie = "isfullpage=0;path=/";
	};
}
function printpage() { isFullpage = true; togglefullpage(); window.print(); }
*/

function makefancycode(elm_code) {
	$(elm_code).addClass(elm_code.dataset.prlang).parent('pre').addClass("no-pd bd-rad-0");
	hljs.highlightBlock(elm_code);
}

function fancy_code($elm_pre, $elm_code, prlang) {
	$elm_pre[0].className += ' no-pd bd-rad-0';
	if (prlang) $elm_code[0].className += ' language-'+ prlang;
	hljs.highlightBlock($elm_code[0]);
};

$(document).ready(function() {

	//todo, someday
	//var $sidebar = $("#core_sidebar");
	//var $header = $("#core_header");
	//var $navbar_togglefullpage = $('#navbar_togglefullpage');

	if (is_posting) {
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

// disquss-comment
if (is_posting) {
	var disqus_config = function () {
		var firstBlogPostId = $("[id^=post-body]:first").prop('id').split('-');
		this.page.url = near.canonicalUrl;
		this.page.identifier = firstBlogPostId[firstBlogPostId.length-1];
	};
	(function(d) {
		var s = d.createElement('script');
		s.src = '//near-blogger.disqus.com/embed.js';
		s.setAttribute('data-timestamp', +new Date());
		(d.head || d.body).appendChild(s);
	})(document);
}

// fb-app (gur komentar tok)
if (is_posting) {
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
