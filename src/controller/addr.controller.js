//地址相关控制器;
//数据库操作;
const {
  addAddressService,
  getAddressListService,
  updateAddressService,
  deleteAddressService,
  setDefaultAddressService,
} = require('../service/addr.service');
// 错误类型;
const {
  addAddressFail,
  getAddressListFail,
  updateAddressFail,
  deleteAddressFail,
  setDefaultAddressFail,
} = require('../constant/error/addr.error.type');

class AddressController {
  //添加地址;
  async addAddress(ctx, next) {
    try {
      // 获取用户请求参数;
      const user_id = ctx.state.user.id;
      const { name, phone, province, city, area, addressDetail } =
        ctx.request.body;
      // 添加地址;
      const result = await addAddressService({
        user_id,
        name,
        phone,
        province,
        city,
        area,
        addressDetail,
      });
      // 返回结果;
      ctx.body = {
        code: 0,
        message: '添加地址成功',
        result,
      };
    } catch (error) {
      console.error('添加地址失败', error);
      ctx.app.emit('error', addAddressFail, ctx);
      return;
    }
  }
  //获取地址列表;
  async getAddressList(ctx, next) {
    try {
      // 获取用户id;
      const user_id = ctx.state.user.id;
      // 操作数据库;
      const result = await getAddressListService(user_id);
      // 返回结果;
      ctx.body = {
        code: 0,
        message: '获取地址列表成功',
        result,
      };
    } catch (error) {
      console.error('获取地址列表失败', error);
      ctx.app.emit('error', getAddressListFail, ctx);
      return;
    }
  }
  //修改地址;
  async updateAddress(ctx, next) {
    try {
      // 获取地址id;
      const { id } = ctx.params;
      // 获取用户请求参数;
      const { name, phone, province, city, area, addressDetail } =
        ctx.request.body;
      // 操作数据库;
      const result = await updateAddressService({
        id,
        name,
        phone,
        province,
        city,
        area,
        addressDetail,
      });
      // 返回结果;
      ctx.body = {
        code: 0,
        message: '修改地址成功',
        result,
      };
    } catch (error) {
      console.error('修改地址失败', error);
      ctx.app.emit('error', updateAddressFail, ctx);
      return;
    }
  }
  //删除地址;
  async deleteAddress(ctx, next) {
    try {
      // 获取地址id;
      const { id } = ctx.params;
      // 操作数据库;
      const result = await deleteAddressService(id);
      // 返回结果;
      ctx.body = {
        code: 0,
        message: '删除地址成功',
        result,
      };
    } catch (error) {
      console.error('删除地址失败', error);
      ctx.app.emit('error', deleteAddressFail, ctx);
      return;
    }
  }
  //设置默认地址;
  async setDefaultAddress(ctx, next) {
    try {
      // 获取地址id;
      const { id } = ctx.params;
      //获取用户id;
      const user_id = ctx.state.user.id;

      // 操作数据库;
      const result = await setDefaultAddressService(id, user_id);
      // 返回结果;
      ctx.body = {
        code: 0,
        message: '设置默认地址成功',
        result,
      };
    } catch (error) {
      console.error('设置默认地址失败', error);
      ctx.app.emit('error', setDefaultAddressFail, ctx);
      return;
    }
  }
}

module.exports = new AddressController();
