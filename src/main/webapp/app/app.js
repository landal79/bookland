(function () {
    'use strict';

    var bookland = angular.module('bookland', ['bookland.about', /*'bookland.author', 'bookland.book', 'bookland.tags',
        'bookland.settings', 'bookland.filters', 'bookland.animations','bookland.components',*/
        'ngResource', 'ui.router', 'ui.bootstrap']);

    /**
     * Application base url, is parametrized to make it work both on localhost and
     * openshift.
     */
    bookland.value('baseUrl', '${baseurl}/rest');

    function HttpErrorInterceptor($q, $rootScope) {
        return {
            'responseError': function (rejection) {
                $rootScope.$broadcast("event:httpError", rejection.data.error);
                return $q.reject(rejection);
            }
        };
    }

    function blConfig($urlRouterProvider, $httpProvider,$stateProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider.state('default',{
            url: '/',
            templateUrl: 'app/default.html'
        });

        $httpProvider.interceptors.push(HttpErrorInterceptor);

    }

    bookland.config(blConfig);

    function ErrorModal($scope, $modalInstance, message) {
        $scope.message = message;

        $scope.close = function () {
            $modalInstance.close();
        };
    }

    function blRun($modal, $rootScope) {
        $rootScope.$on('event:httpError', function (event, error) {
            $modal.open({
                templateUrl: 'views/errors/errorModal.html',
                controller: ErrorModal,
                resolve: {
                    message: function () {
                        return error;
                    }
                },
                size: 'md'
            });
        });
    };

    bookland.run(blRun);

})();