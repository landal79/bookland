define('bookService',[], function(){

    // @ngInject
    function bookService(baseUrl, $resource) {
        return $resource(baseUrl + '/books/:id', {
            id: '@id'
        }, {
            'update': {
                method: 'PUT'
            }
        });
    }

    return bookService;

})();