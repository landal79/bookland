'use strict';

module.exports = function(grunt) {

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        mavenEffectivePom : {
            main : {
                options : {
                    file : "target/effective-pom.xml",
                    varName : 'pom'
                }
            }
        },

        config : {
            srcFolder : 'src/main/javascript',
            testFolder : 'src/test/javascript',
            webappFolder : 'src/main/webapp',
            appFolder : '<%= pom.project.build.directory %>/<%= pom.project.build.finalName %>/app',
            destSrcFolder : '<%= config.appFolder %>/js',
            bowlerLib : 'target/<%= pom.project.build.finalName %>/app/lib'
        },

        "bower-install-simple": {
            options: {
                color: true,
                directory: '<%= config.bowlerLib %>'
            },
            "prod": {
                options: {
                    production: true
                }
            },
            "dev": {
                options: {
                    production: false
                }
            }
        },

        jshint: {
            all: ['Gruntfile.js', '<%= config.bowlerLib %>/**/*.js', '<%= config.srcFolder %>/**/*.js']
        },

        copy: {
            main: {
                files: [
                    {expand: true, src: ['<%= config.srcFolder %>/**/*.js'], dest: '<%= config.destSrcFolder %>', filter: 'isFile', flatten: true}
                ]
            }
        },

        concat: {
            options: {
                separator: ';',
                banner: "'use strict';\n",
                process: function(src, filepath) {
                    var res = '// Source: ' + filepath + '\n' +
                        src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');

                    return res.replace(/\$\{baseurl\}/g, grunt.config('pom.properties.baseurl'));
                }
            },
            dist: {
                src: ['<%= config.srcFolder %>/**/*.js'],
                dest: '<%= config.destSrcFolder %>/<%= pkg.name %>.js'
            }
        },

        uglify: {
            build: {
                src: '<%= config.destSrcFolder %>/<%= pkg.name %>.js',
                dest: '<%= config.destSrcFolder %>/<%= pkg.name %>.js'
            }
        },

        includeSource: {
            options: {
                basePath: '<%= config.appFolder %>',
                baseUrl: ''
            },
            myTarget: {
                files: [{src : '<%= config.webappFolder %>/app/index.tpl.html', dest: '<%= config.appFolder %>/index.html'}]
            }
        },

        wiredep: {

            task: {
                src: [
                   '<%= config.appFolder %>/index.html'
                ],
                options: {
                    directory : '<%= config.bowlerLib %>'
                }
            }
        },

        karma: {
            options: {
                basePath: '',
                files:['<%= config.bowlerLib %>/jquery/dist/jquery.js',
                    '<%= config.bowlerLib %>/angular/angular.js',
                    '<%= config.bowlerLib %>/angular-mocks/angular-mocks.js',
                    '<%= config.bowlerLib %>/angular-route/angular-route.js',
                    '<%= config.bowlerLib %>/angular-resource/angular-resource.js',
                    '<%= config.bowlerLib %>/angular-animate/angular-animate.js',
                    '<%= config.bowlerLib %>/bootstrap/dist/js/bootstrap.min.js',
                    '<%= config.bowlerLib %>/angular-bootstrap/ui-bootstrap-tpls.js',
                    '<%= config.bowlerLib %>/es6-shim/es6-shim.js',
                    '<%= config.destSrcFolder %>/**/*.js'],
                port: 9876,
                logLevel: 'INFO',
                colors: true
            },
            unit: {
                files: [
                    { src: ['<%= config.testFolder %>/**/*.js'] , served: true }
                ],
                frameworks: ['jasmine','es6-shim'],
                browsers: ['PhantomJS'],
                reporters: ['progress'],
                autoWatch: false,
                singleRun: true
            },
            autoUnit: {
                files: [
                    { src: ['<%= config.testFolder %>/**/*.js'] , served: true }
                ],
                frameworks: ['jasmine'],
                browsers: ['Chrome'],
                autoWatch: true
            }
        },

        watch: {
            files: ['<%= config.srcFolder %>/**/*.js'],
            tasks: ['concat']
        }

    });

    grunt.registerTask('karmaAuto', ['mavenEffectivePom','karma:autoUnit']);
    grunt.registerTask('dev', ['mavenEffectivePom','bower-install-simple:dev', 'copy','includeSource','wiredep','karma:unit']);
    grunt.registerTask('default', ['mavenEffectivePom','bower-install-simple:prod',/*'jshint',*/'concat',/*'uglify',*/'includeSource','wiredep','karma:unit']);

};