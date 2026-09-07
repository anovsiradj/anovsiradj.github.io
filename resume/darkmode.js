$(function() {
	const STORAGE_KEY = 'resume-theme';
	const html = document.documentElement;
	const icon = $('#theme-toggle i');

	function applyTheme(isDark) {
		html.setAttribute('data-bs-theme', isDark ? 'dark' : 'light');
		icon.removeClass('bi-moon-stars-fill bi-sun-fill')
			.addClass(isDark ? 'bi-sun-fill' : 'bi-moon-stars-fill');
	}

	const stored = localStorage.getItem(STORAGE_KEY);
	if (stored !== null) {
		applyTheme(stored === 'dark');
	} else {
		const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
		applyTheme(prefersDark);
	}

	$('#theme-toggle').on('click', function() {
		const isDark = html.getAttribute('data-bs-theme') !== 'dark';
		localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
		applyTheme(isDark);
	});

	if (window.matchMedia) {
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
			if (localStorage.getItem(STORAGE_KEY) === null) {
				applyTheme(e.matches);
			}
		});
	}
});
