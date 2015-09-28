(function() {
    'use strict';

    var about = angular.module('bookland.about', ['ui.router']);

    function blAboutConfig($stateProvider){
        $stateProvider
            .state('about', {
                url : '/about',
                template: 'app/about/about.html',
                controller: 'AboutController'
            });
    }

    about.config(blAboutConfig);

})();