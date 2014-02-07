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
  .controller('MapCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
    //
    $scope.mapOptions = {
        center: new google.maps.LatLng(-8.65629, 115.22209),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.showMapVar = true;

    $scope.markers = [];

    $scope.addMarker = function(lat, lng) {
      //
      var newMarker = new google.maps.Marker({
            map: $scope.myMap,
            //position: new google.maps.LatLng(-8.65629, 115.22209),
            position: new google.maps.LatLng(lat, lng)
      });

      $scope.markers.push(newMarker);
    };

    $scope.markerClicked = function (m) {
        //window.alert("clicked");
        //console.log(m);
    };

    var unbind = $rootScope.$on("geoLocated", refreshMap);

    $scope.$on('$destroy', unbind);

    function refreshMap(event, location) {
      //
      /*
      $scope.markers.push({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        showWindow: true,
        title: 'Marker 2'
      });
      */
      var newMarker = new google.maps.Marker({
            map: $scope.myMap,
            position: new google.maps.LatLng(location.coords.latitude, location.coords.longitude)
      });

      $scope.markers.push(newMarker);
    };

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
  .controller('ModalJamsCtrl', ['$scope', '$rootScope', '$modal', '$log', 'JamsSrv', 'GeolocationSrv',  function($scope, $rootScope, $modal, $log, JamsSrv, GeolocationSrv){

    $scope.open = function () {
        
      $modal.open({

        templateUrl: 'myModalContent.html',
        backdrop: true,
        windowClass: 'modal',

        controller: function ($scope, $modalInstance, $log) {
            
            $scope.input = {};

            $scope.submit = function () {
              
                var jam, location, user, date, jamsService;

                location = "ubud";
                user = null;
                date = new Date();

                jam = {
                  "date" : date,
                  "location" : location,
                  "user" : user,
                  "description" : $scope.input.description,
                  "latlng" : null
                };

                jamsService = new JamsSrv();

                GeolocationSrv.getGeolocation(function(location){

                  jam.latlng = "" + location.coords.latitude + "," + location.coords.longitude;
                  
                  jamsService.jam = jam;
                
                  jamsService.$save();

                  $rootScope.$emit("geoLocated", location);
                });
                
                $modalInstance.dismiss('cancel');
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
          },
          resolve: {
            //
          }
      });
    };

    

  }]);