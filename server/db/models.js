var Sequelize = require('sequelize');
//链接数据库
var sequelize = new Sequelize('test_cia', 'cia', 'ciacia', {
  host: '10.2.19.46',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

//建立News模型
var CombStock = sequelize.define("comb_stock", {
    userid:Sequelize.INTEGER,
    comb_name:Sequelize.STRING,
    net_value:Sequelize.DOUBLE(5,4),
    income_d:Sequelize.STRING,
    income_m:Sequelize.STRING,
    income_t:Sequelize.STRING,
    Max_dd:Sequelize.STRING,
    index_sharp:Sequelize.STRING,
    id_stock:Sequelize.STRING,
    time:Sequelize.STRING
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);


module.exports = {
   CombStock:CombStock
}
