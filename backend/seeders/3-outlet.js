'use strict';

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

    await queryInterface.bulkInsert('outlet', [{
      nama_outlet: 'Sumber Makmur',
      alamat: 'Malang',
      no_telp: '08123456789',
    }], {});

    await queryInterface.bulkInsert('outlet', [{
      nama_outlet: 'Cahaya Makmur',
      alamat: 'Surabaya',
      no_telp: '08123456789',
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('outlet', null, {});
  }
};
