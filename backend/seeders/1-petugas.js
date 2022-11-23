'use strict';

const md5 = require('md5');

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

     await queryInterface.bulkInsert('petugas', [{
      username: 'admin',
      password: md5('admin'),
      nama_petugas: 'admin_naufal',
      level: 'admin',
    }], {});

     await queryInterface.bulkInsert('petugas', [{
      username: 'kasir',
      password: md5('kasir'),
      nama_petugas: 'kasir_akbar',
      level: 'kasir',
    }], {});

     await queryInterface.bulkInsert('petugas', [{
      username: 'pemilik',
      password: md5('pemilik'),
      nama_petugas: 'pemilik_nugroho',
      level: 'pemilik',
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

      await queryInterface.bulkDelete('petugas', null, {});
  }
};
