var app = angular.module('coindbApp', ['ui.router', 'ngMaterial', 'ngMessages', 'chart.js', 'countUpModule', 'ngStorage']).config(function($stateProvider, $urlRouterProvider, $mdThemingProvider, $httpProvider, ChartJsProvider){


$httpProvider.defaults.headers.post['Content-Type'] = 'text/plain'; 

  // For example: raised button text will be black instead of white.
  $mdThemingProvider.theme('default')
    .primaryPalette('deep-orange', {
      'default': '400', // by default use shade 400 from the pink palette for primary intentions
      'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
    }).dark()
    // If you specify less than all of the keys, it will inherit from the
    // default shades
    .accentPalette('teal', {
      'default': '200' // use shade 200 for default, and keep all other shades the same
    });
    

    

$stateProvider.state('speedtest', {
                url: '/',
                views: {
                    
                    'speedtestview': {
                        templateUrl: "app/views/quote.view.html",
                        controller: 'QuoteController'
                    }
                }
            })
  $urlRouterProvider.otherwise('/');

});


