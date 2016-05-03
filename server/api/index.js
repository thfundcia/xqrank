var express = require('express');
var DAInews = require('../db/models').DAInews;
var router = express.Router();

/* 获取所有的定增新闻 */
router.get('/DAInews', function(req, res, next) {
    DAInews.findAll({limit:5,order:'publish_time desc'}).then(function(news){
      res.json(news);
    });
});

module.exports = router;
