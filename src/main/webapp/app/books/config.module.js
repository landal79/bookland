define('books',
    ['angular', 'ui.router', 'ngResource'
        , './bookService'
        , './bookImageService'
        , './blListItemDirective'
        , './bookListController'
        , './bookController'
        , './bookDetailController'],

    function (angular) {

        var blBooks = angular.module('bookland.book', ['ngResource']);

        function blConfig($stateProvider) {
            $stateProvider
                .state('list', {
                    url: 'list',
                    templateUrl: 'app/books/list.html',
                    controller: 'BookListController',
                    controllerAs: 'listCtrl'
                }).state('edit', {
                    url: '/edit/:id',
                    templateUrl: 'app/books/edit.html',
                    controller: 'BookController',
                    controllerAs: 'bookCtrl'
                }).state('new', {
                    url: '/new',
                    templateUrl: 'app/books/edit.html',
                    controller: 'BookController',
                    controllerAs: 'bookCtrl'
                }).state('detail', {
                    url: '/book/:id',
                    templateUrl: 'app/books/detail.html',
                    controller: 'BookDetailController',
                    controllerAs: 'detailCtrl'
                });
        }

        blBooks.config(blConfig);

        blBooks.factory('bookImageService', require('./bookImageService'));
        blBooks.factory('bookService', require('./bookService'));

        blBooks.directive('blListItem', require('./blListItemDirective'));

        blBooks.controller('BookListController', require('./bookListController'));
        blBooks.controller('BookDetailController', require('./bookDetailController'));
        blBooks.controller('BookController', require('./bookController'));

    })();