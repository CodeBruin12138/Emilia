// 订单相关控制器;

//数据库操作;
const { createOrderService } = require('../service/order.service');
// 错误类型;
const { submitOrderFail } = require('../constant/error/order.error.type');

class OrderController {
  //提交订单;
  async submitOrder(ctx, next) {
    try {
      // 获取参数;
      const { addr_id, goods_info, total_price } = ctx.request.body;
      // 获取用户id;
      const user_id = ctx.state.user.id;
      // 订单编号;
      const order_number = 'Emilia-' + Date.now();
      // 操作数据库;
      const result = await createOrderService({
        user_id,
        addr_id,
        order_number,
        total_price,
        goods_info,
      });
      ctx.body = {
        code: 0,
        message: '提交订单成功',
        data: result,
      };
    } catch (error) {
      console.error('提交订单失败', error);
      ctx.app.emit('error', submitOrderFail, ctx);
      return;
    }
  }
}
module.exports = new OrderController();
