const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	res.render("dashboard/post-list", { layout: "dashboard" });
});

router.get("/404", (req, res) => {
	res.render("404", { layout: "dashboard" });
});

module.exports = router;
