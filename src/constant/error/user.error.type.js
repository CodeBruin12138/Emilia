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
  //查询用户数据库失败;
  userGetInfoFail: {
    code: 10006,
    message: '查询用户数据库失败',
    result: '',
  },
  //添加用户失败;
  userAddFail: {
    code: 10007,
    message: '添加用户失败',
    result: '',
  },
  //校验用户名或者密码失败;
  userCheckUserNameOrPasswordFail: {
    code: 10008,
    message: '校验用户名或者密码失败',
    result: '',
  },
  // 用户名或者密码为空;
  userUserNameOrPasswordEmpty: {
    code: 10009,
    message: '用户名或者密码为空',
    result: '',
  },
  // 校验用户登录失败;
  userVerifyLoginFail: {
    code: 10010,
    message: '校验用户登录失败',
    result: '',
  },
  // 用户不存在;
  userNotExist: {
    code: 10011,
    message: '用户不存在',
    result: '',
  },
  // 用户密码不匹配;
  userPasswordNotMatch: {
    code: 10012,
    message: '用户密码不匹配',
    result: '',
  },
  // 用户登录失败;
  userLoginFail: {
    code: 10013,
    message: '用户登录失败',
    result: '',
  },
};
