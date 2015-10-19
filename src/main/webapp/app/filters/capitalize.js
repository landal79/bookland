define([], function () {

    function capitalize () {
        return function (input) {
            return input ? input.charAt(0).toUpperCase() + input.slice(1) : input;
        };
    };

    return capitalize;

});