var browserify = require('browserify'); // Bundles JS.
var reactify = require('reactify'); // Transforms React JSX to JS.
var source = require('vinyl-source-stream');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var gzip = require('gulp-gzip');
var config = require('../config');
var buffer = require('vinyl-buffer');
var reload = require('browser-sync').reload;
var watchify = require('watchify');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var rev = require('gulp-rev');
var inject = require('gulp-inject');
/**
 * Change react code into pure js
 */
var customOpts = {
  entries: [config.react.main],
  debug: true,
  transform: [reactify]
};

gulp.task('browserify:develop', function() {

  //clean up
  var opts = assign({}, watchify.args, customOpts);
  var b = (browserify(opts));
  b.bundle()
    .pipe(source(config.react.bundle))
    .pipe(buffer())
    .pipe(gulp.dest(config.react.dist))
    .pipe(reload({
      stream: true
    }));

});

gulp.task('browserify:production', function() {
  var opts = assign({}, watchify.args, customOpts);
  var b = (browserify(opts));
  return b.bundle()
    .pipe(source(config.react.bundle))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest(config.react.dist))
    .pipe(gzip())
    .pipe(gulp.dest(config.react.dist))
})
