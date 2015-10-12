define([], function(){

    return function blTagList() {
        return {
            restrict: 'E',
            templateUrl: 'app/tags/tags.html',
            scope: {
                tagsList: '='
            },
            controller: function ($scope) {

            },
            controllerAs: 'TagListController'
        };
    }

});