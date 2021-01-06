const { MODEL_NOT_FOUND_ERROR, MODEL_NOT_FOUND_ERROR_API } = require("../error.custom");

const { Category } = require("../models");

const save = async function (body) {
	if (!body.id) {
		const newCategory = await Category.create({
			title: body.title,
			slug: generateSlug(body.title),
			description: body.description,
			categoryId: body.parentId,
		});

		return newCategory; // return Object (gồm : values, prevValues, options)
	} else {
		const category = await Category.findByPk(body.id);
		if (category === null) throw new MODEL_NOT_FOUND_ERROR_API("Category", body.id);

		try {
			return await category.update({
				title: body.title,
				slug: generateSlug(body.title),
				description: body.description,
				categoryId: body.parentId || null,
			});
		} catch (err) {
			console.error(err);
		}
	}
};

const makeCategoryTree = (categories, id = null) => {
	let results = "";
	categories
		.filter((cate) => {
			if (cate.parent === null) {
				cate.parent = {
					id: null,
				};
			}

			return cate.parent.id === id;
		})
		.forEach((cate) => {
			results += `<ul><li><a href="javascript:void(0)" 
				class="category__item" data-description="${cate.description}"
				data-id="${cate.id}" data-parent-id="${cate.parent.id}">${cate.title}</a>`;
			results += makeCategoryTree(categories, cate.id);
			results += `</li></ul>`;
		});

	return results;
};

const getCategoryTree = async function () {
	const categories = await Category.findAll({
		include: {
			model: Category,
			attributes: ["id"],
			as: "parent",
		},
	});

	return makeCategoryTree(categories, null);
};

const findAll = async function () {
	return await Category.findAll({
		attributes: ["id", "title", "description", "categoryId"],
	});
};

const findById = async function (id) {
	const category = await Category.findByPk(id);
	if (category === null) throw new MODEL_NOT_FOUND_ERROR("Category", id);

	return category;
};

const deleteById = async function (id) {
	const category = await Category.findByPk(id);
	if (category === null) throw new MODEL_NOT_FOUND_ERROR_API("Category", id);

	try {
		return await category.destroy();
	} catch (err) {
		console.error(err);
	}
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
	getCategoryTree,
	findById,
	deleteById,
};
