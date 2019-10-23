module.exports = function(grunt) {// met tout les js dans un app.min.js
    grunt.initConfig({
        concat: {
            dist: {
                src: ['app/js/**/*.js'],
                dest: 'app.js'
            }
        },
        uglify: {
            dist: {
                files: {
                    'build/app.min.js': ['<%= concat.dist.dest %>']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('build', ['concat', 'uglify']);

};