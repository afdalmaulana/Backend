'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Blog, { foreignKey : "userId" })
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    isVerified: {
      defaultValue : false,
      type: DataTypes.BOOLEAN
    },
    img: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};