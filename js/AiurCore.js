
// Temp put jquery-utc-time here.
$(document).ready(function () {
    var timeSince = function (date) {
        var seconds = Math.floor((new Date() - date) / 1000);
        var interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return date.toLocaleDateString();;
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + " days ago";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + " hours ago";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + " minutes ago";
        }
        return Math.floor(seconds) + " seconds ago";
    }
    $('*[data-utc-time]').each(function (t) {
        var timefield = $(this);
        var timevalue = timefield.attr('data-utc-time');
        if (!timevalue.endsWith(' UTC')) {
            timevalue = timevalue + ' UTC';
        }
        var date = new Date(timevalue);
        var text = timeSince(date);
        timefield.html(text);
        if (timefield.tooltip) {
            timefield.attr('data-toggle', 'tooltip');
            timefield.attr('data-trigger', 'hover');
            timefield.attr('data-title', date.toLocaleString());
            timefield.tooltip();
        }
    });
});

$(document).ready(function () {
    // Activate clipboard tool
    new ClipboardJS('[data-clipboard-text]');

    // Activate tooltip tool
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="tooltip"]').on('click', function () {
        setTimeout(function () {
            $('[data-toggle="tooltip"]').tooltip('hide');
        }, 2000);
    });

    //Aiur Scroll to top
    $(document).scroll(function () {
        var scrollDistance = $(this).scrollTop();
        if (scrollDistance > 100) {
            $('.aiur-scroll-to-top').fadeIn();
        } else {
            $('.aiur-scroll-to-top').fadeOut();
        }
    });

    $(document).on('click', 'a.aiur-scroll-to-top', function (event) {
        $('html, body').animate({ scrollTop: 0 }, 1000, 'easeInOutExpo');
        event.preventDefault();
    });
});