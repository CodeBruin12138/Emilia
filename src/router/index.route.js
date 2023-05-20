/**
 * 默认路由;
 */
const Router = require('@koa/router');
// 实例化路由并配置前缀;
const router = new Router({ prefix: '/' });
// 用户注册;
router.get('/', async (ctx, next) => {
  ctx.body = 'Hello World!';
});
module.exports = router;
