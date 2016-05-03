//监听利好消息，并推送到机器人上。
//DAInews:定向增发消息
var Sequelize = require('sequelize');
//链接数据库
var sequelize = new Sequelize('cia', 'cia', 'ciacia', {
  host: 'qwercia01.mysql.rds.aliyuncs.com',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

//建立News模型
var DAInews = sequelize.define("t_private_placement", {
  title:Sequelize.STRING,
  url:Sequelize.STRING,
  publish_time:Sequelize.DATE,
  content:Sequelize.TEXT
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);


module.exports = {
   DAInews:DAInews
}
