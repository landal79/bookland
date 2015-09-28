(function () {
    'use strict';

    function blConfig($stateProvider) {
        $stateProvider
            .state('list', {
                url: 'list',
                templateUrl: 'app/books/list.html',
                controller: 'ListController',
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
                controller: 'DetailController',
                controllerAs: 'detailCtrl'
            });
    }

    angular.module('bookland.book', [/*'bookland.filters',*/ 'ngResource'])
        .config(blConfig);

})();