'use strict';
import $ from 'jquery';
import 'bootstrap';
import 'nprogress';
import 'jquery-validation';
import 'jquery-validation-unobtrusive';
import 'clipboard';
//import 'jquery-disable-with';
import 'jquery-utc-time';
import 'jquery-anything-clickable';

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
        $('.card').addClass('bg-dark');
        $('.bg-light').addClass('bg-dark');
        $('.bg-light').removeClass('bg-light');
        $('.bg-white').addClass('bg-dark');
        $('.bg-white').removeClass('bg-white');
        $('.bd-footer').addClass('bg-dark');
        $('table').addClass('table-dark');
    }
}
initDarkTheme();

window.matchMedia('(prefers-color-scheme: dark)').addListener(initDarkTheme);

// Trigger everytime full page load and part page load.
window.addEventListener('load', function () {
    initDarkTheme();

    // Activate clipboard tool
    new ClipboardJS('[data-clipboard-text]');

    new DisableWith('data-disable-with');

    new Clickable('data-href');
    
    // init jquery-utc-time
    new UtcTime({ });

    // Activate tooltip tool
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="tooltip"]').on('click', function () {
        setTimeout(function () {
            $('[data-toggle="tooltip"]').tooltip('hide');
        }, 2000);
    });

    var setLanguageLink = function () {
        var link = $('[data-language-change-link]').attr('href');
        var host = encodeURIComponent(this.window.location.origin);
        var path = encodeURIComponent(this.window.location.pathname + this.window.location.search);
        link = link + "?host=" + host + "&path=" + path;
        $('[data-language-change-link]').attr("href", link);
    }

    setLanguageLink();
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