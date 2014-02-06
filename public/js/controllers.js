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
    //
    $scope.mapOptions = {
        center: new google.maps.LatLng(-8.65629, 115.22209),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.showMapVar = true;

    $scope.markers = [];

    $scope.addMarker = function() {
      //
      var newMarker = new google.maps.Marker({
            map: $scope.myMap,
            position: new google.maps.LatLng(-8.65629, 115.22209),
      });

      $scope.markers.push(newMarker);
    };

    $scope.markerClicked = function (m) {
        window.alert("clicked");
        console.log(m);
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
  .controller('ModalJamsCtrl', ['$scope', '$modal', '$log', 'JamsSrv', function($scope, $modal, $log, JamsSrv){
    
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
            $scope.createJam = function() {

              var jam = {
                "date" : "24-01-2014",
                "location" : "ubud",
                "user" : "2",
                "description" : "Stuck here am desperate",
                "latlng" : "-8.515581,115.260057"
              };
              
              var jamsService = new JamsSrv();
              jamsService.jam = jam;
              jamsService.$save();
              //JamsSrv.data = {"ppppp" : "oooooo"};
              //JamsSrv.save({}, data);
              //JamsSrv.save({"location" : "ubud", "jam" : encodeURIComponent(JSON.stringify(jam))});
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