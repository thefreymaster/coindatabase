angular.module('coindbApp').service('httpService', ['$http', '$mdMedia', function ($http, $mdMedia) {


    var service = this;
    console.log('HTTP Service')

    service.screenIsExtraSmall = $mdMedia('xs');
    service.screenIsSmall = $mdMedia('sm');
    service.screenIsMedium = $mdMedia('md');
    service.screenIsLarge = $mdMedia('lg');


    service.getAllCryptos = function () {
        return $http.get('/api/all').then(function (response) {
            var all = [];
            var sortOrder;
            for(prop in response.data.Data)
            {
                sortOrder = parseInt(response.data.Data[prop].SortOrder)
                if(sortOrder <= 20)
                {
                    all.push(response.data.Data[prop])
                }
            }
            return all;

        });
    }
    service.getCurrentPrice = function(item){
        return $http.get('/api/current_price/'+item).then(function(response){
            return response;
        })
    }

    service.getTime = function () {
        return $http.get('/api/time').then(function (response) {
            return response.data;

        });
    }
    service.getYesterdaysBitcoinPrice = function () {
        return $http.get('/api/yesterday_price').then(function (response) {
            return response.data.bpi;

        });
    }
    service.getHistoricBitcoinPrice = function () {
        return $http.get('/api/historic_price').then(function (response) {
            return response.data;

        });
    }
    

}])