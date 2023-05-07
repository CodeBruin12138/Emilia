// 用户相关控制器;
const { userRegister } = require("../service/user.service");
class UserController {
    async userRegister(ctx, next) {
        // 设置默认数据及获取用户请求数据;
        // 获取当前时间戳;
        const name=new Date().getTime();
        const user_name=name;
        const user_title=`ly${user_name}`;
        const user_password=ctx.request.body.user_password
        const user={user_name,user_title,user_password};
        // 调用service层;
        const result=await userRegister(user);
        // 返回数据;
        ctx.body=result;
    };
};
module.exports = new UserController();
