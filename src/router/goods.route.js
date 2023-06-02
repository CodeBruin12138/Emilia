/**
 * 商品相关路由;
 */
// 控制器;
const {
  publishGoods,
  changeGoods,
  removeGoods,
  restoreGoods,
  getGoodsList,
  getShopGoodsList,
  searchGoods,
  getGoodsDetailController,
  addGoodsTypeController,
  searchGoodsTypeController,
} = require('../controller/goods.controller');
//中间件;
const {
  verifyToken,
  verifySuperShopAdmin,
  verifyisDBAdmin,
} = require('../middleware/auth.middleware');
// 路由;
const Router = require('@koa/router');
// 实例化路由并配置前缀;
const router = new Router({ prefix: '/goods' });
// 发布商品;
router.post(
  '/publishGoods',
  // 验证token;
  verifyToken,
  //校验用户是否为商店超级管理员;
  verifySuperShopAdmin,
  // 发布商品;
  publishGoods
);
// 修改商品;
router.put(
  '/changeGoods/:id',
  // 验证token;
  verifyToken,
  //校验用户是否为商店超级管理员;
  verifySuperShopAdmin,
  // 修改商品;
  changeGoods
);
// 下架商品;
router.post(
  '/removeGoods/:id/off',
  // 验证token;
  verifyToken,
  //校验用户是否为商店超级管理员;
  verifySuperShopAdmin,
  // 下架商品;
  removeGoods
);
// 上架商品;
router.post(
  '/restoreGoods/:id/on',
  // 验证token;
  verifyToken,
  //校验用户是否为商店超级管理员;
  verifySuperShopAdmin,
  // 上架商品;
  restoreGoods
);
// 获取商品列表;
router.get('/getGoodsList', getGoodsList);
// 获取店铺商品列表;
router.get('/getShopGoodsList', verifyToken, getShopGoodsList);
// 搜索商品类别;
router.get('/searchGoodsType', searchGoodsTypeController);
// 根据商品类别详细搜索同类商品;
router.get('/searchGoods', searchGoods);
// 获取商品详情;
router.get('/getGoodsDetail/:id', getGoodsDetailController);
// 增加商品种类;
router.post(
  '/addGoodsType',
  // 验证token;
  verifyToken,
  //校验用户是否为数据库管理员;
  verifyisDBAdmin,
  // 增加商品种类;
  addGoodsTypeController
);

module.exports = router;
