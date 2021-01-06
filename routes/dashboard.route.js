const express = require("express");
const router = express.Router();

const categoryRoute = require("../routes/category.route");
const postRoute = require("../routes/post.route");
const mediaRoute = require("../routes/media.route");

router.use("/categories", categoryRoute);
router.use("/posts", postRoute);
router.use("/media", mediaRoute);

router.get("/", (req, res) => {
	res.render("dashboard/post-list", { layout: "dashboard" });
});

module.exports = router;
