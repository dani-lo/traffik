'use strict';

/* jasmine specs for controllers go here */
/*
describe('controllers', function(){
  
  beforeEach(module('traffik.controllers'));


  it('should ....', inject(function() {
    //spec body
  }));

  it('should ....', inject(function() {
    //spec body
  }));
});

*/
describe('NavCtrl', function() {
    
    var $scope, $location, $rootScope, createController;

    beforeEach(module('traffik'));

    beforeEach(inject(function($injector) {

        $location = $injector.get('$location');
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();

        var $controller = $injector.get('$controller');

        createController = function() {
            return $controller('NavCtrl', {
                '$scope': $scope
            });
        };
    }));

    it('should navigate to the correct screen', function() {

        var controller = createController();

        $scope.getscreen("jams")
	    expect($location.path()).toBe('/jams');
    });
});