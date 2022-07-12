const headerContainer = document.getElementById("headerContainer");

createHeader = () => {
  const header = document.createElement("div");
  const headerItems = document.createElement("div");
  const homeElement = document.createElement("a");
  const usersElement = document.createElement("a");
  const postsElement = document.createElement("a");
  const albumsElement = document.createElement("a");
  const searchForm = document.createElement("Form");
  const inputElement = document.createElement("input");
  const selectElement = document.createElement("select");
  const userOption = document.createElement("option");
  const postsOption = document.createElement("option");
  const albumOption = document.createElement("option");
  selectElement.append(userOption, postsOption, albumOption);
  postsOption.textContent = "Posts";
  userOption.textContent = "User";
  albumOption.textContent = "Album";
  inputElement.placeholder = "Search For User";
  inputElement.name = "search";
  selectElement.name = "variations";
  header.classList.add("header");
  headerItems.classList.add("headerItems");
  homeElement.classList.add("hover-underline-animation");
  usersElement.classList.add("hover-underline-animation");
  postsElement.classList.add("hover-underline-animation");
  albumsElement.classList.add("hover-underline-animation");
  homeElement.textContent = "HOME";
  usersElement.textContent = "USERS";
  postsElement.textContent = "POSTS";
  albumsElement.textContent = "ALBUMS";
  homeElement.href = "./index.html";
  usersElement.href = "./allUsers.html";
  postsElement.href = "./allUsersPosts.html";
  albumsElement.href = "./allUserAlbums.html";
  searchForm.append(inputElement, selectElement);
  headerContainer.append(header);
  header.append(headerItems);

  selectElement.addEventListener("click", (e) => {
    let select = e.target.value;
    inputElement.placeholder = "Search For " + select;
  });

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let searchVariation = e.target.elements.variations.value;
    let searchInput = e.target.elements.search.value;
    if (searchVariation === userOption.textContent) {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then((data) => {
          data.map((user) => {
            if (searchInput !== "" && user.name.includes(searchInput)) {
              window.location.assign(`./oneUser.html?user_id=${user.id}`);
            }
          });
        });
    } else if (searchVariation === albumOption.textContent) {
      fetch(`https://jsonplaceholder.typicode.com/albums?user_id=${userId}`)
        .then((res) => res.json())
        .then((albums) => {
          albums.map((album) => {
            if (searchInput !== "" && album.title.includes(searchInput)) {
              window.location.assign(
                `./albumSearchPage.html?user_id=${userId}&album_id=${album.id}&album_title=${album.title}&search_word=${searchInput}`
              );
            }
          });
        });
    } else if (searchVariation === postsOption.textContent) {
      fetch(`https://jsonplaceholder.typicode.com/posts?user_id=${userId}`)
        .then((res) => res.json())
        .then((posts) => {
          posts.map((post) => {
            if (searchInput !== "" && post.title.includes(searchInput)) {
              window.location.assign(
                `./postSearchPage.html?user_id=${userId}&post=${post.id}&post_title=${post.title}&search_word=${searchInput}`
              );
            }
          });
        });
    }

    inputElement.value = "";
  });

  headerItems.append(
    homeElement,
    usersElement,
    postsElement,
    albumsElement,
    searchForm
  );
};
createHeader();
