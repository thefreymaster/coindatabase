angular.module('coindbApp').controller('AppController', ['$scope', '$mdMedia', '$mdSidenav', 'bigScreenService', function($scope, $mdMedia, $mdSidenav, bigScreenService){


        $scope.$mdMedia = $mdMedia;
        $scope.bigScreenService = bigScreenService;

        $scope.screenIsExtraSmall = $mdMedia('xs');
        $scope.screenIsSmall = $mdMedia('sm');
        $scope.screenIsMedium = $mdMedia('md');
        $scope.screenIsLarge = $mdMedia('lg');
        $scope.screenIsExtraLarge = $mdMedia('xl');
        
        $scope.inDevMode = false;


  $scope.openLeftMenu = function() {
    $mdSidenav('left').toggle();
  };





}]);