'use strict';

/* Services */

var services;
// Demonstrate how to register services
// In this case it is a simple value service.
services = angular.module('traffik.services', []);

services.value('version', '0.1');
/*
services.factory('UsersSrv', ['$resource', function($resource) {

	return $resource( 'localhost:3000/users/:userId', { userId: '@userId' });
}]);
*/
services.factory('UsersSrv', ['$resource', function($resource) {

    return $resource(
        '/api/users/:userId',
        {userId: "@userId" },
        {
            "update": {method: "PUT"},
            "userjams": {'method': 'GET', 'params': {'userjams_only': "true"}, isArray: true}
        }
    );
}]);


services.factory('JamsSrv', ['$resource', function($resource) {

	return $resource('/api/jams/:action', {}, {
        'query' : { 
            method: 'GET', 
            params: {action : 'read', callback: 'JSON_CALLBACK', jam : null}, 
            isArray: true 
        },
        'save' : {
            method : 'POST', 
            params : {action : 'create'}
        },
        'update' : {
            method : 'PUT', 
            params : {action : 'update'}
        }
    });
}]);

/*
services.factory('JamsSrv', ['$resource', function($resource) {

    return $resource('/api/jams/create');
}]);
*/
/*
services.factory('JamsSrv', ['$resource', function($resource) {

    return $resource('/api/testpost', {}, {
        'save' : {method : 'POST'}
    });
}]);
*/
services.factory('GeolocationSrv', [function() {
    //
    var geolocationSrv = function() {
        //
    };

    geolocationSrv.getGeolocation = function(callback) {
        //
        if (navigator.geolocation) {

          var timeoutVal = 10 * 1000 * 1000;

          navigator.geolocation.getCurrentPosition(
            callback, 
            displayError,
            { enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
          );
        } else {
          alert("Geolocation is not supported by this browser");
        };

        function displayPosition(position) {
            //
            //alert("Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude);
            //return position.coords;
        };

        function displayError(error) {
            var errors = { 
                1: 'Permission denied',
                2: 'Position unavailable',
                3: 'Request timeout'
            };
            alert("Error: " + errors[error.code]);
        };
    };

    return geolocationSrv; 
}]);

	