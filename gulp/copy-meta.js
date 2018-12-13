const gulp = require('gulp');

// Copy meta files into public
gulp.task('copy-meta', function() {

  return gulp.src([
    'humans.txt',
    'robots.txt',
    'manifest.json'
  ])
  .pipe(gulp.dest('public/'));

});