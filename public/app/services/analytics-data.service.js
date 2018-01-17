angular.module('coindbApp').service('analyticsService', ['$http', '$mdMedia', 'accountService', '$firebaseObject', function ($http, $mdMedia, accountService, $firebaseObject) {
    var service = this;
    service.accountService = accountService;

    console.log('Analytics Service Loaded');


    var ref = firebase.database().ref('analytics-data');
    // download the data into a local object
    service.analytics_data = $firebaseObject(ref);
    service.analytics_data.$loaded(function () {
        console.log(service.analytics_data);
        service.analytics_data.clicks = [];
    })

    // service.cryptoBeingTracked = function(crypto){

    // }
}])