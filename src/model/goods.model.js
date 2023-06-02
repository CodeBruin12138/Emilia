// 商品数据库模型;
const { DataTypes } = require('sequelize');
// 数据库连接;
const seq = require('../db/seq');
// 商品模型数据;
const GoodsModel = seq.define(
  'emilia_goods',
  {
    // 商品名;
    goods_name: {
      // 类型;
      type: DataTypes.STRING,
      // 是否允许为空;
      allowNull: false,
      //是否唯一;
      unique: false,
      // 注释;
      comment: '商品名',
    },
    // 商品价格;
    goods_price: {
      // 类型;
      type: DataTypes.DECIMAL(10, 2),
      // 是否允许为空;
      allowNull: false,
      //是否唯一;
      unique: false,
      // 注释;
      comment: '商品价格',
    },
    // 商品库存;
    goods_stock: {
      // 类型;
      type: DataTypes.INTEGER,
      // 是否允许为空;
      allowNull: false,
      //是否唯一;
      unique: false,
      // 注释;
      comment: '商品库存',
    },
    // 商品图片;
    goods_img: {
      // 类型;
      type: DataTypes.STRING,
      // 是否允许为空;
      allowNull: false,
      //是否唯一;
      unique: false,
      // 注释;
      comment: '商品图片',
    },
    // 商品所属店铺;
    shop_id: {
      // 类型;
      type: DataTypes.INTEGER,
      // 是否允许为空;
      allowNull: false,
      //是否唯一;
      unique: false,
      // 注释;
      comment: '商品所属店铺',
    },
    // 商品分类;
    goods_category_third: {
      // 类型;
      type: DataTypes.STRING,
      // 是否允许为空;
      allowNull: false,
      //是否唯一;
      unique: false,
      // 注释;
      comment: '商品分类',
    },
  },
  {
    // 伪删除;
    paranoid: true,
  }
);
// 模型同步;
// GoodsModel.sync({ force: true });
// 导出;
module.exports = GoodsModel;
