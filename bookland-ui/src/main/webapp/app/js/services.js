'use strict';

var services = angular.module('bookland.services', ['ngResource']);

services.factory('bookService', ['$resource',
	function ($resource) {
		return $resource('/bookland-backend/rest/books/:id', {id: '@id'}, {
			'update': { method: 'PUT'}
	    });
}]);

services.factory('bookImageService',['$resource',
	function($resource){
		return $resource('/bookland-backend/rest/books/:id/image', {id: '@id'}, {
			'save' : { method: 'POST',
				   headers: { 'Content-Type': undefined },
				   transformRequest: function (data, headersGetter) {
			            	if (data === undefined){return data;}
			            	var fd = new FormData();
							fd.append('file', data);
		            	    return fd;
			            }
	},
			'update': { method: 'PUT'}
    });
}]);

services.factory('authorService',['$resource',
	function($resource){
		return $resource('/bookland-backend/rest/authors/:id', {id: '@id'}, {
		'update': { method: 'PUT'}
    });
}]);

services.factory('tagService',['$resource',
  function($resource){
	   return $resource('/bookland-backend/rest/tags/:id', {id: '@id'});
}]);
