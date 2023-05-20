// 权限错误类型;
module.exports = {
  // 验证token失败;
  tokenVerifyFail: {
    code: 20001,
    message: '验证token失败',
    result: '',
  },
  //无效的token;
  tokenInvalid: {
    code: 20002,
    message: '无效的token',
    result: '',
  },
  //token已过期;
  tokenExpired: {
    code: 20003,
    message: 'token已过期',
    result: '',
  },
};
