const app=require('./app/index');
const{APP_PORT}=require('./config/config.default');
app.listen(APP_PORT,()=>{
    console.log('Emilia启动成功,欢迎您的访问!');
});
