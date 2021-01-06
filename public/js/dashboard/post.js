const csrfToken = document.querySelector(`input[name="_csrf"`).value;
const processForm = document.querySelector("#post-form");

const postContent = document.querySelector(`input[name="content"]`);
const submitBtn = document.querySelector("#post-form__submit-btn");

editor.isReady.then(() => {
	if (postContent.value === "") return;

	editor.render(JSON.parse(postContent.value));
});

submitBtn.addEventListener("click", async function () {
	// reset update form
	try {
		const outputData = await editor.save();
		if (outputData.blocks.length !== 0) postContent.value = JSON.stringify(outputData);

		processForm.submit();
	} catch (err) {
		console.error(err);
	}
});
