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
                var target = $(this).attr("target")
                if (href.startsWith('#')) {
                    return;
                }
                if(target && target.length > 0 && target !== "_self") {
                    return;
                }
                if (href.toLowerCase().startsWith('https')) {
                    return;
                }
                window.history.pushState({ "html": $("html").html(), "pageTitle": "" }, "", href);
                e.preventDefault();
                NProgress.start();
                $.ajax({
                    url: href,
                    headers: { "X-No-Layout": "true" },
                    success: function (data) {
                        $(layoutQuery).html(data);
                        setTimeout(function () {
                            initUnder(layoutQuery + ' a[href]');
                            initForm();
                            dispatchEvent(new Event('load'));
                            window.scrollTo(0, 0);
                            NProgress.done();
                        }, 1);
                    },
                    error: function () {
                        window.location = href;
                        NProgress.done();
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
                        initForm();
                        dispatchEvent(new Event('load'));
                        window.scrollTo(0, 0);
                        NProgress.done();
                    }, 1);
                },
                error: function () {
                    alert('Unknown error!');
                    NProgress.done();
                }
            });
        });
    }
    
    initUnder('a[href]');
    initForm();
}