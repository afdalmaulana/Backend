'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "userId" })
      this.belongsTo(models.Country, { foreignKey: "countryId" })
      this.belongsTo(models.Category, { foreignKey : "categoryId" })

    }
  }
  Blog.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    keywords : DataTypes.STRING,
    imgBlog : DataTypes.STRING,
    videoUrl : DataTypes.STRING,
    userId : DataTypes.INTEGER,
    categoryId : DataTypes.INTEGER,
    countryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Blog',
  });
  return Blog;
};