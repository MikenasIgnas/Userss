const oneUserPhoto = document.getElementById("oneUserPhoto");
fetch("https://jsonplaceholder.typicode.com/users")
  .then((res) => res.json())
  .then((users) => {
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then((res) => res.json())
      .then((albums) => {
        albumFilter = albums.filter(function (value, index, Arr) {
          return index % 10 == 0;
        });

        fetch("https://jsonplaceholder.typicode.com/photos?_limit=500")
          .then((res) => res.json())
          .then((photos) => {
            photoFilter = photos.filter(function (value, index, Arr) {
              return index % 50 == 0;
            });

            for (let key in Object.keys(photoFilter)) {
              upperCase = (objectItem) => {
                const textContent = objectItem;
                upperCaseText =
                  textContent.charAt(0).toUpperCase() +
                  textContent.slice(1).toLowerCase();
                return upperCaseText;
              };

              const userPhotosContainer = document.createElement("div");
              const infoContainer = document.createElement("div");
              const photo = document.createElement("div");
              const author = document.createElement("a");
              author.href = `./oneUser.html?user_id=${users[key].id}`;
              author.classList.add("hover-underline-animation");
              const title = document.createElement("h3");
              const button = document.createElement("a");
              button.textContent = "See all albums";
              button.href = `./oneUserAlbums.html?user_id=${users[key].id}`;
              button.classList.add("hover-underline-animation");
              userPhotosContainer.classList.add("userPhotosContainer");
              photo.classList.add("photo");
              photo.innerHTML = `<img src=${photoFilter[key].thumbnailUrl}>`;
              author.textContent = `Author: ${users[key].name}`;
              title.textContent = `Album title: ${upperCase(
                albumFilter[key].title
              )}`;
              oneUserPhoto.append(userPhotosContainer);
              userPhotosContainer.append(infoContainer, photo, button);
              infoContainer.append(author, title);
            }
          });
      });
  });
