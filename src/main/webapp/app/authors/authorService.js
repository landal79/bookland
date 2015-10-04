define('authorService',[], function () {

    // @ngInject
    function authorService(baseUrl, $resource) {
        return $resource(baseUrl + '/authors/:id', {
            id: '@id'
        }, {
            'update': {
                method: 'PUT'
            }
        });
    }

    return authorService;

})();