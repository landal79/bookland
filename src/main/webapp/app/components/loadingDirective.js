define([], function () {

        function blLoader() {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'app/components/loader.html',
                scope: {
                    value: '='
                },
                link: function (scope, element, attr) {
                    scope.$watch('loading', function (val) {
                        if (val)
                            $(element).show();
                        else
                            $(element).hide();
                    });
                }

            };
        }

        return blLoader;
    }
);