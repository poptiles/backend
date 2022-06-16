'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coupon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Coupon.init({
    coupon_code: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    discount: DataTypes.FLOAT,
    type: DataTypes.STRING,
    status: DataTypes.STRING,
    usage: DataTypes.INTEGER,
    used: DataTypes.INTEGER,
    frames_valid: DataTypes.INTEGER,
    expiry_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'coupon',
  });
  return Coupon;
};