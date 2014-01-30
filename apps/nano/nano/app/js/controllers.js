'use strict';

/* Controllers */

angular.module('traffik.controllers', [])
  .controller('RouteCtrl', [function(){

  }])
  .controller('NavCtrl', ['$scope', '$location', function($scope, $location) {
    //
   	$scope.mylocation = $location.path();

   	$scope.getscreen = function(screen) {
   		$location.url('/' + screen);
   	};
  }])
  .controller('JamsCtrl', ['$scope', function($scope){

    $scope.oneAtATime = true;

    $scope.groups = [
      {
        title: "Dynamic Group Header - 1",
        content: "Dynamic Group Body - 1"
      },
      {
        title: "Dynamic Group Header - 2",
        content: "Dynamic Group Body - 2"
      }
    ];

    $scope.items = ['Item 1', 'Item 2', 'Item 3'];

    $scope.addItem = function() {
      var newItemNo = $scope.items.length + 1;
      $scope.items.push('Item ' + newItemNo);
    };
  }])
  .controller('UsersCtrl', ['$scope', 'UsersSrv', function($scope, UsersSrv){
    
    $scope.user = {
      userName : null,
      userId : null
    };

    $scope.loadUser = function(userId){
      //
      UsersSrv.get({userId:userId}, function(user, getResponseHeaders){
        $scope.user.userId = user.id;
        $scope.user.userName = user.username;
      }, function(){
        //
      });
    };
}]);

function AccordionDemoCtrl($scope) {
  
}