//购物车相关的数据库操作;

const { Op } = require('sequelize');
// 购物车数据库模型;
const CartModel = require('../model/cart.model');
// 商品数据库模型;
const GoodsModel = require('../model/goods.model');
// 错误类型;
const {
  addCartFail,
  getCartListFail,
  updateCartFail,
  delCartFail,
} = require('../constant/error/cart.error.type');
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
  // 获取购物车列表;
  async findCartsByUserId(user_id, pageNum, pageSize) {
    try {
      const { count, rows } = await CartModel.findAndCountAll({
        where: {
          user_id,
        },
        attributes: ['id', 'goods_id', 'goods_num', 'goods_checked'],
        // 排序;
        offset: (pageNum - 1) * pageSize,
        // 每页显示数量;
        limit: pageSize * 1,
        // 关联查询;
        include: {
          model: GoodsModel,
          attributes: [
            'id',
            'goods_name',
            'goods_price',
            'goods_img',
            'shop_id',
          ],
          as: 'goods_info',
        },
      });
      return {
        pageNum,
        pageSize,
        total: count,
        list: rows,
      };
    } catch (error) {
      console.error('获取购物车列表失败', error);
      ctx.app.emit('error', getCartListFail, ctx);
      return;
    }
  }
  // 更新购物车;
  async updateCart({ id, goods_num, goods_checked }) {
    try {
      // 根据id查询购物车;
      const result = await CartModel.findByPk(id);
      // 如果购物车不存在就返回错误;
      if (!result) return '';
      // 如果购物车存在就更新;
      goods_num !== undefined ? (result.goods_num = goods_num) : '';
      if (goods_checked !== undefined) {
        result.goods_checked = goods_checked;
      }
      // 保存更新;
      return await result.save();
    } catch (error) {
      console.error('更新购物车失败', error);
      ctx.app.emit('error', updateCartFail, ctx);
      return;
    }
  }
  // 删除购物车;
  async delCart(cart_id) {
    try {
      return await CartModel.destroy({
        where: {
          id: {
            [Op.in]: cart_id,
          },
        },
      });
    } catch (error) {
      console.error('删除购物车失败', error);
      ctx.app.emit('error', delCartFail, ctx);
      return;
    }
  }
}

module.exports = new CartService();
