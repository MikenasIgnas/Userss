const queryParams = document.location.search;
const urlParams = new URLSearchParams(queryParams);
const userId = urlParams.get("user_id");
const userPhotos = document.getElementById("photos");
const albumId = urlParams.get("album_id");
const mainDiv = document.getElementById("mainDiv");
fetch("https://jsonplaceholder.typicode.com/users/?_embed=albums")
  .then((res) => res.json())
  .then((data) => {
    data.map((users) => {
      const userAlbumElement = document.createElement("div");
      const userName = document.createElement("p");
      const userAlbum = document.createElement("ul");
      users.albums.map((album) => {
        const userAlbumList = document.createElement("li");
        userAlbumElement.classList.add(`userAlbumElement`);
        userAlbumList.classList.add("userAlbumList");
        userAlbumList.innerHTML = `<a href="./photos.html?user_id=${users.id}&album_id=${album.id}" class="hover-underline-animation">${album.title}</a>`;
        userAlbum.append(userAlbumList);
        userAlbum.prepend(userName);
        userName.innerHTML = `<a style=font-size:20px class="hover-underline-animation" href="./oneUser.html?user_id=${users.id}">${users.name}</a>`;
        userAlbumElement.append(userAlbum);
        mainDiv.append(userAlbumElement);
      });
    });
  });
