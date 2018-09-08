(function() {
	document.title = ponxx.doxtitle;
	var bg = document.getElementById('bg');

	(function(t_img) {
		t_img.style.visibility = 'hidden';
		t_img.hidden = true;
		t_img.src = ponxx.bg_img;
		$(t_img).on('load', function() {
			bg.style['background-image'] = `url(${ponxx.bg_img})`;
			bg.style.opacity = 1;
			t_img.remove();
		});
		bg.appendChild(t_img);
	})(document.createElement('img'));

	(function(countdown) {
		if (countdown) {
			var cd = countdown.querySelector('.cd');
			var ch = countdown.querySelector('.ch');
			var cm = countdown.querySelector('.cm');
			var cs = countdown.querySelector('.cs');
			time_countdown(ponxx.expired, function(dt) {
				if (dt) {
					cd.innerText = (dt.days < 10 ? '0' : '') + String(dt.days);
					ch.innerText = (dt.hours < 10 ? '0' : '') + String(dt.hours);
					cm.innerText = (dt.minutes < 10 ? '0' : '') + String(dt.minutes);
					cs.innerText = (dt.seconds < 10 ? '0' : '') + String(dt.seconds);
				}
			});
		}
	})(document.getElementById('countdown'));

	Array.from(document.querySelectorAll('.eval')).forEach(function(el) {
		el[el.dataset.k] = eval(el.dataset.v);
	});

})();
