//权限相关中间件;
const fs = require('fs');
const path = require('path');
// 引入jsonwebtoken;
const jwt = require('jsonwebtoken');
// 引入环境变量;
const { JWT_SECRET } = require('../config/config.default');
// 引入错误类型;
const {
  tokenInvalid,
  tokenExpired,
  verifySuperShopAdminFail,
  verifySuperShopAdminError,
} = require('../constant/error/auth.error.type');

// token校验;
const verifyToken = async (ctx, next) => {
  try {
    // 获取用户请求中的token;
    const token = ctx.request.headers.authorization;
    // 判断token是否存在;
    if (token === undefined || token === '') {
      console.error('无效的token参数', ctx.request.headers);
      ctx.app.emit('error', tokenInvalid, ctx);
      return;
    } else {
      // 如果存在,则校验token;
      const user = jwt.verify(token, JWT_SECRET);
      // 挂载用户信息;
      ctx.state.user = user;
      await next();
    }
  } catch (error) {
    // 捕获token校验失败的错误;
    switch (error.name) {
      case 'TokenExpiredError':
        console.error('token已过期', error);
        ctx.app.emit('error', tokenExpired, ctx);
        break;
      case 'JsonWebTokenError':
        console.error('无效的token', error);
        ctx.app.emit('error', tokenInvalid, ctx);
    }
  }
};
// 校验用户是否为商店超级管理员;
const verifySuperShopAdmin = async (ctx, next) => {
  try {
    // 获取用户信息;
    const user_shop = ctx.state.user.user_shop;
    const user_admin = ctx.state.user.user_admin;
    // 用户必须存在店铺id,且管理员数值必须大于3才能操作店铺数据,管理员数值为1的是普通管理员,只有商品的上下架处理操作;
    if (user_shop === 0 || user_admin < 3) {
      // 如果不是管理员则获取用户发送的文件数据;
      const illegalFile = ctx.request.files.file;
      // 删除非法文件;
      if (illegalFile) {
        // 如果存在非法文件则删除;
        const illegalFileName = ctx.request.files.file.newFilename;
        fs.unlinkSync(path.join(__dirname, `../upload/${illegalFileName}`));
      }
      console.error('该账号非超级管理员账号,不能进行此项操作', ctx.state.user);
      ctx.app.emit('error', verifySuperShopAdminError, ctx);
      return;
    }
    await next();
  } catch (error) {
    // 校验失败也要删除非法文件;
    const illegalFile = ctx.request.files.file;
    // 删除非法文件;
    if (illegalFile) {
      // 如果存在非法文件则删除;
      const illegalFileName = ctx.request.files.file.newFilename;
      fs.unlinkSync(path.join(__dirname, `../upload/${illegalFileName}`));
    }
    console.error('校验用户是否为商店超级管理员失败', error);
    ctx.app.emit('error', verifySuperShopAdminFail, ctx);
    return;
  }
};
// 导出;
module.exports = {
  verifyToken,
  verifySuperShopAdmin,
};
