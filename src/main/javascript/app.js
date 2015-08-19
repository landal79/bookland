'use strict';

//bookland main file

var bookland = angular.module('bookland', [ 'bookland.services',
    'bookland.directives', 'bookland.controllers', 'bookland.animations', 'ngRoute', 'ngResource',
    'ui.bootstrap' ]);

bookland.config(function($routeProvider,$httpProvider) {

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

  $httpProvider.interceptors.push(['$q','$rootScope', function ($q, $rootScope) {
    return {
      'responseError': function (rejection) {
        $rootScope.$broadcast("event:httpError", rejection.data.error);
        return $q.reject(rejection);
      }
    };
  }]);
});

bookland.run(['$modal','$rootScope', function($modal, scope){
  scope.$on('event:httpError', function(event,error) {
    $modal.open({
      templateUrl : 'views/errors/errorModal.html',
      controller: function($scope, $modalInstance, message){
        $scope.message = message;

        $scope.close = function () {
          $modalInstance.close();
        };
      },
      resolve: {
        message: function () {
          return error;
        }
      },
      size : 'md'
    });
  });
}]);
