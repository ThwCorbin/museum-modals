# Museum Modal Plan

## Requirements

- User sees a collection of artwork from the [Rijksmuseum](https://www.rijksmuseum.nl/en, "Rijksmuseum website")
- User can click on an image, which spawns a modal
- Modal contains a larger image and data about the artwork
- User can close the modal

## Set up

- Create html/css grid for 10 pieces of art
- Create Artwork Class with keys: artist, title, id, description, and image url
- Create modal skeleton: display: none, position: fixed, z-index: 1, padding-top: 40vh, etc.
- Create event listeners to openModal() and closeModal()
- Style elements

## On page load, fetch data from Rijksmuseum

- fetchData()
- GET collection + api key: `https://www.rijksmuseum.nl/api/en/collection?key=api-key`
- Create new Artwork instance for 10 pieces of art
- Assign artist, title, id, description, and image url to instance
- Push each art object into an array
- Build the html gallery: buildPage()

## Build the gallery

- buildPage()
- Create string of "html" divs with imgs
- Set gallery innerHTML to the string

## Open modal

- openModal()
- make modal element display = block;
- assign obj properties to modal (e.g. h2 textContent = instance.artist)
- darken `<body>`

## Close modal

- closeModal()
- make modal element display = none;
- lighten `<body>`

## Consider

- Make images similar sizes

# Resources

[Rijksmuseum](https://www.rijksmuseum.nl/en, "Rijksmuseum website")
[Rijksmuseum API](https://data.rijksmuseum.nl/object-metadata/api/, "Rijksmuseum API Documents")
