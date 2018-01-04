angular.module('coindbApp').service('reusableDataService', ['httpService', 'bigScreenService', '$localStorage', function (httpService, bigScreenService, $localStorage) {
    var service = this;
    console.log('Reusable Data Service');
    service.httpService = httpService;
    service.bigScreenService = bigScreenService;
    service.$storage = $localStorage;

    service.cryptoObject = { all: {}, top_volumns: {}, top_cryptos: {}, tracked_cryptos: [] };


    var topCryptosPromise = service.httpService.getTopCryptos();
    topCryptosPromise.then(function (results) {
        service.cryptoObject.top_cryptos = results.data;
        for(h=0;h<service.cryptoObject.top_cryptos.length;h++)
        {
            service.cryptoObject.top_cryptos[h].market_cap_usd = MoneyFormat(service.cryptoObject.top_cryptos[h].market_cap_usd);
            service.cryptoObject.top_cryptos[h].total_supply = MoneyFormat(service.cryptoObject.top_cryptos[h].total_supply);   
            service.cryptoObject.top_cryptos[h].percent_change_24h = Number(service.cryptoObject.top_cryptos[h].percent_change_24h);
            service.cryptoObject.top_cryptos[h].rank = Number(service.cryptoObject.top_cryptos[h].rank);
            service.cryptoObject.top_cryptos[h].tracked = false;
            for(d=0;d<service.$storage.tracked_cryptos.length;d++)
            {
                if(service.cryptoObject.top_cryptos[h].id == service.$storage.tracked_cryptos[d].id)
                {
                    service.cryptoObject.top_cryptos[h].tracked = true;                 
                    service.cryptoObject.tracked_cryptos.push(service.$storage.tracked_cryptos[d]);
                }
            }
            
        }
        service.bigScreenService.changeBigScreenItem(service.cryptoObject.top_cryptos[0], 0);
        console.log(service.cryptoObject);
    })

    service.trackCoin = function (coin) {
        console.log(coin);
        console.log(service.cryptoObject);
        if(coin.tracked == true)
        {
            coin.tracked = false;
            for(v=0;v<service.cryptoObject.tracked_cryptos.length;v++){
                if(service.cryptoObject.tracked_cryptos[v].id == coin.id)
                {
                    service.cryptoObject.tracked_cryptos.splice(v, 1);
                    service.$storage.tracked_cryptos.splice(v, 1);
                    console.log(service.$storage.tracked_cryptos);
                }
            }
            
            
        }
        else{
            coin.tracked = true;
            service.cryptoObject.tracked_cryptos.push(coin);
            if(service.$storage.tracked_cryptos == undefined)
            {
                service.$storage.tracked_cryptos = [];
                service.$storage.tracked_cryptos.push(coin);
                console.log(service.$storage.tracked_cryptos);
            }
            else{
                service.$storage.tracked_cryptos.push(coin);
                console.log(service.$storage.tracked_cryptos);
                
            }
            
        }
        


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