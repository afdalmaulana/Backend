'use strict';
// untuk menjalankan menggunakan npx sequelize-cli db:migrate

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Branches', {
      id : {
        allowNull : false,
        autoIncrement : true,
        primaryKey : true,
        type : Sequelize.INTEGER
      },
        branchName : {
          type : Sequelize.STRING
      },
       address : {
         type : Sequelize.STRING
       }
    })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
