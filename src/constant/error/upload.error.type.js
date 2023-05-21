// 文件上传相关错误类型;
module.exports = {
  // 上传文件大小超出限制;
  uploadFileSizeExceedLimit: {
    code: 30001,
    message: '上传文件大小超出限制',
    result: '',
  },
  // 上传文件类型不符合规范;
  uploadFileTypeError: {
    code: 30002,
    message: '上传文件类型不符合规范',
    result: '',
  },
  // 校验用户上传文件失败;
  uploadFileVerifyFail: {
    code: 30003,
    message: '校验用户上传文件失败',
    result: '',
  },
  //上传文件个数超出限制;
  uploadFileNumberExceedLimit: {
    code: 30004,
    message: '上传文件个数超出限制',
    result: '',
  },
};
