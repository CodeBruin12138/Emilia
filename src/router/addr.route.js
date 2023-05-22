/**
 * 地址相关路由;
 */
// 控制器;
const {
  addAddress,
  getAddressList,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} = require('../controller/addr.controller');
//中间件;
const {
  verifyToken,
  validateParams,
} = require('../middleware/auth.middleware');
// 错误类型;
const { addrParamsValidateFail } = require('../constant/error/addr.error.type');

// 路由;
const Router = require('@koa/router');
// 实例化路由并配置前缀;
const router = new Router({ prefix: '/address' });
// 添加地址;
router.post(
  '/addAddress',
  // 验证token;
  verifyToken,
  // 验证参数;
  validateParams(
    {
      //用户名;
      name: { type: 'string', required: true },
      //手机号;
      phone: { type: 'string', required: true },
      //省份;
      province: { type: 'string', required: true },
      //城市;
      city: { type: 'string', required: true },
      //区域;
      area: { type: 'string', required: true },
      //详细地址;
      addressDetail: { type: 'string', required: true },
    },
    addrParamsValidateFail
  ),
  // 添加地址;
  addAddress
);
//获取地址列表;
router.get('/getAddressList', verifyToken, getAddressList);
//修改地址;
router.put(
  '/updateAddress/:id',
  verifyToken, // 验证参数;
  validateParams(
    {
      //用户名;
      name: { type: 'string', required: true },
      //手机号;
      phone: { type: 'string', required: true },
      //省份;
      province: { type: 'string', required: true },
      //城市;
      city: { type: 'string', required: true },
      //区域;
      area: { type: 'string', required: true },
      //详细地址;
      addressDetail: { type: 'string', required: true },
    },
    addrParamsValidateFail
  ),
  updateAddress
);
//删除地址;
router.delete('/deleteAddress/:id', verifyToken, deleteAddress);
//设置默认地址;
router.patch('/setDefaultAddress/:id', verifyToken, setDefaultAddress);

module.exports = router;
