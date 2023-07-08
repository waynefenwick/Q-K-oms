const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// Create our Comment model
class Comment extends Model {}
// Create fields/columns for Comment model
Comment.init(
  {
    // id column for comment model (integer, doesn't allow null values, primary key, uses auto increment) 
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // comment_text column for comment model (string, doesn't allow null values)
    comment_text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    // user_id column for comment model (integer, references the user model's id)
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    // post_id column for comment model (integer, references the post model's id)
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post',
        key: 'id'
      }
    }
  },
  // Configure the metadata for the comment model
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
  }
);

module.exports = Comment;