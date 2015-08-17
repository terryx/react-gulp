var config = {};

var src = './backend/src';
var dist = './backend/dist';
var release = './backend/release';

config.src = src;
config.dist = dist;
config.release = release;

config.js = {
  bundle: dist + '/server.js',
  src: src + '/server.js',
  dist: dist + '/'
}

module.exports = config;
