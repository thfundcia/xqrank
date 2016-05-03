//启动一个api接口
var express = require('express');
var routes = require('./api/index');
var app = express();

app.use('/', routes);//路由设置

var server = app.listen(8888, function () {
  var port = server.address().port;
  console.log('Example app listening at http://localhost:%s', host, port);
});
