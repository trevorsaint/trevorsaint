'use strict';


const gulp = require('gulp');
const del = require('del');
const nodemon = require('gulp-nodemon');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const purgecss = require('gulp-purgecss');
const sasslint = require('gulp-sass-lint');
const htmlmin = require('gulp-htmlmin');
const rename = require('gulp-rename');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const nunjucksRender = require('gulp-nunjucks-render');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const uniqId = require('uniqid');
const cacheBust = require('gulp-cache-bust');
const configPaths = require('./config/paths.json');


// Clean assets
function clean() {
  return del(configPaths.public)
};


// Check for errors with SASS files
function lint() {
  return (
    gulp
      .src([
        configPaths.source + '**/*.scss'
      ])
      .pipe(sasslint({
        configFile: configPaths.config + '.sass-lint.yml'
      }))
      .pipe(sasslint.format())
      .pipe(sasslint.failOnError())
    )
};


// Compile SASS (vendor prefix, minify and move into pulic)
function styles() {
  return (
    gulp
     .src(configPaths.sass + 'main.scss')
      .pipe(sass({outputStyle: 'expanded'}))
      .pipe(gulp.dest(configPaths.stylesheets)) // Creates an expanded version
      .pipe(postcss([autoprefixer('Last 3 versions'), cssnano()]))
      .pipe(rename({ suffix: '.min' })) // Creates a minified and autoprefixed version
      .pipe(gulp.dest(configPaths.stylesheets))
    )
};


// Compile javascript (concatenation and minification)
function scripts() {
  return (
    gulp
      .src([
        configPaths.components + 'util.js',
        configPaths.components + 'header/header.js',
        configPaths.components + 'skip-link/skip-link.js',
        configPaths.components + 'read-more/read-more.js',
        configPaths.components + 'swipe-content/swipe-content.js',
        configPaths.components + 'carousel/carousel.js',
        configPaths.components + 'accordion/accordion.js',
        configPaths.components + 'social-sharing/social-sharing.js',
        configPaths.components + 'forms/forms.js'
      ])
      .pipe(uglify())
      .pipe(concat('scripts.min.js')) // Creates a minified version
      .pipe(gulp.dest(configPaths.javascripts))
    )
};


// Move images into public folder
function images() {
  return (
    gulp
      .src(configPaths.images + '**/*.+(svg|png|jpg|jpeg|gif|webp)')
      .pipe(gulp.dest(configPaths.public + 'images'))
  )
};


// Render nunjucks templates
function nunjucks() {
  return (
    gulp
      .src(configPaths.views + '**/*.html')
      .pipe(nunjucksRender({
        path: [
          configPaths.components,
          configPaths.views,
          configPaths.layouts,
          configPaths.partials
        ],
        data: {
          rootPath: '/'
        },
      }))
      .pipe(gulp.dest('./public'))
    )
};


// Cache
function cache() {

  var versionNumber = uniqId();

  return (
    gulp
      .src(configPaths.public + '**/*.html')
      .pipe(cacheBust({
        type: 'constant',
        value: versionNumber
      }))
      .pipe(gulp.dest(configPaths.public))
  )

};


// Minify HTML
function html() {
  return (
    gulp
      .src(configPaths.public + '**/*.html')
      .pipe(htmlmin({
        collapseWhitespace: true,
        removeComments: true
       }))
      .pipe(gulp.dest(configPaths.public))
    )
};


// Remove unused styles
function css() {
  return (
    gulp
      .src(configPaths.stylesheets + '*.css')
      .pipe(purgecss({
        content: [configPaths.public + '**/*.html']
      }))
      .pipe(gulp.dest(configPaths.stylesheets))
  )
};


// Copy meta into build
function meta() {
  return (
    gulp
      .src([
        'robots.txt',
        'manifest.json',
        'sitemap.xml',
        'sw.js'
      ])
      .pipe(gulp.dest(configPaths.public))
    )
};


// Copy fonts into build
function fonts() {
  return (
    gulp
      .src(configPaths.fonts + '**/*.+(woff|woff2)')
      .pipe(gulp.dest(configPaths.public + 'fonts'))
  )
};


// Watch task (when a file is changed, re-run the build task)
function watch() {
  gulp.watch ([
    configPaths.sass + 'main.scss',
    configPaths.source + '**/*.scss',
  ], styles)
  gulp.watch (configPaths.javascripts + '**/*.js', scripts)
  gulp.watch (configPaths.images + '**/*.+(svg|png|jpg|jpeg|gif|webp)', images)
}


// Start server
function start() {
  nodemon({
    script: 'server.js',
    ignore: 'node_modules',
    ext: 'js',
  })
};


// Define complex tasks
const build = gulp.series(clean, gulp.parallel(styles, scripts, images, meta, fonts, nunjucks), cache, html);
const develop = gulp.parallel(watch, start);


exports.clean = clean;
exports.lint = lint;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.nunjucks = nunjucks;
exports.css = css;
exports.html = html;
exports.meta = meta;
exports.fonts = fonts;
exports.watch = watch;
exports.build = build;
exports.develop = develop;
exports.default = develop;