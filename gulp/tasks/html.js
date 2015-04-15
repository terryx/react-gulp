var gulp = require('gulp');
var config = require('../config').html;
var htmlmin = require('gulp-htmlmin');
var reload = require('browser-sync').reload;
var inject = require('gulp-inject');

gulp.task('html:develop', function() {
  gulp.src([config.src])
    .pipe(gulp.dest(config.dist))
    .pipe(reload({
      stream: true
    }))
});

gulp.task('html:production', function() {
  gulp.src(config.main)
    .pipe(inject(gulp.src([
      './app/dist/css/*.css',
      './app/dist/js/*.js'
    ], {
      read: false
    }), {
      ignorePath: '/app/dist'
    }))
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest(config.dist))
});