'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.belongsTo(models.CategoryHeader, { foreignKey: 'CategoryHeaderId' });
      Category.hasMany(models.Book, { foreignKey: 'CategoryId' });
    }
  }
  Category.init({
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
    CategoryHeaderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'CategoryHeaderId is required'
        },
        notNull: {
          msg: 'CategoryHeaderId is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};