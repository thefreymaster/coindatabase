app.controller('HoldingsController', function (httpService, bigScreenService, reusableDataService, $filter, $localStorage, $state) {
    var controller = this;
    controller.httpService = httpService;
    controller.bigScreenService = bigScreenService;
    controller.reusableDataService = reusableDataService;
    controller.$storage = $localStorage;
    controller.state = $state;

    console.log(controller.$storage)
    if(controller.$storage.holdings == undefined){
        controller.bigScreenService.changeBigScreenItem(controller.reusableDataService.cryptoObject.top_cryptos[0], 0);
        controller.state.go('quote');
    }
});