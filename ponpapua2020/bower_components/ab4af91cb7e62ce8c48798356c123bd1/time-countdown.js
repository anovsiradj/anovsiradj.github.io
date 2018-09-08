function time_countdown(future_time, fn_callback) {
	var fn = fn_callback || function() {};

	var _second = 1000;
	var _minute = _second * 60;
	var _hour = _minute * 60;
	var _day = _hour * 24;

	function time_countdown_core() {
		var current_time = new Date();
		var delta_time = future_time - current_time;
		if (delta_time <= 0) {
			clearInterval(fn_interval);
			fn(null);
		} else {
			var days = Math.floor(delta_time / _day);
			var hours = Math.floor((delta_time % _day) / _hour);
			var minutes = Math.floor((delta_time % _hour) / _minute);
			var seconds = Math.floor((delta_time % _minute) / _second);
			fn({
				'days': Math.floor(delta_time / _day),
				'hours': Math.floor((delta_time % _day) / _hour),
				'minutes': Math.floor((delta_time % _hour) / _minute),
				'seconds': seconds = Math.floor((delta_time % _minute) / _second)
			});
		}
	}

	var fn_interval = setInterval(time_countdown_core, 1000);
	time_countdown_core();
}