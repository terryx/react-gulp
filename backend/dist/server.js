'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var app = (0, _express2['default'])();

var tests;

var server = app.listen(8080, function () {

  var host = server.address().address;
  var port = server.address().port;
  console.log('o');

  console.log('Server listening at http://%s:%s', host, port);
});