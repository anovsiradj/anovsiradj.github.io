
/* 20200204,20201014,20230831 */

const empty = function () {
	return Array.from(arguments).every(e => {
		if (e === null) {
			return true
		}
		if (typeof e == 'undefined') {
			return true
		}
		if (typeof e == 'boolean' && e == false) {
			return true
		}
		if (typeof e == 'string' && e.trim() == '') {
			return true
		}
		return false
	});
};

window.WebAppData = window.WebAppData || {};

globalThis.anoop = globalThis.anoop || {};

if (empty(window.WebAppData.debug)) {
	window.WebAppData.debug = location.host.includes('localhost');
}
if (window.Vue && window.Vue.version.indexOf('2.') === 0) {
	Vue.config.devtools = window.WebAppData.debug;
}
if (window.less && window.less.env === window.WebAppData.unknown) {
	window.less.env = window.WebAppData.debug ? 'development' : 'production';
}

window.WebAppData.ts = window.timestamp = (new Date).toISOString();

const dump = function () {
	Array.from(arguments).forEach(i => console.debug(i));
	return arguments.callee;
};

window.Date.prototype.toTGL = function (options) {
	options = options || {};
	options.year = options.year || 'numeric';
	options.month = options.month || 'long';
	options.day = options.day || 'numeric';

	return this.toLocaleDateString('id-ID', options);
};

window.Date.prototype.toYMD = function (options) {
	options = options || {};
	options.his = options.his || false;
	options.separator = ('separator' in options) ? options.separator : '-';

	var m = this.getMonth() + 1, d = this.getDate();
	if (m < 10) m = String(m).padStart(2, '0');
	if (d < 10) d = String(d).padStart(2, '0');
	return [this.getFullYear(), m, d].join(options.separator);
};

window.datastore_tmp = {};
window.datastore_isa = (function () {
	try {
		var ls = window.localStorage, _ = '__datastore_try__';
		ls.setItem(_, _);
		ls.getItem(_);
		ls.removeItem(_);
		return true;
	} catch (e) { return false; } // !={}
})();
window.datastore_get = function (k) {
	if (window.datastore_isa) {
		var v = window.localStorage.getItem(k);
		if (v) v = JSON.parse(v);
		return v;
	}
	if (k in window.datastore_tmp) return window.datastore_tmp[k];
	return null;
};
window.datastore_set = function (k, v) {
	if (window.datastore_isa) return window.localStorage.setItem(k, JSON.stringify(v));
	window.datastore_tmp[k] = v;
};

window.datastore_rm = function (k) {
	if (window.datastore_isa) return window.localStorage.removeItem(k);
	if (k in window.datastore_tmp) delete window.datastore_tmp[k];
};

// https://davidwalsh.name/javascript-debounce-function
const debounce = (func, wait, immediate) => {
	var timeout;
	return function () {
		let context = this, params = arguments
		let fn_later = function () {
			timeout = null
			if (!immediate) func.apply(context, params)
		}
		let callNow = immediate && !timeout
		clearTimeout(timeout)
		timeout = setTimeout(fn_later, wait)
		if (callNow) func.apply(context, params)
	}
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
RegExp.escape = string => {
	return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
};

function fuzzymatch(needle, haystack, distance = 3) {
	haystack = haystack.toLowerCase();

	needle = needle.replace(/\s/g, '').toLowerCase();
	needle = needle.split('').map(i => RegExp.escape(i)).join(`.{0,${distance}}`);

	return (new RegExp(needle)).test(haystack);
}

/**
 * Compares the similarity between two strings using an n-gram comparison method. 
 * The grams default to length 2.
 * @param str1 The first string to compare.
 * @param str2 The second string to compare.
 * @param gramSize The size of the grams. Defaults to length 2.
 * @author [MgSam](https://stackoverflow.com/users/1195036/mgsam)
 * 
 * @link https://stackoverflow.com/a/62216738/3036312
 */
function stringSimilar(str1, str2, gramSize = 2) {
	function _NGrams(s, len) {
		s = ' '.repeat(len - 1) + s.toLowerCase() + ' '.repeat(len - 1);
		let v = new Array(s.length - len + 1);
		for (let i = 0; i < v.length; i++) {
			v[i] = s.slice(i, i + len);
		}
		return v;
	}
	if (!(str1 === null || str1 === void 0 ? void 0 : str1.length) || !(str2 === null || str2 === void 0 ? void 0 : str2.length)) {
		return 0.0;
	}
	let s1 = str1.length < str2.length ? str1 : str2;
	let s2 = str1.length < str2.length ? str2 : str1;
	let pairs1 = _NGrams(s1, gramSize);
	let pairs2 = _NGrams(s2, gramSize);
	let set = new Set(pairs1);
	let total = pairs2.length;
	let hits = 0;
	for (let item of pairs2) {
		if (set.delete(item)) {
			hits++;
		}
	}
	return hits / total;
}
