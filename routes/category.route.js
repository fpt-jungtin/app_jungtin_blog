const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();

const { Category } = require("../models");

router.get("/", async (req, res) => {
	const categories = await Category.findAll({
		include: {
			model: Category,
			attributes: ["id"],
			as: "parent",
		},
	});
	console.log(JSON.stringify(categories, null, 4));
	res.render("dashboard/category", { layout: "dashboard" });
});

module.exports = router;