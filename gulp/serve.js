const gulp        = require('gulp');
const nodemon     = require('gulp-nodemon');
const browserSync = require('browser-sync');

// Configure browserSync
gulp.task('browser-sync', ['nodemon'], function() {

  browserSync.init(null, {
    proxy: 'localhost:3000',
    browser: 'firefox',
    notify: false,
    port: 3001
  });

});

// Configure Nodemon
gulp.task('nodemon', function() {

  let started = false;

  return nodemon({
    script: 'server.js',
    ignore: [
      'node_modules/*',
      'app/*',
      'src/*',
      'public/*'
    ],
  }).on('start', function() {
    if (!started) {
      started = true;
    }
  });

});