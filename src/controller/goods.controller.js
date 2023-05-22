// 商品相关控制器;

// 数据库操作;
const { createGoods, changeGoods } = require('../service/goods.service');
// 错误类型;
const {
  publishGoodsFail,
  changeGoodsFail,
  invalidGoodsId,
} = require('../constant/error/goods.error.type');
class GoodsController {
  // 发布商品;
  async publishGoods(ctx, next) {
    try {
      // 获取用户账号下的店铺id;
      const user_shop = ctx.state.user.user_shop;
      // 添加到请求体中;
      ctx.request.body.shop_id = user_shop;
      // 获取用户请求数据并操作数据库;
      const result = await createGoods(ctx.request.body);
      // 剔除多余的数据;
      delete result.createdAt;
      delete result.updatedAt;
      console.log(result);
      ctx.body = {
        code: 0,
        message: '发布商品成功',
        result,
      };
    } catch (error) {
      console.error('发布商品失败', error);
      ctx.app.emit('error', publishGoodsFail, ctx);
      return;
    }
  }
  // 修改商品;
  async changeGoods(ctx, next) {
    try {
      // 获取用户请求数据;
      const id = ctx.params.id;
      const goods = ctx.request.body;
      // 根据id修改商品信息;
      const result = await changeGoods(id, goods);
      if (result) {
        ctx.body = {
          code: 0,
          message: '修改商品成功',
        };
      } else {
        console.error('无效的商品id', ctx.params.id);
        ctx.app.emit('error', invalidGoodsId, ctx);
        return;
      }
    } catch (error) {
      console.error('修改商品失败', ctx.params.id);
      ctx.app.emit('error', changeGoodsFail, ctx);
      return;
    }
  }
  // 删除商品;
  // 获取商品列表;
  // 获取商品详情;
}
module.exports = new GoodsController();
