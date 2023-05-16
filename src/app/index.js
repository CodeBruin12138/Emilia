const Koa = require('koa');
const { koaBody } = require('koa-body');
const userRouter = require('../router/user.route');
const errorHandler = require('./errorHandler');
// 实例化;
const app = new Koa();
// 挂载;
app.use(koaBody());
// 挂载路由;
app.use(userRouter.routes());
// 统一错误处理;
app.on('error', errorHandler);
module.exports = app;
