define('tags',
    ['angular', 'ui.router'
        , './tagsService'
        , './blTagListDirective'
        , './blTagSelectionDirective'],
    function (angular) {

        var blTags = angular.module('bookland.tags', ['ngResource']);

        blTags.factory('tagService', require('./tagService'));

        blTags.directive('blTagList', require('./blTagListDirective'));
        blTags.directive('blTagSelection', require('./blTagSelectionDirective.js'));

        return blTags;

    })();