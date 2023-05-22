//订单相关的数据库操作;

//数据库模型;
const OrderModel = require('../model/order.model');
// 错误类型;
const {
  submitOrderFail,
  getOrderListFail,
  updateOrderStatusFail,
} = require('../constant/error/order.error.type');
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
      return result;
    } catch (error) {
      console.error('提交订单失败', error);
      ctx.app.emit('error', submitOrderFail, ctx);
      return;
    }
  }
  // 获取订单列表;
  async getOrderListService({ user_id, page, size, order_status }) {
    try {
      // 操作数据库;
      const result = await OrderModel.findAndCountAll({
        where: {
          order_status,
          user_id,
        },
        attributes: [
          'id',
          'order_number',
          'total_price',
          'goods_info',
          'order_status',
          'createdAt',
        ],
        limit: size * 1,
        offset: (page - 1) * size,
      });
      return {
        page,
        size,
        total: result.count,
        list: result.rows,
      };
    } catch (error) {
      console.error('获取订单列表失败', error);
      ctx.app.emit('error', getOrderListFail, ctx);
      return;
    }
  }
  // 修改订单状态;
  async updateOrderStatusService({ user_id, order_id, order_status }) {
    try {
      // 操作数据库;
      const result = await OrderModel.update(
        {
          order_status,
        },
        {
          where: {
            user_id,
            id: order_id,
          },
        }
      );
      return result;
    } catch (error) {
      console.error('修改订单状态失败', error);
      ctx.app.emit('error', updateOrderStatusFail, ctx);
      return;
    }
  }
}
module.exports = new OrderService();
