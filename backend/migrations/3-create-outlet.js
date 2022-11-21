'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('outlet', {
      id_outlet: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      nama_outlet: {
        type: Sequelize.STRING
      },
      alamat: {
        type: Sequelize.STRING
      },
      no_telp: {
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
    await queryInterface.dropTable('outlet');
  }
};