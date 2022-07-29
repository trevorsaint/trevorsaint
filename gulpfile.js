const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sassGlob = require("gulp-sass-glob");
const browserSync = require("browser-sync").create();
const del = require("del");
const postcss = require("gulp-postcss");
const cleanCSS = require("gulp-clean-css");
const purgecss = require("gulp-purgecss");
const htmlmin = require("gulp-htmlmin");
const rename = require("gulp-rename");
const autoprefixer = require("autoprefixer");
const nunjucksRender = require("gulp-nunjucks-render");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");


// path configurations
const configPaths = require("./config/paths.json");


// browserSync
function reload(done) {
  browserSync.reload();
  done();
};


// clean public folder
gulp.task("clean", function() {
  return del(configPaths.public);
});


// convert the SCSS to CSS and compress it
gulp.task("sass", function() {
  return gulp.src(configPaths.source + "**/*.scss")
    .pipe(sassGlob({sassModules: true}))
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest(configPaths.stylesheets))
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe(rename("main.min.css"))
    .pipe(cleanCSS())
    .pipe(gulp.dest(configPaths.stylesheets))
    .pipe(browserSync.reload({
      stream: true
    }));
});


// concatenate and compress JS
gulp.task("scripts", function() {
  return gulp.src([configPaths.scripts + "util.js", configPaths.scripts + "**/*.js"])
    .pipe(concat("main.js"))
    .pipe(gulp.dest(configPaths.javascripts))
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe(rename("main.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest(configPaths.javascripts))
    .pipe(browserSync.reload({
      stream: true
  }));
});


// render nunjucks templates
gulp.task("nunjucks", function() {
  return gulp.src(configPaths.views + "**/*.html")
    .pipe(nunjucksRender({
      path: [
        configPaths.components,
        configPaths.views,
        configPaths.layouts,
        configPaths.partials
      ],
      data: {
        serviceName: configPaths.name,
        rootPath: configPaths.root
      }
    }))
    .pipe(gulp.dest(configPaths.public))
    .pipe(browserSync.reload({
      stream: true
    }));
});


// move all assets
gulp.task("assets", function() {
  return gulp.src([
    configPaths.assets + "**/*",
    "!src/assets/scripts/**"
  ], {allowEmpty: true })
    .pipe(gulp.dest(configPaths.public))
    .pipe(browserSync.reload({
      stream: true
    }));
});


// browserSync
gulp.task("browserSync", gulp.series(function (done) {
  browserSync.init({
    server: {
      baseDir: configPaths.public
    },
    notify: false
  })
  done();
}));


// watch
gulp.task("watch", gulp.series(["browserSync", "sass", "scripts"], function() {
  gulp.watch(configPaths.public + "**/*.html", gulp.series(reload));
  gulp.watch([
    configPaths.app + "**/*.njk",
    configPaths.app + "**/*.html"
  ], gulp.series(["nunjucks"]));
  gulp.watch(configPaths.source + "**/*.scss", gulp.series(["sass"]));
  gulp.watch(configPaths.source + "**/*.js", gulp.series(["scripts"]));
}));


// build
gulp.task("build", gulp.series("clean", gulp.parallel("sass", "scripts", "nunjucks", "assets")));


// default
gulp.task("default", gulp.series("clean", gulp.parallel("sass", "scripts", "nunjucks", "assets", "watch")));


// distribution
gulp.task("dist", async function() {
  // remove unused classes from the style.css file with PurgeCSS
  // await purgeCSS();
  // minify HTML
  await minifyHTML();
  // move all assets
  await moveAssets();
});


function purgeCSS() {

  // configurations - https://www.npmjs.com/package/gulp-purgecss
  return new Promise(function(resolve, reject) {
    let stream = gulp.src([
      configPaths.stylesheets + "main.css",
      configPaths.stylesheets + "main.min.css"
    ])
    .pipe(purgecss({
      content: [configPaths.public + "**/*.html", configPaths.javascripts + "main.js"],
      safelist: {
        standard: [".is-hidden", ".is-visible"],
        deep: [/class$/],
        greedy: []
      },
      defaultExtractor: content => content.match(/[\w-/:%@]+(?<!:)/g) || []
    }))
    .pipe(gulp.dest(configPaths.stylesheets));
    stream.on("finish", function() {
      resolve();
    });
  });

};


function minifyHTML() {

  // configuration - https://www.npmjs.com/package/gulp-htmlmin
  return new Promise(function(resolve, reject) {
    let stream = gulp.src(configPaths.public + "**/*.html")
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest(configPaths.public));
    stream.on("finish", function() {
      resolve();
    });
  });

};


function moveAssets() {

  return new Promise(function(resolve, reject) {
    var stream = gulp.src([
      configPaths.assets + "**/*",
      "!src/assets/scripts/**"
    ], { allowEmpty: true })
    .pipe(gulp.dest(configPaths.public));
    stream.on("finish", function() {
      resolve();
    });
  });

};