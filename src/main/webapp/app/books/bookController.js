define([], function () {

    // @ngInject
    function BookController($scope, $rootScope, bookService, $location, $stateParams, bookImageService, baseUrl, fileReader) {

        $scope.coverImage = null;

        /*
         * Code executed to initialize controller values
         */
        var edit = $stateParams.id != null;
        if (edit) {
            $scope.book = bookService.get({}, {
                'id': $stateParams.id
            });
        } else {
            $scope.book = {};
        }

        if ($scope.book.id == null) {
            $scope.imageUrl = 'assets/img/nocover.jpg';
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

    }

    return BookController;

});