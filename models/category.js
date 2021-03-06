"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Category extends Model {
		static associate(models) {
			// Category.hasMany(models.Category, {
			// 	foreignKey: "categoryId",
			// 	as: "childCategories",
			// });
			Category.belongsTo(models.Category, {
				foreignKey: "categoryId",
				allowNull: true,
				onDelete: "SET NULL",
				as: "parent",
			});
			Category.hasMany(models.Post);
		}
	}
	Category.init(
		{
			title: DataTypes.STRING,
			slug: DataTypes.STRING,
			description: DataTypes.TEXT,
			categoryId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Category",
		}
	);
	return Category;
};
