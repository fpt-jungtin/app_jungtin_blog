const express = require("express");
// const { Op } = require("sequelize");
const router = express.Router();
const URL = require("../helpers/urls");
const postService = require("../services/post.service");
const cateService = require("../services/category.service");
const { body, param, validationResult } = require("express-validator");
const dayjs = require("dayjs");

router.get("/", async (req, res, next) => {
	try {
		let posts = await postService.findAll();

		posts = await posts.map((post) => {
			post.dataValues.createdAt = dayjs(post.createdAt).format("DD/MM/YYYY"); // not post.createdAt (phải có dataValues)
			post.dataValues.updatedAt = dayjs(post.updatedAt).format("DD/MM/YYYY");
			return post;
		});

		res.render("dashboard/post-list", {
			layout: "dashboard",
			posts,
		});
	} catch (err) {
		next(err);
	}
});

router.get("/create", async (req, res, next) => {
	try {
		const categories = await cateService.findAll();

		const errObj = req.flash("errors");
		const oldValues = req.flash("oldValues");

		res.render("dashboard/post-form", {
			layout: "dashboard",
			categories,
			errors: errObj[0], // Vì bất giá trị nào truyền qua flash đều sẽ nằm bên trong []
			...oldValues[0],
		});
	} catch (err) {
		next(err);
	}
});

router.post(
	"/process",
	[
		body("title").notEmpty().withMessage("không được để trống").trim(),
		body("description").notEmpty().withMessage("không được để trống").trim(),
		body("thumbnail").isURL().withMessage("cần phải là URL").trim(),
		body("content").notEmpty().withMessage("không được để trống").trim(),
		// body("tags").notEmpty().withMessage("không được để trống").trim(),
	],
	async (req, res, next) => {
		const rs = validationResult(req);

		if (rs.errors.length > 0) {
			/* Filter Errors for View */
			const errObj = {};
			rs.errors
				.filter((err) => {
					return err.location === "body";
				})
				.forEach((err) => {
					errObj[err.param] = `${err.param.charAt(0).toUpperCase() + err.param.slice(1)}
						${err.msg.toLowerCase()}`;
				});

			req.flash("errors", errObj);
			req.flash("oldValues", req.body);
			res.redirect(URL.POST_CREATE);
			return;
		}

		try {
			await postService.save(req.body);
			res.redirect(URL.POST);
		} catch (err) {
			next(err);
		}
	}
);

const helpers = require("handlebars-helpers")();
router.get("/update/:id", [param("id").toInt()], async (req, res, next) => {
	try {
		const categories = await cateService.findAll();
		const post = await postService.findById(req.params.id);

		res.render("dashboard/post-form", {
			layout: "dashboard",
			categories,
			...post.dataValues,
			helpers: {
				eq: helpers.eq,
			},
		});
	} catch (err) {
		next(err);
	}
});

// router.get("/:id", [param("id").toInt()], async (req, res, next) => {
// 	try {
// 		const postDataValues = await postService.getPostHtmlById(req.params.id);
// 		res.render("main/blog-post", {
// 			layout: "main",
// 			...postDataValues,
// 		});
// 	} catch (err) {
// 		next(err);
// 	}
// });

router.post("/delete/:id", [param("id").toInt()], async (req, res, next) => {
	try {
		await postService.deleteById(req.params.id);
		res.redirect(URL.POST);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
