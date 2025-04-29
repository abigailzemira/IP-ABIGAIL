'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Book.belongsTo(models.Category, { foreignKey: 'CategoryId' });
      Book.hasMany(models.OwnedBook, { foreignKey: 'BookId' });
    }
  }
  Book.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Name is required'
        },
        notNull: {
          msg: 'Name is required'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Price is required'
        },
        notNull: {
          msg: 'Price is required'
        }
      }
    },
    synopsis: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Synopsis is required'
        },
        notNull: {
          msg: 'Synopsis is required'
        }
      }

    },
    cover: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Cover is required'
        },
        notNull: {
          msg: 'Cover is required'
        }
      }
    },
    pages: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Pages is required'
        },
        notNull: {
          msg: 'Pages is required'
        } 
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Category ID is required'
        },
        notNull: {
          msg: 'Category ID is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};