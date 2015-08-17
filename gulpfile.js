var requireDir = require('require-dir');
var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');

requireDir('./gulp/tasks', {
  recurse: true
});

gulp.task('default', ['browserSync', 'develop:html', 'develop:js', 'develop:less']);

gulp.task('develop:frontend', gulpSequence(
  'develop:clean', ['browserSync', 'develop:html', 'develop:js', 'develop:less']
));

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

gulp.task('release:frontend',
  gulpSequence(
    ['clean:dist', 'clean:release'], [
      'build:ico',
      'build:img',
      'build:html',
      'build:js',
      'build:less'
    ],
    'build:release'
  ));

  gulp.task('develop:backend', ['babel', 'nodemon']);
