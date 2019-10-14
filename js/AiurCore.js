'use strict';

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

    // init jquery-utc-time
    $(this).initUTCTime({
        daysAgo: ' days ago',
        hoursAgo: ' hours ago',
        minutesAgo: ' minutes ago',
        secondsAgo: ' seconds ago'
    });
});

var asyncLayout = function (layoutQuery) {
    var initUnder = function (query) {
        $(query).each(function () {
            $(this).click(function (e) {
                var href = $(this).attr("href");
                if (href.startsWith('#')) {
                    return;
                }
                if (href.toLowerCase().startsWith('https')) {
                    return;
                }
                e.preventDefault();
                NProgress.start();
                $.ajax({
                    url: href,
                    headers: { "X-No-Layout": "true" },
                    success: function (data) {
                        $(layoutQuery).html(data);
                        window.history.pushState({ "html": data, "pageTitle": "" }, "", href);
                        setTimeout(function () {
                            initUnder(layoutQuery + ' a[href]');
                            initForm();
                            dispatchEvent(new Event('load'));
                            NProgress.done();
                        }, 1);
                    },
                    error: function () {
                        window.location = href;
                    }
                });
            })
        });
    }

    var initForm = function () {
        $(layoutQuery + ' form').submit(function (e) {
            var href = $(this).attr("action");
            if (href.toLowerCase().startsWith('https')) {
                return;
            }
            e.preventDefault();
            NProgress.start();
            $.ajax({
                type: $(this).attr('method'),
                url: $(this).attr('action'),
                data: $(this).serialize(),
                headers: { "X-No-Layout": "true" },
                success: function (data) {
                    $(layoutQuery).html(data);
                    window.history.pushState({ "html": data, "pageTitle": "" }, "", $(this).attr('action'));
                    setTimeout(function () {
                        initUnder(layoutQuery + ' a[href]');
                        dispatchEvent(new Event('load'));
                        NProgress.done();
                    }, 1);
                },
                error: function () {
                    alert('Unknown error!');
                }
            });
        });
    }
    
    initUnder('a[href]');
    initForm();
}