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
.controller('NewController', ['$scope', '$location', 'bookService', 'authorService',
    function ($scope, $location, bookService, authorService) {
	    $scope.book = {};		
		$scope.authors = authorService.query();		
	    $scope.save = function() {
	    	bookService.save($scope.book);
	        $location.path("/");
	    };		
		$scope.addAuthor = function(author){
			if(typeof $scope.book.authors == 'undefined'){
				$scope.book.authors = [];
			}
			$scope.book.authors.push(author);
		};
}])
.controller('EditController', ['$scope', 'bookService', '$location', '$routeParams', 'authorService',
    function ($scope, bookService, $location, $routeParams, authorService) {
	    $scope.book = bookService.get({},{'id': $routeParams.id});
		$scope.authors = authorService.query();	
	    $scope.save = function() {
	    	bookService.update($scope.book);
	        $location.path("/");
	    };
		$scope.addAuthor = function(author){
			if(typeof $scope.book.authors == 'undefined'){
				$scope.book.authors = [];
			}
			$scope.book.authors.push(author);
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
.controller('NewAuthorController', ['$scope', '$location', 'authorService',
    function ($scope, $location, authorService) {		
		$scope.author = {};		
	    $scope.save = function() {			
	    	authorService.save($scope.author);
	        $location.path("/");
	    };				
}])
.controller('SettingsController', function () {
    // TODO
})
.controller('AboutController', function () {
    // TODO
});