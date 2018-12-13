const gulp = require('gulp');
const del  = require('del');

// Deletes public, reports and log files
gulp.task('clean', function() {
  return del('public');
});