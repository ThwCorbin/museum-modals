//* *** Variables ***************
let body = document.querySelector("body");
let app = document.querySelector("#app");
let modal = document.querySelector("#modal");
let modImg = document.querySelector(".mod-img");
let modHeads = document.querySelector(".mod-headers");
let modTitle = document.querySelector(".mod-title");
let modArtist = document.querySelector(".mod-artist");
let modDescription = document.querySelector(".mod-description");
let xModal = document.querySelector("#x-modal");
let url = `https://www.rijksmuseum.nl/api/en/collection?key=`;
let urlDetails = `https://www.rijksmuseum.nl/api/en/collection/`;
let apiKey = `Cw5th9uF`;
let artArray = [];

//* *** Todo list ***************

// todo fix image sizes
// todo add modal
// todo media queries

//* *** Variables and classes ***************

class artWork {
	constructor(artist, title, id, imgURL) {
		this.artist = artist;
		this.title = title;
		this.id = id;
		this.imgURL = imgURL;
		this.description = "";
	}
	artNote() {
		console.log(`This is a piece titled '${this.title}' by ${this.artist}.`);
	}
}

//* *** Functions ***************

//* Open modal
let openModal = (e) => {
	console.log(e.target);
	let itemId = e.target.parentElement.id;
	let currentObj = artArray.find((obj) => obj.id === itemId);
	console.log(currentObj.artNote());
	modal.style.display = "flex";
	// body.classList.add("body-background");
	modImg.src = currentObj.imgURL;
	modArtist.textContent = currentObj.artist;
	modTitle.textContent = currentObj.title;
	modDescription.textContent = currentObj.description;
};

//* Close modal
let closeModal = () => {
	modal.style.display = "none";
	body.classList.remove("body-background");
};

//* Build html create gallery
let buildPage = () => {
	let htmlStr = "";
	artArray.forEach((artObj) => {
		let divStr = `<div class="pic" id=${artObj.id}>
										<img src=${artObj.imgURL}>
									</div>`;
		htmlStr += divStr;
	});
	app.innerHTML = htmlStr;
};

//* Make separate fetch to access artwork description
let fetchDescription = (itemId) => {
	fetch(`${urlDetails}${itemId}?key=${apiKey}`)
		.then((res) => (res.ok ? res.json() : Promise.reject(res)))
		.then((data) => {
			let currentObj = artArray.find((obj) => obj.id === itemId);
			currentObj.description = data.artObjectPage.plaqueDescription;
		})
		.catch((err) => console.warn(`Error: ${err.statusText}`));
};

//* Fetch data from Rijksmuseum API
let fetchData = () => {
	fetch(`${url}${apiKey}&p=6`)
		.then((res) => (res.ok ? res.json() : Promise.reject(res)))
		.then((data) => {
			data.artObjects.forEach((artObj) => {
				// (artist, title, id, imgURL)
				let newObj = new artWork(
					artObj.principalOrFirstMaker,
					artObj.title,
					artObj.id.slice(3),
					artObj.webImage.url
				);
				artArray.push(newObj);
				//* Accessing artwork details requires another fetch
				fetchDescription(artArray[artArray.length - 1].id);
			});
			buildPage();
		})
		.catch((err) => console.warn(`Error: ${err.statusText}`));
};

//* *** Event Listeners ***************
xModal.addEventListener("click", closeModal);

app.addEventListener("click", (e) => {
	if (e.target.localName === "img") {
		openModal(e);
	}
});

//* Invoke on page load
fetchData();
