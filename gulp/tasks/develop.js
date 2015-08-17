var config = require('../config/frontend');
var gulp = require('gulp');
var browserSync = require('browser-sync');
var watchify = require('watchify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var assign = require('lodash.assign');
var proxy = require('proxy-middleware');
var babelify = require('babelify');
var url = require('url');
var less = require('gulp-less');
var concat = require('gulp-concat');
var reload = require('browser-sync').reload;
var del = require('del');

gulp.task('develop:clean', function () {
  del.sync([config.dist]);
});

//modify shamelessly from
//https://github.com/gulpjs/gulp/blob/master/docs/recipes/fast-browserify-builds-with-watchify.md
gulp.task('develop:js', function () {

  // add custom browserify options here
  var customOpts = {
    entries: [config.js.src],
    debug: true
  };
  var opts = assign({}, watchify.args, customOpts);
  var b = watchify(browserify(opts));

  // add transformations here
  // i.e. b.transform(coffeeify);
  b.transform([babelify]);

  b.on('update', bundle); // on any dep update, runs the bundler
  b.on('log', gutil.log); // output build logs to terminal

  function bundle() {
    return b.bundle()
      // log errors if they happen
      .on('error', function (err) {
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

gulp.task('develop:less', function () {
  return gulp.src(config.css.src)
    .pipe(less())
    .pipe(concat(config.css.bundle))
    .pipe(gulp.dest(config.css.dist))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('develop:html', function () {
  return gulp.src(config.html.src)
    .pipe(gulp.dest(config.html.dist))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('browserSync', function () {

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

  gulp.watch([config.css.src], ['develop:less']);
  gulp.watch([config.html.src], ['develop:html']);
});
