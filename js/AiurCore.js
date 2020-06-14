import $ from 'jquery';
import 'bootstrap';
import 'jquery-validation';
import 'jquery-validation-unobtrusive';
import './src/AsyncLayout';
import './src/AiurUploader';
import Clipboard from 'clipboard';
import DisableWith from 'jquery-disable-with';
import UtcTime from 'jquery-utc-time';
import Clickable from 'jquery-anything-clickable';
import DarkMonitor from './src/Dark';
window.$ = $;
window.jQuery = $;

class UIInitor {
    constructor() {
        new DarkMonitor();
        window.addEventListener('load', this.initUI);
    }

    initUI() {

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

    }
}

new UIInitor();