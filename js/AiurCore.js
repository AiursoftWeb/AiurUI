'use strict';
// Trigger everytime full page load and part page load.
window.addEventListener('load', function () {
    // Activate clipboard tool
    new ClipboardJS('[data-clipboard-text]');

    // Activate tooltip tool
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="tooltip"]').on('click', function () {
        setTimeout(function () {
            $('[data-toggle="tooltip"]').tooltip('hide');
        }, 2000);
    });
});

// Trigger only full page load.
$(document).ready(function () {
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
                            initForm(layoutQuery + ' form');
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

    var initForm = function (query) {
        $(query).submit(function (e) {
            var href = $(this).attr("action");
            if (href && href.toLowerCase().startsWith('https')) {
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
                        initForm(layoutQuery + ' form');
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
    
    // All links even out of layout shall have async effects.
    initUnder('a[href]');

    // Only forms inside the layout shall have async effects.
    initForm(layoutQuery + ' form');
}