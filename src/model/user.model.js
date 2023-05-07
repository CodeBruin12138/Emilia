// 用户数据库模型;
const{ DataTypes } = require('sequelize');
const seq = require('../db/seq');
// 用户模型数据;
const UserModel = seq.define('user', {
    // 用户名;
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '用户名'
    },
    // 用户昵称;
    user_title: {
        type: DataTypes.STRING,
        allowNull: false,

        comment: '用户昵称'
    },
    // 用户密码;
    user_password: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '用户密码'
    },
    // 用户头像;
    user_avatar: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '用户头像'
    },
    // 用户性别;
}
    )