import './AiurCore';
import './src/GDPR';
import $ from 'jquery';

$(document).ready(function () {
    $('body').ihavecookies({
        title: '&#x1F36A; This website uses cookies',
        message: 'We use cookies to personalize content and ads, to provide social media features and to analyze our traffic. By clicking <strong>Accept</strong>, you consent to the use of cookies. Read more about these cookies and how to configure them.',
        delay: 200,
        expires: 30,
        link: '//www.aiursoft.com/docs/terms',
        onAccept: function () {
            var myPreferences = $.fn.ihavecookies.cookie();
            console.log('Yay! The following preferences were saved...');
            console.log(myPreferences);
        },
        uncheckBoxes: false,
        acceptBtnLabel: 'Accept Cookies',
        moreInfoLabel: 'More information'
    });

    if ($.fn.ihavecookies.preference('preferences') === true) {
        console.log("GDPR Pass. JavaScript working...");
    }
});