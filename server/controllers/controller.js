const axios = require("axios");
const bcrypt = require('bcryptjs');
const {
  Category,
  CategoryHeader,
  User,
  Book,
  OwnedBook,
} = require("../models");
const { verifyToken, signToken } = require("../helpers/createToken.js");
class Controller {
  static async getBook(req, res, next) {
    try {
      //

      res.status(200).json(categories);
    } catch (error) {
      next(error);
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
      res.status(200).json(categoryWHeaders);
    } catch (error) {
      next(error);
    }
  }

  static async getcategory(req, res, next) {
    try {
      let categories = await Category.findAll({
        order: [["id", "ASC"]],
      });
      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }

  static async getCategoryById(req, res, next){
    try {
        const { id } = req.params;
        const category = await Category.findByPk(id, {
            include: {
                model: Book,
                attributes: ["id", "name", "synopsis", "cover"],
            },
        });
        if (!category) {
            throw {
                name: "NotFound",
                message: "Category not found",
            };
        }
        res.status(200).json(category);
    } catch (error) {
        next(error)
    }
  }

  static async postLogin(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        throw {
          name: "BadRequest",
          message: "Email and password are required",
        };

      const user = await User.findOne({
        where: {
          email,
        },
      });
      if(!user) throw { name: "Unauthorized", message: "Invalid email/password" };
      const isValid = bcrypt.compareSync(password, user.password);
      if (!isValid) throw { name: "Unauthorized", message: "Invalid email/password" };
      const access_token = signToken({id: user.id});

      return res.status(200).json(access_token);
    } catch (error) {
      next(error);
    }
  }

    static async postRegister(req, res, next) {
        try {
        const { email, password, username } = req.body;
        if (!email || !password)
            throw {
            name: "BadRequest",
            message: "Email and password are required",
            };
    
        const user = await User.create({
            email,
            password,
            username
        });

        const data = await User.findOne({
            where: {
                email
            },
            attributes: 
                ["email", "username"]
            });
        
        return res.status(201).json(data);
        } catch (error) {
            console.log(error)
        next(error);
        }
    }

    static async getBookById(req, res, next) {
        try {
            const { id } = req.params;
            const book = await Book.findByPk(id, {
                include: {
                    model: Category,
                    attributes: ["id", "name"],
                },
            });
            if (!book) {
                throw {
                    name: "NotFound",
                    message: "Book not found",
                };
            }
            res.status(200).json(book);
        } catch (error) {
            next(error);
        }
    }

    static async postOwnedBook(req, res, next) {
        try {
            const { id } = req.params;
            const { UserId } = req.body;
            const ownedBook = await OwnedBook.create({
                BookId: id,
                UserId,
            });
            res.status(201).json(ownedBook);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = Controller;
