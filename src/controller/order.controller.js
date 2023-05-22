// 订单相关控制器;

//数据库操作;
const {
  createOrderService,
  getOrderListService,
  updateOrderStatusService,
} = require('../service/order.service');
// 错误类型;
const {
  submitOrderFail,
  getOrderListFail,
  updateOrderStatusFail,
  invalidOrderId,
} = require('../constant/error/order.error.type');

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
  // 获取订单列表;
  async getOrderListController(ctx, next) {
    try {
      // 获取用户请求参数;
      const { page = 1, size = 10 } = ctx.query;
      // 获取用户id;
      const user_id = ctx.state.user.id;
      // 订单状态;
      const order_status = ctx.query.order_status || 0;
      // 操作数据库;
      const result = await getOrderListService({
        user_id,
        page,
        size,
        order_status,
      });
      ctx.body = {
        code: 0,
        message: '获取订单列表成功',
        data: result,
      };
    } catch (error) {
      console.error('获取订单列表失败', error);
      ctx.app.emit('error', getOrderListFail, ctx);
      return;
    }
  }
  // 修改订单状态;
  async updateOrderStatusController(ctx, next) {
    try {
      // 获取用户请求参数;
      const { order_id, order_status } = ctx.request.body;
      // 获取用户id;
      const user_id = ctx.state.user.id;
      // 操作数据库;
      const result = await updateOrderStatusService({
        user_id,
        order_id,
        order_status,
      });
      if (result[0] === 1) {
        ctx.body = {
          code: 0,
          message: '修改订单状态成功',
          data: result,
        };
      } else {
        console.error('无效的订单id', order_id);
        ctx.app.emit('error', invalidOrderId, ctx);
        return;
      }
    } catch (error) {
      console.error('修改订单状态失败', error);
      ctx.app.emit('error', updateOrderStatusFail, ctx);
      return;
    }
  }
}
module.exports = new OrderController();
