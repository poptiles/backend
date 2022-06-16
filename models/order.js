'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init({
    order_no: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    order_date: DataTypes.DATE,
    dob: DataTypes.DATE,
    gender: DataTypes.STRING,
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    frames: DataTypes.INTEGER,
    address: DataTypes.STRING,
    frame_type: DataTypes.STRING,
    order_status: DataTypes.STRING,
    shipping_date: DataTypes.DATE,
    shipping_company: DataTypes.STRING,
    tracking_id: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    user_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'order',
  });
  return Order;
};