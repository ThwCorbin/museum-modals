# Museum Modal Plan

## Requirements

- User sees a collection of artwork from the [Rijksmuseum](https://www.rijksmuseum.nl/en, "Rijksmuseum website")
- User can click on an image, which spawns a modal
- Modal contains a larger image and data about the artwork
- User can close the modal

## Set up

- Create html/css grid for 10 to 12 pieces of art
- Create Artwork Class with keys: artist, title, year, summary, image url, and more info url
- Create modal skeleton: display: none, position: fixed, z-index: 1, padding-top: 40vh, etc.
- Create event listeners to openModal() and closeModal()
- Style elements

## Load page

- loadPage()
- fetch() GET collection + api key + number of results:

  `https://www.rijksmuseum.nl/api/en/collection?key=api-key&ps=12`

- Create new Artwork instance for 10 to 12 pieces of art
- Assign artist, title, year, summary, image url, and more info url to instance
- Set img src to url

## Open modal

- openModal()
- display = block;
- img src = instance.urlImg
- h2 textContent = instance.artist
- etc.

## Close modal

- closeModal()
- display = none;

# Resources

[Rijksmuseum](https://www.rijksmuseum.nl/en, "Rijksmuseum website")
[Rijksmuseum API](https://data.rijksmuseum.nl/object-metadata/api/, "Rijksmuseum API Documents")
