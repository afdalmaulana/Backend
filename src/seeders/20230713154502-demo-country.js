'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // await queryInterface.bulkInsert("Countries", [
    //   {
    //     country_name : "Germany",
    //     createdAt: "2023-01-27 07:52:27",
    //     updatedAt: "2023-01-27 07:52:27"
    //   },
    //   {
    //     country_name : "Australia",
    //     createdAt: "2023-01-27 07:52:27",
    //     updatedAt: "2023-01-27 07:52:27"
    //   },{
    //     country_name : "France",
    //     createdAt: "2023-01-27 07:52:27",
    //     updatedAt: "2023-01-27 07:52:27"
    //   }
    // ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Countries", null, {})
  }
};
