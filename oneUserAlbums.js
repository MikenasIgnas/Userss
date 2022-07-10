const queryParams = document.location.search;
const urlParams = new URLSearchParams(queryParams);
const userId = urlParams.get("user_id");
const homePageContainer = document.getElementById("homePageContainer");

const albumBox = document.createElement("div");
albumBox.classList.add("albumBox");

fetch(`https://jsonplaceholder.typicode.com/albums?user_id=${userId}`)
  .then((res) => res.json())
  .then((userAlbums) => {
    userAlbums.map((album) => {
      if (userId == album.userId) {
        const albumContainer = document.createElement("div");
        albumContainer.classList.add("albumContainer");
        const albumListItemms = document.createElement("div");
        albumTitle = album.title;
        upperCaseAlbumTitle =
          albumTitle.charAt(0).toUpperCase() +
          albumTitle.slice(1).toLowerCase();
        albumListItemms.innerHTML = `<a class="hover-underline-animation" href="./photos.html?user_id=${userId}&album_id=${album.id}">${upperCaseAlbumTitle}</a>`;
        homePageContainer.append(albumBox);
        albumBox.append(albumContainer);
        albumContainer.append(albumListItemms);
      }
    });
  });
