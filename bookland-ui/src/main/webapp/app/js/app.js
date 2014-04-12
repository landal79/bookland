'use strict';

var booklandModule = angular.module('bookland', ['ngRoute','ngResource'])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/list.html',
				controller: 'ListController',
				controllerAs: 'listCtrl',
				name: 'list'
			})
			.when('/edit/:id', {
				templateUrl: 'views/edit.html',
				controller: 'EditController',
				controllerAs: 'editCtrl',
				name: 'edit'
			})
			.when('/new', {
				templateUrl: 'views/edit.html',
				controller: 'NewController',
				controllerAs: 'newCtrl',
				name: 'new'
			})
			.when('/book/:id', {
				templateUrl: 'views/detail.html',
				controller: 'DetailController',
				controllerAs: 'detailCtrl',
				name: 'detail'
			})
			.when('/settings', {
				templateUrl: 'views/settings.html',
				controller: 'SettingsController',
				controllerAs: 'settings',
				name: 'settings'
			})
			.when('/about', {
				templateUrl: 'views/about.html',
				controller: 'AboutController',
				controllerAs: 'about',
				name: 'about'
			})
			.otherwise({
				redirectTo: '/'
			});
	})
	.factory('bookService', ['$resource',
		function ($resource) {
		return $resource('/bookland-backend/rest/books/:id', {id: '@id'}, {
			'update': { method: 'PUT'}
	    });
	}]);
