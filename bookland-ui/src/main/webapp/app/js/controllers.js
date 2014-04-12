'use strict';

booklandModule.controller('NavController', ['$route',
    function ($route) {
        this.is = function (title) {
            if (!$route.current) {
                return false;
            }
            return $route.current.name == title;
        };
}]).controller('ListController', ['$scope', 'bookService',
    function ($scope, bookService) {
	   $scope.items = bookService.query();
}])
.controller('NewController', ['$scope', 'bookService', '$location',
    function ($scope, bookService, $location) {
	    $scope.book = {};
	    $scope.save = function() {
	    	bookService.create($scope.book);
	        $location.path("/");
	    };
}])
.controller('EditController', ['$scope', 'bookService', '$location', '$routeParams',
    function ($scope, bookService, $location, $routeParams) {
	    $scope.book = bookService.get({},{'id': $routeParams.id});;
	    $scope.save = function() {
	    	bookService.update($scope.book);
	        $location.path("/");
	    };
}])
.controller('DetailController', ['$scope', '$routeParams', 'bookService', '$location',
    function ($scope, $routeParams, bookService, $location) {
	 $scope.detail = bookService.get({},{'id': $routeParams.id});
		var id = $routeParams.id;
		$scope.edit = function() {
			$location.path("/edit/"+id);
		};
}])
.controller('SettingsController', function () {
    // TODO
})
.controller('AboutController', function () {
    // TODO
});