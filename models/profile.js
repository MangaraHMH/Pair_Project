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

    formatDate(){
      return this.birthDate.toISOString().slice(0,10)
    }

  }
  Profile.init({
    userName: DataTypes.STRING,
    profilePicture: DataTypes.STRING,
    bio: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    UserId: DataTypes.INTEGER,
    hobby: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};