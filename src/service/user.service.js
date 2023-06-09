//用户相关的数据库操作;
const UserModel = require('../model/user.model');
// 错误类型;
const {
  userGetInfoFail,
  userAddFail,
  userUpdateInfoFail,
  userUpdateDataFail,
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
    user_title,
    user_img,
    user_sex,
    user_age,
    user_admin,
    user_shop,
  }) {
    try {
      //   定义查询条件;
      const whereOpt = {};
      //   判断是否有查询条件;
      id && Object.assign(whereOpt, { id });
      user_name && Object.assign(whereOpt, { user_name });
      user_password && Object.assign(whereOpt, { user_password });
      user_title && Object.assign(whereOpt, { user_title });
      user_img && Object.assign(whereOpt, { user_img });
      user_sex && Object.assign(whereOpt, { user_sex });
      user_age && Object.assign(whereOpt, { user_age });
      user_admin && Object.assign(whereOpt, { user_admin });
      user_shop && Object.assign(whereOpt, { user_shop });
      //   查询用户;
      const result = await UserModel.findOne({
        //   查询字段;
        attributes: [
          'id',
          'user_name',
          'user_password',
          'user_title',
          'user_img',
          'user_sex',
          'user_age',
          'user_admin',
          'user_shop',
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
  // 修改用户基础信息;
  async updateUserInfo({
    id,
    user_name,
    user_password,
    user_title,
    user_img,
    user_sex,
    user_age,
    user_admin,
    user_shop,
  }) {
    try {
      const whereOpt = { id };
      const newUser = {};
      user_name && Object.assign(newUser, { user_name });
      user_password && Object.assign(newUser, { user_password });
      user_title && Object.assign(newUser, { user_title });
      user_img && Object.assign(newUser, { user_img });
      user_age && Object.assign(newUser, { user_age });
      user_sex && Object.assign(newUser, { user_sex });
      user_admin && Object.assign(newUser, { user_admin });
      user_shop && Object.assign(newUser, { user_shop });
      const result = await UserModel.update(newUser, {
        where: whereOpt,
      });
      return result[0] > 0 ? true : false;
    } catch (error) {
      console.error('修改用户基础信息失败', error);
      ctx.app.emit('error', userUpdateInfoFail, ctx);
    }
  }
  // 修改用户详细信息;需要结合用户详细信息库进行操作,目前暂时不做;
  async updateUserData({}) {
    try {
    } catch (error) {
      console.error('修改用户详细信息失败', error);
      ctx.app.emit('error', userUpdateDataFail, ctx);
    }
  }
}
module.exports = new UserService();
