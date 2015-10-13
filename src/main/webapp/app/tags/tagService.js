define([], function () {

    // @ngInject
    function tagService(baseUrl, $resource) {
        return $resource(baseUrl + '/tags/:id', {
            id: '@id'
        });
    }

    return tagService;

});