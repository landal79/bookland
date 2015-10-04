define('authors',
    ['angular','ui.router'
        ,'./authorBookDetailController'
        ,'./authorNewController'
        ,'./authorModalCtrl'
        ,'./authorService'
    ], function (angular) {

        var authors = angular.module('bookland.author', ['ngResource']);

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
        authors.controller('AuthorBookDetailController', require('./authorBookDetailController'));
        authors.controller('AuthorModalCtrl', require('./authorModalController'));

        authors.factory('authorService', require('./authorService'));

    })();