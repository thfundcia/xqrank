var express = require('express');
var CombStock = require('../db/models').CombStock;
var t = require('../help/time');
var router = express.Router();
/*设置根目录*/
router.get('/',function(req,res){
  res.render('index');
})

/* 获取所有的定增新闻 */
router.get('/comb', function(req, res, next) {
    var today = new Date();
    CombStock.findAll({where:{time:t.timeToString(today)}}).then(function(news){
      res.json(news);
    });
});

module.exports = router;
