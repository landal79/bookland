define(['require','angular','angular-ui-router'
    ,'./aboutController'],
    function (require, angular) {

    var moduleName = 'bookland.about';

    var about = angular.module(moduleName, ['ui.router']);

    function blAboutConfig($stateProvider){
        $stateProvider
            .state('about', {
                url : '/about',
                templateUrl: 'app/about/about.html',
                controller: 'AboutController'
            });
    }

    about.config(blAboutConfig);
    about.controller('AboutController', require('./aboutController'));

   return moduleName;
});