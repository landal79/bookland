define(['require','angular','./capitalize'], function (require, angular) {

    var moduleName = 'bookland.filters';

    var filters = angular.module(moduleName, []);

    filters.filter('capitalize', require('./capitalize'));

    return moduleName;

});