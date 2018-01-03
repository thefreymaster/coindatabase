angular.module('coindbApp').service('reusableDataService', ['httpService', 'bigScreenService', function (httpService, bigScreenService) {
     var service = this;
     console.log('Reusable Data Service');
     service.httpService = httpService;
     service.bigScreenService = bigScreenService;

    service.cryptoObject = { all: {}, top_volumns: {} };

    var allCryptoPromise = service.httpService.getAllCryptos();
    var tempSymbols = '';
    allCryptoPromise.then(function (results) {
        service.cryptoObject.all = results;
        service.bigScreenService.changeBigScreenItem(service.cryptoObject.all[2], 2);

        for(k=0;k<service.cryptoObject.all.length;k++){
            service.cryptoObject.all[k]['Price'] = {};
            // service.cryptoObject.all[k]['Track'] = false;
            
            tempSymbols = tempSymbols + service.cryptoObject.all[k].Symbol + ',';
        }
        var getAllPricesPromise = service.httpService.getAllPrices(tempSymbols);
        getAllPricesPromise.then(function(results2){
            var t = 0;
            for(prop in results2.data.RAW)
            {
                service.cryptoObject.all[t].Price = results2.data.RAW[prop].USD;
                t++;
            }
            console.log(service.cryptoObject);
        })

        var topVolumnsPromise = service.httpService.getTopVolumns();
        topVolumnsPromise.then(function(results3){
            service.cryptoObject.top_volumns = results3.data.Data;

        })
    })

    service.trackCoin = function(coin){
        console.log(coin);
        console.log(service.cryptoObject);
        
    }


}])