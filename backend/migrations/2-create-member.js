'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('member', {
      id_member: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      nama_member: {
        type: Sequelize.STRING
      },
      alamat: {
        type: Sequelize.STRING
      },
      jenis_kelamin: {
        type: Sequelize.STRING
      },
      no_telp: {
        type: Sequelize.STRING
      },
      password: {
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
    await queryInterface.dropTable('member');
  }
};