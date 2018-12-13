const gulp         = require('gulp');
const sass         = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync  = require('browser-sync');

// Compiles css from sass, autoprefixes and compresses
gulp.task('sass', function() {

  return gulp.src('app/sass/*.scss') // Only target first level of sass files (avoid conflicts)
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer('Last 3 versions'))
    .pipe(gulp.dest('public/stylesheets'))
    .pipe(browserSync.reload({
      stream: true
    }));
});