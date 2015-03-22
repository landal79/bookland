'use strict';

var services = angular.module('bookland.services', [ 'ngResource' ]);

/**
 * Application base url, is parametrized to make it work both on localhost and openshift.
 */
services.value('baseUrl', '${baseurl}/rest');

services.factory('bookService', [ 'baseUrl', '$resource', function(baseUrl, $resource) {
  return $resource(baseUrl + '/books/:id', {
    id : '@id'
  }, {
    'update' : {
      method : 'PUT'
    }
  });
} ]);

services.factory('bookImageService', [ 'baseUrl', '$resource', function(baseUrl, $resource) {
  return $resource(baseUrl + '/books/:id/image', {
    id : '@id'
  }, {
    'save' : {
      method : 'POST',
      headers : {
        'Content-Type' : undefined
      },
      transformRequest : function(data, headersGetter) {
        if (data === undefined) {
          return data;
        }
        var fd = new FormData();
        fd.append('file', data);
        return fd;
      }
    },
    'update' : {
      method : 'PUT'
    }
  });
} ]);

services.factory('authorService', [ 'baseUrl', '$resource', function(baseUrl, $resource) {
  return $resource(baseUrl + '/authors/:id', {
    id : '@id'
  }, {
    'update' : {
      method : 'PUT'
    }
  });
} ]);

services.factory('tagService', [ 'baseUrl', '$resource', function(baseUrl, $resource) {
  return $resource(baseUrl + '/tags/:id', {
    id : '@id'
  });
} ]);
