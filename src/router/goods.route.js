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
} = require('../controller/goods.controller');
//中间件;
const {
  verifyToken,
  verifySuperShopAdmin,
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
// 删除商品;
// 获取商品列表;
router.get('/getGoodsList', getGoodsList);
// 获取店铺商品列表;
router.get('/getShopGoodsList', verifyToken, getShopGoodsList);
// 实时搜索商品;
router.get('/searchGoods', searchGoods);

module.exports = router;
