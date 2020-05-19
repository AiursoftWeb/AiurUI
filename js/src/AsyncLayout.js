
import $ from 'jquery';
import * as nprogress from "nprogress";

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