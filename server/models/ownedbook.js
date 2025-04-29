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
          msg: 'BookId cannot be empty'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'UserId cannot be empty'
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Status cannot be empty'
        }
      }
    },
    progress: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Progress cannot be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'OwnedBook',
  });
  return OwnedBook;
};