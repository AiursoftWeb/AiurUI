import $ from 'jquery';
import 'bootstrap';
import 'jquery-validation';
import 'jquery-validation-unobtrusive';
import Clipboard from 'clipboard';
import DisableWith from 'jquery-disable-with';
import UtcTime from 'jquery-utc-time';
import Clickable from 'jquery-anything-clickable';
import DarkSwitcher from './src/Dark';
window.$ = $;
window.jQuery = $;

class AiurCore {
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

        // Activate disable with tool
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

        // Activate UTC time tool
        new UtcTime({
            onSet: function (element) {
                $(element).tooltip();
            }
        });

        // Activate clickable tool
        new Clickable('data-href');

        // Activate tooltip tool
        $('[data-toggle="tooltip"]').tooltip();
        $('[data-toggle="tooltip"]').on('click', function () {
            setTimeout(function () {
                $('[data-toggle="tooltip"]').tooltip('hide');
            }, 2000);
        });
    }
}

new AiurCore();