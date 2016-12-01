function curlyParser(string_tpl, obj_data, cb) {
	cb = cb || function(meta) { return meta; };
	return String(string_tpl).replace(/\{(.+?)\}/g, function(a,b,c,d) {
		return cb(obj_data[b.trim()]);
	});
}
