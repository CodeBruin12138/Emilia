/*
 Navicat MySQL Data Transfer

 Source Server         : lingyun
 Source Server Type    : MySQL
 Source Server Version : 80033 (8.0.33)
 Source Host           : localhost:3306
 Source Schema         : emilia

 Target Server Type    : MySQL
 Target Server Version : 80033 (8.0.33)
 File Encoding         : 65001

 Date: 23/05/2023 07:30:48
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for emilia_addresses
-- ----------------------------
DROP TABLE IF EXISTS `emilia_addresses`;
CREATE TABLE `emilia_addresses`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL COMMENT '用户id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户名',
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '手机号',
  `province` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '省份',
  `city` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '城市',
  `area` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '区域',
  `addressDetail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '详细地址',
  `isDefault` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否默认',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for emilia_carts
-- ----------------------------
DROP TABLE IF EXISTS `emilia_carts`;
CREATE TABLE `emilia_carts`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `goods_id` int NOT NULL COMMENT '商品id',
  `user_id` int NOT NULL COMMENT '用户id',
  `goods_num` int NOT NULL DEFAULT 1 COMMENT '商品数量',
  `goods_checked` tinyint(1) NOT NULL DEFAULT 1 COMMENT '商品是否选中',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `goods_id`(`goods_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for emilia_goods
-- ----------------------------
DROP TABLE IF EXISTS `emilia_goods`;
CREATE TABLE `emilia_goods`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `goods_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '商品名',
  `goods_price` decimal(10, 2) NOT NULL COMMENT '商品价格',
  `goods_stock` int NOT NULL COMMENT '商品库存',
  `goods_img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '商品图片',
  `shop_id` int NOT NULL COMMENT '商品所属店铺',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for emilia_orders
-- ----------------------------
DROP TABLE IF EXISTS `emilia_orders`;
CREATE TABLE `emilia_orders`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL COMMENT '用户id',
  `addr_id` int NOT NULL COMMENT '地址id',
  `order_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '订单编号',
  `total_price` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '订单总价',
  `goods_info` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '商品信息',
  `order_status` int NOT NULL DEFAULT 0 COMMENT '订单状态,0:未支付,1:已支付,2:已发货,3:已签收,4:已取消',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `order_number`(`order_number` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for emilia_users
-- ----------------------------
DROP TABLE IF EXISTS `emilia_users`;
CREATE TABLE `emilia_users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户名',
  `user_password` char(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户密码',
  `user_admin` int NULL DEFAULT 0 COMMENT '是否为管理员,使用权重进行判断,如果为0就不是管理员或账号下没有可管理的店铺,如果为1就是店铺管理员,仅有小部分权限,如果为3则是店铺超级管理员,有更多权限,如果是店长就是5,同时也要根据账号下的店铺id进行综合判断;',
  `user_shop` int NULL DEFAULT 0 COMMENT '用户店铺号',
  `user_data` int NOT NULL DEFAULT 0 COMMENT '用户数据',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `user_name`(`user_name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
