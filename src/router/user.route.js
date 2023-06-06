/**
 * 用户相关路由;
 */
const Router = require('@koa/router');
//中间件;
const {
  checkUserPassword,
  encryptUserPassword,
  checkUserNameOrPassword,
  verifyLogin,
} = require('../middleware/user.middleware');
const { verifyToken } = require('../middleware/auth.middleware');
//控制器;
const {
  userRegister,
  userLogin,
  userChangePassword,
  verifyTokenController,
} = require('../controller/user.controller');
// 实例化路由并配置前缀;
const router = new Router({ prefix: '/users' });
// 用户注册;
router.post(
  '/userRegister',
  //校验用户密码;
  checkUserPassword,
  //加密用户密码;
  encryptUserPassword,
  //用户注册;
  userRegister
);
// 用户登录;
router.post(
  '/userLogin',
  //校验用户名或者密码是否为空;
  checkUserNameOrPassword,
  //校验用户是否存在及密码是否正确;
  verifyLogin,
  //用户登录;
  userLogin
);
// 修改密码;
router.patch(
  '/userChangePassword',
  // 校验token;
  verifyToken,
  // 校验密码是否为空;
  checkUserPassword,
  // 加密密码;
  encryptUserPassword,
  // 修改密码;
  userChangePassword
);
//校验token;
router.post('/verifyToken', verifyToken, verifyTokenController);

module.exports = router;
