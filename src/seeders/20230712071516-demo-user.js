'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        firstName: "John",
        lastName: "Doe",
        email: "john@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: "Dana",
        lastName: "John",
        email : "dana@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users", null, {})
  }
};
