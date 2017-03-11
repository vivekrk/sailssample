/**
 * Created by @cpmproto
 */
 
module.exports = function(grunt) {
    grunt.registerTask('test', ['mocha_istanbul:coverage']);
};