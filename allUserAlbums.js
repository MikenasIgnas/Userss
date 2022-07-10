const mainDiv = document.getElementById("mainDiv");
fetch("https://jsonplaceholder.typicode.com/todos/1/albums")
  .then((res) => res.json())
  .then((albums) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((names) => {
        const userNames = names;
        const user1Name = userNames.filter((element) => element.id === 1);
        const user2Name = userNames.filter((element) => element.id === 2);
        const user3Name = userNames.filter((element) => element.id === 3);
        const user4Name = userNames.filter((element) => element.id === 4);
        const user5Name = userNames.filter((element) => element.id === 5);
        const user6Name = userNames.filter((element) => element.id === 6);
        const user7Name = userNames.filter((element) => element.id === 7);
        const user8Name = userNames.filter((element) => element.id === 8);
        const user9Name = userNames.filter((element) => element.id === 9);
        const user10Name = userNames.filter((element) => element.id === 10);
        const AlbumElements = albums;
        const user1Album = AlbumElements.filter(
          (element) => element.userId === 1
        );
        const user2Album = AlbumElements.filter(
          (element) => element.userId === 2
        );
        const user3Album = AlbumElements.filter(
          (element) => element.userId === 3
        );
        const user4Album = AlbumElements.filter(
          (element) => element.userId === 4
        );
        const user5Album = AlbumElements.filter(
          (element) => element.userId === 5
        );
        const user6Album = AlbumElements.filter(
          (element) => element.userId === 6
        );
        const user7Album = AlbumElements.filter(
          (element) => element.userId === 7
        );
        const user8Album = AlbumElements.filter(
          (element) => element.userId === 8
        );
        const user9Album = AlbumElements.filter(
          (element) => element.userId === 9
        );
        const user10Album = AlbumElements.filter(
          (element) => element.userId === 10
        );
        function createAlbums(userAlbums, authorName) {
          const userName = document.createElement("p");
          const userAlbumElement = document.createElement("div");
          const userAlbum = document.createElement("ul");
          for (let key in Object.keys(userAlbums)) {
            userAlbumElement.classList.add(`userAlbumElement`);
            const userAlbumList = document.createElement("li");
            userAlbumList.classList.add("userAlbumList");
            userAlbumList.textContent = userAlbums[key].title;
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
        createAlbums(user1Album, user1Name);
        createAlbums(user2Album, user2Name);
        createAlbums(user3Album, user3Name);
        createAlbums(user4Album, user4Name);
        createAlbums(user5Album, user5Name);
        createAlbums(user6Album, user6Name);
        createAlbums(user7Album, user7Name);
        createAlbums(user8Album, user8Name);
        createAlbums(user9Album, user9Name);
        createAlbums(user10Album, user10Name);
      });
  });
