/**
 * 用户路由;
 */
const Router=require('@koa/router');
const{userRegister}=require('../controller/user.controller');
// 实例化路由并配置前缀;
const router=new Router({prefix:'/users'});
// 用户注册;
router.post('/userRegister',userRegister);

module.exports=router;