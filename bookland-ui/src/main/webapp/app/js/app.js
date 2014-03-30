'use strict';

var booklandModule = angular.module('bookland', ['ngRoute'])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/list.html',
				controller: 'ListController',
				controllerAs: 'listCtrl',
				name: 'list'
			})
			.when('/new', {
				templateUrl: 'views/edit.html',
				controller: 'EditController',
				controllerAs: 'editCtrl',
				name: 'edit'
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
	.factory('books', ['$http',
		function ($http, $scope) {

			return $http.get('/bookland-backend/rest/books')
//				.success(function (data, status, headers, config) {
//					console.info("success:\n" + headers);
//				})
//                .error(function (data, status, headers, config) {
//                    console.error("error:\n" + status);
//                })
                .then(function (response) {
                	return response.data;
                });
	}]);
