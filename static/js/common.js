$(document).ready(function () {

    $.cookiesDirective({
        privacyPolicyUri: 'privacy.html',
        duration: 5,
        position: 'bottom',
        explicitConsent: false
    });

    if($('#shaker').size() && $.fn.effect !== undefined) {
        setInterval(function () {
            $('#shaker').effect('shake', { times: 0, direction: 'up', distance: 4  }, 3000);
            $('#shaker-one').effect('shake', { times: 0, direction: 'up', distance: 4  }, 3000);
        }, 1000);
    }
});


