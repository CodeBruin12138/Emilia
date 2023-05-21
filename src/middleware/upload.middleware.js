//权限相关中间件;
const fs = require('fs');
const path = require('path');
// 引入错误类型;
const {
  uploadFileSizeExceedLimit,
  uploadFileTypeError,
  uploadFileVerifyFail,
  uploadFileNumberExceedLimit,
} = require('../constant/error/upload.error.type');
// 限制用户上传文件的大小及类型;
const checkUserUploadFileSizeAndType = async (ctx, next) => {
  try {
    // 限制用户只能上传一个文件;
    // 判断用户上传文件个数;
    if (ctx.request.files.file.length > 1) {
      // 如果用户上传文件个数大于1就删除所有文件;
      ctx.request.files.file.forEach((file) => {
        const illegalFileName = file.newFilename;
        fs.unlinkSync(path.join(__dirname, `../upload/${illegalFileName}`));
      });
      console.error('上传文件个数超过1个', ctx.request.files.file);
      ctx.app.emit('error', uploadFileNumberExceedLimit, ctx);
      return;
    }
    // 获取用户上传文件的大小;
    const fileSize = ctx.request.files.file.size;
    console.log(ctx.request.files);
    // 限制图片大小为500kb以下;
    if (fileSize > 512000) {
      // 如果图片过大就删除图片;
      const illegalFileName = ctx.request.files.file.newFilename;
      fs.unlinkSync(path.join(__dirname, `../upload/${illegalFileName}`));
      console.error('图片大小超过500kb', ctx.request.files.file);
      ctx.app.emit('error', uploadFileSizeExceedLimit, ctx);
      return;
    }
    // 获取用户上传文件的类型;
    const fileType = ctx.request.files.file.mimetype;
    // 限制图片类型为png,jpg,jpeg;
    if (
      fileType !== 'image/png' &&
      fileType !== 'image/jpg' &&
      fileType !== 'image/jpeg'
    ) {
      // 如果图片类型不符合要求就删除图片;
      const illegalFileName = ctx.request.files.file.newFilename;
      fs.unlinkSync(path.join(__dirname, `../upload/${illegalFileName}`));
      console.error('上传文件类型不符合规范', ctx.request.files.file);
      ctx.app.emit('error', uploadFileTypeError, ctx);
      return;
    }
    await next();
  } catch (error) {
    console.error('校验用户上传文件失败', error);
    ctx.app.emit('error', uploadFileVerifyFail, ctx);
    return;
  }
};
// 导出;
module.exports = {
  checkUserUploadFileSizeAndType,
};
