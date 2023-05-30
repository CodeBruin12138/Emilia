// 商品相关控制器;

// 数据库操作;
const {
  createGoods,
  changeGoods,
  removeGoods,
  restoreGoods,
  getGoodsList,
  searchGoods,
  getGoodsDetailService,
  addGoodsTypeService,
} = require('../service/goods.service');
// 错误类型;
const {
  publishGoodsFail,
  changeGoodsFail,
  invalidGoodsId,
  removeGoodsFail,
  restoreGoodsFail,
  getGoodsListFail,
  searchGoodsFail,
  getGoodsFail,
  addGoodsTypeFail,
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
  //下架商品;
  async removeGoods(ctx, next) {
    try {
      const id = ctx.params.id;
      if (id === undefined || id === '') {
        console.error('无效的商品id', ctx.params.id);
        ctx.app.emit('error', invalidGoodsId, ctx);
        return;
      }
      const result = await removeGoods(id);
      if (result) {
        ctx.body = {
          code: 0,
          message: '下架商品成功',
        };
      } else {
        console.error('无效的商品id', ctx.params.id);
        ctx.app.emit('error', invalidGoodsId, ctx);
        return;
      }
    } catch (error) {
      console.error('下架商品失败', ctx.params.id);
      ctx.app.emit('error', removeGoodsFail, ctx);
      return;
    }
  }
  // 上架商品;
  async restoreGoods(ctx, next) {
    try {
      // 获取用户请求数据;
      const id = ctx.params.id;
      // 根据id修改商品信息;
      const result = await restoreGoods(id);
      if (result) {
        ctx.body = {
          code: 0,
          message: '上架商品成功',
        };
      } else {
        console.error('无效的商品id', ctx.params.id);
        ctx.app.emit('error', invalidGoodsId, ctx);
        return;
      }
    } catch (error) {
      console.error('上架商品失败', ctx.params.id);
      ctx.app.emit('error', restoreGoodsFail, ctx);
      return;
    }
  }
  // 删除商品;
  // 获取商品列表;
  async getGoodsList(ctx, next) {
    try {
      // 获取用户请求数据;
      const { pageNum, pageSize } = ctx.request.query;
      const result = await getGoodsList(pageNum, pageSize);
      if (result) {
        ctx.body = {
          code: 0,
          message: '获取商品列表成功',
          result,
        };
      } else {
      }
    } catch (error) {
      console.error('获取商品列表失败', error);
      ctx.app.emit('error', getGoodsListFail, ctx);
      return;
    }
  }
  // 获取店铺商品列表;
  async getShopGoodsList(ctx, next) {}
  // 搜索商品;
  async searchGoods(ctx, next) {
    try {
      //获取用户请求数据;
      const { keyword } = ctx.request.query;
      //调用数据库操作;
      const result = await searchGoods(keyword);
      if (result) {
        ctx.body = {
          code: 0,
          message: '搜索商品成功',
          result,
        };
      } else {
        ctx.body = {
          code: 0,
          message: '暂无搜索结果',
          result,
        };
      }
    } catch (error) {
      console.error('搜索商品失败', error);
      ctx.app.emit('error', searchGoodsFail, ctx);
      return;
    }
  }
  // 获取商品详情;
  async getGoodsDetailController(ctx, next) {
    try {
      // 获取请求参数;
      const id = ctx.params.id;
      // 调用数据库操作;
      const result = await getGoodsDetailService(id);
      if (result) {
        // 删除多余的数据;
        delete result.createdAt;
        delete result.updatedAt;
        ctx.body = {
          code: 0,
          message: '查询商品成功',
          result,
        };
      } else {
        console.error('无效的商品id', ctx.params.id);
        ctx.app.emit('error', invalidGoodsId, ctx);
        return;
      }
    } catch (error) {
      console.error('查询商品失败', error);
      ctx.app.emit('error', getGoodsFail, ctx);
      return;
    }
  }

  // 添加商品分类;
  async addGoodsTypeController(ctx, next) {
    try {
      // 获取用户请求数据;
      const {
        goods_category_first,
        goods_category_second,
        goods_category_third,
      } = ctx.request.body;
      // 调用数据库操作;
      const result = await addGoodsTypeService({
        goods_category_first,
        goods_category_second,
        goods_category_third,
      });
      if (result) {
        // 获取用户信息;
        const user_name = ctx.state.user.user_name;
        // 剔除多余的数据;
        delete result.createdAt;
        delete result.updatedAt;
        // 获取当前时间;
        ctx.body = {
          code: 0,
          message: `尊敬的数据库管理员${user_name},您添加的商品分类已经成功上传`,
          result,
        };
      } else {
      }
    } catch (error) {
      console.error('添加商品分类失败', error);
      ctx.app.emit('error', addGoodsTypeFail, ctx);
      return;
    }
  }
}
module.exports = new GoodsController();
