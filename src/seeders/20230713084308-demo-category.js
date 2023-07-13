'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // await queryInterface.bulkInsert("Categories", [
    //   {
    //     category_name : "Fiksi",
    //     createdAt: "2023-01-27 07:52:27",
    //     updatedAt: "2023-01-27 07:52:27"
    //   },
    //   {
    //     category_name : "Teknologi",
    //     createdAt: "2023-01-27 07:52:27",
    //     updatedAt: "2023-01-27 07:52:27"
    //   },
    //   {
    //     category_name : "Internasional",
    //     createdAt: "2023-01-27 07:52:27",
    //     updatedAt: "2023-01-27 07:52:27"
    //   },
    //   {
    //     category_name : "Ekonomi",
    //     createdAt: "2023-01-27 07:52:27",
    //     updatedAt: "2023-01-27 07:52:27"
    //   }
    // ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Categories", null, {})
  }
};
