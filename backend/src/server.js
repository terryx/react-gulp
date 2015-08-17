import express from 'express';

let app = express();

var tests;

var server = app.listen(8080, function(){

  var host = server.address().address;
  var port = server.address().port;
  console.log('o');
  
  console.log('Server listening at http://%s:%s', host, port);

});
