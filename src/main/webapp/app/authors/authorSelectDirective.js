define([], function () {

    // @ngInject
    function AuthorSelectDirectiveController($scope, authorService) {
        $scope.authors = authorService.query();

        $scope.$on('author:added', function(event, author) {
            $scope.authors.push(author);
            $scope.authors.sort(function(a,b){
                return a.localeCompare(b);
            });
        });
    }

    function authorSelectDirective() {
        return {
            restrict: 'E',
            templateUrl: 'app/authors/authorSelect.html',
            scope: {
                'author' : '='
            },
            controller: AuthorSelectDirectiveController
        }
    }

    return authorSelectDirective;

});