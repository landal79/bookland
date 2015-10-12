define(['require','angular'], function (require, angular) {

    var moduleName = 'bookland.filters';

    var filters = angular.module(moduleName, []);

    filters.filter('capitalize', function () {
        return function (input) {
            return input ? input.charAt(0).toUpperCase() + input.slice(1) : input;
        };
    });

    return moduleName;

});