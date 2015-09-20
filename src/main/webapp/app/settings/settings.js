(function () {
    'use strict';

    function blConfig($stateProvider) {
        $stateProvider
            .state('settings', {
                url: '/settings',
                templateUrl: 'app/settings/settings.html',
                controller: 'SettingsController',
                controllerAs: 'settings'
            });
    }

    angular.module('bookland.settings', [])
        .config(blConfig);

})();