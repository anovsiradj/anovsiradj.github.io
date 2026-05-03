$(function() {
    // Check local storage for theme preference
    const currentTheme = localStorage.getItem('resume-theme');
    
    // Apply theme on load
    if (currentTheme === 'dark') {
        $('body').addClass('dark-mode');
        $('#theme-toggle i').removeClass('bi-moon-stars-fill').addClass('bi-sun-fill');
    }

    // Toggle button click handler
    $('#theme-toggle').on('click', function() {
        $('body').toggleClass('dark-mode');
        const isDark = $('body').hasClass('dark-mode');
        
        // Update Local Storage
        localStorage.setItem('resume-theme', isDark ? 'dark' : 'light');
        
        // Update Icon
        if (isDark) {
            $(this).find('i').removeClass('bi-moon-stars-fill').addClass('bi-sun-fill');
        } else {
            $(this).find('i').removeClass('bi-sun-fill').addClass('bi-moon-stars-fill');
        }
    });

    // Expose Service Worker Flag
    // window.enableSW = true;
});
