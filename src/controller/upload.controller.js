// 文件上传相关控制器;
class UploadController {
  //商品图片上传;
  async goodsImgUpload(ctx, next) {
    ctx.body = {
      code: 0,
      message: '商品图片上传成功',
      result: {
        img_url: ctx.request.files.file.newFilename,
      },
    };
  }
}
module.exports = new UploadController();
