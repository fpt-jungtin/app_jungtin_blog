"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Post extends Model {
		static associate(models) {
			Post.belongsTo(models.Category, {
				foreignKey: "categoryId",
				allowNull: true,
				onDelete: "SET NULL",
			});
		}
	}
	Post.init(
		{
			title: DataTypes.STRING,
			slug: DataTypes.STRING,
			description: DataTypes.TEXT,
			thumbnail: DataTypes.STRING,
			content: DataTypes.TEXT,
			userId: DataTypes.INTEGER,
			tags: DataTypes.STRING,
			categoryId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Post",
		}
	);
	return Post;
};
