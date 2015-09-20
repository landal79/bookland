(function () {
    'use strict';

    var blControllers = angular.module('bookland.book');

    function ListController($scope, bookService, baseUrl) {
        $scope.items = bookService.query();
        $scope.baseUrl = baseUrl;
        $scope.orderProp = 'title';
    }

    blControllers.controller('ListController', ListController);

    function DetailController($scope, $routeParams, bookService, $location) {
        $scope.detail = bookService.get({}, {
            'id': $routeParams.id
        });
        var id = $routeParams.id;
        $scope.edit = function () {
            $location.path("/edit/" + id);
        };
    }

    blControllers.controller('DetailController', DetailController);

    /**
     * Book controller function.
     */
    function BookController($scope, $rootScope, bookService, $location, $routeParams, bookImageService, baseUrl, fileReader) {

        $scope.coverImage = null;

        /*
         * Code executed to initialize controller values
         */
        var edit = $routeParams.id != null;
        if (edit) {
            $scope.book = bookService.get({}, {
                'id': $routeParams.id
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

        $scope.cancel = function () {
            $location.path("/");
        };

        $scope.save = function () {
            if (edit) {
                bookService.update($scope.book, function (book) {
                    if ($scope.coverImage != null) {
                        bookImageService.save({
                            'id': book.id
                        }, $scope.coverImage);
                    }
                    $location.path("/list");
                    $rootScope.$broadcast("book:saved", book);
                });
            } else {
                bookService.save($scope.book, function (book) {
                    if ($scope.coverImage != null) {
                        bookImageService.save({
                            'id': book.id
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
        $scope.onFileSelected = function (event) {
            $scope.coverImage = event.target.files[0];
            fileReader.readAsDataURL($scope.coverImage, $scope).then(function (result) {
                $scope.imageUrl = result;
            });
        };

    };

    blControllers.controller('BookController', BookController);

})();