'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OwnedBook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      OwnedBook.belongsTo(models.Book, { foreignKey: 'BookId' });
      OwnedBook.belongsTo(models.User, { foreignKey: 'UserId' });
    }
  }
  OwnedBook.init({
    BookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Book ID is required'
        },
        notNull: {
          msg: 'Book ID is required'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'User ID is required'
        },
        notNull: {
          msg: 'User ID is required'
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Unread',
    }
  }, {
    sequelize,
    modelName: 'OwnedBook',
  });
  return OwnedBook;
};