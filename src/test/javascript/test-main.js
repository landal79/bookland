var TEST_REGEXP = /(spec|test)\.js$/i;
var allTestFiles = [];

var basePath = '/base/target/bookland/';

Object.keys(window.__karma__.files).forEach(function(file) {
    if (TEST_REGEXP.test(file)) {
        allTestFiles.push(file);
    }
});

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: basePath + 'app',

    shim: {
        jquery: {
            exports: '$'
        },
        angular: {
            exports: 'angular',
            deps: ['jquery']
        },
        'angular-ui-router': {
            deps: ['angular']
        },
        'angular-animate': {
            deps: ['angular']
        },
        'angular-bootstrap': {
            deps: ['angular', 'bootstrap']
        },
        'angular-resource': {
            deps: ['angular']
        },
        'angular-aria': {
            deps: ['angular']
        },
        'angular-mocks' : {
            deps: ['angular']
        },
        bootstrap: {
            deps: ['jquery']
        },
        require: []
    },
    paths: {
        angular: basePath + 'lib/angular/angular',
        'angular-animate': basePath + 'lib/angular-animate/angular-animate',
        'angular-aria': basePath + 'lib/angular-aria/angular-aria',
        'angular-bootstrap': basePath + 'lib/angular-bootstrap/ui-bootstrap-tpls',
        'angular-mocks': basePath + 'lib/angular-mocks/angular-mocks',
        'angular-resource': basePath + 'lib/angular-resource/angular-resource',
        'angular-scenario': basePath + 'lib/angular-scenario/angular-scenario',
        'angular-ui-router': basePath + 'lib/angular-ui-router/release/angular-ui-router',
        bootstrap: basePath + 'lib/bootstrap/dist/js/bootstrap.min',
        'es6-shim': basePath + 'lib/es6-shim/es6-shim',
        jquery: basePath + 'lib/jquery/dist/jquery'
    },

    // dynamically load all test files
    deps: allTestFiles,

    // we have to kickoff jasmine, as it is asynchronous
    callback: window.__karma__.start
});