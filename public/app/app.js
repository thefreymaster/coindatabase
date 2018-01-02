var app = angular.module('coindbApp', ['ui.router', 'ngMaterial', 'ngMessages', 'chart.js', 'countUpModule']).config(function($stateProvider, $urlRouterProvider, $mdThemingProvider, $httpProvider, ChartJsProvider){


$httpProvider.defaults.headers.post['Content-Type'] = 'text/plain'; 

  // For example: raised button text will be black instead of white.
  var bitcoinTheme = $mdThemingProvider.extendPalette('deep-purple', {
    '600': '#0288D1',
    'contrastDefaultColor': 'dark'
  });

  // Register the new color palette map with the name <code>neonRed</code>
  $mdThemingProvider.definePalette('bitcoinTheme', bitcoinTheme);

  // Use that theme for the primary intentions
  $mdThemingProvider.theme('default')
    .primaryPalette('bitcoinTheme', {
      'default': '600', // by default use shade 400 from the pink palette for primary intentions
      'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
    })
    .dark();

    

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


