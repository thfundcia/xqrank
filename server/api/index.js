var express = require('express');
var CombStock = require('../db/models').CombStock;
var router = express.Router();

/* 获取所有的定增新闻 */
router.get('/comb', function(req, res, next) {
    CombStock.findAll().then(function(news){
      res.json(news);
    });
});

module.exports = router;
