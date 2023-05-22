// 购物车相关控制器;

// 商品数据库模型;
const GoodsModel = require('../model/goods.model');
// 数据库操作;
const {
  createOrUpdateCart,
  findCartsByUserId,
  updateCart,
  delCart,
} = require('../service/cart.service');
const { searchGoods } = require('../service/goods.service');
// 错误类型;
const {
  addCartFail,
  getCartListFail,
  updateCartFail,
  invalidCartId,
  delCartFail,
} = require('../constant/error/cart.error.type');
const { invalidGoodsId } = require('../constant/error/goods.error.type');
const { verifyParamsIncomplete } = require('../constant/error/auth.error.type');
class CartController {
  //添加购物车;
  async addCart(ctx, next) {
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
  // 获取购物车列表;
  async getCartList(ctx, next) {
    try {
      // 获取用户请求数据;
      const { pageNum = 1, pageSize = 10 } = ctx.query;
      const user_id = ctx.state.user.id;
      // 查询数据库;
      const result = await findCartsByUserId(user_id, pageNum, pageSize);
      // 返回结果;
      ctx.body = {
        code: 0,
        message: '获取购物车列表成功',
        result,
      };
    } catch (error) {
      console.error('获取购物车列表失败', error);
      ctx.app.emit('error', getCartListFail, ctx);
      return;
    }
  }
  //更新购物车;
  async updateCart(ctx, next) {
    try {
      // 获取用户请求数据;
      const id = ctx.params.id;
      const goods_num = ctx.request.body.goods_num;
      const goods_checked = ctx.request.body.goods_checked;
      // 校验参数是否完整;
      if (goods_num === undefined || goods_checked === undefined) {
        console.error('参数不完整', ctx.request.body);
        ctx.app.emit('error', verifyParamsIncomplete, ctx);
        return;
      }
      // 更新数据库;
      const result = await updateCart({ id, goods_num, goods_checked });
      if (result !== '') {
        // 返回结果;
        ctx.body = {
          code: 0,
          message: '更新购物车成功',
          result,
        };
      } else {
        // 如果更新失败就返回错误;
        console.error('无效的购物车ID', result);
        ctx.app.emit('error', invalidCartId, ctx);
        return;
      }
    } catch (error) {
      console.error('更新购物车失败', error);
      ctx.app.emit('error', updateCartFail, ctx);
      return;
    }
  }
  //删除购物车;
  async delCart(ctx, next) {
    try {
      // 获取用户请求数据;
      const cart_id = ctx.request.body.cart_id;
      // 删除数据库;
      const result = await delCart(cart_id);
      if (result > 0) {
        ctx.body = {
          code: 0,
          message: '删除购物车成功',
          result,
        };
      } else {
        // 如果删除失败就返回错误;
        console.error('无效的购物车ID', result);
        ctx.app.emit('error', invalidCartId, ctx);
        return;
      }
    } catch (error) {
      console.error('删除购物车失败', error);
      ctx.app.emit('error', delCartFail, ctx);
      return;
    }
  }
}

module.exports = new CartController();
