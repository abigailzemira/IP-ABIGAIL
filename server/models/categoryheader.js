'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CategoryHeader extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CategoryHeader.hasMany(models.Category, { foreignKey: 'CategoryHeaderId' });
    }
  }
  CategoryHeader.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: {
          msg: "Name is required"
        }
      }
    },
    imageUrl: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'CategoryHeader',
  });
  return CategoryHeader;
};