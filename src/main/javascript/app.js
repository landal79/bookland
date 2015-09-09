'use strict';

//bookland main file

var bookland = angular.module('bookland', [ 'bookland.services',
    'bookland.directives', 'bookland.controllers', 'bookland.animations','bookland.growls', 'ngRoute', 'ngResource',
    'ui.bootstrap' ]);

function HttpErrorInterceptor($q, $rootScope) {
    return {
        'responseError': function (rejection) {
            $rootScope.$broadcast("event:httpError", rejection.data.error);
            return $q.reject(rejection);
        }
    };
}

function blConfig($routeProvider,$httpProvider,growlProvider) {
    $routeProvider.when('/', {
        templateUrl : 'views/default.html'
    }).when('/list', {
        templateUrl : 'views/books/list.html',
        controller : 'ListController',
        controllerAs : 'listCtrl'
    }).when('/edit/:id', {
        templateUrl : 'views/books/edit.html',
        controller : 'BookController',
        controllerAs : 'bookCtrl'
    }).when('/new', {
        templateUrl : 'views/books/edit.html',
        controller : 'BookController',
        controllerAs : 'bookCtrl'
    }).when('/book/:id', {
        templateUrl : 'views/books/detail.html',
        controller : 'DetailController',
        controllerAs : 'detailCtrl'
    }).when('/newAuthor', {
        templateUrl : 'views/authors/edit.html',
        controller : 'NewAuthorController',
        controllerAs : 'newAuthorCtrl'
    }).when('/settings', {
        templateUrl : 'views/settings.html',
        controller : 'SettingsController',
        controllerAs : 'settings'
    }).when('/about', {
        templateUrl : 'views/about.html',
        controller : 'AboutController',
        controllerAs : 'about'
    }).otherwise({
        redirectTo : '/'
    });

    $httpProvider.interceptors.push(HttpErrorInterceptor);

    growlProvider.globalTimeToLive(-1);
    growlProvider.onlyUniqueMessages(true);

}

bookland.config(blConfig);

function ErrorModal($scope, $modalInstance, message){
    $scope.message = message;

    $scope.close = function () {
        $modalInstance.close();
    };
}

function blRun($modal, $rootScope){
    $rootScope.$on('event:httpError', function(event,error) {
        $modal.open({
            templateUrl : 'views/errors/errorModal.html',
            controller: ErrorModal,
            resolve: {
                message: function () {
                    return error;
                }
            },
            size : 'md'
        });
    });
};

bookland.run(blRun);
