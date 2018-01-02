app.controller('SideNavItemsController', function (httpService, bigScreenService) {
    var controller = this;
    controller.httpService = httpService;
    controller.bigScreenService = bigScreenService;

    controller.cryptoObject = { all: {} };

    var allCryptoPromise = controller.httpService.getAllCryptos();
    allCryptoPromise.then(function (results) {
        controller.cryptoObject.all = results;
        controller.bigScreenService.changeBigScreenItem(controller.cryptoObject.all[0]);
    })
   



});