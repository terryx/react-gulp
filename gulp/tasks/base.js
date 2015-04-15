var gulp = require('gulp');
var config = require('../config').base;
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var node_modules = '../node_modules';
var del = require('del');

/**
 * setup base css/js
 */
gulp.task('base:font', function() {
  return gulp.src(config.font.src)
    .pipe(gulp.dest(config.font.dest))
});

gulp.task('base:clean', function() {
  del.sync([config.css.dest, config.js.dest, config.font.dest]);
});

//always production for base
gulp.task('base:css', function() {

  return gulp.src(config.css.src)
    .pipe(concat(config.css.main))
    .pipe(gulp.dest(config.css.dest))
});

//either use cdn or local download
gulp.task('base:js', function() {

  return gulp.src(config.js.src)
    .pipe(concat(config.js.main))
    .pipe(gulp.dest(config.js.dest))
});

/**
 * minify image
 */
gulp.task('base:img', function() {
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

/**
 * Favicon
 */
gulp.task('base:favicon', function() {
  return gulp.src('./app/src/*.ico')
    .pipe(gulp.dest('./app/dist'));
});
