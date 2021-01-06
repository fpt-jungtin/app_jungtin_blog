const editor = new EditorJS({
	holder: "editorjs",
	autofocus: true,
	placeholder: "Cùng nhau viết content nhé <3",
	minHeight: 300,
	readOnly: false,
	onReady: () => {
		// console.log("Đã sẵn sàng để chiến");
		new Undo({ editor });
	},
	onChange: () => {
		// console.log("Đã thay đổi");
	},
	tools: {
		header: {
			class: Header,
			shortcut: "CMD+SHIFT+H",
			config: {
				placeholder: "Enter a header",
				levels: [1, 2, 3, 4, 5, 6],
				defaultLevel: 2,
			},
		},
		delimiter: Delimiter,
		alert: {
			class: Alert,
			inlineToolbar: true,
			shortcut: "CMD+SHIFT+A",
			config: {
				defaultType: "primary",
				messagePlaceholder: "Enter something",
			},
		},
		/*warning: {
            class: Warning,
            inlineToolbar: true,
            shortcut: 'CMD+SHIFT+W',
            config: {
                titlePlaceholder: 'Title',
                messagePlaceholder: 'Message',
            },
		},*/
		codeBox: {
			class: CodeBox,
			config: {
				themeURL:
					"https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.18.1/build/styles/dracula.min.css", // Optional
				themeName: "atom-one-dark", // Optional
				useDefaultTheme: "light", // Optional. This also determines the background color of the language select drop-down
			},
		},
		// code: CodeMirror,
		paragraph: {
			class: Paragraph,
			inlineToolbar: true,
		},
		list: {
			class: List,
			inlineToolbar: true,
			shortcut: "CTRL+SHIFT+L",
		},
		/*linkTool: {
            class: LinkTool,
            config: {
                endpoint: 'http://localhost:8008/fetchUrl', // Your backend endpoint for url data fetching
            }
        },*/
		Marker: {
			class: Marker,
			shortcut: "CMD+SHIFT+M",
		},
		code: CodeTool,
		inlineCode: {
			class: InlineCode,
			shortcut: "CMD+SHIFT+L",
		},
		image: {
			class: ImageTool,
			config: {
				// endpoints: {
				// 	byFile: uploadFileURL, // Your backenNappd file uploader endpoint
				// 	byUrl: "http://localhost:8008/fetchUrl", // Your endpoint that provides uploading by Url
				// },
				uploader: {
					uploadByFile(file) {
						var uploadFileURL =
							window.location.protocol + "//" + window.location.host + "/upload";
						const formData = new FormData();
						formData.append("image", file);

						return fetch(uploadFileURL, {
							method: "POST",
							mode: "cors", // no-cors, *cors, same-origin
							cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
							credentials: "same-origin", // include, *same-origin, omit
							headers: {
								// 'Content-Type': 'application/json',
								"CSRF-Token": csrfToken,
							},
							body: formData,
						})
							.then((res) => {
								return res.json();
							})
							.then((data) => {
								return data;
							})
							.catch((err) => {
								console.log("Đã có lỗi khi upload image");
								console.error(err);
							});
					},
					uploadByUrl(url) {
						console.log("Hom nay sử dụng URL");
						console.log(url);
						var uploadFileURLByLink =
							window.location.protocol + "//" + window.location.host + "/upload/link";

						return fetch(uploadFileURLByLink, {
							method: "POST",
							mode: "cors", // no-cors, *cors, same-origin
							cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
							credentials: "same-origin", // include, *same-origin, omit
							headers: {
								"Content-Type": "application/json",
								"CSRF-Token": csrfToken,
							},
							body: JSON.stringify({
								url,
							}),
						})
							.then((res) => {
								return res.json();
							})
							.then((data) => {
								return data;
							})
							.catch((err) => {
								console.log("Đã có lỗi khi upload image");
								console.error(err);
							});
					},
				},
			},
			// field: "image", // field name
			types: "image/*",
			captionPlaceholder: "Caption",
			buttonContent: "Select File",
			// action: [],
		},
		embed: {
			class: Embed,
			config: {
				services: {
					youtube: true,
					coub: true,
					codepen: {
						regex: /https?:\/\/codepen.io\/([^\/\?\&]*)\/pen\/([^\/\?\&]*)/,
						embedUrl:
							"https://codepen.io/<%= remote_id %>?height=300&theme-id=0&default-tab=css,result&embed-version=2",
						html:
							"<iframe height='300' scrolling='no' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'></iframe>",
						height: 300,
						width: 600,
						id: (groups) => groups.join("/embed/"),
					},
					gfycat: true,
					"twitch-video": true,
					"twitch-channel": true,
					vimeo: true,
					vine: true,
					"yandex-music-track": true,
					"yandex-music-album": true,
					"yandex-music-playlist": true,
					twitter: true,
					instagram: true,
				},
			},
		},
	},
	// defaultBlock: "header",
	// data: { }
});
