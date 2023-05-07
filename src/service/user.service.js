//用户相关的数据库操作;
const UserModel=require('../model/user.model');
class UserService{
    // 用户注册;
    async userRegister({user_name,user_password}){
     try {
           // 创建用户;
           const result=await UserModel.create({user_name,user_password});
           // 返回数据;
           return result.dataValues;
     } catch (error) {
        console.log(error);
        
     }
    }
}
module.exports=new UserService();