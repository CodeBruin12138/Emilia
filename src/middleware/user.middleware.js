// 用户相关中间件;
const bcrypt = require('bcryptjs');
// 错误类型;
const {
  userPasswordEmpty,
  userPasswordFormatError,
  userCheckPasswordFail,
  userEncryptPasswordFail,
} = require('../constant/error/user.error.type');
// /判断用户密码;
const checkUserPassword = async (ctx, next) => {
  try {
    // 获取用户请求数据;
    const password = ctx.request.body.user_password;
    // 判断用户密码是否为空;
    if (!password) {
      console.error('用户密码为空', ctx.request.body);
      ctx.app.emit('error', userPasswordEmpty, ctx);
      return;
    } else {
      // 如果不为空,则去除空格;
      user_password = password.replace(/\s*/g, '');
      // 判断用户密码是否符合规范;
      if (user_password.length < 13 || user_password.length > 23) {
        console.error('用户密码不符合规范', ctx.request.body);
        ctx.app.emit('error', userPasswordFormatError, ctx);
        return;
      }
      // 将剔除空格后的用户密码存入请求体;
      ctx.request.body.user_password = user_password;
      await next();
    }
  } catch (error) {
    console.error('校验用户密码失败', error);
    ctx.app.emit('error', userCheckPasswordFail, ctx);
    return;
  }
};
//用户密码加密;
const encryptUserPassword = async (ctx, next) => {
  try {
    // 生成盐;
    const salt = await bcrypt.genSaltSync(10);
    // 加密用户密码;
    const hash = await bcrypt.hashSync(ctx.request.body.user_password, salt);
    // 将加密后的用户密码存入请求体;
    ctx.request.body.user_password = hash;
    await next();
  } catch (error) {
    console.error('用户密码加密失败', error);
    ctx.app.emit('error', userEncryptPasswordFail, ctx);
    return;
  }
};

// 导出中间件;
module.exports = {
  checkUserPassword,
  encryptUserPassword,
};
