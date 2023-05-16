//统一错误处理;
module.exports = (error, ctx) => {
  let status = 500;
  switch (error.code) {
    // case 10001:
    // status = 400;
    // break;
    // case 10002:
    // status = 400;
    // break;
    default:
      // 默认错误;
      status = 500;
  }
  //返回错误信息;
  ctx.status = status;
  ctx.body = error;
};
