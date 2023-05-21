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
  //校验用户是否为商店超级管理员失败;
  verifySuperShopAdminFail: {
    code: 20004,
    message: '校验用户是否为商店超级管理员失败',
    result: '',
  },
  //该账号非店铺超级管理员账号;
  verifySuperShopAdminError: {
    code: 20005,
    message: '该账号非店铺超级管理员账号',
    result: '',
  },
};