var dist = './app/dist';
var src = './app/src';
var node_modules = '../node_modules/';

module.exports = {
  browserSync: {
    endpoint: 'http://localhost:3031',
    route: '**',
    dist: dist
  },
  base: {
    dist: dist,
    font: {
      src: [
      './app/src/deps/font-awesome/fonts/**',
      './app/src/deps/boostrap/fonts/**'
      ],
      dest: './app/dist/fonts'
    },
    css: {
      main: 'base.css',
      src: [
      './app/src/deps/font-awesome/css/font-awesome.min.css',
      './app/src/deps/bootstrap/css/bootstrap.min.css'
      ],
      dest: './app/dist/css'
    },
    js: {
      main: 'base.js',
      src: [
      './app/src/deps/jquery/jquery-1.11.2.min.js'
      ],
      dest: './app/dist/js'
    },
    img: {
      src: './app/src/img/**',
      dest: './app/dist/img'
    },
    html: {
      main: src + '/index.html'
    }
  },
  html: {
    main: src + '/index.html',
    src: src + '/*.html',
    dist: dist
  },
  less: {
    main: 'style.css',
    src: src + '/less/*.less',
    dist: dist + '/css'
  },
  react: {
    bundle: 'app.js',
    main: src + '/js/app.js',
    src: src + '/js/**',
    dist: dist + '/js'
  }
}
