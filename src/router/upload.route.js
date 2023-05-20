/**
 * 文件上传相关路由;
 */
const Router = require('@koa/router');
//控制器;
const { goodsImgUpload } = require('../controller/upload.controller');
//中间件;
const {
  verifyToken,
  verifySuperShopAdmin,
} = require('../middleware/auth.middleware');
const {
  checkUserUploadFileSizeAndType,
} = require('../middleware/upload.middleware');
// 实例化路由并配置前缀;
const router = new Router({ prefix: '/upload' });
// 商品图片上传;
router.post(
  '/goodsImgUpload',
  //验证用户token;
  verifyToken,
  //限制用户上传文件的大小及文件类型;
  checkUserUploadFileSizeAndType,
  //超级店铺管理员权限验证;
  verifySuperShopAdmin,
  //商品图片上传;
  goodsImgUpload
);

module.exports = router;
