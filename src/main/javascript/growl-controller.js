'use strict';

var growls = angular.module('bookland.growls', [ 'angular-growl' ]);

function GrowlsController($scope, $rootScope, growl) {
    var bookSaveListener =  $rootScope.$on('book:saved',function(event,error){
        growl.success('Book successfully saved!', {disableIcons: true});
    });
}

growls.controller('GrowlsController',GrowlsController);