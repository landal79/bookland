define([], function () {

    // @ngInject
    function NavController($state) {
        this.is = function (title) {
            if (!$state.current) {
                return false;
            }
            return $state.current.name == title;
        };
    }

    return NavController;

});