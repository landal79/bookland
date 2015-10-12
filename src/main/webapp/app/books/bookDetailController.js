define([], function(){

    // @ngInject
    function DetailController($scope, $routeParams, bookService, $location) {
        $scope.detail = bookService.get({}, {
            'id': $routeParams.id
        });
        var id = $routeParams.id;
        $scope.edit = function () {
            $location.path("/edit/" + id);
        };
    }

    return DetailController;

});