define('tags',
    ['angular', 'ui.router'
        , './navbarController'],
    function (angular) {

        var blNavbar = angular.module('bookland.navbar');

        blNavbar.controller('NavController', require('./navbarController'));

        return blNavbar;

    })();