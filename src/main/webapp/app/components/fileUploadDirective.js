define([], function () {

    function blFileUpload() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/fileUpload.html',
            scope: {
                onfileselected: '&'
            },
            link: function (scope, element, attrs) {
                var inputFile = angular.element(element.find('input[type=file]')[0]);
                var btnUpload = angular.element(element.find('button')[0]);
                var inputText = angular.element(element.find('input[type=text]')[0]);
                btnUpload.bind('click', function () {
                    inputFile.click();
                });
                inputText.bind('click', function () {
                    inputFile.click();
                });

                inputFile.bind('change', function (event) {
                    inputText.val(inputFile.val());
                    scope.onfileselected({
                        'event': event
                    });
                });

            }
        };
    }

    return blFileUpload;

});