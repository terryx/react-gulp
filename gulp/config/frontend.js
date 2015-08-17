var config = {};

var src = './frontend/src';
var dist = './frontend/dist';
var release = './frontend/release';

config.src = src;
config.dist = dist;
config.release = release;

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

//specify your own local server settings
config.browserSync = {
  apiServer: {
    url: 'http://localhost:1500/api',
    route: '/api'
  },
  dist: dist
}

module.exports = config;
