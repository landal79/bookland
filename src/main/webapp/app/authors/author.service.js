'use strict';

var services = angular.module('bookland.services', [ 'ngResource' ]);

function authorService(baseUrl, $resource) {
    return $resource(baseUrl + '/authors/:id', {
        id : '@id'
    }, {
        'update' : {
            method : 'PUT'
        }
    });
}

services.factory('authorService', authorService);

function tagService(baseUrl, $resource) {
    return $resource(baseUrl + '/tags/:id', {
        id : '@id'
    });
}