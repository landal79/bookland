(function () {
    'use strict';

    var services = angular.module('bookland.book');

    function bookService(baseUrl, $resource) {
        return $resource(baseUrl + '/books/:id', {
            id: '@id'
        }, {
            'update': {
                method: 'PUT'
            }
        });
    }

    services.factory('bookService', bookService);

    function bookImageService(baseUrl, $resource) {
        return $resource(baseUrl + '/books/:id/image', {
            id: '@id'
        }, {
            'save': {
                method: 'POST',
                headers: {
                    'Content-Type': undefined
                },
                transformRequest: function (data, headersGetter) {
                    if (data === undefined) {
                        return data;
                    }
                    var fd = new FormData();
                    fd.append('file', data);
                    return fd;
                }
            },
            'update': {
                method: 'PUT'
            }
        });
    }

    services.factory('bookImageService', bookImageService);

})();