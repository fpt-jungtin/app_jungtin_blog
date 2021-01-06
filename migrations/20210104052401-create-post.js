"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Posts", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			title: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			slug: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			description: {
				type: Sequelize.TEXT,
			},
			thumbnail: {
				type: Sequelize.STRING,
			},
			content: {
				type: Sequelize.TEXT,
			},
			userId: {
				type: Sequelize.INTEGER,
				// allowNull: false
			},
			tags: {
				type: Sequelize.STRING,
			},
			categoryId: {
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: "categories",
					},
					key: "id",
				},
				allowNull: true,
				onDelete: "SET NULL",
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("Posts");
	},
};
