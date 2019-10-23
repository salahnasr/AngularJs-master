module.exports = function(grunt) {
    //grunt wrapper function 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            app: {
                files: {
                    './public/min-safe/js/directives.js': ['./app/Evpro-vent/directives.js'],
                    './public/min-safe/js/filters.js': ['./papp/Evpro-vent/filters.js'],
                    './public/min-safe/modules.js': ['./app/Evpro-vent/modules.js']
                }
            }
        },
        concat: {
            js: { //target
                src: ['./public/min-safe/app.js', './public/min-safe/js/*.js'],
                dest: './public/min/app.js'
            }
        },
        uglify: {
            js: { //target
                src: ['./public/min/app.js'],
                dest: './public/min/app.js'
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ng-annotate');

    //register grunt default task
    grunt.registerTask('default', ['ngAnnotate', 'concat', 'uglify']);
}