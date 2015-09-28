(function () {
    'use strict';

    function blAuthorConfig($stateProvider) {
        $stateProvider
            .state('authors', {
                url: '/newAuthor',
                templateUrl: 'app/authors/edit.html',
                controller: 'NewAuthorController',
                controllerAs: 'newAuthorCtrl'
            });
    }

    angular.module('bookland.author', [/*'bookland.filters',*/ 'ngResource'])
        .config(blAuthorConfig);

})();