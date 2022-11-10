'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User)
    }
  }
  Post.init({
    caption: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg:'Please add your caption'
        },
        notEmpty: {
          msg:'Please add your caption'
        }
  
      }
    },
    like: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};