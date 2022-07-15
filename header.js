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
    const searchFunction = ({
      fetchUrlEnd,
      searchDataName,
      createRedirectUrl,
    }) => {
      fetch(`https://jsonplaceholder.typicode.com/${fetchUrlEnd}`)
        .then((res) => res.json())
        .then((data) => {
          data.map((dataItem) => {
            if (
              searchInput !== "" &&
              dataItem?.[searchDataName].includes(searchInput)
            ) {
              window.location.assign(createRedirectUrl(dataItem));
            }
          });
        });
    };

    if (searchVariation === userOption.textContent) {
      const createUserUrl = (user) => {
        return `./oneUser.html?user_id=${user.id}`;
      };
      searchFunction({
        fetchUrlEnd: "users",
        searchDataName: "name",
        createRedirectUrl: createUserUrl,
      });
    } else if (searchVariation === albumOption.textContent) {
      const createAlbumUrl = (album) => {
        return `./albumSearchPage.html?user_id=${userId}&album_id=${album.id}&album_title=${album.title}&search_word=${searchInput}`;
      };
      searchFunction({
        fetchUrlEnd: `albums?user_id=${userId}`,
        searchDataName: "title",
        createRedirectUrl: createAlbumUrl,
      });
    } else if (searchVariation === postsOption.textContent) {
      const createPostmUrl = (post) => {
        return `./postSearchPage.html?user_id=${userId}&post=${post.id}&post_title=${post.title}&search_word=${searchInput}`;
      };
      searchFunction({
        fetchUrlEnd: `posts?user_id=${userId}`,
        searchDataName: "title",
        createRedirectUrl: createPostmUrl,
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
