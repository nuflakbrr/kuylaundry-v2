'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('paket', {
      id_paket: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      nama_paket: {
        type: Sequelize.STRING
      },
      harga: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('paket');
  }
};