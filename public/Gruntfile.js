module.exports = function (grunt) {

    "use strict";

    // this saves us having to load each plugin individually
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    //grunt.loadNpmTasks('grunt-ftp-deploy');

    grunt.initConfig({

        pkg: grunt.file.readJSON("package.json"),


        less: {
            development: {
                options: {
                    strictMath: false,
                    strictUnits: false,
                    cleancss: true
                },
                files: {
                    "css/app.css": "css/app.less"
                }
            }
        },

        autoprefixer: {
            single_file: {
                options: {
                    browsers: ["last 2 version"]
                },
                src: "css/app.css",
                dest: "css/app.css"
            },
        },

        csslint: {
            options: {
                csslintrc: ".csslintrc"
            },
            strict: {
                src: ["css/app.css"]
            }
        },

        cssmin: {
            minify: {
                src: "css/app.css",
                dest: "css/app.css"
            }
        },

        jshint: {
            options: {
                jshintrc: ".jshintrc",
                ignores: ["js/libs/**/*.js"]
            },
            all: [
                ".jshintrc",
                ".csslintrc",
                "**/*.js"
            ]
        },

        watch: {
            css: {
                files: "**/*.less",
                tasks: "buildless"
            }
        },

        notify: {
            notify_hooks: {
                options: {
                    enabled: true,
                    max_jshint_notifications: 5,
                }
            },
            js: {
                options: {
                    title: "Back of the net!",
                    message: "Javascript build successful!"
                }
            },
            less: {
                options: {
                    title: "Cashback!",
                    message: "LESS build successful!"
                }
            }
        }/*,

        'ftp-deploy': {
          build: {
            auth: {
              host: 'ftp.audiencetrading.com',
              port: 21,
              authKey: 'mainFtpUser'
            },
            src: '../ATPA2',
            dest: '/v3'
          }
        }*/

    });

    // List of available tasks
    grunt.registerTask("default", []);
    grunt.registerTask("testjs", ["jshint", "notify:js"]);
    grunt.registerTask("buildless", ["less", "autoprefixer", "csslint", "cssmin", "notify:less"]);
};