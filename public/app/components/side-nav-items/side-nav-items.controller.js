app.controller('SideNavItemsController', function (httpService, bigScreenService, reusableDataService) {
    var controller = this;
    controller.httpService = httpService;
    controller.bigScreenService = bigScreenService;
    controller.reusableDataService = reusableDataService;

    controller.orderByTerm = 'rank';
    controller.reverseStatus = false;

    controller.changeOrderByTerm = function(term){
        if(controller.orderByTerm == term)
        {
            controller.reverseStatus = true;
        }
        else{
            controller.reverseStatus = false;
        }
        controller.orderByTerm = term;
        
    }
    // controller.cryptoObject = { all: {} };

    // var allCryptoPromise = controller.httpService.getAllCryptos();
    // allCryptoPromise.then(function (results) {
    //     controller.cryptoObject.all = results;
    //     controller.bigScreenService.changeBigScreenItem(controller.cryptoObject.all[0]);
    // })
   



});