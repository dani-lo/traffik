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
  .controller('JamsCtrl', [function(){

  }])
  .controller('UsersCtrl', ['$scope', 'UsersSrv', function($scope, UsersSrv){
    
    $scope.user = {
      userName : null,
      userId : null
    };

    $scope.loadUser = function(userId){
      //
      console.log("go?")
      UsersSrv.get({userId:userId}, function(user, getResponseHeaders){
        console.log("got it")
        $scope.user.userId = user.id;
        $scope.user.userName = user.username;
      }, function(){
        //
      });
    };
}]);