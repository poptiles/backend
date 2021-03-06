'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sendgifts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      from_email: {
        type: Sequelize.STRING
      },
      to_email: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.FLOAT
      },
      tiles: {
        type: Sequelize.INTEGER
      },
      pid: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('sendgifts');
  }
};