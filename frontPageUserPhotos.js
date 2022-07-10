const oneUserPhoto = document.getElementById("oneUserPhoto");
fetch("https://jsonplaceholder.typicode.com/users")
  .then((res) => res.json())
  .then((users) => {
    console.log(users);
    fetch("https://jsonplaceholder.typicode.com/photos?_limit=500")
      .then((res) => res.json())
      .then((photos) => {
        photoFilter = photos.filter(function (value, index, Arr) {
          return index % 50 == 0;
        });
        for (let key in Object.keys(photoFilter)) {
          const userPhotosContainer = document.createElement("div");
          const infoContainer = document.createElement("div");
          const photo = document.createElement("div");
          const author = document.createElement("a");
          author.href = `./oneUser.html?user_id=${users[key].id}`;
          author.classList.add("hover-underline-animation");
          const title = document.createElement("h3");
          userPhotosContainer.classList.add("userPhotosContainer");
          photo.classList.add("photo");
          photo.innerHTML = `<img src=${photoFilter[key].thumbnailUrl}>`;
          author.textContent = `Author: ${users[key].name}`;
          title.textContent = `Album title: ${photoFilter[key].title}`;
          oneUserPhoto.append(userPhotosContainer);
          userPhotosContainer.append(infoContainer, photo);
          infoContainer.append(author, title);
        }
      });
  });
