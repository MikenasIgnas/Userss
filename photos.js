const queryParams = document.location.search;
const urlParams = new URLSearchParams(queryParams);
const userId = urlParams.get("user_id");
const userPhotos = document.getElementById("photos");
fetch(`https://jsonplaceholder.typicode.com/todos/1/albums?user_id=${userId}`)
  .then((res) => res.json())
  .then((data) => {
    data.map((album) => {
      console.log(album.id);
      fetch(
        "https://jsonplaceholder.typicode.com/todos/1/photos?user_id=${userId}"
      )
        .then((res) => res.json())
        .then((photos) => {
          console.log();
          photos.map((photo) => {
            if (album.id == photo.albumId && album.id == userId) {
              const imageContainer = document.createElement("div");
              imageContainer.classList.add("imageContainer");
              console.log(photo);
              imageContainer.innerHTML = `<img style="width:150px" src="${photo.url}">`;
              userPhotos.append(imageContainer);
            }
          });
        });
    });
  });
