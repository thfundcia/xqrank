var cookie = require('./cookie');
var fetch = require('./fetch');
var data = require('../config.json');
var CombStock= require('../db/models').CombStock;
var async = require('async');
var _ = require('lodash');
var t = require('../help/time');

//爬去指定用户的组合收益情况
function getCombinData(){
  var q = async.queue(function(task,next){
    fetch.combineInfo(task,function(data){
      CombStock.findOrCreate({where:{comb_name:data.comb_name,time:data.time},defaults:data})
      .spread(function(result){
        result.userid = data.userid;
        result.net_value = data.net_value;
        result.income_d = data.income_d;
        result.income_m =data.income_m;
        result.income_t = data.income_t;
        result.Max_dd=data.Max_dd;
        result.index_sharp = data.index_sharp;
        result.id_stock=data.id_stock;
        result.save();
      })
    })
  },16);

  cookie.getCookieStr('http://xueqiu.com',function(cookie){
    for(var symbol in data.groups){
      q.push({symbol:data.groups[symbol][0],cookie:cookie,userid:data.groups[symbol][1]});
    }
  });

  q.drain = function() {
    console.log('done');
  };
}

module.exports = {
  getCombinData:getCombinData
}
