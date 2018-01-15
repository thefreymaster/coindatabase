angular.module('coindbApp').service('mediaService', ['$mdMedia', function ($mdMedia) {
    var service = this;
    // console.log('Media Service');

    service.$mdMedia = $mdMedia;

    service.xs = $mdMedia('xs');
    service.sm = $mdMedia('sm');
    service.md = $mdMedia('md');
    service.lg = $mdMedia('lg');
    service.xl = $mdMedia('xl');


}])