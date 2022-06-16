'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order_Price extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order_Price.init({
    frame_3_5: DataTypes.INTEGER,
    frame_6plus: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'order_price',
  });
  return Order_Price;
};