angular.module('bookland', ['ngRoute'])
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
		function ($http) {
			return $http.get('json/books.json')
				.success(function (data, status, headers, config) {
					console.info("success:\n" + headers);
				}).
			error(function (data, status, headers, config) {
				console.error("error:\n" + status);
			}).then(function (response) {
				return response.data.results;
			});
	}])
	.controller('NavController', ['$route',
		function ($route) {
			this.is = function (title) {
				if (!$route.current) {
					return false;
				}
				return $route.current.name == title;
			};
	}])
	.controller('ListController', ['$scope', 'books',
		function ($scope, books) {
			books.then(function (results) {
				$scope.items = results;
			});

}])
	.controller('EditController', ['$scope',
		function ($scope) {

}])
	.controller('DetailController', ['$scope', '$routeParams', 'books',
		function ($scope, $routeParams, books) {
			books.then(function (books) {
				$scope.detail = books[$routeParams.id];
			});
}])
	.controller('SettingsController', function () {
		// TODO
	})
	.controller('AboutController', function () {
		// TODO
	});