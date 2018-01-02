// Karma configuration
// Generated on Mon Nov 06 2017 10:26:01 GMT-0600 (CST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      './node_modules/angular/angular.js',                             // angular
      './node_modules/angular-ui-router/release/angular-ui-router.js', // ui-router
      './node_modules/angular-mocks/angular-mocks.js',                 // loads our modules for tests
      './node_modules/angular-messages/angular-messages.js',
      './node_modules/angular-aria/angular-aria.js',
      './node_modules/angular-animate/angular-animate.js',
      './node_modules/angular-material/angular-material.js',
      './node_modules/chart.js/dist/Chart.js',  
      './node_modules/angular-chart.js/dist/angular-chart.js', 
      './public/app/scripts/countUp.js',
      './public/app/scripts/angular-countUp.js',                               
      './public/app/app.js',    
      './public/app/services/http.service.js',                                              // our angular app
      './public/app/controllers/quote.controller.js',
      './public/app/controllers/quote.spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['ChromeHeadless'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
