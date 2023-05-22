//商品相关的数据库操作;

// 商品数据库模型;
const GoodsModel = require('../model/goods.model');
// 错误类型;
const {
  publishGoodsFail,
  changeGoodsFail,
  removeGoodsFail,
  restoreGoodsFail,
  getGoodsListFail,
  getGoodsFail,
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
  //下架商品;
  async removeGoods(id) {
    try {
      const result = await GoodsModel.destroy({
        where: {
          id,
        },
      });
      return result > 0 ? true : false;
    } catch (error) {
      console.error('下架商品失败', error);
      ctx.app.emit('error', removeGoodsFail, ctx);
      return;
    }
  }
  //下架商品;
  async restoreGoods(id) {
    try {
      const result = await GoodsModel.restore({
        where: {
          id,
        },
      });
      return result > 0 ? true : false;
    } catch (error) {
      console.error('上架商品失败', error);
      ctx.app.emit('error', restoreGoodsFail, ctx);
      return;
    }
  }
  // 获取商品列表;
  async getGoodsList(pageNum, pageSize) {
    try {
      const result = await GoodsModel.findAndCountAll({
        limit: pageSize * 1,
        offset: (pageNum - 1) * pageSize,
      });
      return {
        pageNum,
        pageSize,
        total: result.length,
        list: result,
      };
    } catch (error) {
      console.error('获取商品列表失败', error);
      ctx.app.emit('error', getGoodsListFail, ctx);
      return;
    }
  }
  // 获取店铺商品列表;
  // 查询商品;
  async searchGoods(goods_id) {
    try {
      // 根据商品id查询商品;
      const result = await GoodsModel.findOne({
        where: { id: goods_id },
      });
      return result ? result.dataValues : null;
    } catch (error) {
      console.error('查询商品失败', error);
      ctx.app.emit('error', getGoodsFail, ctx);
      return;
    }
  }

  // 获取商品详情;
}
module.exports = new GoodsService();
