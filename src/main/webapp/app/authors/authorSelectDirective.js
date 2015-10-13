define([], function () {

    // @ngInject
    function AuthorSelectDirectiveController($scope, authorService) {
        $scope.authors = authorService.query();
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