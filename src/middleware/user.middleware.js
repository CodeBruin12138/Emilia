// 用户相关中间件;
const bcrypt = require('bcryptjs');
// 错误类型;
const {
  userPasswordEmpty,
  userPasswordFormatError,
  userCheckPasswordFail,
  userEncryptPasswordFail,
  userCheckUserNameOrPasswordFail,
  userUserNameOrPasswordEmpty,
  userVerifyLoginFail,
  userNotExist,
  userPasswordNotMatch,
} = require('../constant/error/user.error.type');
// 用户相关数据库操作;
const { getUserInfo } = require('../service/user.service');
// 判断用户密码是否为空,及是否符合标准;
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
// 用户密码加密;
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
// 校验登录;
const verifyLogin = async (ctx, next) => {
  try {
    // 校验用户是否存在;
    // 获取用户请求数据;
    const user_name = ctx.request.body.user_name;
    const user_password = ctx.request.body.user_password;
    // 判断用户是否存在;
    const result = await getUserInfo({ user_name });
    if (!result) {
      console.error('用户不存在', ctx.request.body);
      ctx.app.emit('error', userNotExist, ctx);
      return;
    }
    // 校验用户密码;
    const isMatch = await bcrypt.compareSync(
      user_password,
      result.user_password
    );
    if (!isMatch) {
      console.error('用户密码不匹配', ctx.request.body);
      ctx.app.emit('error', userPasswordNotMatch, ctx);
      return;
    }
    await next();
  } catch (error) {
    console.error('校验用户登录失败', error);
    ctx.app.emit('error', userVerifyLoginFail, ctx);
  }
};
// 校验用户名或者密码是否为空;
const checkUserNameOrPassword = async (ctx, next) => {
  try {
    // 获取用户请求数据;
    const user_name = ctx.request.body.user_name;
    const user_password = ctx.request.body.user_password;
    if (!user_name || !user_password) {
      console.error('用户名或者密码为空', ctx.request.body);
      ctx.app.emit('error', userUserNameOrPasswordEmpty, ctx);
      return;
    }
    await next();
  } catch (error) {
    console.error('校验用户名或者密码失败', error);
    ctx.app.emit('error', userCheckUserNameOrPasswordFail, ctx);
    return;
  }
};

// 导出中间件;
module.exports = {
  checkUserPassword,
  encryptUserPassword,
  verifyLogin,
  checkUserNameOrPassword,
};
