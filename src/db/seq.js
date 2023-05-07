// 数据库连接设置;
const{ Sequelize }=require('sequelize');
// 环境变量;
const{MYSQL_HOST,MYSQL_USER,MYSQL_PASSWORD,MYSQL_DATABASE}=require('../config/config.default');
// 连接数据库;
const seq=new Sequelize(MYSQL_DATABASE,MYSQL_USER, MYSQL_PASSWORD,{
    host:MYSQL_HOST,
    dialect:'mysql'
});
// 测试连接;
// seq.authenticate().then(()=>{
//     console.log('数据库连接成功');
// }).catch(()=>{
//     console.log('数据库连接失败');
// });
// 导出;
module.exports=seq;