'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User)
    }
  }
  Profile.init({
    userName:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'username cannot be null'
        },
        notEmpty: {
          msg: 'username cannot be empty'
        }
      }
    },
    profilePicture: DataTypes.STRING,
    bio: DataTypes.STRING,
    phoneNumber:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'phone number cannot be null'
        },
        notEmpty: {
          msg: 'phone number cannot be empty'
        }
      }
    },
    birthDate: DataTypes.DATE,
    UserId: DataTypes.INTEGER,
    hobby: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};