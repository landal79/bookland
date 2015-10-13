define(['require', 'angular', 'angular-ui-router','angular-resource'
        , './tagService'
        , './blTagListDirective'
        , './blTagSelectionDirective'],
    function (require, angular) {

        var moduleName = 'bookland.tags';

        var blTags = angular.module(moduleName, ['ngResource']);

        blTags.factory('tagService', require('./tagService'));

        blTags.directive('blTagList', require('./blTagListDirective'));
        blTags.directive('blTagSelection', require('./blTagSelectionDirective'));

        return moduleName;

});