const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();
const URL = require("../helpers/urls");
const categoryService = require("../services/category.service");
const { body, param, validationResult } = require("express-validator");

const { Category } = require("../models");

router.get("/", async (req, res, next) => {
	try {
		const htmlCategoryTree = await categoryService.getCategoryTree();
		const categories = await categoryService.findAll();

		const errObj = req.flash("errors");
		const oldValues = req.flash("oldValues");

		res.render("dashboard/category", {
			layout: "dashboard",
			categories,
			categoryHtml: htmlCategoryTree,
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
			res.redirect(URL.CATEGORY);
			return;
		}
		console.log("craete");
		try {
			await categoryService.save(req.body);
			res.redirect(URL.CATEGORY);
		} catch (err) {
			next(err);
		}
	}
);

router.post(
	"/api/process",
	[
		body("title").notEmpty().withMessage("không được để trống").trim(),
		body("description").notEmpty().withMessage("không được để trống").trim(),
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

			res.status(422).json({ errors: errObj });
			return;
		}

		try {
			await categoryService.save(req.body);
			/* Code 204 sẽ không send được message */
			res.status(204).end();
		} catch (err) {
			next(err);
		}
	}
);

router.post("/api/delete/:id", [param("id").toInt()], async (req, res, next) => {
	try {
		await categoryService.deleteById(req.params.id);
		res.status(204).end();
	} catch (err) {
		next(err);
	}
});

module.exports = router;
