const Koa=require('koa');
const { koaBody }=require('koa-body');
const userRouter=require('../router/user.route');
const app=new Koa();
// 挂载;
app.use(koaBody());
// 挂载路由;
app.use(userRouter.routes());
module.exports=app;