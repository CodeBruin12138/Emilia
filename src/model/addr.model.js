// 商品数据库模型;
const { DataTypes } = require('sequelize');

// 数据库连接;
const seq = require('../db/seq');
// 地址模型数据;
const AddressModel = seq.define('emilia_addresses', {
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
  // 用户名;
  name: {
    // 类型;
    type: DataTypes.STRING,
    // 是否允许为空;
    allowNull: false,
    //是否唯一;
    unique: false,
    // 注释;
    comment: '用户名',
  },
  // 手机号;
  phone: {
    // 类型;
    type: DataTypes.STRING,
    // 是否允许为空;
    allowNull: false,
    //是否唯一;
    unique: false,
    // 注释;
    comment: '手机号',
  },
  // 省份;
  province: {
    // 类型;
    type: DataTypes.STRING,
    // 是否允许为空;
    allowNull: false,
    //是否唯一;
    unique: false,
    // 注释;
    comment: '省份',
  },
  // 城市;
  city: {
    // 类型;
    type: DataTypes.STRING,
    // 是否允许为空;
    allowNull: false,
    //是否唯一;
    unique: false,
    // 注释;
    comment: '城市',
  },
  // 区域;
  area: {
    // 类型;
    type: DataTypes.STRING,
    // 是否允许为空;
    allowNull: false,
    //是否唯一;
    unique: false,
    // 注释;
    comment: '区域',
  },
  // 详细地址;
  addressDetail: {
    // 类型;
    type: DataTypes.STRING,
    // 是否允许为空;
    allowNull: false,
    //是否唯一;
    unique: false,
    // 注释;
    comment: '详细地址',
  },
  // 是否默认;
  isDefault: {
    // 类型;
    type: DataTypes.BOOLEAN,
    // 是否允许为空;
    allowNull: false,
    //是否唯一;
    unique: false,
    // 默认值;
    defaultValue: false,
    // 注释;
    comment: '是否默认',
  },
});
// 模型同步;
// AddressModel.sync({ force: true });
// 导出;
module.exports = AddressModel;
