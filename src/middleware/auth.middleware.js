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
  verifyParamsFail,
  verifyisDBAdminFail,
  verifyisDBAdminError,
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
// 添加商品参数校验;
const verifyParams = async (ctx, next) => {
  try {
    ctx.verifyParams({
      // 商品名;
      goods_name: {
        type: 'string',
        required: true,
        allowEmpty: false,
        max: 6,
        min: 3,
        trim: true,
        // format: /^[a-zA-Z0-9]{3,6}$/,
        正则大小写数值字母加符号最少9位,
        最多16位: /^[a-zA-Z0-9]{9,16}$/,
      },
      // 商品价格;
      goods_price: { type: 'number', required: true },
      // 商品库存;
      goods_stock: { type: 'number', required: true },
      // 商品图片;
      goods_img: { type: 'string', required: true },
      // 商品描述;
      goods_description: { type: 'string', required: true },
      // 商品状态;
      goods_status: { type: 'number', required: true },
      //店铺;
      shop_id: { type: 'number', required: true },
    });
  } catch (error) {
    console.error('参数校验失败', error);
    verifyParamsFail.result = error;
    ctx.app.emit('error', verifyParamsFail, ctx);
    return;
  }
};
//参数校验;
const validateParams = (rules, errorType) => {
  return async (ctx, next) => {
    try {
      ctx.verifyParams(rules);
      await next();
    } catch (error) {
      console.error(errorType.message, error);
      errorType.result = error;
      ctx.app.emit('error', errorType, ctx);
      return;
    }
  };
};
//校验账号是否为数据库管理员(拥有操作数据库任意数据的权限,包括删除数据,但无法操作数据库中账号权限值的大小);
const verifyisDBAdmin = async (ctx, next) => {
  try {
    // 获取用户信息;
    const user_admin = ctx.state.user.user_admin;
    // 现在只是校验了用户是否为管理员,后期如果考虑安全还需要校验用户设备和一些约定的密码需要管理员在发送请求的时候一起上传;
    // 在body中有一个db_appoint_password字段是必传的,可以用来约定一些特殊字符用于校验数据库管理员账号,这里就不使用了,有需要的可以用来做基础校验;
    // 如果管理员账号不是最高权限;
    if (user_admin !== 9) {
      console.error('该账号非数据库管理员账号', ctx.state.user);
      ctx.app.emit('error', verifyisDBAdminError, ctx);
      return;
    }
    await next();
  } catch (error) {
    console.error('校验数据库管理员账号失败', error);
    ctx.app.emit('error', verifyisDBAdminFail, ctx);
    return;
  }
};
// 导出;
module.exports = {
  verifyToken,
  verifySuperShopAdmin,
  verifyParams,
  validateParams,
  verifyisDBAdmin,
};
