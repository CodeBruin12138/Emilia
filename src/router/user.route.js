/**
 * 用户路由;
 */
const Router = require('@koa/router');
//中间件;
const {
  checkUserPassword,
  encryptUserPassword,
} = require('../middleware/user.middleware');
//控制器;
const { userRegister } = require('../controller/user.controller');
// 实例化路由并配置前缀;
const router = new Router({ prefix: '/users' });
// 用户注册;
router.post(
  '/userRegister',
  checkUserPassword,
  encryptUserPassword,
  userRegister
);

module.exports = router;
