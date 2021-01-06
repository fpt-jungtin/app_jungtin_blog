const { MODEL_NOT_FOUND_ERROR, MODEL_NOT_FOUND_ERROR_API } = require("../error.custom");

const { Post, Category } = require("../models");
const dayjs = require("dayjs");
const edjsParser = require("editorjs-parser");

const save = async function (body) {
	if (!body.id) {
		const newPost = await Post.create({
			title: body.title,
			slug: generateSlug(body.title),
			description: body.description,
			thumbnail: body.thumbnail,
			content: body.content,
			userId: null,
			tags: body.tags,
			categoryId: body.categoryId,
		});

		return newPost; // return Object (gồm : values, prevValues, options)
	} else {
		const post = await Post.findByPk(body.id);
		if (post === null) throw new MODEL_NOT_FOUND_ERROR_API("Post", body.id);

		try {
			return await post.update({
				title: body.title,
				slug: generateSlug(body.title),
				description: body.description,
				thumbnail: body.thumbnail,
				content: body.content,
				userId: null,
				tags: body.tags,
				categoryId: body.categoryId,
			});
		} catch (err) {
			console.error(err);
		}
	}
};

const findAll = async function () {
	let posts = await Post.findAll({
		// attributes: ["id", "title", "description", "createdAt"],
		include: {
			model: Category,
			attributes: ["id", "title"],
		},
	});

	return posts;
};

const findById = async function (id) {
	const post = await Post.findByPk(id);
	if (post === null) throw new MODEL_NOT_FOUND_ERROR("Post", id);

	return post;
};

const deleteById = async function (id) {
	const post = await Post.findByPk(id);
	if (post === null) throw new MODEL_NOT_FOUND_ERROR_API("Post", id);

	try {
		return await post.destroy();
	} catch (err) {
		console.error(err);
	}
};

const getPostHtmlById = async (id) => {
	const customParsers = {
		code: function (data, config) {
			const html = `<pre><code class="${data.languageCode}">${data.code}</code></pre>`;
			return html;
		},
	};
	const parser = new edjsParser(
		{
			image: {
				use: "figure",
				// use figure or img tag for images (figcaption will be used for caption of figure)
				// if you use figure, caption will be visible
				imgClass: "img", // used class for img tags
				figureClass: "fig-img", // used class for figure tags
				figCapClass: "fig-cap", // used class for figcaption tags
				path: "absolute",
				// if absolute is passed, the url property which is the absolute path to the image will be used
				// otherwise pass a relative path with the filename property in <> like so: '/img/<fileName>'
			},
			paragraph: {
				pClass: "paragraph", // used class for paragraph tags
			},
			code: {
				codeBlockClass: "code-block", // used class for code blocks
			},
			embed: {
				useProvidedLength: false,
				// set to true if you want the returned width and height of editorjs to be applied
				// NOTE: sometimes source site overrides the lengths so it does not work 100%
			},
			quote: {
				applyAlignment: false,
				// if set to true blockquote element will have text-align css property set
			},
		},
		customParsers
	);

	const post = await Post.findByPk(id, {
		include: {
			model: Category,
			attributes: ["id", "title"],
		},
	});
	if (post === null) throw new MODEL_NOT_FOUND_ERROR("Post", id);

	post.dataValues.createdAt = dayjs(post.createdAt).format("MMM D, YYYY"); // not post.createdAt (phải có dataValues)
	post.dataValues.updatedAt = dayjs(post.updatedAt).format("MMM D, YYYY");
	post.dataValues.markup = parser.parse(JSON.parse(post.content));

	return post.dataValues;
};

var generateSlug = function (str) {
	str = str.replace(/^\s+|\s+$/g, ""); // trim
	str = str.toLowerCase();

	// remove accents, swap ñ for n, etc
	var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
	var to = "aaaaaeeeeeiiiiooooouuuunc------";
	for (var i = 0, l = from.length; i < l; i++) {
		str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
	}

	str = str
		.replace(/[^a-z0-9 -]/g, "") // remove invalid chars
		.replace(/\s+/g, "-") // collapse whitespace and replace by -
		.replace(/-+/g, "-"); // collapse dashes

	return str;
};

module.exports = {
	save,
	findAll,
	findById,
	getPostHtmlById,
	deleteById,
};
