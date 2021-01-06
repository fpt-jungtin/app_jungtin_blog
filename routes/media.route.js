const router = require("express").Router();
const fs = require("fs");

const uploadFolder = "./public/uploads";

router.get("/", async (req, res, next) => {
	try {
		const filenames = fs.readdirSync(uploadFolder);
		res.render("dashboard/media", { layout: "dashboard", filenames });
	} catch (err) {
		console.error(err);
		next(err);
	}
});

router.post("/delete", async (req, res, next) => {
	try {
		if (req.body.filenames) {
			const filenames = req.body.filenames;
			filenames.forEach((name) => {
				fs.unlink(`${uploadFolder}/${name}`, () => {
					console.log(`Đã xóa thành công ${name}`);
				});
			});
		} else if (req.body.filename) {
			const filename = req.body.filename;
			await fs.unlinkSync(`${uploadFolder}/${filename}`);
		}

		res.status(204).end();
	} catch (err) {
		console.error(err);
		next(err);
	}
});

module.exports = router;
