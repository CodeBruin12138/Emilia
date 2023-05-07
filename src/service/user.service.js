//用户相关的数据库操作;
class UserService{
    async userRegister(user){
        return '注册成功';
    }
}
module.exports=new UserService();