'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Blogs", [
      {
        title : "Saham",
        content : "Apakah bitcoin akan menjadi mata uang untuk kepentingan transaksi di pasar modern",
        createdAt: "2023-01-27 07:52:27",
        updatedAt: "2023-01-27 07:52:27",
        userId : 25,
        categoryId : 4, 
        countryId : 3
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Blogs", null, {})
  }
};
