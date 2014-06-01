'use strict';

var booklandModule = angular.module('bookland', ['ngRoute','ngResource','ui.bootstrap'])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/books/list.html',
				controller: 'ListController',
				controllerAs: 'listCtrl',
				name: 'list'
			})
			.when('/edit/:id', {
				templateUrl: 'views/books/edit.html',
				controller: 'EditController',
				controllerAs: 'editCtrl',
				name: 'edit'
			})
			.when('/new', {
				templateUrl: 'views/books/edit.html',
				controller: 'NewController',
				controllerAs: 'newCtrl',
				name: 'new'
			})
			.when('/book/:id', {
				templateUrl: 'views/books/detail.html',
				controller: 'DetailController',
				controllerAs: 'detailCtrl',
				name: 'detail'
			})
			.when('/newAuthor', {
				templateUrl: 'views/authors/edit.html',
				controller: 'NewAuthorController',
				controllerAs: 'newAuthorCtrl',
				name: 'newAuthor'
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
	}])
	.factory('bookImageService',['$resource',
		function($resource){
			return $resource('/bookland-backend/rest/books/:id/image', {id: '@id'}, {
				'save' : { method: 'POST',
					   headers: { 'Content-Type': undefined },
					   transformRequest: function (data, headersGetter) {
				            	if (data === undefined){return data;}
				            	var fd = new FormData();
								fd.append('file', data);
			            	    return fd;
				            }
		},
				'update': { method: 'PUT'}
	    });
	}])
	.factory('authorService',['$resource',
		function($resource){
			return $resource('/bookland-backend/rest/authors/:id', {id: '@id'}, {
			'update': { method: 'PUT'}
	    });
	}]);
