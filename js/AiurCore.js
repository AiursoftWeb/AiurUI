import $ from 'jquery';
import 'bootstrap';
import 'jquery-validation';
import 'jquery-validation-unobtrusive';
import './src/AiurUploader';
import Clipboard from 'clipboard';
import DisableWith from 'jquery-disable-with';
import UtcTime from 'jquery-utc-time';
import Clickable from 'jquery-anything-clickable';
import DarkSwitcher from './src/Dark';
window.$ = $;
window.jQuery = $;

class UIInitor {
    constructor() {
        var darkMonitor = new DarkSwitcher();
        darkMonitor.initDarkTheme();
        window.matchMedia('(prefers-color-scheme: dark)').addListener(darkMonitor.initDarkTheme);
        window.addEventListener('load', this.initUI);
        window.addEventListener('load', darkMonitor.initDarkTheme);
    }

    initUI() {

        // Activate clipboard tool
        new Clipboard('[data-clipboard-text]', {});

        new DisableWith('data-disable-with', function (firstForm, submitButton, prevalue, isButton) {
            // Handle jquery validation invalid event.
            $(firstForm).bind('invalid-form.validate', () => {
                setTimeout(() => {
                    submitButton.removeAttribute('disabled');
                    if (isButton) {
                        submitButton.innerHTML = prevalue;
                    } else {
                        submitButton.setAttribute('value', prevalue);
                    }
                }, 1);
            });
        });

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