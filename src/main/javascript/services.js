'use strict';

var services = angular.module('bookland.services', [ 'ngResource' ]);

/**
 * Application base url, is parametrized to make it work both on localhost and
 * openshift.
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

services.factory('fileReader', [ '$q', '$window', function($q, $window) {

  // Wrap the onLoad event in the promise
  var onLoad = function(reader, deferred, scope) {
    return function() {
      scope.$apply(function() {
        deferred.resolve(reader.result);
      });
    };
  };

  // Wrap the onLoad event in the promise
  var onError = function(reader, deferred, scope) {
    return function() {
      scope.$apply(function() {
        deferred.reject(reader.result);
      });
    };
  };

  // Wrap the onProgress event by broadcasting an event
  var onProgress = function(reader, scope) {
    return function(event) {
      scope.$broadcast('fileProgress', {
        total : event.total,
        loaded : event.loaded
      });
    };
  };

  // Instantiate a new Filereader with the wrapped properties
  var getReader = function(deferred, scope) {
    var reader = new $window.FileReader();
    reader.onload = onLoad(reader, deferred, scope);
    reader.onerror = onError(reader, deferred, scope);
    reader.onprogress = onProgress(reader, scope);
    return reader;
  };

  // Read a file as a data url
  var readAsDataURL = function(file, scope) {
    var deferred = $q.defer();

    var reader = getReader(deferred, scope);
    reader.readAsDataURL(file);

    return deferred.promise;
  };

  // Read a file as a text
  var readAsText = function(file, encoding, scope) {
    var deferred = $q.defer();

    var reader = getReader(deferred, scope);
    reader.readAsText(file, encoding);

    return deferred.promise;
  };

  return {
    readAsDataURL : readAsDataURL,
    readAsText : readAsText
  };

} ]);
