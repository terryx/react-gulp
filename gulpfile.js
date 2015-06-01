var requireDir = require('require-dir');
var gulp = require('gulp');

requireDir('./gulp/tasks', {
  recurse: true
});

gulp.task('default', ['browserSync', 'dev:html', 'dev:js', 'dev:less']);
gulp.task('build', ['clean', 'build:ico', 'build:img', 'build:html', 'build:js', 'build:less']);