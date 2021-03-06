const queryParams = document.location.search;
const urlParams = new URLSearchParams(queryParams);
const userId = urlParams.get("user_id");
const userPhotos = document.getElementById("photos");
let albumId = urlParams.get("album_id");

let albumTitle = urlParams.get("album_title");
let userName = urlParams.get("user_name");

fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
  .then((res) => res.json())
  .then((photos) => {
    if (photos.length > 0) {
      photos.map((photo) => {
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("imageContainer");

        imageContainer.innerHTML = `<img style="width:150px" src="${photo.url}">`;
        userPhotos.append(imageContainer);
      });
    }
  });
