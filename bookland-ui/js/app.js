'use strict';

var booklandModule = angular.module('bookland', ['ngRoute'])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/list.html',
				controller: 'ListController',
				controllerAs: 'listCtrl',
				name: 'list'
			})
			.when('/new', {
				templateUrl: 'views/edit.html',
				controller: 'EditController',
				controllerAs: 'editCtrl',
				name: 'edit'
			})
			.when('/book/:id', {
				templateUrl: 'views/detail.html',
				controller: 'DetailController',
				controllerAs: 'detailCtrl',
				name: 'detail'
			})
			.when('/settings', {
				templateUrl: 'views/settings.html',
				controller: 'SettingsController',
				controllerAs: 'settings',
				name: 'settings'
			})
			.when('/about', {
				templateUrl: 'views/about.html',
				controller: 'AboutController',
				controllerAs: 'about',
				name: 'about'
			})
			.otherwise({
				redirectTo: '/'
			});
	})
	.factory('books', ['$http',
		function ($http) {
            
            function ListHolder() {  
                
                var list = {};
                
                this.setResult = function(data){
                    this.list = data;
                }; 
                
                this.getResult = function(){
                    return this.list;
                }
            };
                                        
            var books = new ListHolder();                      
            
			$http.get('json/books.json')
				.success(function (data, status, headers, config) {
					console.info("success:\n" + headers);
                    books.setResult(data.results);
				}).
                error(function (data, status, headers, config) {
                    console.error("error:\n" + status);               
                });
    //            .then(function (response) {
//				books = response.data.results;
//			});
            
           // this.books = books;
            
            return {
                
                booksList: books,
                
                list: function() {
                    return this.booksList.getResult();
                },
                
                get: function(id){
                    //TODO
                    return this.booksList.getResult()[id];
                },
                
                add: function(book){
                    return this.booksList.getResult().push(book);
                }
            };
	}]);