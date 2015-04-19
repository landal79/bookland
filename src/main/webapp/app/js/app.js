'use strict';

//bookland main file

var bookland = angular.module('bookland', [ 'bookland.services',
    'bookland.directives', 'bookland.controllers', 'bookland.animations', 'ngRoute', 'ngResource',
    'ui.bootstrap' ]);

bookland.config(function($routeProvider) {
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
});
