define('blListItemDirective',[], function(){

    // @ngInject
    function blListItem($scope) {
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

})();