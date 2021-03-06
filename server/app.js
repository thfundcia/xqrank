//启动一个api接口
var express = require('express');
var routes = require('./api/index');
var schedule = require('node-schedule');
var task = require('./data/task');
var config = require('./config');
var app = express();

//添加跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.use('/', routes);//路由设置

var server = app.listen(config.port, function () {
  var port = server.address().port;
  console.log('Example app listening at http://localhost:%s', port);
});


//定时任务,跟新组合信息
schedule.scheduleJob(config["task"]["getCombinData"], function(){
  console.log('开始跑任务');
  task.getCombinData();
});
