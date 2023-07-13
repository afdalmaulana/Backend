'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Blogs", [
      {
        title : "Tesla",
        content : "Tesla adalah perusahaan milik Elon Musk yang bergerak dibidang teknologi yang memiliki produksi seperti Mobil dan akuisisi Twitter",
        createdAt: "2023-01-27 07:52:27",
        updatedAt: "2023-01-27 07:52:27",
        userId : 1,
        categoryId : 2, 
        countryId : 1
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Blogs", null, {})
  }
};
