app.controller('RightSideNavController', function (httpService, bigScreenService, reusableDataService) {
    var controller = this;
    controller.httpService = httpService;
    controller.bigScreenService = bigScreenService;
    controller.reusableDataService = reusableDataService;

    controller.calculateCost = function(usdPrice, amount){
        controller.cost = amount*usdPrice;
        
    }
    // controller.cryptoObject = { all: {} };

    // var allCryptoPromise = controller.httpService.getAllCryptos();
    // allCryptoPromise.then(function (results) {
    //     controller.cryptoObject.all = results;
    //     controller.bigScreenService.changeBigScreenItem(controller.cryptoObject.all[0]);
    // })
   



});