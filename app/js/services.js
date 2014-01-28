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
        'http://localhost:8888/api/users/:userId',
        {userId: "@userId" },
        {
            "update": {method: "PUT"},
            "userjams": {'method': 'GET', 'params': {'userjams_only': "true"}, isArray: true}
        }
    );
}]);

services.factory('JamsSrv', ['$resource', function($resource) {

	return $resource('http://localhost:8888/api/jams/:townId', {}, {
        jsonpquery: { method: 'JSONP', params: {callback: 'JSON_CALLBACK'}, isArray: true }
    });
}]);

	