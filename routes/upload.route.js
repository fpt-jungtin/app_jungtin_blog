const router = require("express").Router();

const fs = require("fs");
const multer = require("multer");
const dayjs = require("dayjs");

const uploadFolder = "./public/uploads";

var fileStorage = multer.diskStorage({
	destination: async (req, file, cb) => {
		try {
			if (!fs.existsSync(uploadFolder)) {
				fs.mkdirSync(uploadFolder);
			}
			cb(null, uploadFolder);
		} catch (err) {
			console.error(err);
		}
	},
	filename: function (req, file, cb) {
		const imageName = `${Math.random().toString(36).substr(2)}_${dayjs(new Date()).format(
			"DD-MM-YYYY_HH-mm-ss"
		)}.${fileExt}`;
		cb(null, imageName);
		// không sử dụng Date được vì tên của nó có space => sai
	},
});

const fileFilter = (req, file, cb) => {
	if (
		file.mimetype === "image/png" ||
		file.mimetype === "image/jpg" ||
		file.mimetype === "image/jpeg"
	) {
		cb(null, true); // save file
	} else {
		/* 
            Lưu ý : ở đây chỉ duyệt để không lưu thôi 
            chứ không trả lại thông báo ở response 
        */
		console.log("THÔNG BÁO : KHÔNG SAVE");
		cb(null, false); // không save file
		/* 
			Error đến đây là dừng chứ không throw qua ExpressJS
			Nhưng route /upload thì vẫn chạy
		*/
	}
};

const upload = multer({
	storage: fileStorage,
	fileFilter: fileFilter,
});

router.post("/upload", upload.single("image"), (req, res, next) => {
	if (!req.file) {
		res.status(400).json({
			success: 0,
		});
		return;
	}

	const file = req.file;
	var serverURL = req.protocol + "://" + req.get("host");
	res.status(200).json({
		success: 1,
		file: {
			url: `${serverURL}/uploads/${file.filename}`,
			// any other image data you want to store, such as width, height, color, extension, etc
		},
	});
});

router.post("/upload/link", async (req, res, next) => {
	const fetch = require("node-fetch");
	const url = req.body.url;
	const fileExt = url.split(/[#?]/)[0].split(".").pop().trim();
	const response = await fetch(url);
	const filename = `${Math.random().toString(36).substr(2)}_${dayjs(new Date()).format(
		"DD-MM-YYYY_HH-mm-ss"
	)}.${fileExt}`;
	const buffer = await response.buffer();

	fs.writeFile(`${uploadFolder}/${filename}`, buffer, () => {
		var serverURL = req.protocol + "://" + req.get("host");
		res.status(200).json({
			success: 1,
			file: {
				url: `${serverURL}/uploads/${filename}`,
				// any other image data you want to store, such as width, height, color, extension, etc
			},
		});
	});
});

module.exports = router;
