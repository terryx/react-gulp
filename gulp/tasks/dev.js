var gulp = require('gulp');
var browserSync = require('browser-sync');
var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var proxy = require('proxy-middleware');
var compression = require('compression');
var reactify = require('reactify');
var babelify = require('babelify');
var url = require('url');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var watch = require('gulp-watch');
var config = require('../config');
var less = require('gulp-less');
var concat = require('gulp-concat');

gulp.task('dev:js', function() {

  // add custom browserify options here
  var customOpts = {
    entries: [config.js.src],
    debug: true
  };
  var opts = assign({}, watchify.args, customOpts);
  var b = watchify(browserify(opts));

  // add transformations here
  // i.e. b.transform(coffeeify);
  b.transform([babelify, reactify]);

  b.on('update', bundle); // on any dep update, runs the bundler
  b.on('log', gutil.log); // output build logs to terminal

  function bundle() {
    return b.bundle()
      // log errors if they happen
      .on('error', function(err) {
        delete err.stream;
        console.log(err)
      })
      .pipe(source(config.js.bundle))
      .pipe(buffer())
      .pipe(gulp.dest(config.js.dist))
      .pipe(browserSync.stream())
  }

  bundle();

});

gulp.task('dev:less', function() {
  watch(config.css.src, function() {
    return gulp.src(config.css.src)
      .pipe(watch(config.css.src))
      .pipe(less())
      .pipe(concat(config.css.bundle))
      .pipe(gulp.dest(config.css.dist))
  })
});

gulp.task('dev:html', function() {
  watch(config.html.src, function() {
    return gulp.src(config.html.src)
      .pipe(watch(config.html.src))
      .pipe(gulp.dest(config.html.dist))
  })
});

gulp.task('browserSync', function() {

  var apiServer = url.parse(config.browserSync.apiServer.url);
  apiServer.route = config.browserSync.apiServer.route;

  var middleWares = [proxy(apiServer)];

  browserSync({
    open: false,
    port: 3031,
    minify: false,
    server: {
      baseDir: config.browserSync.dist,
      middleware: middleWares
    }
  });
});
