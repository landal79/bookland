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
            appFolder : '<%= pom.project.build.directory %>/<%= pom.project.build.finalName %>',
            destSrcFolder : '<%= config.appFolder %>/app',
            bowlerLib : 'target/<%= pom.project.build.finalName %>/lib'
        },

        "bower-install-simple": {
            options: {
                color: true,
                directory: '<%= config.bowlerLib %>'
            },
            "release": {
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

        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            default: {
                files: [
                    {
                        expand: true,
                        src: ['<%= config.destSrcFolder %>/**/*.js']
                    }
                ]
            }
        },
        
        includeSource: {
            options: {
                basePath: '<%= config.appFolder %>',
                baseUrl: '',
                ordering: 'top-down'
            },
            app: {
                files: [{src : '<%= config.webappFolder %>/index.html', dest: '<%= config.appFolder %>/index.html'}]
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

        bowerRequirejs: {
            target: {
                rjsConfig: '<%= config.destSrcFolder %>/main.js',
                options: {
                    transitive: true,
                    exclude: ['requirejs']
                }
            }
        },

        requirejs: {
            options: {
                baseUrl: '<%= config.destSrcFolder %>',
                mainConfigFile: '<%= config.destSrcFolder %>/main.js',
                exclude: ['main','jquery', 'angular', 'angular-ui-router', 'angular-animate', 'angular-bootstrap', 'angular-resource', 'angular-aria', 'bootstrap','es6-shim'],
                out: '<%= config.destSrcFolder %>/app.js',
                name: 'main',
                removeCombined: true,
                logLevel: 0
            },
            dev:{
                options:{
                    optimize:'none'
                }
            },
            release:{
                options:{
                    optimize:'uglify2',
                    uglify2: {
                        output: {
                            beautify: true
                        },
                        compress: {
                            sequences: false,
                            global_defs: {
                                DEBUG: false
                            }
                        },
                        warnings: true,
                        mangle: false
                    }
                }
            }
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js',
                autoWatch: false,
                singleRun: true
            },
            autoUnit: {
                configFile: 'karma.conf.js',
                browsers: ['Chrome'],
                autoWatch: true,
                singleRun: false
            }
        },

        watch: {
            files: ['<%= config.srcFolder %>/**/*.js'],
            tasks: ['concat']
        }

    });

    grunt.registerTask('karmaAuto', ['mavenEffectivePom','karma:autoUnit']);
    grunt.registerTask('dev', ['mavenEffectivePom','bower-install-simple:dev','includeSource','wiredep','ngAnnotate','bowerRequirejs', 'requirejs:dev', 'karma:unit']);
    grunt.registerTask('default', ['mavenEffectivePom','bower-install-simple:release','includeSource','wiredep','ngAnnotate','bowerRequirejs', 'requirejs:release', 'karma:unit']);

};