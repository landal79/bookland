define('blComponents',
    ['angular', 'ui.bootstrap'
        , './fileReaderService'
        , './datepickerDirective'
        , './fileUploadDirective'],

    function (angular) {

        var blComponents = angular.module('bookland.components', ['ui.bootstrap']);

        blComponents.factory('fileReader', require('./fileReaderService'));

        blComponents.directive("blDatepicker", require('./datepickerDirective'));
        blComponents.directive('blFileUpload', require('./fileUploadDirective'));

        return blComponents;

    })();