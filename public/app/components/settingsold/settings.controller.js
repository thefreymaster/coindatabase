app.controller('SettingsController', function (httpService, bigScreenService, reusableDataService, $mdDialog) {
    var controller = this;
    controller.httpService = httpService;
    controller.bigScreenService = bigScreenService;
    controller.reusableDataService = reusableDataService;

    console.log('settings')
    controller.showDonateDialog = function(){
        $mdDialog.show({
            controller: '',
            templateUrl: 'dialog1.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true
          })
    }


   



});