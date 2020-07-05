//* *** Variables ***************
let app = document.querySelector("#app");
let url = `https://www.rijksmuseum.nl/api/en/collection?key=`;
let urlDetails = `https://www.rijksmuseum.nl/api/en/collection/`;
let apiKey = `Cw5th9uF`;
let artArray = [];

//* *** Todo list ***************

// todo

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
		console.log(`This is a piece titled ${this.title} by ${this.artist}.`);
	}
}

//* *** Functions ***************
let nelson = new artWork("Horatio");

// data.artObjects
// [i]id: "en-BK-17040-A"
// [i]principalOrFirstMaker
// [i]title
// [i]webImage: {…}
// guid: "219e43c9-6b48-4861-a0af-9269dba7e7ef"
// width: 1441
// height: 2500
// offsetPercentageX: 0
// offsetPercentageY: 0
// url: "https://lh6.ggpht.com/9ulJVSDjPC6uiOPm-0Lj44cicGWRmukCmE98Ut3EAn6BhQeo76QZe_YIGiMTTX9rr4k3nqPymTmhrGjZDohEIR5ZrQ=s0"
// ​​

//* Modal requires new fetch to retrieve item details
// BK-17040-A?key=
// data.artObject.plaqueDescription:
//* Open modal
let openModal = (itemId) => {};

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

let fetchDescription = (itemId) => {
	// set display = block
	// fetch details with clicked objects id minus "en-"
	fetch(`${urlDetails}${itemId}?key=${apiKey}`)
		.then((res) => (res.ok ? res.json() : Promise.reject(res)))
		.then((data) => {
			console.log(itemId);
			let currentObj = artArray.find((obj) => obj.id === itemId);
			currentObj.description = data.artObjectPage.plaqueDescription;
			console.log(currentObj);
		})
		.catch((err) => console.warn(`Error: ${err.statusText}`));
};

// &ps=${numImages}
//* Load page with 10 images
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
				fetchDescription(artArray[artArray.length - 1].id);
			});
			buildPage();
		})
		.catch((err) => console.warn(`Error: ${err.statusText}`));
};

//* *** Event Handlers ***************

//* *** Event Listeners ***************
app.addEventListener("click", (e) => {
	if (e.target.localName === "img") {
		openModal(e.target.parentElement.id);
	}
});

//* Invoke on page load
fetchData();
