'use strict';

//var directives = angular.module('bookland.directives', [ 'ngResource', 'bookland.services', 'ui.bootstrap' ]);

function blDatepicker() {
    return {
        restrict : "E",
        scope : {
            dateModel : "=",
            dateOptions : "=",
            opened : "=",
        },
        link : function(scope, element, attrs) {
            scope.open = function(event) {
                event.preventDefault();
                event.stopPropagation();
                scope.opened = true;
            };

            scope.clear = function() {
                scope.ngModel = null;
            };

            scope.opened = false;

            scope.dateOptions = {
                'year-format' : "'yy'",
                'show-weeks' : false
            };

        },

        templateUrl : 'components/datepicker/datepicker.html'
    };
}

angular.module('bookland').directive("blDatepicker", blDatepicker);