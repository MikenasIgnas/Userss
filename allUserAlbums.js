const queryParams = document.location.search;
const urlParams = new URLSearchParams(queryParams);
const userId = urlParams.get("user_id");
const userPhotos = document.getElementById("photos");
let albumId = urlParams.get("album_id");
const mainDiv = document.getElementById("mainDiv");
fetch("https://jsonplaceholder.typicode.com/todos/1/albums")
  .then((res) => res.json())
  .then((albums) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((names) => {
        console.log(names);
        filterPosts = (idNumber) => {
          const userPosts = albums.filter(
            (element) => element.userId === idNumber
          );
          return userPosts;
        };

        filterNames = (idNumber) => {
          const userName = names.filter((element) => element.id === idNumber);
          return userName;
        };

        function createAlbums(userAlbums, authorName) {
          const userName = document.createElement("p");
          const userAlbumElement = document.createElement("div");
          const userAlbum = document.createElement("ul");
          for (let key in Object.keys(userAlbums)) {
            upperCase = (objectItem) => {
              const textContent = objectItem;
              upperCaseText =
                textContent.charAt(0).toUpperCase() +
                textContent.slice(1).toLowerCase();
              return upperCaseText;
            };
            userAlbumElement.classList.add(`userAlbumElement`);
            const userAlbumList = document.createElement("li");
            userAlbumList.classList.add("userAlbumList");
            userAlbumList.innerHTML = `<a href="./photos.html?user_id=${
              names[key].id
            }&album_id=${
              userAlbums[key].id
            }" class="hover-underline-animation">${upperCase(
              userAlbums[key].title
            )}</a>`;
            userAlbum.append(userAlbumList);
            userAlbum.prepend(userName);
          }
          for (let key in Object.keys(authorName)) {
            const userNames = authorName[key].name;
            userName.innerHTML = `<a style=font-size:20px class="hover-underline-animation" href="./oneUser.html?user_id=${authorName[key].id}">${userNames}</a>`;
          }
          userAlbumElement.append(userAlbum);
          mainDiv.append(userAlbumElement);
        }
        createAlbums(filterPosts(1), filterNames(1));
        createAlbums(filterPosts(2), filterNames(2));
        createAlbums(filterPosts(3), filterNames(3));
        createAlbums(filterPosts(4), filterNames(4));
        createAlbums(filterPosts(5), filterNames(5));
        createAlbums(filterPosts(6), filterNames(6));
        createAlbums(filterPosts(7), filterNames(7));
        createAlbums(filterPosts(8), filterNames(8));
        createAlbums(filterPosts(9), filterNames(9));
        createAlbums(filterPosts(10), filterNames(10));
      });
  });
