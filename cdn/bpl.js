/*
201607052026, 201607052307
*/

(function(w,d,$) {

	var bpl = function() {
		this.section = $(d.body).children('.bpl-content');
		this.config = {
			col: 8,
			wrapper_css: {},
			header_css: {},
			content_css: {},
			section_css: {},
			twbs_version: '3.3.6'
		};

		this.skeleton();
	};

	bpl.prototype.skeleton = function() {
		var skeleton = $.parseHTML('<div class="container-fluid"><div class="row"><div/></div></div>')[0];
		d.body.appendChild(skeleton);
		this.wrapper = skeleton.children[0].children[0];

		this.header = $.parseHTML('<div class="jumbotron"/>')[0];
		this.wrapper.appendChild(this.header);
		if (d.title) {
			var _h1 = $.parseHTML('<h1/>')[0];
			_h1.textContent = d.title;
			this.header.appendChild(_h1);
		};
		var desc = $(d.head).children('meta[name=description]');
		if (desc.length > 0) {
			var _p = $.parseHTML('<p/>')[0];
			_p.textContent = desc.prop('content');
			this.header.appendChild(_p);
		};
		this.content = $.parseHTML('<div class="row"/>')[0];
		this.wrapper.appendChild(this.content);

		// todo: footer
	};

	bpl.prototype.layout = function() {
		var that = this;

		var pushed = (12-this.config.col)/2;
		$(this.wrapper).addClass('col-md-' + this.config.col);
		if (pushed === w.Math.ceil(pushed)) {
			$(this.wrapper).addClass('col-md-push-' + pushed);
		};

		this.section.each(function(i,e) {
			var col = e.dataset.bplCol;
			var wrap = $.parseHTML('<div class="col-md-' + col + '"/>')[0];
			wrap.appendChild(e);
			that.content.appendChild(wrap);
			$(e).css(that.config.section_css);
		});

		$(this.wrapper).css(this.config.wrapper_css);
		$(this.header).css(this.config.header_css);
		$(this.content).css(this.config.content_css);
	};

	bpl.prototype.init = function() {
		var twbs_css = d.createElement('link');
		twbs_css.href = '//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/' + this.config.twbs_version + '/css/bootstrap.min.css';
		twbs_css.rel = 'stylesheet';
		d.head.insertBefore(twbs_css, d.head.children[0]);

		this.layout();

		var twbs_js = d.createElement('script');
		twbs_js.src = '//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/' + this.config.twbs_version + '/js/bootstrap.min.js';
		twbs_js.async = false;
		d.body.appendChild(twbs_js);
	};

	w.BluePrintLite = bpl;

})(window,document,jQuery);
