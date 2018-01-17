app.controller('ChangeAccountController', function (httpService, bigScreenService, reusableDataService, accountService, $mdDialog) {
    var controller = this;
    controller.httpService = httpService;
    controller.bigScreenService = bigScreenService;
    controller.reusableDataService = reusableDataService;
    controller.accountService = accountService;

    controller.new_account_ID = null;
    
    controller.hide = function(){
        $mdDialog.hide();
    }
   



});