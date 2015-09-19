'use strict';

function NavController($route) {
    this.is = function(title) {
        if (!$route.current) {
            return false;
        }
        return $route.current.name == title;
    };
}

angular.module('bookland').controller('NavController', NavController);