// 购物车相关控制器;

// 商品数据库模型;
const GoodsModel = require('../model/goods.model');
// 数据库操作;
const { createOrUpdateCart } = require('../service/cart.service');
const { searchGoods } = require('../service/goods.service');
// 错误类型;
const { addCartFail } = require('../constant/error/cart.error.type');
const { invalidGoodsId } = require('../constant/error/goods.error.type');
class CartController {
  //添加购物车;
  async addCart(ctx) {
    try {
      // 获取用户请求参数;
      const user_id = ctx.state.user.id;
      const goods_id = ctx.request.body.goods_id;
      // 检查商品是否存在;
      const res = await searchGoods(goods_id);
      if (res) {
        // 如果商品存在就继续;
        // 添加购物车;
        const result = await createOrUpdateCart(user_id, goods_id);
        // 删除不必要的字段;
        delete result.createdAt;
        delete result.updatedAt;
        // 返回结果;
        ctx.body = {
          code: 0,
          message: '添加购物车成功',
          result,
        };
      } else {
        // 如果商品不存在就返回错误;
        console.error('无效的商品ID', goods_id);
        ctx.app.emit('error', invalidGoodsId, ctx);
        return;
      }
    } catch (error) {
      console.error('添加购物车失败', error);
      ctx.app.emit('error', addCartFail, ctx);
      return;
    }
  }
}
module.exports = new CartController();
