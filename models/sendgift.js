'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SendGift extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SendGift.init({
    from_email: DataTypes.STRING,
    to_email: DataTypes.STRING,
    phone: DataTypes.STRING,
    price: DataTypes.FLOAT,
    tiles: DataTypes.INTEGER,
    pid: DataTypes.STRING,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'sendgifts',
  });
  return SendGift;
};