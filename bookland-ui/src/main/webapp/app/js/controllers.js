'use strict';

booklandModule.controller('NavController', [ '$route', function($route) {
	this.is = function(title) {
		if (!$route.current) {
			return false;
		}
		return $route.current.name == title;
	};
} ]).controller('ListController',
		[ '$scope', 'bookService', function($scope, bookService) {
			$scope.items = bookService.query();
		} ]).controller(
		'BookController',
		[ '$scope', 'bookService', '$location', '$routeParams',
				'authorService', 'bookImageService', '$modal', BookCtrl ])
		.controller(
				'DetailController',
				[ '$scope', '$routeParams', 'bookService', '$location',
						function($scope, $routeParams, bookService, $location) {
							$scope.detail = bookService.get({}, {
								'id' : $routeParams.id
							});
							var id = $routeParams.id;
							$scope.edit = function() {
								$location.path("/edit/" + id);
							};
						} ]).controller(
				'NewAuthorController',
				[ '$scope', '$location', 'authorService',
						function($scope, $location, authorService) {
							$scope.author = {};
							$scope.save = function() {
								authorService.save($scope.author);
								$location.path("/");
							};
						} ]).controller('SettingsController', function() {
			// TODO
		}).controller('AboutController', function() {
			// TODO
		});

function BookCtrl($scope, bookService, $location, $routeParams, authorService,
		bookImageService, $modal) {

	/*
	 * Code executed to initialize controller values
	 */
	var edit = $routeParams.id != null;
	if (edit) {
		$scope.book = bookService.get({}, {
			'id' : $routeParams.id
		});
	} else {
		$scope.book = {};
	}

	if ($scope.book.id == null) {
		$scope.imageUrl = 'img/nocover.jpg';
	} else {
		$scope.imageUrl = '/bookland-backend/rest/books/' + $scope.book.id
				+ '/image';
	}

	$scope.authors = authorService.query();

	// controller page actions

	$scope.cancel = function() {
		$location.path("/");
	};

	$scope.save = function() {
		var resultPromise;
		if (edit) {
			resultPromise = bookService.update($scope.book).$promise;
		} else {
			resultPromise = bookService.save($scope.book).$promise;
		}

		resultPromise.then(function(book) {
			if ($scope.coverImage != null) {
				bookImageService.save({
					'id' : book.id
				}, $scope.coverImage);
			}
			$location.path("/");
		});

	};

	$scope.addAuthor = function(author) {

		if (author == undefined) {
			alert('Choose an author!');
			return;
		}

		if (typeof $scope.book.authors == 'undefined') {
			$scope.book.authors = [];
		}

		if ($scope.book.authors.indexOf(author) != -1) {
			alert("Author already added!");
			return;
		}

		$scope.book.authors.push(author);
	};

	$scope.removeAuthor = function(index) {
		$scope.book.authors.splice(index, 1);
	};

	$scope.open = function() {
		var modalInstance = $modal.open({
			templateUrl : 'views/authors/authorDialog.html',
			controller : 'AuthorModalCtrl',
			size : 'md'
		});
		modalInstance.result.then(function() {
			$scope.authors = authorService.query();
		}, function() {

		});
	};
}

function AuthorModalCtrl($scope, authorService, $modalInstance) {
	$scope.author = {};
	$scope.save = function(author_form) {
		if (!author_form.$valid) {
			console.log('invalid author data!');
			alert('invalid author data!');
			return;
		}

		authorService.save($scope.author);
		$modalInstance.close();
	};
	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};

};