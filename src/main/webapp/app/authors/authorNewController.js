define([], function () {

    // @ngInject
    function NewAuthorController($scope, $location, authorService) {
        $scope.author = {};
        $scope.save = function () {
            authorService.save($scope.author);
            $location.path("/");
        };
    }

    return NewAuthorController;

});