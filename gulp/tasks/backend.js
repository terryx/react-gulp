var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var babel = require('gulp-babel');
var config = require('../config/backend');

gulp.task('babel', function () {
  gulp.src(config.js.src)
    .pipe(babel())
    .pipe(gulp.dest(config.js.dist));
});

gulp.task('nodemon', function(){
  nodemon({
    script: config.js.bundle,
    env: { 'NODE_ENV': 'production' },
    tasks: ['babel'],
    ignore: ['gulp/*', 'frontend/*', 'node_modules/*', 'gulpfile.js']
  });
})
