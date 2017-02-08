requirejs.config({
    shim: {
        'jquery': {
            exports: '$'
        },
        'angular': {
            exports: 'angular',
            deps: ['jquery','es6-shim']
        },
        'angular-ui-router': {
            deps: ['angular']
        },
        'angular-animate': {
            deps: ['angular']
        },
        'angular-bootstrap': {
            deps: ['angular', 'bootstrap']
        },
        'angular-resource': {
            deps: ['angular']
        },
        'angular-aria': {
            deps: ['angular']
        },
        'bootstrap': {
            deps: ['jquery']
        }
    },
    packages: [
        'components', 'filters', 'about', 'alerts', 'animations', 'authors', 'books', 'navbar', 'settings', 'tags'
    ],

});

requirejs(['angular'
        , 'about'
        , 'authors'
        , 'alerts'
        , 'animations'
        , 'books'
        , 'navbar'
        , 'settings'
        , 'tags'
        , 'angular-ui-router'],
    function (angular, about, authors, alerts, animations, books, navbar, settings, tags) {

        var bookland = angular.module('bookland',
            [about, authors, alerts, animations, books, navbar, settings, tags
                , 'ui.router'
                ]);

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

        function blConfig($urlRouterProvider, $httpProvider, $stateProvider) {

            $urlRouterProvider.otherwise('/');

            $stateProvider.state('default', {
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

        function blRun($uibModal, $rootScope) {
            $rootScope.$on('event:httpError', function (event, error) {
                $uibModal.open({
                    templateUrl: 'app/components/errorModal.html',
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

        angular.bootstrap(document, ['bookland']);

    });