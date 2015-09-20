(function() {
    'use strict';

    function blAboutConfig($stateProvider){
        $stateProvider
            .state('about', {
                url : 'about',
                template: 'app/about/about.html',
                controller: 'AboutController'
            });
    }

    angular.module('bookland.about', ['ui.router']).config(blAboutConfig);

})();