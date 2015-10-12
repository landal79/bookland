define(['require','angular', 'angular-ui-router'
        , './navbarController'],
    function (require, angular) {

        var moduleName = 'bookland.navbar';

        var blNavbar = angular.module(moduleName, []);

        blNavbar.controller('NavController', require('./navbarController'));

        return moduleName;

});