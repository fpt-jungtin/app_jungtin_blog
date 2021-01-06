const csrfToken = document.querySelector(`input[name="_csrf"]`).value;
const iconEls = document.querySelectorAll("i.fa-trash-alt");

const cboEls = document.querySelectorAll(`.media__item-cbo`);
const cboAllEl = document.querySelector(`#media__item-cbo-select-all`);
const btnDelAll = document.querySelector(`#media__item-btn-delete-all`);

const deleteHandler = (event) => {
	const filename = event.target.getAttribute("data-filename");
	if (!confirm("Có muốn xóa ảnh")) return;

	var url = window.location.protocol + "//" + window.location.host + "/dashboard/media/delete";
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
			filename,
		}), // body data type must match "Content-Type" header
	})
		.then((res) => {
			if (!res.ok) throw new Error("Something went wrong");

			// return res.json();
		})
		.then((data) => {
			event.target.closest(".media__item").remove();
		})
		.catch((err) => {
			console.error(err);
		});
};

iconEls.forEach((el) => el.addEventListener("click", deleteHandler));
const setFilenames = new Set();
cboEls.forEach((el) =>
	el.addEventListener("change", (event) => {
		const filename = event.target.getAttribute("data-filename");
		if (event.target.checked) {
			setFilenames.add(filename);
		} else {
			setFilenames.delete(filename);
		}
	})
);

cboAllEl.addEventListener("change", (event) => {
	if (event.target.checked) {
		cboEls.forEach((el) => {
			el.checked = true;
			setFilenames.add(el.getAttribute("data-filename"));
		});
	} else {
		cboEls.forEach((el) => {
			el.checked = false;
			setFilenames.delete(el.getAttribute("data-filename"));
		});
	}
});

btnDelAll.addEventListener("click", function () {
	if (!confirm("Có muốn xóa những ảnh đã chọn ?")) return;

	const arrFilenames = Array.from(setFilenames);
	var url = window.location.protocol + "//" + window.location.host + "/dashboard/media/delete";
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
			filenames: arrFilenames,
		}), // body data type must match "Content-Type" header
	})
		.then((res) => {
			if (!res.ok) throw new Error("Something went wrong");

			//return res.json();
		})
		.then((data) => {
			arrFilenames.forEach((filename) => {
				const el = document.querySelector(`.media__item-cbo[data-filename="${filename}"`);
				el.closest(".media__item").remove();
			});
		})
		.catch((err) => {
			console.error(err);
		});
});
