'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('giftprices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tile3: {
        type: Sequelize.INTEGER
      },
      tile6: {
        type: Sequelize.INTEGER
      },
      tile8: {
        type: Sequelize.INTEGER
      },
      tile12: {
        type: Sequelize.INTEGER
      },
      tile16: {
        type: Sequelize.INTEGER
      },
      tile20: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('giftprices');
  }
};