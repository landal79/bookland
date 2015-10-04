define('alerts',
    ['angular','ui.router'
        , './alertController']
    , function (angular) {

        var alerts = angular.module('bookland.alerts', ['ui.router']);

        alerts.controller('AlertsController', require('./alertController'));

        return alerts;

    })();