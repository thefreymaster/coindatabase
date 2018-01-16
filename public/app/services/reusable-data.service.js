angular.module('coindbApp').service('reusableDataService', ['httpService', 'bigScreenService', '$localStorage', '$mdBottomSheet', '$mdSidenav', '$state', 'accountService', function (httpService, bigScreenService, $localStorage, $mdBottomSheet, $mdSidenav, $state, accountService) {
    var service = this;
    // console.log('Reusable Data Service');
    service.httpService = httpService;
    service.bigScreenService = bigScreenService;
    service.accountService = accountService;
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
        updated_live_holdings_data: [],
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



            // if (service.$storage.holdings != undefined) {
            //     for (w = 0; w < service.$storage.holdings.length; w++) {
            //         if (service.cryptoObject.top_cryptos[h].id == service.$storage.holdings[w].crypto.id) {
            //             service.cryptoObject.top_cryptos[h].holdings = true;
            //             service.cryptoObject.holdings_metrics.total_holdings_value = service.cryptoObject.holdings_metrics.total_holdings_value + (service.cryptoObject.top_cryptos[h].price_usd * service.$storage.holdings[w].amount);
            //             service.cryptoObject.holdings_metrics.total_holdings_cost = service.cryptoObject.holdings_metrics.total_holdings_cost + service.$storage.holdings[w].cost;
            //             service.cryptoObject.updated_live_holdings_data.push({ crypto: service.cryptoObject.top_cryptos[h], amount: service.$storage.holdings[w].amount, cost: service.$storage.holdings[w].cost });
            //             // service.calculateTotalHoldingsValue(service.cryptoObject.holdings_metrics.percent_change_1h, service.$storage.holdings[w].cost)
            //             // service.cryptoObject.holdings_metrics.percent_change_1h = service.cryptoObject.holdings_metrics.percent_change_1h + service.cryptoObject.top_cryptos[h].percent_change_1h;
            //             // service.cryptoObject.holdings_metrics.percent_change_24h = service.cryptoObject.holdings_metrics.percent_change_24h + service.cryptoObject.top_cryptos[h].percent_change_24h;
            //             // service.cryptoObject.holdings_metrics.percent_change_7d = service.cryptoObject.holdings_metrics.percent_change_7d + service.cryptoObject.top_cryptos[h].percent_change_7d;
            //         }
            //     }


            // }

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
        // console.log(service.tempPercents)
        console.log(service.cryptoObject);
        // console.log(service.$storage.holdings);
        // console.log(service.cryptoObject.updated_live_holdings_data);

    })

    service.accountService.account_data.$loaded(function () {
        if (service.accountService.account_data.tracking != undefined) {
            for (s = 0; s < service.cryptoObject.top_cryptos.length; s++) {
                for (d = 0; d < service.accountService.account_data.tracking.length; d++) {
                    if (service.cryptoObject.top_cryptos[s].id == service.accountService.account_data.tracking[d].id) {
                        service.cryptoObject.top_cryptos[s].tracked = true;
                        service.cryptoObject.tracked_cryptos.push(service.cryptoObject.top_cryptos[s]);
                    }
                }
            }
        }
        if (service.accountService.account_data.holdings != undefined) {
            for (s = 0; s < service.cryptoObject.top_cryptos.length; s++) {
                for (d = 0; d < service.accountService.account_data.holdings.length; d++) {
                    if (service.cryptoObject.top_cryptos[s].id == service.accountService.account_data.holdings[d].crypto.id) 
                    {
                        service.cryptoObject.top_cryptos[s].holdings = true;
                        service.cryptoObject.holdings_metrics.total_holdings_value = service.cryptoObject.holdings_metrics.total_holdings_value + (service.cryptoObject.top_cryptos[s].price_usd * service.accountService.account_data.holdings[d].amount);
                        service.cryptoObject.holdings_metrics.total_holdings_cost = service.cryptoObject.holdings_metrics.total_holdings_cost + service.accountService.account_data.holdings[d].cost;
                        service.cryptoObject.updated_live_holdings_data.push({ crypto: service.cryptoObject.top_cryptos[s], amount: service.accountService.account_data.holdings[d].amount, cost: service.accountService.account_data.holdings[d].cost });
                    }
                }
            }
        }
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

    service.calculateAllPercentsMaster = function () {
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

        if (service.accountService.account_data.holdings == undefined) {
            service.accountService.account_data.holdings = [];
            service.cryptoObject.updated_live_holdings_data = [];
            service.accountService.account_data.holdings.push({ crypto: coin, amount: amount, cost: cost });
            service.accountService.account_data.$save(0).then(function (ref) {
                ref.key === service.accountService.account_data.$id; // true
            });
            
            service.cryptoObject.updated_live_holdings_data.push({ crypto: coin, amount: amount, cost: cost });
        }
        else {
            service.accountService.account_data.holdings.push({ crypto: coin, amount: amount, cost: cost });
            service.accountService.account_data.$save(0).then(function (ref) {
                ref.key === service.accountService.account_data.$id; // true
            });
            service.cryptoObject.updated_live_holdings_data.push({ crypto: coin, amount: amount, cost: cost });

        }
        console.log(service.$storage.holdings);
    }

    service.deleteHolding = function (index) {
        service.cryptoObject.updated_live_holdings_data.splice(index, 1);

        service.accountService.account_data.holdings.splice(index, 1);
        service.accountService.account_data.$save(0).then(function (ref) {
            ref.key === service.accountService.account_data.$id; // true
        });

        if (service.accountService.account_data.holdings.holdings.length == 0) {
            service.accountService.account_data.holdings = null;
            service.cryptoObject.updated_live_holdings_data = null;

        }
    }

    service.trackCoin = function (coin) {
        if (coin.tracked == true) {
            coin.tracked = false;
            for (v = 0; v < service.cryptoObject.tracked_cryptos.length; v++) {
                if (service.cryptoObject.tracked_cryptos[v].id == coin.id) {
                    service.cryptoObject.tracked_cryptos.splice(v, 1);
                    // service.$storage.tracked_cryptos.splice(v, 1);
                    // console.log(service.$storage.tracked_cryptos);
                    service.accountService.account_data.tracking.splice(v, 1);
                    service.accountService.account_data.$save(0).then(function (ref) {
                        ref.key === service.accountService.account_data.$id; // true
                    });


                }
            }
            // var item = service.accountService.account_data[service.$storage.account_index];
            // service.accountService.account_data.$remove(item).then(function (ref) {
            //     ref.key === item.$id; // true
            // });


        }
        else {
            coin.tracked = true;
            service.cryptoObject.tracked_cryptos.push(coin);
            if (service.accountService.account_data.tracking == undefined) {
                service.accountService.account_data.tracking = [];
                service.$storage.tracked_cryptos = [];
            }
            service.accountService.account_data.tracking.push({
                symbol: coin.symbol,
                id: coin.id
            });
            service.accountService.account_data.$save(0).then(function (ref) {
                ref.key === service.accountService.account_data.$id; // true
            });

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