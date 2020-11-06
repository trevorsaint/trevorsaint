'use strict';

const gulp = require('gulp');
const del = require('del');
const nodemon = require('gulp-nodemon');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const sasslint = require('gulp-sass-lint');
const rename = require('gulp-rename');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const nunjucksRender = require('gulp-nunjucks-render');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const configPaths = require('./config/paths.json');


// Clean assets
function clean() {
  return del('public')
}


// Check for errors with SASS files
function lint() {
  return gulp
    .src([
      configPaths.source + '**/*.scss'
    ])
    .pipe(sasslint({
      configFile: configPaths.config + '.sass-lint.yml'
    }))
    .pipe(sasslint.format())
    .pipe(sasslint.failOnError())
}


// Compile SASS (vendor prefix, minify and move into pulic)
function styles() {
  return gulp
    .src(configPaths.sass + 'main.scss')
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(gulp.dest(configPaths.stylesheets)) // Creates an expanded version
    .pipe(postcss([autoprefixer('Last 3 versions'), cssnano()]))
    .pipe(rename({ suffix: '.min' })) // Creates a minified and autoprefixed version
    .pipe(gulp.dest(configPaths.stylesheets))
}


// Compile javascript (concatenation and minification)
function scripts() {
  return gulp
    .src([
      'src/assets/javascripts/util.js',
      'src/components/header/header.js',
      'src/components/skip-link/skip-link.js',
      'src/components/read-more/read-more.js',
      'src/components/swipe-content/swipe-content.js',
      'src/components/carousel/carousel.js',
      'src/components/accordion/accordion.js',
      'src/components/social-sharing/social-sharing.js'
    ])
    .pipe(uglify())
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(configPaths.public + 'javascripts'))
}


// Optimise images (compress and move into public)
function images() {
  return gulp
    .src(configPaths.images + '**/*.+(svg|png|jpg|jpeg|gif)')
    .pipe(imagemin([
      imagemin.mozjpeg({
        quality: 100,
        progressive: true
      }),
      imagemin.optipng(),
      imagemin.svgo()
      // imagemin.svgo({
      //   plugins: [
      //     {progessive: true},
      //     {interlaced: true},
      //     {optimizationLevel: 2},
      //     {removeViewBox: false},
      //     {cleanupIDs: true}
      //   ]
      // })
    ]))
    .pipe(gulp.dest(configPaths.public + 'images'))
}


// Render nunjucks templates
function nunjucks() {
  return (
    gulp
      .src('./app/views/*.html')
      .pipe(nunjucksRender({
        path: [
          './src/components',
          './app/views',
          './app/views/layout',
          './app/views/partials'
        ]
      }))
      .pipe(gulp.dest('./public'))
  )
};


// Copy meta into public
function meta() {
  return gulp
    .src([
      'robots.txt',
      'manifest.json'
    ])
    .pipe(gulp.dest(configPaths.public))
}


// Copy fonts into public
function fonts() {
  return gulp
    .src(configPaths.fonts + '**/*.+(woff|woff2)')
    .pipe(gulp.dest(configPaths.public + 'fonts'))
}


// Watch task (when a file is changed, re-run the build task)
function watch() {
  gulp.watch ([
    configPaths.sass + 'main.scss',
    configPaths.source + '**/*.scss',
  ], styles)
  gulp.watch (configPaths.javascripts + '**/*.js', scripts)
  gulp.watch (configPaths.images + '**/*.+(svg|png|jpg|jpeg|gif)', images)
}


// Start server
function start() {
  nodemon({
    script: 'server.js',
    ignore: 'node_modules',
    ext: 'js',
  })
}


// Define complex tasks
const build = gulp.series(clean, gulp.parallel(styles, scripts, images, meta, fonts));
const develop = gulp.parallel(watch, start);


exports.clean = clean;
exports.lint = lint;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.nunjucks = nunjucks;
exports.meta = meta;
exports.fonts = fonts;
exports.watch = watch;
exports.build = build;
exports.develop = develop;
exports.default = develop;
