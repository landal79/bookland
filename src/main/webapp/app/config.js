requirejs.config({
    deps: ['app'],
    shim : {
        'jquery' : {
            exports: '$'
        },
        'angular' : {
            exports : 'angular',
            deps : ['jquery']
        },
        'angular-ui-router' : {
            deps : ['angular']
        },
        'angular-animate' : {
            deps : ['angular']
        },
        'angular-bootstrap' : {
            deps : ['angular','bootstrap']
        },
        'angular-resource' : {
            deps : ['angular']
        },
        'angular-aria' : {
            deps : ['angular']
        },
        'bootstrap' : {
            deps : ['jquery']
        }
    }
});