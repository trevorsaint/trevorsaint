const gulp = require('gulp');

// Copy fonts into public
gulp.task('copy-fonts', function() {

  return gulp.src('src/assets/fonts/**/*.+(woff|woff2)')
    .pipe(gulp.dest('public/fonts'));

});