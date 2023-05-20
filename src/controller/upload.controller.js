// 文件上传相关控制器;
class UploadController {
  //商品图片上传;
  async goodsImgUpload(ctx, next) {
    ctx.body = '商品图片上传';
  }
}
module.exports = new UploadController();
