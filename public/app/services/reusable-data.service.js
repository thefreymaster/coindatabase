angular.module('coindbApp').service('reusableDataService', ['httpService', 'bigScreenService', '$localStorage', '$mdBottomSheet', '$mdSidenav', '$state', function (httpService, bigScreenService, $localStorage, $mdBottomSheet, $mdSidenav, $state) {
    var service = this;
    console.log('Reusable Data Service');
    service.httpService = httpService;
    service.bigScreenService = bigScreenService;
    service.$storage = $localStorage;
    service.state = $state;

    service.cost;
    service.amount;
    if (service.cryptoObject != undefined) {
        service.cryptoObject = {};
    }


    service.cryptoObject = {
        top_volumns: {},
        top_cryptos: {},
        tracked_cryptos: [],
        major_spikes: [],
        minor_spikes: [],
        holdings_metrics: {
            total_holdings_value: 0,
            total_holdings_cost: 0,
            percent_change_1h: 0,
            percent_change_24h: 0,
            percent_change_7d: 0,

        },

        loading_holdings: true
    };

    service.toggleSettings = function () {
        $mdSidenav('left').toggle();
        $mdBottomSheet.show({
            template: '<settings-drawer></settings-drawer> '
        })
    }


    var topCryptosPromise = service.httpService.getTopCryptos();
    topCryptosPromise.then(function (results) {
        service.cryptoObject.top_cryptos = results.data;
        for (h = 0; h < service.cryptoObject.top_cryptos.length; h++) {
            service.cryptoObject.top_cryptos[h].market_cap_usd = MoneyFormat(service.cryptoObject.top_cryptos[h].market_cap_usd);
            service.cryptoObject.top_cryptos[h].total_supply = MoneyFormat(service.cryptoObject.top_cryptos[h].total_supply);
            service.cryptoObject.top_cryptos[h].percent_change_1h = Number(service.cryptoObject.top_cryptos[h].percent_change_1h);
            service.cryptoObject.top_cryptos[h].percent_change_24h = Number(service.cryptoObject.top_cryptos[h].percent_change_24h);
            service.cryptoObject.top_cryptos[h].percent_change_7d = Number(service.cryptoObject.top_cryptos[h].percent_change_7d);






            service.cryptoObject.top_cryptos[h].rank = Number(service.cryptoObject.top_cryptos[h].rank);
            service.cryptoObject.top_cryptos[h].price_usd = Number(service.cryptoObject.top_cryptos[h].price_usd);

            service.cryptoObject.top_cryptos[h].tracked = false;
            service.cryptoObject.top_cryptos[h].major_spike = false;
            service.cryptoObject.top_cryptos[h].minor_spikes = false;
            service.cryptoObject.top_cryptos[h].holding = false;

            if (service.$storage.tracked_cryptos != undefined) {
                for (d = 0; d < service.$storage.tracked_cryptos.length; d++) {
                    if (service.cryptoObject.top_cryptos[h].id == service.$storage.tracked_cryptos[d].id) {
                        service.cryptoObject.top_cryptos[h].tracked = true;
                        service.cryptoObject.tracked_cryptos.push(service.cryptoObject.top_cryptos[h]);
                    }
                }
            }
            if (service.$storage.holdings != undefined) {
                for (w = 0; w < service.$storage.holdings.length; w++) {
                    if (service.cryptoObject.top_cryptos[h].id == service.$storage.holdings[w].crypto.id) {
                        service.cryptoObject.top_cryptos[h].holdings = true;
                        service.cryptoObject.holdings_metrics.total_holdings_value = service.cryptoObject.holdings_metrics.total_holdings_value + (service.cryptoObject.top_cryptos[h].price_usd * service.$storage.holdings[w].amount);
                        service.cryptoObject.holdings_metrics.total_holdings_cost = service.cryptoObject.holdings_metrics.total_holdings_cost + service.$storage.holdings[w].cost;
                        // service.calculateTotalHoldingsValue(service.cryptoObject.holdings_metrics.percent_change_1h, service.$storage.holdings[w].cost)
                        // service.cryptoObject.holdings_metrics.percent_change_1h = service.cryptoObject.holdings_metrics.percent_change_1h + service.cryptoObject.top_cryptos[h].percent_change_1h;
                        // service.cryptoObject.holdings_metrics.percent_change_24h = service.cryptoObject.holdings_metrics.percent_change_24h + service.cryptoObject.top_cryptos[h].percent_change_24h;
                        // service.cryptoObject.holdings_metrics.percent_change_7d = service.cryptoObject.holdings_metrics.percent_change_7d + service.cryptoObject.top_cryptos[h].percent_change_7d;
                    }
                }


            }

            if (service.cryptoObject.top_cryptos[h].percent_change_24h > 100) {
                service.cryptoObject.top_cryptos[h].major_spike = true;
                service.cryptoObject.major_spikes.push(service.cryptoObject.top_cryptos[h]);
            }
            if (service.cryptoObject.top_cryptos[h].percent_change_24h < 100 && service.cryptoObject.top_cryptos[h].percent_change_24h > 50) {
                service.cryptoObject.top_cryptos[h].minor_spikes = true;
                service.cryptoObject.minor_spikes.push(service.cryptoObject.top_cryptos[h]);
            }

        }


        service.calculateAllPercentsMaster();
        if (service.bigScreenService.bigScreenItem.current == "") {
            if (service.$storage.holdings == undefined) {
                    service.bigScreenService.changeBigScreenItem(service.cryptoObject.top_cryptos[0], 0);
                    service.state.go('quote');
            }
            else {
                service.state.go('holdings');
            }

        }

        // service.calculateTotalHoldingsValue();
        service.cryptoObject.loading_holdings = false

        // service.bigScreenService.changeBigScreenItem(service.cryptoObject.top_cryptos[0], 0);
        console.log(service.tempPercents)
        console.log(service.cryptoObject);
        console.log(service.$storage.holdings);

    })

    service.tempPercents = {
        oneHour: [],
        tfHour: [],
        sevenDay: []
    };
    var tempTotal = 0;

    var temp1hr = 0;
    var temp24hr = 0;
    var temp1day = 0;

    service.calculateAllPercentsMaster = function(){
        for (r = 0; r < service.cryptoObject.top_cryptos.length; r++) {
            if (service.$storage.holdings != undefined) {
                for (u = 0; u < service.$storage.holdings.length; u++) {
                    if (service.cryptoObject.top_cryptos[r].id == service.$storage.holdings[u].crypto.id) {
                        service.calculateIndividualPercents('oneHour', service.cryptoObject.top_cryptos[r].percent_change_1h, service.$storage.holdings[u].cost, service.cryptoObject.holdings_metrics.total_holdings_cost, u)
                        service.calculateIndividualPercents('tfHour', service.cryptoObject.top_cryptos[r].percent_change_24h, service.$storage.holdings[u].cost, service.cryptoObject.holdings_metrics.total_holdings_cost, u)
                        service.calculateIndividualPercents('sevenDay', service.cryptoObject.top_cryptos[r].percent_change_7d, service.$storage.holdings[u].cost, service.cryptoObject.holdings_metrics.total_holdings_cost, u)

                    }
                }
            }

        }
        service.calculateTotalPercents();

    }

    service.calculateTotalPercents = function () {
        for (u = 0; u < service.tempPercents.oneHour.length; u++) {
            if (service.tempPercents.oneHour[u] != undefined) {
                temp1hr = temp1hr + service.tempPercents.oneHour[u];
            }

        }
        for (y = 0; y < service.tempPercents.tfHour.length; y++) {

            if (service.tempPercents.tfHour[y] != undefined) {
                temp24hr = temp24hr + service.tempPercents.tfHour[y];
            }

        }
        for (o = 0; o < service.tempPercents.sevenDay.length; o++) {

            if (service.tempPercents.sevenDay[o] != undefined) {
                temp1day = temp1day + service.tempPercents.sevenDay[o];
            }
        }
        service.calculatePortionPercents();
    }

    service.calculatePortionPercents = function () {
        service.cryptoObject.holdings_metrics.percent_change_1h = temp1hr / service.tempPercents.oneHour.length;
        service.cryptoObject.holdings_metrics.percent_change_24h = temp24hr / service.tempPercents.tfHour.length;
        service.cryptoObject.holdings_metrics.percent_change_7d = temp1day / service.tempPercents.sevenDay.length;
    }

    service.calculateIndividualPercents = function (type, percentChange, initialCost, totalCost, index) {
        var portionPercentChange = percentChange * (initialCost / totalCost);
        service.tempPercents[type].push(portionPercentChange);
    }

    service.saveHolding = function (coin, amount, cost) {

        if (service.$storage.holdings == undefined) {
            service.$storage.holdings = [];
            service.$storage.holdings.push({ crypto: coin, amount: amount, cost: cost });
            // console.log(service.$storage.holdings);
        }
        else {
            service.$storage.holdings.push({ crypto: coin, amount: amount, cost: cost });
        }

    }

    service.deleteHolding = function (index) {
        service.$storage.holdings.splice(index, 1)
        if(service.$storage.holdings.length == 0)
        {
            service.$storage.holdings = null;
        }
    }

    service.trackCoin = function (coin) {
        // console.log(coin);
        // console.log(service.cryptoObject);
        if (coin.tracked == true) {
            coin.tracked = false;
            for (v = 0; v < service.cryptoObject.tracked_cryptos.length; v++) {
                if (service.cryptoObject.tracked_cryptos[v].id == coin.id) {
                    service.cryptoObject.tracked_cryptos.splice(v, 1);
                    service.$storage.tracked_cryptos.splice(v, 1);
                    // console.log(service.$storage.tracked_cryptos);
                }
            }


        }
        else {
            coin.tracked = true;
            service.cryptoObject.tracked_cryptos.push(coin);
            if (service.$storage.tracked_cryptos == undefined) {
                service.$storage.tracked_cryptos = [];
                service.$storage.tracked_cryptos.push(coin);
                // console.log(service.$storage.tracked_cryptos);
            }
            else {
                service.$storage.tracked_cryptos.push(coin);
                // console.log(service.$storage.tracked_cryptos);

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