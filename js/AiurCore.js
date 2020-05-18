import 'bootstrap';
import * as nprogress from "nprogress";
import 'jquery-validation';
import 'jquery-validation-unobtrusive';
import Clipboard from 'clipboard';
import DisableWith from 'jquery-disable-with';
import UtcTime from 'jquery-utc-time';
import Clickable from 'jquery-anything-clickable';
import { $, jQuery } from 'jquery';
window.$ = $;
window.jQuery = jQuery;

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

$(function () {
    initDarkTheme();

    // Activate clipboard tool
    new Clipboard('[data-clipboard-text]', {});

    new DisableWith('data-disable-with');

    new UtcTime({
        onSet: function (element) {
            $(element).tooltip();
        }
    });

    new Clickable('data-href');

    // Activate tooltip tool
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="tooltip"]').on('click', function () {
        setTimeout(function () {
            $('[data-toggle="tooltip"]').tooltip('hide');
        }, 2000);
    });

    var setLanguageLink = function () {
        var link = $('[data-language-change-link]').attr('href');
        var host = encodeURIComponent(window.location.origin);
        var path = encodeURIComponent(window.location.pathname + window.location.search);
        link = link + "?host=" + host + "&path=" + path;
        $('[data-language-change-link]').attr("href", link);
    }

    setLanguageLink();
});
window.nprogressDemo = function () {
    nprogress.start();
    setTimeout(() => {
        nprogress.done();
    }, 2000);
}

window.asyncLayout = function (layoutQuery) {
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
                nprogress.start();
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
                            nprogress.done();
                        }, 1);
                    },
                    error: function () {
                        window.location = href;
                        nprogress.done();
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
            nprogress.start();
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
                        nprogress.done();
                    }, 1);
                },
                error: function () {
                    alert('Unknown error!');
                    nprogress.done();
                }
            });
        });
    }

    // All links even out of layout shall have async effects.
    initUnder('a[href]');

    // Only forms inside the layout shall have async effects.
    initForm(layoutQuery + ' form');
}