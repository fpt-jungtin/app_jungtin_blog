"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert("categories", [
			{
				title: "NodeJS",
				slug: "nodejs",
				description: "Môi trường danh cho dev web, sử dụng Chrome V8 engine",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				title: "Java",
				slug: "java",
				description: "Ngôn ngữ mạnh mẽ, viết 1 lần chạy mọi nơi",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				title: "Sequelize",
				slug: "sequelize",
				description: "ORM của SQL Database, dành cho NodeJS",
				categoryId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				title: "Express",
				slug: "express",
				description: "Framework của MySQL, Hỗ trợ phát triển web, apis vô cùng nhanh chóng",
				categoryId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				title: "Hibernate",
				slug: "hibernate",
				description: "ORM dành cho Java, thường hay đi kèm với Spring Boot",
				categoryId: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
