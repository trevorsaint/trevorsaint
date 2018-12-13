const gulp        = require('gulp');
const requireDir  = require('require-dir');
const runsequence = require('run-sequence');


/**
 * Split gulp tasks into multiple gulp tasks
 */

requireDir('./gulp');


/**
 * Develop
 * Run server using nodemon and browserSync
 */

gulp.task('develop', [
  'browser-sync',
  'nodemon',
  'watch'
]);


/**
 * Build
 * Run various gulp tasks for build
 */

gulp.task('build', function() {
  runsequence('clean', [
    'sass',
    'copy-fonts',
    'copy-meta',
    'images',
    'build:javascript'
  ]);
});


/**
 * Watch
 * Watch for any file change
 */

gulp.task('watch', [
  'watch:sass',
  'watch:scripts',
  'watch:nunjucks',
  'watch:images'
]);

gulp.task('watch:sass', function() {
  return gulp.watch([
    'app/sass/**/*.scss',
    'src/**/*.scss'
  ], ['sass']);
});

gulp.task('watch:scripts', function() {
  return gulp.watch([
    'src/**/*.js'
  ], ['build:javascript']);
});

gulp.task('watch:nunjucks', function() {
  return gulp.watch([
    'app/views/**/*.html',
    'src/components/*.njk'
  ], ['nunjucks']);
});

gulp.task('watch:images', function() {
  return gulp.watch('src/assets/images/**/*.+(png|jpg|jpeg|gif|svg)', ['images']);
});