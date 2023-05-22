/**
 * 购物车相关路由;
 */
// 控制器;
const { addCart } = require('../controller/cart.controller');
//中间件;
const { verifyToken } = require('../middleware/auth.middleware');
const { validateCart } = require('../middleware/cart.middleware');
// 路由;
const Router = require('@koa/router');
// 实例化路由并配置前缀;
const router = new Router({ prefix: '/carts' });
//添加购物车;
router.post(
  '/addCart',
  //校验用户是否登录;
  verifyToken,
  //校验购物车参数格式;
  validateCart,
  //添加购物车;
  addCart
);

module.exports = router;
