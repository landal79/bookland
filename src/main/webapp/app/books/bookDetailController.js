define([], function(){

    // @ngInject
    function DetailController($scope, $stateParams, bookService, $location) {
        $scope.detail = bookService.get({}, {
            'id': $stateParams.id
        });
        var id = $stateParams.id;
        $scope.edit = function () {
            $location.path("/edit/" + id);
        };
    }

    return DetailController;

});