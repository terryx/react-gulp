var gulp = require('gulp');
var config = require('../config');

gulp.task('watch:develop', function () {
  gulp.watch(config.less.src, ['less:develop']);
  gulp.watch(config.html.src, ['html:develop']);
  gulp.watch(config.react.src, ['browserify:develop']);
});

gulp.task('watch:production', function () {
  gulp.watch(config.less.src, ['less:production', 'less:uncss']);
  gulp.watch(config.react.src, ['browserify:production']);
  gulp.watch(config.html.src, ['html:production']);
});
