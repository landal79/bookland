(function () {
    'use strict';

    var filters = angular.module('bookland.filters', []);

    filters.filter('capitalize', function () {
        return function (input) {
            return input ? input.charAt(0).toUpperCase() + input.slice(1) : input;
        };
    });

})();