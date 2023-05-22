//购物车相关的数据库操作;

const { Op } = require('sequelize');
// 购物车数据库模型;
const CartModel = require('../model/cart.model');
// 错误类型;
const { addCartFail } = require('../constant/error/cart.error.type');
class CartService {
  // 添加购物车;
  async createOrUpdateCart(user_id, goods_id) {
    try {
      // 查询数据库中是否存在该商品;
      const res = await CartModel.findOne({
        where: {
          [Op.and]: { user_id, goods_id },
        },
      });
      // 如果存在数据库中就自加1;
      if (res) {
        await res.increment('goods_num');
        // 等待更新;
        return await res.reload();
      } else {
        // 如果数据不存在就创建;
        return await CartModel.create({
          user_id,
          goods_id,
        });
      }
    } catch (error) {
      console.error('添加购物车失败', error);
      ctx.app.emit('error', addCartFail, ctx);
      return;
    }
  }
}
module.exports = new CartService();
