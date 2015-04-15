var browserSync = require('browser-sync');
var reload = browserSync.reload;
var gulp = require('gulp');
var config = require('../config').browserSync;
var url = require('url');
var proxy = require('proxy-middleware');
var modRewrite = require('connect-modrewrite');
var compression = require('compression');

gulp.task('browserSync', function () {

  var localServer = url.parse(config.endpoint);
  localServer.route = config.route;

  var middleWares = [compression(), proxy(localServer)];
  browserSync({
    open: false,
    port: 3031,
    // server: {
    //   baseDir: config.dist,
    //   middleware: middleWares
    // },
    //proxy: "local.dev"
    server: {
      baseDir: config.dist,
      middleware: [
        compression(),
        modRewrite([
           '^/...-.......-.-...$ /index.html', //ugly hack
        ])
      ]
    }
  });

});
