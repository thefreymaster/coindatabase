app.controller('DonateController', function (httpService, bigScreenService, reusableDataService, $mdDialog) {
    var controller = this;
    controller.httpService = httpService;
    controller.bigScreenService = bigScreenService;
    controller.reusableDataService = reusableDataService;


    controller.hide = function(){
        $mdDialog.hide();
    }



});