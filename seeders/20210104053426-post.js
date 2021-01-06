"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert("posts", [
			{
				title: "Việt Nam đang đàm phán mua 30 triệu liều vaccine Covid-19 từ Anh",
				slug: "viet-nam-dang-dam-phan-mua",
				description: "Môi trường danh cho dev web, sử dụng Chrome V8 engine",
				thumbnail:
					"https://znews-photo.zadn.vn/w660/Uploaded/iutmtn/2021_01_04/1.1_zing.jpg",
				content: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil assumenda veniam, 
          magni magnam voluptatibus harum dolore voluptatum ipsa, reprehenderit numquam hic aperiam qui nulla maiores rerum, 
          fugiat exercitationem totam officia!`,
				userId: null,
				tags: "cars, laptop, business",
				categoryId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				title: "Atletico đúng khi chiêu mộ Suarez",
				slug: "dung-khi-chieu-mo-suarez",
				description:
					"Tiền đạo người Uruguay chưa hết thời khi vẫn khai hỏa đều đặn trong màu áo Atletico Madrid.",
				thumbnail:
					"https://znews-photo.zadn.vn/w660/Uploaded/bzcwvobl/2021_01_04/Luis6.jpg",
				content: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil assumenda veniam, 
          magni magnam voluptatibus harum dolore voluptatum ipsa, reprehenderit numquam hic aperiam qui nulla maiores rerum, 
          fugiat exercitationem totam officia!`,
				userId: null,
				tags: "cars, laptop, business",
				categoryId: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				title: "Vì sao Ivanka Trump bị nhiều bạn thân quay lưng?",
				slug: "vi-sao-ivanka-trump",
				description:
					"Sau khi ông Trump đắc cử tổng thống Mỹ năm 2016, Ivanka Trump bị nhiều bạn thân như tổng biên tập Vogue Anna Wintour, bạn thân thời trung học Lysandra Ohrstrom... quay lưng.",
				thumbnail: "https://znews-photo.zadn.vn/w660/Uploaded/bzwvopcg/2021_01_04/iv1.jpg",
				content: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil assumenda veniam, 
          magni magnam voluptatibus harum dolore voluptatum ipsa, reprehenderit numquam hic aperiam qui nulla maiores rerum, 
          fugiat exercitationem totam officia!`,
				userId: null,
				tags: "cars, laptop, business",
				categoryId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("posts", null, {});
	},
};
