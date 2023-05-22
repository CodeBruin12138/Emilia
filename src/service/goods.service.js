//用户相关的数据库操作;

// 商品数据库模型;
const GoodsModel = require('../model/goods.model');
// 错误类型;
const {
  publishGoodsFail,
  changeGoodsFail,
} = require('../constant/error/goods.error.type');
class GoodsService {
  // 发布商品;
  async createGoods(goods) {
    try {
      // 获取用户请求数据并操作数据库;
      const result = await GoodsModel.create(goods);
      return result.dataValues;
    } catch (error) {
      console.error('发布商品失败', error);
      ctx.app.emit('error', publishGoodsFail, ctx);
      return;
    }
  }
  // 修改商品;
  async changeGoods(id, goods) {
    try {
      // 修改商品信息;
      const result = await GoodsModel.update(goods, {
        where: {
          id,
        },
      });
      return result[0] > 0 ? true : false;
    } catch (error) {
      console.error('修改商品失败', error);
      ctx.app.emit('error', changeGoodsFail, ctx);
      return;
    }
  }
  // 删除商品;

  // 获取商品列表;

  // 获取商品详情;
}
module.exports = new GoodsService();
