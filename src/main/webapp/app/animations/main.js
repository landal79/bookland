define(['require','angular', 'angular-animate',
        './animations'],
    function (require, angular) {

        var moduleName = 'bookland.animations';

        var blAnimations = angular.module(moduleName, ['ngAnimate']);

        blAnimations.animation('.book-list', require('./animations'));

        return moduleName;
    });