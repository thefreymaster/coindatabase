angular.module('coindbApp').service('bigScreenService', ['httpService', '$mdSidenav', function (httpService, $mdSidenav) {
     var service = this;
     console.log('Big Screen Service');
     service.httpService = httpService;

     service.bigScreenItem = {
          current: '',
          metrics: '',
          price: '',
          loading: true,
          active_side_nav_index: 2
     };
     
     service.changeBigScreenItem = function(newItem, index){
          $mdSidenav('left').close();
          service.bigScreenItem.loading = true;
          service.bigScreenItem.price = '';
          service.bigScreenItem.active_side_nav_index = index;
          

          var currentPriceProm = service.httpService.getCurrentPrice(newItem.Symbol);
          currentPriceProm.then(function(results){

               service.bigScreenItem.price = results.data.RAW[newItem.Symbol].USD; 
               service.bigScreenItem.price.MKTCAP = MoneyFormat(service.bigScreenItem.price.MKTCAP);
               service.bigScreenItem.price.SUPPLY = MoneyFormat(service.bigScreenItem.price.SUPPLY);
                 
               
               service.bigScreenItem.loading = false;
                        
          })
          service.bigScreenItem.current = newItem;
          console.log(service.bigScreenItem);
     }

     function MoneyFormat(labelValue) 
     {
     // Nine Zeroes for Billions
     return Math.round(Math.abs(Number(labelValue)) >= 1.0e+9, -2)
   
          ? Math.round(Math.abs(Number(labelValue)) / 1.0e+9, -2) + "B"
          // Six Zeroes for Millions 
          : Math.round(Math.abs(Number(labelValue)) >= 1.0e+6, -2)
   
          ? Math.round(Math.abs(Number(labelValue)) / 1.0e+6, -2) + "M"
          // Three Zeroes for Thousands
          : Math.round(Math.abs(Number(labelValue)) >= 1.0e+3, -2)
   
          ? Math.round(Math.abs(Number(labelValue)) / 1.0e+3, -2) + "K"
   
          : Math.round(Math.abs(Number(labelValue)), -2);
   
      }
}])