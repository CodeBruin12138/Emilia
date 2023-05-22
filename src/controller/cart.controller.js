// 购物车相关控制器;

// 数据库操作;
const { createOrUpdateCart } = require('../service/cart.service');
// 错误类型;
const { addCartFail } = require('../constant/error/cart.error.type');
class CartController {
  //添加购物车;
  async addCart(ctx) {
    try {
      // 获取用户请求参数;
      const user_id = ctx.state.user.id;
      const goods_id = ctx.request.body.goods_id;
      // 添加购物车;
      const result = await createOrUpdateCart(user_id, goods_id);
      // 返回结果;
      ctx.body = {
        code: 0,
        message: '添加购物车成功',
        result,
      };
    } catch (error) {
      console.error('添加购物车失败', error);
      ctx.app.emit('error', addCartFail, ctx);
      return;
    }
  }
}
module.exports = new CartController();
