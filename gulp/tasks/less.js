var config = require('../config').less;
var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var gzip = require('gulp-gzip');
var uncss = require('gulp-uncss');
var reload = require('browser-sync').reload;
var rev = require('gulp-rev');

gulp.task('less:develop', function () {
  return gulp.src(config.src)
    .pipe(less())
    .pipe(concat(config.main))
    .pipe(autoprefixer({cascade: false, browsers: ['last 2 versions']}))
    .pipe(gulp.dest(config.dist))
    .pipe(reload({
      stream: true
    }))
});

gulp.task('less:production', function () {
  return gulp.src(config.src)
    .pipe(less({
      paths: [config.src]
    }))
    .pipe(concat(config.main))
    .pipe(minifyCSS())
    .pipe(autoprefixer({
      browser: ['last 2 version']
    }))
    .pipe(rev())
    .pipe(gulp.dest(config.dist))
    .pipe(gzip())
    .pipe(gulp.dest(config.dist))
});

//remove unused base css
gulp.task('less:uncss', function() {
  return gulp.src('./app/dist/css/base.css')
    .pipe(uncss({
      html: ['./app/src/*.html']
    }))
    .pipe(minifyCSS())
    .pipe(autoprefixer({
      browser: ['last 2 version']
    }))
    .pipe(gulp.dest('./app/dist/css'))
    .pipe(gzip())
    .pipe(gulp.dest('./app/dist/css'))
});

