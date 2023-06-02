//商品相关中间件;

// 错误类型;
const {
  verifyGoodsTypeGradeIsRightFail,
} = require('../constant/error/goods.error.type');
// 校验商品种类是否存在父子关系;
const verifyGoodsTypeGradeIsRight = async (ctx, next) => {
  try {
    //获取用户请求参数;
    // 获取一级分类
    const goods_category_first = ctx.request.body.goods_category_first;
    // 获取二级分类;
    const goods_category_second = ctx.request.body.goods_category_second;
    // 获取三级分类;
    const goods_category_third = ctx.request.body.goods_category_third;
    // 根据三级分类查询获取对应一二级的数据;
    // 如果一级不匹配;
    if (对比一级) {
      return;
    }
    // 如果二级不匹配;
    if (对比二级) {
      return;
    }
    await next();
  } catch (error) {
    console.error('校验商品种类是否存在父子关系失败', error);
    ctx.app.emit('error', verifyGoodsTypeGradeIsRightFail, ctx);
    return;
  }
};

module.exports = {
  verifyGoodsTypeGradeIsRight,
};
