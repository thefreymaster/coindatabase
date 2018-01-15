angular.module('coindbApp').service('accountHttpService', ['$http', function ($http) {


    var service = this;


    
    //NEED ACCOUNT INFO GET, CREATE NEW ACCOUNT
    service.createNewAccount = function(){
        var config = {
            account: {
                holdings: [],
                tracking: []
            }
        }
        return $http({
            method: 'POST',
            url: '/api/account/new',
            headers: { 'Content-Type': 'application/json' },
            data: config
        })
    }




    
    // console.log('Account HTTP Service');



}]);