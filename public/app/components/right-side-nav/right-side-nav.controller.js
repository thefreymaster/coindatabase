app.controller('RightSideNavController', function (httpService, bigScreenService, reusableDataService, $filter) {
    var controller = this;
    controller.httpService = httpService;
    controller.bigScreenService = bigScreenService;
    controller.reusableDataService = reusableDataService;

    controller.calculateCost = function(usdPrice, amount){
        controller.bigScreenService.bigScreenItem.add_holding_metrics.cost = amount*usdPrice;
        $filter('number')(controller.bigScreenService.bigScreenItem.add_holding_metrics.cost, 2)
        
    }
    // controller.cryptoObject = { all: {} };

    // var allCryptoPromise = controller.httpService.getAllCryptos();
    // allCryptoPromise.then(function (results) {
    //     controller.cryptoObject.all = results;
    //     controller.bigScreenService.changeBigScreenItem(controller.cryptoObject.all[0]);
    // })
   



});