module.exports = function (grunt) {
    'use strict';
    // Project configuration
    grunt.initConfig({
        // Task configuration
        concat: {
            dist: {
                src: [
                'dependencies/jquery/dist/jquery.js',
                'dependencies/angularjs/angular.js',
                'dependencies/angular-route/angular-route.js',
                'dependencies/nsPopover/src/nsPopover.js',
                'dependencies/fullpage.js/jquery.fullPage.js',
                'dependencies/lodash/dist/lodash.js',
                'dependencies/angular-google-maps/dist/angular-google-maps.js',
                ],
                dest: 'scripts/vendor/vendor.js'
            }
        },
        uglify: {
            dist: {
                src: '<%= concat.dist.dest %>',
                dest: 'scripts/vendor.min.js'
            },
            uglifyAngularApp: {
                src: 'scripts/app.js',
                dest: 'scripts/app.min.js'
            },
            uglifyConfigJquery: {
                src: 'scripts/config.js',
                dest: 'scripts/config.min.js'
            }
        },
        jshint: {
            options: {
                node: true,
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                eqnull: true,
                browser: true,
                globals: { jQuery: true },
                boss: true
            },
            gruntfile: {
                src: 'gruntfile.js'
            },
            lib_test: {
                src: ['lib/**/*.js', 'test/**/*.js']
            }
        },
        qunit: {
            files: ['*.html']
        },
        concat_css: {
            options: {
            },
            all: {
                src: [
                    "dependencies/fullpage.js/jquery.fullPage.css",
                    "styles/main.css"
                ],
                dest: "styles/style.css"
            },
        },
        cssmin: {
          options: {
            shorthandCompacting: false,
            roundingPrecision: -1
          },
          target: {
            files: {
              'styles/style.min.css': ['styles/style.css']
            }
          }
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            uglifyApp: {
                files: '<%= uglify.uglifyAngularApp.src %>',
                tasks: ['uglify']
            },
            uglifyConfig: {
                files: '<%= uglify.uglifyConfigJquery.src %>',
                tasks: ['uglify']
            },
            concat_css: {
                files: '<%= concat_css.all.src %>',
                tasks: ['concat_css','cssmin']
            },
            concat: {
                files: '<%= concat.dist.src %>',
                tasks: ['concat','uglify']
            }
        },
    });

    // These plugins provide necessary tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-serve');
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Default task
    grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify','serve','concat_css','cssmin']);
};

