'use strict';

var blAlters = angular.module('bookland.alerts', []);

function AlertsController($scope, $rootScope) {
    $scope.alerts = [];

    $scope.addInfo = function(msg) {
        $scope.alerts.push({type: 'info', msg: msg});
    };

    $scope.addSuccess = function addSuccess(msg) {
        $scope.alerts.push({type: 'success', msg: msg});
    };

    $scope.addWarning = function(msg) {
        $scope.alerts.push({type: 'warning', msg: msg});
    };

    $scope.addError = function(msg) {
        $scope.alerts.push({type: 'danger', msg: msg});
    };

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

    var currentScope = $scope;

    var bookSaveListener =  $rootScope.$on('book:saved',function(event,error){
        currentScope.addSuccess('Book successfully saved!');
    });

    $scope.$on('$destroy', bookSaveListener);
}

blAlters.controller('AlertsController',AlertsController);