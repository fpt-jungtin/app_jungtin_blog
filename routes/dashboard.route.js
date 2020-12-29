const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	res.render("dashboard/post-list", { layout: "dashboard" });
});

module.exports = router;
