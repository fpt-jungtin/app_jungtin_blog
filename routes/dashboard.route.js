const express = require("express");
const router = express.Router();

const categoryRoute = require("../routes/category.route");

router.use("/categories", categoryRoute);

router.get("/", (req, res) => {
	res.render("dashboard/post-list", { layout: "dashboard" });
});

module.exports = router;
