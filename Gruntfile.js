module.exports = function(grunt) {

// 1. Toutes les configurations vont ici: 
grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),

	sass: {
		dist: {
			options: {
				style: 'compressed', // Can be nested, compact, compressed, expanded.
				compass: false
			},
			files: { 
				'assets/css/style.min.css': 'assets/src/scss/style.scss',
				'assets/css/special.min.css': 'assets/src/scss/special.scss'
			}
		}
	},
	uglify: {
		options: {
			banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
		},
		build: {
			src: ['assets/src/js/libs/*.js', 'assets/src/js/*.js'],
			dest: 'assets/js/script.min.js'
		}
	},
	imagemin: {
		dynamic: {
				files: [{
						expand: true,
						cwd: 'assets/src/images/',
						src: ['**/*.{png,jpg,gif}'],
						dest: 'assets/images/'
				}]
		}
	},
	clean: ['assets/js', 'assets/css']
});

// 2. Nous disons à Grunt que nous voulons utiliser ce plug-in.
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks("grunt-contrib-sass");
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-imagemin');


// 3. Nous disons à Grunt quoi faire lorsque nous tapons "grunt" dans la console.
grunt.registerTask('default', ['clean', 'sass', 'uglify', 'imagemin']);
};


