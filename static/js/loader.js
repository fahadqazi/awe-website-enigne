require.config({
    baseUrl: '/',
    paths: {
        'jquery': 'libs/jquery/dist/jquery.min',
        'jquery-ui': 'libs/jquery-ui/jquery-ui.min',
        'angular': 'libs/angular/angular',
        'bootstrap': 'libs/bootstrap/dist/js/bootstrap.min',
        'cookieDirective': 'libs/cookieDirective/jquery.cookiesdirective',
        'raphael': 'libs/raphael/raphael-min',
        'underscore': 'libs/underscore/underscore',
        'angular-local-storage': 'libs/angular-local-storage/angular-local-storage.min',
        'FlexySlider': 'libs/FlexySlider/dist/FlexySlider',
        'common': 'js/common',
        'slider': 'js/slider'
    },
    "shim": {
        'cookieDirective': { deps: [ "jquery" ], exports: 'jQuery.fn.cookieDirective' },
        'jquery-ui': { deps: ['jquery'] },
        'common': { deps: [ 'jquery-ui', 'cookieDirective' ] },
        'angular' : { exports: 'angular' },
        'FlexySlider': { deps: ['angular', 'raphael', 'underscore' ] },
        'angular-local-storage': { deps: [ 'angular' ] },
        'slider': { deps: [ 'FlexySlider', 'angular-local-storage' ] }
    }
});

require([ 'angular', 'common', 'slider' ], function(ng) {

    ng.bootstrap(document, ['sliderApp']);
});
