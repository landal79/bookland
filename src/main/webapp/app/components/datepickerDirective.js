define([], function () {

    function blDatepicker() {
        return {
            restrict: "E",
            templateUrl: 'app/components/datepicker.html',
            scope: {
                dateModel: "=",
                dateOptions: "=",
                opened: "=",
            },
            link: function (scope, element, attrs) {
                scope.open = function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    scope.opened = true;
                };

                scope.clear = function () {
                    scope.ngModel = null;
                };

                scope.opened = false;

                scope.dateOptions = {
                    'year-format': "'yy'",
                    'show-weeks': false
                };

            }

        };
    }

    return blDatepicker;

});