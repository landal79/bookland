define(['require', 'angular', 'angular-ui-router'
        , './settingsController'],
    function (require, angular) {

        var moduleName = 'bookland.settings';

        var blSettings = angular.module(moduleName, ['ui.router']);

        function blConfig($stateProvider) {
            $stateProvider
                .state('settings', {
                    url: '/settings',
                    templateUrl: 'app/settings/settings.html',
                    controller: 'SettingsController',
                    controllerAs: 'settings'
                });
        }

        blSettings.config(blConfig);

        blSettings.controller('SettingsController', require('./settingsController'));

        return moduleName;

});