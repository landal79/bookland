define(['require','angular','angular-ui-router','angular-resource','es6-shim'
        ,'./authorBookDetailController'
        ,'./authorModalController'
        ,'./authorNewController'
        ,'./authorService'
    ], function (require, angular) {

        var moduleName = 'bookland.author';

        var authors = angular.module(moduleName, ['ngResource']);

        function blAuthorConfig($stateProvider) {
            $stateProvider
                .state('authors', {
                    url: '/newAuthor',
                    templateUrl: 'app/authors/edit.html',
                    controller: 'NewAuthorController',
                    controllerAs: 'newAuthorCtrl'
                });
        }

        authors.config(blAuthorConfig);

        authors.controller('NewAuthorController', require('./authorNewController'));
        authors.controller('AuthorBookDetailCtrl', require('./authorBookDetailController'));
        authors.controller('AuthorModalCtrl', require('./authorModalController'));

        authors.factory('authorService', require('./authorService'));

        return moduleName;
});