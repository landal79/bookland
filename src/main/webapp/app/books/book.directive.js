(function () {
    'use strict';

    function blListItem($scope) {
        return {
            restrict: 'E',
            templateUrl: 'app/books/list-item.html',
            scope: {
                item: '='
            },
            controller: function ($scope) {

            }
        };
    }

    angular.module('bookland.book').directive('blListItem', blListItem);

})();