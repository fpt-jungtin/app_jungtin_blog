global.import = function (path) {
	return require(path);
};

/* Package */
const path = require("path");
const csrf = require("csurf");
const reload = require("reload");
const handlebars = require("express-handlebars");
const flash = require("connect-flash");
const session = require("express-session");
const express = require("express");

/* Imports */
const URL = require("./helpers/urls");
const db = require("./config/database");

/* Error */
const { errHandlerMiddleware } = require("./error.custom");

/* Route */
const homeRoute = require("./routes/_/home.route");

const app = express();
require("dotenv/config");

/* Set Static */
app.use(express.static(path.join(__dirname, "public")));

/* Set View Engine */
app.engine(
	"hbs",
	handlebars({
		extname: ".hbs",
		layoutsDir: __dirname + "/views/layouts",
		runtimeOptions: {
			allowProtoPropertiesByDefault: true,
			allowProtoMethodsByDefault: true,
		},
		/* Từ 4.6.0 Handlebars cấm access prototype prop & methods */
	})
);
app.set("view engine", "hbs");

/* Middleware */
app.use(express.urlencoded({ extended: false }));
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: true,
		saveUninitialized: false,
	})
);
app.use(csrf()); // phải đặt sau cookie-parser nếu có sử dụng
app.use(flash()); // phải đặt sau session
app.use((req, res, next) => {
	res.locals.URL = URL;
	res.locals.csrfToken = req.csrfToken();
	next();
}); // middleware của csrfToken phải đặt trước tất cả routes

/* Route */
app.use(homeRoute);
app.get("/login", (req, res) => {
	res.render("login", { layout: false });
});
app.get("/register", (req, res) => {
	res.render("register", { layout: false });
});

/* 
	Error Handling
	- Phải đặt ở cuối cùng sau tất cả các routes & middlewares khác 
*/
app.use(errHandlerMiddleware);

/* Server */
const PORT = process.env.PORT || 3000;
reload(app);

/* Database - ORM */
db.sync({
	// force: true,
})
	.then((rs) => {
		console.log("Đã kết nối thành công với DB");

		app.listen(PORT, () => {
			console.log(`Server is running on PORT: ${PORT}`);
		});
	})
	.catch((err) => {
		console.error(err);
	});
