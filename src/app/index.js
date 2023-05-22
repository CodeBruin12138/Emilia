const path = require('path');
const Koa = require('koa');
const { koaBody } = require('koa-body');
const KoaStatic = require('koa-static');
const KoaParameter = require('koa-parameter');
const indexRouter = require('../router/index.route');
const userRouter = require('../router/user.route');
const goodsRouter = require('../router/goods.route');
const uploadRouter = require('../router/upload.route');
const cartRouter = require('../router/cart.route');
const errorHandler = require('./errorHandler');
// 实例化;
const app = new Koa();
// 挂载;
app.use(
  koaBody({
    // 支持文件上传;
    multipart: true,
    // 文件上传配置;
    formidable: {
      // 保留文件扩展名;
      keepExtensions: true,
      // 设置文件上传目录;
      uploadDir: path.join(__dirname, '../upload'),
    },
  })
);
// 静态资源托管;
app.use(KoaStatic(path.join(__dirname, '../upload')));
// 参数校验;
app.use(KoaParameter(app));
// 挂载路由;
app.use(indexRouter.routes());
app.use(userRouter.routes());
app.use(goodsRouter.routes());
app.use(uploadRouter.routes());
app.use(cartRouter.routes());
// 统一错误处理;
app.on('error', errorHandler);
module.exports = app;
