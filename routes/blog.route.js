const express = require("express");
const router = express.Router();
const { numberFormatter, moneyFormatter } = require("../helpers/formatter");
const { param } = require("express-validator");
const dayjs = require("dayjs");

const postService = require("../services/post.service");

router.get("/", async (req, res) => {
	let posts = await postService.findAll();

	posts = await posts.map((post) => {
		post.dataValues.createdAt = dayjs(post.createdAt).format("MMM D, YYYY"); // not post.createdAt (phải có dataValues)
		post.dataValues.updatedAt = dayjs(post.updatedAt).format("MMM D, YYYY");
		return post;
	});

	res.render("main/blog", { layout: "main", posts });
});

router.get("/:id", [param("id").toInt()], async (req, res, next) => {
	try {
		const postDataValues = await postService.getPostHtmlById(req.params.id);

		res.render("main/blog-post", { layout: "main", ...postDataValues });
	} catch (err) {
		next(err);
	}
});

module.exports = router;
