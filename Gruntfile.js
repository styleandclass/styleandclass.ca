module.exports = function(grunt) {

  grunt.initConfig({
    cssmin: {
      target: {
        files: {
          'root/_site/css/main.css': 'root/_site/css/main.css'
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions']
      },
      single_file: {
        src: 'root/_site/css/main.css'
      }

    },
    jekyll: {
      options: {                          // Universal options
        bundleExec: false,                // Use global Jekyll instead of bundling
        src : './root'
      },
      dist: {                             // Target
        options: {                        // Target options
          dest: './_site',
          config: './root/_config.yml'
        }
      },
      serve: {                            // Another target
        options: {
          dest: './_site',
          drafts: true
        }
      }
    },
    surge: {
      'Style & Class': {
        options: {
          project: '_site/',
          domain: 'styleandclass.surge.sh'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-surge');
  grunt.loadNpmTasks('grunt-jekyll');

  grunt.registerTask('default', ['cssmin', 'autoprefixer']);
  grunt.registerTask('deploy', ['jekyll', 'default', 'surge']);
};
