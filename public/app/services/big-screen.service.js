angular.module('coindbApp').service('bigScreenService', ['httpService', function (httpService) {
     var service = this;
     console.log('Big Screen Service');
     service.httpService = httpService;

     service.bigScreenItem = {
          current: '',
          metrics: '',
          price: '',
          loading: false
     };

     service.changeBigScreenItem = function(newItem){
          service.bigScreenItem.loading = true;
          service.bigScreenItem.price = '';

          var currentPriceProm = service.httpService.getCurrentPrice(newItem.Symbol);
          currentPriceProm.then(function(results){
               service.bigScreenItem.price = results.data.RAW[newItem.Symbol].USD;   
               service.bigScreenItem.loading = false;
                        
          })
          service.bigScreenItem.current = newItem;
          console.log(service.bigScreenItem);
     }
}])