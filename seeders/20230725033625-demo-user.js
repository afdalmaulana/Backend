'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", 
    [
      {
        firstName : "Willis",
        lastName : "Doe",
        email : "willis@gmail.com",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        firstName : "John",
        lastName : "Smith",
        email : "john@gmail.com",
        createdAt : new Date(),
        updatedAt : new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
