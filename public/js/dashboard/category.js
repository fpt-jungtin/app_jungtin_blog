const csrfToken = document.querySelector(`input[name="_csrf"`).value;
const createForm = document.getElementById("category__create-form");
const updateForm = document.getElementById("category__update-form");
const idInput = document.getElementById("category__id-input");
const titleInput = document.getElementById("category__title-input");
const descriptionInput = document.getElementById("category__description-input");
const parentIdInput = document.querySelector("#category__parent-id-input");
const parentIdInputs = document.querySelectorAll("#category__parent-id-input option");
const createBtn = document.getElementById("category__create-btn");
const deleteBtn = document.getElementById("category__delete-btn");

createBtn.addEventListener("click", function () {
	// reset update form
	resetUpdateForm();
});

deleteBtn.addEventListener("click", function () {
	// reset update form
	var url =
		window.location.protocol +
		"//" +
		window.location.host +
		`/dashboard/categories/api/delete/${idInput.value}`;
	fetch(url, {
		method: "POST",
		mode: "cors", // no-cors, *cors, same-origin
		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		credentials: "same-origin", // include, *same-origin, omit
		headers: {
			"Content-Type": "application/json",
			"CSRF-Token": csrfToken,
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
	})
		.then((res) => {
			if (!res.ok) throw new Error("Something went wrong");

			//return res.json();
		})
		.then((data) => {
			location.reload();
			/*
                    const deletedEl = document.querySelector(`.category__item[data-id="${idInput.value}"]`);
                    deletedEl.parentNode.remove();
                    resetUpdateForm();
                */
		})
		.catch((err) => {
			console.error(err);
		});
});

let items = document.getElementsByClassName("category__item");
for (let i = 0; i < items.length; i++) {
	items[i].addEventListener("click", onCategoryClickHandler);
}

function onCategoryClickHandler(event) {
	createForm.style.display = "none";
	updateForm.style.display = "block";

	const cateId = event.target.getAttribute("data-id");
	const cateDescription = event.target.getAttribute("data-description");
	const cateParentId = event.target.getAttribute("data-parent-id");
	const cateTitle = event.target.textContent;

	idInput.value = cateId;
	titleInput.value = cateTitle;
	descriptionInput.value = cateDescription;

	for (let i = 0; i < parentIdInputs.length; i++) {
		let optionEl = parentIdInputs[i];
		optionEl.removeAttribute("selected");

		if (parseInt(optionEl.getAttribute("value")) === parseInt(cateId))
			// chặn không cho parent chính nó
			optionEl.remove();

		if (parseInt(optionEl.getAttribute("value")) === parseInt(cateParentId))
			optionEl.setAttribute("selected", "selected");
	}
}

function processUpdate() {
	var url =
		window.location.protocol +
		"//" +
		window.location.host +
		"/dashboard/categories/api/process";
	fetch(url, {
		method: "POST",
		mode: "cors", // no-cors, *cors, same-origin
		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		credentials: "same-origin", // include, *same-origin, omit
		headers: {
			"Content-Type": "application/json",
			"CSRF-Token": csrfToken,
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: JSON.stringify({
			id: idInput.value,
			title: titleInput.value,
			description: descriptionInput.value,
			parentId: parentIdInput.value,
		}), // body data type must match "Content-Type" header
	})
		.then((res) => {
			if (!res.ok) throw new Error("Something went wrong");

			// res.json();
			/* 
				tùy trường hợp của response data mà mình có type cast không
				có trường hợp data là buffer thì mình thể chuyển thành json được
			*/
		})
		.then((data) => {
			location.reload();
			/*
                    const updatedEl = document.querySelector(`.category__item[data-id="${idInput.value}"]`);
                    updatedEl.textContent = titleInput.value;
                    updatedEl.setAttribute("data-description", descriptionInput.value);
                    resetUpdateForm();
                */
		})
		.catch((err) => {
			console.error(err);
		});
}

const resetUpdateForm = function () {
	// reset update form
	idInput.value = "";
	titleInput.value = "";
	descriptionInput.value = "";
	for (let i = 0; i < parentIdInputs.length; i++) {
		let optionEl = parentIdInputs[i];
		optionEl.removeAttribute("selected");
	}

	createForm.style.display = "block";
	updateForm.style.display = "none";
};
