const axios = require("axios")
const { Category, CategoryHeader, User, Book, OwnedBook } = require("../models");
const { verifyToken, signToken } = require("../helpers/jwt");
class Controller {
    static async getBook(req, res, next) {
        try {
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
                    const output = await Promise.all(response.data.works.map(async (el) => {
                      const synopsis = await axios({
                        method: "GET",
                        url: `https://openlibrary.org${el.key}.json`
                      })
                      const availableSynopsis = synopsis.data.description.value !== undefined ? synopsis.data.description.value : synopsis.data.description
                      return {
                        name: el.title,
                        synopsis: availableSynopsis,
                        cover: el.lending_edition
                          ? `https://covers.openlibrary.org/b/id/${el.lending_edition}-L.jpg`
                          : `https://covers.openlibrary.org/b/id/${el.cover_edition_key}-L.jpg`,
                        CategoryHeaderId: category.CategoryHeaderId,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                      };
                    }));
                    // console.log(output)
                    return output
                  }))   

                  res.status(200).json(categories)         
        } catch (error) {
            console.log(error)
        }
    }

    static async getCategoryHeaders(req, res, next) {
        try {
            let categoryWHeaders = await CategoryHeader.findAll({
                include: {
                    model: Category,
                    attributes: ["id", "name"],
                },
                order: [["id", "ASC"]],
            });
            res.status(200).json(categoryWHeaders)
        } catch (error) {
            console.log(error)
        }
    }

    static async getcategory(req, res, next) {
        try {
            let categories = await Category.findAll({
                include: {
                    model: Book,
                    attributes: ["id", "name", "synopsis", "cover"],
                },
                order: [["id", "ASC"]],
            });
            res.status(200).json(categories)
        } catch (error) {
            console.log(error)
        }
    }

    static async postLogin(req, res, next) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({
                where: {
                    email,
                },
            })
            if (!user) {
                throw { name: "InvalidEmail" }
            } else {
                const isValid = user.password === password
                if (!isValid) {
                    throw { name: "InvalidPassword" }
                } else {
                    const access_token = user.generateToken()
                    res.status(200).json({ access_token })
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = Controller