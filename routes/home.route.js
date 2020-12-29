const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	res.render("main/home", { layout: "main" });
});

router.get("/blog", (req, res) => {
	res.render("main/blog", { layout: "main" });
});

router.get("/404", (req, res) => {
	res.render("404", { layout: false });
});

router.get("/login", (req, res) => {
	res.render("login", { layout: false });
});
router.get("/register", (req, res) => {
	res.render("register", { layout: false });
});

module.exports = router;
