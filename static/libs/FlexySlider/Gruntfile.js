module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    require('time-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/**/*.js',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },
        concat: {
            "options": { "separator": ";" },
            "build": {
                "src": ["src/**/*.js"],
                "dest": "dist/FlexySlider.js"
            }
        },
        'http-server': {

            'dev': {

                // the server root directory
                root: '.',

                port: 8282,
                // port: function() { return 8282; }

                host: "127.0.0.1",

                cache: 0,
                showDir : true,
                autoIndex: true,
                defaultExt: "html",

                // run in parallel with other tasks
                runInBackground: false
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-http-server');

    // Default task(s).
    grunt.registerTask('default', [ 'uglify', 'concat' ]);

};