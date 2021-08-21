const gulp = require('gulp');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const browserSync = require('browser-sync').create();
const del = require('del');
const postcss = require('gulp-postcss');
const cssvariables = require('postcss-css-variables');
const calc = require('postcss-calc');
const purgecss = require('gulp-purgecss');
const htmlmin = require('gulp-htmlmin');
const rename = require('gulp-rename');
const autoprefixer = require('autoprefixer');
const nunjucksRender = require('gulp-nunjucks-render');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const version = require('gulp-version-number');


// path configurations
const configPaths = require('./config/paths.json');


function reload(done) {
  browserSync.reload();
  done();
};


// clean public folder
gulp.task('clean', function() {
  return del(configPaths.public);
});


// convert the SCSS to CSS and compress it. No fallback for IE is created
gulp.task('sass', function() {
  return gulp.src(configPaths.source + '**/*.scss')
    .pipe(sassGlob())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest(configPaths.stylesheets))
    .pipe(browserSync.reload({
      stream: true
    }));
});


// convert the SCSS to CSS and compress it. A fallback for IE (style-fallback.css) is created
gulp.task('sass-ie', function() {
  return gulp.src(configPaths.source + 'main.scss')
    .pipe(sassGlob())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest(configPaths.stylesheets))
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe(rename('main-fallback.css'))
    .pipe(postcss([cssvariables(), calc()]))
    .pipe(gulp.dest(configPaths.stylesheets))
});


// concatenate and compress JS
gulp.task('scripts', function() {
  return gulp.src([
      configPaths.scripts + 'util.js',
      configPaths.components + '**/*.js'
    ])
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest(configPaths.javascripts))
    .pipe(browserSync.reload({
      stream: true
    }));
});


// render nunjucks templates
gulp.task('nunjucks', function() {
  return gulp.src(configPaths.views + '**/*.html')
    .pipe(nunjucksRender({
      path: [
        configPaths.components,
        configPaths.views,
        configPaths.layouts,
        configPaths.partials
      ],
      data: {
        serviceName: 'Trevor Saint',
        rootPath: '/'
      }
    }))
    .pipe(gulp.dest(configPaths.public))
    .pipe(browserSync.reload({
      stream: true
    }));
});


// move all assets
gulp.task('assets', function() {
  return gulp.src([
    configPaths.assets + '**/*',
    '!src/assets/scripts/**'
  ], {allowEmpty: true })
    .pipe(gulp.dest(configPaths.public))
    .pipe(browserSync.reload({
      stream: true
    }));
});


// browserSync
gulp.task('browserSync', gulp.series(function (done) {
  browserSync.init({
    server: {
      baseDir: configPaths.public
    },
    notify: false
  })
  done();
}));


gulp.task('watch', gulp.series(['browserSync', 'sass', 'scripts'], function() {
  gulp.watch(configPaths.public + '**/*.html', gulp.series(reload));
  gulp.watch([
    configPaths.app + '**/*.njk',
    configPaths.app + '**/*.html'
  ], gulp.series(['nunjucks']));
  gulp.watch(configPaths.source + '**/*.scss', gulp.series(['sass']));
  gulp.watch(configPaths.source + '**/*.js', gulp.series(['scripts']));
}));


gulp.task('watch-ie', gulp.series(['browserSync', 'sass-ie', 'scripts'], function() {
  gulp.watch(configPaths.public + '**/*.html', gulp.series(reload));
  gulp.watch(configPaths.app + '**/*.njk', gulp.series(['nunjucks']));
  gulp.watch(configPaths.source + '**/*.scss', gulp.series(['sass-ie']));
  gulp.watch(configPaths.source + '**/*.js', gulp.series(['scripts']));
}));


// build
gulp.task('build', gulp.series('clean', gulp.parallel('sass', 'sass-ie', 'scripts', 'nunjucks', 'assets')));


// distribution
gulp.task('dist', async function() {
  // remove unused classes from the style.css file with PurgeCSS
  await purgeCSS();
  // add version number to CSS and JS files
  await cacheBust();
  // minify HTML
  await minifyHTML();
  // move all assets
  await moveAssets();
});


function purgeCSS() {

  // configurations - https://www.npmjs.com/package/gulp-purgecss
  return new Promise(function(resolve, reject) {
    let stream = gulp.src(configPaths.stylesheets + 'main.css')
    .pipe(purgecss({
      content: [
        configPaths.public + '**/*.html',
        configPaths.javascripts + 'main.js'
      ],
      safelist: [
        'is-hidden',
        'is-visible'
      ],
      defaultExtractor: content => content.match(/[\w-/:%@]+(?<!:)/g) || []
    }))
    .pipe(gulp.dest(configPaths.stylesheets));
    stream.on('finish', function() {
      resolve();
    });
  });

};


function cacheBust() {

  // configurations - https://www.npmjs.com/package/gulp-version-number
  return new Promise(function(resolve, reject) {
    let stream = gulp.src(configPaths.public + '**/*.html')
    .pipe(version({
      value: '%DT%',
      append: {
        to: [
          {
            type: 'css',
            key: 'cachebust',
            cover: 1,
            files: ['main.css']
          },
          {
            type: 'js',
            key: 'cachebust',
            cover: 1,
            files: ['main.js']
          }
        ]
      }
    }))
    .pipe(gulp.dest(configPaths.public));
    stream.on('finish', function() {
      resolve();
    });
  });

};


function minifyHTML() {

  // configuration - https://www.npmjs.com/package/gulp-htmlmin
  return new Promise(function(resolve, reject) {
    let stream = gulp.src(configPaths.public + '**/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest(configPaths.public));
    stream.on('finish', function() {
      resolve();
    });
  });

};


function moveAssets() {

  return new Promise(function(resolve, reject) {
    var stream = gulp.src([
      configPaths.assets + '**/*',
      '!src/assets/scripts/**'
    ], { allowEmpty: true })
    .pipe(gulp.dest(configPaths.public));
    stream.on('finish', function() {
      resolve();
    });
  });

};