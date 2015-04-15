var requireDir = require('require-dir');
var gulp = require('gulp');
var runSequence = require('run-sequence');

requireDir('./gulp/tasks', {
  recurse: true
});

//require for initial setup
gulp.task('base', [
  'base:clean',
  'base:font',
  'base:css',
  'base:js',
  'base:img',
  'base:favicon',
  'less:develop',
  'html:develop',
  'browserify:develop',
]);

//for development
gulp.task('serve', [
  'browserSync',
  'watch:develop'
]);

//build for staging/production
gulp.task('build', [
  'build:clean',
  'build:font',
  'build:css',
  'build:js',
  'build:img',
  'less:production',
  'less:uncss',
  'browserify:production',
], function(cb) {
  gulp.run('html:production');
});
