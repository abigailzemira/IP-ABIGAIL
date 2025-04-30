'use strict';
const bcrypt = require('bcryptjs')

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

   let categoryHeaderData = require('../data/categoryHeaders.json')
   categoryHeaderData = categoryHeaderData.map((categoryHeader) => {
     delete categoryHeader.id
     categoryHeader.createdAt = categoryHeader.updatedAt = new Date();
     return categoryHeader
   })
    let userData = {email: "wartortle@gmail.com", password: "user numero uno", username: "war_tortle"}
    let salt = bcrypt.genSaltSync(10)
    userData.password = bcrypt.hashSync(userData.password, salt)
    
    let categoryData = require('../data/categories.json')
    categoryData = categoryData.map(({id ,...category}) => {
      category.createdAt = category.updatedAt = new Date();
      return category
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
