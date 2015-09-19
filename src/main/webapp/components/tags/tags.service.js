'use strict';

var services = angular.module('bookland.services', [ 'ngResource' ]);

function tagService(baseUrl, $resource) {
    return $resource(baseUrl + '/tags/:id', {
        id : '@id'
    });
}

services.factory('tagService', tagService);