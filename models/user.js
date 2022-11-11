'use strict';
const { hashPassword } = require('../helpers/bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile)
      User.hasMany(models.Post)
    }
  }
  User.init({
    email:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'input your email'
        },
        notEmpty: {
          msg: 'input your email'
        }
      }
    },
    password:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'input your password'
        },
        notEmpty: {
          msg: 'input your password'
        }
      }
    },
    role: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((instance, option) => {
    instance.password = hashPassword(instance.password)

    instance.role = 2
  })
  return User;
};