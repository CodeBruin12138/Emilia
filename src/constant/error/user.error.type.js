// 用户错误类型;
module.exports = {
  //用户密码格式错误;
  userPasswordFormatError: {
    code: 10001,
    message: '用户密码不符合规范',
    result: '',
  },
  //用户密码为空;
  userPasswordEmpty: {
    code: 10002,
    message: '用户密码为空',
    result: '',
  },
  //用户注册失败;
  userRegisterFail: {
    code: 10003,
    message: '用户注册失败',
    result: '',
  },
  //校验用户密码失败;
  userCheckPasswordFail: {
    code: 10004,
    message: '校验用户密码失败',
    result: '',
  },
  //用户密码加密失败;
  userEncryptPasswordFail: {
    code: 10005,
    message: '用户密码加密失败',
    result: '',
  },
};
