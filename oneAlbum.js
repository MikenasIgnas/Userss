const queryParams = document.location.search;
const urlParams = new URLSearchParams(queryParams);
const userId = urlParams.get("user_id");
const homePageContainer = document.getElementById("homePageContainer");
let albumId = urlParams.get("album_id");
const albumBox = document.createElement("div");
albumBox.classList.add("albumBox");
let albumTitle = urlParams.get("album_title");

const albumsWrapper = document.getElementById("albums-wrapper");
const fieldSet = document.createElement("fieldset");
fieldSet.classList.add("fieldset");
const legend = document.createElement("legend");
legend.textContent = "ALBUMS";
fetch(`https://jsonplaceholder.typicode.com/albums?album_id=${albumId}`)
  .then((res) => res.json())
  .then((userAlbums) => {
    const albumContainer = document.createElement("ul");
    albumContainer.classList.add("albumContainer");
    const albumListItemms = document.createElement("li");
    userAlbums.map((album) => {
      albumListItemms.innerHTML =
        albumTitle +
        ` (<a href="./photos.html?album_id=${albumId}">Photos</a>)`;
      albumsWrapper.append(fieldSet);
      fieldSet.append(legend, albumContainer);
      albumContainer.append(albumListItemms);
    });
  });
