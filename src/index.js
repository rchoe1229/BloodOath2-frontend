const baseURL = "http://localhost:3000/cults/1/";
const cultName = document.querySelector(".title");
const cultImage = document.querySelector(".image");
const cultCounter = document.querySelector(".bloodoaths");
const cultCounterButton = document.querySelector(".bloodoath-button");
const commentForm = document.querySelector(".comment-form");
const commentList = document.querySelector(".comments");

fetch(baseURL)
	.then((response) => response.json())
	.then((cult) => {
		cultName.textContent = cult.name;
		cultImage.src = cult.img_url;
		cultCounter.textContent = cult.count;

		cultCounterButton.addEventListener("click", () => {
			cult.count++;
			cultCounter.textContent = cult.count;

			fetch(baseURL, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					count: cult.count,
				}),
			});
		});
	});

fetch("http://localhost:3000/comments")
	.then((response) => response.json())
	.then((comments) => {
		comments.forEach((comment) => {
			const commentItem = document.createElement("li");
			commentItem.textContent = comment.comment;
			commentList.append(commentItem);
		});
	});

commentForm.addEventListener("submit", (event) => {
	event.preventDefault();
	const commentItem = document.createElement("li");
	const formData = new FormData(event.target);
	const inputData = formData.get("comment");
	commentItem.textContent = inputData;
	commentList.append(commentItem);

	fetch("http://localhost:3000/comments", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			comment: inputData,
		}),
	});
});
