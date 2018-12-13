// https://codehangar.io/concatenate-and-minify-javascript-with-gulp/
const gulp = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

// Script paths
let jsFiles = 'src/assets/**/*.js',
    jsDest  = 'public/javascripts';

// Concatenate and minify javascripts
gulp.task('build:javascript', () => {
  return gulp.src(jsFiles)
  .pipe(concat('scripts.js'))
  .pipe(gulp.dest('public/javascripts'))
  .pipe(rename('scripts.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest(jsDest));
});