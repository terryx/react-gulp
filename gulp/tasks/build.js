var gulp = require('gulp');
var config = require('../config').base;
var gzip = require('gulp-gzip');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var uglify = require('gulp-uglify');
var node_modules = '../node_modules';
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var del = require('del');
var rev = require('gulp-rev');

/**
 * setup base css/js
 */
gulp.task('build:font', function() {
  return gulp.src(config.font.src)
    .pipe(gulp.dest(config.font.dest))
});

gulp.task('build:clean', function() {
  del.sync([config.css.dest, config.js.dest, config.font.dest]);
});

gulp.task('build:css', function() {

  return gulp.src(config.css.src)
    .pipe(concat(config.css.main))
    .pipe(minifyCSS({
      keepSpecialComments: 0
    }))
    .pipe(autoprefixer({
      browser: ['last 2 version']
    }))
    .pipe(rev())
    .pipe(gulp.dest(config.css.dest))
    .pipe(gzip())
    .pipe(gulp.dest(config.css.dest))
});

//either use cdn or local download
gulp.task('build:js', function() {
  return gulp.src(config.js.src)
    .pipe(concat(config.js.main))
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest(config.js.dest))
    .pipe(gzip())
    .pipe(gulp.dest(config.js.dest))
});

/**
 * minify image
 */
gulp.task('build:img', function() {
  return gulp.src(config.img.src)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(config.img.dest));
});