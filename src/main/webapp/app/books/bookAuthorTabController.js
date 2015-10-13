define([], function () {

    // @ngInject
    function BookAuthorTabController($scope, $modal) {

        $scope.addAuthor = function (author) {

            if (author == undefined) {
                alert('Choose an author!');
                return;
            }

            if (typeof $scope.book.authors == 'undefined') {
                $scope.book.authors = [];
            } else if (typeof $scope.book.authors.find(function (elem) {
                    return elem.id == author.id;
                }) != 'undefined') {
                alert("author already added!");
                return;
            }

            $scope.book.authors.push(author);

            $scope.author = '';
        };

        $scope.removeAuthor = function (index) {
            $scope.book.authors.splice(index, 1);
        };

        $scope.open = function () {

            var modalInstance = $modal.open({
                templateUrl: 'app/authors/authorDialog.html',
                controller: 'AuthorModalCtrl',
                size: 'md'
            });

            modalInstance.result.then(function (author) {
                $scope.addAuthor(author);
            }, function () {

            });
        };
    }

    return BookAuthorTabController;

});