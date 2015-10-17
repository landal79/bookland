var TEST_REGEXP = /(spec|test)\.js$/i;
var allTestFiles = [];

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function(file) {
    if (TEST_REGEXP.test(file)) {
        // Normalize paths to RequireJS module names.
        // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
        // then do not normalize the paths
        var normalizedTestModule = file.replace(/^\.js$/g, '');
        allTestFiles.push(normalizedTestModule);
    }
});

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/target/bookland/app',

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
        angular: '../lib/angular/angular',
        'angular-animate': '../lib/angular-animate/angular-animate',
        'angular-aria': '../lib/angular-aria/angular-aria',
        'angular-bootstrap': '../lib/angular-bootstrap/ui-bootstrap-tpls',
        'angular-mocks': '../lib/angular-mocks/angular-mocks',
        'angular-resource': '../lib/angular-resource/angular-resource',
        'angular-scenario': '../lib/angular-scenario/angular-scenario',
        'angular-ui-router': '../lib/angular-ui-router/release/angular-ui-router',
        bootstrap: '../lib/bootstrap/dist/js/bootstrap.min',
        'es6-shim': '../lib/es6-shim/es6-shim',
        jquery: '../lib/jquery/dist/jquery'
    },

    // dynamically load all test files
    deps: allTestFiles,

    // we have to kickoff jasmine, as it is asynchronous
    callback: window.__karma__.start
});