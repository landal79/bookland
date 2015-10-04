define('settings',
    ['angular', 'ui.router'
        , './settingsController'],
    function (angular) {

        var blSettings = angular.module('bookland.settings', ['ui.router']);

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

        return blSettings;

    })();