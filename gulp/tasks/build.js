var gulp = require('gulp');
var config = require('../config/frontend');
var watchify = require('watchify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var assign = require('lodash.assign');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var less = require('gulp-less');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var del = require('del');

gulp.task('clean:dist', function () {
  del.sync([config.dist]);
});

gulp.task('clean:release', function () {
  del.sync([config.release]);
});

gulp.task('build:js', function () {

  // add custom browserify options here
  var customOpts = {
    entries: [config.js.src],
    debug: true
  };
  var opts = assign({}, customOpts);
  var b = browserify(opts);

  // add transformations here
  // i.e. b.transform(coffeeify);
  b.transform([babelify]);

  return b.bundle()
    .pipe(source(config.js.bundle))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(config.js.dist))
});

gulp.task('build:less', function () {
  return gulp.src(config.css.src)
    .pipe(less())
    .pipe(concat(config.css.bundle))
    .pipe(minifyCSS())
    .pipe(autoprefixer({
      cascade: false,
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest(config.css.dist))
});

gulp.task('build:html', function () {
  return gulp.src(config.html.src)
    .pipe(minifyHTML())
    .pipe(gulp.dest(config.html.dist))
});

gulp.task('build:ico', function () {
  return gulp.src(config.src + '/*.ico')
    .pipe(gulp.dest(config.dist))
});

gulp.task('build:img', function () {
  return gulp.src(config.img.src)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(config.img.dist));
});

gulp.task('build:release', function() {
  return gulp.src(config.dist + '/**')
    .pipe(gulp.dest(config.release));
});
