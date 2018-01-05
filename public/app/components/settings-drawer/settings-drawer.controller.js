app.controller('SettingsDrawerController', function (httpService, bigScreenService, reusableDataService, $mdDialog) {
    var controller = this;
    controller.httpService = httpService;
    controller.bigScreenService = bigScreenService;
    controller.reusableDataService = reusableDataService;

    controller.test = 'ETH';
   
    controller.showDonateDialog = function(ev){
        $mdDialog.show({
            template: '<donate></donate>',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true
          })
    }


});