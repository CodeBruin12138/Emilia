//用户相关的数据库操作;
const UserModel = require('../model/user.model');
// 错误类型;
const {
  userGetInfoFail,
  userAddFail,
} = require('../constant/error/user.error.type');
class UserService {
  // 用户注册;
  async userRegister({ user_name, user_password }) {
    try {
      // 创建用户;
      const result = await UserModel.create({
        user_name,
        user_password,
      });
      // 返回数据;
      return result.dataValues;
    } catch (error) {
      console.error('添加用户失败', error);
      ctx.app.emit('error', userAddFail, ctx);
    }
  }
  // 查询用户;
  async getUserInfo({
    id,
    user_name,
    user_password,
    user_admin,
    user_shop,
    user_data,
  }) {
    try {
      //   定义查询条件;
      const whereOpt = {};
      //   判断是否有查询条件;
      id && Object.assign(whereOpt, { id });
      user_name && Object.assign(whereOpt, { user_name });
      user_password && Object.assign(whereOpt, { user_password });
      user_admin && Object.assign(whereOpt, { user_admin });
      user_shop && Object.assign(whereOpt, { user_shop });
      user_data && Object.assign(whereOpt, { user_data });
      //   查询用户;
      const result = await UserModel.findOne({
        //   查询字段;
        attributes: [
          'id',
          'user_name',
          'user_password',
          'user_admin',
          'user_shop',
          'user_data',
        ],
        // 查询条件;
        where: whereOpt,
      });
      // 返回数据;
      return result ? result.dataValues : null;
    } catch (error) {
      console.error('查询用户数据失败', error);
      ctx.app.emit('error', userGetInfoFail, ctx);
    }
  }
}
module.exports = new UserService();
