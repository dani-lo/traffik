'use strict';

angular.module('traffik', [
  'ui.map',
  'ui.bootstrap',
  'ngRoute',
  'ngResource',
  'traffik.filters',
  'traffik.services',
  'traffik.directives',
  'traffik.controllers'
]).
config(['$routeProvider', function($routeProvider) {
	//
 	$routeProvider.when('/user', {templateUrl: 'partials/screens/user.html', controller: 'UsersCtrl'});
  	//
  $routeProvider.when('/jams', {templateUrl: 'partials/screens/jams.html', controller: 'RouteCtrl'});
  	//
  $routeProvider.otherwise({redirectTo: '/user'});
}]);

function onGoogleReady() {
  angular.bootstrap(document.getElementById("map"), ['app.ui-map']);
}