'use strict';

/* Controllers */

angular.module('traffik.controllers', [])
  .controller('RouteCtrl', [function(){

  }])
  .controller('NavCtrl', ['$scope', '$location', function($scope, $location) {
    //
   	//$scope.mylocation = $location.path();

   	$scope.getscreen = function(screen) {
   		$location.url('/' + screen);
   	};

    $scope.chekLocation = function(loc) {
      return $location.path() == loc;
    };
  }])
  .controller('MapCtrl', ['$scope', '$rootScope', function($scope, $rootScope){

    $scope.map = {
      center: {
        latitude: 45,
        longitude: -73
      },
      zoom: 8,
      refresh : true,
      markers: [
                {
                    latitude: 45,
                    longitude: -74,
                    showWindow: false,
                    title: 'Marker 2'
                },
                {
                    latitude: 15,
                    longitude: 30,
                    showWindow: false,
                    title: 'Marker 2'
                },
                {
                    latitude: 37,
                    longitude: -122,
                    showWindow: false,
                    title: 'Plane'
                }
            ]
    };

    $scope.markers = [];

    var unbind = $rootScope.$on("geoLocate", refreshMap);

    $scope.$on('$destroy', unbind);

    $scope.$watch($scope.map, function() {
      //alert("center changed ....")
    });

    function refreshMap(event, position) {
      //
      $scope.map.center = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };  
    };
  }])
  .controller('JamsCtrl', ['GeolocationSrv', '$scope', '$rootScope', function(GeolocationSrv,  $scope, $rootScope){

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
      //
      var newItemNo = $scope.items.length + 1;
      $scope.items.push('Item ' + newItemNo);
    };

    $scope.getGeolocation = function() {
      //
      GeolocationSrv.getGeolocation(function(position){
          //alert("ok....")
          $rootScope.$emit("geoLocate", position);
      });
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