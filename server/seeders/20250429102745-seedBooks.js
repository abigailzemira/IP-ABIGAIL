"use strict";

const { default: axios } = require("axios");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    let categories = require("../data/categories.json");

    categories = await Promise.all(
      categories.map(async (category) => {
        category.name.length > 1
          ? category.name.split(" ").join("_").toLowerCase()
          : category.name.toLowerCase();
        const response = await axios({
          method: "GET",
          url: `https://openlibrary.org/subjects/${category.name}.json`,
        });
        const output = await Promise.all(
          response.data.works.map(async (el) => {
            const synopsis = await axios({
              method: "GET",
              url: `https://openlibrary.org${el.key}.json`,
            });
            //   console.log(synopsis.data)
            const availableSynopsis =
              synopsis.data.description.value !== undefined
                ? synopsis.data.description.value
                : synopsis.data.description
            return {
              name: el.title,
              synopsis: availableSynopsis ? availableSynopsis : "No synopsis available",
              cover: el.lending_edition
                ? `https://covers.openlibrary.org/b/id/${el.lending_edition}-L.jpg`
                : `https://covers.openlibrary.org/b/id/${el.cover_edition_key}-L.jpg`,
              CategoryHeaderId: category.CategoryHeaderId,
              createdAt: new Date(),
              updatedAt: new Date(),
            };
          })
        );
        console.log(output);
        return output;
      })
    );

    await queryInterface.bulkInsert("Books", categories);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Books", null, {});
  },
};
