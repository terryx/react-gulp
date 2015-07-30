var requireDir = require('require-dir');
var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');

requireDir('./gulp/tasks', {
  recurse: true
});

gulp.task('default', ['browserSync', 'develop:html', 'develop:jsx', 'develop:less']);

gulp.task('build',
  gulpSequence(
    'clean', [
      'build:ico',
      'build:img',
      'build:html',
      'build:js',
      'build:less'
    ]
  ));
