define(['require'
        , 'angular'
        , 'angular-bootstrap'
        , './fileReaderService'
        , './datepickerDirective'
        , './fileUploadDirective'
        ,  './loadingDirective'
    ],

    function (require, angular) {

        var moduleName = 'bookland.components';

        var blComponents = angular.module(moduleName, ['ui.bootstrap']);

        blComponents.factory('fileReader', require('./fileReaderService'));

        blComponents.directive("blDatepicker", require('./datepickerDirective'));
        blComponents.directive('blFileUpload', require('./fileUploadDirective'));
        blComponents.directive('blLoader', require('./loadingDirective'));

        return moduleName;

});