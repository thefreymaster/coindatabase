angular.module('coindbApp').controller('AppController', ['$scope', '$mdMedia', '$mdSidenav', 'bigScreenService', '$state', '$localStorage', function($scope, $mdMedia, $mdSidenav, bigScreenService, $state, $localStorage){


        $scope.$mdMedia = $mdMedia;
        $scope.bigScreenService = bigScreenService;
        $scope.state = $state;
        $scope.localStorage = $localStorage;


        $scope.screenIsExtraSmall = $mdMedia('xs');
        $scope.screenIsSmall = $mdMedia('sm');
        $scope.screenIsMedium = $mdMedia('md');
        $scope.screenIsLarge = $mdMedia('lg');
        $scope.screenIsExtraLarge = $mdMedia('xl');
        
        $scope.inDevMode = false;

        $scope.goToHoldings = function(){
          $scope.bigScreenService.bigScreenItem.active_side_nav_index = -1;
          $state.go('holdings')
        }


  $scope.openLeftMenu = function() {
    $mdSidenav('left').toggle();
  };





}]);