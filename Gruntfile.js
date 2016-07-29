'use strict';
module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Show grunt task time
    require('time-grunt')(grunt);

    // Configurable paths for the app
    var appConfig = {
        app: 'src',
        build: 'build',
        release: 'release'
    };

    // Grunt configuration
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        // Project settings
        cryoblock: appConfig,

        // The grunt server settings
        connect: {
            prod: {
                options: {
                    port: 9000,
                    open: true,
                    base: ['<%= cryoblock.build %>/production'],
                    livereload: true
                }
            }
        },

        // Compile less to css
        less: {
            prod: {
                options: {
                    compress: true,
                    optimization: 2
                },
                files: {
                    "<%= cryoblock.build %>/production/grid.css": "<%= cryoblock.app %>/common/grid/grid-style.less",
                    "<%= cryoblock.build %>/production/one-to-many.css": "<%= cryoblock.app %>/common/form/one-to-many/one-to-many-styles.less",
                    "<%= cryoblock.build %>/production/app.css": "<%= cryoblock.app %>/common/profile/profile-style.less",
                    "<%= cryoblock.build %>/production/cryoblock.css": "<%= cryoblock.app %>/common/less/style.less"
                },
            }
        },

        // Watch for changes in live edit
        watch: {
            styles: {
                files: ['<%= cryoblock.app %>/**/*.less'],
                tasks: ['build:dev'],
                options: {
                    nospawn: true,
                    livereload: 35730
                },
            },
            js: {
                files: ['<%= cryoblock.app %>/**/*.js'],
                tasks: ['build:dev'],
                options: {
                    livereload: 35730
                }
            },
            html: {
                files: ['<%= cryoblock.app %>/**/*.html'],
                options: {
                    livereload: 35730
                },
                tasks: ['build:dev']
            },
            livereload: {
                options: {
                    livereload: 35730
                },
                files: [
                    '<%= cryoblock.app %>/**/*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%= cryoblock.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        // If you want to turn on uglify you will need write your angular code with string-injection based syntax
        // For example this is normal syntax: function exampleCtrl ($scope, $rootScope, $location, $http){}
        // And string-injection based syntax is: ['$scope', '$rootScope', '$location', '$http', function exampleCtrl ($scope, $rootScope, $location, $http){}]
        uglify: {
            options: {
                mangle: false
            },
            prod: {
                files: {
                    '<%= cryoblock.release %>/cryoblock.min.js': [
                        '<%= cryoblock.release %>/cryoblock.js'
                    ]
                }
            }
        },

        // Clean build folder
        clean: {
            prod: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= cryoblock.build %>/production/{,*/}*',
                        '<%= cryoblock.release %>/{,*/}*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Copies remaining files to places other tasks can use
        copy: {
            prod: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= cryoblock.app %>/common/images',
                        dest: '<%= cryoblock.release %>/images',
                        src: [
                            '*.{ico,png,txt,jpg}',
                            // '.htaccess',
                            '*.html',
                            'views/{,*/}*.html',
                            'styles/style.css',
                            'img/{,*/}*.*'
                        ]
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/fontawesome',
                        src: ['fonts/*.*'],
                        dest: '<%= cryoblock.release %>'
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/bootstrap',
                        src: ['fonts/*.*'],
                        dest: '<%= cryoblock.release %>'
                    }
                    // {
                    //     expand: true,
                    //     dot: true,
                    //     cwd: '<%= cryoblock.app %>/scripts',
                    //     src: ['*.js'],
                    //     dest: '<%= cryoblock.build %>/production/scripts'
                    // }
                ]
            },
        },

        // Renames files for browser caching purposes
        filerev: {
            prod: {
                src: [
                    '<%= cryoblock.build %>/production/*.js',
                    '<%= cryoblock.build %>/production/*.css',
                ]
            }
        },

        htmlmin: {
            prod: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= cryoblock.build %>/production',
                    src: ['*.html', 'views/{,*/}*.html'],
                    dest: '<%= cryoblock.build %>/production'
                }]
            }
        },

        htmlbuild: {
            prod: {
                src: '<%= cryoblock.app %>/index.html',
                dest: '<%= cryoblock.build %>/production',
                options: {
                    styles: {
                        bundle: [
                            '<%= cryoblock.build %>/production/cryoblock.css'
                        ]
                    },
                    scripts: {
                        bundle: [
                            '<%= cryoblock.build %>/production/cryoblock*.js'
                        ]
                    }
                }
            }

        },

        concat: {
            options: {
                separator: '\n',
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */\n',
            },
            css: {
                src: [
                    '<%= cryoblock.build %>/production/grid.css',
                    '<%= cryoblock.build %>/production/one-to-many.css',
                    '<%= cryoblock.build %>/production/app.css',
                    '<%= cryoblock.build %>/production/cryoblock.css'
                ],
                dest: '<%= cryoblock.release %>/cryoblock.css'
            },
            js: {
                src: [
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/jquery-ui/jquery-ui.min.js',
                    'bower_components/bootstrap/dist/js/bootstrap.js',
                    'bower_components/metisMenu/dist/metisMenu.min.js',
                    'bower_components/slimScroll/jquery.slimscroll.min.js',
                    'bower_components/angular/angular.js',
                    'bower_components/angular-ui-router/release/angular-ui-router.min.js',
                    'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
                    'bower_components/angular-ui-router.stateHelper/statehelper.min.js',
                    'bower_components/ngstorage/ngStorage.min.js',
                    'bower_components/angular-toastr/dist/angular-toastr.*.min.js',
                    'bower_components/ngStorage/ngStorage.min.js',
                    'bower_components/angular-cookies/angular-cookies.min.js',
                    'bower_components/ngImgCrop/compile/minified/ng-img-crop.js',
                    'bower_components/blueimp-file-upload/js/vendor/*.js',
                    'bower_components/blueimp-file-upload/js/jquery.fileupload.js',
                    'bower_components/blueimp-file-upload/js/jquery.fileupload-angular.js',
                    'bower_components/blueimp-file-upload/js/jquery.fileupload-process.js',
                    'bower_components/iCheck/icheck.min.js',
                    'bower_components/angular-svg-round-progressbar/build/roundProgress.min.js',
                    'bower_components/blueimp-canvas-to-blob/js/canvas-to-blob.min.js',
                    'bower_components/datatables/media/js/jquery.dataTables.js',
                    'bower_components/datatables_plugins/integration/bootstrap/3/dataTables.bootstrap.js',
                    'bower_components/angular-loading-bar/build/loading-bar.js',
                    'bower_components/angular-datatables/dist/angular-datatables.js',
                    'bower_components/angular-messages/angular-messages.js',
                    'bower_components/datatables-responsive/js/dataTables.responsive.js',
                    'bower_components/sweetalert/dist/sweetalert-dev.js',
                    'bower_components/angular-tree-control/angular-tree-control.js',
                    'bower_components/angular-rangeslider/angular.rangeSlider.js',
                    'bower_components/angular-money-directive/dist/angular-money-directive.js',
                    'bower_components/angular-steps/dist/angular-steps.js',
                    '<%= cryoblock.build %>/production/templates.js',
                    '<%= cryoblock.app %>/**/*.js'
                ],
                dest: '<%= cryoblock.release %>/cryoblock.js'
            }
        },

        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            prod: {
                files: {
                    '<%= cryoblock.release %>/cryoblock.js': ['<%= cryoblock.release %>/cryoblock.js']
                }
            }
        },

        html2js: {
            options: {
                module: 'cryoblock.common.templates'
            },
            prod: {
                src: ['<%= cryoblock.app %>/**/*.html'],
                dest: '<%= cryoblock.build %>/production/templates.js'
            }
        },

        imagemin: {
            prod: {
                files: [{
                    expand: true,
                    flatten: true,
                    cwd: '<%= cryoblock.app %>',
                    src: ['**/*.{png,jpg,gif,ico,svg}'],
                    dest: '<%= cryoblock.release%>/images/'
                }]
            }
        }

    });

    // Run build version of app
    grunt.registerTask('prod:server', [
        'build:prod',
        'connect:prod',
        'watch'
    ]);

    // Build version for production
    grunt.registerTask('build:dev', [
        'clean:prod',
        'less:prod',
        'html2js:prod',
        'concat:css',
        'concat:js',
        'copy:prod',
        // 'ngAnnotate:prod',
        // 'uglify:prod',
        // // 'cssmin',
        // 'filerev:prod',
        // 'htmlmin:prod',
        // 'imagemin:prod'
    ]);

    // Build version for production
    grunt.registerTask('build:prod', [
        'clean:prod',
        'less:prod',
        'html2js:prod',
        'concat:css',
        'concat:js',
        'copy:prod',
        'ngAnnotate:prod',
        'uglify:prod',
        // // 'cssmin',
        // 'filerev:prod',
        // 'htmlmin:prod',
        'imagemin:prod'
    ]);

    grunt.registerTask('build:watch', [
        'build:dev',
        'watch'
    ]);
};
