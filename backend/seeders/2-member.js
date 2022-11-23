'use strict';

const md5 = require("md5");

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

    await queryInterface.bulkInsert('member', [{
      nama_member: 'Ahmad Kusni',
      alamat: 'Malang',
      jenis_kelamin: 'L',
      no_telp: '08123456789',
      password: md5('inikusni'),
    }], {});

    await queryInterface.bulkInsert('member', [{
      nama_member: 'Sri Rahayu',
      alamat: 'Surabaya',
      jenis_kelamin: 'P',
      no_telp: '08123456789',
      password: md5('inirahayu'),
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('member', null, {});
  }
};
