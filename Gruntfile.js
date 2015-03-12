/* global module:false */
module.exports = function(grunt) {
	var port = grunt.option('port') || 8000;
	// Project configuration
	grunt.initConfig({
		'copy': {
			main: {
				files: [{
					expand: true,
					cwd: 'src/',
					src: [
						'**'
					],
					dest: 'dist/',
					flatten: false
				}]
			}
		},

		'gh-pages': {
			options: {
				base: 'dist'
			},
			src: ['**']
		}

	});

	// Dependencies
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-gh-pages');

	// Default task
	grunt.registerTask('default', ['copy']);
	grunt.registerTask('deploy', ['default', 'gh-pages']);

};