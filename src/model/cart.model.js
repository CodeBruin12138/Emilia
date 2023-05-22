// 商品数据库模型;
const { DataTypes } = require('sequelize');
// 商品数据库模型;
const GoodsModel = require('./goods.model');
// 数据库连接;
const seq = require('../db/seq');
// 商品模型数据;
const CartModel = seq.define(
  'emilia_carts',
  {
    // 商品id;
    goods_id: {
      // 类型;
      type: DataTypes.INTEGER,
      // 是否允许为空;
      allowNull: false,
      //是否唯一;
      unique: true,
      // 注释;
      comment: '商品id',
    },
    //用户id;
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
    // 商品数量;
    goods_num: {
      // 类型;
      type: DataTypes.INTEGER,
      // 是否允许为空;
      allowNull: false,
      //是否唯一;
      unique: false,
      // 默认值;
      defaultValue: 1,
      // 注释;
      comment: '商品数量',
    },
    // 商品是否选中;
    goods_checked: {
      // 类型;
      type: DataTypes.BOOLEAN,
      // 是否允许为空;
      allowNull: false,
      //是否唯一;
      unique: false,
      // 默认值;
      defaultValue: true,
      // 注释;
      comment: '商品是否选中',
    },
  },
  {
    //伪删除;
    paranoid: true,
  }
);
// 模型同步;
// CartModel.sync({ force: true });
// 关联商品模型;
CartModel.belongsTo(GoodsModel, {
  // 关联字段;
  foreignKey: 'goods_id',
  // 别名;
  as: 'goods_info',
});
// 导出;
module.exports = CartModel;
