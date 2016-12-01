function curlyParser(string_tpl, obj_data, cb) {
	cb = cb || function(key, obj, result) { return result; };
	return String(string_tpl).replace(/\{(.+?)\}/g, function(a,b,c,d) {
		return cb(b, obj_data, obj_data[b.trim()]);
	});
}
