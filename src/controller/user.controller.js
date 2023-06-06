// 用户相关控制器;
const jwt = require('jsonwebtoken');
// 环境变量;
const { JWT_SECRET } = require('../config/config.default');
// 用户相关的数据库操作;
const {
  userRegister,
  getUserInfo,
  updateUserInfo,
} = require('../service/user.service');
// 错误类型;
const {
  userRegisterFail,
  userLoginFail,
  userChangePasswordFail,
  userChangePasswordError,
} = require('../constant/error/user.error.type');
const { tokenVerifyFail } = require('../constant/error/auth.error.type');
class UserController {
  // 用户注册;
  async userRegister(ctx, next) {
    try {
      // 设置默认数据及获取用户请求数据;
      // 获取当前时间戳;
      const user_name = new Date().getTime();
      const user_password = ctx.request.body.user_password;
      // 调用service层;
      const result = await userRegister({
        user_name,
        user_password,
      });
      // 返回数据;
      ctx.body = {
        code: 0,
        message: '注册成功',
        data: {
          user_name: result.user_name,
          user_admin: result.user_admin,
          user_shop: result.user_shop,
          user_data: result.user_data,
        },
      };
    } catch (error) {
      console.error('用户注册失败', error);
      ctx.app.emit('error', userRegisterFail, ctx);
      return;
    }
  }
  // 用户登录;
  async userLogin(ctx, next) {
    try {
      // 获取用户数据库信息;
      const user_name = ctx.request.body.user_name;
      const result = await getUserInfo({ user_name });
      //剔除密码;
      delete result.user_password;
      ctx.body = {
        code: 0,
        message: '登录成功',
        result: {
          token: jwt.sign(result, JWT_SECRET, { expiresIn: '1d' }),
        },
      };
    } catch (error) {
      console.error('用户登录失败', error);
      ctx.app.emit('error', userLoginFail, ctx);
      return;
    }
  }
  // 修改密码;
  async userChangePassword(ctx, next) {
    try {
      // 获取用户请求信息;
      const id = ctx.state.user.id;
      const user_password = ctx.request.body.user_password;
      // 根据id修改用户密码;
      const result = await updateUserInfo({ id, user_password });
      if (result) {
        ctx.body = {
          code: 0,
          message: '修改密码成功',
          result: '',
        };
      } else {
        console.error('修改密码失败', ctx.request.body);
        ctx.app.emit('error', userChangePasswordFail, ctx);
        return;
      }
    } catch (error) {
      console.error('修改密码时出错', error);
      ctx.app.emit('error', userChangePasswordError, ctx);
      return;
    }
  }
  // 校验token;
  async verifyTokenController(ctx, next) {
    try {
      ctx.body = {
        code: 0,
        message: '校验token成功',
        result: '',
      };
    } catch (error) {
      console.error('校验token失败', error);
      ctx.app.emit('error', tokenVerifyFail, ctx);
      return;
    }
  }
}
module.exports = new UserController();
