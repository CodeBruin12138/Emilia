// 订单数据库模型;
const { DataTypes } = require('sequelize');

// 数据库连接;
const seq = require('../db/seq');
// 订单模型数据;
const OrderModel = seq.define('emilia_orders', {
  // 用户id;
  user_id: {
    // 类型;
    type: DataTypes.INTEGER,
    // 是否允许为空;
    allowNull: false,
    //是否唯一;
    unique: false,
    // 注释;
    comment: '用户id',
  },
  // 地址id;
  addr_id: {
    // 类型;
    type: DataTypes.INTEGER,
    // 是否允许为空;
    allowNull: false,
    //是否唯一;
    unique: false,
    // 注释;
    comment: '地址id',
  },
  // 订单编号;
  order_number: {
    // 类型;
    type: DataTypes.STRING,
    // 是否允许为空;
    allowNull: false,
    //是否唯一;
    unique: true,
    // 注释;
    comment: '订单编号',
  },
  // 订单总价;
  total_price: {
    // 类型;
    type: DataTypes.STRING,
    // 是否允许为空;
    allowNull: false,
    //是否唯一;
    unique: false,
    // 注释;
    comment: '订单总价',
  },
  // 商品信息;
  goods_info: {
    // 类型;
    type: DataTypes.TEXT,
    // 是否允许为空;
    allowNull: false,
    //是否唯一;
    unique: false,
    // 注释;
    comment: '商品信息',
  },
  // 订单状态;
  order_status: {
    // 类型;
    type: DataTypes.INTEGER,
    // 是否允许为空;
    allowNull: false,
    //是否唯一;
    unique: false,
    // 默认值;
    defaultValue: 0,
    // 注释;
    comment: '订单状态',
  },
});
// 模型同步;
// OrderModel.sync({ force: true });
// 导出;
module.exports = OrderModel;
