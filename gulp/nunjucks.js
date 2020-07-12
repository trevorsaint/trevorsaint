const gulp           = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
const browserSync    = require('browser-sync');

gulp.task('nunjucks', function() {

  // get .html and .njk files in pages
  return gulp.src([
    'app/views/**/*.html'
  ])

  // renders templates with nunjucks
  .pipe(nunjucksRender({
    data: {
      assetPath: '/'
    },
    path: [
      'src/components/',
      'app/views',
      'app/views/layout',
      'app/views/partials'
    ]
  }))
  .pipe(browserSync.reload({
    stream: true
  }))

  // output files in public folder
  .pipe(gulp.dest('public'));

});
