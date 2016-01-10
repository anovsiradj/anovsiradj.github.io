/*! jQuery plugin plist (simple pagination list) v201512280738 | 2015 - Mayendra Costanov (anovsiradj) | License CC0 */
$.fn.plist = function(l,r) {
	l = (l || this.prop('data-plist-limit')) || 2;
	r = (r || this.prop('data-plist-remote')) || null;
	e = this.selector;
	var t = this.children().length,
		s = Math.ceil(t/l),
		p = "<span><button onclick=\"$('"+e+"').plistHandle(Number($('"+e+"').prop('data-plist-current'))-1);\">prev</button></span><span><button onclick=\"$('"+e+"').plistHandle(Number($('"+e+"').prop('data-plist-current'))+1);\">next</button></span>";
	this.prop({
		"data-plist-limit":l,
		"data-plist-total":t,
		"data-plist-summary":s,
		"data-plist-remote":r
	});
	if(!!r) { if($(r).html() === '') { $(r).html(p); } }
	return this;
}
$.fn.plistHandle = function(c) {
	c = (c || this.prop('data-plist-current')) || 1;
	var l = this.prop('data-plist-limit') || 2,
		s = this.prop('data-plist-summary'),
		o = (c-1)*l;
	
	if(c > 0 && c <= s) {
		this.prop('data-plist-current',c);
		this.children().hide().slice(o,o+l).show();
	}
	this.show();
	return this;
}
