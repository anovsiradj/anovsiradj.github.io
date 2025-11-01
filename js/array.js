
/**
 * @link https://stackoverflow.com/a/3955096/3036312
 */

Array.prototype.pull = function () {
	var what, a = arguments, L = a.length, ax;
	while (L && this.length) {
		what = a[--L];
		while ((ax = this.indexOf(what)) !== -1) {
			this.splice(ax, 1);
		}
	}
	return this;
};
