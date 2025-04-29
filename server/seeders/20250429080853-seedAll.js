'use strict';

/** @type {import('sequelize-cli').Migration} */
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

    let userData = {email: "wartortle@gmail.com", password: "user numero uno", username: "war_tortle"}
    let categoryData = require('../data/categories.json')
    categoryData = categoryData.map((category) => {
      category.createdAt = category.updatedAt = new Date();
      return category
    })
    let categoryHeaderData = require('../data/categoryHeaders.json')
    categoryHeaderData = categoryHeaderData.map((categoryHeader) => {
      categoryHeader.createdAt = categoryHeader.updatedAt = new Date();
      return categoryHeader
    })
    userData.createdAt = userData.updatedAt = new Date();

    await queryInterface.bulkInsert('Users', [userData]);
    await queryInterface.bulkInsert('CategoryHeaders', categoryHeaderData);
    await queryInterface.bulkInsert('Categories', categoryData);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('CategoryHeaders', null, {});
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
