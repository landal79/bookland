(function () {
    'use strict';

    var tags = angular.module('bookland.tags');

    function tagService(baseUrl, $resource) {
        return $resource(baseUrl + '/tags/:id', {
            id: '@id'
        });
    }

    tags.factory('tagService', tagService);

})();