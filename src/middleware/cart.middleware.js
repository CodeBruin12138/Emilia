//购物车相关中间件;

// 引入环境变量;

// 引入错误类型;
const { invalidGoodsId } = require('../constant/error/goods.error.type');

// 校验购物车参数格式;
const validateCart = async (ctx, next) => {
  try {
    ctx.verifyParams({
      // 商品id;
      goods_id: {
        // 类型;
        type: 'number',
        // 必填;
        required: true,
      },
    });
    await next();
  } catch (error) {
    console.error('无效的商品ID', error);
    invalidGoodsId.result = error;
    ctx.app.emit('error', invalidGoodsId, ctx);
    return;
  }
};
// 导出;
module.exports = {
  validateCart,
};
