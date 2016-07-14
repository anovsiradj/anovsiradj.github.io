if (typeof window.winload === 'undefined') throw new Error('Kamu siapa?');

// setter
var is_page_post = /^(item|static\_page)$/.test(near.pageType);
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
	$elm_pre.addClass("no-pd bd-rad-0");
	if (prlang) $elm_code.addClass('language-'+ prlang);
	hljs.highlightBlock($elm_code[0]);
};

$(document).ready(function() {

	//todo, someday
	//var $sidebar = $("#core_sidebar");
	//var $header = $("#core_header");
	//var $navbar_togglefullpage = $('#navbar_togglefullpage');

	if (is_page_post) {
		$content.find('.ajax-fancy-code').each(function() {
			var prlang = $(this).data('prlang') || $(this).children('code').data('prlang') || $(this).parent('pre').data('prlang');
			var ajx_url = $(this).text();
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
			};

			$.get(ajx_url, function(dat) {
				$code.text(dat);
				fancy_code($pre, $code, prlang);
			});

		});

		$content.find("code.makefancycode").each(function(i,elm_code) {
			fancy_code($(this).parent('pre'), $(this), $(this)[0].dataset.prlang);
		});
	};


	/*
		// fb-app
		window.fbAsyncInit = function() {
				FB.init({ appId: '1719982034935434', xfbml: true, version: 'v2.6' });
		};
		(function(d, s, id){
				var js, fjs = d.getElementsByTagName(s)[0];
				if (d.getElementById(id)) {return;}
				js = d.createElement(s); js.id = id;
				js.src = "//connect.facebook.net/id_ID/sdk.js";
				fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
	*/

	// fb-plugin
	/*
		(function(d, s, id) {
				var js, fjs = d.getElementsByTagName(s)[0];
				if (d.getElementById(id)) return;
				js = d.createElement(s); js.id = id;
				js.src = "//connect.facebook.net/id_ID/sdk.js#xfbml=1&version=v2.6";
				fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
		*/

});

// disquss-comment
if (is_page_post) {
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

// fb-app (saiki gur komentar tok)
if (is_page_post) {
	var fbAsyncInit = function() {
		FB.init({ appId: '1719982034935434', xfbml: true, version: 'v2.7' });
	};
	(function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) {return;}
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
}

// Lawan!
var netbro_cache_analytics_inv = setInterval(function() {
	window.netbro_cache_analytics = function(a,b) {};
	window.requestCfs = function() {};
	/*console.log("Spartan!");*/
},0);
winload(function() { clearInterval(netbro_cache_analytics_inv); });

