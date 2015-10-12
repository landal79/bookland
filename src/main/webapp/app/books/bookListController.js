define([], function () {

    // @ngInject
    function ListController($scope, bookService, baseUrl) {
        $scope.items = bookService.query();
        $scope.baseUrl = baseUrl;
        $scope.orderProp = 'title';
    }

    return ListController;

});