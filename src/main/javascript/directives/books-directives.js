'use strict';

var bookDirectives = angular.module('bookland.book.directives', [ ]);

function blListItem($scope) {
    return {
        restrict: 'E',
        templateUrl: 'views/books/list-item.html',
        scope: {
            item: '='
        },
        controller: function ($scope) {

        }
    };
}

bookDirectives.directive('blListItem',blListItem);