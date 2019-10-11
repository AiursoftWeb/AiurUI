'use strict';

$(document).ready(function () {
    // Activate clipboard tool
    new ClipboardJS('[data-clipboard-text]');

    // Activate tooltip tool
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="tooltip"]').on('click', () => {
        setTimeout(() => {
            $('[data-toggle="tooltip"]').tooltip('hide');
        }, 2000);
    });

    //Aiur Scroll to top
    $(document).scroll(() => {
        const scrollDistance = $(this).scrollTop();
        if (scrollDistance > 100) {
            $('.aiur-scroll-to-top').fadeIn();
        } else {
            $('.aiur-scroll-to-top').fadeOut();
        }
    });

    $(document).on('click', 'a.aiur-scroll-to-top', (event) => {
        $('html, body').animate({ scrollTop: 0 }, 1000, 'easeInOutExpo');
        event.preventDefault();
    });

    // init jquery-utc-time
    $(this).initUTCTime({
        daysAgo: ' days ago',
        hoursAgo: ' hours ago',
        minutesAgo: ' minutes ago',
        secondsAgo: ' seconds ago'
    });
});