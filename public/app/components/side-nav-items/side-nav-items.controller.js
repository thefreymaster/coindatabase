app.controller('SideNavItemsController', function (httpService, bigScreenService, reusableDataService, $state, $localStorage) {
    var controller = this;
    controller.httpService = httpService;
    controller.bigScreenService = bigScreenService;
    controller.reusableDataService = reusableDataService;

    controller.orderByTerm = 'rank';
    controller.reverseStatus = false;
    controller.showMinor = true;
    controller.showMajor = true;
    controller.state = $state;
    controller.localStorage = $localStorage;

    controller.goToHoldings = function () {
        controller.bigScreenService.bigScreenItem.active_side_nav_index = -1;
        controller.state.go('holdings')
    }

    controller.changeOrderByTerm = function (term) {
        if (controller.orderByTerm == term) {
            controller.reverseStatus = true;
        }
        else {
            controller.reverseStatus = false;
        }
        controller.orderByTerm = term;

    }
    controller.toggleMinor = function () {
        if (controller.showMinor == true) {
            controller.showMinor = false;
        }
        else if (controller.showMinor == false) {
            controller.showMinor = true;
        }
    }
    controller.toggleMajor = function () {
        if (controller.showMajor == true) {
            controller.showMajor = false;
        }
        else if (controller.showMajor == false) {
            controller.showMajor = true;
        }
    }    // controller.cryptoObject = { all: {} };

    // var allCryptoPromise = controller.httpService.getAllCryptos();
    // allCryptoPromise.then(function (results) {
    //     controller.cryptoObject.all = results;
    //     controller.bigScreenService.changeBigScreenItem(controller.cryptoObject.all[0]);
    // })




});