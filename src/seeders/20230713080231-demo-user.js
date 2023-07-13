'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    //   await queryInterface.bulkInsert('Users', [
    //     {
    //       username: 'harleysky',
    //       email: "harley@gmail.com",
    //       phone : "081344216472",
    //       password : "harley12345",
    //       createdAt: "2023-01-27 07:52:27",
    //       updatedAt: "2023-01-27 07:52:27"
    //   },
    //   {
    //     username: 'luffy',
    //     email: "luffy@gmail.com",
    //     phone : "081124216472",
    //     password : "luffy12345",
    //     createdAt: "2023-01-27 07:52:27",
    //     updatedAt: "2023-01-27 07:52:27"
    // }

    // ], {})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
