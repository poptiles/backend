'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GiftPrices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  GiftPrices.init({
    tile3: DataTypes.INTEGER,
    tile6: DataTypes.INTEGER,
    tile8: DataTypes.INTEGER,
    tile12: DataTypes.INTEGER,
    tile16: DataTypes.INTEGER,
    tile20: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'giftprices',
  });
  return GiftPrices;
};