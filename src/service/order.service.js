//订单相关的数据库操作;

//数据库模型;
const OrderModel = require('../model/order.model');
// 错误类型;
const { submitOrderFail } = require('../constant/error/order.error.type');
class OrderService {
  // 提交订单;
  async createOrderService({
    user_id,
    addr_id,
    order_number,
    total_price,
    goods_info,
  }) {
    try {
      // 操作数据库;
      const result = await OrderModel.create({
        user_id,
        addr_id,
        order_number,
        total_price,
        goods_info,
      });
      console.log('提交订单成功', result);
      return result;
    } catch (error) {
      console.error('提交订单失败', error);
      ctx.app.emit('error', submitOrderFail, ctx);
      return;
    }
  }
}
module.exports = new OrderService();
