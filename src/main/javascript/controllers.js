'use strict';

var controllers = angular.module('bookland.controllers', [ 'bookland.services', 'bookland.filters', 'ngResource' ]);

controllers.controller('NavController', [ '$route', function($route) {
  this.is = function(title) {
    if (!$route.current) {
      return false;
    }
    return $route.current.name == title;
  };
} ]);

controllers.controller('ListController', [ '$scope', 'bookService', 'baseUrl', function($scope, bookService, baseUrl) {
  $scope.items = bookService.query();
  $scope.baseUrl = baseUrl;
  $scope.orderProp = 'title';
} ]);

controllers.controller('BookController', [ '$scope', '$rootScope', 'bookService', '$location', '$routeParams', 'bookImageService',
    'baseUrl', 'fileReader', BookCtrl ]);

controllers.controller('DetailController', [ '$scope', '$routeParams', 'bookService', '$location',
    function($scope, $routeParams, bookService, $location) {
      $scope.detail = bookService.get({}, {
        'id' : $routeParams.id
      });
      var id = $routeParams.id;
      $scope.edit = function() {
        $location.path("/edit/" + id);
      };
    } ]);

controllers.controller('NewAuthorController', [ '$scope', '$location', 'authorService',
    function($scope, $location, authorService) {
      $scope.author = {};
      $scope.save = function() {
        authorService.save($scope.author);
        $location.path("/");
      };
    } ]);

controllers.controller('AuthorBookDetailCtrl', [ '$scope', 'authorService', '$modal',
    function($scope, authorService, $modal) {

      $scope.authors = authorService.query();

      $scope.addAuthor = function(author) {

        if (author == undefined) {
          alert('Choose an author!');
          return;
        }

        if (typeof $scope.book.authors == 'undefined') {
          $scope.book.authors = [];
        } else if (typeof $scope.book.authors.find(function(elem) {
          return elem.id == author.id;
        }) != 'undefined') {
          alert("author already added!");
          return;
        }

        $scope.book.authors.push(author);

        $scope.author = '';
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
        modalInstance.result.then(function(author) {
          $scope.addAuthor(author);
          $scope.authors = authorService.query();
        }, function() {

        });
      };

    } ]);

controllers.controller('AuthorModalCtrl', [ '$scope', 'authorService', '$modalInstance', AuthorModalCtrl ]);

controllers.controller('SettingsController', function() {
  // TODO
});

controllers.controller('AboutController', function() {
  // TODO
});

/**
 * Book controller function.
 */
function BookCtrl($scope, $rootScope, bookService, $location, $routeParams, bookImageService, baseUrl, fileReader) {

  $scope.coverImage = null;

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
    $scope.imageUrl = baseUrl + '/books/' + $scope.book.id + '/image';
  }

  // controller page actions

  $scope.cancel = function() {
    $location.path("/");
  };

  $scope.save = function() {
    if (edit) {
      bookService.update($scope.book, function(book) {
        if ($scope.coverImage != null) {
          bookImageService.save({
            'id' : book.id
          }, $scope.coverImage);
        }
        $location.path("/list");
        $rootScope.$broadcast("book:saved", book);
      });
    } else {
      bookService.save($scope.book, function(book) {
        if ($scope.coverImage != null) {
          bookImageService.save({
            'id' : book.id
          }, $scope.coverImage);
        }
        $location.path("/list");
        $rootScope.$broadcast("book:saved", book);
      });
    }

  };

  /**
   * file selection call back
   */
  $scope.onFileSelected = function(event) {
    $scope.coverImage = event.target.files[0];
    fileReader.readAsDataURL($scope.coverImage, $scope).then(function(result) {
      $scope.imageUrl = result;
    });
  };

};

function AuthorModalCtrl($scope, authorService, $modalInstance) {
  $scope.author = {};
  $scope.save = function(author_form) {
    if (!author_form.$valid) {
      console.log('invalid author data!');
      alert('invalid author data!');
      return;
    }

    $modalInstance.close(authorService.save($scope.author));
  };
  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };

};
