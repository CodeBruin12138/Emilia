/**
 * 订单相关路由;
 */
const Router = require('@koa/router');
//控制器;
const { submitOrder } = require('../controller/order.controller');
//中间件;
const {
  verifyToken,
  validateParams,
} = require('../middleware/auth.middleware');
// 实例化路由并配置前缀;
const router = new Router({ prefix: '/orders' });
// 添加订单;
router.post(
  '/addOrder',
  // 验证token;
  verifyToken,
  // 验证参数;
  validateParams({
    // 地址id;
    addr_id: {
      type: 'number',
      required: true,
    },
    // 商品列表;
    goods_info: {
      type: 'array',
      required: true,
    },
    // 总价;
    total_price: {
      type: 'string',
      required: true,
    },
  }),
  // 提交订单;
  submitOrder
);

module.exports = router;
