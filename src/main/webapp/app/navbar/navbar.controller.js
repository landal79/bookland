(function () {
    'use strict';

    function NavController($state) {
        this.is = function (title) {
            if (!$state.current) {
                return false;
            }
            return $state.current.name == title;
        };
    }

    angular.module('bookland').controller('NavController', NavController);

})();