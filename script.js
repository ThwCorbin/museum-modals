//* *** Variables ***************
let app = document.querySelector("#app");
// let url =
let url = `https://www.rijksmuseum.nl/api/en/collection?key=`;
let urlDetails = `https://www.rijksmuseum.nl/api/en/collection/`;
let apiKey = `Cw5th9uF`;
let numImages = 12;

//* *** Todo list ***************

// todo

//* *** Variables and classes ***************

class artWork {
	constructor(artist, title, id, imgURL) {
		this.artist = artist;
		this.title = title;
		this.id = id;
		this.imgURL = imgURL;
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
let openModal = (itemId) => {
	// set display = block
	// fetch details with clicked objects id minus "en-"
	fetch(`${urlDetails}${itemId}?key=${apiKey}`)
		.then((res) => (res.ok ? res.json() : Promise.reject(res)))
		.then((data) => {
			// singular artObject
			console.log(data.artObject.plaqueDescriptionEnglish);
		})
		.catch((err) => console.warn(`Error: ${err.statusText}`));
};

// &ps=${numImages}
//* Load page with 10 images
let loadPage = () => {
	fetch(`${url}${apiKey}`)
		.then((res) => (res.ok ? res.json() : Promise.reject(res)))
		.then((data) => {
			console.log(data.artObjects[0]);
			console.log(data.artObjects[0].principalOrFirstMaker);
			console.log(data.artObjects[0].title);
			console.log(data.artObjects[0].webImage.url);
			data.artObjects.forEach((artObj) => {
				// (artist, title, id, imgURL)
				let newObj = new artWork(
					artObj.principalOrFirstMaker,
					artObj.title,
					artObj.id,
					artObj.webImage.url
				);
			});

			return data.artObjects[0];
		})
		.then((artObj) => {
			// e.g. changes id from "en-BK-17040-A" to "BK-17040-A"
			let itemId = artObj.id.slice(3);
			openModal(itemId);
		})
		.catch((err) => console.warn(`Error: ${err.statusText}`));
};

//* *** Event Handlers ***************

//* *** Event Listeners ***************

loadPage();
