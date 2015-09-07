'use strict';

var growls = angular.module('bookland.growls', [ 'angular-growl' ]);


growls.controller('growlsCtrl',['$scope','$rootScope', 'growl', function($scope, $rootScope, growl) {

   var bookSaveListener =  $rootScope.$on('book:saved',function(event,error){
       growl.success('Book successfully saved!', {disableIcons: true});
    });

    //$scope.$on('$destroy', bookSaveListener);

    //$scope.addSpecialWarnMessage = function() {
    //    growl.warning("This adds a warn message");
    //    growl.info("This adds a info message");
    //    growl.success("This adds a success message");
    //    growl.error("This adds a error message");
    //}
}]);