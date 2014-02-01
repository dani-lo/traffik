'use strict';

/* Controllers */

angular.module('traffik.controllers', [])
  /******************************************************************************
  //////////////////////////////////////////// RouteCtrl
  ******************************************************************************/
  .controller('RouteCtrl', [function(){

  }])
  /******************************************************************************
  //////////////////////////////////////////// NavCtrl
  ******************************************************************************/
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
  /******************************************************************************
  //////////////////////////////////////////// MapCtrl
  ******************************************************************************/
  .controller('MapCtrl', ['$scope', function ($scope) {
    $scope.mapOptions = {
        center: new google.maps.LatLng(35.784, -78.670),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    $scope.showMapVar = true;
  }])
  /******************************************************************************
  //////////////////////////////////////////// MapCtrl
  ******************************************************************************/
  /*
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

    var unbind = $rootScope.$on("geoLocate", refreshMap);

    $scope.$on('$destroy', unbind);

    $scope.$watch($scope.map.markers, function() {
      //alert("center changed ....")
      alert("change to map")
    });

    $scope.removeMarkers = function () {
      //  
      //alert("NOW")
      $scope.map.markers.length = 0;
    };

    function refreshMap(event, position) {
      //
      $scope.map.markers.push({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        showWindow: true,
        title: 'Marker 2'
      });

      $scope.maprefresh = true;
    };
  }])
*/
  /******************************************************************************
  //////////////////////////////////////////// JamsCtrl
  ******************************************************************************/
  .controller('JamsCtrl', ['GeolocationSrv', '$scope', '$rootScope', function(GeolocationSrv,  $scope, $rootScope){

    $scope.getGeolocation = function() {
      //
      GeolocationSrv.getGeolocation(function(position){
          //alert("ok....")
          $rootScope.$emit("geoLocate", position);
      });
    };

  }])
  /******************************************************************************
  //////////////////////////////////////////// UsersCtrl
  ******************************************************************************/
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
  }])
  /******************************************************************************
  //////////////////////////////////////////// ModalJamsCtrl
  ******************************************************************************/
  .controller('ModalJamsCtrl', ['$scope', '$modal', '$log', function($scope, $modal, $log){
    
    $scope.jam = {
        description: ''
    };

    $scope.open = function () {

        $scope.jam = {
          description: ''
        };

        $modal.open({
            templateUrl: 'myModalContent.html',
            backdrop: true,
            windowClass: 'modal',
            controller: function ($scope, $modalInstance, $log, jam) {
                $scope.jam = jam;
                $scope.submit = function () {
                    $log.log('Submiting jam info.');
                    $log.log(jam);
                    $modalInstance.dismiss('cancel');
                }
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            },
            resolve: {
                jam: function () {
                    return $scope.jam;
                }
            }
        });
    };
  }]);