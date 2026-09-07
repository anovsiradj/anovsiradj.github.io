$(function() {
	const STORAGE_KEY = 'resume-theme';
	const body = $('body');
	const icon = $('#theme-toggle i');

	function applyTheme(isDark) {
		if (isDark) {
			body.addClass('dark-mode');
			icon.removeClass('bi-moon-stars-fill').addClass('bi-sun-fill');
		} else {
			body.removeClass('dark-mode');
			icon.removeClass('bi-sun-fill').addClass('bi-moon-stars-fill');
		}
	}

	// Priority: localStorage > prefers-color-scheme > light
	const stored = localStorage.getItem(STORAGE_KEY);
	if (stored !== null) {
		applyTheme(stored === 'dark');
	} else {
		const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
		applyTheme(prefersDark);
	}

	// Toggle button
	$('#theme-toggle').on('click', function() {
		const isDark = body.toggleClass('dark-mode').hasClass('dark-mode');
		localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
		applyTheme(isDark);
	});

	// Listen for OS theme changes (only when no localStorage override)
	if (window.matchMedia) {
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
			if (localStorage.getItem(STORAGE_KEY) === null) {
				applyTheme(e.matches);
			}
		});
	}
});
