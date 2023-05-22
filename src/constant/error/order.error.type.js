module.exports = {
  // 提交订单失败;
  submitOrderFail: {
    code: 70001,
    message: '提交订单失败，请重试',
    type: 'order',
  },
  // 获取订单列表失败;
  getOrderListFail: {
    code: 70002,
    message: '获取订单列表失败，请重试',
    type: 'order',
  },
  // 修改订单状态失败;
  updateOrderStatusFail: {
    code: 70003,
    message: '修改订单状态失败，请重试',
    type: 'order',
  },
  //无效的订单id;
  invalidOrderId: {
    code: 70004,
    message: '无效的订单id',
    type: 'order',
  },
};
