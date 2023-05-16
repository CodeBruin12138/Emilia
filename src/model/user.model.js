// 用户数据库模型;
const { DataTypes } = require('sequelize');
const seq = require('../db/seq');
// 用户模型数据;
const UserModel = seq.define('emilia_user', {
  // 用户名;
  user_name: {
    // 类型;
    type: DataTypes.STRING,
    // 是否允许为空;
    allowNull: false,
    //是否唯一;
    unique: true,
    // 注释;
    comment: '用户名',
  },
  // 用户密码;
  user_password: {
    type: DataTypes.CHAR(64),
    allowNull: false,
    unique: false,
    comment: '用户密码',
  },
  // 是否为管理员;
  user_admin: {
    type: DataTypes.INTEGER,
    allowNull: true,
    unique: false,
    defaultValue: '0',
    comment:
      '是否为管理员,使用权重进行判断,如果为0就不是管理员或账号下没有可管理的店铺,如果为1就是店铺管理员,仅有小部分权限,如果为3则是店铺超级管理员,有更多权限,如果是店长就是5,同时也要根据账号下的店铺id进行综合判断;',
  },
  // 用户店铺号;
  user_shop: {
    type: DataTypes.INTEGER,
    allowNull: true,
    unique: false,
    defaultValue: '0',
    comment: '用户店铺号',
  },
  //用户数据;
  user_data: {
    type: DataTypes.INTEGER,
    allowNull: true,
    unique: true,
    defaultValue: '0',
    comment: '用户数据',
  },
});
// 模型同步;
UserModel.sync({ force: true });
// 导出;
module.exports = UserModel;
