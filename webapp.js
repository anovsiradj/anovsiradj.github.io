
/* 20200204 */

window.WebAppData = window.WebAppData||{};

window.timestamp = (ts => ts.toISOString())((new Date));

window.dump = function() {
	Array.from(arguments).forEach(i => console.debug(i));
	return window.dump;
};

window.datastore_tmp = {};
window.datastore_isa = (function() {
	try {
		var ls = window.localStorage, _ = '__datastore_try__';
		ls.setItem(_,_);
		ls.getItem(_);
		ls.removeItem(_);
		return true;
	} catch(e) { return false; } // !={}
})();
window.datastore_get = function(k) {
	if (window.datastore_isa) {
		var v = window.localStorage.getItem(k);
		if (v) v = JSON.parse(v);
		return v;
	}
	if (k in window.datastore_tmp) return window.datastore_tmp[k];
	return null;
};
window.datastore_set = function(k,v) {
	if (window.datastore_isa) return window.localStorage.setItem(k,JSON.stringify(v));
	window.datastore_tmp[k] = v;
};

window.datastore_rm = function(k) {
	if (window.datastore_isa) return window.localStorage.removeItem(k);
	if (k in window.datastore_tmp) delete window.datastore_tmp[k];
};

// https://davidwalsh.name/javascript-debounce-function
window.debounce = (func,wait,immediate) => {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context,args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later,wait);
		if (callNow) func.apply(context, args);
	};
};
