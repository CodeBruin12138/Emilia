//用户相关的数据库操作;
const UserModel = require('../model/user.model');
class UserService {
  // 用户注册;
  async userRegister({ user_name, user_password }) {
    try {
      // 创建用户;
      const result = await UserModel.create({ user_name, user_password });
      // 返回数据;
      return result.dataValues;
    } catch (error) {
      console.log(error);
    }
  }
  // 查询用户;
  async getUserInfo({ id, user_name, user_password, user_admin, user_shop }) {
    try {
      //   定义查询条件;
      const whereOpt = {};
      //   判断是否有查询条件;
      id && Object.assign(whereOpt, { id });
      user_name && Object.assign(whereOpt, { user_name });
      user_password && Object.assign(whereOpt, { user_password });
      user_admin && Object.assign(whereOpt, { user_admin });
      user_shop && Object.assign(whereOpt, { user_shop });
      //   查询用户;
      const result = await UserModel.findOne({
        //   查询字段;
        attributes: [
          'id',
          'user_name',
          'user_password',
          'user_admin',
          'user_shop',
        ],
        // 查询条件;
        where: whereOpt,
      });
      // 返回数据;
      return result ? result.dataValues : null;
    } catch (error) {}
  }
}
module.exports = new UserService();
