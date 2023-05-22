/**
 * 购物车相关路由;
 */
// 控制器;
const {
  addCart,
  getCartList,
  updateCart,
  delCart,
} = require('../controller/cart.controller');
//中间件;
const {
  verifyToken,
  validateParams,
} = require('../middleware/auth.middleware');
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

// 获取购物车列表;
router.get(
  '/getCartList',
  //校验用户是否登录;
  verifyToken,
  //获取购物车列表;
  getCartList
);
// 更新购物车;
router.patch(
  '/updateCart/:id',
  //校验用户是否登录;
  verifyToken,
  //校验参数格式;
  validateParams({
    // 商品数量;
    goods_num: {
      // 类型;
      type: 'number',
      // 必填;
      required: false,
    },
    // 商品是否选中;
    goods_checked: {
      // 类型;
      type: 'boolean',
      // 必填;
      required: false,
    },
  }),
  updateCart
);
//删除购物车;
router.delete(
  '/delCart',
  //校验用户是否登录;
  verifyToken,
  //校验参数格式;
  validateParams({
    // 商品id;
    cart_id: {
      // 类型;
      type: 'array',
      // 必填;
      required: true,
    },
  }),
  //删除购物车;
  delCart
);

module.exports = router;
