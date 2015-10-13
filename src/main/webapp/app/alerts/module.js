define(['require','angular','angular-ui-router',
        , './alertsController']
    , function (require, angular) {

        var moduleName = 'bookland.alerts';

        var alerts = angular.module(moduleName, ['ui.router']);

        alerts.controller('AlertsController', require('./alertsController'));

        return moduleName;
});