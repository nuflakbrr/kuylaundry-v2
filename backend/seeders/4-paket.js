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

    await queryInterface.bulkInsert('paket', [{
      nama_paket: 'kiloan',
      harga: '5000',
    }], {});

    await queryInterface.bulkInsert('paket', [{
      nama_paket: 'selimut',
      harga: '10000',
    }], {});

    await queryInterface.bulkInsert('paket', [{
      nama_paket: 'bed cover',
      harga: '10000',
    }], {});

    await queryInterface.bulkInsert('paket', [{
      nama_paket: 'kaos',
      harga: '5000',
    }], {});

    await queryInterface.bulkInsert('paket', [{
      nama_paket: 'sepatu',
      harga: '25000',
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('paket', null, {});
  }
};
