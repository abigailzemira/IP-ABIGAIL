const axios = require("axios");
const bcrypt = require('bcryptjs');
const {OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client();
const {
  Category,
  CategoryHeader,
  User,
  Book,
  OwnedBook,
} = require("../models");
const { verifyToken, signToken } = require("../helpers/createToken.js");
const { generateBookRecommendations } = require("../helpers/genai.js");
class Controller {
  static async getCategoryHeaders(req, res, next) {
    try {
      let categoryWHeaders = await CategoryHeader.findAll({
        include: {
          model: Category,
          attributes: ["id", "name"],
        },
        order: [["id", "ASC"]],
      });
      // console.log(categoryWHeaders, "<<<<<<< categoryWHeaders")
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
        console.log(category, "<<<<<<< category")
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
      return res.status(200).json({ access_token });
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

    static async googleLogin(req, res, next) {
      try {
        const { googleToken } = req.body
        if (!googleToken) throw { name: "BadRequest", message: "Google Token is required" }
  
        const ticket = await client.verifyIdToken({
          idToken: googleToken,
          audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload()
  
        const [user] = await User.findOrCreate({
          where: { email: payload.email },
          defaults: {
            password: "12345678",
            username: payload.name,
          }
        })
        // kalo udah -> generate token
  
        const access_token = signToken({ id: user.id })
        res.status(200).json({ access_token })
      } catch (err) {
        next(err);
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
            console.log(error)
            next(error);
        }
    }

    static async postOwnedBook(req, res, next) {
        try {
          console.log(req.user)
            const { bookId } = req.params;
            const book = await Book.findByPk(bookId);
            if (!book) throw { name: "NotFound", message: "Book not found" };
            const ownedBook = await OwnedBook.create({
                BookId: bookId,
                UserId: req.user.id,
            });
            res.status(201).json(ownedBook);
        } catch (error) {
            console.log(error, "<<<<<<< error di controller")
            next(error);
        }
    }

    static async updateOwnedBook(req, res, next) {  
        try {
            const { id } = req.params;
            const { status } = req.body;
            if (!status) throw { name: "BadRequest", message: "Status is required" };
            await OwnedBook.update(
              {status},
              {
                where: {
                  id,
                }
              }
            )

            const ownedBook = await OwnedBook.findByPk(id);
            if(!ownedBook) throw { name: "NotFound", message: "Owned book not found" };
            res.status(200).json(ownedBook);
        } catch (error) {
            console.log(error)
            next(error);
        }
    } 

    static async getOwnedBooks(req, res, next) {
        try {
            const ownedBooks = await OwnedBook.findAll({
                where: {
                    UserId: req.user.id
                },
                include: {
                    model: Book,
                    attributes: ["id", "name", "synopsis", "cover"],
                },
            });
            res.status(200).json(ownedBooks);
        } catch (error) {
            console.log(error)
            next(error);
        }
    }

    static async deleteOwnedBook(req, res, next) {
        try {
            const { id } = req.params;
            const ownedBook = await OwnedBook.findByPk(id);
            if (!ownedBook) throw { name: "NotFound", message: "Owned book not found" };
            await OwnedBook.destroy({
                where: {
                    id,
                }
            })
            res.status(200).json({message: "Book removed successfully"});
        } catch (error) {
            console.log(error)
            next(error);
        }
    }

    static async getRecommendations(req, res, next) {
        try {
            const ownedBooks = await OwnedBook.findAll({
                where: {
                    UserId: req.user.id
                },
                include: {
                    model: Book,
                    attributes: ["id", "name", "synopsis", "cover", "CategoryId"],
                    include: {
                        model: Category,
                        attributes: ["id", "name"],
                    },
                },
            });
            if (ownedBooks.length === 0) {
                return res.status(200).json([]);
            }
            const recommendations = await generateBookRecommendations(ownedBooks);
            res.status(200).json(recommendations);
        } catch (error) {
            console.log(error)
            next(error);
        }
    }
}

module.exports = Controller;
