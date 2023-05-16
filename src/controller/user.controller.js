// 用户相关控制器;
const jwt = require('jsonwebtoken');
// 环境变量;
const { JWT_SECRET } = require('../config/config.default');

// 用户相关的数据库操作;
const { userRegister, getUserInfo } = require('../service/user.service');
// 错误类型;
const {
  userRegisterFail,
  userLoginFail,
} = require('../constant/error/user.error.type');
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

      // 生成token;
    } catch (error) {
      console.error('用户登录失败', error);
      ctx.app.emit('error', userLoginFail, ctx);
      return;
    }
  }
}
module.exports = new UserController();
