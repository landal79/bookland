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

        app: {
            configScripts: [
                '<%= config.appFolder %>/**/config.module.js',
            ],
            scripts: [
                '<%= config.destSrcFolder %>/**/config.module.js',
                '<%= config.destSrcFolder %>/**/*.js',
                '<%= config.destSrcFolder %>/app.js'
            ]
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
                    {
                        expand: true,
                        src: ['<%= config.srcFolder %>/**/*.js'],
                        dest: '<%= config.destSrcFolder %>',
                        filter: 'isFile',
                        flatten: true
                    }
                ],
                options: {
                    process: function (content, srcpath) {
                        var baseUrl = grunt.option('baseurl') != 0 ? grunt.option('baseurl') : '';
                        return content.replace(/\$\{baseurl\}/g, baseUrl);
                    }
                }
            }
        },

        concat: {
            options: {
                separator: ';',
                banner: "'use strict';\n",
                process: function(src, filepath) {
                    var res = '// Source: ' + filepath + '\n' +
                        src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');

                    var baseUrl = grunt.option('baseurl') != 0 ? grunt.option('baseurl') : '';

                    return res.replace(/\$\{baseurl\}/g, baseUrl);
                }
            },
            dist: {
                src: ['<%= config.srcFolder %>/**/*.js'],
                dest: '<%= config.destSrcFolder %>/<%= pkg.name %>.js'
            }
        },

        ngAnnotate: {
            options: {
                singleQuotes: true,
            },
            default: {
                files: [
                    {
                        expand: true,
                        src: ['<%= config.destSrcFolder %>/**/*.js']
                    }
                ],
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
                baseUrl: '',
                ordering: 'top-down'
            },
            app: {
                files: [{src : '<%= config.webappFolder %>/index.html', dest: '<%= config.appFolder %>/index.html'}]
            }
        },

        bowerRequirejs: {
            target: {
                rjsConfig: '<%= config.destSrcFolder %>/config.js'
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
    grunt.registerTask('dev', ['mavenEffectivePom','bower-install-simple:dev','includeSource','wiredep','ngAnnotate','bowerRequirejs','karma:unit']);
    grunt.registerTask('default', ['mavenEffectivePom','bower-install-simple:prod',/*'jshint',*/'concat','ngAnnotate',/*'uglify',*/'includeSource','bowerRequirejs','karma:unit']);

};