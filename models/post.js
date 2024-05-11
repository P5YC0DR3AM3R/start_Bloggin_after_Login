const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
  {
    // Define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',  // This is the table name
        key: 'id',
      },
    }
  },
  {
    sequelize,
    timestamps: true,  // Automatically adds createdAt and updatedAt timestamps
    freezeTableName: true,  // Model tableName will be the same as the model name
    underscored: true,  // Converts all column names into snake_case rather than camelCase
    modelName: 'post',  // Defines the name of the model
  }
);

module.exports = Post;
