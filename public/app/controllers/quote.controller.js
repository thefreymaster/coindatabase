angular.module('coindbApp').controller('QuoteController', ['$scope', '$mdMedia', 'httpService', '$filter', function ($scope, $mdMedia, httpService, $filter) {

    $scope.test = 'This is test';


    $scope.httpService = httpService;

    $scope.bitcoin_price;
    $scope.historic_prices = [];
    $scope.historic_labels = [];
    $scope.colors;



    var quotePromise = $scope.httpService.getBitcoinQuote();
    quotePromise.then(function (results) {
        console.log(results);
        $scope.bitcoin_price = results.bpi.USD.rate_float;

        var yesterdayPromise = $scope.httpService.getYesterdaysBitcoinPrice();
        yesterdayPromise.then(function(result){
            console.log(result);

            var yesterdayDate = moment().add(-1, 'days');
            yesterdayDate = $filter('date')(yesterdayDate._d, 'yyyy-MM-dd', 'GMT');
            $scope.yesterdayPrice = result[yesterdayDate];
            $scope.dollar_change = $scope.bitcoin_price-$scope.yesterdayPrice;
            $scope.percent_change = (($scope.bitcoin_price-$scope.yesterdayPrice)/$scope.bitcoin_price)*100;

            var historicPromise = $scope.httpService.getHistoricBitcoinPrice();
            historicPromise.then(function(results){
                
                for(prop in results.bpi)
                {
                    $scope.historic_prices.push(results.bpi[prop]);
                    $scope.historic_labels.push(prop);
                }
                    if($scope.dollar_change > 0)
                    {
                        $scope.colors = ['#5bda90']
                    }
                    else if($scope.dollar_change < 0)
                    {
                        $scope.colors = ['#ff766c']
                    }
            })
        })

    })

    var timePromise = $scope.httpService.getTime();
    timePromise.then(function(results){
        $scope.time = results.data.iso;
    })

    

  $scope.series = ['Bitcoin'];
  $scope.data = [
        $scope.historic_prices
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };


  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
  $scope.options = {
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        },
        {
          id: 'y-axis-2',
          type: 'linear',
          display: false,
          position: 'right'
        }
      ]
    },
    elements: {
            point: {
                radius: 0
            }
        },
  };


}]);