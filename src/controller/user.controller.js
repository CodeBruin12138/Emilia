// 用户相关控制器;
const { userRegister } = require("../service/user.service");
class UserController {
    async userRegister(ctx, next) {
      try {
          // 设置默认数据及获取用户请求数据;
        // 获取当前时间戳;
        const user_name=new Date().getTime();
        const user_password=ctx.request.body.user_password
        // 调用service层;
        const result=await userRegister({user_name,user_password});
        // 返回数据;
        ctx.body={
            code:0,
            message:'注册成功',
            data:{
                user_name:result.user_name,
                user_admin:result.user_admin,
                user_shop:result.user_shop
            }
        }
      } catch (error) {
        
      }
    };
};
module.exports = new UserController();
