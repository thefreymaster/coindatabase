angular.module('coindbApp').controller('AppController', ['$scope', '$mdMedia', '$mdSidenav', function($scope, $mdMedia, $mdSidenav){


        $scope.$mdMedia = $mdMedia;

        $scope.screenIsExtraSmall = $mdMedia('xs');
        $scope.screenIsSmall = $mdMedia('sm');
        $scope.screenIsMedium = $mdMedia('md');
        $scope.screenIsLarge = $mdMedia('lg');


  $scope.openLeftMenu = function() {
    $mdSidenav('left').toggle();
  };





}]);