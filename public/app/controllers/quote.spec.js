describe('Quote controller', function(){
    var QuoteController;
    
    // Before each test load our api.users module
    beforeEach(angular.mock.module('bitcoinApp'));

    // Before each test set our injected Users factory (_Users_) to our local Users variable
    beforeEach(inject(function(_$controller_, _$rootScope_) {
        $scope = _$rootScope_.$new();
        $controller = _$controller_;
        QuoteController = $controller("QuoteController", {$scope: $scope});
    }));

    // A simple test to verify the Users factory exists
    it('should exist', function() {
        
        expect($controller).toBeDefined();
        // expect(1).toEqual(3);
    });
})