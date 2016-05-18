var express = require('express');
var CombStock = require('../db/models').CombStock;
var t = require('../help/time');
var router = express.Router();

/* 获取所有的定增新闻 */
router.get('/comb', function(req, res, next) {
    var today = new Date();
    CombStock.findAll({where:{time:t.timeToString(today)},order:'net_value DESC'}).then(function(news){
      res.json(news);
    });
});

module.exports = router;
