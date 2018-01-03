angular.module('coindbApp').service('reusableDataService', ['httpService', 'bigScreenService', function (httpService, bigScreenService) {
     var service = this;
     console.log('Reusable Data Service');
     service.httpService = httpService;
     service.bigScreenService = bigScreenService;

    service.cryptoObject = { all: {} };

    var allCryptoPromise = service.httpService.getAllCryptos();
    allCryptoPromise.then(function (results) {
        service.cryptoObject.all = results;
        service.bigScreenService.changeBigScreenItem(service.cryptoObject.all[0]);

    })
}])