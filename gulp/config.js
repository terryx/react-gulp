var config = {};

var src = './app/src';
var dist = './app/dist';

config.src = src;
config.dist = dist;

config.js = {
  bundle: 'app.js',
  src: src + '/js/app.js',
  dist: dist + '/js'
};

config.css = {
  bundle: 'main.css',
  src: src + '/less/*.less',
  dist: dist + '/css'
};

config.html = {
  src: src + '/*.html',
  dist: dist
};

config.img = {
  src: src + '/img/**',
  dist: dist + '/img'
}

config.browserSync = {
  apiServer: {
    url: 'http://localhost:1500/api',
    route: '/api'
  },
  dist: dist
}

module.exports = config;