//地址相关的数据库操作;

// 引入模型;
const AddressModel = require('../model/addr.model');
// 错误类型;
const {
  addAddressFail,
  getAddressListFail,
  updateAddressFail,
  deleteAddressFail,
  setDefaultAddressFail,
} = require('../constant/error/addr.error.type');

class AddressService {
  // 添加地址;
  async addAddressService({
    user_id,
    name,
    phone,
    province,
    city,
    area,
    addressDetail,
  }) {
    try {
      // 操作数据库;
      const result = await AddressModel.create({
        user_id,
        name,
        phone,
        province,
        city,
        area,
        addressDetail,
      });
      return result;
    } catch (error) {
      console.error('添加地址失败', error);
      ctx.app.emit('error', addAddressFail, ctx);
      return;
    }
  }
  // 获取地址列表;
  async getAddressListService(user_id) {
    try {
      return await AddressModel.findAll({
        where: {
          user_id,
        },
        attributes: [
          'id',
          'name',
          'phone',
          'province',
          'city',
          'area',
          'addressDetail',
          'isDefault',
        ],
      });
    } catch (error) {
      console.error('获取地址列表失败', error);
      ctx.app.emit('error', getAddressListFail, ctx);
      return;
    }
  }
  // 修改地址;
  async updateAddressService({
    id,
    name,
    phone,
    province,
    city,
    area,
    addressDetail,
  }) {
    try {
      // 操作数据库;
      const result = await AddressModel.update(
        {
          name,
          phone,
          province,
          city,
          area,
          addressDetail,
        },
        {
          where: {
            id,
          },
        }
      );
      return result;
    } catch (error) {
      console.error('修改地址失败', error);
      ctx.app.emit('error', updateAddressFail, ctx);
      return;
    }
  }
  //删除地址;
  async deleteAddressService(id) {
    try {
      // 操作数据库;
      const result = await AddressModel.destroy({
        where: {
          id,
        },
      });
      return result;
    } catch (error) {
      console.error('删除地址失败', error);
      ctx.app.emit('error', deleteAddressFail, ctx);
      return;
    }
  }
  // 设置默认地址;
  async setDefaultAddressService(id, user_id) {
    try {
      //重置默认地址;
      await AddressModel.update(
        {
          isDefault: false,
        },
        {
          where: {
            user_id,
          },
        }
      );
      // 设置默认地址;
      const result = await AddressModel.update(
        {
          isDefault: true,
        },
        {
          where: {
            id,
          },
        }
      );
    } catch (error) {
      console.error('设置默认地址失败', error);
      ctx.app.emit('error', setDefaultAddressFail, ctx);
      return;
    }
  }
}

module.exports = new AddressService();
