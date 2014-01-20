'use strict';

booklandModule.controller('NavController', ['$route',
    function ($route) {
        this.is = function (title) {
            if (!$route.current) {
                return false;
            }
            return $route.current.name == title;
        };
}]).controller('ListController', ['$scope', 'books',
    function ($scope, books) {
        /*books.then(function (results) {
            $scope.items = results;
        });*/
        $scope.items = books.list();
}])
.controller('EditController', ['$scope', 'books', '$location',
    function ($scope, books, $location) {
        
    $scope.book = {};
        
    $scope.save = function() {
        alert('Save pressed!');
        books.add($scope.book);
        $location.path("/");
    };
}])
.controller('DetailController', ['$scope', '$routeParams', 'books',
    function ($scope, $routeParams, books) {
//        books.then(function (books) {
//            $scope.detail = books[$routeParams.id];
//     });
              $scope.detail = books.get($routeParams.id);
}])
.controller('SettingsController', function () {
    // TODO
})
.controller('AboutController', function () {
    // TODO
});