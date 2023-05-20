//权限相关中间件;
// 引入jsonwebtoken;
const jwt = require('jsonwebtoken');
// 引入环境变量;
const { JWT_SECRET } = require('../config/config.default');
// 引入错误类型;
const {
  tokenInvalid,
  tokenExpired,
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

// 导出;
module.exports = {
  verifyToken,
};
