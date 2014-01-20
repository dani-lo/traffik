'use strict';

/* Services */

var services;
// Demonstrate how to register services
// In this case it is a simple value service.
services = angular.module('myApp.services', []);

services.value('version', '0.1');

services.factory('Recipe', ['$resource',
	function($resource) {
		return $resource('/recipes/:id', {id: '@id'});
}]);

services.factory('MultiRecipeLoader', ['Recipe', '$q',
	function(Recipe, $q) {
		return function() {
			var delay = $q.defer();
			Recipe.query(function(recipes) {
					delay.resolve(recipes);
				}, 
				function() {
					delay.reject('Unable to fetch recipes');
				});
				return delay.promise;
			};
}]);

services.factory('RecipeLoader', ['Recipe', '$route', '$q',
	function(Recipe, $route, $q) {
		return function() {
			var delay = $q.defer();
			Recipe.get({id: $route.current.params.recipeId}, function(recipe) {
					delay.resolve(recipe);
				}, function() {
					delay.reject('Unable to fetch recipe ' + $route.current.params.recipeId);
				});
			return delay.promise;
		};
}]);
