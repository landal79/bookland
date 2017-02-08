define([], function () {

    // @ngInject
    function ListController($scope, bookService, baseUrl) {
        $scope.items = null;
        $scope.noresults = false;
        $scope.baseUrl = baseUrl;
        $scope.orderProp = 'title';

        $scope.loading = true;

        bookService.query().$promise.then(function(response) {
            $scope.items = response;
            $scope.noresults = $scope.items == null || $scope.items.length == 0;
        }).finally(function () {
            $scope.loading = false;
        });

    }

    return ListController;

});