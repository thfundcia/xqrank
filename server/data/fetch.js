var request = require('request');
var c = require('../config');
var async = require('async');
var jStat = require('jStat').jStat;
var baseUrl = 'http://xueqiu.com';
var _ = require('lodash');
var cheerio = require('cheerio');
var t = require('../help/time');
//获取组合的信息
function combineInfo(options,callback){
  async.auto({
    //获取日收益率、月收益率、年收益率
    combData:function(callback){
      var kind = 'combine_url';
      requestData(options,kind,function(data){
        $ = cheerio.load(data);
        //获取净值信息
        function getRate(i){
          return parseFloat($('.per').eq(i).text())*0.01;
        }
        var name = $('.name').eq(0).text();//组合名字
        var stock_id = "";
        $('.weight-list a').each(function(i,el){
          stock_id = stock_id + $(this).attr('href').substring(3)+',';
        });
        var comb_data = {'income_t':getRate(0).toFixed(4),'income_d':getRate(1).toFixed(4),'income_m':getRate(2).toFixed(4),'net_value':getRate(3)*100,'name':name,'stock_id':stock_id};
        callback(null,comb_data);
      });
    },
    //净值信息
    netValue:function(callback) {
      var kind = 'rate_history';
      requestData(options,kind,function(data){
        data = JSON.parse(data);
        var nvList = data[0].list;
        var net_value = nvList[nvList.length-1].value;
        callback(null,net_value);
      });
    },
    //最大回撤信息
    maxDraw:function(callback) {
      var kind = 'Max_dd';
      requestData(options,kind,function(data){
          data = JSON.parse(data);
          var max_draw = data.max_draw.toFixed(2);
          callback(null,max_draw);
      });
    },
    // //波动率信息
    // volatility:function(callback) {
    //   var kind = 'volatility';
    //   requestData(options,kind,function(data){
    //     data = JSON.parse(data);
    //     var volatility = data.volatility_rate;
    //     callback(null,volatility);
    //   });
    // },
    //夏普比率信息
    sharp:function(callback){
      var kind = 'rate_history';
      requestData(options,kind,function(data){
        data = JSON.parse(data);
        var valueList = _.map(data[0].list,'value');
        var rateList = [];
        valueList.forEach(function(value,i){
          if(i>0){
            rate = (value-valueList[i-1])/valueList[i-1]
            rateList.push(rate);
          }
        });
        var mean = jStat(rateList).mean();
        var stdev = jStat(rateList).stdev();
        var sharp = ((mean-c.baseRate/360)/stdev).toFixed(2);
        callback(null,sharp);
      });
    },
  },function(err,results){
    //最后的输出结果
    var now = new Date()
    var today = t.timeToString(now);
    results = {'userid':options.userid,
              'income_t':results.combData.income_t.toString(),
              'income_d':results.combData.income_d.toString(),
              'income_m':results.combData.income_m.toString(),
              'net_value':results.combData.net_value,
              'comb_name':results.combData.name,
              'id_stock':results.combData.stock_id,
              'index_sharp':results.sharp.toString(),
              'Max_dd':results.maxDraw.toString(),
              'time':today
              }
    callback(results);
  })
}

//请求数据
function requestData(options,kind,callback){
  var headers = genHeader(options);
  var reqOptions = {
    url: c[kind] + options.symbol,
    headers: headers
  };
  request(reqOptions, function(error, res, data) {
    if (!error && res.statusCode == 200) {
      callback(data);
    }else {
      console.log('Error: ' + error);
    }
  });
}

//生成头部
function genHeader(options) {
  var headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36',
    'Cookie': options.cookie,
    'Host': 'xueqiu.com',
    'Referer': 'http://xueqiu.com/P/' + options.symbol
  };

  return headers;
}

module.exports = {
  combineInfo:combineInfo
}
