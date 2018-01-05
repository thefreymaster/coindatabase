angular.module('coindbApp').service('bigScreenService', ['httpService', '$mdSidenav', '$filter', function (httpService, $mdSidenav, $filter) {
    var service = this;
    console.log('Big Screen Service');
    service.httpService = httpService;

    service.bigScreenItem = {
        current: '',
        metrics: '',
        price: '',
        loading: true,
        active_side_nav_index: 2,
        historic_prices: {},
        chart_data: [],
        chart_labels: [],
        chart_color: ['#ff7043'],
        loading_chart: true,
        chart_available: true,
        holdings: [],
        add_holding_metrics: {
            cost: '',
            amount: ''
        }
    };

    service.openHoldingsMenu = function(){
        $mdSidenav('right').toggle();
    }

    service.changeBigScreenItem = function (newItem, index) {
        service.bigScreenItem.chart_data = [];
        service.bigScreenItem.chart_labels = [];
        service.bigScreenItem.holdings = [];
        service.bigScreenItem.add_holding_metrics.cost = '';
        service.bigScreenItem.add_holding_metrics.amount = '';
        

        $mdSidenav('left').close();
        service.bigScreenItem.loading = true;
        service.bigScreenItem.loading_chart = true;
        service.bigScreenItem.price = '';
        service.bigScreenItem.active_side_nav_index = index;


        // var currentPriceProm = service.httpService.getCurrentPrice(newItem.Symbol);
        // currentPriceProm.then(function (results) {

        //     service.bigScreenItem.price = results.data.RAW[newItem.Symbol].USD;
        //     service.bigScreenItem.price.MKTCAP = MoneyFormat(service.bigScreenItem.price.MKTCAP);
        //     service.bigScreenItem.price.SUPPLY = MoneyFormat(service.bigScreenItem.price.SUPPLY);




        var historyByDayPromise = service.httpService.getHistoryByDay(newItem.symbol)
        historyByDayPromise.then(function (results2) {
            if(results2.data.Response == 'Error'){
                console.error("API endpoint currently unavailable for graph data.");
                service.bigScreenItem.chart_available = false;
            }
            service.bigScreenItem.historic_prices = results2.data.Data;
            for (k = 0; k < service.bigScreenItem.historic_prices.length; k++) {
                service.bigScreenItem.chart_data.push(service.bigScreenItem.historic_prices[k].close);
                service.bigScreenItem.chart_labels.push($filter('date')(service.bigScreenItem.historic_prices[k].time * 1000, 'mediumDate'));

            }


        })

        // })


        service.bigScreenItem.current = newItem;
        // service.bigScreenItem.current.market_cap_usd = MoneyFormat(service.bigScreenItem.current.market_cap_usd);
        // service.bigScreenItem.current.max_supply = MoneyFormat(service.bigScreenItem.current.max_supply);

        

        service.bigScreenItem.loading = false;
        service.bigScreenItem.loading_chart = false;
        // console.log(service.bigScreenItem);
    }

    


}])