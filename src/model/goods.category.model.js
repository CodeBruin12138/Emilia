// 商品分类数据库模型;
const { DataTypes } = require('sequelize');
// 数据库连接;
const seq = require('../db/seq');
// 商品模型数据;
const GoodsCategorytModel = seq.define(
  'emilia_goods_category',
  {
    // 商品分类一级分类;
    goods_category_first: {
      // 类型;
      type: DataTypes.STRING,
      // 能否为空;
      allowNull: false,
      // 是否唯一;
      unique: false,
      // 注释;
      comment: '商品分类一级分类',
    },
    // 商品分类二级分类;
    goods_category_second: {
      // 类型;
      type: DataTypes.STRING,
      // 能否为空;
      allowNull: false,
      // 是否唯一;
      unique: false,
      // 注释;
      comment: '商品分类二级分类',
    },
    // 商品分类三级分类;
    goods_category_third: {
      // 类型;
      type: DataTypes.STRING,
      // 能否为空;
      allowNull: false,
      // 是否唯一;
      unique: true,
      // 注释;
      comment: '商品分类三级分类',
    },
  },
  {
    //伪删除;
    paranoid: true,
  }
);
// 模型同步;
// GoodsCategorytModel.sync({ force: true });
// 导出;
module.exports = GoodsCategorytModel;
