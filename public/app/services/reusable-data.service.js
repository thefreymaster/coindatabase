angular.module('coindbApp').service('reusableDataService', ['httpService', 'bigScreenService', function (httpService, bigScreenService) {
    var service = this;
    console.log('Reusable Data Service');
    service.httpService = httpService;
    service.bigScreenService = bigScreenService;

    service.cryptoObject = { all: {}, top_volumns: {}, top_cryptos: {} };


    var topCryptosPromise = service.httpService.getTopCryptos();
    topCryptosPromise.then(function (results) {
        service.cryptoObject.top_cryptos = results.data;
        for(h=0;h<service.cryptoObject.top_cryptos.length;h++)
        {
            service.cryptoObject.top_cryptos[h].market_cap_usd = MoneyFormat(service.cryptoObject.top_cryptos[h].market_cap_usd);
            service.cryptoObject.top_cryptos[h].total_supply = MoneyFormat(service.cryptoObject.top_cryptos[h].total_supply);          
        }
        service.bigScreenService.changeBigScreenItem(service.cryptoObject.top_cryptos[0], 0);
        console.log(service.cryptoObject);

        // var allCryptoPromise = service.httpService.getAllCryptos();
        // allCryptoPromise.then(function (results) {
        //     service.cryptoObject.all = results;
        //     console.log(service.cryptoObject);
        // })
    })

    // var allCryptoPromise = service.httpService.getAllCryptos();
    // var tempSymbols = '';
    // allCryptoPromise.then(function (results) {
    //     service.cryptoObject.all = results;
    //     // service.bigScreenService.changeBigScreenItem(service.cryptoObject.all[0], 0);

    //     for (k = 0; k < service.cryptoObject.all.length; k++) {
    //         service.cryptoObject.all[k]['Price'] = {};
    //         // service.cryptoObject.all[k]['Track'] = false;

    //         tempSymbols = tempSymbols + service.cryptoObject.all[k].Symbol + ',';
    //     }
    //     var getAllPricesPromise = service.httpService.getAllPrices(tempSymbols);
    //     getAllPricesPromise.then(function (results2) {
    //         var t = 0;
    //         for (prop in results2.data.RAW) {
    //             service.cryptoObject.all[t].Price = results2.data.RAW[prop].USD;
    //             t++;
    //         }
    //         console.log(service.cryptoObject);
    //     })

    //     var topVolumnsPromise = service.httpService.getTopVolumns();
    //     topVolumnsPromise.then(function (results3) {
    //         service.cryptoObject.top_volumns = results3.data.Data;

    //     })
    // })

    service.trackCoin = function (coin) {
        console.log(coin);
        console.log(service.cryptoObject);

    }
    function MoneyFormat(labelValue) {
        // Nine Zeroes for Billions
        return Math.round(Math.abs(Number(labelValue)) >= 1.0e+9, -2)

            ? Math.round(Math.abs(Number(labelValue)) / 1.0e+9, -2) + "B"
            // Six Zeroes for Millions 
            : Math.round(Math.abs(Number(labelValue)) >= 1.0e+6, -2)

                ? Math.round(Math.abs(Number(labelValue)) / 1.0e+6, -2) + "M"
                // Three Zeroes for Thousands
                : Math.round(Math.abs(Number(labelValue)) >= 1.0e+3, -2)

                    ? Math.round(Math.abs(Number(labelValue)) / 1.0e+3, -2) + "K"

                    : Math.round(Math.abs(Number(labelValue)), -2);

    }


}])