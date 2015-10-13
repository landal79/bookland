define([], function(){

    // @ngInject
    function blListItem() {
        return {
            restrict: 'E',
            templateUrl: 'app/books/list-item.html',
            scope: {
                item: '='
            },
            controller: function ($scope) {

            }
        };
    }

    return blListItem;

});