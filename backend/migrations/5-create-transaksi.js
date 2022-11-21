'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transaksi', {
      id_transaksi: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      id_member: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'member',
          key: 'id_member'
        }
      },
      id_petugas: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'petugas',
          key: 'id_petugas'
        }
      },
      id_outlet: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'outlet',
          key: 'id_outlet'
        }
      },
      tgl_transaksi: {
        type: Sequelize.DATE
      },
      tgl_batas: {
        type: Sequelize.DATE
      },
      tgl_bayar: {
        type: Sequelize.DATE
      },
      status_pembayaran: {
        type: Sequelize.STRING
      },
      status_pengerjaan: {
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
    await queryInterface.dropTable('transaksi');
  }
};