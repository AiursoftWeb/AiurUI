'use strict';
var initDarkTheme = function () {
    // Replace dark theme class
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // dark mode
        $('.navbar-light').addClass('navbar-dark');
        $('.navbar-light').removeClass('navbar-light');
        $('body').addClass('bg-dark');
        $('body').css('color', 'white');
        $('.modal-content').addClass('bg-dark');
        $('.modal-content').css('color', 'white');
        $('.container-fluid').addClass('bg-dark');
        $('.container-fluid').css('color', 'white');
        $('.list-group-item').addClass('bg-dark');
        $('.list-group-item').css('color', 'white');
        $('.content-wrapper').addClass('bg-dark');
        $('.content-wrapper').css('color', 'white');
        $('.card').addClass('bg-dark');
        $('.bg-light').addClass('bg-dark');
        $('.bg-light').removeClass('bg-light');
        $('.bg-white').addClass('bg-dark');
        $('.bg-white').removeClass('bg-white');
        $('.bd-footer').addClass('bg-dark');
        $('.jumbotron').css('background-color', '#191c20');
        $('.breadcrumb').css('background-color', 'rgb(42, 43, 45)');
        $('pre').css('background-color', '#444');
        $('code').css('background-color', '#444');
        $('pre').css('color', '#fff');
        $('code').css('color', '#fff');
    }
}
initDarkTheme();

// Trigger everytime full page load and part page load.
window.addEventListener('load', function () {
    initDarkTheme();

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
                if (target && target.length > 0 && target !== "_self") {
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